"use client";

import { useEffect, useRef } from "react";

export function GlassCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".full-site");
    const cursor = cursorRef.current;
    if (!shell || !cursor) return;
    const media = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let visible = false;

    const animate = () => {
      x += (targetX - x) * 0.38;
      y += (targetY - y) * 0.38;
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(targetX - x) > 0.15 || Math.abs(targetY - y) > 0.15) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const hide = () => {
      visible = false;
      cursor.dataset.visible = "false";
      delete shell.dataset.customCursor;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse" || !shell.contains(event.target as Node)) {
        hide();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX;
        y = targetY;
        visible = true;
        cursor.dataset.visible = "true";
        shell.dataset.customCursor = "true";
      }
      const target = event.target instanceof Element ? event.target : null;
      const form = target?.closest("input,textarea,select,[contenteditable='true']");
      const globe = target?.closest(".globe-input");
      const interactive = target?.closest("a,button,[role='button']");
      cursor.dataset.mode = form ? "form" : globe?.getAttribute("data-dragging") === "true" ? "dragging" : globe ? "globe" : interactive ? "interactive" : "default";
      if (!frame) frame = requestAnimationFrame(animate);
    };
    const release = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(".globe-input")) cursor.dataset.mode = "globe";
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", hide);
    media.addEventListener("change", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", hide);
      media.removeEventListener("change", hide);
      hide();
    };
  }, []);

  return <div ref={cursorRef} className="glass-cursor" data-visible="false" data-mode="default" aria-hidden="true"><span>DRAG</span></div>;
}
