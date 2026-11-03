import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { chemicalFamilies, chemicalProducts, getChemicalFamily } from "@/lib/chemical-catalogue";
import { QuoteLink } from "@/components/QuoteLink";
import { ChemicalDeck } from "@/components/products/ChemicalDeck";
export const dynamicParams = false;
export function generateStaticParams() { return chemicalFamilies.map(family => ({ family: family.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ family: string }> }): Promise<Metadata> { const { family } = await params; const data = getChemicalFamily(family); return data ? { title: data.name, description: data.description, alternates: { canonical: `/products/${family}` } } : {}; }
export default async function FamilyPage({ params }: { params: Promise<{ family: string }> }) {
  const { family } = await params; const data = getChemicalFamily(family); if (!data) notFound();
  const named = chemicalProducts.filter(product => product.family === family);
  const customSourcing = family === "custom-sourcing";
  return <article className="revision-page"><header className="revision-hero wrap"><p className="revision-kicker"><Link href="/products">PRODUCTS</Link> / {data.name.toUpperCase()}</p><h1>{data.name}</h1><p>{data.description}</p><QuoteLink category={family} /></header>
    <section className="revision-section wrap surface-band surface-band--cool"><div className="revision-section-head"><p className="revision-kicker">{customSourcing ? "START A SOURCING REQUEST" : "NAMED PRODUCTS"}</p><h2>{named.length ? "Products in this category." : customSourcing ? "Can't find your product?" : "Start with your requirement."}</h2></div>
      {named.length ? <ChemicalDeck cards={named.map(product => ({ id: product.slug, name: product.name, description: product.typicalUse ?? data.description, image: product.slug === "white-spirit" ? "/materials/liquid-glass.webp" : "/stock/industrial-tanks-sunset.webp", href: `/products/${family}/${product.slug}`, quoteCategory: family, quoteProduct: product.slug, eyebrow: "PRODUCT NAME" }))} label={`${data.name} products`} /> : <div className="empty-family"><p>{customSourcing ? "Share your product specifications and destination. Our sourcing team will help guide you through the information needed to discuss options." : "Share the material, grade and quantity you need. Our team can review the enquiry and clarify information for a specific quotation."}</p><QuoteLink category={family} /></div>}
    </section><section className="revision-closing wrap"><div><p className="revision-kicker">NEED A DIFFERENT CHEMICAL?</p><h2>Share the detail before we quote.</h2></div><QuoteLink category={family} /></section></article>;
}
