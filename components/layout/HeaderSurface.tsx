"use client";

import { useEffect, useState } from "react";

export function HeaderSurface({ children }: Readonly<{ children: React.ReactNode }>) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);
  return <header className="full-site-header" data-scrolled={scrolled}>{children}</header>;
}
