import pg from 'pg';
import dotenv from 'dotenv';
import {
  nombaCertificateEmailSeedStats,
  nombaCertificateQualifiedEmails,
} from './nombaCertificateEligibleEmails.js';

const { Pool } = pg;

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const DATABASE_URL = process.env.DATABASE_URL;

const getSslConfig = () => {
  if (process.env.DATABASE_SSL === 'false') {
    return false;
  }

  if (
    process.env.DATABASE_SSL === 'true' ||
    process.env.NODE_ENV === 'production'
  ) {
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

  await pool.query(`
    CREATE TABLE IF NOT EXISTS nomba_hackathon_certificate_recipients (
      email TEXT PRIMARY KEY,
      source TEXT NOT NULL DEFAULT 'completion-list',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS nomba_hackathon_certificate_verifications (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL REFERENCES nomba_hackathon_certificate_recipients(email) ON DELETE CASCADE,
      certificate_name TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      expires_at TIMESTAMPTZ NOT NULL,
      consumed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_nomba_certificate_verifications_lookup
    ON nomba_hackathon_certificate_verifications (email, consumed_at, expires_at, created_at DESC);
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS nomba_hackathon_certificate_claims (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL REFERENCES nomba_hackathon_certificate_recipients(email) ON DELETE CASCADE,
      certificate_name TEXT NOT NULL,
      verification_id BIGINT REFERENCES nomba_hackathon_certificate_verifications(id) ON DELETE SET NULL,
      issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_nomba_certificate_claims_created_at
    ON nomba_hackathon_certificate_claims (created_at DESC);
  `);

  if (nombaCertificateQualifiedEmails.length > 0) {
    await pool.query(
      `
        INSERT INTO nomba_hackathon_certificate_recipients (email, source, updated_at)
        SELECT UNNEST($1::text[]), 'completion-list', NOW()
        ON CONFLICT (email)
        DO UPDATE SET
          source = EXCLUDED.source,
          updated_at = NOW();
      `,
      [nombaCertificateQualifiedEmails]
    );
  }

  console.log(
    `Nomba certificate eligibility seed: ${
      nombaCertificateEmailSeedStats.validCount
    } valid unique email(s), ${
      nombaCertificateEmailSeedStats.duplicateCount
    } duplicate entr${
      nombaCertificateEmailSeedStats.duplicateCount === 1 ? 'y' : 'ies'
    }, ${nombaCertificateEmailSeedStats.invalidEntries.length} invalid entr${
      nombaCertificateEmailSeedStats.invalidEntries.length === 1 ? 'y' : 'ies'
    }.`
  );
};

export const insertNombaRegistration = async (
  registration,
  queryable = pool
) => {
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

export const createNombaEmailVerification = async ({
  email,
  codeHash,
  registration,
  expiresAt,
}) => {
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

export const getNombaEmailVerificationById = async (id) => {
  const result = await pool.query(
    `
      SELECT
        id,
        email,
        code_hash AS "codeHash",
        registration_payload AS "registrationPayload",
        attempts,
        expires_at AS "expiresAt",
        consumed_at AS "consumedAt",
        created_at AS "createdAt"
      FROM nomba_hackathon_email_verifications
      WHERE id = $1;
    `,
    [id]
  );

  return result.rows[0] || null;
};

export const listNombaPendingVerifications = async ({
  limit = 50,
  offset = 0,
} = {}) => {
  const result = await pool.query(
    `
      WITH latest_unverified AS (
        SELECT DISTINCT ON (LOWER(v.email))
          v.id,
          v.email,
          v.registration_payload,
          v.attempts,
          v.expires_at,
          v.created_at
        FROM nomba_hackathon_email_verifications v
        WHERE v.consumed_at IS NULL
          AND NOT EXISTS (
            SELECT 1
            FROM nomba_hackathon_registrations r
            WHERE LOWER(r.email) = LOWER(v.email)
          )
        ORDER BY LOWER(v.email), v.created_at DESC
      )
      SELECT
        COUNT(*) OVER()::int AS "totalCount",
        id,
        email,
        registration_payload AS "registrationPayload",
        attempts,
        expires_at AS "expiresAt",
        created_at AS "createdAt",
        (expires_at <= NOW()) AS expired
      FROM latest_unverified
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;
    `,
    [limit, offset]
  );

  return result.rows;
};

export const countNombaPendingVerifications = async () => {
  const result = await pool.query(`
    SELECT COUNT(DISTINCT LOWER(v.email))::int AS total
    FROM nomba_hackathon_email_verifications v
    WHERE v.consumed_at IS NULL
      AND NOT EXISTS (
        SELECT 1
        FROM nomba_hackathon_registrations r
        WHERE LOWER(r.email) = LOWER(v.email)
      );
  `);

  return result.rows[0]?.total || 0;
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

export const consumeNombaEmailVerification = async (id) => {
  await pool.query(
    `
      UPDATE nomba_hackathon_email_verifications
      SET consumed_at = NOW()
      WHERE id = $1
        AND consumed_at IS NULL;
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

    const existingRegistration = await client.query(
      `
        SELECT id, created_at
        FROM nomba_hackathon_registrations
        WHERE LOWER(email) = LOWER($1)
        ORDER BY created_at DESC
        LIMIT 1;
      `,
      [registration.email]
    );

    if (existingRegistration.rowCount > 0) {
      await client.query('COMMIT');
      return {
        ...existingRegistration.rows[0],
        alreadyRegistered: true,
      };
    }

    const savedRegistration = await insertNombaRegistration(
      registration,
      client
    );
    await client.query('COMMIT');

    return savedRegistration;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const listNombaRegistrations = async ({
  limit = 200,
  offset = 0,
} = {}) => {
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

export const listAllNombaRegistrations = async () => {
  const result = await pool.query(`
    SELECT
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
    ORDER BY created_at DESC;
  `);

  return result.rows;
};

export const countNombaRegistrations = async () => {
  const result = await pool.query(`
    SELECT COUNT(*)::int AS total
    FROM nomba_hackathon_registrations;
  `);

  return result.rows[0]?.total || 0;
};

export const getNombaCertificateRecipientByEmail = async (email) => {
  const result = await pool.query(
    `
      SELECT
        email,
        source,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM nomba_hackathon_certificate_recipients
      WHERE email = LOWER($1)
      LIMIT 1;
    `,
    [email]
  );

  return result.rows[0] || null;
};

export const createNombaCertificateVerification = async ({
  email,
  certificateName,
  codeHash,
  expiresAt,
}) => {
  const result = await pool.query(
    `
      INSERT INTO nomba_hackathon_certificate_verifications (
        email,
        certificate_name,
        code_hash,
        expires_at
      )
      VALUES (LOWER($1), $2, $3, $4::timestamptz)
      RETURNING
        id,
        email,
        certificate_name AS "certificateName",
        expires_at AS "expiresAt",
        created_at AS "createdAt";
    `,
    [email, certificateName, codeHash, expiresAt]
  );

  return result.rows[0];
};

export const getActiveNombaCertificateVerification = async (email) => {
  const result = await pool.query(
    `
      SELECT
        id,
        email,
        certificate_name AS "certificateName",
        code_hash AS "codeHash",
        attempts,
        expires_at AS "expiresAt",
        created_at AS "createdAt"
      FROM nomba_hackathon_certificate_verifications
      WHERE email = LOWER($1)
        AND consumed_at IS NULL
      ORDER BY created_at DESC
      LIMIT 1;
    `,
    [email]
  );

  return result.rows[0] || null;
};

export const incrementNombaCertificateVerificationAttempts = async (id) => {
  await pool.query(
    `
      UPDATE nomba_hackathon_certificate_verifications
      SET attempts = attempts + 1
      WHERE id = $1;
    `,
    [id]
  );
};

export const completeNombaCertificateVerification = async ({ id, email }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const consumedVerification = await client.query(
      `
        UPDATE nomba_hackathon_certificate_verifications
        SET consumed_at = NOW()
        WHERE id = $1
          AND email = LOWER($2)
          AND consumed_at IS NULL
        RETURNING
          id,
          email,
          certificate_name AS "certificateName",
          consumed_at AS "consumedAt";
      `,
      [id, email]
    );

    if (consumedVerification.rowCount === 0) {
      throw new Error('Verification code has already been used.');
    }

    const verification = consumedVerification.rows[0];
    const claim = await client.query(
      `
        INSERT INTO nomba_hackathon_certificate_claims (
          email,
          certificate_name,
          verification_id,
          issued_at
        )
        VALUES ($1, $2, $3, NOW())
        RETURNING
          id,
          email,
          certificate_name AS "certificateName",
          verification_id AS "verificationId",
          issued_at AS "issuedAt",
          created_at AS "createdAt";
      `,
      [verification.email, verification.certificateName, verification.id]
    );

    await client.query('COMMIT');

    return claim.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const listNombaCertificateRecipients = async ({
  limit = 200,
  offset = 0,
  query = '',
} = {}) => {
  const normalizedQuery = `%${String(query || '')
    .trim()
    .toLowerCase()}%`;
  const result = await pool.query(
    `
      SELECT
        COUNT(*) OVER()::int AS "totalCount",
        recipient.email,
        recipient.source,
        recipient.created_at AS "createdAt",
        recipient.updated_at AS "updatedAt",
        latest_claim.certificate_name AS "lastCertificateName",
        latest_claim.issued_at AS "lastIssuedAt",
        COALESCE(claim_counts.claim_count, 0)::int AS "claimCount"
      FROM nomba_hackathon_certificate_recipients recipient
      LEFT JOIN LATERAL (
        SELECT certificate_name, issued_at
        FROM nomba_hackathon_certificate_claims claim
        WHERE claim.email = recipient.email
        ORDER BY claim.issued_at DESC
        LIMIT 1
      ) latest_claim ON TRUE
      LEFT JOIN (
        SELECT email, COUNT(*) AS claim_count
        FROM nomba_hackathon_certificate_claims
        GROUP BY email
      ) claim_counts ON claim_counts.email = recipient.email
      WHERE ($3 = '%%' OR recipient.email LIKE $3)
      ORDER BY recipient.email ASC
      LIMIT $1 OFFSET $2;
    `,
    [limit, offset, normalizedQuery]
  );

  return result.rows;
};

export const countNombaCertificateRecipients = async ({ query = '' } = {}) => {
  const normalizedQuery = `%${String(query || '')
    .trim()
    .toLowerCase()}%`;
  const result = await pool.query(
    `
      SELECT COUNT(*)::int AS total
      FROM nomba_hackathon_certificate_recipients
      WHERE ($1 = '%%' OR email LIKE $1);
    `,
    [normalizedQuery]
  );

  return result.rows[0]?.total || 0;
};

export const listNombaCertificateClaims = async ({
  limit = 200,
  offset = 0,
  query = '',
} = {}) => {
  const normalizedQuery = `%${String(query || '')
    .trim()
    .toLowerCase()}%`;
  const result = await pool.query(
    `
      SELECT
        COUNT(*) OVER()::int AS "totalCount",
        id,
        email,
        certificate_name AS "certificateName",
        verification_id AS "verificationId",
        issued_at AS "issuedAt",
        created_at AS "createdAt"
      FROM nomba_hackathon_certificate_claims
      WHERE (
        $3 = '%%'
        OR email LIKE $3
        OR LOWER(certificate_name) LIKE $3
      )
      ORDER BY issued_at DESC
      LIMIT $1 OFFSET $2;
    `,
    [limit, offset, normalizedQuery]
  );

  return result.rows;
};

export const countNombaCertificateClaims = async ({ query = '' } = {}) => {
  const normalizedQuery = `%${String(query || '')
    .trim()
    .toLowerCase()}%`;
  const result = await pool.query(
    `
      SELECT COUNT(*)::int AS total
      FROM nomba_hackathon_certificate_claims
      WHERE (
        $1 = '%%'
        OR email LIKE $1
        OR LOWER(certificate_name) LIKE $1
      );
    `,
    [normalizedQuery]
  );

  return result.rows[0]?.total || 0;
};

export const getNombaCertificateSummary = async () => {
  const result = await pool.query(`
    SELECT
      (SELECT COUNT(*)::int FROM nomba_hackathon_certificate_recipients) AS "eligibleCount",
      (SELECT COUNT(*)::int FROM nomba_hackathon_certificate_claims) AS "issuedCount",
      (
        SELECT COUNT(DISTINCT email)::int
        FROM nomba_hackathon_certificate_claims
      ) AS "uniqueIssuedCount",
      (
        SELECT issued_at
        FROM nomba_hackathon_certificate_claims
        ORDER BY issued_at DESC
        LIMIT 1
      ) AS "latestIssuedAt";
  `);

  return (
    result.rows[0] || {
      eligibleCount: 0,
      issuedCount: 0,
      uniqueIssuedCount: 0,
      latestIssuedAt: null,
    }
  );
};
