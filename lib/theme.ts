export const THEME_STORAGE_KEY = "africhem-theme";
export type SiteTheme = "light" | "dark";

// Resolve before hydration; CSS also follows the system when JavaScript is absent.
export const themeBootstrap = `
(() => {
  let saved;
  try { saved = localStorage.getItem("${THEME_STORAGE_KEY}"); } catch {}
  const theme = saved === "light" || saved === "dark"
    ? saved
    : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
})();
`;
