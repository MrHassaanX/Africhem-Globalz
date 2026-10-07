"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTiming } from "@/lib/animations/presets";

export function MaskedHeading({ lines, level = 2 }: { lines: { text: string; accent?: boolean }[]; level?: 1 | 2 }) {
  const reduced = useReducedMotion();
  const content = lines.map((line, index) => <span className="scene-heading-mask" key={`${index}-${line.text}`}>
    <motion.span className={line.accent ? "scene-heading-accent" : undefined}
      variants={{ hidden: reduced ? { opacity: 0 } : { y: "105%", opacity: .6 }, visible: { y: 0, opacity: 1 } }}
      transition={{ duration: reduced ? .15 : .85, delay: reduced ? 0 : index * .13, ease: motionTiming.easeOut }}>
      {line.text}
    </motion.span>
  </span>);
  return level === 1
    ? <motion.h1 initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }}>{content}</motion.h1>
    : <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }}>{content}</motion.h2>;
}
