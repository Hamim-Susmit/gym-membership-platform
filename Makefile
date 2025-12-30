# Developer helper shortcuts

.PHONY: backend-setup generate migrate start-backend start-web smoke-test

backend-setup:
	@echo "Copy backend/.env.example to backend/.env and edit values (DATABASE_URL, JWT secrets)."
	@if [ -f backend/.env.example ]; then cp backend/.env.example backend/.env && echo "Created backend/.env"; else echo "No backend/.env.example found"; fi

generate:
	cd backend && npx prisma generate

migrate:
	cd backend && npx prisma migrate dev --name init

start-backend:
	cd backend && npm run start

start-web:
	cd web-app && npm run dev

smoke-test:
	@node ./scripts/smoke-test.js
