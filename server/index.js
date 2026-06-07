import crypto from 'node:crypto';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {
  completeNombaEmailVerification,
  createNombaEmailVerification,
  getActiveNombaEmailVerification,
  hasDatabase,
  initializeDatabase,
  incrementNombaEmailVerificationAttempts,
  listNombaRegistrations,
  pool,
} from './database.js';

dotenv.config();
dotenv.config({ path: '.env.local', override: true });

const app = express();
const port = process.env.PORT || 3001;
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distPath = path.join(projectRoot, 'dist');
const adminCookieName = 'dc_nomba_admin';
const adminSessionTtlMs = Number(process.env.ADMIN_SESSION_TTL_MS || 12 * 60 * 60 * 1000);
const emailVerificationTtlMs = Number(process.env.EMAIL_VERIFICATION_TTL_MS || 10 * 60 * 1000);
const emailVerificationMaxAttempts = Number(process.env.EMAIL_VERIFICATION_MAX_ATTEMPTS || 5);
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'DevCareerNomba Hackathon <message@hack.devcareer.io>';
const emailSenderName = 'DevCareerNomba Hackathon';
const hackathonName = 'Nomba Forward Hackathon 2026';
const devCareerXUrl = process.env.DEVCAREER_X_URL || 'https://x.com/dev_careers';
const devCareerInstagramUrl = process.env.DEVCAREER_INSTAGRAM_URL || 'https://www.instagram.com/dev_careers/';
const hackathonPageUrl = process.env.NOMBA_HACKATHON_URL || 'https://devcareer.io/programs/nomba-hackathon';
const nombaDocsUrl = process.env.NOMBA_DOCS_URL || 'https://developer.nomba.com';

const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const nigerianStates = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];
const nigerianStateSet = new Set(nigerianStates.map((state) => state.toLowerCase()));

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
const stateValue = (body) => {
  const state = textValue(body, 'state');
  const legacyCountry = textValue(body, 'country');

  if (state) {
    return state;
  }

  return nigerianStateSet.has(legacyCountry.toLowerCase()) ? legacyCountry : '';
};

const normalizeRegistration = (body) => ({
  program: textValue(body, 'program') || 'Nomba Forward Hackathon 2026',
  submittedAt: textValue(body, 'submittedAt') || new Date().toISOString(),
  firstName: textValue(body, 'firstName'),
  lastName: textValue(body, 'lastName'),
  email: textValue(body, 'email').toLowerCase(),
  phone: textValue(body, 'phone'),
  country: 'Nigeria',
  state: stateValue(body),
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
    'state',
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

  if (registration.state && !nigerianStateSet.has(registration.state.toLowerCase())) {
    errors.state = 'Select a valid Nigerian state';
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

  return errors;
};

const getEmailVerificationSecret = () =>
  process.env.EMAIL_VERIFICATION_SECRET ||
  process.env.ADMIN_SESSION_SECRET ||
  process.env.ADMIN_API_KEY ||
  process.env.NOMBA_ADMIN_API_KEY ||
  process.env.RESEND_API_KEY;

const createVerificationCode = () => crypto.randomInt(0, 1000000).toString().padStart(6, '0');

const hashVerificationCode = (email, code) => {
  const secret = getEmailVerificationSecret();

  if (!secret) {
    return '';
  }

  return crypto.createHmac('sha256', secret).update(`${email.toLowerCase()}:${code}`).digest('hex');
};

const postJson = (url, { headers = {}, payload = {} }) =>
  new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const parsedUrl = new URL(url);
    const request = https.request(
      {
        method: 'POST',
        hostname: parsedUrl.hostname,
        path: `${parsedUrl.pathname}${parsedUrl.search}`,
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (response) => {
        let responseBody = '';

        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          responseBody += chunk;
        });
        response.on('end', () => {
          let data = null;

          try {
            data = responseBody ? JSON.parse(responseBody) : null;
          } catch (_error) {
            data = { message: responseBody };
          }

          resolve({
            ok: response.statusCode >= 200 && response.statusCode < 300,
            status: response.statusCode,
            statusText: response.statusMessage,
            data,
          });
        });
      }
    );

    request.on('error', reject);
    request.write(body);
    request.end();
  });

const emailButton = ({ href, label, background = '#ffcc00', color = '#181818' }) => `
  <a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer"
    style="display: inline-block; background: ${background}; color: ${color}; text-decoration: none; font-size: 14px; font-weight: 800; padding: 13px 18px; border-radius: 999px;">
    ${escapeHtml(label)}
  </a>
`;

