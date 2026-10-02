# Africhem Globalz — Coming Soon

Day 1 placeholder website for Africhem Globalz, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Run locally

1. Install Node.js 20.9 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open http://localhost:3000.

Use `npm run lint`, `npm run typecheck`, and `npm run build` to verify the project. Deploy the repository as a Next.js project on Vercel when ready.

## Editing later

- Page wording: `components/ComingSoonHero.tsx`
- Fixed launch deadline: `lib/countdown.ts`
- Countdown display: `components/Countdown.tsx`
- Notification form UI: `components/NotifyForm.tsx`
- Contact placeholders: `components/ContactInfo.tsx`
- Colors and layout: `app/globals.css`
- Search and sharing metadata: `app/layout.tsx`

The contact fields intentionally contain no real company details. The notification form validates email addresses but does not submit or store them; its message states this plainly. Connect a service only when the mailing list is ready.
