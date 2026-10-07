import { validateEnquiry } from "@/lib/contact/enquiry";

export const runtime = "nodejs";

const windowMs = 15 * 60 * 1000;
const limit = 5;
const attempts = new Map<string, { count: number; until: number }>();
const failure = "We couldn’t send your enquiry right now. Please try again or contact sales@africhem-globalz.com.";

function respond(body: object, status: number) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function rateLimited(key: string) {
  const now = Date.now();
  for (const [id, entry] of attempts) if (entry.until <= now) attempts.delete(id);
  const current = attempts.get(key);
  if (!current) { attempts.set(key, { count: 1, until: now + windowMs }); return false; }
  current.count += 1;
  return current.count > limit;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    try {
      if (!host || new URL(origin).host !== host) return respond({ error: "Invalid origin." }, 403);
    } catch { return respond({ error: "Invalid origin." }, 403); }
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) return respond({ error: "Invalid request." }, 415);
  if (Number(request.headers.get("content-length")) > 16_384) return respond({ error: "Request is too large." }, 413);

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 16_384) return respond({ error: "Request is too large." }, 413);
    payload = JSON.parse(raw);
  } catch { return respond({ error: "Invalid request." }, 400); }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return respond({ error: "Invalid request." }, 400);
  const source = payload as Record<string, unknown>;
  if (typeof source.website !== "string" || source.website.length > 0) return respond({ error: "Invalid request." }, 400);
  const { values, errors } = validateEnquiry(source);
  if (Object.keys(errors).length) return respond({ error: "Please correct the highlighted fields.", errors }, 400);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return respond({ error: "Too many enquiries. Please try again later." }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const to = process.env.ENQUIRY_TO_EMAIL || "sales@africhem-globalz.com";
  if (!apiKey || !from) {
    console.error("Enquiry delivery is not configured: RESEND_API_KEY and ENQUIRY_FROM_EMAIL are required.");
    return respond({ error: failure }, 503);
  }

  const safeProduct = values.product.replace(/[\r\n\t]+/g, " ").slice(0, 120);
  const body = [
    ["Name", values.name], ["Company", values.company], ["Email", values.email], ["Phone", values.phone],
    ["Country", values.country], ["Product / Chemical Required", values.product],
    ["Quantity / Requirement", values.quantity], ["Message", values.message],
    ["Submission time (UTC)", new Date().toISOString()],
  ].map(([label, value]) => `${label}: ${value || "Not provided"}`).join("\n\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject: `New Website Enquiry — ${safeProduct}`, text: body, reply_to: values.email }),
      cache: "no-store",
    });
    if (!response.ok) {
      console.error("Resend rejected an enquiry:", response.status, await response.text());
      return respond({ error: failure }, 502);
    }
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || typeof (result as { id?: unknown }).id !== "string") {
      console.error("Resend returned no email ID for an enquiry.");
      return respond({ error: failure }, 502);
    }
    return respond({ success: true }, 200);
  } catch (error) {
    console.error("Enquiry delivery failed:", error);
    return respond({ error: failure }, 502);
  }
}
