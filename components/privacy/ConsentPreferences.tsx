"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const CONSENT_KEY = "africhem-consent-v1";
const OPEN_EVENT = "africhem-open-consent";
type Choice = "accepted" | "necessary";

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "necessary" ? value : null;
  } catch { return null; }
}

export function CookiePreferencesButton() {
  return <button className="footer-preferences" type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>Cookie Preferences</button>;
}

export function ConsentPreferences() {
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => { const saved = readChoice(); setChoice(saved); setVisible(!saved); }, 2500);
    let frame = 0;
    function open() {
      returnFocus.current = document.activeElement as HTMLElement;
      setChoice(readChoice()); setVisible(true);
      frame = requestAnimationFrame(() => panel.current?.focus());
    }
    function sync(event: StorageEvent) {
      if (event.key === CONSENT_KEY || event.key === null) { const saved = readChoice(); setChoice(saved); setVisible(!saved); }
    }
    window.addEventListener(OPEN_EVENT, open);
    window.addEventListener("storage", sync);
    return () => { clearTimeout(timer); cancelAnimationFrame(frame); window.removeEventListener(OPEN_EVENT, open); window.removeEventListener("storage", sync); };
  }, []);

  function choose(value: Choice) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch { /* Current-page choice still works when storage is unavailable. */ }
    setChoice(value); setVisible(false); returnFocus.current?.focus();
    // No analytics or optional storage exists. Future integrations must check
    // explicit consent before loading, and implement withdrawal before shipping.
  }
  if (!visible) return null;
  return <div ref={panel} className="consent-panel" role="region" aria-labelledby="consent-title" tabIndex={-1}>
    <div><h2 id="consent-title">Your privacy, your choice.</h2><p>This site stores theme and privacy preferences on your device and a session flag for the intro. No analytics, advertising cookies or optional tracking are currently enabled. Necessary functionality stays on.</p><Link href="/privacy">Privacy Policy</Link>{choice && <p className="consent-current">Current choice: {choice === "accepted" ? "accepted" : "necessary only"}.</p>}</div>
    <div className="consent-actions"><button type="button" onClick={() => choose("accepted")}>Accept</button><button type="button" onClick={() => choose("necessary")}>Reject non-essential</button></div>
  </div>;
}
