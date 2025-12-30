# Local Supabase + Prisma (developer)

Follow these steps to run the backend against a Supabase Postgres DB locally:

1. Create or obtain a Supabase Postgres connection string (keep it secret).
2. Copy the example env: `cp backend/.env.example backend/.env` and set `DATABASE_URL` and other values (do not commit `.env`).
3. Generate Prisma client: `make generate` (or `cd backend && npx prisma generate`).
4. Run migrations: `make migrate` (or `cd backend && npx prisma migrate dev`).
5. Start backend: `make start-backend` (or `cd backend && npm run start`).
6. Start the web app (in another shell): `make start-web` (or `cd web-app && npm run dev`).

Notes:
- Always back up your DB before running migrations on production or shared environments.
- Use `SMOKE_API_URL` or `NEXT_PUBLIC_API_URL` to point the frontend to a running backend.
- A simple smoke test is provided at `scripts/smoke-test.js` (`make smoke-test`).
- There is a manual GitHub Action `e2e-smoke-test` (workflow_dispatch) that can be run with `SMOKE_API_URL` set as a secret.

**Automated CI smoke test**

An automated CI workflow is available and will run the smoke test on pushes to `main` and `dev` only when the `SMOKE_API_URL` repository secret is set. This ensures tests run against an approved test endpoint (do not set this to a production URL).

To enable automated smoke tests:

1. Add the repository secret `SMOKE_API_URL` with the URL of your test backend (e.g. `https://test-api.example.com`).
2. The CI job `ci-smoke-test` will run automatically on `push` to `main`/`dev` and is also triggerable manually via the Actions UI.

