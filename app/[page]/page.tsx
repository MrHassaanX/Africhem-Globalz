import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { company } from "@/lib/site";

const pages = {
  privacy: {
    title: "Privacy information",
    intro: "How we handle information you choose to send us through this website.",
    sections: [
      ["Information you provide", "If you contact us or submit an enquiry, we receive the contact details and business requirements you provide. Please do not include sensitive personal information in your message."],
      ["How we use it", "We use enquiry information to respond, discuss sourcing requirements and follow up on your request. When the online form is enabled, it sends your enquiry to our business email through a configured email service provider. You can also contact us directly by email, phone or WhatsApp; those services have their own privacy practices."],
      ["Browser storage", "This site stores your theme preference and whether you have seen the introductory animation in your browser. It also remembers that you dismissed the storage notice. These settings are local to your browser and can be cleared in its settings. We currently do not run analytics or advertising trackers."],
      ["Sharing and retention", "Enquiry information is accessible to the team handling your request and the service providers needed to deliver it. We keep it only as long as needed for the enquiry and applicable business or legal requirements. For access, correction or deletion requests, contact us at the address below."],
      ["Changes", "We will update this page if our website services or information practices change."],
    ],
  },
  terms: {
    title: "Website terms & conditions",
    intro: "These terms describe use of the Africhem Globalz website and its product enquiry information.",
    sections: [
      ["Website purpose", "This site provides general information about our sourcing services and enables business enquiries. Product descriptions and images are illustrative of enquiry categories and may not show the exact product, grade or shipment offered."],
      ["No offer or confirmed availability", "Website information is not a binding offer, quotation or guarantee of availability, price, specification, origin, delivery date or suitability. Please verify technical and regulatory requirements for your intended use with our team."],
      ["Enquiries and orders", "Submitting an enquiry does not place an order. Any supply arrangement is subject to a separate written quotation and acceptance that specifies the product, grade, quantity, documentation, price, payment, delivery and any other applicable terms. If those documents conflict with this website page, the agreed transaction documents control that transaction."],
      ["Responsible use", "You may use the site for lawful business enquiries. Do not interfere with its operation, submit misleading requests, or reuse its content in a way that suggests our endorsement."],
      ["External services", "Links to WhatsApp, social platforms or other external sites take you to services we do not operate. Their own terms and privacy practices apply."],
      ["Site changes", "We may update website content and these terms. The date below identifies this version. For questions about a specific enquiry or transaction, contact us directly."],
    ],
  },
} as const;
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(pages).map(page => ({ page })); }
export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> { const { page } = await params; const data = pages[page as keyof typeof pages]; return data ? { title: data.title, description: data.intro, alternates: { canonical: `/${page}` } } : {}; }
export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params; const data = pages[page as keyof typeof pages]; if (!data) notFound();
  return <article className="revision-page legal-page"><header className="revision-hero wrap"><p className="revision-kicker">WEBSITE INFORMATION</p><h1>{data.title}</h1><p>{data.intro}</p><p className="legal-date">Updated 25 November 2026</p></header><div className="wrap legal-content">{data.sections.map(([title, value]) => <section key={title}><h2>{title}</h2><p>{value}</p></section>)}<section><h2>Contact</h2><p>Questions about this page? Email <a href={`mailto:${company.email}`}>{company.email}</a>.</p></section></div></article>;
}
