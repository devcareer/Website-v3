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
- `ADMIN_PASSWORD=<admin login password>`
- `ADMIN_SESSION_SECRET=<long random secret used to sign browser admin sessions>`
- `RESEND_API_KEY=<Resend API key used to send verification codes>`
- `RESEND_FROM_EMAIL=DevCareerNomba Hackathon <message@hack.devcareer.io>`
- `EMAIL_VERIFICATION_SECRET=<long random secret used to hash email codes>`
- `DEVCAREER_X_URL=https://x.com/dev_careers`
- `DEVCAREER_INSTAGRAM_URL=https://www.instagram.com/dev_careers/`
- `NOMBA_HACKATHON_URL=https://devcareer.io/programs/nomba-hackathon`
- `NOMBA_DOCS_URL=https://developer.nomba.com`
- `DATABASE_SSL=true`
- `CORS_ORIGIN=` can stay empty if the frontend and API are served by this same Web Service.

For local development, put these values in `.env.local`. That file is ignored by git and is loaded by the Node server after `.env`, so local values can override shared defaults without being committed.

## Endpoints

- Public form submit / send code: `POST /api/nomba-hackathon/registrations`
- Public code verification / save registration: `POST /api/nomba-hackathon/registrations/verify`
- Admin login page: `/hackathon/admin`
- Admin fallback page: `/admin/nomba-hackathon`
- Admin login API: `POST /api/admin/login`
- Admin JSON export: `GET /api/admin/nomba-hackathon/registrations`
- Admin CSV export: `GET /api/admin/nomba-hackathon/registrations?format=csv`

Pass the admin token with either header:

```txt
Authorization: Bearer <ADMIN_API_KEY>
```

or:

```txt
x-admin-token: <ADMIN_API_KEY>
```
