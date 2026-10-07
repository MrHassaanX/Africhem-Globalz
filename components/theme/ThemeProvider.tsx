"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type SiteTheme } from "@/lib/theme";

const CHANGE_EVENT = "africhem-theme-change";

function savedTheme(): SiteTheme | null {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: SiteTheme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(notify: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const sync = () => applyTheme(savedTheme() ?? (media.matches ? "dark" : "light"));
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) sync();
  };
  window.addEventListener(CHANGE_EVENT, notify);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", sync);
  sync();
  return () => {
    window.removeEventListener(CHANGE_EVENT, notify);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", sync);
  };
}

function getSnapshot(): SiteTheme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

const ThemeContext = createContext<{
  theme: SiteTheme | null;
  setTheme: (theme: SiteTheme) => void;
} | null>(null);

export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => null);
  function setTheme(next: SiteTheme) {
    try { localStorage.setItem(THEME_STORAGE_KEY, next); } catch { /* Keep the control usable. */ }
    applyTheme(next);
  }
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme requires ThemeProvider");
  return context;
}
