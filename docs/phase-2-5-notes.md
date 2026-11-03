# Phase 2.5 content and Home refinement — historical note

This records decisions made during the Phase 2.5 pass. It is not a complete description of the current website. For current routes and behavior, see `README.md` and `architecture.md`.

The client-supplied `docs/source/Africhem_Globalz_About_Us.docx` and `lib/content/company.ts` remain content references. The current Home and other pages use approved, relevant content; partner countries are partner locations, not Africhem offices.

Home has one hero. Its original editorial typography, spacing, themes, navigation and motion lifecycle remain. A compressed industrial artwork depicts clean steel drum filling, transfer piping and distant storage tanks. The existing liquid shader is retained as a restrained moving foreground highlight. A lightweight SVG trace suggests abstract bonds without claiming any molecule, formula or CAS number. The image is illustrative campaign art, not a photograph of an Africhem facility.

The visual canvas loads dynamically, caps DPR, reduces detail and pointer work on mobile, pauses offscreen, and yields to the static image and SVG under reduced motion. The supplied logo pixels are unchanged; dark-mode legibility still uses a soft radial light behind the transparent image. Rive was evaluated but was not necessary for this pass.

At the time of this note, Home flowed from the chemical-industry hero to the buyer journey, Products teaser and enquiry CTA, with Global Reach on its own route. Later implementation work expanded the catalogue, business pages, globe and quote form. Quote email delivery is still conditional on approved provider configuration; see `docs/quote-delivery-setup.md`.
