"use client";

import { useEffect, useState } from "react";
import { getTimeRemaining, type TimeRemaining } from "@/lib/countdown";

const units = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

const INITIAL_TIME: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export function Countdown() {
  // The initial zero value keeps server and client HTML identical during hydration.
  const [remaining, setRemaining] = useState<TimeRemaining>(INITIAL_TIME);

  useEffect(() => {
    const update = () => setRemaining(getTimeRemaining(Date.now()));
    update();
    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="countdown" role="timer" aria-label="Time until launch" aria-live="off">
      {units.map(({ key, label }, index) => (
        <div className="countdown-part" key={key}>
          <div className="countdown-unit">
            <span className="countdown-value" data-unit={key}>
              {String(remaining[key]).padStart(2, "0")}
            </span>
            <span className="countdown-label">{label}</span>
          </div>
          {index < units.length - 1 && (
            <span className="countdown-divider" aria-hidden="true">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
