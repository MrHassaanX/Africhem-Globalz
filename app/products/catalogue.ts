// Product names and category descriptions from Website content - PARTNERS.docx.
import { chemicalFamilies, getChemicalFamily } from "@/lib/chemical-catalogue";

const documentCategories = [
  {
    slug: "polymers",
    name: "Plastics & Polymers",
    description: "Materials supporting packaging, manufacturing and industrial production.",
    image: "/materials/mineral-crystal.webp",
    quoteCategory: "polymers",
    products: ["HDPE", "LDPE", "LLDPE", "PET", "RPET", "PVC Resin"],
  },
  {
    slug: "petrochemicals",
    name: "Petrochemicals",
    description: "Industrial feedstocks and energy-related products sourced through trusted networks.",
    image: "/stock/industrial-tanks-sunset.webp",
    quoteCategory: "petrochemicals",
    products: ["Heating Oil", "Waste Engine Oil", "Kerosene Grade 1", "Kerosene Grade 2", "Base Oil", "Fuel Oil"],
  },
  {
    slug: "paints-and-coatings",
    name: "Paints & Coatings",
    description: "Raw materials supporting coatings, paint and construction sectors.",
    image: "/stock/industrial-refinery.webp",
    quoteCategory: "paints-and-coatings",
    products: ["Titanium Dioxide (TiO₂)", "Alkyd Resin", "White Cement"],
  },
  {
    slug: "solvents",
    name: "Solvents",
    description: "Acetone · IPA · Methanol · Ethyl Acetate. Supporting manufacturing, coatings, printing and industrial applications.",
    image: "/materials/liquid-glass.webp",
    quoteCategory: "solvents",
    products: ["Acetone", "IPA", "Methanol", "Ethyl Acetate", "MDC (Methylene Dichloride)", "M-Xylene", "Toluene", "BTX"],
  },
  {
    slug: "thinners-and-white-spirit",
    name: "Thinners & White Spirit",
    description: "Solutions for paints, coatings and surface treatment industries.",
    image: "/stock/port-logistics.webp",
    quoteCategory: "thinners-and-white-spirit",
    products: ["White Spirit", "Thinners", "NC Thinner", "Lacquer Thinner", "Paint Solvent", "Solvent W.S.", "Industrial Composite Solvent"],
  },
  {
    slug: "industrial-chemicals",
    name: "Industrial Chemicals",
    description: "Bulk chemicals for manufacturing and industrial operations. Share your requirement to discuss available options.",
    image: "/materials/chemical-transfer.webp",
    quoteCategory: "industrial-chemicals",
    products: ["Caustic Soda Flakes", "Hydrochloric Acid (HCL)", "Sulphuric Acid"],
  },
] as const;

export const productCategories = [
  ...documentCategories,
  {
    slug: "custom-sourcing",
    name: "Specialty Sourcing",
    description: "Share your specifications and destination. We'll help identify sourcing options.",
    image: "/stock/industrial-refinery.webp",
    quoteCategory: "custom-sourcing",
    products: [],
  },
] as const;

export const productCategorySlugs = [...new Set([
  ...chemicalFamilies.map(({ slug }) => slug),
  ...productCategories.map(({ slug }) => slug),
])];

export function getProductCategory(slug: string) {
  const existing = getChemicalFamily(slug);
  const category = productCategories.find(item => item.slug === slug);

  if (!existing) return category;
  return { ...existing, quoteCategory: slug, products: category?.products ?? [] };
}
