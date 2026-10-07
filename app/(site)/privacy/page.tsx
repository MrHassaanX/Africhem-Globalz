import { PolicyPage } from "@/components/content/PolicyPage";
import { privacySections } from "@/lib/content/policies";
import { createPageMetadata } from "@/lib/seo/metadata";
export const metadata = createPageMetadata({ title: "Privacy Policy | Africhem Globalz", description: "How this website handles email enquiries, local preferences and technical information.", path: "/privacy" });
export default function Privacy() { return <PolicyPage title="Privacy Policy" introduction="A clear account of the information used by this website and the choices available to you." sections={privacySections} />; }
