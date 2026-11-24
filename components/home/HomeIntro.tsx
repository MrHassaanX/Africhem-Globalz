import Image from "next/image";
import { siteImage } from "@/lib/site-images";
import Link from "next/link";
import { QuoteLink } from "@/components/QuoteLink";

export function HomeIntro() {
  return (
    <section className="home-hero" aria-labelledby="home-title">
      <div className="home-container home-hero-inner">
        <div className="home-hero-copy">
          <p className="home-hero-eyebrow">Africhem Globalz <span> / International sourcing</span></p>
          <h1 id="home-title"><span className="home-hero-line">You need <em>chemicals.</em></span> <span className="home-hero-line">We handle everything else.</span></h1>
          <p className="home-hero-support">We help buyers navigate specifications, supplier verification, documentation and delivery through one point of contact, from enquiry to shipment.</p>
          <div className="home-hero-actions">
            <QuoteLink label="Request Pricing" />
            <Link className="home-text-link" href="/how-it-works">See how it works <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="home-material-stage" aria-hidden="true">
          <Image src={siteImage("home-hero", "/stock/industrial-tanks-sunset.webp")} alt="" fill preload sizes="(max-width: 767px) 100vw, (max-width: 1440px) 50vw, 700px" className="home-material-image" />
        </div>
      </div>
    </section>
  );
}
