type HomeIconName = "shield" | "document" | "globe" | "person" | "flask" | "layers" | "factory" | "drop" | "spark" | "network";

const paths: Record<HomeIconName, React.ReactNode> = {
  shield: <><path d="M12 3 19 6v5c0 4.4-2.8 8.1-7 10-4.2-1.9-7-5.6-7-10V6l7-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
  document: <><path d="M7 3.5h7l3 3V20.5H7z" /><path d="M14 3.5v3h3M9.5 11h5M9.5 14h5M9.5 17h3" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.8 12h16.4M12 3.5c2.2 2.4 3.3 5.2 3.3 8.5S14.2 18.1 12 20.5C9.8 18.1 8.7 15.3 8.7 12S9.8 5.9 12 3.5Z" /></>,
  person: <><circle cx="12" cy="8" r="3" /><path d="M5.5 20c.6-3.5 2.8-5.3 6.5-5.3s5.9 1.8 6.5 5.3" /></>,
  flask: <><path d="M9 3.5h6M10 3.5v5l-4.5 8.2A2 2 0 0 0 7.2 20h9.6a2 2 0 0 0 1.7-3.3L14 8.5v-5" /><path d="M8.2 15h7.6" /></>,
  layers: <><path d="m12 4 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4M4 16l8 4 8-4" /></>,
  factory: <><path d="M4 20V9l6 3V9l6 3V6l4 2v12H4Z" /><path d="M7 16h2M12 16h2M17 16h2" /></>,
  drop: <><path d="M12 3.5s5.5 6.1 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 9.6 12 3.5 12 3.5Z" /><path d="M9.2 14.2a3 3 0 0 0 2.3 2.2" /></>,
  spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3ZM19 16l.7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
  network: <><circle cx="5" cy="12" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><path d="m6.8 11 10.4-4M6.8 13l10.4 4" /></>,
};

export function HomeIcon({ name, label }: { name: HomeIconName; label?: string }) {
  return <svg className="home-icon" viewBox="0 0 24 24" aria-hidden={label ? undefined : true} role={label ? "img" : undefined} aria-label={label} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export type { HomeIconName };
