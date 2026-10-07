import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { GlassCursor } from "@/components/motion/GlassCursor";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ConsentPreferences } from "@/components/privacy/ConsentPreferences";
import "@/styles/site-foundations.css";

export function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
    <MotionProvider>
      <div className="full-site">
        <a className="site-skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <SmoothScrollProvider>
          <main id="main-content" className="full-site-main">{children}</main>
          <SiteFooter />
        </SmoothScrollProvider>
        <ConsentPreferences />
        <GlassCursor />
      </div>
    </MotionProvider>
    </ThemeProvider>
  );
}
