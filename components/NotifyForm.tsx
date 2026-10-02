"use client";

import { useState, type FormEvent } from "react";

type FormMessage = { type: "error" | "info"; text: string } | null;

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<FormMessage>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = event.currentTarget.elements.namedItem("email");
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !(input instanceof HTMLInputElement) ||
      !input.checkValidity() ||
      !validEmail.test(input.value.trim())
    ) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    // Day 1 has no mailing-list service. Never imply that an address was stored.
    setMessage({
      type: "info",
      text: "Notifications will be available soon.",
    });
  }

  return (
    <div className="notify-block">
      <form className="notify-form" onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor="notify-email">Email address</label>
        <input
          id="notify-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Email address"
          required
          value={email}
          aria-invalid={message?.type === "error"}
          aria-describedby={message ? "notify-message" : "notify-note"}
          onChange={(event) => {
            setEmail(event.target.value);
            if (message) setMessage(null);
          }}
        />
        <button type="submit">Notify Me</button>
      </form>
      <p
        className={`notify-message ${message?.type === "error" ? "is-error" : ""}`}
        id={message ? "notify-message" : "notify-note"}
        aria-live="polite"
      >
        {message?.text ?? "Notifications will be available soon."}
      </p>
    </div>
  );
}
