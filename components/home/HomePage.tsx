import Image from "next/image";
import Link from "next/link";
import { HomeIntro } from "./HomeIntro";
import { ChemicalCarousel } from "@/components/categories/ChemicalCarousel";
import { QuoteLink } from "@/components/QuoteLink";
import { Reveal } from "@/components/Reveal";
import { buyerSteps, proofPoints } from "@/lib/verified-content";
import { otherBusinesses } from "@/lib/businesses";
import { partnerLogos, partnersHref } from "@/lib/partners";
import { clientContent } from "@/lib/content/company";
import { HomeIcon, type HomeIconName } from "./HomeIcon";
import "@/app/home.css";
import "@/app/personal-home.css";

const businessIcons: Partial<Record<(typeof otherBusinesses)[number]["slug"], HomeIconName>> = {
  footwear: "layers",
  agro: "spark",
  "freight-forwarding-and-logistics": "globe",
  "scrap-recycling": "factory",
};

export function HomePage() {
  const proofIcons: Record<string, HomeIconName> = { "Verified Suppliers": "shield", "Documentation Support": "document" };
  const processIcons: HomeIconName[] = ["document", "shield", "globe", "network"];
  return <div className="home-page">
    <HomeIntro>
    <section className="home-proof" aria-label="How we support sourcing"><div className="home-container">{proofPoints.filter(point => point.approved && point.public).map(point => <div key={point.text}><HomeIcon name={proofIcons[point.text] ?? "spark"} /><p>{point.text}</p></div>)}</div></section>
      <section className="home-capabilities" aria-labelledby="capabilities-title"><div className="home-container">
        <div className="home-capabilities-head"><p className="home-kicker">INTERNATIONAL SOURCING MADE SIMPLE</p><h2 id="capabilities-title">From requirement <em>to delivery.</em></h2><p>Tell us what you need. We review the request, share pricing and details, then coordinate next steps with you.</p></div>
        <div className="home-process-line" aria-hidden="true"><span /></div>
        <ol className="home-capability-list">{buyerSteps.map((step, index) => <li className="capability-row" key={step.number}><span className="capability-icon"><HomeIcon name={processIcons[index] ?? "spark"} /></span><h3><span>{step.title}</span></h3><p>{step.description}</p></li>)}</ol>
        <div className="home-process-action"><QuoteLink label="Start with Step 1: Get a Quote" /><Link href="/how-it-works">See How It Works <span aria-hidden="true">→</span></Link></div>
      </div></section>
    </HomeIntro>
    <section className="home-categories" aria-labelledby="categories-title">
      <div className="home-section-heading home-container"><p className="home-kicker">SOURCING SIMPLIFIED. ONE POINT OF CONTACT FROM ENQUIRY TO SHIPMENT.</p><div><Reveal className="home-category-heading"><h2 id="categories-title">What are you <em>looking for?</em></h2></Reveal><Reveal className="home-category-support" delay={.12}><p>Choose a category and our sourcing team will help guide you through specifications, documentation and delivery requirements.</p></Reveal></div></div>
      <ChemicalCarousel label="Six chemical sourcing categories" />
      <div className="home-categories-tail home-container"><p>Have a specific grade or application in mind?</p><Link href="/products">Explore Products <span aria-hidden="true">→</span></Link></div>
    </section>
    <section className="home-business-preview home-container" aria-labelledby="business-preview-title"><div><p className="home-kicker">OTHER BUSINESSES</p><h2 id="business-preview-title">More ways to help you move business.</h2><p>Beyond chemicals, we work across footwear distribution, agro commodities, logistics and recycling. Tell us what you need and we&apos;ll point you to the right conversation.</p></div><Link href="/other-businesses">Explore Other Businesses and Partners <span aria-hidden="true">→</span></Link></section>
    <section className="home-client-first home-container"><p className="home-kicker">OUR FIRST PRINCIPLE</p><blockquote>{clientContent.clientFirst}</blockquote></section>
    <section className="home-affiliations home-container" aria-labelledby="home-partners-title">
      <h2 className="home-kicker" id="home-partners-title">Partners</h2>
      <ul className="home-partner-logos">
        {partnerLogos.map(partner => (
          <li key={partner.src}>
            <Link href={partnersHref}>
              <Image src={partner.src} alt={partner.name} fill sizes="(max-width: 767px) 23vw, 135px" />
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="home-kicker" id="home-business-links-title">Other Businesses</h2>
      <ul className="home-business-links" aria-labelledby="home-business-links-title">
        {otherBusinesses.map(business => {
          const icon = businessIcons[business.slug];
          if (!icon) return null;
          return (
            <li key={business.slug}>
              <Link href={`/other-businesses#${business.slug}`}>
                <HomeIcon name={icon} />
                <span>{business.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
    <section className="home-closing" aria-labelledby="closing-title">
      <div className="home-container home-closing-inner">
        <div className="home-closing-copy">
          <p className="home-kicker">START A CONVERSATION</p>
          <h2 id="closing-title">Tell us what you need.</h2>
          <p>Share the material, quantity and destination. We’ll take the conversation from there.</p>
        </div>
        <QuoteLink />
      </div>
    </section>
  </div>;
}
