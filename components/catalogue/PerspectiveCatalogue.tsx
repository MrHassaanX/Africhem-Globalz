"use client";

import { useRef, useState, type PointerEvent } from "react";
import { useInView, useReducedMotion } from "motion/react";

const catalogueFrames = [
  { title: "Product overview", note: "A place for the future product range." },
  { title: "Material categories", note: "Organised information as it becomes available." },
  { title: "Specifications", note: "Details to support a more focused enquiry." },
  { title: "Documentation", note: "Relevant technical information in one place." },
  { title: "Your enquiry", note: "Start with the material or application you need." },
];

export function PerspectiveCatalogue({ teaser = false }: { teaser?: boolean }) {
  const cards = teaser ? catalogueFrames.slice(0, 3) : catalogueFrames;
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);
  const catalogueRef = useRef<HTMLDivElement>(null);
  const entered = useInView(catalogueRef, { once: true, amount: .18 });
  const reduced = useReducedMotion();
  const move = (direction: number) => setActive((current) => (current + direction + cards.length) % cards.length);
  const offsetFor = (index: number) => {
    const half = Math.floor(cards.length / 2);
    return ((index - active + cards.length + half) % cards.length) - half;
  };
  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    startX.current = event.clientX;
    dragged.current = false;
  }
  function pointerUp(event: PointerEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    const distance = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(distance) > 45) {
      dragged.current = true;
      move(distance < 0 ? 1 : -1);
    }
  }

  return <div ref={catalogueRef} className={`perspective-catalogue${teaser ? " perspective-catalogue-teaser" : ""}`}
    data-entered={entered || reduced ? "true" : "false"}
    role="region" aria-roledescription="carousel" aria-label="Product preview" tabIndex={0}
    onKeyDown={(event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    }}>
    <div className="perspective-stage" onPointerDown={pointerDown} onPointerUp={pointerUp} onPointerCancel={() => { startX.current = null; }}>
      {cards.map((card, index) => {
        const offset = offsetFor(index);
        return <button type="button" className={`perspective-card perspective-card-${index + 1}`}
          data-offset={offset} aria-label={`Show ${card.title}`} aria-current={offset === 0 ? "true" : undefined}
          key={card.title} onClick={() => { if (!dragged.current) setActive(index); dragged.current = false; }}>
          <span className="perspective-card-art" aria-hidden="true"><i /><i /><i /></span>
          <span className="perspective-card-content">
            <span className="perspective-card-top">AFRICHEM GLOBALZ <span>{String(index + 1).padStart(2, "0")}</span></span>
            <strong>{card.title}</strong>
            <span className="perspective-card-note">{card.note}</span>
            <span className="perspective-card-foot">IN PREPARATION <span aria-hidden="true">↗</span></span>
          </span>
        </button>;
      })}
    </div>
    <div className="perspective-controls">
      <span className="perspective-count" aria-live="polite">{String(active + 1).padStart(2, "0")} <span>/</span> {String(cards.length).padStart(2, "0")} <span className="perspective-current">{cards[active].title}</span></span>
      <div className="perspective-buttons">
        <button type="button" onClick={() => move(-1)} aria-label="Previous product preview card">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Next product preview card">→</button>
      </div>
    </div>
  </div>;
}
