import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const DATABASE_URL = process.env.DATABASE_URL;

const getSslConfig = () => {
  if (process.env.DATABASE_SSL === 'false') {
    return false;
  }

  if (process.env.DATABASE_SSL === 'true' || process.env.NODE_ENV === 'production') {
    return { rejectUnauthorized: false };
  }

  return false;
};

export const hasDatabase = Boolean(DATABASE_URL);

export const pool = hasDatabase
  ? new Pool({
      connectionString: DATABASE_URL,
      max: Number(process.env.PG_POOL_MAX || 5),
      ssl: getSslConfig(),
    })
  : null;

export const initializeDatabase = async () => {
  if (!pool) {
    console.warn('DATABASE_URL is not set; registration storage is disabled.');
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS nomba_hackathon_registrations (
      id BIGSERIAL PRIMARY KEY,
      program TEXT NOT NULL DEFAULT 'Nomba Forward Hackathon 2026',
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      country TEXT NOT NULL,
      state TEXT,
      participation_mode TEXT NOT NULL,
      team_name TEXT,
      team_size INTEGER,
      track TEXT NOT NULL,
      focus_area TEXT NOT NULL,
      role TEXT NOT NULL,
      experience_level TEXT NOT NULL,
      consent_originality BOOLEAN NOT NULL DEFAULT FALSE,
      consent_commitment BOOLEAN NOT NULL DEFAULT FALSE,
      raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    ALTER TABLE nomba_hackathon_registrations
    ADD COLUMN IF NOT EXISTS state TEXT;
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_nomba_registrations_created_at
    ON nomba_hackathon_registrations (created_at DESC);
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_nomba_registrations_email
    ON nomba_hackathon_registrations (LOWER(email));
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS nomba_hackathon_email_verifications (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      registration_payload JSONB NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      expires_at TIMESTAMPTZ NOT NULL,
      consumed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_nomba_email_verifications_lookup
    ON nomba_hackathon_email_verifications (LOWER(email), consumed_at, expires_at, created_at DESC);
  `);
};

export const insertNombaRegistration = async (registration, queryable = pool) => {
  const result = await queryable.query(
    `
      INSERT INTO nomba_hackathon_registrations (
        program,
        submitted_at,
        first_name,
        last_name,
        email,
        phone,
        country,
        state,
        participation_mode,
        team_name,
        team_size,
        track,
        focus_area,
        role,
        experience_level,
        consent_originality,
        consent_commitment,
        raw_payload
      )
      VALUES (
        $1,
        COALESCE($2::timestamptz, NOW()),
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        NULLIF($10, ''),
        $11,
        $12,
        $13,
        $14,
        $15,
        $16,
        $17,
        $18::jsonb
      )
      RETURNING id, created_at;
    `,
    [
      registration.program,
      registration.submittedAt,
      registration.firstName,
      registration.lastName,
      registration.email,
      registration.phone,
      registration.country,
      registration.state,
      registration.participationMode,
      registration.teamName,
      registration.teamSize,
      registration.track,
      registration.focusArea,
      registration.role,
      registration.experienceLevel,
      registration.consentOriginality,
      registration.consentCommitment,
      JSON.stringify(registration.rawPayload),
    ]
  );

  return result.rows[0];
};

export const createNombaEmailVerification = async ({ email, codeHash, registration, expiresAt }) => {
  const result = await pool.query(
    `
      INSERT INTO nomba_hackathon_email_verifications (
        email,
        code_hash,
        registration_payload,
        expires_at
      )
      VALUES ($1, $2, $3::jsonb, $4::timestamptz)
      RETURNING id, expires_at AS "expiresAt", created_at AS "createdAt";
    `,
    [email, codeHash, JSON.stringify(registration), expiresAt]
  );

  return result.rows[0];
};

export const getActiveNombaEmailVerification = async (email) => {
  const result = await pool.query(
    `
      SELECT
        id,
        email,
        code_hash AS "codeHash",
        registration_payload AS "registrationPayload",
        attempts,
        expires_at AS "expiresAt",
        created_at AS "createdAt"
      FROM nomba_hackathon_email_verifications
      WHERE LOWER(email) = LOWER($1)
        AND consumed_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1;
    `,
    [email]
  );

  return result.rows[0] || null;
};

export const incrementNombaEmailVerificationAttempts = async (id) => {
  await pool.query(
    `
      UPDATE nomba_hackathon_email_verifications
      SET attempts = attempts + 1
      WHERE id = $1;
    `,
    [id]
  );
};

export const completeNombaEmailVerification = async ({ id, registration }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const consumedVerification = await client.query(
      `
        UPDATE nomba_hackathon_email_verifications
        SET consumed_at = NOW()
        WHERE id = $1
          AND consumed_at IS NULL
        RETURNING id;
      `,
      [id]
    );

    if (consumedVerification.rowCount === 0) {
      throw new Error('Verification code has already been used.');
    }

    const savedRegistration = await insertNombaRegistration(registration, client);
    await client.query('COMMIT');

    return savedRegistration;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const listNombaRegistrations = async ({ limit = 200, offset = 0 } = {}) => {
  const result = await pool.query(
    `
      SELECT
        COUNT(*) OVER()::int AS "totalCount",
        id,
        program,
        submitted_at AS "submittedAt",
        first_name AS "firstName",
        last_name AS "lastName",
        email,
        phone,
        country,
        state,
        participation_mode AS "participationMode",
        team_name AS "teamName",
        team_size AS "teamSize",
        track,
        focus_area AS "focusArea",
        role,
        experience_level AS "experienceLevel",
        consent_originality AS "consentOriginality",
        consent_commitment AS "consentCommitment",
        created_at AS "createdAt"
      FROM nomba_hackathon_registrations
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;
    `,
    [limit, offset]
  );

  return result.rows;
};
