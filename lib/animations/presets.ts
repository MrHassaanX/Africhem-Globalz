import type { Variants } from "motion/react";

export const motionTiming = {
  fast: 0.18,
  base: 0.32,
  page: 0.42,
  easeOut: [0.22, 1, 0.36, 1] as const,
} as const;

export function fadeUp(reduceMotion = false): Variants {
  return {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : motionTiming.base,
        ease: motionTiming.easeOut,
      },
    },
  };
}

export function stagger(reduceMotion = false): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };
}
