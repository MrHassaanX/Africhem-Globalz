import Link from "next/link";

export function FoundationPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: React.ReactNode }) {
  return <section className="foundation-page full-site-container"><p className="foundation-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="foundation-description">{description}</p>{children}<div className="foundation-next"><span>START A CONVERSATION</span><a href="mailto:sales@africhem-globalz.com">sales@africhem-globalz.com <span aria-hidden="true">↗</span></a><Link href="/contact">Contact Africhem Globalz</Link></div></section>;
}
