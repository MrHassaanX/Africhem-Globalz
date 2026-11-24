import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteImage } from "@/lib/site-images";
import { clientContent } from "@/lib/content/company";
import { companyIdentity, founderProfile } from "@/lib/verified-content";
import { QuoteLink } from "@/components/QuoteLink";
import { HomeIcon } from "@/components/home/HomeIcon";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Africhem Globalz, our sourcing approach, client-first principle and international business relationships.",
  alternates: { canonical: "/about" },
};

const highlights = [
  { icon: "document", text: "10+ years in trade" },
  { icon: "globe", text: "7 strategic markets" },
  { icon: "person", text: "Direct access to decision makers" },
] as const;

const sourcingSteps = [
  { title: "Understand the requirement", text: "We start with your material, specifications, quantity, destination and business objectives." },
  { title: "Review options and verify details", text: "We discuss products, suppliers and commercial terms, then clarify specifications, quality information and available documentation before you commit." },
  { title: "Coordinate through delivery", text: "We plan packaging, shipment and delivery with you and stay in touch throughout the order." },
] as const;

const valueIcons = {
  Trust: "shield",
  Commitment: "document",
  "Client Satisfaction": "person",
  Transparency: "document",
  Accountability: "network",
  "Problem Solving": "layers",
} as const;

export default function AboutPage() {
  return (
    <article className={`revision-page about-revision ${styles.page}`}>
      <header className={`revision-hero wrap ${styles.hero}`}>
        <div>
          <p className="revision-kicker">About Africhem Globalz</p>
          <h1>Making sourcing and trade easier.</h1>
          <p className={styles.lead}>We help businesses source products, clarify documentation and coordinate shipments, backed by more than a decade in sourcing, supply chains, international trade and business development.</p>
          <QuoteLink label="Discuss Your Requirement" />
        </div>
        <div className={styles.heroMedia}>
          <div className={styles.heroImage}>
            <Image src={siteImage("about-hero", "/stock/port-logistics.webp")} alt="" fill sizes="(max-width: 799px) 92vw, (max-width: 1600px) 46vw, 680px" fetchPriority="high" />
          </div>
          <ul className={styles.highlights} role="list">
            {highlights.map(({ icon, text }) => (
              <li key={text}><HomeIcon name={icon} />{text}</li>
            ))}
          </ul>
        </div>
      </header>

      <section className={`revision-section wrap surface-band surface-band--warm ${styles.story}`} aria-labelledby="about-story">
        <div className="revision-section-head">
          <p className="revision-kicker">Our story</p>
          <h2 id="about-story">Experience across the supply chain</h2>
        </div>
        <div className={styles.prose}>
          <p>Our experience spans factory floors, supplier discussions, documentation reviews, shipment coordination and conversations with customers. We’ve worked with manufacturers, distributors, logistics partners and buyers across industries and international markets.</p>
          <p>That work showed us where orders can get held up, from unclear specifications to gaps in follow-up. We built Africhem Globalz to make those steps easier for clients.</p>
        </div>
      </section>

      <section className="revision-section wrap surface-band surface-band--cool" aria-labelledby="about-sourcing">
        <div className="revision-section-head">
          <p className="revision-kicker">How we work</p>
          <h2 id="about-sourcing">From requirement to delivery</h2>
        </div>
        <ol className={styles.steps} role="list">
          {sourcingSteps.map(({ title, text }, index) => (
            <li key={title}>
              <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="revision-section wrap" aria-labelledby="about-reach">
        <div className="revision-section-head">
          <p className="revision-kicker">Our reach</p>
          <h2 id="about-reach">Where we work and what we do</h2>
        </div>
        <div className={styles.scope}>
          <div>
            <HomeIcon name="globe" />
            <h3>Seven strategic markets</h3>
            <p>Our business relationships span {clientContent.network.summary}</p>
            <Link className="text-arrow" href="/global-reach">Explore Global Reach <span aria-hidden="true">→</span></Link>
          </div>
          <div>
            <HomeIcon name="layers" />
            <h3>Five areas of business</h3>
            <p>Our work spans chemicals, footwear, agriculture, logistics and recycling.</p>
            <Link className="text-arrow" href="/other-businesses">Explore Other Businesses and Partners <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>

      <section className="revision-section wrap surface-band surface-band--warm" aria-labelledby="about-values">
        <div className={styles.principle}>
          <div className="revision-section-head">
            <p className="revision-kicker">Our values</p>
            <h2 id="about-values">Client first. Always.</h2>
          </div>
          <div className={styles.prose}>
            <p>Our founder’s principle is simple: people buy from people. We put the client’s interests first and aim to earn long-term trust by taking responsibility for the order and staying available when problems arise.</p>
            {founderProfile.name && founderProfile.role && founderProfile.biography && (
              <div className={styles.founder}>
                {founderProfile.portrait && <Image src={founderProfile.portrait} alt={founderProfile.name} width={520} height={650} sizes="(max-width: 767px) 80vw, 260px" />}
                <h3>{founderProfile.name}</h3>
                <p>{founderProfile.role}</p>
                <p>{founderProfile.biography}</p>
                {founderProfile.linkedin && <a className="text-arrow" href={founderProfile.linkedin}>LinkedIn profile <span aria-hidden="true">↗</span></a>}
              </div>
            )}
          </div>
        </div>
        <ul className={styles.values} role="list">
          {clientContent.values.map(value => (
            <li key={value.title}>
              <HomeIcon name={valueIcons[value.title]} />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {companyIdentity.legalName && (
        <section className={`revision-section wrap ${styles.prose}`}>
          <h2>Business identity</h2>
          <p>{companyIdentity.legalName}</p>
          {companyIdentity.registrationNumber && <p>Registration: {companyIdentity.registrationNumber}</p>}
          {companyIdentity.iec && <p>IEC: {companyIdentity.iec}</p>}
          {companyIdentity.gstin && <p>GSTIN: {companyIdentity.gstin}</p>}
          {companyIdentity.registeredAddress && <p>{companyIdentity.registeredAddress}</p>}
        </section>
      )}

      <section className={`revision-closing wrap surface-band ${styles.closing}`} aria-labelledby="about-contact">
        <div>
          <h2 id="about-contact">Discuss your sourcing needs</h2>
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
