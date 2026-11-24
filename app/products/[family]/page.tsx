import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteLink } from "@/components/QuoteLink";
import { chemicalProducts } from "@/lib/chemical-catalogue";
import { getProductCategory, productCategorySlugs } from "../catalogue";
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

  return (
    <article className="revision-page product-category">
      <header className="revision-hero wrap">
        <p className="revision-kicker"><Link href="/products">PRODUCTS</Link> / {category.name.toUpperCase()}</p>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
        <QuoteLink category={category.quoteCategory} />
      </header>

      <section className="revision-section wrap surface-band surface-band--cool" aria-labelledby="category-products">
        <div className="revision-section-head">
          <p className="revision-kicker">{customSourcing ? "START A SOURCING REQUEST" : "NAMED PRODUCTS"}</p>
          <h2 id="category-products">
            {category.products.length ? "Products in this category." : customSourcing ? "Can't find your product?" : "Start with your requirement."}
          </h2>
        </div>
        {category.products.length ? (
          <ul className="product-item-grid" role="list">
            {category.products.map(name => <li key={name}>{name}</li>)}
          </ul>
        ) : (
          <div className="empty-family">
            <p>{customSourcing
              ? "Share your product specifications and destination. Our sourcing team will help guide you through the information needed to discuss options."
              : "Share the material, grade and quantity you need. Our team can review the enquiry and clarify information for a specific quotation."}</p>
            <QuoteLink category={category.quoteCategory} />
          </div>
        )}

        {details.length > 0 && (
          <div className="product-detail-links">
            <h3>Product details</h3>
            {family === "solvents" && (
              <>
                <p>Acetone, IPA, Methanol, Ethyl Acetate, White Spirit and Thinner. Share the application, quantity and destination to discuss the relevant specifications and available details.</p>
                <p>Grades, availability and product-specific documents are discussed for each enquiry. No public COA, TDS or SDS download is presented here.</p>
              </>
            )}
            <ul role="list">
              {details.map(product => (
                <li key={product.slug}><Link href={`/products/${product.family}/${product.slug}`}>{product.name}</Link></li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section className="revision-closing wrap">
        <div>
          <p className="revision-kicker">NEED A DIFFERENT CHEMICAL?</p>
          <h2>Share the detail before we quote.</h2>
        </div>
        <QuoteLink category={category.quoteCategory} />
      </section>
    </article>
  );
}
