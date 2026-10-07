import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
export default function NotFound() {
  return <SiteShell><section className="not-found full-site-container"><p className="foundation-eyebrow">AFRICHEM GLOBALZ</p><span className="not-found-number" aria-hidden="true">404</span><h1>This page couldn’t be found.</h1><p>The address may have changed, or the page may no longer be available.</p><Link className="foundation-button" href="/">Return Home <span aria-hidden="true">↗</span></Link></section></SiteShell>;
}
