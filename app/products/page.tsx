import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductFAQ } from "@/components/products/ProductFAQ";
import { QuoteLink } from "@/components/QuoteLink";
import { buyerSteps } from "@/lib/verified-content";
import { productCategories } from "./catalogue";
import "./personal-products.css";

export const metadata: Metadata = {
  title: "Industrial Chemical Products",
  description: "Explore featured sourcing options and discuss specifications, documentation and delivery with Africhem Globalz.",
  alternates: { canonical: "/products" },
};

const categories = productCategories.filter(category => category.slug !== "custom-sourcing");
const support = ["Verified supply partners", "Technical documentation support", "Global shipping coordination", "Dedicated point of contact"];
const pricing = ["Product specifications", "Supplier options", "Quantity requirements", "Delivery terms", "Export documentation", "Logistics considerations"];

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="products-checks" role="list">
      {items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
    </ul>
  );
}

export default function ProductsPage() {
  return (
    <article className="product-directory">
      <header className="products-intro wrap">
        <h1>Industrial Chemical Products</h1>
        <p>Browse our chemical and raw material categories, or send us your requirements for a custom sourcing enquiry.</p>
      </header>

      <section className="products-categories wrap" aria-label="Product categories">
        <ul className="product-category-grid" role="list">
          {categories.map(category => (
            <li key={category.slug}>
              <Link className="product-category-link" href={`/products/${category.slug}`}>
                <div className="product-category-image">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    sizes="(max-width: 599px) 92vw, (max-width: 999px) 46vw, (max-width: 1440px) 30vw, 440px"
                  />
                </div>
                <div className="product-category-copy">
                  <h2>{category.name}<span className="product-category-arrow" aria-hidden="true">→</span></h2>
                  <p>{category.description}</p>
                </div>
              </Link>
              <QuoteLink category={category.quoteCategory} />
            </li>
          ))}
        </ul>

        <section className="products-sourcing" aria-labelledby="specialty-sourcing">
          <div>
            <h2 id="specialty-sourcing"><Link href="/products/custom-sourcing">Specialty Sourcing</Link></h2>
            <p>Looking for a different material? Share the grade, quantity and destination so we can discuss sourcing options.</p>
          </div>
          <QuoteLink label="Request Pricing" category="custom-sourcing" />
        </section>
      </section>

      <section className="products-process-band" aria-labelledby="sourcing-review">
        <div className="products-process wrap">
          <h2 id="sourcing-review">From enquiry to shipment</h2>
          <div className="products-process-columns">
            <section aria-labelledby="buyers-title">
              <h3 id="buyers-title">What we review before pricing</h3>
              <CheckList items={pricing} />
            </section>
            <section aria-labelledby="buyer-steps-title">
              <h3 id="buyer-steps-title">What happens after you enquire</h3>
              <ol className="products-steps">
                {buyerSteps.map(step => (
                  <li key={step.number}><strong>{step.title}.</strong> {step.description}</li>
                ))}
              </ol>
            </section>
          </div>
          <p>Our team has hands-on experience in sourcing, supplier coordination, export documentation and global trade.</p>
          <div className="products-support" aria-label="Sourcing support">
            <CheckList items={support} />
          </div>
        </div>
      </section>

      <section className="products-faq wrap" aria-labelledby="products-faq-title">
        <h2 id="products-faq-title">Buyer questions</h2>
        <ProductFAQ />
      </section>
    </article>
  );
}
