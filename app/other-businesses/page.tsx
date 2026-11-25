import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteLink } from "@/components/QuoteLink";
import { otherBusinesses } from "@/lib/businesses";
import { partnerLogos } from "@/lib/partners";
import styles from "./businesses.module.css";

export const metadata: Metadata = {
  title: "Other Businesses and Partners",
  description: "Explore Africhem Globalz business areas in chemicals, footwear distribution, agro commodities, logistics and recycling.",
  alternates: { canonical: "/other-businesses" },
};

const businessLinkLabels = {
  chemicals: "Explore Chemicals",
  footwear: "Explore Footwear",
  agro: "Explore Agro",
  "freight-forwarding-and-logistics": "Explore Logistics",
  "scrap-recycling": "Explore Recycling",
};

export default function OtherBusinessesPage() {
  return (
    <article className={`revision-page other-businesses-revision ${styles.page}`}>
      <header className={`revision-hero wrap ${styles.hero}`}>
        <h1>Other Businesses and Partners</h1>
        <p>Industrial chemical sourcing is our primary business. We also work with partners in footwear distribution, agricultural trade, freight forwarding and recycling.</p>
        <div className={styles.heroActions}>
          <Link className="text-arrow" href="/products">Explore Chemical Products <span aria-hidden="true">→</span></Link>
          <a className="text-arrow" href="#partners">Meet Our Partners <span aria-hidden="true">↓</span></a>
        </div>
      </header>

      <div className="revision-section wrap surface-band surface-band--warm">
        <div className={styles.cards}>
          {otherBusinesses.map(business => (
            <article className={`business-card ${styles.card}`} id={business.slug} key={business.slug}>
              <div className={`business-card-art ${styles.cardArt}`}>
                <Image src={business.image} alt="" fill sizes="(max-width: 767px) 91vw, (max-width: 1600px) 46vw, 730px" />
              </div>
              <div className={styles.cardBody}>
                <h2>{business.name}</h2>
                <p>{business.description}</p>
                <ul className={`business-card-features ${styles.features}`} role="list">
                  {business.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
                <div className={styles.cardActions}>
                  <Link className="text-arrow" href={`/other-businesses/${business.slug}`}>
                    {businessLinkLabels[business.slug]} <span aria-hidden="true">→</span>
                  </Link>
                  <QuoteLink category={business.slug} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className="revision-section wrap" id="partners" aria-labelledby="partners-heading">
        <div className="revision-section-head">
          <h2 id="partners-heading">Partners</h2>
        </div>
        <ul className={styles.logoList} role="list">
          {partnerLogos.map(partner => (
            <li key={partner.src}>
              <div className={styles.logo}>
                <Image src={partner.src} alt={partner.name} fill sizes="(max-width: 767px) 42vw, 220px" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`revision-section wrap surface-band surface-band--cool ${styles.network}`}>
        <h2>Our Global Network</h2>
        <div>
          <p className="revision-lead">We support sourcing, distribution and logistics through long-term relationships across India, East Africa, the Middle East and Europe.</p>
          <Link className="text-arrow" href="/global-reach">Explore our network <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </article>
  );
}
