import Link from "next/link";
import { GlobalReachGlobe } from "@/components/sections/GlobalReachGlobe";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/home-preview.css";
import "@/styles/editorial-pages.css";

export const metadata = createPageMetadata({ title: "Global Reach | Africhem Globalz", description: "Explore chemical sourcing and procurement with Africhem Globalz.", path: "/global-reach" });

const regions = [
  { name: "Africa", detail: "A focus region within the sourcing conversation." },
  { name: "UAE", detail: "A connection point represented in our global perspective." },
  { name: "India", detail: "A region for discussing material needs and opportunities." },
];

export default function Page() {
  return <div className="editorial-page reach-page">
    <section className="editorial-hero reach-hero"><div className="full-site-container reach-hero-copy">
      <p className="editorial-eyebrow">AFRICHEM GLOBALZ / GLOBAL REACH</p>
      <MaskedHeading level={1} lines={[{ text: "Global reach." }, { text: "Direct conversations.", accent: true }]} />
      <SectionReveal><p className="editorial-hero-lead">A global perspective on chemical procurement begins with a clear understanding of your requirement.</p></SectionReveal>
    </div></section>

    <section className="reach-globe-section" aria-label="Interactive global connections"><div className="full-site-container">
      <div className="reach-globe-top"><span>01 / A CONCEPTUAL VIEW OF CONNECTION</span><span>DRAG TO EXPLORE</span></div>
      <GlobalReachGlobe />
      <p className="reach-globe-note">The highlighted regions represent a conceptual perspective on connections. They do not indicate office locations.</p>
    </div></section>

    <section className="editorial-section reach-explanation"><div className="full-site-container editorial-split">
      <SectionReveal><p className="editorial-eyebrow">02 / CONNECTIONS</p><MaskedHeading lines={[{ text: "Across regions." }, { text: "Around your needs.", accent: true }]} /></SectionReveal>
      <SectionReveal delay={.1}><p>Africhem Globalz connects sourcing conversations across regions and markets. Share the material, application and destination you have in mind so we can discuss the relevant next steps.</p></SectionReveal>
    </div></section>

    <section className="editorial-section reach-regions"><div className="full-site-container">
      <SectionReveal><p className="editorial-eyebrow">03 / FOCUS REGIONS</p><MaskedHeading lines={[{ text: "A connected" }, { text: "perspective." }]} /></SectionReveal>
      <div className="region-grid">{regions.map((region, index) => <SectionReveal key={region.name} delay={index * .08}><article className="region-card"><span>{String(index + 1).padStart(2, "0")}</span><h3>{region.name}</h3><p>{region.detail}</p></article></SectionReveal>)}</div>
    </div></section>

    <section className="editorial-cta"><div className="full-site-container"><SectionReveal><p className="editorial-eyebrow">START A CONVERSATION</p><MaskedHeading lines={[{ text: "Let’s discuss your" }, { text: "sourcing requirement.", accent: true }]} /><Link className="editorial-cta-link" href="/contact">Contact us <span aria-hidden="true">↗</span></Link></SectionReveal></div></section>
  </div>;
}
