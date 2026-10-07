import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
export default function robots(): MetadataRoute.Robots {
  // Allow crawling previews so their noindex metadata can be observed.
  // They are excluded from sitemap and public navigation.
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
