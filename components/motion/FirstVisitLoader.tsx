"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import officialLogo from "@/assets/brand/africhem-transparent.png";

const SESSION_KEY = "africhem-loader-seen-v2";

export function FirstVisitLoader() {
  const [active, setActive] = useState<boolean | null>(null);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/" || !pathname) return;
    if (document.documentElement.dataset.africhemLoader !== "show") {
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return;
        sessionStorage.setItem(SESSION_KEY, "1");
        document.documentElement.dataset.africhemLoaderStartedAt = String(Date.now());
        document.documentElement.dataset.africhemLoader = "show";
      } catch { return; }
    }
    if (reduceMotion) {
      delete document.documentElement.dataset.africhemLoader;
      delete document.documentElement.dataset.africhemLoaderStartedAt;
      return;
    }

    const startedAt = Number(document.documentElement.dataset.africhemLoaderStartedAt) || Date.now();
    const remainingUntilExit = Math.max(0, 2850 - (Date.now() - startedAt));
    const frame = window.requestAnimationFrame(() => setActive(true));
    const timer = window.setTimeout(() => setActive(false), remainingUntilExit);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname, reduceMotion]);

  return (
    <motion.div
      className="first-visit-loader"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: active === false ? 0 : 1 }}
      transition={{ duration: 0.65 }}
      onAnimationComplete={() => {
        if (active === false) {
          delete document.documentElement.dataset.africhemLoader;
          delete document.documentElement.dataset.africhemLoaderStartedAt;
        }
      }}
    >
      <motion.div
        className="first-visit-loader-content"
        initial={false}
        animate={active === false ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="first-visit-loader-logo">
          <Image src={officialLogo} alt="" priority sizes="(max-width: 600px) 270px, 420px" />
        </span>
        <motion.p
          className="first-visit-loader-tagline"
          initial={{ opacity: 0, y: 5 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          SOURCING SIMPLIFIED
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
