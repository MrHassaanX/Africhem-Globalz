import type { Metadata } from "next";
import Link from "next/link";
import { ContactIcon } from "@/components/SocialLinks";
import { QuoteLink } from "@/components/QuoteLink";
import { QuoteForm } from "@/components/quote/QuoteForm";
import { phoneLink, socialLinks } from "@/lib/socials";
import { company } from "@/lib/site";
import { quoteTransportReady } from "@/lib/quote";
import { companyIdentity } from "@/lib/verified-content";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact & Get a Quote",
  description: "Tell Africhem Globalz what you need. We will help clarify specifications, documents and delivery considerations.",
  alternates: { canonical: "/contact" },
};

const channels = [phoneLink, ...socialLinks];
const values = [
  { title: "Trust", text: "Business begins when communication is clear and expectations are realistic." },
  { title: "Experience", text: "Built on over 10 years of sourcing, business development and international trade experience." },
  { title: "Commitment", text: "We stay engaged from initial enquiry through commercial discussions and delivery coordination." },
];

type ContactSearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function ContactPage({ searchParams }: { searchParams: ContactSearchParams }) {
  const context = await searchParams;
  const category = firstValue(context.category);
  const product = firstValue(context.product);
  const destination = firstValue(context.destination);

  return (
    <article className={`revision-page contact-revision ${styles.page}`}>
      <header className="revision-hero wrap">
        <p className="revision-kicker">CONTACT AFRICHEM GLOBALZ</p>
        <h1>Tell us what you&apos;re looking for.</h1>
        <p>Whether you&apos;re sourcing chemicals, exploring trade opportunities or evaluating supply options, every successful order begins with a conversation. Share your requirement and we&apos;ll help clarify specifications, documentation and delivery considerations before moving forward.</p>
        <p className="revision-kicker">SOURCING SIMPLIFIED.</p>
      </header>

      <section className="revision-section wrap quote-layout surface-band surface-band--cool" id="quote" aria-labelledby="quote-title">
        <div>
          <p className="revision-kicker">GET A QUOTE</p>
          <h2 id="quote-title">Start with the details.</h2>
          <p className="revision-lead">A useful sourcing conversation begins with understanding your requirement. Share the product, specification, quantity and destination. Fields marked * are required.</p>
        </div>
        <QuoteForm
          key={JSON.stringify([category, product, destination])}
          enabled={quoteTransportReady()}
          initialCategory={category}
          initialProduct={product}
          initialDestination={destination}
        />
      </section>

      <section className={`revision-section wrap surface-band surface-band--warm ${styles.support}`} aria-labelledby="contact-channels-title">
        <div>
          <div className="revision-section-head">
            <p className="revision-kicker">DIRECT CONTACT</p>
            <h2 id="contact-channels-title">Speak with our team.</h2>
          </div>
          <div className="contact-links">
            {channels.map(channel => (
              <a
                key={channel.icon}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
              >
                <ContactIcon name={channel.icon} />
                <span>{channel.icon === "email" ? company.email : channel.icon === "phone" ? company.phone : "Open WhatsApp chat"}</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="what-next">
            <h3>What happens next?</h3>
            <ol>
              <li>We review your requirement.</li>
              <li>We discuss specifications and commercial considerations.</li>
              <li>We clarify documentation and delivery requirements.</li>
              <li>We respond with available sourcing options.</li>
              <li>We continue the conversation until you have the information you need.</li>
            </ol>
            <p className="what-next-note">No pressure. No sales language. Just confidence.</p>
          </div>
          {companyIdentity.legalName && (
            <div className="contact-identity">
              <h3>Business identity</h3>
              <p>{companyIdentity.legalName}</p>
              {companyIdentity.iec && <p>IEC: {companyIdentity.iec}</p>}
              {companyIdentity.gstin && <p>GSTIN: {companyIdentity.gstin}</p>}
              {companyIdentity.registeredAddress && <p>{companyIdentity.registeredAddress}</p>}
            </div>
          )}
        </div>
      </section>

      <section className="revision-section wrap surface-band surface-band--warm">
        <div className="revision-section-head">
          <p className="revision-kicker">WHY CLIENTS CONTACT AFRICHEM</p>
          <h2>Clear conversations from the start.</h2>
        </div>
        <div className={styles.values}>
          {values.map(item => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="revision-section wrap surface-band surface-band--cool">
        <div className="revision-section-head">
          <p className="revision-kicker">BEFORE YOU SUBMIT THAT ENQUIRY</p>
          <h2>People buy from people.</h2>
        </div>
        <p className="revision-lead">For more than a decade, I&apos;ve worked with suppliers, buyers, logistics partners and business owners across multiple markets. The biggest lesson I&apos;ve learned is simple: people buy from people. Products, pricing and documentation matter, but trust matters most. When you contact Africhem Globalz, you&apos;re not entering a ticketing system. You&apos;re starting a conversation with people who understand international trade and genuinely want to help make business easier.</p>
        <p className="revision-kicker">Founder · Africhem Globalz</p>
      </section>

      <section className="contact-principle wrap">
        <div className="revision-section-head">
          <p className="revision-kicker">OUR APPROACH</p>
          <h2>Business is complicated. Working together shouldn&apos;t be.</h2>
        </div>
        <p>Whether you&apos;re looking for a supplier, exploring a new market or reviewing sourcing options, our goal remains the same: make the process simpler, make communication clearer, make decisions easier and make business better.</p>
      </section>

      <section className="revision-closing wrap contact-closing">
        <div>
          <p className="revision-kicker">SOURCING SIMPLIFIED. RELATIONSHIPS BUILT. BUSINESS MADE EASIER.</p>
          <h2>Ready to start?</h2>
          <p>Tell us about the material. Tell us about the destination. Tell us about the challenge. We&apos;ll take it from there.</p>
          <p className="closing-contact">
            <a href="mailto:sales@africhem-globalz.com"><ContactIcon name="email" />sales@africhem-globalz.com</a>
            <a href="tel:+916362830638"><ContactIcon name="phone" />+91 63628 30638</a>
            <span>India · Kenya · Uganda · UAE · Kuwait · Egypt · United Kingdom</span>
          </p>
        </div>
        <div className="contact-closing-actions">
          <QuoteLink label="Discuss Your Requirement" category={category} product={product} destination={destination} />
          <Link className="text-arrow" href="/global-reach">Explore Our Network <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </article>
  );
}
