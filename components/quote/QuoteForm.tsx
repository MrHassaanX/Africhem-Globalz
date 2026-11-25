"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { chemicalProducts } from "@/lib/chemical-catalogue";
import { blankQuote, getQuoteProfile, quoteBusinessCategories, quoteCategories, quoteProductCategories, quoteUnits, validateQuote, type QuoteErrors, type QuoteFields } from "@/lib/quote";

const autocomplete = {
  name: "name",
  company: "organization",
  country: "country-name",
  email: "email",
  phone: "tel",
} as const;

const blankEnquiry = { quantity: "", unit: "", destination: "", dateNeeded: "", message: "" };
const draftKey = (category: string, product: string) => JSON.stringify([category, product]);

export function QuoteForm({ enabled, initialCategory, initialProduct, initialDestination }: {
  enabled: boolean;
  initialCategory: string;
  initialProduct: string;
  initialDestination: string;
}) {
  const [category, setCategory] = useState(() =>
    quoteCategories.some(item => item.value === initialCategory) ? initialCategory : "",
  );
  const [selectedProducts, setSelectedProducts] = useState<Record<string, string>>(() =>
    chemicalProducts.some(item => item.slug === initialProduct && item.family === category)
      ? { [category]: initialProduct }
      : {},
  );
  const product = selectedProducts[category] ?? "";
  const activeDraft = draftKey(category, product);
  const [drafts, setDrafts] = useState<Record<string, typeof blankEnquiry>>(() => ({
    [activeDraft]: { ...blankEnquiry, destination: initialDestination.slice(0, 200) },
  }));
  const [shared, setShared] = useState(
    () => ({ name: "", company: "", country: "", email: "", phone: "", website: "" }),
  );
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [notice, setNotice] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const id = useId();
  const profile = getQuoteProfile(category);
  const products = chemicalProducts.filter(item => item.family === category);
  const values: QuoteFields = { ...blankQuote, ...shared, ...(drafts[activeDraft] ?? blankEnquiry), category, product };

  function change(key: keyof QuoteFields, value: string) {
    if (key === "category" || key === "product") {
      const choosingFirstCategory = key === "category" && !category && Boolean(value);
      const choosingFirstProduct = key === "product" && !product && Boolean(value);
      if (choosingFirstCategory || choosingFirstProduct) {
        const nextDraft = key === "category"
          ? draftKey(value, selectedProducts[value] ?? "")
          : draftKey(category, value);
        setDrafts(previous => {
          if (previous[nextDraft] || !previous[activeDraft]) return previous;
          const updated = { ...previous, [nextDraft]: previous[activeDraft] };
          delete updated[activeDraft];
          return updated;
        });
      }
      if (key === "category") setCategory(value);
      else setSelectedProducts(previous => ({ ...previous, [category]: value }));
      setErrors({});
      setNotice("");
      return;
    }
    if (Object.hasOwn(blankEnquiry, key)) {
      setDrafts(previous => ({
        ...previous,
        [activeDraft]: { ...(previous[activeDraft] ?? blankEnquiry), [key]: value },
      }));
    } else {
      setShared(previous => ({ ...previous, [key]: value }));
    }
    setErrors(previous => ({ ...previous, [key]: undefined }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "sending") return;

    const checked = validateQuote(values);
    setErrors(checked.errors);
    if (Object.keys(checked.errors).length) {
      setNotice("Please correct the highlighted fields.");
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(checked.errors)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setNotice("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checked.values),
      });
      const result = await response.json() as { accepted?: boolean; error?: string; fields?: QuoteErrors };
      if (response.ok && result.accepted) {
        setStatus("sent");
        setNotice("Your enquiry was accepted. We will review the details and respond using the contact information you provided.");
        return;
      }
      setErrors(result.fields ?? {});
      setNotice(result.error ?? "The enquiry could not be sent. Please retry or use direct contact.");
    } catch {
      setNotice("The enquiry could not be sent. Please retry or use direct contact.");
    }
    setStatus("idle");
  }

  function accessibility(key: keyof QuoteFields, required = true, helpId?: string) {
    const description = [helpId, errors[key] && `${id}-${key}-error`].filter(Boolean).join(" ");
    return {
      id: `${id}-${key}`,
      name: key,
      required,
      "aria-invalid": Boolean(errors[key]),
      "aria-describedby": description || undefined,
    };
  }

  function errorMessage(key: keyof QuoteFields) {
    return errors[key] && <small id={`${id}-${key}-error`} role="alert">{errors[key]}</small>;
  }

  function field(key: keyof QuoteFields, label: string, type = "text", required = true) {
    return (
      <div className="quote-field">
        <label htmlFor={`${id}-${key}`}>{label}{required && " *"}</label>
        <input
          {...accessibility(key, required)}
          type={type}
          value={values[key]}
          onChange={event => change(key, event.target.value)}
          autoComplete={autocomplete[key as keyof typeof autocomplete] ?? "off"}
          inputMode={key === "quantity" ? "decimal" : undefined}
        />
        {errorMessage(key)}
      </div>
    );
  }

  return (
    <div className="quote-form-shell">
      {!enabled && (
        <div className="quote-unavailable" role="status">
          <strong>Online quotation submissions are not enabled in this preview.</strong>
          <p>The sender and destination mailbox need verification. Please use email, phone or WhatsApp below for a live enquiry.</p>
        </div>
      )}
      {status === "sent" ? (
        <div className="quote-success" role="status"><h3>Enquiry accepted.</h3><p>{notice}</p></div>
      ) : (
        <form ref={form} onSubmit={submit} noValidate aria-label="Quotation request form">
          <fieldset className="quote-form-grid" disabled={status === "sending"}>
            <div className="quote-field quote-field-full">
              <label htmlFor={`${id}-category`}>Business or product category *</label>
              <select {...accessibility("category")} value={values.category} onChange={event => change("category", event.target.value)}>
                <option value="">Choose an option</option>
                <optgroup label="Businesses">
                  {quoteBusinessCategories.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                </optgroup>
                <optgroup label="Chemical product categories">
                  {quoteProductCategories.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                </optgroup>
              </select>
              {errorMessage("category")}
            </div>
            {products.length > 0 && (
              <div className="quote-field quote-field-full">
                <label htmlFor={`${id}-product`}>Named product (optional)</label>
                <select {...accessibility("product", false)} value={product} onChange={event => change("product", event.target.value)}>
                  <option value="">Other / not sure</option>
                  {products.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                {errorMessage("product")}
              </div>
            )}
            {field("name", "Name")}
            {field("company", "Company")}
            {field("country", "Country")}
            {field("email", "Email", "email")}
            {field("phone", "Phone / WhatsApp", "tel")}
            {field("dateNeeded", "Date needed", "date", false)}
            {profile.hasQuantity && <>
              {field("quantity", "Quantity")}
              <div className="quote-field">
                <label htmlFor={`${id}-unit`}>Unit *</label>
                <select {...accessibility("unit")} value={values.unit} onChange={event => change("unit", event.target.value)}>
                  <option value="">Choose a unit</option>
                  {quoteUnits.map(unit => <option key={unit} value={unit}>{unit}</option>)}
                </select>
                {errorMessage("unit")}
              </div>
            </>}
            {field("destination", profile.destinationLabel)}
            <div className="quote-field quote-field-full">
              <label htmlFor={`${id}-message`}>{profile.messageLabel} *</label>
              {profile.messageHint && <small className="quote-hint" id={`${id}-message-hint`}>{profile.messageHint}</small>}
              <textarea
                {...accessibility("message", true, profile.messageHint ? `${id}-message-hint` : undefined)}
                rows={4}
                value={values.message}
                onChange={event => change("message", event.target.value)}
              />
              {errorMessage("message")}
            </div>
          </fieldset>
          <label className="quote-honeypot" aria-hidden="true">
            Website<input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={event => change("website", event.target.value)} />
          </label>
          {notice && <p className="quote-notice" role="alert">{notice}</p>}
          <button className="quote-button" type="submit" disabled={!enabled || status === "sending"}>
            {status === "sending" ? "Sending…" : "Request My Quote"}<span aria-hidden="true">→</span>
          </button>
          <p className="quote-privacy">Your details are used only to reply to your enquiry. <Link href="/privacy">Privacy information</Link></p>
        </form>
      )}
    </div>
  );
}
