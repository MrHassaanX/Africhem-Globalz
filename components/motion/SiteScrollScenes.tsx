"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SiteScrollScenes({ page }: { page: "home" | "products" }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let context: gsap.Context | undefined;
    const create = () => {
      context?.revert();
      context = undefined;
      if (reduced.matches) return;
      context = gsap.context(() => {
        if (page === "home") {
          const hero = document.querySelector(".home-hero");
          if (hero) {
            const timeline = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.7 } });
            timeline.to(".hero-copy", { y: -85, opacity: 0, ease: "none" }, 0)
              .to(".hero-art-scroll", { y: 125, scale: 1.12, rotation: 5, opacity: 0, ease: "none" }, 0)
              .to(".hero-ambient", { opacity: 0.18, ease: "none" }, 0);
          }
          gsap.fromTo(".home-intro-visual", { y: 60, opacity: 0.6 }, {
            y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ".home-intro", start: "top 90%", end: "center 55%", scrub: 0.6 },
          });
          gsap.fromTo(".home-catalogue .perspective-stage", { y: 65, scale: 0.94, opacity: 0.75 }, {
            y: 0, scale: 1, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ".home-catalogue", start: "top 88%", end: "center 60%", scrub: 0.6 },
          });
          gsap.fromTo(".home-final-cta", { y: 35, opacity: 0.5 }, {
            y: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ".home-final", start: "top 85%", end: "center 65%", scrub: 0.6 },
          });
        } else {
          gsap.fromTo(".catalogue-page-stage .perspective-stage", { y: 65, scale: 0.94, opacity: 0.75 }, {
            y: 0, scale: 1, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ".catalogue-page-stage", start: "top 88%", end: "center 60%", scrub: 0.6 },
          });
        }
      });
      ScrollTrigger.refresh();
    };
    create();
    reduced.addEventListener("change", create);
    return () => { reduced.removeEventListener("change", create); context?.revert(); };
  }, [page]);
  return null;
}
