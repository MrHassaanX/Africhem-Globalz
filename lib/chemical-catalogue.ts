// Public product names requested in the current Website content document.
export type ChemicalDocument = {
  type: "COA" | "TDS" | "SDS";
  title: string;
  url: string;
  productSpecific: boolean;
  approved: boolean;
};

export type ChemicalProduct = {
  slug: string;
  name: string;
  family: string;
  source: string;
  typicalUse?: string;
  grade?: string;
  properties?: readonly { name: string; value: string; method?: string }[];
  packaging?: string;
  minimumOrder?: string;
  leadTime?: string;
  origin?: string;
  handling?: string;
  shippingRequirements?: string;
  documents: readonly ChemicalDocument[];
};

export const chemicalFamilies = [
  { slug: "petrochemicals", name: "Petrochemicals", description: "Share the petrochemical material, quantity and destination. Our team will help clarify the sourcing requirement.", image: "/stock/industrial-tanks-sunset.webp" },
  { slug: "polymers", name: "Polymers", description: "Tell us the polymer and application you are looking for, along with your quantity and destination.", image: "/materials/mineral-crystal.webp" },
  { slug: "industrial-chemicals", name: "Industrial Chemicals", description: "Discuss industrial chemical requirements, documentation and delivery considerations with our team.", image: "/materials/chemical-transfer.webp" },
  { slug: "solvents", name: "Solvents", description: "Acetone, IPA, Methanol, Ethyl Acetate, White Spirit and Thinner enquiries for manufacturing, coatings, printing and industrial applications.", image: "/materials/liquid-glass.webp" },
  { slug: "specialty-chemicals", name: "Specialty Chemicals", description: "Share your product application and specification so we can discuss relevant sourcing options.", image: "/stock/industrial-refinery.webp" },
  { slug: "custom-sourcing", name: "Custom Sourcing Requests", description: "Can't find your product? Share the specification and destination to start a sourcing conversation.", image: "/stock/port-logistics.webp" },
] as const;

export type ChemicalFamilySlug = (typeof chemicalFamilies)[number]["slug"];
export const getChemicalFamily = (slug: string) => chemicalFamilies.find(family => family.slug === slug);

const source = "Website content.docx — product categories";
export const chemicalProducts: readonly ChemicalProduct[] = [
  { slug: "acetone", name: "Acetone", family: "solvents", source, typicalUse: "Enquiries for manufacturing, coatings, printing and industrial applications.", documents: [] },
  { slug: "ipa", name: "IPA", family: "solvents", source, typicalUse: "Enquiries for manufacturing, coatings, printing and industrial applications.", documents: [] },
  { slug: "methanol", name: "Methanol", family: "solvents", source, typicalUse: "Enquiries for manufacturing, coatings, printing and industrial applications.", documents: [] },
  { slug: "ethyl-acetate", name: "Ethyl Acetate", family: "solvents", source, typicalUse: "Enquiries for manufacturing, coatings, printing and industrial applications.", documents: [] },
  { slug: "white-spirit", name: "White Spirit", family: "solvents", source, typicalUse: "Solutions for paints, coatings and surface treatment industries.", documents: [] },
  { slug: "thinner", name: "Thinner", family: "solvents", source, typicalUse: "Solutions for paints, coatings and surface treatment industries.", documents: [] },
];
export const getChemicalProduct = (family: string, product: string) => chemicalProducts.find(item => item.family === family && item.slug === product);
export const approvedDocuments = (product: ChemicalProduct) => product.documents.filter(document => document.approved && document.url.startsWith("/documents/"));
