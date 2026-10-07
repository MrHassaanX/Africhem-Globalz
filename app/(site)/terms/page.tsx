import { PolicyPage } from "@/components/content/PolicyPage";
import { termsSections } from "@/lib/content/policies";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata({ title: "Website Terms | Africhem Globalz", description: "Terms for using the Africhem Globalz website, its information and enquiry facilities.", path: "/terms" });
export default function Terms() { return <PolicyPage title="Terms & Conditions" introduction="Information about using this website and understanding the material published here." sections={termsSections} />; }
