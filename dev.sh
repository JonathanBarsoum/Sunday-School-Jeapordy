#!/usr/bin/env bash
set -e

echo "Starting PostgreSQL..."
docker compose up -d

echo "Starting API and Web..."
pnpm --dir apps/api start:dev &
API_PID=$!

pnpm --dir apps/web dev &
WEB_PID=$!

echo "opening prisma studio"
pnpm --dir apps/api prisma studio &
API_PID=$!

echo ""
echo "API: http://localhost:3000"
echo "Web: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers."

trap "kill $API_PID $WEB_PID; docker compose stop; exit" INT

wait
