import crypto from 'node:crypto';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {
  completeNombaEmailVerification,
  consumeNombaEmailVerification,
  createNombaEmailVerification,
  getActiveNombaEmailVerification,
  getNombaEmailVerificationById,
  hasDatabase,
  initializeDatabase,
  incrementNombaEmailVerificationAttempts,
  listNombaPendingVerifications,
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
const reverificationLinkTtlMs = Number(process.env.REVERIFICATION_LINK_TTL_MS || 7 * 24 * 60 * 60 * 1000);
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'DevCareerNomba Hackathon <message@hack.devcareer.io>';
const resendBatchSize = 100;
const emailSenderName = 'DevCareerNomba Hackathon';
const hackathonName = 'Nomba Forward Hackathon 2026';
const devCareerXUrl = process.env.DEVCAREER_X_URL || 'https://x.com/dev_careers';
const devCareerInstagramUrl = process.env.DEVCAREER_INSTAGRAM_URL || 'https://www.instagram.com/dev_careers/';
const devCareerWorkspaceUrl = process.env.DEVCAREER_WORKSPACE_URL || 'https://bit.ly/devcareerafrica';
const hackathonPageUrl = process.env.NOMBA_HACKATHON_URL || 'https://devcareer.io/programs/nomba-hackathon';

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
const maskEmail = (email) => email.replace(/^(.).+(@.+)$/, '$1***$2');
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

const validateRegistration = (registration, { allowMissingTeamSize = false } = {}) => {
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

    const teamSizeIsMissing = registration.teamSize === null || registration.teamSize === undefined;

    if (![2, 3, 4].includes(registration.teamSize) && !(allowMissingTeamSize && teamSizeIsMissing)) {
      errors.teamSize = 'Invalid team size';
    }
  }

  if (!registration.consentOriginality) {
    errors.consentOriginality = 'Required';
  }

  return errors;
};

const validateStoredRegistration = (registration) => validateRegistration(registration, { allowMissingTeamSize: true });

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

const getPublicOrigin = () => {
  const configuredUrl = process.env.PUBLIC_BASE_URL || process.env.SITE_URL || process.env.NOMBA_PUBLIC_URL || hackathonPageUrl;

  try {
    return new URL(configuredUrl).origin;
  } catch (_error) {
    return 'https://devcareer.io';
  }
};

const signReverificationPayload = (encodedPayload) => {
  const secret = getEmailVerificationSecret();

  if (!secret) {
    return '';
  }

  return crypto.createHmac('sha256', secret).update(`nomba-reverify:${encodedPayload}`).digest('base64url');
};

