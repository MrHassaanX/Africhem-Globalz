"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView, useReducedMotion } from "motion/react";

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false, loading: () => <div className="globe-fallback" /> });

export function GlobalReachGlobe() {
  const stage = useRef<HTMLDivElement>(null);
  const active = useInView(stage, { amount: .1 });
  const reducedMotion = useReducedMotion();

  return <div ref={stage} className="reach-globe-stage globe-stage">
    <div className="globe-atmosphere" aria-hidden="true" />
    <GlobeScene active={active} reducedMotion={Boolean(reducedMotion)} />
  </div>;
}
