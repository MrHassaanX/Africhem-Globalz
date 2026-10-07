"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "@/components/theme/ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const reduced = useReducedMotion();
  const label = theme ? `Switch to ${theme === "dark" ? "light" : "dark"} mode` : "Switch color theme";
  return (
    <motion.button
      className="theme-toggle"
      type="button"
      aria-label={label}
      title={label}
      whileTap={reduced ? undefined : { scale: 0.92 }}
      onClick={() => setTheme((theme ?? document.documentElement.dataset.theme) === "dark" ? "light" : "dark")}
    >
      <svg className="theme-icon theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg className="theme-icon theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M20.3 15.5A8.5 8.5 0 0 1 8.5 3.7a8.5 8.5 0 1 0 11.8 11.8Z" />
      </svg>
    </motion.button>
  );
}
