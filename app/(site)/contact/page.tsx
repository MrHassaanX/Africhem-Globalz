import "@/styles/contact-page.css";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata({ title: "Contact | Africhem Globalz", description: "Contact Africhem Globalz about chemical sourcing, trading and distribution enquiries.", path: "/contact" });
export default function Contact() {
  return <section className="contact-page"><div className="full-site-container contact-layout">
    <div className="contact-intro">
      <p className="contact-eyebrow">AFRICHEM GLOBALZ / CONTACT</p>
      <h1>Let’s start with<br /><em>your requirement.</em></h1>
      <p className="contact-description">Tell us what material you need. Our team will review your enquiry and get back to you.</p>
      <div className="contact-details">
        <div><span>Email</span><a href="mailto:sales@africhem-globalz.com">sales@africhem-globalz.com</a></div>
        {/* TODO: Replace these phone and address placeholders once confirmed. */}
        <div><span>Phone</span><p>+91 XXXXX XXXXX</p></div>
        <div><span>Head Office</span><p>Address to be updated</p></div>
      </div>
    </div>
    <EnquiryForm />
  </div></section>;
}
