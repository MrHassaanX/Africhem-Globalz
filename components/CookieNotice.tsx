"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const timer = setTimeout(() => { try { setVisible(localStorage.getItem("africhem-storage-notice") !== "seen"); } catch { setVisible(true); } }, 0); return () => clearTimeout(timer); }, []);
  if (!visible) return null;
  return <aside className="cookie-notice" aria-label="Browser storage notice"><p>We use browser storage to remember your theme and whether you have seen the introductory animation. We do not use advertising or analytics cookies on this site. <Link href="/privacy">Privacy information</Link></p><button type="button" onClick={() => { try { localStorage.setItem("africhem-storage-notice", "seen"); } catch {} setVisible(false); }}>Got it</button></aside>;
}
