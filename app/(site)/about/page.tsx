import Link from "next/link";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { createPageMetadata } from "@/lib/seo/metadata";
import "@/styles/editorial-pages.css";

export const metadata = createPageMetadata({ title: "About | Africhem Globalz", description: "Africhem Globalz focuses on chemical sourcing, trading and distribution.", path: "/about" });

const values = [
  { number: "01", title: "Reliability", detail: "A considered approach to each sourcing conversation." },
  { number: "02", title: "Clarity", detail: "Straightforward communication about materials and requirements." },
  { number: "03", title: "Responsiveness", detail: "Attention to the details that shape a useful enquiry." },
  { number: "04", title: "Global perspective", detail: "An open view of opportunities across markets and regions." },
];

export default function Page() {
  return <div className="editorial-page about-page">
    <section className="editorial-hero about-hero">
      <div className="full-site-container editorial-hero-grid">
        <div>
          <p className="editorial-eyebrow">AFRICHEM GLOBALZ / ABOUT</p>
          <MaskedHeading level={1} lines={[{ text: "Chemistry begins" }, { text: "with a conversation.", accent: true }]} />
        </div>
        <SectionReveal><p className="editorial-hero-lead">Africhem Globalz is focused on chemical sourcing, trading and distribution, with each conversation shaped around the material and application you need.</p></SectionReveal>
      </div>
    </section>

    <section className="editorial-section about-intro">
      <div className="full-site-container editorial-split">
        <SectionReveal><p className="editorial-eyebrow">01 / WHO WE ARE</p><MaskedHeading lines={[{ text: "A focused way" }, { text: "to connect." }]} /></SectionReveal>
        <SectionReveal delay={.1}><p>We bring sourcing, trading and distribution into one clear conversation. By starting with your requirement, we can discuss the material information and next steps that matter to your business.</p><p>Every enquiry begins with understanding the intended use, specifications and practical questions involved.</p></SectionReveal>
      </div>
    </section>

    <section className="editorial-section about-purpose">
      <div className="full-site-container">
        <SectionReveal><p className="editorial-eyebrow">02 / OUR DIRECTION</p><MaskedHeading lines={[{ text: "Purpose, with" }, { text: "perspective.", accent: true }]} /></SectionReveal>
        <div className="purpose-grid">
          <SectionReveal><article className="purpose-card"><span>MISSION</span><h3>Make sourcing simpler.</h3><p>To help businesses approach chemical sourcing with clear information, thoughtful communication and a practical path forward.</p></article></SectionReveal>
          <SectionReveal delay={.1}><article className="purpose-card"><span>VISION</span><h3>Connect possibilities.</h3><p>To support more connected conversations between material needs and opportunities across markets.</p></article></SectionReveal>
        </div>
      </div>
    </section>

    <section className="editorial-section about-values">
      <div className="full-site-container">
        <SectionReveal><p className="editorial-eyebrow">03 / WHAT GUIDES US</p><MaskedHeading lines={[{ text: "How we approach" }, { text: "the work.", accent: true }]} /></SectionReveal>
        <div className="value-grid">{values.map((value) => <SectionReveal key={value.number}><article className="value-card"><span>{value.number}</span><h3>{value.title}</h3><p>{value.detail}</p></article></SectionReveal>)}</div>
      </div>
    </section>

    <section className="editorial-cta"><div className="full-site-container"><SectionReveal><p className="editorial-eyebrow">START A CONVERSATION</p><MaskedHeading lines={[{ text: "Tell us what" }, { text: "you need.", accent: true }]} /><Link className="editorial-cta-link" href="/contact">Talk to us <span aria-hidden="true">↗</span></Link></SectionReveal></div></section>
  </div>;
}
