import type { Metadata } from "next";

export const SITE_URL = "https://africhem-globalz.com";
const SITE_NAME = "Africhem Globalz";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}`;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const canonical = new URL(path, SITE_URL).toString();

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Africhem Globalz — Sourcing Simplified" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
