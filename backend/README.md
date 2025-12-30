# Backend API

Premium-grade Node.js + Express API with Prisma/PostgreSQL.

## Setup

1. Copy `.env.example` to `.env` and update values.
2. Install dependencies: `npm install`
3. Generate Prisma client: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Start dev server: `npm run dev`

## Key Endpoints

- `GET /health`
- `GET /health/ready`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /users/me`
- `GET /locations`

## Roles

- MEMBER
- TRAINER
- LOCATION_ADMIN
- SUPER_ADMIN
