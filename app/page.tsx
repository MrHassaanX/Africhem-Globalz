import { BackgroundEffects } from "@/components/BackgroundEffects";
import { ComingSoonHero } from "@/components/ComingSoonHero";
import { ContactInfo } from "@/components/ContactInfo";

export default function Home() {
  return (
    <main className="page-shell">
      <BackgroundEffects />

      <div className="page-content">
        <header className="site-header">
          <span className="wordmark">AFRICHEM GLOBALZ</span>
        </header>

        <ComingSoonHero />

        <footer className="site-footer">
          <ContactInfo />
        </footer>
      </div>
    </main>
  );
}