const renderSocialLinks = () => `
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
    <tr>
      <td style="background: #fff7d8; border: 1px solid #f2df8d; border-radius: 18px; padding: 18px;">
        <p style="margin: 0 0 12px; color: #191917; font-size: 15px; font-weight: 800;">Follow DevCareer for hackathon updates</p>
        <p style="margin: 0 0 16px; color: #4f4a33; font-size: 14px; line-height: 1.6;">
          We will share reminders, build resources, and important announcements across our social channels.
        </p>
        <table role="presentation" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding-right: 10px;">${emailButton({ href: devCareerXUrl, label: 'Follow on X', background: '#181818', color: '#ffffff' })}</td>
            <td>${emailButton({ href: devCareerInstagramUrl, label: 'Follow on Instagram', background: '#e94883', color: '#ffffff' })}</td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
`;

const renderEmailShell = ({ previewText, eyebrow, title, children }) => `
  <!doctype html>
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin: 0; padding: 0; background: #f6f3e8; font-family: Arial, Helvetica, sans-serif;">
      <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${escapeHtml(previewText)}</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f6f3e8; padding: 28px 14px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 640px; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #ece4bd;">
              <tr>
                <td style="background: #171713; padding: 28px 28px 32px;">
                  <p style="margin: 0 0 10px; color: #ffcc00; font-size: 12px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase;">${escapeHtml(eyebrow)}</p>
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; line-height: 1.2; font-weight: 900;">${escapeHtml(title)}</h1>
                </td>
              </tr>
              <tr>
                <td style="padding: 28px;">
                  ${children}
                </td>
              </tr>
              <tr>
                <td style="background: #181818; padding: 20px 28px;">
                  <p style="margin: 0; color: #f8f3d9; font-size: 13px; line-height: 1.7;">
                    ${escapeHtml(emailSenderName)} | DevCareer
                  </p>
                </td>
              </tr>
            </table>
            <p style="max-width: 640px; margin: 14px auto 0; color: #7a7355; font-size: 12px; line-height: 1.6;">
              You received this email because you registered for ${escapeHtml(hackathonName)}.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

const sendEmail = async ({ to, subject, text, html }) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Email verification is not configured.');
  }

  const response = await postJson('https://api.resend.com/emails', {
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    payload: {
      from: resendFromEmail,
      to: [to],
      subject,
      text,
      html,
    },
  });
  const { data } = response;

  if (!response.ok) {
    console.error(
      'Unable to send Nomba email:',
      data?.message || data?.error || response.statusText || response.status
    );
    throw new Error('Unable to send email.');
  }

  return data;
};

const sendVerificationEmail = async ({ email, firstName, code }) => {
  const verificationMinutes = Math.max(1, Math.round(emailVerificationTtlMs / 60000));
  const displayName = escapeHtml(firstName || 'there');

  return sendEmail({
    to: email,
    subject: 'Your Nomba Forward Hackathon verification code',
    text: [
      `Hi ${firstName || 'there'},`,
      '',
      `Your ${hackathonName} verification code is ${code}.`,
      `It expires in ${verificationMinutes} minutes.`,
      '',
      `Follow DevCareer on X: ${devCareerXUrl}`,
      `Follow DevCareer on Instagram: ${devCareerInstagramUrl}`,
      '',
      'If you did not request this, you can ignore this email.',
      '',
      emailSenderName,
    ].join('\n'),
    html: renderEmailShell({
      previewText: `Your ${hackathonName} verification code is ${code}.`,
      eyebrow: 'Email verification',
      title: 'Confirm your hackathon registration',
      children: `
        <p style="margin: 0 0 16px; color: #252316; font-size: 16px; line-height: 1.7;">Hi ${displayName},</p>
        <p style="margin: 0 0 18px; color: #4a4631; font-size: 15px; line-height: 1.7;">
          Use the code below to confirm your email and complete your registration for <strong>${escapeHtml(hackathonName)}</strong>.
        </p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 22px 0;">
          <tr>
            <td align="center" style="background: #fff2ae; border: 1px solid #f2cc34; border-radius: 20px; padding: 24px;">
              <p style="margin: 0 0 8px; color: #6c5700; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">Your verification code</p>
              <p style="margin: 0; color: #151515; font-size: 40px; font-weight: 900; letter-spacing: 8px;">${code}</p>
            </td>
          </tr>
        </table>
        <p style="margin: 0 0 10px; color: #4a4631; font-size: 14px; line-height: 1.7;">
          This code expires in <strong>${verificationMinutes} minutes</strong>. If you did not start this registration, you can ignore this email.
        </p>
        ${renderSocialLinks()}
      `,
    }),
  });
};

const sendRegistrationConfirmationEmail = async ({ registration }) => {
  const displayName = escapeHtml(registration.firstName || 'there');
  const safeState = escapeHtml(registration.state || 'Not provided');
  const safeTrack = escapeHtml(registration.track || 'Selected track');
  const safeFocusArea = escapeHtml(registration.focusArea || 'Selected focus area');
  const safeMode = escapeHtml(registration.participationMode || 'Solo');

  return sendEmail({
    to: registration.email,
    subject: 'You are registered for Nomba Forward Hackathon 2026',
    text: [
      `Hi ${registration.firstName || 'there'},`,
      '',
      `Your registration for ${hackathonName} has been confirmed.`,
      '',
      `State: ${registration.state || 'Not provided'}`,
      `Track: ${registration.track || 'Selected track'}`,
      `Focus area: ${registration.focusArea || 'Selected focus area'}`,
      `Participation mode: ${registration.participationMode || 'Solo'}`,
      '',
      'Key dates:',
      'Registration: June 8 - 23, 2026',
      'Onboarding: June 24 - 29, 2026',
      'Build Sprint: July 1 - 7, 2026',
      'Validation & Judging: July 8 - 14, 2026',
      'Demo Day: July 19, 2026',
      '',
      `Hackathon page: ${hackathonPageUrl}`,
      `Nomba API docs: ${nombaDocsUrl}`,
      `Follow DevCareer on X: ${devCareerXUrl}`,
      `Follow DevCareer on Instagram: ${devCareerInstagramUrl}`,
      '',
      emailSenderName,
    ].join('\n'),
    html: renderEmailShell({
      previewText: `Your registration for ${hackathonName} has been confirmed.`,
      eyebrow: 'Registration confirmed',
      title: 'You are officially registered',
      children: `
        <p style="margin: 0 0 16px; color: #252316; font-size: 16px; line-height: 1.7;">Hi ${displayName},</p>
        <p style="margin: 0 0 18px; color: #4a4631; font-size: 15px; line-height: 1.7;">
          Your registration for <strong>${escapeHtml(hackathonName)}</strong> is confirmed. We will send onboarding information and next steps to this email.
        </p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 20px 0; border-collapse: separate; border-spacing: 0 10px;">
          <tr>
            <td style="background: #f8f5e8; border: 1px solid #eee4b8; border-radius: 14px; padding: 14px;">
              <p style="margin: 0 0 4px; color: #85700c; font-size: 12px; font-weight: 800; text-transform: uppercase;">State</p>
              <p style="margin: 0; color: #181818; font-size: 15px; font-weight: 800;">${safeState}</p>
            </td>
          </tr>
          <tr>
            <td style="background: #f8f5e8; border: 1px solid #eee4b8; border-radius: 14px; padding: 14px;">
              <p style="margin: 0 0 4px; color: #85700c; font-size: 12px; font-weight: 800; text-transform: uppercase;">Track</p>
              <p style="margin: 0; color: #181818; font-size: 15px; font-weight: 800;">${safeTrack}</p>
            </td>
          </tr>
          <tr>
            <td style="background: #f8f5e8; border: 1px solid #eee4b8; border-radius: 14px; padding: 14px;">
              <p style="margin: 0 0 4px; color: #85700c; font-size: 12px; font-weight: 800; text-transform: uppercase;">Focus area</p>
              <p style="margin: 0; color: #181818; font-size: 15px; font-weight: 800;">${safeFocusArea}</p>
            </td>
          </tr>
          <tr>
            <td style="background: #f8f5e8; border: 1px solid #eee4b8; border-radius: 14px; padding: 14px;">
              <p style="margin: 0 0 4px; color: #85700c; font-size: 12px; font-weight: 800; text-transform: uppercase;">Participation mode</p>
              <p style="margin: 0; color: #181818; font-size: 15px; font-weight: 800;">${safeMode}</p>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 22px 0;">
          <tr>
            <td style="background: #191917; border-radius: 18px; padding: 18px;">
              <p style="margin: 0 0 12px; color: #ffcc00; font-size: 13px; font-weight: 800; text-transform: uppercase;">Key dates</p>
              <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.8;">
                Registration: June 8 - 23, 2026<br>
                Onboarding: June 24 - 29, 2026<br>
                Build Sprint: July 1 - 7, 2026<br>
                Validation &amp; Judging: July 8 - 14, 2026<br>
                Demo Day: July 19, 2026
              </p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
          <tr>
            <td style="padding-right: 10px;">${emailButton({ href: hackathonPageUrl, label: 'View Hackathon Page' })}</td>
            <td>${emailButton({ href: nombaDocsUrl, label: 'Explore Nomba Docs', background: '#181818', color: '#ffffff' })}</td>
          </tr>
        </table>
        ${renderSocialLinks()}
      `,
    }),
  });
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

const getAdminEmails = () => {
  const configuredEmails = [
    ...(process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((email) => email.trim())
      .filter(Boolean),
    process.env.ADMIN_EMAIL || process.env.ADMIN_USERNAME,
  ].filter(Boolean);
  const uniqueEmails = [...new Set(configuredEmails.map((email) => email.toLowerCase()))];

  return uniqueEmails.length > 0 ? uniqueEmails : ['admin'];
};

const findAdminEmail = (email) => {
  const normalizedEmail = String(email || '').trim().toLowerCase();

  return getAdminEmails().find((adminEmail) => tokensMatch(normalizedEmail, adminEmail)) || '';
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

const escapeHtml = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const toCsv = (rows) => {
  const columns = [
    'id',
    'submittedAt',
    'firstName',
    'lastName',
    'email',
    'phone',
    'state',
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
  const expectedPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_API_KEY || process.env.NOMBA_ADMIN_API_KEY;
  const email = textValue(req.body, 'email');
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  const matchedEmail = findAdminEmail(email);

  if (!expectedPassword || !getAdminSessionSecret()) {
    res.status(503).json({ error: 'Admin login is not configured.' });
    return;
  }

  if (!matchedEmail || !tokensMatch(password, expectedPassword)) {
    res.status(401).json({ error: 'Invalid admin login.' });
    return;
  }

  const token = createAdminSessionToken(matchedEmail);
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
      email: matchedEmail,
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
      email: req.adminSession?.email || getAdminEmails()[0],
    },
  });
});

app.post('/api/nomba-hackathon/registrations', async (req, res) => {
  if (!requireDatabase(res)) {
    return;
  }

  if (!process.env.RESEND_API_KEY || !getEmailVerificationSecret()) {
    res.status(503).json({ error: 'Email verification is not configured.' });
    return;
  }

  const registration = normalizeRegistration(req.body);
  const errors = validateRegistration(registration);

  if (Object.keys(errors).length > 0) {
    res.status(400).json({ error: 'Invalid registration payload.', fields: errors });
    return;
  }

  try {
    const code = createVerificationCode();
    const expiresAt = new Date(Date.now() + emailVerificationTtlMs).toISOString();
    const verification = await createNombaEmailVerification({
      email: registration.email,
      codeHash: hashVerificationCode(registration.email, code),
      registration,
      expiresAt,
    });

    await sendVerificationEmail({
      email: registration.email,
      firstName: registration.firstName,
      code,
    });

    res.status(202).json({
      success: true,
      verificationRequired: true,
      email: registration.email,
      expiresAt: verification.expiresAt,
    });
  } catch (error) {
    console.error('Unable to start Nomba hackathon email verification:', error);
    res.status(500).json({ error: 'Unable to send verification code.' });
  }
});

app.post('/api/nomba-hackathon/registrations/verify', async (req, res) => {
  if (!requireDatabase(res)) {
    return;
  }

  const email = textValue(req.body, 'email').toLowerCase();
  const code = textValue(req.body, 'code');

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d{6}$/.test(code)) {
    res.status(400).json({ error: 'Enter the 6-digit code sent to your email.' });
    return;
  }

  try {
    const verification = await getActiveNombaEmailVerification(email);

    if (!verification || new Date(verification.expiresAt).getTime() < Date.now()) {
      res.status(400).json({ error: 'Verification code has expired. Please request a new code.' });
      return;
    }

    if (verification.attempts >= emailVerificationMaxAttempts) {
      res.status(429).json({ error: 'Too many code attempts. Please request a new code.' });
      return;
    }

    if (!tokensMatch(hashVerificationCode(email, code), verification.codeHash)) {
      await incrementNombaEmailVerificationAttempts(verification.id);
      res.status(400).json({ error: 'Invalid verification code.' });
      return;
    }

    const registration = normalizeRegistration(verification.registrationPayload || {});
    const errors = validateRegistration(registration);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ error: 'Invalid registration payload.', fields: errors });
      return;
    }

    const savedRegistration = await completeNombaEmailVerification({
      id: verification.id,
      registration,
    });
    let confirmationEmailSent = true;

    try {
      await sendRegistrationConfirmationEmail({ registration });
    } catch (emailError) {
      confirmationEmailSent = false;
      console.error('Unable to send Nomba registration confirmation email:', emailError);
    }

    res.status(201).json({
      success: true,
      id: savedRegistration.id,
      createdAt: savedRegistration.created_at,
      confirmationEmailSent,
    });
  } catch (error) {
    console.error('Unable to verify Nomba hackathon registration:', error);
    res.status(500).json({ error: 'Unable to verify registration.' });
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
    const rows = await listNombaRegistrations({ limit, offset });
    const total = rows[0]?.totalCount || 0;
    const registrations = rows.map(({ totalCount: _totalCount, ...registration }) => registration);

    if (req.query.format === 'csv') {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename="nomba-hackathon-registrations.csv"');
      res.send(toCsv(registrations));
      return;
    }

    res.json({ registrations, limit, offset, total });
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