const createReverificationToken = ({ verificationId, email }) => {
  const payload = {
    purpose: 'nomba-reverify',
    verificationId: Number(verificationId),
    email: String(email || '').trim().toLowerCase(),
    exp: Date.now() + reverificationLinkTtlMs,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = signReverificationPayload(encodedPayload);

  return `${encodedPayload}.${signature}`;
};

const verifyReverificationToken = (token) => {
  const [encodedPayload, signature] = String(token || '').split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signReverificationPayload(encodedPayload);

  if (!tokensMatch(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));

    if (payload.purpose !== 'nomba-reverify' || !payload.verificationId || !payload.email || Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (_error) {
    return null;
  }
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

const sendEmailBatch = async (emails, { idempotencyKey } = {}) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Email verification is not configured.');
  }

  if (!Array.isArray(emails) || emails.length === 0) {
    return { data: [] };
  }

  if (emails.length > resendBatchSize) {
    throw new Error(`Resend batch email payload cannot exceed ${resendBatchSize} emails.`);
  }

  const response = await postJson('https://api.resend.com/emails/batch', {
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    payload: emails.map((email) => ({
      from: resendFromEmail,
      to: [email.to],
      subject: email.subject,
      text: email.text,
      html: email.html,
    })),
  });
  const { data } = response;

  if (!response.ok) {
    console.error(
      'Unable to send Nomba email batch:',
      data?.message || data?.error || response.statusText || response.status
    );
    throw new Error('Unable to send email batch.');
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
  const fullName = [registration.firstName, registration.lastName].filter(Boolean).join(' ') || registration.firstName || 'there';
  const displayName = escapeHtml(fullName);

  return sendEmail({
    to: registration.email,
    subject: 'Welcome to the Nomba x DevCareer Hackathon',
    text: [
      `Hey ${fullName},`,
      '',
      'You are registered! Welcome to the Nomba X DevCareer Hackathon 2026.',
      'You are now in the running for the USD 4,000 first-place prize, USD 1,500 for 2nd, and USD 1,000 for 3rd.',
      'Importantly, you have taken the first step toward becoming a Nomba Partner.',
      '',
      'Below is your official, detailed playbook featuring the 5 precise tracks made available to you by the Nomba team.',
      'Review these closely with your current team, or use them to brainstorm if you are looking for a squad!',
      '',
      'Timeline Reminder',
      'June 8 - 23: Registration is live. Get your designer, PM, or dev friends to sign up before it closes!',
      'June 24 - 29: Onboarding Week & Nomba Forward Deployed Engineer Training: Developer deep-dives, API walkthroughs, and AMA sessions.',
      'June 30 - July 7: Build Week: Development phase. Project submissions close on July 5, 2026.',
      'July 8 - 14: Judging Week: Expert panels review the code and implementation.',
      'July 19: Grand Demo Day & Awards!',
      '',
      `Need a refresher on what you need to do? Check here: ${hackathonPageUrl}`,
      '',
      'Your Immediate Next Steps',
      `Join our official workspace: DevCareer Workspace - ${devCareerWorkspaceUrl}`,
      'Declare your track or find a team: Head over to the #nomba-hackathon channel to get all official announcements, latest updates, and information on the hackathon.',
      'Watch your inbox: By June 23, 2026, we will blast out the official onboarding calendar with API keys, sandboxes, and documentation links. You will get first hand troubleshooting from the Nomba team.',
      '',
      "We can't wait to see what you build. Let's shift the landscape of Nigerian fintech!",
      '',
      'Best regards,',
      'The DevCareer Team',
    ].join('\n'),
    html: renderEmailShell({
      previewText: 'You are registered for the Nomba x DevCareer Hackathon 2026.',
      eyebrow: 'Registration confirmed',
      title: 'Welcome to the Nomba x DevCareer Hackathon',
      children: `
        <p style="margin: 0 0 16px; color: #252316; font-size: 16px; line-height: 1.7;">Hey ${displayName},</p>
        <p style="margin: 0 0 18px; color: #4a4631; font-size: 15px; line-height: 1.7;">
          <strong>You are registered!</strong> Welcome to the <strong>Nomba X DevCareer Hackathon 2026</strong>.
        </p>
        <p style="margin: 0 0 18px; color: #4a4631; font-size: 15px; line-height: 1.7;">
          You are now in the running for the <strong>USD 4,000 first-place prize</strong>
          (<strong>USD 1,500 for 2nd</strong>, and <strong>USD 1,000 for 3rd</strong>).
          Importantly, you have taken the first step toward becoming a <strong>Nomba Partner</strong>.
        </p>
        <p style="margin: 0 0 20px; color: #4a4631; font-size: 15px; line-height: 1.7;">
          Below is your <strong>official, detailed playbook</strong> featuring the <strong>5 precise tracks</strong>
          made available to you by the Nomba team. Review these closely with your current team, or use them to brainstorm
          if you are looking for a squad.
        </p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 22px 0;">
          <tr>
            <td style="background: #191917; border-radius: 18px; padding: 18px;">
              <p style="margin: 0 0 12px; color: #ffcc00; font-size: 13px; font-weight: 800; text-transform: uppercase;">Timeline Reminder</p>
              <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.8;">
                <strong>June 8 - 23:</strong> Registration is live. Get your designer, PM, or dev friends to sign up before it closes!<br>
                <strong>June 24 - 29:</strong> Onboarding Week &amp; Nomba Forward Deployed Engineer Training: Developer deep-dives, API walkthroughs, and AMA sessions.<br>
                <strong>June 30 - July 7:</strong> Build Week: Development phase. Project submissions close on <strong>July 5, 2026</strong>.<br>
                <strong>July 8 - 14:</strong> Judging Week: Expert panels review the code and implementation.<br>
                <strong>July 19:</strong> Grand Demo Day &amp; Awards!
              </p>
            </td>
          </tr>
        </table>

        <p style="margin: 0 0 18px; color: #4a4631; font-size: 15px; line-height: 1.7;">
          Need a refresher on what you need to do? <a href="${escapeHtml(hackathonPageUrl)}" target="_blank" rel="noopener noreferrer" style="color: #0d7a5f; font-weight: 800;">Check here</a>.
        </p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 22px 0;">
          <tr>
            <td style="background: #fff7d8; border: 1px solid #f2df8d; border-radius: 18px; padding: 18px;">
              <p style="margin: 0 0 14px; color: #191917; font-size: 15px; font-weight: 800;">Your Immediate Next Steps</p>
              <p style="margin: 0 0 12px; color: #4f4a33; font-size: 14px; line-height: 1.7;">
                <strong>1. Join our official workspace:</strong>
                <a href="${escapeHtml(devCareerWorkspaceUrl)}" target="_blank" rel="noopener noreferrer" style="color: #0d7a5f; font-weight: 800;">DevCareer Workspace</a>
                to connect with fellow participants.
              </p>
              <p style="margin: 0 0 12px; color: #4f4a33; font-size: 14px; line-height: 1.7;">
                <strong>2. Declare your track or find a team:</strong> Head over to the <strong>#nomba-hackathon</strong>
                channel to get official announcements, latest updates, and hackathon information.
              </p>
              <p style="margin: 0; color: #4f4a33; font-size: 14px; line-height: 1.7;">
                <strong>3. Watch your inbox:</strong> By <strong>June 23, 2026</strong>, we will blast out the official
                onboarding calendar with <strong>API keys, sandboxes, and documentation links</strong>. You will get first hand
                troubleshooting from the Nomba team.
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 24px 0;">
          <tr>
            <td style="padding-right: 10px;">${emailButton({ href: devCareerWorkspaceUrl, label: 'Join DevCareer Workspace' })}</td>
            <td>${emailButton({ href: hackathonPageUrl, label: 'Review Hackathon Brief', background: '#181818', color: '#ffffff' })}</td>
          </tr>
        </table>

        <p style="margin: 0 0 18px; color: #4a4631; font-size: 15px; line-height: 1.7;">
          We can't wait to see what you build. <strong>Let's shift the landscape of Nigerian fintech!</strong>
        </p>
        <p style="margin: 0; color: #252316; font-size: 15px; line-height: 1.7;">
          Best regards,<br>
          <strong>The DevCareer Team</strong>
        </p>

        ${renderSocialLinks()}
      `,
    }),
  });
};

const buildReverificationLinkEmailPayload = ({ registration, verificationUrl, linkExpiresAt }) => {
  const displayName = escapeHtml(registration.firstName || 'there');
  const linkExpiry = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Lagos',
  }).format(new Date(linkExpiresAt));

  return {
    to: registration.email,
    subject: 'Confirm your Nomba Forward Hackathon registration',
    text: [
      `Hi ${registration.firstName || 'there'},`,
      '',
      `We noticed your ${hackathonName} registration was started but not confirmed.`,
      'Click the link below once to confirm your application. We will send your registration confirmation email after it is verified.',
      '',
      verificationUrl,
      '',
      `This link expires on ${linkExpiry} WAT.`,
      '',
      emailSenderName,
    ].join('\n'),
    html: renderEmailShell({
      previewText: `Confirm your ${hackathonName} registration with one click.`,
      eyebrow: 'Registration confirmation',
      title: 'Complete your hackathon registration',
      children: `
        <p style="margin: 0 0 16px; color: #252316; font-size: 16px; line-height: 1.7;">Hi ${displayName},</p>
        <p style="margin: 0 0 18px; color: #4a4631; font-size: 15px; line-height: 1.7;">
          We noticed your <strong>${escapeHtml(hackathonName)}</strong> registration was started but not confirmed.
          Click the button below once to verify your application.
        </p>
        <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 22px 0;">
          <tr>
            <td>${emailButton({ href: verificationUrl, label: 'Confirm My Registration' })}</td>
          </tr>
        </table>
        <p style="margin: 0 0 10px; color: #4a4631; font-size: 14px; line-height: 1.7;">
          This link expires on <strong>${escapeHtml(linkExpiry)} WAT</strong>. If you already completed registration, you can ignore this email.
        </p>
        ${renderSocialLinks()}
      `,
    }),
  };
};

