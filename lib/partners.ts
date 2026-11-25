import { siteImage } from "./site-images";

const partnerDefaults = [
  { name: "Kailaa Chemicals", src: "/partners/kailaa-chemicals.webp" },
  { name: "Trade Line", src: "/partners/trade-line.webp" },
  { name: "3M Chemicals Group", src: "/partners/3m-chemicals-group.webp" },
  { name: "Amaz International", src: "/partners/amaz-international.webp" },
  { name: "Energex", src: "/partners/energex.webp" },
  { name: "Al Madina Dual Uni FZ LLC", src: "/partners/al-madina.webp" },
  { name: "Hasco Paints", src: "/partners/hasco-paints.webp" },
  { name: "Nirva Energy", src: "/partners/nirva-energy.webp" },
] as const;
export const partnerLogos = partnerDefaults.map(item => ({ ...item, src: siteImage(`partner-${item.src.split("/").at(-1)?.replace(/\.webp$/, "")}`, item.src) }));

export const partnersHref = "/other-businesses#partners";
