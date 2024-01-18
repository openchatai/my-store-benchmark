docker compose up -d --build
echo "the dashboard is running on http://localhost:8080"
docker compose exec server npm run db:migrate