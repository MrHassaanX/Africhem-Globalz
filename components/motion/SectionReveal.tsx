"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTiming } from "@/lib/animations/presets";

export function SectionReveal({ children, delay = 0, depth = false }: Readonly<{ children: React.ReactNode; delay?: number; depth?: boolean }>) {
  const reduced = useReducedMotion();
  return (
    <motion.div className="section-reveal" initial={{ opacity: 0, y: reduced ? 0 : depth ? 65 : 24, scale: reduced ? 1 : depth ? .92 : 1 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduced ? .15 : depth ? 1.05 : .7, delay: reduced ? 0 : delay, ease: motionTiming.easeOut }}>
      {children}
    </motion.div>
  );
}
