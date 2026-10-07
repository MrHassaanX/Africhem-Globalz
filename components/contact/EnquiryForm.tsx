"use client";

import { useState, type FormEvent } from "react";
import { emptyEnquiry, validateEnquiry, type Enquiry, type EnquiryErrors, type EnquiryField } from "@/lib/contact/enquiry";

const fields: { key: EnquiryField; label: string; required?: boolean; type?: string; wide?: boolean }[] = [
  { key: "name", label: "Name", required: true },
  { key: "company", label: "Company Name" },
  { key: "email", label: "Email", required: true, type: "email" },
  { key: "phone", label: "Phone", type: "tel" },
  { key: "product", label: "Product / Chemical Required", required: true, wide: true },
  { key: "quantity", label: "Quantity / Requirement" },
  { key: "country", label: "Country" },
  { key: "message", label: "Message", required: true, wide: true },
];

const genericFailure = "We couldn’t send your enquiry right now. Please try again or contact sales@africhem-globalz.com.";

export function EnquiryForm() {
  const [values, setValues] = useState<Enquiry>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [notice, setNotice] = useState("");

  function update(field: EnquiryField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (state !== "submitting") { setState("idle"); setNotice(""); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "submitting") return;
    const checked = validateEnquiry(values);
    setErrors(checked.errors);
    if (Object.keys(checked.errors).length) {
      setState("error");
      setNotice("Please correct the highlighted fields.");
      const first = Object.keys(checked.errors)[0];
      document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }
    setState("submitting");
    setNotice("");
    try {
      const form = event.currentTarget;
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...checked.values, website: (form.elements.namedItem("website") as HTMLInputElement).value }),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        if (result.errors && typeof result.errors === "object") setErrors(result.errors);
        throw new Error("Enquiry delivery failed");
      }
      setState("success");
      setNotice("Thank you. Your enquiry has been sent to Africhem Globalz.");
      setValues(emptyEnquiry);
    } catch {
      setState("error");
      setNotice(genericFailure);
    }
  }

  return <form className="enquiry-form" onSubmit={submit} noValidate>
    <div className="enquiry-form-heading"><span>YOUR ENQUIRY</span><p>Fields marked * are required.</p></div>
    <div className="enquiry-form-grid">
      {fields.map(({ key, label, required, type, wide }) => <div className={`enquiry-field${wide ? " enquiry-field-wide" : ""}`} key={key}>
        <label htmlFor={`enquiry-${key}`}>{label}{required && <span aria-hidden="true"> *</span>}</label>
        {key === "message" ? <textarea id={`enquiry-${key}`} name={key} rows={5} value={values[key]} onChange={(event) => update(key, event.target.value)} required={required} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `enquiry-${key}-error` : undefined} maxLength={3000} />
          : <input id={`enquiry-${key}`} name={key} type={type || "text"} value={values[key]} onChange={(event) => update(key, event.target.value)} required={required} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `enquiry-${key}-error` : undefined} maxLength={key === "email" ? 254 : key === "product" || key === "quantity" ? 200 : key === "company" ? 120 : key === "phone" ? 30 : 100} />}
        {errors[key] && <span className="enquiry-field-error" id={`enquiry-${key}-error`}>{errors[key]}</span>}
      </div>)}
    </div>
    <div className="enquiry-honeypot" aria-hidden="true"><label htmlFor="enquiry-website">Website</label><input id="enquiry-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <div className="enquiry-submit-row"><button type="submit" disabled={state === "submitting"}>{state === "submitting" ? "Sending..." : "Send Enquiry"}<span aria-hidden="true">↗</span></button><p role={state === "error" ? "alert" : "status"} aria-live="polite" className={`enquiry-status enquiry-status-${state}`}>{notice}</p></div>
  </form>;
}