const sendReverificationLinkEmail = async ({ registration, verificationUrl, linkExpiresAt }) =>
  sendEmail(buildReverificationLinkEmailPayload({ registration, verificationUrl, linkExpiresAt }));

const renderOneClickResultPage = ({ title, message, tone = 'success' }) => {
  const isSuccess = tone === 'success';
  const accent = isSuccess ? '#0d7a5f' : '#a51d2d';

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${escapeHtml(title)}</title>
      </head>
      <body style="margin:0; min-height:100vh; display:grid; place-items:center; background:#f6f3e8; font-family:Arial, Helvetica, sans-serif; color:#181818;">
        <main style="width:min(100% - 32px, 560px); background:#fff; border:1px solid #ece4bd; border-radius:24px; padding:32px; box-shadow:0 18px 42px rgba(0,0,0,0.08);">
          <p style="margin:0 0 10px; color:${accent}; font-size:12px; font-weight:800; letter-spacing:1px; text-transform:uppercase;">${escapeHtml(hackathonName)}</p>
          <h1 style="margin:0 0 14px; font-size:28px; line-height:1.2;">${escapeHtml(title)}</h1>
          <p style="margin:0 0 22px; color:#4a4631; font-size:16px; line-height:1.7;">${escapeHtml(message)}</p>
          <a href="${escapeHtml(hackathonPageUrl)}" style="display:inline-block; background:#ffcc00; color:#181818; text-decoration:none; font-weight:800; padding:13px 18px; border-radius:999px;">View Hackathon Page</a>
        </main>
      </body>
    </html>
  `;
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

const chunkArray = (items, size) => {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
};

const listAllNombaPendingVerifications = async () => {
  const pageSize = 1000;
  const rows = [];
  let offset = 0;
  let total = null;

  while (total === null || rows.length < total) {
    const page = await listNombaPendingVerifications({ limit: pageSize, offset });

    if (total === null) {
      total = page[0]?.totalCount || 0;
    }

    if (page.length === 0) {
      break;
    }

    rows.push(...page);
    offset += page.length;
  }

  return {
    rows,
    total: total ?? rows.length,
  };
};

const serializePendingVerification = (row) => {
  const registration = normalizeRegistration(row.registrationPayload || {});
  const validationErrors = validateStoredRegistration(registration);

  return {
    id: row.id,
    email: row.email,
    firstName: registration.firstName,
    lastName: registration.lastName,
    phone: registration.phone,
    state: registration.state,
    participationMode: registration.participationMode,
    teamName: registration.teamName,
    teamSize: registration.teamSize,
    track: registration.track,
    focusArea: registration.focusArea,
    role: registration.role,
    experienceLevel: registration.experienceLevel,
    attempts: row.attempts,
    otpExpiresAt: row.expiresAt,
    createdAt: row.createdAt,
    expired: Boolean(row.expired),
    isValid: Object.keys(validationErrors).length === 0,
    validationErrors,
  };
};

const buildReverificationLinkForVerification = (verification) => {
  const token = createReverificationToken({
    verificationId: verification.id,
    email: verification.email,
  });

  return `${getPublicOrigin()}/api/nomba-hackathon/registrations/reverify?token=${encodeURIComponent(token)}`;
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
    const errors = validateStoredRegistration(registration);

    if (Object.keys(errors).length > 0) {
      await consumeNombaEmailVerification(verification.id);
      console.warn('Invalid stored Nomba registration payload during verification:', {
        verificationId: verification.id,
        email: maskEmail(email),
        fields: Object.keys(errors),
      });
      res.status(400).json({
        error: 'This verification session is outdated. Please submit the registration form again to get a fresh code.',
        fields: errors,
        requiresNewRegistration: true,
      });
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

app.get('/api/nomba-hackathon/registrations/reverify', async (req, res) => {
  if (!requireDatabase(res)) {
    return;
  }

  const token = typeof req.query.token === 'string' ? req.query.token : '';
  const payload = verifyReverificationToken(token);

  if (!payload) {
    res
      .status(400)
      .send(
        renderOneClickResultPage({
          title: 'Verification link is invalid',
          message: 'This confirmation link is invalid or has expired. Please return to the registration page to request a new code.',
          tone: 'error',
        })
      );
    return;
  }

  try {
    const verification = await getNombaEmailVerificationById(payload.verificationId);

    if (!verification || verification.consumedAt) {
      res.send(
        renderOneClickResultPage({
          title: 'Registration already handled',
          message: 'This confirmation link has already been used or the registration is no longer pending.',
        })
      );
      return;
    }

    if (String(verification.email || '').toLowerCase() !== payload.email) {
      res
        .status(400)
        .send(
          renderOneClickResultPage({
            title: 'Verification link is invalid',
            message: 'This confirmation link does not match the pending registration.',
            tone: 'error',
          })
        );
      return;
    }

    const registration = normalizeRegistration(verification.registrationPayload || {});
    const errors = validateStoredRegistration(registration);

    if (Object.keys(errors).length > 0) {
      await consumeNombaEmailVerification(verification.id);
      console.warn('Invalid stored Nomba registration payload during one-click verification:', {
        verificationId: verification.id,
        email: maskEmail(payload.email),
        fields: Object.keys(errors),
      });
      res
        .status(400)
        .send(
          renderOneClickResultPage({
            title: 'Registration needs to be resubmitted',
            message: 'This pending registration is missing required information. Please submit the registration form again.',
            tone: 'error',
          })
        );
      return;
    }

    const savedRegistration = await completeNombaEmailVerification({
      id: verification.id,
      registration,
    });

    let confirmationEmailSent = false;

    if (!savedRegistration.alreadyRegistered) {
      try {
        await sendRegistrationConfirmationEmail({ registration });
        confirmationEmailSent = true;
      } catch (emailError) {
        console.error('Unable to send Nomba registration confirmation email after one-click verification:', emailError);
      }
    }

    res.send(
      renderOneClickResultPage({
        title: savedRegistration.alreadyRegistered ? 'Registration already confirmed' : 'Registration confirmed',
        message: savedRegistration.alreadyRegistered
          ? 'Your Nomba Forward Hackathon registration was already confirmed. Watch your inbox for hackathon updates.'
          : confirmationEmailSent
            ? 'Your Nomba Forward Hackathon registration is now confirmed. We have sent your confirmation email.'
            : 'Your Nomba Forward Hackathon registration is now confirmed. We could not send the confirmation email right now, but your application has been saved.',
      })
    );
  } catch (error) {
    console.error('Unable to complete one-click Nomba hackathon verification:', error);
    res
      .status(500)
      .send(
        renderOneClickResultPage({
          title: 'Unable to confirm registration',
          message: 'We could not confirm this registration right now. Please try again or contact the DevCareer team.',
          tone: 'error',
        })
      );
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

app.get('/api/admin/nomba-hackathon/verifications/pending', requireAdminToken, async (req, res) => {
  if (!requireDatabase(res)) {
    return;
  }

  const requestedLimit = Number(req.query.limit || 50);
  const requestedOffset = Number(req.query.offset || 0);
  const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 1000) : 50;
  const offset = Number.isFinite(requestedOffset) ? Math.max(requestedOffset, 0) : 0;

  try {
    const rows = await listNombaPendingVerifications({ limit, offset });
    const total = rows[0]?.totalCount || 0;
    const verifications = rows.map(serializePendingVerification);

    res.json({ verifications, limit, offset, total });
  } catch (error) {
    console.error('Unable to list pending Nomba hackathon verifications:', error);
    res.status(500).json({ error: 'Unable to load unverified registrations.' });
  }
});

app.post('/api/admin/nomba-hackathon/verifications/reverification-links/batch', requireAdminToken, async (_req, res) => {
  if (!requireDatabase(res)) {
    return;
  }

  try {
    const { rows, total } = await listAllNombaPendingVerifications();
    const linkExpiresAt = new Date(Date.now() + reverificationLinkTtlMs).toISOString();
    const skippedInvalid = [];
    const batchItems = [];

    rows.forEach((verification) => {
      const registration = normalizeRegistration(verification.registrationPayload || {});
      const errors = validateStoredRegistration(registration);

      if (Object.keys(errors).length > 0) {
        skippedInvalid.push({
          id: verification.id,
          fields: Object.keys(errors),
        });
        return;
      }

      const verificationUrl = buildReverificationLinkForVerification(verification);

      batchItems.push({
        verificationId: verification.id,
        emailPayload: buildReverificationLinkEmailPayload({
          registration,
          verificationUrl,
          linkExpiresAt,
        }),
      });
    });

    if (batchItems.length === 0) {
      res.json({
        success: true,
        sent: 0,
        total,
        eligible: 0,
        skippedInvalid: skippedInvalid.length,
        batches: 0,
        linkExpiresAt,
      });
      return;
    }

    const emailIds = [];
    const chunks = chunkArray(batchItems, resendBatchSize);

    for (let index = 0; index < chunks.length; index += 1) {
      const chunk = chunks[index];
      const idempotencyHash = crypto
        .createHash('sha256')
        .update(chunk.map((item) => item.verificationId).join(','))
        .digest('hex')
        .slice(0, 32);
      const idempotencyKey = `nomba-reverify-${Math.floor(Date.now() / 86400000)}-${index + 1}-${idempotencyHash}`;
      const data = await sendEmailBatch(
        chunk.map((item) => item.emailPayload),
        { idempotencyKey }
      );
      const sentIds = Array.isArray(data?.data) ? data.data : [];

      emailIds.push(...sentIds);
    }

    res.json({
      success: true,
      sent: batchItems.length,
      total,
      eligible: batchItems.length,
      skippedInvalid: skippedInvalid.length,
      batches: chunks.length,
      emailIds,
      linkExpiresAt,
    });
  } catch (error) {
    console.error('Unable to send Nomba hackathon batch reverification links:', error);
    res.status(500).json({ error: 'Unable to send batch re-verification links.' });
  }
});

app.post('/api/admin/nomba-hackathon/verifications/:id/reverification-link', requireAdminToken, async (req, res) => {
  if (!requireDatabase(res)) {
    return;
  }

  const verificationId = Number(req.params.id);

  if (!Number.isFinite(verificationId) || verificationId <= 0) {
    res.status(400).json({ error: 'Invalid verification id.' });
    return;
  }

  try {
    const verification = await getNombaEmailVerificationById(verificationId);

    if (!verification || verification.consumedAt) {
      res.status(404).json({ error: 'Pending registration was not found.' });
      return;
    }

    const registration = normalizeRegistration(verification.registrationPayload || {});
    const errors = validateStoredRegistration(registration);

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        error: 'This pending registration is missing required information. Ask the applicant to submit the form again.',
        fields: errors,
      });
      return;
    }

    const linkExpiresAt = new Date(Date.now() + reverificationLinkTtlMs).toISOString();
    const verificationUrl = buildReverificationLinkForVerification(verification);

    await sendReverificationLinkEmail({
      registration,
      verificationUrl,
      linkExpiresAt,
    });

    res.json({
      success: true,
      email: verification.email,
      linkExpiresAt,
    });
  } catch (error) {
    console.error('Unable to send Nomba hackathon reverification link:', error);
    res.status(500).json({ error: 'Unable to send re-verification link.' });
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
