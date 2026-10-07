# Website architecture through Phase 4

The production `/` route retains the Coming Soon content, countdown, form and contact components. The opt-in `app/(site)` layout supplies navigation, theme controls, consent preferences and the footer for the future site. Changes remain local and uncommitted.

## Routes and content

- `/home-preview`: seven-scene homepage review, with noindex metadata and header.
- `/shell-preview`: retained neutral shell review, also noindex.
- `/about`, `/products`, `/industries`, `/global-reach`, `/catalogues`, `/contact`: minimal real route foundations, with unfinished information identified plainly.
- `/privacy`, `/terms`: current website behavior and usage information.
- `app/not-found.tsx`: branded, themed 404.
- `app/(site)/loading.tsx`: lightweight route loading state.

`lib/navigation.ts` exposes real public routes. Previews are absent from public navigation and sitemap. Robots permits crawling so preview noindex tags can be read. Product data, country coverage, certifications, registration details and the final interactive globe await confirmed content.

## Visuals and motion

Server Components render page content. HomeHero handles the loader-aware Motion entrance, pointer depth and scroll-linked sculpture transformation. Mobile CSS removes sculpture parallax and continuous floating.

HomeJourney composes server sections inside the small ScrollScene client wrapper. IntersectionObserver imports GSAP/ScrollTrigger when a scene is nearby. The scene module enhances oversized text, the services panel, network paths and the single process pin. Pinning requires at least 1024px width, 650px height and no reduced-motion preference. Smaller sizes show every process step in normal flow. MatchMedia contexts, triggers and observers are cleaned up on unmount. Failed chunk loads leave static content available. Motion supplies simpler entrances and menu behavior.

`styles/tokens.css` supplies cream/beige and deep navy semantic themes. A head script selects the saved theme before paint. ThemeProvider responds to preference/system changes without reload or scroll reset. Local DM Sans uses next/font/local.

The loader uses sessionStorage once per tab session, with a 2.3-second fail-safe. Reduced motion and unavailable storage skip it. To review it again, open a new private window and navigate directly to `/home-preview`; reload does not replay it.

## Privacy and forms

Consent is saved in localStorage as `africhem-consent-v1`. Accept and Reject non-essential work; necessary preferences and the session flag remain usable. No analytics, advertising cookies or optional trackers are installed. Footer preferences reopens the controls. If localStorage is blocked, a choice works on the current page but cannot persist reliably.

A future optional service must wait for explicit accepted consent before its script or request loads and must support withdrawal before release. Update controls and the policy before adding any integration.

Contact uses mailto and does not claim a message was sent. NotifyForm validates email in the browser without transmission or storage. There is no asynchronous form operation requiring a pending state.

Policies live in `lib/content/policies.ts`. Source TODOs cover owner/legal review, entity/jurisdiction, email retention and hosting-log confirmation. Public copy makes no lawyer-review claim or invented legal assertion.

## Metadata and brand assets

createPageMetadata supplies titles, descriptions, canonical HTTPS URLs, Open Graph and Twitter cards. Metadata routes generate sitemap, robots, the 1200x630 social image and icons. The supplied 1.1MB original logo stays in `assets/brand` as server-side source artwork. It is not transferred as a homepage image. ImageResponse preserves its proportions and renders a viewport over the recognizable A mark for icons, without tracing or redesign.

Homepage CSS/SVG visuals are decorative and excluded from accessibility output. ImageResponse requires ordinary HTML images rather than next/image. Social artwork has descriptive metadata. Next image configuration allows AVIF/WebP for future photography.

## Security and deployment

Vercel handles HTTPS. The public domain was verified on 6 October 2026: HTTP returned 308 to HTTPS, then HTTPS returned 200 with certificate validation. No client redirect or middleware was added. See [Vercel SSL documentation](https://vercel.com/docs/domains/working-with-ssl).

next.config.ts adds nosniff, strict-origin-when-cross-origin referrer policy, a permissions policy disabling camera/microphone/geolocation, and production HSTS. includeSubDomains/preload are not asserted for unknown subdomains. Vercel can provide its own edge HSTS policy.

`.env*` is ignored except an optional `.env.example`; no environment file is tracked. Future credentials belong in server environment variables and must not use NEXT_PUBLIC_. No mail credentials or API secrets are needed today.

### CSP follow-up

A strict CSP awaits nonce/hash design for inline prepaint theme/loader scripts, Next hydration scripts, Motion/GSAP inline styles and the actual service inventory. Start with report-only in staging, verify themes/navigation/generated assets and consent-gated integrations, then enforce the tested policy. A guessed policy could break hydration or animation; no external analytics scripts currently require permission.

## Verification

Run lint, typecheck and build. See `docs/phase-4-verification.md` for audit scope and measurement limits. Phase 5 requires user approval.
