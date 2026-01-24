#!/usr/bin/env bash
docker compose up -d

# Wait for PostgreSQL health check to pass
echo "Waiting for PostgreSQL to be healthy..."
while [ "$(docker inspect --format='{{json .State.Health}}' study_postgres | grep -o '"Status":"healthy"')" != '"Status":"healthy"' ]; do
  sleep 2
done
echo "PostgreSQL is healthy"

set -e


echo "▶ Running Prisma migrations"
./node_modules/.bin/prisma migrate deploy
