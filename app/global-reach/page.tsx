import type { Metadata } from "next";
import { clientContent } from "@/lib/content/company";
import { GlobalReachGlobe } from "@/components/global-reach/GlobalReachGlobe";
import Image from "next/image";
import { QuoteLink } from "@/components/QuoteLink";
import "./reach.css";

export const metadata: Metadata = {
  title: "Global Reach",
  description: clientContent.network.overview,
  alternates: { canonical: "/global-reach" },
};

const countryDetails: Record<string, string> = {
  India: "Primary operating base for sourcing, operations and client support.",
  Kenya: "East Africa business relationships, sourcing opportunities and trade connections.",
  Uganda: "Agricultural sourcing opportunities and business development relationships.",
  UAE: "Commercial and supply-chain connections across a regional trade hub.",
  Kuwait: "Market development conversations and commercial opportunities in the Gulf.",
  Egypt: "Regional sourcing opportunities and business relationship development.",
  "United Kingdom": "Commercial discussions and market engagement across the UK and Europe.",
};

const networkBenefits = [
  ["Buyer-supplier introductions", "Relationships can help connect sourcing conversations with relevant business contacts."],
  ["Market insights", "Local context can inform discussions about opportunities and requirements."],
  ["Trade discussions", "We support conversations between buyers and business partners."],
  ["Export coordination", "Documentation and delivery needs are discussed for each enquiry."],
  ["Business development", "Relationships support market engagement and collaboration."],
  ["Regional connections", "The network helps keep communication personal across markets."],
] as const;

const partnerTypes = [
  { label: "Partner Companies", image: "/stock/industrial-refinery.webp" },
  { label: "Distributors", image: "/stock/footwear-making.webp" },
  { label: "Logistics Partners", image: "/stock/port-logistics.webp" },
  { label: "Industry Associations", image: "/stock/industrial-tanks-sunset.webp" },
] as const;

export default function GlobalReachPage() {
  return <article className="reach-page">
    <GlobalReachGlobe />

    <section className="reach-partners wrap" id="reach-partners" aria-labelledby="reach-partners-title">
      <p className="reach-globe-caption">Points mark India and six international partner markets. Red arcs illustrate a connected network, not verified shipping routes or Africhem offices.</p>
      <div className="reach-partners-heading"><p>02 / INDIA & THE PARTNER NETWORK</p><h2 id="reach-partners-title">Trade moves faster<br /><span>when someone is there.</span></h2><div><p className="reach-partners-statement">International trade is built on relationships.</p><p>From sourcing discussions and supplier coordination to logistics and market insights, our network connects buyers and business partners across Asia, Africa, the Middle East and Europe.</p><p>India is our primary operating base, complemented by relationships in six international partner markets. Our strength is knowing the right people when it matters. The map illustrates business relationships, not verified shipping lanes or offices.</p></div></div>
      <ol className="reach-country-list">{[clientContent.network.primaryCountry, ...clientContent.network.countries].map((country, index) => <li key={country} data-primary={index === 0 || undefined}><span>{String(index + 1).padStart(2, "0")}</span><Image src={`/flags/${({ India: "in", Kuwait: "kw", UAE: "ae", Egypt: "eg", Uganda: "ug", Kenya: "ke", "United Kingdom": "gb" } as Record<string, string>)[country]}.svg`} alt="" width={40} height={30} unoptimized /><strong>{country}</strong><span>{index === 0 ? "OUR BASE" : "PARTNER MARKET"}</span><small>{countryDetails[country]}</small></li>)}</ol>
      <div className="reach-destination"><p>Not on the list? Ask us about your destination. Partner responsibilities and available services are confirmed for each enquiry.</p><QuoteLink label="Check My Destination" /></div>
      <div className="reach-partners-heading"><p>03 / WHY OUR NETWORK MATTERS</p><h2>Reliable business starts with reliable connections.</h2><div><p className="reach-partners-statement">International trade requires communication, responsiveness and local market understanding.</p></div></div>
      <div className="business-grid">{networkBenefits.map(([title, text]) => <article className="business-card" key={title}><div><h2>{title}</h2><p>{text}</p></div></article>)}</div>
    </section>

    <section className="reach-cta wrap reach-logo-wall"><p>TRUSTED RELATIONSHIPS</p><div><h2>Partner network.</h2></div><div className="partner-logo-grid" aria-label="Partner network">{partnerTypes.map(({ label, image }) => <div key={label} aria-label={label}><Image src={image} alt="" fill sizes="(max-width: 767px) 45vw, 22vw" /></div>)}</div><p className="reach-logo-disclosure">Photographs represent the industries and do not identify specific partner organizations. Services and availability are confirmed for each enquiry.</p></section>
    <section className="reach-cta wrap"><p>REAL PEOPLE. REAL CONVERSATIONS.</p><div><h2>Business should remain personal.</h2><p className="reach-support-copy">For any query, at any stage, there is a real person to ask. Whether discussing product specifications, documentation requirements, logistics planning or market opportunities, our team believes business should remain personal. Technology may support communication. Relationships build trust, and trust drives successful business.</p></div></section>
    <section className="reach-cta wrap"><p>PEOPLE BUY FROM PEOPLE</p><div><h2>“The strongest supply chains are built on relationships, not transactions.”</h2><p className="reach-quote-attribution">Africhem Globalz</p></div></section>
    <section className="reach-cta wrap"><p>SOURCING SIMPLIFIED. RELATIONSHIPS AMPLIFIED.</p><div><div><h2>Looking at a new market?</h2><p className="reach-support-copy">Whether you&apos;re sourcing products, exploring trade opportunities or seeking dependable business relationships, share your requirements and we&apos;ll be glad to discuss them.</p><p className="reach-cta-contact"><a href="mailto:sales@africhem-globalz.com">sales@africhem-globalz.com</a><a href="tel:+916362830638">+91 63628 30638</a><span>{clientContent.network.summary}</span></p></div><QuoteLink label="Discuss Your Requirement" /></div></section>
  </article>;
}
