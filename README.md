# Africhem Globalz website

Client-facing corporate and product enquiry website built with Next.js 16 App Router, React 19 and TypeScript. The application is in review mode by default; pages and response headers are `noindex` unless `SITE_INDEXABLE=true` is deliberately set for an approved launch.

## Run locally

Requirements: Node.js 22 LTS or newer, npm, and network access for the initial dependency install.

From the project folder (`D:\Africhem\Africhem-Globalz` in this workspace), open PowerShell and run:

```powershell
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Stop the server with **Ctrl+C**. If port 3000 is already in use, Next.js will report the alternate local address it selected.

Optional environment settings are documented in `.env.example`. For local development, copy it to `.env.local` only if you need to change the site URL, indexing behavior, or configure quotation email. `.env.local` is ignored by Git; never commit credentials. The quote form stays unavailable until valid Resend settings and `QUOTE_FORM_ENABLED=true` are present. You can still run and review the rest of the site without them.

Useful commands:

```powershell
npm run lint
npm run typecheck
npm run build
npm run start
```

`npm run start` serves a production build, so run `npm run build` first. It defaults to port 3000; use `npm run start -- --hostname 127.0.0.1 --port 3100` to select a local address and port.

## Current pages

- `/` — chemical sourcing home page and five-family carousel.
- `/products`, `/products/[family]`, `/products/[family]/[product]` — five chemical families; White Spirit and Thinner are the only named chemical products in the client source.
- `/other-businesses` and documented detail pages — additional business directory; areas without approved details are marked as coming soon.
- `/industries` — business pillars page (its displayed heading is “Business Pillars”).
- `/how-it-works`, `/global-reach`, `/about`, `/contact`.
- `/privacy` and `/terms` — review drafts, not approved legal policies.

Legacy redirects are configured in `next.config.ts`: `/categories` goes to `/products`; old category paths go to their current product or business pages; `/industries` remains the current business pillars route (it is not redirected).

## Project map

- `app/` — route pages, metadata, shared styles, robots and sitemap handlers.
- `components/` — shared navigation and page sections, forms, product decks and interactive globe.
- `lib/` — sourced company content, product/business data, navigation, quote validation and globe locations.
- `public/` — logo, illustrative local images, flags and globe loading images.
- `styles/tokens.css` — shared visual tokens; page-specific styles live beside route components or in `app/`.
- `docs/` — architecture, source inventory, approvals still needed, setup notes and dated historical reports.
- `.env.example` — environment variable names and safe defaults; it contains no active secrets.

The site uses local Inter fonts, light/dark themes, responsive layouts, GSAP/Lenis scroll behavior, Motion UI interactions, and a lazily loaded Three.js globe with a static fallback. Preserve the established visual design and page structure unless a specific change is requested.

## Important content and launch notes

- Partner countries are not claims of Africhem offices, warehouses or shipping routes.
- Product grades, stock, pricing, certifications, legal identity and unverified service claims must not be invented.
- The quote API uses Resend only when explicitly configured. No successful live inbox receipt is implied by the local preview.
- Indexing is off by default. Confirm the production URL and launch approval before changing `SITE_INDEXABLE`.
- See `docs/architecture.md`, `docs/content-inventory.md`, `docs/roadmap.md`, and `docs/founder-approval-checklist.md` for current implementation boundaries and remaining content decisions.

## Historical records

`docs/phase-1-report.md`, `docs/phase-2-notes.md`, `docs/revision-audit-2026-10-24.md`, and `docs/stax-personal-v2-requirements.md` record earlier snapshots or design requirements. Their status statements describe those dates and must not be read as current implementation status. The current code and this README describe the present route set.
