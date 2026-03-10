# fullstack-agentic-scribe

A production-ready fullstack monorepo that showcases React agents, built with a strict TypeScript stack, raw PostgreSQL (no ORM), and Docker Compose for one-command local development.

---

## Tech stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Client    | React 18, TypeScript, Vite, Tailwind CSS        |
| Server    | Node 20, Express 4, TypeScript, `pg` (raw SQL)  |
| Database  | PostgreSQL 16                                   |
| Shared    | TypeScript types / interfaces package           |
| Tooling   | npm workspaces, ESLint, Prettier, Docker Compose|

---

## Project structure

```
fullstack-agentic-scribe/
├── packages/
│   ├── client/                  # React + Vite frontend
│   │   └── src/
│   │       ├── components/      # HealthStatus, UserList, …
│   │       ├── App.tsx
│   │       └── main.tsx
│   ├── server/                  # Express API
│   │   └── src/
│   │       ├── db/
│   │       │   ├── pool.ts      # Shared pg.Pool instance
│   │       │   └── init.ts      # Idempotent schema bootstrap
│   │       ├── routes/
│   │       │   ├── health.ts    # GET /api/health
│   │       │   └── users.ts     # GET /api/users
│   │       ├── middleware/
│   │       │   └── errorHandler.ts
│   │       └── index.ts         # App entry point
│   └── shared/                  # Shared TypeScript types
│       └── src/index.ts
├── Dockerfile.client
├── Dockerfile.server
├── docker-compose.yml
├── tsconfig.json                # Root (references only)
└── package.json                 # npm workspaces root
```

---

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (or Docker Engine + Compose v2)
- Node.js 20+ and npm 10+ (for local development without Docker)

---

## Getting started

### Docker Compose (recommended)

Spins up PostgreSQL, the API server, and the Vite dev server in one command:

```bash
npm run dev
# or directly:
docker compose up --build
```

| Service  | URL                          |
| -------- | ---------------------------- |
| Client   | http://localhost:3000        |
| API      | http://localhost:5000        |
| Database | localhost:5432               |

The server automatically creates the `users` table on first startup — no migration step required.

### Local development (without Docker)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set environment variables** (create a `.env` file in `packages/server/` or export in your shell):

   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fullstack_db
   PORT=5000
   CLIENT_ORIGIN=http://localhost:3000
   ```

3. **Start PostgreSQL** however you prefer (local install, Docker, etc.)

4. **Start the server**

   ```bash
   npm run dev --workspace=packages/server
   ```

5. **Start the client** (in a separate terminal)

   ```bash
   npm run dev --workspace=packages/client
   ```

---

## API endpoints

| Method | Path          | Description                        |
| ------ | ------------- | ---------------------------------- |
| GET    | `/api/health` | Server & database connectivity     |
| GET    | `/api/users`  | List all users (ordered by email)  |

*All route handlers in `packages/server` use TypeScript generics (see `src/utils/routeTypes.ts`) so request parameters and response bodies are checked at compile time.*

All `/api/*` routes are rate-limited to **100 requests per minute per IP**.

---

## Available scripts (root)

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm run dev`     | Start all services via Docker Compose       |
| `npm run lint`    | ESLint across all packages                  |
| `npm run format`  | Prettier write across all packages          |

Per-package scripts (run with `--workspace=packages/<name>`):

| Script      | Description                        |
| ----------- | ---------------------------------- |
| `dev`       | Start dev server (tsx watch / vite)|
| `build`     | Compile TypeScript                 |
| `start`     | Run compiled output (`node dist/`) |

---

## Environment variables

| Variable        | Default                                              | Description                     |
| --------------- | ---------------------------------------------------- | ------------------------------- |
| `DATABASE_URL`  | `postgresql://postgres:postgres@postgres:5432/fullstack_db` | PostgreSQL connection string |
| `PORT`          | `5000`                                               | Express server port             |
| `CLIENT_ORIGIN` | `http://localhost:3000`                              | Allowed CORS origin             |
| `NODE_ENV`      | `development`                                        | Node environment                |

---

## Database

The server uses raw SQL via the [`pg`](https://node-postgres.com/) library — no ORM. On startup, `src/db/init.ts` runs:

```sql
CREATE TABLE IF NOT EXISTS users (
  id    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  email TEXT UNIQUE NOT NULL,
  name  TEXT
);
```

This is idempotent and safe to run on every restart.

---

## License

[MIT](LICENSE)
