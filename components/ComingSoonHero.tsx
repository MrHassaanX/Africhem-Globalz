import { Countdown } from "@/components/Countdown";
import { NotifyForm } from "@/components/NotifyForm";

export function ComingSoonHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="material-orb" aria-hidden="true" />

      <h1 id="hero-title">COMING SOON</h1>
      <p className="hero-lead">Our new website is under construction.</p>
      <p className="hero-secondary">
        We&apos;re preparing a better experience for our customers and partners.
      </p>

      <Countdown />
      <NotifyForm />
    </section>
  );
}
