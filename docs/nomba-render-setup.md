# Nomba Hackathon Render Setup

Use a Render Web Service for this repo so the React build and API run from the same origin.

## Services

1. Create a Render Postgres database.
2. Create a Render Web Service connected to this repo.

## Web Service Settings

- Runtime: Node
- Build command: `HUSKY=0 yarn install --frozen-lockfile --production=false && yarn build`
- Start command: `yarn start`

## Environment Variables

- `DATABASE_URL=<Render Postgres internal database URL>`
- `ADMIN_API_KEY=<long random secret>`
- `ADMIN_EMAIL=<admin login email>`
- `ADMIN_EMAILS=<comma-separated admin emails, for example admin@example.com,nomba@devcareer.io>`
- `ADMIN_PASSWORD=<admin login password>`
- `ADMIN_SESSION_SECRET=<long random secret used to sign browser admin sessions>`
- `RESEND_API_KEY=<Resend API key used to send verification codes>`
- `RESEND_FROM_EMAIL=DevCareerNomba Hackathon <notif@send.devcareer.io>`
- `EMAIL_VERIFICATION_SECRET=<long random secret used to hash email codes>`
- `CERTIFICATE_VERIFICATION_TTL_MS=600000`
- `CERTIFICATE_VERIFICATION_MAX_ATTEMPTS=5`
- `CERTIFICATE_REQUEST_COOLDOWN_MS=60000`
- `CERTIFICATE_REQUEST_EMAIL_HOURLY_LIMIT=5`
- `CERTIFICATE_REQUEST_EMAIL_DAILY_LIMIT=12`
- `CERTIFICATE_REQUEST_IP_WINDOW_MS=900000`
- `CERTIFICATE_REQUEST_IP_LIMIT=30`
- `CERTIFICATE_VERIFY_IP_WINDOW_MS=900000`
- `CERTIFICATE_VERIFY_IP_LIMIT=60`
- `CERTIFICATE_CLAIM_EMAIL_DAILY_LIMIT=3`
- `DEVCAREER_X_URL=https://x.com/dev_careers`
- `DEVCAREER_INSTAGRAM_URL=https://www.instagram.com/dev_careers/`
- `DEVCAREER_LINKEDIN_URL=https://www.linkedin.com/company/devcareers/`
- `NOMBA_HACKATHON_URL=https://devcareer.io/programs/nomba-hackathon`
- `NOMBA_DOCS_URL=https://developer.nomba.com`
- `DATABASE_SSL=true`
- `CORS_ORIGIN=` can stay empty if the frontend and API are served by this same Web Service.

The `RESEND_API_KEY` must be allowed to send from the domain in
`RESEND_FROM_EMAIL`. If the key is domain-restricted, make sure the matching
Resend domain is verified before testing certificate OTP delivery.
The `resend.dev` sandbox sender is not suitable for this certificate flow
because participant OTPs go to many external recipients.

`GET /api/health` reports non-secret readiness flags for the database, Resend
key presence, OTP signing secret presence, and certificate verification wiring.

For local development, put these values in `.env.local`. That file is ignored by git and is loaded by the Node server after `.env`, so local values can override shared defaults without being committed.

## Endpoints

- Public form submit / send code: `POST /api/nomba-hackathon/registrations`
- Public code verification / save registration: `POST /api/nomba-hackathon/registrations/verify`
- Public certificate OTP request: `POST /api/nomba-hackathon/certificates/request`
- Public certificate OTP verification: `POST /api/nomba-hackathon/certificates/verify`
- Admin login page: `/hackathon/admin`
- Admin certificate page: `/hackathon/admin/certificates`
- Admin fallback page: `/admin/nomba-hackathon`
- Admin login API: `POST /api/admin/login`
- Admin JSON export: `GET /api/admin/nomba-hackathon/registrations`
- Admin CSV export: `GET /api/admin/nomba-hackathon/registrations?format=csv`
- Admin certificate summary: `GET /api/admin/nomba-hackathon/certificates/summary`
- Admin certificate recipients: `GET /api/admin/nomba-hackathon/certificates/recipients`
- Admin add certificate recipients: `POST /api/admin/nomba-hackathon/certificates/recipients`
- Admin certificate claims: `GET /api/admin/nomba-hackathon/certificates/claims`

Pass the admin token with either header:

```txt
Authorization: Bearer <ADMIN_API_KEY>
```

or:

```txt
x-admin-token: <ADMIN_API_KEY>
```
