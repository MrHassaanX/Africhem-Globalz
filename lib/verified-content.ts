export const companyIdentity: {
  legalName?: string; registrationNumber?: string; iec?: string; gstin?: string;
  registeredAddress?: string; establishedYear?: string; officeHours?: string; timeZone?: string;
} = {};

export const founderProfile: {
  name?: string; role?: string; biography?: string; portrait?: string; linkedin?: string;
} = {};

export const buyerSteps = [
  { number: "01", title: "Tell us what you need", description: "Share the product, quantity and destination so we understand your requirement." },
  { number: "02", title: "We review and contact you", description: "Our team reviews the information and follows up to clarify specifications and trade requirements." },
  { number: "03", title: "Receive pricing and details", description: "We discuss available product information, documentation and commercial details for your enquiry." },
  { number: "04", title: "Confirm and ship", description: "Once requirements and terms are agreed, shipment and delivery planning can proceed." },
] as const;

export type ProofPoint = { text: string; approved: boolean; source: string; public: boolean };
export const proofPoints: readonly ProofPoint[] = [
  { text: "Verified Suppliers", approved: true, source: "Website content.docx — requested by user", public: true },
  { text: "Documentation Support", approved: true, source: "Website content.docx — requested by user", public: true },
  { text: "Global Logistics", approved: true, source: "Website content.docx — requested by user", public: true },
  { text: "Personal Assistance", approved: true, source: "Website content.docx — requested by user", public: true },
  { text: "COA checked before cargo ships", approved: false, source: "Historical client copy; operational evidence pending", public: false },
  { text: "Customs clearance handled", approved: false, source: "Historical client copy; operational evidence pending", public: false },
];
