import type { Metadata } from "next";
import { ContactIcon } from "@/components/SocialLinks";
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
        <p>Share your product, specification, quantity and destination. We&apos;ll help clarify sourcing options, documentation and delivery considerations.</p>
      </header>

      <section className="revision-section wrap quote-layout surface-band surface-band--cool" id="quote" aria-labelledby="quote-title">
        <div>
          <p className="revision-kicker">GET A QUOTE</p>
          <h2 id="quote-title">Start with the details.</h2>
          <p className="revision-lead">Tell us about your requirement. Fields marked * are required.</p>
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
            <p className="what-next-note">Our team brings over 10 years of sourcing, business development and international trade experience to the conversation.</p>
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

    </article>
  );
}
