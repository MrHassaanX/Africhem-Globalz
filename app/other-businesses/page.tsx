import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteLink } from "@/components/QuoteLink";
import { otherBusinesses } from "@/lib/businesses";

export const metadata: Metadata = {
  title: "Other Businesses",
  description: "Explore Africhem Globalz business areas in chemicals, footwear distribution, agro commodities, logistics and recycling.",
  alternates: { canonical: "/other-businesses" },
};

export default function OtherBusinessesPage() {
  return <article className="revision-page other-businesses-revision">
    <header className="revision-hero wrap">
      <p className="revision-kicker">OTHER BUSINESSES</p>
      <h1>Building businesses through trade, distribution and supply.</h1>
      <p>Industrial chemical sourcing remains our primary focus. Alongside it, we support selected business verticals built on trusted partnerships, distribution relationships and supply-chain expertise.</p>
      <p className="revision-lead">Different industries. One approach: trusted relationships, practical solutions and reliable execution.</p>
      <Link className="text-arrow" href="/products">Explore Chemical Products <span aria-hidden="true">→</span></Link>
    </header>
    <section className="revision-section wrap surface-band surface-band--warm">
      <div className="business-grid">{otherBusinesses.map(business => <article className="business-card" key={business.slug}>
        {business.image && <div className="business-card-art"><Image src={business.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" /></div>}
        <div><h2>{business.name}</h2><p>{business.description}</p>
          <ul className="business-card-features">{business.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          <Link className="text-arrow" href={`/other-businesses/${business.slug}`}>{business.slug === "chemicals" ? "Explore Chemicals" : business.slug === "footwear" ? "Explore Footwear" : business.slug === "agro" ? "Explore Agro" : business.slug === "freight-forwarding-and-logistics" ? "Discuss Logistics" : "Learn More"} <span aria-hidden="true">→</span></Link>
        </div>
      </article>)}</div>
    </section>
    <section className="revision-section wrap surface-band surface-band--cool"><div className="revision-section-head"><p className="revision-kicker">WHY DIFFERENT BUSINESSES?</p><h2>One foundation across every conversation.</h2></div><p className="revision-lead">Every business within Africhem GlobalZ is built around sourcing, distribution, logistics and long-term relationship development. We focus on identifying opportunities, connecting reliable partners and supporting successful commercial outcomes. Whether the conversation begins with chemicals, footwear, agriculture or logistics, our objective remains the same:</p><strong className="other-business-promise">Make Business Simpler.</strong></section>
    <section className="revision-section wrap"><div className="revision-section-head"><p className="revision-kicker">FOUNDER&apos;S PHILOSOPHY</p><h2>People buy from people.</h2></div><p className="revision-lead">Products can be sourced, shipments coordinated and documentation prepared. Trust, communication and reliability help build long-term relationships. Sourcing simplified—not because business is simple, but because we work to make it easier.</p></section>
    <section className="revision-closing wrap"><div><p className="revision-kicker">LET&apos;S START A CONVERSATION</p><h2>Let&apos;s start a conversation.</h2><p>Whether you&apos;re sourcing chemicals, exploring distribution partnerships, evaluating logistics support or discussing new trade opportunities, share what you have in mind.</p><div className="closing-contact"><a href="mailto:sales@africhem-globalz.com">sales@africhem-globalz.com</a><a href="tel:+916362830638">+91 63628 30638</a></div></div><QuoteLink label="Discuss Your Requirement" /></section>
    <section className="revision-section wrap other-reach-preview"><div className="revision-section-head"><p className="revision-kicker">PRESENCE / GLOBAL REACH</p><h2>Trade moves faster when someone is there.</h2></div><p className="revision-lead">From India to East Africa, the Middle East and Europe, Africhem GlobalZ supports sourcing and business development through relationships across key international markets.</p><Link className="text-arrow" href="/global-reach">Explore our network <span aria-hidden="true">→</span></Link></section>
  </article>;
}
