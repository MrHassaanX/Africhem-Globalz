import Image from "next/image";
import Link from "next/link";
import { chemicalFamilies } from "@/lib/chemical-catalogue";

export function ChemicalCarousel({ label = "Chemical families" }: { label?: string }) {
  return (
    <ul className="category-grid" aria-label={label}>
      {chemicalFamilies.map(family => (
        <li key={family.slug}>
          <Link className="category-grid-card" href={`/products/${family.slug}`}>
            <div className="category-grid-art">
              <Image src={family.image} alt="" fill sizes="(max-width: 599px) 92vw, (max-width: 999px) 45vw, (max-width: 1440px) 30vw, 420px" />
            </div>
            <div className="category-grid-content">
              <h3>{family.name}</h3>
              <p className="category-grid-description">{family.description}</p>
              <span className="category-grid-link" aria-hidden="true">Explore category <span>→</span></span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
