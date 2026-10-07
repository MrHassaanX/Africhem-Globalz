import "@/styles/perspective-catalogue.css";
import "@/styles/catalogue-page.css";
import { CatalogueLanding } from "@/components/catalogue/CatalogueLanding";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata({ title: "Products | Africhem Globalz", description: "Discuss your chemical sourcing requirements with Africhem Globalz.", path: "/products" });
export default function Page() { return <CatalogueLanding />; }
