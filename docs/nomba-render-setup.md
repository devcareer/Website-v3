# Nomba Hackathon Render Setup

Use a Render Web Service for this repo so the React build and API run from the same origin.

## Services

1. Create a Render Postgres database.
2. Create a Render Web Service connected to this repo.

## Web Service Settings

- Runtime: Node
- Build command: `HUSKY=0 yarn install --frozen-lockfile && yarn build`
- Start command: `yarn start`

## Environment Variables

- `NODE_ENV=production`
- `DATABASE_URL=<Render Postgres internal database URL>`
- `ADMIN_API_KEY=<long random secret>`
- `DATABASE_SSL=true`
- `CORS_ORIGIN=` can stay empty if the frontend and API are served by this same Web Service.

## Endpoints

- Public form submit: `POST /api/nomba-hackathon/registrations`
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
