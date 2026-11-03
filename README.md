# Africhem Globalz Website

![Next.js](https://shields.io)
![React](https://shields.io)
![TypeScript](https://shields.io)
![Tailwind CSS](https://shields.io)

A modern, client-facing corporate and product enquiry website built for **Africhem Globalz**. 

> [!IMPORTANT]
> **Review Mode Warning:** The application is in review mode by default. Pages and response headers are forced to `noindex` unless `SITE_INDEXABLE=true` is explicitly set in production environments for an officially approved launch.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: `v22 LTS` or newer
* **Package Manager**: `npm`
* Network access for initial dependency installations

### Local Development Setup
From your project directory, open your terminal (e.g., PowerShell) and run:

```powershell
# Install clean dependencies
npm ci

# Start the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the live site. If port 3000 is occupied, Next.js will automatically select an alternate local address. Press `Ctrl + C` to stop the server.

### Environment Setup
Environment settings are configured via `.env` files:
1. Copy the safe configuration template: `cp .env.example .env.local`
2. Update variables in `.env.local` as needed (e.g., site URL, indexing flags, or quotation APIs).
3. **Security Note:** `.env.local` is ignored by Git. Never commit active production keys or secrets.

> [!NOTE]
> The Quote Form stays unavailable until valid Resend credentials and `QUOTE_FORM_ENABLED=true` are configured. You can still preview and review the rest of the layout seamlessly without this setup.

---

## 🛠️ Build & Maintenance Commands

| Command | Purpose |
| :--- | :--- |
| `npm run lint` | Run the ESLint syntax and code quality analysis. |
| `npm run typecheck` | Perform structural TypeScript type verification. |
| `npm run build` | Build the optimized application bundle for production. |
| `npm run start` | Run the built production package locally. |

*To host the production build locally on an alternate port and address:*
```powershell
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
```

---

## 📍 Route Directory (Current Pages)

*   `/#` — Chemical sourcing home page paired with a custom 6-category carousel layout.
*   `/products` | `/products/[family]` | `/products/[family]/[product]` — Product navigation maps encompassing 6 primary chemical sourcing categories and 6 dedicated solvent enquiry modules.
*   `/other-businesses` — Secondary commercial directories. Sections without official assets feature a temporary *Coming Soon* fallback.
*   `/how-it-works` | `/global-reach` | `/about` | `/contact` — Essential corporate identity infrastructure routes.
*   `/privacy` | `/terms` — Contextual draft documents under legal review; do not use as certified live compliance agreements.

> **Legacy Redirects:** Configured within `next.config.ts`. Legacy paths like `/categories` and `/industries` automatically drop visitors gracefully into `/products` and `/other-businesses`.

---

## 🗺️ Project Architecture Map

```yaml
app/            # Active Application Router ecosystem (Pages, layouts, metadata APIs)
components/     # Modular system structures (Forms, dynamic product navigation, interactive globe elements)
lib/            # Core configuration layer (Sourced company indexes, validation systems, globe datasets)
public/         # Static global assets (Logos, flags, vector illustrations, fallback imagery)
styles/         # System structural tokens (Core tokens are controlled via styles/tokens.css)
docs/           # Internal design resources and documentation manifests
.env.example    # Public environment blueprint (Maintains completely safe placeholder configurations)
```

### UI & UX Implementations
* **Typography:** Local bundled Inter font distributions.
* **Themes:** Full responsive responsive typography with light/dark adaptive variations.
* **Motion Design:** Advanced fluid viewport scrolling powered by **GSAP** and **Lenis**.
* **Visuals:** WebGL immersive globe generated lazily via **Three.js** with an interactive static fallback matrix.

---

## ⚠️ Important Content Boundaries & Launch Guidelines

*   **Global Reach Contextualization:** Partner country footprints are global shipping indicators and destination zones; they do not represent physical Africhem administrative offices or local warehousing plants.
*   **Data Restrictions:** Never invent product grading, stock configurations, pricing tiers, legal certifications, or unverified performance guarantees. The 6 core solvent names are explicitly mapped from project briefings; contextual technical data blocks remain empty pending certified additions.
*   **Transactional Testing:** The quotation module strictly communicates via Resend APIs when verified tokens are detected. Local sandboxes do not imply a confirmed end-to-end receipt cycle.
*   **Documentation Indexing:** Review additional launch boundaries, content constraints, and setup roadmaps located inside:
    * `docs/architecture.md`
    * `docs/content-inventory.md`
    * `docs/roadmap.md`
    * `docs/founder-approval-checklist.md`

---

## ⏳ Historical Record Manifests

The documents below serve strictly as structural archives from previous project milestones. Status evaluations located within these files do not accurately reflect current site states:
* 📁 `docs/phase-1-report.md`
* 📁 `docs/phase-2-notes.md`
* 📁 `docs/revision-audit-2026-10-24.md`
* 📁 `docs/stax-personal-v2-requirements.md`
