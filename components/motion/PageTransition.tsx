"use client";

import { motion } from "motion/react";
import { motionTiming } from "@/lib/animations/presets";

export function PageTransition({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0.94, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionTiming.page, ease: motionTiming.easeOut }}
    >
      {children}
    </motion.div>
  );
}
