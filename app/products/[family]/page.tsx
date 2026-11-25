import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteLink } from "@/components/QuoteLink";
import { chemicalProducts } from "@/lib/chemical-catalogue";
import { getProductCategory, productCategorySlugs } from "../catalogue";
import { productPresentations } from "../product-presentations";
import "../personal-products.css";

type FamilyPageProps = { params: Promise<{ family: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return productCategorySlugs.map(family => ({ family }));
}

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const { family } = await params;
  const category = getProductCategory(family);
  return category ? {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/products/${family}` },
  } : {};
}

export default async function FamilyPage({ params }: FamilyPageProps) {
  const { family } = await params;
  const category = getProductCategory(family);
  if (!category) notFound();

  const details = chemicalProducts.filter(product =>
    family === "thinners-and-white-spirit"
      ? product.family === "solvents" && ["white-spirit", "thinner"].includes(product.slug)
      : product.family === family,
  );
  const customSourcing = family === "custom-sourcing";

  const products = category.products.map(name => ({
    name,
    detail: details.find(product => product.name === name || (name === "Thinners" && product.slug === "thinner")),
  }));
  const additionalDetails = details.filter(detail => !products.some(product => product.detail === detail));

  return (
    <article className="product-category">
      <header className="category-intro wrap">
        <div>
          <Link className="category-back" href="/products"><span aria-hidden="true">←</span> All products</Link>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
          <QuoteLink category={category.quoteCategory} />
        </div>
        <div className="category-hero-image">
          <Image src={category.image} alt="" fill sizes="(max-width: 767px) 92vw, (max-width: 1440px) 40vw, 540px" />
        </div>
      </header>

      <div className="products-process-band">
        <section className="category-inventory wrap" aria-labelledby="category-products">
          <h2 id="category-products">
            {products.length ? "Products in this category" : customSourcing ? "Can't find your product?" : "Share your requirements"}
          </h2>
          {products.length ? (
            <ul className="product-item-grid" role="list">
              {products.map(({ name, detail }) => {
                const presentation = productPresentations[name];
                return <li key={name} className="product-item-card">
                  <div className="product-item-image">
                    <Image src={presentation?.image ?? category.image} alt="" fill sizes="(max-width: 599px) 92vw, (max-width: 999px) 45vw, 400px" />
                  </div>
                  <div className="product-item-copy">
                    {detail ? <Link href={`/products/${detail.family}/${detail.slug}`}>{name}<span aria-hidden="true">→</span></Link> : <h3>{name}</h3>}
                    <p>{presentation?.description ?? `Discuss specifications and sourcing options for ${name}.`}</p>
                  </div>
                </li>;
              })}
            </ul>
          ) : (
            <p>{customSourcing
              ? "Share your product specifications and destination. Our sourcing team will help guide you through the information needed to discuss options."
              : "Share the material, grade and quantity you need. Our team can review the enquiry and clarify information for a specific quotation."}</p>
          )}

          {details.length > 0 && (
            <div className="product-detail-links">
              <h3>{additionalDetails.length ? "More product details" : "Specifications and availability"}</h3>
              {family === "solvents" && (
                <p>Share the application, quantity and destination to discuss grades, availability and product-specific documents such as COAs, TDSs and SDSs.</p>
              )}
              {additionalDetails.length > 0 && (
                <ul role="list">
                  {additionalDetails.map(product => (
                    <li key={product.slug}><Link href={`/products/${product.family}/${product.slug}`}>{product.name}</Link></li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>
      </div>
    </article>
  );
}
