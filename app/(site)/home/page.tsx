import type { Metadata } from "next";
import "@/styles/home-preview.css";
import "@/styles/home-journey.css";
import "@/styles/perspective-catalogue.css";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeJourney } from "@/components/sections/HomeJourney";
import { SiteScrollScenes } from "@/components/motion/SiteScrollScenes";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  ...createPageMetadata({ title: "Home | Africhem Globalz", description: "Preview the Africhem Globalz chemical sourcing, trading and distribution website.", path: "/home" }),
  robots: { index: false, follow: false },
};

export default function Home() {
  return <>
    <SiteScrollScenes page="home" />
    <HomeHero />
    <HomeJourney />
    <noscript><style>{`.home-hero [data-reveal], .home-hero .hero-art-entrance, .section-reveal { opacity: 1 !important; transform: none !important; }`}</style></noscript>
  </>;
}
