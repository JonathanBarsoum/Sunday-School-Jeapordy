#!/usr/bin/env bash
set -e

echo "Starting PostgreSQL..."
docker compose up -d

echo "Starting API..."
pnpm --dir apps/api start:dev &
API_PID=$!

echo "Starting Web..."
pnpm --dir apps/web dev &
WEB_PID=$!

echo "Opening Prisma Studio..."
pnpm --dir apps/api prisma studio &
STUDIO_PID=$!

echo ""
echo "API: http://localhost:3000"
echo "Web: http://localhost:5173"
echo "Prisma Studio: http://localhost:5555"
echo ""
echo "Press Ctrl+C to stop everything."

trap "kill $API_PID $WEB_PID $STUDIO_PID; docker compose stop; exit" INT

wait
