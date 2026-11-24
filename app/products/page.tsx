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

const support = ["Verified Supply Partners", "Technical Documentation Support", "Global Shipping Coordination", "Dedicated Point of Contact"];
const pricing = ["Product specifications", "Supplier options", "Quantity requirements", "Delivery terms", "Export documentation", "Logistics considerations"];
const people = ["Direct communication", "Documentation guidance", "Logistics coordination", "Long-term relationship focus"];

function CheckList({ items }: { items: readonly string[] }) {
  return <ul className="products-checks" role="list">
    {items.map(item => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
  </ul>;
}

export default function ProductsPage() {
  return (
    <article className="product-directory">
      <header className="products-intro wrap">
        <div>
          <p className="products-label">PRODUCTS</p>
          <h1>Tell us what you need. We&apos;ll help source the right solution.</h1>
        </div>
        <div>
          <p>Whether you&apos;re sourcing solvents, polymers, specialty chemicals or industrial raw materials, our team can help you discuss specifications, documentation and delivery requirements before you commit to an order.</p>
          <p>Choose a category or share a custom sourcing request.</p>
          <QuoteLink label="Request Pricing" />
        </div>
      </header>

      <section className="products-support wrap" aria-label="Sourcing support">
        <CheckList items={support} />
      </section>

      <section className="products-categories wrap" aria-label="Product categories">
        <ul className="product-category-grid" role="list">
          {productCategories.map(category => (
            <li key={category.slug}>
              <Link className="product-category-link" href={`/products/${category.slug}`}>
                <div className="product-category-image">
                  <Image src={category.image} alt="" fill sizes="(max-width: 599px) 92vw, (max-width: 999px) 46vw, (max-width: 1279px) 30vw, 23vw" />
                </div>
                <div className="product-category-copy">
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                  <span className="product-category-arrow" aria-hidden="true">→</span>
                </div>
              </Link>
              <QuoteLink label="Get a Quote" category={category.quoteCategory} />
            </li>
          ))}
        </ul>
      </section>

      <div className="products-process-band">
        <div className="products-process wrap">
          <section aria-labelledby="buyers-title">
            <p className="products-label">BEFORE PRICING AND SHIPMENT</p>
            <h2 id="buyers-title">What buyers work through with us.</h2>
            <p>Most sourcing challenges happen before an order is placed. We help buyers review:</p>
            <CheckList items={pricing} />
          </section>
          <section aria-labelledby="buyer-steps-title">
            <p className="products-label">AFTER YOU SUBMIT A REQUEST</p>
            <h2 id="buyer-steps-title">Review the details, then decide.</h2>
            <ol className="products-steps" role="list">
              {buyerSteps.map(step => (
                <li key={step.number}>
                  <span className="product-step-number" aria-hidden="true">{step.number}</span>
                  <div><strong>{step.title}.</strong> {step.description}</div>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      <div className="products-commercial wrap">
        <section aria-labelledby="products-people-title">
          <p className="products-label">PEOPLE BUY FROM PEOPLE</p>
          <h2 id="products-people-title">International trade involves more than finding a supplier.</h2>
          <p>Africhem was built by professionals with hands-on experience in sourcing, supplier coordination, export documentation and global trade. When you contact us, you&apos;re connected with real people who understand the process from enquiry to shipment.</p>
          <CheckList items={people} />
        </section>
        <section className="products-quotation" aria-labelledby="products-quote-title">
          <p className="products-label">REQUEST A QUOTATION</p>
          <h2 id="products-quote-title">Bring us the material and the detail.</h2>
          <p>Share your grade, quantity and destination; our team can discuss the available product information and quotation options.</p>
          <QuoteLink />
        </section>
      </div>

      <div className="products-faq-band">
        <section className="products-faq wrap" aria-labelledby="products-faq-title">
          <div>
            <p className="products-label">BUYER QUESTIONS</p>
            <h2 id="products-faq-title">What to ask before a quote.</h2>
          </div>
          <ProductFAQ />
        </section>
      </div>
    </article>
  );
}
