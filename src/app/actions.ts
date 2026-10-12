"use server";

import {
  validateContact,
  validateQuote,
  type ContactFields,
  type FieldErrors,
  type QuoteFields,
} from "@/lib/leads";

export type SubmitResult<T> =
  /** Request was forwarded to the configured lead endpoint. */
  | { status: "sent"; reference: string }
  /** No endpoint configured: validated, but deliberately not sent or stored. */
  | { status: "demo" }
  | { status: "invalid"; errors: FieldErrors<T> }
  | { status: "error"; message: string };

/**
 * Lead capture. If LEAD_WEBHOOK_URL is set (e.g. a CRM, Zapier/Make webhook
 * or your own API), the validated payload is POSTed there as JSON. Without
 * it the site runs in demo mode and nothing leaves the server.
 */
async function deliver(kind: "quote" | "contact", data: object) {
  const endpoint = process.env.LEAD_WEBHOOK_URL;
  if (!endpoint) return { status: "demo" } as const;

  const reference = `SP-${Date.now().toString(36).toUpperCase()}`;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, reference, submittedAt: new Date().toISOString(), data }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`);
    return { status: "sent", reference } as const;
  } catch (err) {
    console.error("Lead delivery failed", err);
    return {
      status: "error",
      message: "We couldn't submit your request just now. Please try again in a moment.",
    } as const;
  }
}

/** Server actions receive untrusted input: rebuild it with the expected shape. */
function coerce<T extends Record<string, string | boolean>>(input: unknown, template: T): T {
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const out = {} as Record<string, string | boolean>;
  for (const [key, fallback] of Object.entries(template)) {
    const v = src[key];
    out[key] =
      typeof fallback === "boolean" ? v === true : typeof v === "string" ? v.slice(0, 2000) : "";
  }
  return out as T;
}

const quoteTemplate: QuoteFields = {
  fullName: "", phone: "", email: "", propertyType: "", location: "", energyConcern: "",
  solution: "", monthlyBill: "", backup: "", notes: "", consent: false,
};

const contactTemplate: ContactFields = {
  fullName: "", phone: "", email: "", enquiryType: "", message: "", consent: false,
};

export async function submitQuoteRequest(input: QuoteFields): Promise<SubmitResult<QuoteFields>> {
  const fields = coerce(input, quoteTemplate);
  const errors = validateQuote(fields);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };
  return deliver("quote", fields);
}

export async function submitContactMessage(
  input: ContactFields,
): Promise<SubmitResult<ContactFields>> {
  const fields = coerce(input, contactTemplate);
  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) return { status: "invalid", errors };
  return deliver("contact", fields);
}
