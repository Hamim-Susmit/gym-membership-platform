# Gym Membership Platform — Phase 1 MVP

Monorepo for Web + Mobile apps with a shared backend.
Members and Staff can use both platforms. Phase-1 includes QR check-ins,
membership status, and visit history.

## Structure
/backend   – backend API (Express + Prisma)
/web-app   – web interface (Next.js)
/mobile-app – mobile interface (React Native)
/docs      – documentation

## Quick Start (Backend)
1. `cd backend`
2. `cp .env.example .env` and update values.
3. `npm install`
4. `npm run prisma:generate`
5. `npm run prisma:migrate`
6. `npm run dev`

## Branch Workflow
main = stable
dev  = development
feature/* = feature branches
