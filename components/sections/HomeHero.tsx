"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useAnimationControls, useInView, useReducedMotion, type Variants } from "motion/react";
import { motionTiming } from "@/lib/animations/presets";

const reveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: motionTiming.easeOut } }),
};
const lineReveal: Variants = {
  hidden: { y: "110%" },
  visible: (delay: number) => ({ y: 0, transition: { duration: 0.95, delay, ease: motionTiming.easeOut } }),
};
const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false, loading: () => <div className="globe-fallback" /> });

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
  </svg>;
}

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const controls = useAnimationControls();
  const reduced = useReducedMotion();
  const inView = useInView(heroRef);

  useEffect(() => {
    const observer = new MutationObserver(start);
    function start() {
      if (document.documentElement.dataset.africhemLoader === "show") return;
      if (reduced) controls.set("visible");
      else void controls.start("visible");
      observer.disconnect();
    }
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-africhem-loader"] });
    start();
    return () => {
      observer.disconnect();
    };
  }, [controls, reduced]);

  return (
    <motion.section
      ref={heroRef}
      className="home-hero"
      aria-labelledby="home-hero-title"
      initial="hidden"
      animate={controls}
    >
      <motion.div className="hero-ambient" aria-hidden="true" />
      <div className="full-site-container hero-grid">
        <motion.div className="hero-copy">
          <motion.p className="hero-eyebrow" data-reveal variants={reveal} custom={0}>
            <span aria-hidden="true" /> AFRICHEM GLOBALZ
          </motion.p>
          <h1 id="home-hero-title" className="home-hero-title">
            {["Sourcing", "Simplified."].map((line, index) => (
              <span className={`headline-mask${index === 1 ? " headline-accent" : ""}`} key={line}>
                <motion.span data-reveal variants={lineReveal} custom={0.12 + index * 0.13}>{line}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="home-hero-description" data-reveal variants={reveal} custom={0.55}>
            Africhem Globalz connects businesses with reliable chemical sourcing,
            trading and distribution across global markets.
          </motion.p>
          <motion.div className="hero-actions" data-reveal variants={reveal} custom={0.72}>
            <a className="hero-button hero-button-primary" href="/products">Explore Products <Arrow /></a>
            <a className="hero-button hero-button-secondary" href="/contact">Contact Us <Arrow diagonal /></a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-art-entrance"
          variants={{ hidden: { opacity: 0, scale: 0.94 }, visible: { opacity: 1, scale: 1, transition: { duration: 1.5, delay: 0.1, ease: motionTiming.easeOut } } }}
        >
          <div className="hero-art-scroll">
            <div className="hero-art-pointer">
              <div className="globe-atmosphere" />
              <div className="globe-stage">
                <GlobeScene active={inView} reducedMotion={Boolean(reduced)} />
              </div>
              <div className="globe-reflection" />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div className="full-site-container hero-bottom" data-reveal variants={reveal} custom={0.95}>
        <a className="hero-scroll-cue" href="#sourcing-preview"><span aria-hidden="true" /> Scroll to explore</a>
      </motion.div>
    </motion.section>
  );
}
