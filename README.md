# Africhem Globalz

Africhem Globalz website built with Next.js App Router, React, TypeScript, Tailwind CSS, Motion and GSAP. The production homepage is Coming Soon; the future homepage is under local review.

## Run locally

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open http://localhost:3000.

Use `npm run lint`, `npm run typecheck`, and `npm run build` to verify the project. Deploy the repository as a Next.js project on Vercel when ready.

The Phase 4 architecture is documented in [docs/architecture.md](docs/architecture.md). Open `http://localhost:3000/home-preview` for the cinematic homepage or `http://localhost:3000/shell-preview` for the retained shell review. Both previews are noindex and excluded from public navigation and sitemap. Supporting routes are minimal foundations; changes have not been deployed.

## Editing later

- Page wording: `components/ComingSoonHero.tsx`
- Fixed launch deadline: `lib/countdown.ts`
- Countdown display: `components/Countdown.tsx`
- Notification form UI: `components/NotifyForm.tsx`
- Contact placeholders: `components/ContactInfo.tsx`
- Colors and layout: `app/globals.css`
- Search and sharing metadata: `app/layout.tsx`

The email contact is `sales@africhem-globalz.com`; other company details await confirmation. The notification form validates email addresses without submission or storage. Contact links open the visitor’s email application. No analytics or optional trackers are enabled. Update privacy and consent handling before adding a service.
