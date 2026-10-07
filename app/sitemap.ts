import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/about", "/products", "/industries", "/global-reach", "/contact", "/privacy", "/terms"].map((path) => ({ url: new URL(path, SITE_URL).toString() }));
}
