import Link from "next/link";
import { navigationItems } from "@/lib/navigation";
import { CookiePreferencesButton } from "@/components/privacy/ConsentPreferences";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="full-site-footer">
      <div className="full-site-container full-site-footer-inner">
        <div className="footer-brand-block">
          <Link className="full-site-footer-brand" href="/home">AFRICHEM GLOBALZ</Link>
          <p>Sourcing Simplified.</p>
        </div>
        <div className="footer-contact">
          <div><span>Email</span><a href="mailto:sales@africhem-globalz.com">sales@africhem-globalz.com</a></div>
          {/* TODO: Replace the phone and head office placeholders when confirmed. */}
          <div><span>Phone</span><p>+91 XXXXX XXXXX</p></div>
          <div><span>Head Office</span><p>Address to be updated</p></div>
        </div>
      </div>
      <div className="full-site-container footer-bottom"><nav aria-label="Footer navigation">{navigationItems.map(({ label, href }) => href && <Link href={href} key={label}>{label}</Link>)}</nav><div className="footer-legal"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link><CookiePreferencesButton /></div></div>
      <div className="full-site-container footer-copyright">© {year} Africhem Globalz Private Limited. All rights reserved.</div>
    </footer>
  );
}
