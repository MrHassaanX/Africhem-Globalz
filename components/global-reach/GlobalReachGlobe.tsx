"use client";

import { Component, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { networkLocations } from "@/lib/globe/locations";

const GlobeScene = dynamic(() => import("./GlobeScene"), { ssr: false, loading: () => null });

class GlobeBoundary extends Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="globe-fallback" role="img" aria-label="Illustrated Earth" /> : this.props.children; }
}

export function GlobalReachGlobe() {
  const stage = useRef<HTMLDivElement>(null);
  const [painted, setPainted] = useState(false);
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.theme === "dark");
  const theme = useRef(dark ? "dark" : "light");
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const reducedMotion = Boolean(useReducedMotion());

  useEffect(() => {
    const syncTheme = () => {
      const next = document.documentElement.dataset.theme === "dark";
      const name = next ? "dark" : "light";
      if (theme.current !== name) {
        theme.current = name;
        setPainted(false);
        setDark(next);
      }
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onPaint = (event: Event) => {
      if ((event as CustomEvent<{ theme: string }>).detail?.theme === theme.current) setPainted(true);
    };
    window.addEventListener("africhem-globe-ready", onPaint);
    return () => { observer.disconnect(); window.removeEventListener("africhem-globe-ready", onPaint); };
  }, []);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    let visible = false;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: "260px" });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return <section className="reach-globe-journey" id="network-globe" aria-labelledby="reach-title">
    <div className="reach-globe-layout">
      <div className="reach-globe-intro">
        <h1 id="reach-title">GLOBAL<br />{" "}<span>REACH.</span></h1>
        <p className="reach-globe-summary">From our base in India, we connect buyers and business partners across Asia, Africa, the Middle East and Europe.</p>
        <a className="reach-globe-cue" href="#reach-partners">Explore our markets <span aria-hidden="true">↓</span></a>
        <div className="reach-globe-hud">
          <div className="globe-selection" aria-live="polite">{selected === null ? "Drag the globe or select a marker." : <><span>{networkLocations[selected].primary ? "Operating base" : "Partner market"}</span><strong>{networkLocations[selected].name}</strong></>}</div>
        </div>
      </div>
      <div ref={stage} className="reach-globe-stage globe-stage" data-painted={painted}>
        <div className="globe-atmosphere" aria-hidden="true" />
        <div className="globe-preview" aria-hidden="true" />
        <GlobeBoundary><GlobeScene dark={dark} active={active} reducedMotion={reducedMotion} onSelectionChange={setSelected} /></GlobeBoundary>
      </div>
      <p className="reach-globe-caption">Markers show our operating base and partner markets. Arcs illustrate business relationships and do not represent shipping routes or office locations.</p>
    </div>
  </section>;
}
