import Image from "next/image";
import Link from "next/link";
import { HomeIntro } from "./HomeIntro";
import { ChemicalCarousel } from "@/components/categories/ChemicalCarousel";
import { QuoteLink } from "@/components/QuoteLink";
import { buyerSteps, proofPoints } from "@/lib/verified-content";
import { otherBusinesses } from "@/lib/businesses";
import { partnerLogos, partnersHref } from "@/lib/partners";
import { clientContent } from "@/lib/content/company";
import { HomeIcon, type HomeIconName } from "./HomeIcon";
import "@/app/home.css";

const proofIcons: Record<string, HomeIconName> = {
  "Verified Suppliers": "shield",
  "Documentation Support": "document",
  "Global Logistics": "globe",
  "Personal Assistance": "network",
};

const processIcons: HomeIconName[] = ["document", "shield", "network", "globe"];

export function HomePage() {
  return (
    <div className="home-page">
      <HomeIntro />

      <section className="home-proof" aria-label="How we support sourcing">
        <ul className="home-container">
          {proofPoints.filter(point => point.approved && point.public).map(point => (
            <li key={point.text}>
              <HomeIcon name={proofIcons[point.text] ?? "spark"} />
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-categories" aria-labelledby="categories-title">
        <div className="home-container">
          <header className="home-section-heading">
            <h2 id="categories-title">Chemical sourcing</h2>
            <p>Explore six product and sourcing categories. Our team can help with specifications, documentation and delivery requirements.</p>
          </header>
          <ChemicalCarousel label="Six chemical sourcing categories" />
          <Link className="home-text-link" href="/products">Explore all products <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-capabilities" aria-labelledby="capabilities-title">
        <div className="home-container">
          <header className="home-section-heading">
            <h2 id="capabilities-title">From requirement <em>to delivery.</em></h2>
            <p>{clientContent.clientFirst}</p>
          </header>
          <ol className="home-capability-list">
            {buyerSteps.map((step, index) => (
              <li className="capability-row" key={step.number}>
                <HomeIcon name={processIcons[index] ?? "spark"} />
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link className="home-text-link" href="/how-it-works">See how it works <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-businesses" aria-labelledby="business-preview-title">
        <div className="home-container">
          <header className="home-section-heading">
            <h2 id="business-preview-title">Other businesses</h2>
            <p>Explore Africhem Globalz’s work beyond industrial chemicals.</p>
          </header>
          <ul className="home-business-links">
            {otherBusinesses.filter(business => business.slug !== "chemicals").map(business => (
              <li key={business.slug}>
                <Link href={`/other-businesses#${business.slug}`}>
                  <div className="home-business-image">
                    <Image src={business.image} alt="" fill sizes="(max-width: 899px) 46vw, (max-width: 1440px) 23vw, 320px" />
                  </div>
                  <span className="home-business-name">{business.name}<span aria-hidden="true">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
          <Link className="home-text-link" href="/other-businesses">Explore all businesses and partners <span aria-hidden="true">→</span></Link>
        </div>
      </section>

      <section className="home-affiliations" aria-labelledby="home-partners-title">
        <div className="home-container">
          <header className="home-section-heading">
            <h2 id="home-partners-title">Partners</h2>
          </header>
          <ul className="home-partner-logos">
            {partnerLogos.map(partner => (
              <li key={partner.src}>
                <Link href={partnersHref}>
                  <Image src={partner.src} alt={partner.name} fill sizes="(max-width: 479px) 44vw, (max-width: 899px) 22vw, (max-width: 1440px) 23vw, 320px" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-closing" aria-labelledby="closing-title">
        <div className="home-container home-closing-inner">
          <div className="home-closing-copy">
            <h2 id="closing-title">Tell us what you need.</h2>
            <p>Share the material, quantity and destination to request a quotation.</p>
          </div>
          <QuoteLink />
        </div>
      </section>
    </div>
  );
}
