# Module: Server (Express + TypeScript)

## Server  [User Input]
TypeScript Node.js server.

## Server  [AI Feedback]
(empty — no issues)

## Server  [AI Implementation]
- Express server serving built static files from `dist/client`
- Health check endpoint: `GET /api/health`
- SPA fallback for client-side routing
- Port: 3001 (configurable via PORT env var)
- Development uses Vite dev server (port 3000) with API proxy

## Server  [AI Todos]
- High score API (persist scores server-side)
- Leaderboard endpoint
