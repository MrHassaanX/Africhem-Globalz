type ProductPresentation = { description: string; image: string };
import reviewEdits from "./review-edits.json";

const polymers = "/materials/mineral-crystal.webp";
const fuels = "/stock/industrial-tanks-sunset.webp";
const coatings = "/materials/chemical-transfer.webp";
const solvents = "/materials/liquid-glass.webp";
const industrial = "/materials/industrial-fluid.webp";
const transfer = "/materials/chemical-transfer.webp";
const refinery = "/stock/industrial-refinery.webp";
const port = "/stock/port-logistics.webp";

const defaults: Record<string, ProductPresentation> = {
  HDPE: { description: "Polymer enquiries for rigid packaging and industrial applications.", image: polymers },
  LDPE: { description: "Flexible packaging and processing material enquiries.", image: transfer },
  LLDPE: { description: "Film, packaging and manufacturing material enquiries.", image: industrial },
  PET: { description: "Polymer enquiries for packaging and manufacturing.", image: polymers },
  RPET: { description: "Recycled PET material enquiries for suitable applications.", image: transfer },
  "PVC Resin": { description: "Resin enquiries for industrial and construction uses.", image: industrial },
  "Heating Oil": { description: "Discuss grade, quantity and destination for your fuel requirement.", image: fuels },
  "Waste Engine Oil": { description: "Share the material details and intended application for review.", image: industrial },
  "Kerosene Grade 1": { description: "Grade-specific kerosene enquiries and documentation discussion.", image: refinery },
  "Kerosene Grade 2": { description: "Grade-specific kerosene enquiries and documentation discussion.", image: fuels },
  "Base Oil": { description: "Base oil enquiries with specifications and quantity to confirm.", image: transfer },
  "Fuel Oil": { description: "Fuel oil enquiries based on your specification and destination.", image: port },
  "Titanium Dioxide (TiO₂)": { description: "Pigment material enquiries for coatings applications.", image: coatings },
  "Alkyd Resin": { description: "Resin enquiries for paint and coating formulations.", image: industrial },
  "White Cement": { description: "Material enquiries for construction and finishing uses.", image: polymers },
  Acetone: { description: "Solvent enquiries for manufacturing and industrial applications.", image: solvents },
  IPA: { description: "Isopropyl alcohol enquiries with grade and use to confirm.", image: industrial },
  Methanol: { description: "Methanol enquiries for industrial applications.", image: transfer },
  "Ethyl Acetate": { description: "Solvent enquiries for coatings and manufacturing.", image: coatings },
  "MDC (Methylene Dichloride)": { description: "Discuss required grade, quantity and application.", image: solvents },
  "M-Xylene": { description: "Aromatic solvent enquiries for industrial use.", image: industrial },
  Toluene: { description: "Solvent enquiries based on your specification and use.", image: transfer },
  BTX: { description: "Discuss the required aromatic material and specification.", image: refinery },
  "White Spirit": { description: "Solvent enquiries for coatings and surface treatment.", image: solvents },
  Thinners: { description: "Share the coating system and required thinner type.", image: industrial },
  "NC Thinner": { description: "Thinner enquiries for compatible coating systems.", image: transfer },
  "Lacquer Thinner": { description: "Discuss the lacquer system and required specification.", image: coatings },
  "Paint Solvent": { description: "Solvent enquiries for paint and coating applications.", image: solvents },
  "Solvent W.S.": { description: "Share the required grade and intended use.", image: industrial },
  "Industrial Composite Solvent": { description: "Discuss the formulation requirement and application.", image: transfer },
  "Caustic Soda Flakes": { description: "Bulk industrial chemical enquiries with grade to confirm.", image: industrial },
  "Hydrochloric Acid (HCL)": { description: "Industrial acid enquiries with concentration to confirm.", image: transfer },
  "Sulphuric Acid": { description: "Industrial acid enquiries with concentration to confirm.", image: refinery },
};

export const productPresentations: Record<string, ProductPresentation> = { ...defaults, ...reviewEdits };
