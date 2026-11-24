import Image from "next/image";
import Link from "next/link";
import { chemicalFamilies } from "@/lib/chemical-catalogue";
import { HomeIcon, type HomeIconName } from "@/components/home/HomeIcon";
import "@/app/categories/categories.css";

const icons: Record<string, HomeIconName> = {
  petrochemicals: "factory",
  polymers: "layers",
  "industrial-chemicals": "flask",
  solvents: "drop",
  "specialty-chemicals": "spark",
  "custom-sourcing": "network",
};

export function ChemicalCarousel({ label = "Chemical families" }: { label?: string }) {
  return <div className="category-grid" role="region" aria-label={label}>
    {chemicalFamilies.map(family => <Link className="category-grid-card" href={`/products/${family.slug}`} key={family.slug}>
      <div className="category-grid-art"><Image src={family.image} alt="" fill sizes="(max-width: 767px) 92vw, 30vw" /></div>
      <div className="category-grid-wash" />
      <div className="category-grid-content"><span className="category-grid-icon"><HomeIcon name={icons[family.slug] ?? "spark"} /></span><p className="category-card-eyebrow">CHEMICAL FAMILY</p><h3>{family.name}</h3><p className="category-grid-description">{family.description}</p><span className="category-grid-link">Explore family <span aria-hidden="true">↗</span></span></div>
    </Link>)}
  </div>;
}
