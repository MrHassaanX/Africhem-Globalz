import Link from "next/link";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/editorial-pages.css";

export const metadata = createPageMetadata({ title: "Industries | Africhem Globalz", description: "Chemical procurement starts with understanding how a material will be used.", path: "/industries" });

// Provisional application categories for visual review; confirm the final sectors with the client before treating them as served industries.
const applicationAreas = [
  { name: "Pharmaceuticals", detail: "Material requirements begin with the intended formulation and specification." },
  { name: "Manufacturing", detail: "Discuss the chemical inputs and practical details of a production process." },
  { name: "Water Treatment", detail: "Start with the application, treatment objective and material requirements." },
  { name: "Construction", detail: "Explore material needs in the context of the intended construction use." },
  { name: "Paints & Coatings", detail: "Frame an enquiry around formulation, performance and compatibility needs." },
  { name: "Agriculture", detail: "Share the application and specifications needed for a focused conversation." },
];

export default function Page() {
  return <div className="editorial-page industries-page">
    <section className="editorial-hero industries-hero"><div className="full-site-container editorial-hero-grid">
      <div><p className="editorial-eyebrow">AFRICHEM GLOBALZ / INDUSTRIES</p><MaskedHeading level={1} lines={[{ text: "Start with your" }, { text: "application.", accent: true }]} /></div>
      <SectionReveal><p className="editorial-hero-lead">Chemical procurement starts with understanding how a material will be used. Tell us about the application, specification and questions behind your requirement.</p></SectionReveal>
    </div></section>

    <section className="editorial-section industries-list"><div className="full-site-container">
      <SectionReveal><p className="editorial-eyebrow">01 / APPLICATION AREAS</p><MaskedHeading lines={[{ text: "Every use has" }, { text: "its own context." }]} /><p className="industry-note">These are provisional examples for discussion. Please confirm the material and sector relevant to your enquiry.</p></SectionReveal>
      <div className="industry-grid">{applicationAreas.map((area, index) => <SectionReveal key={area.name} delay={(index % 2) * .08}><article className="industry-card"><div className="industry-card-art" aria-hidden="true"><i /><i /></div><div className="industry-card-content"><span>{String(index + 1).padStart(2, "0")} / APPLICATION</span><div><h3>{area.name}</h3><p>{area.detail}</p></div><span className="industry-card-arrow" aria-hidden="true">↗</span></div></article></SectionReveal>)}</div>
    </div></section>

    <section className="editorial-cta"><div className="full-site-container"><SectionReveal><p className="editorial-eyebrow">YOUR REQUIREMENT</p><MaskedHeading lines={[{ text: "Let’s begin with" }, { text: "the details.", accent: true }]} /><Link className="editorial-cta-link" href="/contact">Discuss an application <span aria-hidden="true">↗</span></Link></SectionReveal></div></section>
  </div>;
}
