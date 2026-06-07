import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {
  hasDatabase,
  initializeDatabase,
  insertNombaRegistration,
  listNombaRegistrations,
  pool,
} from './database.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distPath = path.join(projectRoot, 'dist');
const adminCookieName = 'dc_nomba_admin';
const adminSessionTtlMs = Number(process.env.ADMIN_SESSION_TTL_MS || 12 * 60 * 60 * 1000);

const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin is not allowed by CORS'));
    },
  })
);
app.use(express.json({ limit: '64kb' }));
app.use(express.urlencoded({ extended: false, limit: '64kb' }));

const textValue = (body, key) => (typeof body[key] === 'string' ? body[key].trim() : '');
const booleanValue = (body, key) => body[key] === true || body[key] === 'true';

const normalizeRegistration = (body) => ({
  program: textValue(body, 'program') || 'Nomba Forward Hackathon 2026',
  submittedAt: textValue(body, 'submittedAt') || new Date().toISOString(),
  firstName: textValue(body, 'firstName'),
  lastName: textValue(body, 'lastName'),
  email: textValue(body, 'email').toLowerCase(),
  phone: textValue(body, 'phone'),
  country: textValue(body, 'country'),
  participationMode: textValue(body, 'participationMode'),
  teamName: textValue(body, 'teamName'),
  teamSize: textValue(body, 'teamSize') ? Number(textValue(body, 'teamSize')) : null,
  track: textValue(body, 'track'),
  focusArea: textValue(body, 'focusArea'),
  role: textValue(body, 'role'),
  experienceLevel: textValue(body, 'experienceLevel'),
  consentOriginality: booleanValue(body, 'consentOriginality'),
  consentCommitment: booleanValue(body, 'consentCommitment'),
  rawPayload: body,
});

const validateRegistration = (registration) => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'country',
    'participationMode',
    'track',
    'focusArea',
    'role',
    'experienceLevel',
  ];

  requiredFields.forEach((field) => {
    if (!registration[field]) {
      errors[field] = 'Required';
    }
  });

  if (registration.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
    errors.email = 'Invalid email address';
  }

  if (!['Solo', 'Team'].includes(registration.participationMode)) {
    errors.participationMode = 'Invalid participation mode';
  }

  if (registration.participationMode === 'Team') {
    if (!registration.teamName) {
      errors.teamName = 'Required for team participation';
    }

    if (![2, 3, 4].includes(registration.teamSize)) {
      errors.teamSize = 'Invalid team size';
    }
  }

  if (!registration.consentOriginality) {
    errors.consentOriginality = 'Required';
  }

  if (!registration.consentCommitment) {
    errors.consentCommitment = 'Required';
  }

  return errors;
};

