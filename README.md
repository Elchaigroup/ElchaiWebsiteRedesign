# Elchai Website Redesign

Next.js 15.5 (App Router, Turbopack) · React 19 · TypeScript 5.9 (strict) · Tailwind v4 · Three.js · Framer Motion · Resend · Zod 4.

## Quick start

```bash
nvm use            # picks up .nvmrc (Node 20.18.0+)
npm install
cp .env.example .env.local   # fill in Resend / WP / Turnstile keys
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Turbopack dev server on `:3000` |
| `npm run build` | Production build (68 static pages) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` (strict) |
| `npm run lint` | `next lint` |
| `npm run analyze` | `ANALYZE=true next build` — opens bundle analyzer |
| `npm run test:e2e` | Playwright smoke suite |

## Project docs

- **[HANDOFF.md](HANDOFF.md)** — architecture snapshot, locked decisions, owner notes. **Read this first.**
- **[design-system.md](design-system.md)** — locked visual spec (tokens, type scale, motion).
- **[CHANGES.md](CHANGES.md)** — copy and override log.

## Environment variables

Required for production:

| Var | Purpose |
|---|---|
| `RESEND_API_KEY` | Lead-email delivery |
| `LEAD_EMAIL_TO` | Inbox for new leads (default `info@elchaigroup.com`) |
| `LEAD_EMAIL_FROM` | Verified Resend sender |
| `LEAD_WEBHOOK_URL` | Optional internal webhook fan-out |
| `WP_BASE_URL` | WordPress origin (https only) |
| `WP_APP_USER`, `WP_APP_PASSWORD` | WP application password |
| `WP_LEAD_ENDPOINT` | WP CPT lead endpoint |
| `REVALIDATE_SECRET` | Shared secret for `/api/revalidate` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile (server) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile (client widget) |
| `SENTRY_DSN` | Optional observability |

## Deployment

- Health check: `GET /api/healthz`
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- LLM feeds: `/llms.txt`, `/llms-full.txt`
- CI: `.github/workflows/ci.yml` (typecheck → lint → build → Playwright smoke)
