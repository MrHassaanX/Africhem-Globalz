import { clientContent } from "@/lib/content/company";
export const company = { name: clientContent.brand.name, email: clientContent.contact.email, phone: clientContent.contact.phone, description: "International chemical sourcing, trading and export enquiries across six sourcing categories." } as const;
export const navigation = [
  { href: "/", label: "Home" }, { href: "/about", label: "About" },
  { href: "/products", label: "Products" }, { href: "/other-businesses", label: "Other Businesses" },
  { href: "/how-it-works", label: "How It Works" }, { href: "/global-reach", label: "Global Reach" },
  { href: "/contact", label: "Contact" },
] as const;
export const siteUrl = process.env.SITE_URL || "https://www.africhem-globalz.com";
export const indexable = process.env.SITE_INDEXABLE === "true";
