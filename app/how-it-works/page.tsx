import type { Metadata } from "next";
import { BuyerJourney } from "@/components/BuyerJourney";
import "./personal-how.css";
export const metadata: Metadata = { title: "How It Works", description: "From product enquiry to sourcing discussion and delivery planning in four clear steps.", alternates: { canonical: "/how-it-works" } };
export default function HowItWorksPage() { return <article className="revision-page how-personal"><header className="revision-hero wrap"><p className="revision-kicker">INTERNATIONAL SOURCING MADE SIMPLE</p><h1>From enquiry to delivery in four steps.</h1><p>Tell us what you need. We review the request, discuss pricing and details, then coordinate next steps once requirements are confirmed.</p></header><BuyerJourney /></article>; }
