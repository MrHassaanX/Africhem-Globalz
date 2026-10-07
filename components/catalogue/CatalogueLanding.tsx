import Link from "next/link";
import { PerspectiveCatalogue } from "@/components/catalogue/PerspectiveCatalogue";
import { MaskedHeading } from "@/components/motion/MaskedHeading";
import { SiteScrollScenes } from "@/components/motion/SiteScrollScenes";

export function CatalogueLanding() {
  return <>
    <SiteScrollScenes page="products" />
    <section className="catalogue-page-hero">
      <div className="full-site-container">
        <p className="catalogue-page-eyebrow">AFRICHEM GLOBALZ / PRODUCTS</p>
        <div className="catalogue-page-heading"><MaskedHeading level={1} lines={[{ text: "Materials in" }, { text: "perspective.", accent: true }]} /><p>Product information is being prepared. Explore how the range will be presented, or contact us about the material you need.</p></div>
      </div>
    </section>
    <section className="catalogue-page-stage" aria-label="Product information preview">
      <PerspectiveCatalogue />
    </section>
    <section className="catalogue-page-footer"><div className="full-site-container"><p>Need information about a particular material?</p><h2>Start with your requirement.</h2><p>Availability, specifications and suitability are confirmed for each enquiry. No product catalogue is currently published for download.</p><Link className="catalogue-page-cta" href="/contact">Contact Africhem Globalz <span aria-hidden="true">↗</span></Link></div></section>
  </>;
}
