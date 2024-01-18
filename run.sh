docker compose up -d --build
echo "the dashboard is running on http://localhost:8080"
cd server/ 
pnpm install && pnpm dev