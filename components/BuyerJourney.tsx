import { HomeIcon } from "@/components/home/HomeIcon";
import { QuoteLink } from "@/components/QuoteLink";
import { buyerSteps } from "@/lib/verified-content";

const stepIcons = {
  "01": "document",
  "02": "person",
  "03": "shield",
  "04": "globe",
} as const;

export function BuyerJourney() {
  return (
    <section className="buyer-journey" aria-label="Buyer process">
      <ol role="list">
        {buyerSteps.map(step => (
          <li className="buyer-journey-step" key={step.number}>
            <div className="buyer-journey-marker">
              <HomeIcon name={stepIcons[step.number]} />
              <span>Step {step.number}</span>
            </div>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
      <div className="buyer-journey-end"><QuoteLink /></div>
    </section>
  );
}
