import type { Metadata } from "next";
import Image from "next/image";
import { GlobalReachGlobe } from "@/components/global-reach/GlobalReachGlobe";
import { QuoteLink } from "@/components/QuoteLink";
import { clientContent } from "@/lib/content/company";
import { networkLocations } from "@/lib/globe/locations";
import "./reach.css";

export const metadata: Metadata = {
  title: "Global Reach",
  description: clientContent.network.overview,
  alternates: { canonical: "/global-reach" },
};

const markets: Record<(typeof networkLocations)[number]["name"], [flag: string, description: string]> = {
  India: ["in", "Primary operating base for sourcing, operations and client support."],
  Kenya: ["ke", "East Africa business relationships, sourcing opportunities and trade connections."],
  Uganda: ["ug", "Agricultural sourcing opportunities and business development relationships."],
  UAE: ["ae", "Commercial and supply-chain connections across a regional trade hub."],
  Kuwait: ["kw", "Market development conversations and commercial opportunities in the Gulf."],
  Egypt: ["eg", "Regional sourcing opportunities and business relationship development."],
  "United Kingdom": ["gb", "Commercial discussions and market engagement across the UK and Europe."],
};

const tradeSupport = [
  ["Sourcing and introductions", "We discuss sourcing and product specifications and help connect buyers with relevant suppliers and business contacts."],
  ["Market development", "Local insights and regional relationships inform trade discussions and help identify opportunities for collaboration."],
  ["Export coordination", "We discuss documentation, logistics and delivery needs for each enquiry."],
] as const;

const partnerTypes = ["Partner companies", "Distributors", "Logistics partners", "Industry associations"];

export default function GlobalReachPage() {
  return (
    <article className="reach-page">
      <GlobalReachGlobe />

      <section className="reach-markets" id="reach-partners" aria-labelledby="reach-partners-title">
        <div className="wrap reach-section">
          <header className="reach-section-heading">
            <h2 id="reach-partners-title">Where we work</h2>
            <p>{clientContent.network.overview}</p>
          </header>
          <ul className="reach-country-list">
            {networkLocations.map(({ name, primary }) => {
              const [flag, description] = markets[name];
              return (
                <li key={name} data-primary={primary || undefined}>
                  <Image src={`/flags/${flag}.svg`} alt="" width={40} height={30} unoptimized />
                  <div>
                    {primary && <span>Our operating base</span>}
                    <h3>{name}</h3>
                    <p>{description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="reach-destination">
            <p>Working with a destination outside these markets? Ask us what’s possible.</p>
            <QuoteLink label="Check My Destination" />
          </div>
        </div>
      </section>

      <section className="wrap reach-section" aria-labelledby="reach-support-title">
        <header className="reach-section-heading">
          <h2 id="reach-support-title">How our network helps</h2>
          <p>Speak directly with our team about sourcing, documentation or a new market. Partner responsibilities and available services are confirmed for each enquiry.</p>
        </header>
        <ul className="reach-support-grid">
          {tradeSupport.map(([title, description]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ul>
        <div className="reach-partner-types">
          <h3>Who’s in the network</h3>
          <ul>{partnerTypes.map((type) => <li key={type}>{type}</li>)}</ul>
        </div>
      </section>

      <section className="reach-contact" aria-labelledby="reach-contact-title">
        <div className="wrap reach-section reach-contact-layout">
          <div>
            <h2 id="reach-contact-title">Looking at a new market?</h2>
            <p>Tell us what you’re sourcing or which trade opportunity you’re exploring.</p>
            <address>
              <a href="mailto:sales@africhem-globalz.com">sales@africhem-globalz.com</a>
              <a href="tel:+916362830638">+91 63628 30638</a>
            </address>
          </div>
          <QuoteLink label="Discuss Your Requirement" />
        </div>
      </section>
    </article>
  );
}
