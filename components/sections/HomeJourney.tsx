import Link from "next/link";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { PerspectiveCatalogue } from "@/components/catalogue/PerspectiveCatalogue";

export function HomeJourney() {
  return <>
    <section className="home-intro" id="sourcing-preview">
      <div className="full-site-container home-intro-layout">
        <SectionReveal>
          <p className="home-section-eyebrow">WHAT WE DO</p>
          <MaskedHeading lines={[{ text: "A world of chemistry." }, { text: "A focused approach.", accent: true }]} />
          <p className="home-intro-description">Africhem Globalz brings chemical sourcing, trading and distribution conversations together around what your business needs.</p>
          <Link className="home-editorial-link" href="/about">Meet Africhem Globalz <span aria-hidden="true">↗</span></Link>
        </SectionReveal>
        <div className="home-intro-visual" aria-hidden="true"><span>Sourcing</span><span>Trading</span><span>Distribution</span></div>
      </div>
    </section>

    <section className="home-catalogue" id="catalogue-preview">
      <div className="full-site-container">
        <SectionReveal>
          <p className="home-section-eyebrow">EXPLORE WHAT COMES NEXT</p>
          <div className="home-catalogue-heading"><MaskedHeading lines={[{ text: "Product information," }, { text: "in perspective.", accent: true }]} /><p>Our product space is taking shape. Explore the framework now, or tell us what material you need.</p></div>
        </SectionReveal>
      </div>
      <PerspectiveCatalogue teaser />
      <div className="full-site-container home-catalogue-links"><Link className="home-editorial-link" href="/products">Explore Products <span aria-hidden="true">↗</span></Link></div>
    </section>

    <section className="home-final" id="contact-preview"><div className="full-site-container"><SectionReveal><p className="home-section-eyebrow">START A CONVERSATION</p><MaskedHeading lines={[{ text: "Let’s source" }, { text: "what you need.", accent: true }]} /><Link className="home-final-cta" href="/contact">Send an Enquiry <span aria-hidden="true">↗</span></Link></SectionReveal></div></section>
  </>;
}