const getAdminToken = (req) => {
  const bearerToken = req.get('authorization')?.replace(/^Bearer\s+/i, '').trim();
  const cookieToken = req.headers.cookie
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${adminCookieName}=`))
    ?.slice(adminCookieName.length + 1);

  return req.get('x-admin-token') || bearerToken || (cookieToken ? decodeURIComponent(cookieToken) : '') || '';
};

const tokensMatch = (actual, expected) => {
  if (!actual || !expected) {
    return false;
  }

  const actualBuffer = Buffer.from(actual);
  const expectedBuffer = Buffer.from(expected);

  return actualBuffer.length === expectedBuffer.length && crypto.timingSafeEqual(actualBuffer, expectedBuffer);
};

const getAdminSessionSecret = () => process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_API_KEY || process.env.NOMBA_ADMIN_API_KEY;

const signAdminPayload = (encodedPayload) => {
  const secret = getAdminSessionSecret();

  if (!secret) {
    return '';
  }

  return crypto.createHmac('sha256', secret).update(encodedPayload).digest('base64url');
};

const createAdminSessionToken = (email) => {
  const payload = {
    email,
    exp: Date.now() + adminSessionTtlMs,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = signAdminPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

const verifyAdminSessionToken = (token) => {
  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signAdminPayload(encodedPayload);

  if (!tokensMatch(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));

    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (_error) {
    return null;
  }
};

const requireAdminToken = (req, res, next) => {
  const expectedToken = process.env.ADMIN_API_KEY || process.env.NOMBA_ADMIN_API_KEY;
  const token = getAdminToken(req);
  const session = verifyAdminSessionToken(token);

  if (session) {
    req.adminSession = session;
    next();
    return;
  }

  if (!expectedToken) {
    res.status(503).json({ error: 'Admin access is not configured.' });
    return;
  }

  if (!tokensMatch(token, expectedToken)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
};

const requireDatabase = (res) => {
  if (!hasDatabase || !pool) {
    res.status(503).json({ error: 'Database is not configured.' });
    return false;
  }

  return true;
};

const escapeCsvValue = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);
  return /[",\n]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
};

const toCsv = (rows) => {
  const columns = [
    'id',
    'submittedAt',
    'firstName',
    'lastName',
    'email',
    'phone',
    'country',
    'participationMode',
    'teamName',
    'teamSize',
    'track',
    'focusArea',
    'role',
    'experienceLevel',
    'createdAt',
  ];

  return [
    columns.join(','),
    ...rows.map((row) => columns.map((column) => escapeCsvValue(row[column])).join(',')),
  ].join('\n');
};

app.get('/api/health', async (_req, res) => {
  res.json({
    ok: true,
    database: hasDatabase ? 'configured' : 'missing',
  });
});

app.post('/api/admin/login', (req, res) => {
  const expectedEmail = process.env.ADMIN_EMAIL || process.env.ADMIN_USERNAME || 'admin';
  const expectedPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_API_KEY || process.env.NOMBA_ADMIN_API_KEY;
  const email = textValue(req.body, 'email');
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!expectedPassword || !getAdminSessionSecret()) {
    res.status(503).json({ error: 'Admin login is not configured.' });
    return;
  }

  if (!tokensMatch(email.toLowerCase(), expectedEmail.toLowerCase()) || !tokensMatch(password, expectedPassword)) {
    res.status(401).json({ error: 'Invalid admin login.' });
    return;
  }

  const token = createAdminSessionToken(expectedEmail);
  const secureCookie = process.env.NODE_ENV === 'production' || req.get('x-forwarded-proto') === 'https' ? '; Secure' : '';

  res.setHeader(
    'Set-Cookie',
    `${adminCookieName}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${Math.floor(
      adminSessionTtlMs / 1000
    )}${secureCookie}`
  );
  res.json({
    token,
    admin: {
      email: expectedEmail,
    },
    expiresAt: new Date(Date.now() + adminSessionTtlMs).toISOString(),
  });
});

app.post('/api/admin/logout', (_req, res) => {
  res.setHeader('Set-Cookie', `${adminCookieName}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
  res.json({ success: true });
});

app.get('/api/admin/me', requireAdminToken, (req, res) => {
  res.json({
    admin: {
      email: req.adminSession?.email || process.env.ADMIN_EMAIL || process.env.ADMIN_USERNAME || 'admin',
    },
  });
});

app.post('/api/nomba-hackathon/registrations', async (req, res) => {
  if (!requireDatabase(res)) {
    return;
  }

  const registration = normalizeRegistration(req.body);
  const errors = validateRegistration(registration);

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ error: 'Invalid registration payload.', fields: errors });
    return;
  }

  try {
    const savedRegistration = await insertNombaRegistration(registration);
    res.status(201).json({
      success: true,
      id: savedRegistration.id,
      createdAt: savedRegistration.created_at,
    });
  } catch (error) {
    console.error('Unable to save Nomba hackathon registration:', error);
    res.status(500).json({ error: 'Unable to save registration.' });
  }
});

app.get('/api/admin/nomba-hackathon/registrations', requireAdminToken, async (req, res) => {
  if (!requireDatabase(res)) {
    return;
  }

  const requestedLimit = Number(req.query.limit || 200);
  const requestedOffset = Number(req.query.offset || 0);
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 1000) : 200;
  const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;

  try {
    const registrations = await listNombaRegistrations({ limit, offset });

    if (req.query.format === 'csv') {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="nomba-hackathon-registrations.csv"');
      res.send(toCsv(registrations));
      return;
    }

    res.json({ registrations, limit, offset });
  } catch (error) {
    console.error('Unable to list Nomba hackathon registrations:', error);
    res.status(500).json({ error: 'Unable to load registrations.' });
  }
});

app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'Not found' });
    return;
  }

  res.sendFile(path.join(distPath, 'index.html'));
});

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to initialize database:', error);
    process.exit(1);
  });
