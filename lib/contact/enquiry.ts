export const enquiryFields = ["name", "company", "email", "phone", "product", "quantity", "country", "message"] as const;
export type EnquiryField = (typeof enquiryFields)[number];
export type Enquiry = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: Enquiry = {
  name: "", company: "", email: "", phone: "", product: "", quantity: "", country: "", message: "",
};

export function validateEnquiry(input: unknown): { values: Enquiry; errors: EnquiryErrors } {
  const source = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const values = { ...emptyEnquiry };
  const errors: EnquiryErrors = {};
  for (const field of enquiryFields) {
    if (typeof source[field] !== "string") {
      errors[field] = "Enter a valid value.";
      continue;
    }
    values[field] = source[field].trim();
  }
  if (!values.name || values.name.length < 2) errors.name = "Enter your name (at least 2 characters).";
  else if (values.name.length > 100) errors.name = "Use 100 characters or fewer.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.email.length > 254) errors.email = "Enter a valid email address.";
  if (!values.product || values.product.length < 2) errors.product = "Enter the product or chemical required.";
  else if (values.product.length > 200) errors.product = "Use 200 characters or fewer.";
  if (!values.message || values.message.length < 10) errors.message = "Enter a message of at least 10 characters.";
  else if (values.message.length > 3000) errors.message = "Use 3,000 characters or fewer.";
  for (const [field, max] of [["company", 120], ["quantity", 200], ["country", 100]] as const) {
    if (values[field].length > max) errors[field] = `Use ${max} characters or fewer.`;
  }
  if (values.phone && (!/^[+\d\s().-]{7,30}$/.test(values.phone) || values.phone.replace(/\D/g, "").length < 7)) {
    errors.phone = "Enter a valid phone number using 7–30 digits or phone characters.";
  }
  return { values, errors };
}
