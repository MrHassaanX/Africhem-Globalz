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
  "freight-forwarding-and-logistics": "Discuss Logistics",
  "scrap-recycling": "Learn More",
};

export default function OtherBusinessesPage() {
  return (
    <article className={`revision-page other-businesses-revision ${styles.page}`}>
      <header className={`revision-hero wrap ${styles.hero}`}>

        <h1>Other Businesses and Partners</h1>
        <p className={styles.tagline}>Building businesses through trade, distribution and supply.</p>
        <p>Industrial chemical sourcing remains our primary focus. Alongside it, we support selected business verticals built on trusted partnerships, distribution relationships and supply-chain expertise.</p>
        <p className="revision-lead">Different industries. One approach: trusted relationships, practical solutions and reliable execution.</p>
        <Link className="text-arrow" href="/products">Explore Chemical Products <span aria-hidden="true">→</span></Link>
      </header>

      <div className={`revision-section wrap surface-band surface-band--warm ${styles.section}`}>
        <div className={styles.cards}>
          {otherBusinesses.map(business => (
            <article className={`business-card ${styles.card}`} id={business.slug} key={business.slug}>
              <div className={`business-card-art ${styles.cardArt}`}>
                <Image src={business.image} alt="" fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1280px) 33vw, 390px" />
              </div>
              <div className={styles.cardBody}>
                <h2>{business.name}</h2>
                <p>{business.description}</p>
                <ul className="business-card-features">
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

      <section className={`revision-section wrap surface-band surface-band--cool ${styles.section}`}>
        <div className={`revision-section-head ${styles.sectionHeading}`}>
          <p className="revision-kicker">WHY DIFFERENT BUSINESSES?</p>
          <h2>One foundation across every conversation.</h2>
        </div>
        <p className="revision-lead">Every business within Africhem GlobalZ is built around sourcing, distribution, logistics and long-term relationship development. We focus on identifying opportunities, connecting reliable partners and supporting successful commercial outcomes. Whether the conversation begins with chemicals, footwear, agriculture or logistics, our objective remains the same:</p>
        <strong className="other-business-promise">Make Business Simpler.</strong>
      </section>

      <section className={`revision-section wrap ${styles.section}`}>
        <div className={`revision-section-head ${styles.sectionHeading}`}>
          <p className="revision-kicker">FOUNDER&apos;S PHILOSOPHY</p>
          <h2>People buy from people.</h2>
        </div>
        <p className="revision-lead">Products can be sourced, shipments coordinated and documentation prepared. Trust, communication and reliability help build long-term relationships. Sourcing simplified—not because business is simple, but because we work to make it easier.</p>
      </section>

      <section className={`revision-section wrap other-reach-preview ${styles.section}`}>
        <div className={`revision-section-head ${styles.sectionHeading}`}>
          <p className="revision-kicker">PRESENCE / GLOBAL REACH</p>
          <h2>Trade moves faster when someone is there.</h2>
        </div>
        <p className="revision-lead">From India to East Africa, the Middle East and Europe, Africhem GlobalZ supports sourcing and business development through relationships across key international markets.</p>
        <Link className={`text-arrow ${styles.reachLink}`} href="/global-reach">Explore our network <span aria-hidden="true">→</span></Link>
      </section>

      <section className={`revision-section wrap ${styles.section}`} id="partners" aria-labelledby="partners-heading">
        <div className={`revision-section-head ${styles.sectionHeading}`}>
          <h2 id="partners-heading">Partners</h2>
        </div>
        <ul className={styles.logoList} role="list">
          {partnerLogos.map(partner => (
            <li key={partner.src}>
              <div className={styles.logo}>
                <Image src={partner.src} alt={partner.name} fill sizes="120px" />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className={`revision-closing wrap ${styles.section}`}>
        <div>
          <p className="revision-kicker">LET&apos;S START A CONVERSATION</p>
          <h2>Let&apos;s start a conversation.</h2>
          <p>Whether you&apos;re sourcing chemicals, exploring distribution partnerships, evaluating logistics support or discussing new trade opportunities, share what you have in mind.</p>
          <div className="closing-contact">
            <a href="mailto:sales@africhem-globalz.com">sales@africhem-globalz.com</a>
            <a href="tel:+916362830638">+91 63628 30638</a>
          </div>
        </div>
        <QuoteLink label="Discuss Your Requirement" />
      </section>
    </article>
  );
}
