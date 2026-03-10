# GitHub Copilot — Repository Instructions

These instructions apply to every Copilot interaction in this repository.

---

## Project overview

**fullstack-agentic-scribe** is a production-ready TypeScript monorepo containing:

- `packages/client` — React 18 + Vite + Tailwind CSS frontend
- `packages/server` — Express 4 API using raw PostgreSQL (`pg`) — no ORM
- `packages/shared` — shared TypeScript types consumed by both client and server

Dependencies are managed via **npm workspaces**. All services run together with `docker compose up --build`.

---

## Tech stack

| Layer    | Stack                                        |
| -------- | -------------------------------------------- |
| Client   | React 18, TypeScript, Vite, Tailwind CSS     |
| Server   | Node 20, Express 4, `pg`, `express-rate-limit` |
| Database | PostgreSQL 16 (raw SQL, no ORM)              |
| Tooling  | npm workspaces, ESLint, Prettier, Docker Compose |

---

## Code conventions

### TypeScript
- **Strict mode is on** (`"strict": true`) across all packages — never disable it.
- Prefer `type` imports (`import type { Foo } from '…'`) for type-only imports.
- Avoid `any`; use explicit types or `unknown` with narrowing.
- All async functions must have explicit return types (e.g. `Promise<void>`).

### Formatting & linting
- Prettier config: single quotes, 2-space indent, trailing commas (`es5`), 100-char line width.
- ESLint: `@typescript-eslint/recommended` + `react/recommended` + `react-hooks/recommended`.
- Run `npm run lint` and `npm run format` before committing.

### Naming
- Files: `camelCase.ts` / `PascalCase.tsx` for React components.
- Variables & functions: `camelCase`.
- Types & interfaces: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` for true module-level constants; `camelCase` for local consts.

### Imports
- Use the `@shared/*` path alias to import from `packages/shared/src/`.
- Group imports: external packages → internal aliases → relative paths.
- No barrel files (`index.ts` re-exports) unless in `packages/shared/src/`.

---

## Server patterns

- Each resource gets its own router file under `src/routes/`.
- Database access goes through `src/db/pool.ts` (the single shared `pg.Pool`).
- Schema bootstrap lives in `src/db/init.ts` (idempotent `CREATE TABLE IF NOT EXISTS`).
- Use `satisfies ApiError` when returning error JSON shapes so TypeScript validates the shape.
- All routes that hit the database must be covered by the `apiLimiter` rate-limit middleware.
- Express error-handling middleware lives in `src/middleware/errorHandler.ts` and must be the last `app.use()`.

### SQL style
- Write raw SQL strings; do **not** add any ORM or query builder.
- Always use parameterised queries (`pool.query('SELECT … WHERE id = $1', [id])`) — never string-interpolate user input.
- Table and column names: `snake_case`.

---

## Client patterns

- React components live in `src/components/`.
- `App.tsx` composes components; it should not contain raw JSX markup beyond the page shell.
- Use Tailwind utility classes; avoid inline `style` props.
- Fetch data with `fetch('/api/…')` — the Vite dev proxy forwards these to the server.
- Use `useState` + `useEffect` for data fetching; prefer dedicated hooks for anything reused.

---

## Testing

- Client: Vitest (`npm run test --workspace=packages/client`).
- Server: add tests under `packages/server/src/__tests__/`.
- Test files: `*.test.ts` / `*.test.tsx`.
- Do not remove or skip existing tests.

---

## Docker / deployment

- `Dockerfile.server` and `Dockerfile.client` are multi-stage-ready; keep them lean (Alpine base).
- Do not install `devDependencies` in production images.
- `docker-compose.yml` is for local development only; the server service depends on the `postgres` service being healthy.
- Never hardcode secrets; use environment variables (see `docker-compose.yml` for the full list).
