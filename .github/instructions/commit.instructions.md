---
applyTo: "**"
---

# GitHub Copilot — Commit Instructions

Use these rules whenever writing or suggesting a git commit message in this repository.

---

## Format

```
<type>(<scope>): <short summary>

[optional body]

[optional footer(s)]
```

- **Header line** must be ≤ 72 characters.
- **Type** and **scope** are lowercase.
- **Summary** is imperative mood, lowercase first letter, no trailing period.
- Blank line between header and body; blank line between body and footers.

---

## Types

| Type       | When to use                                                        |
| ---------- | ------------------------------------------------------------------ |
| `feat`     | A new feature visible to users or API consumers                    |
| `fix`      | A bug fix                                                          |
| `refactor` | Code change that neither fixes a bug nor adds a feature            |
| `chore`    | Tooling, config, dependency updates, CI — no production code change|
| `docs`     | Documentation only (README, JSDoc, comments)                       |
| `style`    | Formatting, whitespace — no logic change                           |
| `test`     | Adding or updating tests                                           |
| `perf`     | Performance improvement                                            |
| `ci`       | CI/CD pipeline changes                                             |
| `build`    | Build system or external dependency changes                        |
| `revert`   | Reverts a previous commit                                          |

---

## Scopes

Use the package or layer the change touches:

| Scope      | Covers                                   |
| ---------- | ---------------------------------------- |
| `client`   | `packages/client`                        |
| `server`   | `packages/server`                        |
| `shared`   | `packages/shared`                        |
| `db`       | `packages/server/src/db`                 |
| `routes`   | `packages/server/src/routes`             |
| `middleware` | `packages/server/src/middleware`       |
| `docker`   | `Dockerfile.*`, `docker-compose.yml`     |
| `config`   | Root config files (`tsconfig`, ESLint, Prettier, etc.) |
| `ci`       | `.github/workflows`                      |
| `repo`     | Root-level / cross-cutting concerns      |

Omit the scope only when the change is truly cross-cutting and no single scope fits.

---

## Examples

```
feat(routes): add POST /api/users endpoint
fix(db): handle pool connection timeout on startup
refactor(client): extract ApiClient hook from App.tsx
chore(deps): bump express from 4.19.0 to 4.21.0
docs(repo): update README with Docker Compose quickstart
test(server): add integration tests for health route
ci: add lint and typecheck jobs to GitHub Actions workflow
```

---

## Rules

1. **Do not** use past tense ("added", "fixed") — use imperative ("add", "fix").
2. **Do not** capitalise the first word of the summary.
3. **Do not** end the subject line with a period.
4. If a commit closes a GitHub issue, add `Closes #<n>` in the footer.
5. If a commit introduces a breaking change, add `BREAKING CHANGE: <description>` in the footer.
6. Keep each commit focused on a single logical change — avoid "and also" commits.
7. Reference pull-request numbers in the footer when relevant: `PR #<n>`.
