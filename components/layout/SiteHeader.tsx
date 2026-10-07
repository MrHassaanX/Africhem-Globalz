import Link from "next/link";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { MobileNav } from "@/components/navigation/MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { HeaderSurface } from "@/components/layout/HeaderSurface";
import Image from "next/image";
import officialLogo from "@/assets/brand/africhem-transparent.png";

export function SiteHeader() {
  return (
    <HeaderSurface>
      <div className="full-site-container full-site-header-inner">
        <Link className="full-site-wordmark" href="/home" aria-label="Africhem Globalz, home">
          <Image src={officialLogo} alt="Africhem Globalz" priority sizes="(max-width: 600px) 160px, 185px" />
        </Link>
        <DesktopNav />
        <div className="header-controls">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </HeaderSurface>
  );
}
