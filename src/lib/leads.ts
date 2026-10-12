/**
 * Lead form definitions and validation, shared by the client forms and the
 * server action so both apply the same rules. Free of path-alias imports so
 * it can be unit tested directly.
 */

export const propertyTypes = [
  "Home / residence",
  "Business premises",
  "Farm or rural property",
  "School, clinic or institution",
  "Other",
] as const;

export const energyConcerns = [
  "Reducing electricity costs",
  "Power outages and backup",
  "Unreliable or no grid connection",
  "Hot water costs",
  "Lower environmental impact",
  "Not sure yet",
] as const;

export const solutionOptions = [
  { value: "residential-solar", label: "Residential Solar" },
  { value: "commercial-solar", label: "Commercial Solar" },
  { value: "hybrid-solar-systems", label: "Hybrid Solar System" },
  { value: "battery-storage", label: "Battery Storage" },
  { value: "solar-water-heating", label: "Solar Water Heating" },
  { value: "solar-backup-systems", label: "Solar Backup System" },
  { value: "not-sure", label: "Not sure – I'd like advice" },
] as const;

export const backupOptions = [
  { value: "none", label: "No backup needed", hint: "Solar to reduce grid use only" },
  { value: "essential", label: "Essential loads only", hint: "e.g. lights, Wi-Fi, fridge, TV" },
  { value: "most", label: "Most of the property", hint: "Including larger appliances" },
  { value: "unsure", label: "Not sure", hint: "We can talk it through" },
] as const;

export const enquiryTypes = [
  "General enquiry",
  "Solar for my home",
  "Solar for my business",
  "Battery or backup power",
  "Solar water heating",
  "Support for an existing system",
] as const;

export type QuoteFields = {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  location: string;
  energyConcern: string;
  solution: string;
  monthlyBill: string;
  backup: string;
  notes: string;
  consent: boolean;
};

export type ContactFields = {
  fullName: string;
  phone: string;
  email: string;
  enquiryType: string;
  message: string;
  consent: boolean;
};

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export const MAX_NOTES = 1000;

/** Normalises a phone number by removing spaces, dashes, dots and brackets. */
export function normalisePhone(raw: string) {
  return raw.trim().replace(/[\s\-().]/g, "");
}

/**
 * Accepts Kenyan mobile and landline formats (07…, 01…, +2547…, 2541…) and
 * other international numbers written with a leading + and 8–15 digits.
 */
export function isValidPhone(raw: string) {
  const p = normalisePhone(raw);
  if (/^(?:\+?254|0)[17]\d{8}$/.test(p)) return true;
  if (/^0[2-6]\d{7,8}$/.test(p)) return true; // Kenyan fixed-line area codes
  return /^\+[1-9]\d{7,14}$/.test(p);
}

export function isValidEmail(raw: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
}

const oneOf = (list: readonly string[], value: string) => list.includes(value);

export function validateQuote(f: QuoteFields): FieldErrors<QuoteFields> {
  const e: FieldErrors<QuoteFields> = {};

  if (f.fullName.trim().length < 2) e.fullName = "Enter your full name.";
  else if (f.fullName.trim().length > 100) e.fullName = "Name must be 100 characters or fewer.";

  if (!f.phone.trim()) e.phone = "Enter a phone number so we can reach you.";
  else if (!isValidPhone(f.phone))
    e.phone = "Enter a valid phone number, for example 0712 345 678 or +254 712 345 678.";

  if (f.email.trim() && !isValidEmail(f.email))
    e.email = "Enter a valid email address, or leave this blank.";

  if (!oneOf(propertyTypes, f.propertyType)) e.propertyType = "Select a property type.";

  if (f.location.trim().length < 2) e.location = "Enter your town or area.";
  else if (f.location.trim().length > 100) e.location = "Location must be 100 characters or fewer.";

  if (!oneOf(energyConcerns, f.energyConcern)) e.energyConcern = "Select your main energy concern.";

  if (!solutionOptions.some((o) => o.value === f.solution))
    e.solution = "Select a solution, or choose “Not sure”.";

  if (f.monthlyBill.trim()) {
    const n = Number(f.monthlyBill.replace(/[,\s]/g, ""));
    if (!Number.isFinite(n) || n < 0)
      e.monthlyBill = "Enter your average bill as a positive number, or leave this blank.";
    else if (n > 10_000_000) e.monthlyBill = "That amount looks too large. Please check it.";
  }

  if (!backupOptions.some((o) => o.value === f.backup))
    e.backup = "Select your backup power requirement.";

  if (f.notes.length > MAX_NOTES) e.notes = `Notes must be ${MAX_NOTES} characters or fewer.`;

  if (!f.consent) e.consent = "Please confirm you agree to be contacted about your request.";

  return e;
}

export function validateContact(f: ContactFields): FieldErrors<ContactFields> {
  const e: FieldErrors<ContactFields> = {};

  if (f.fullName.trim().length < 2) e.fullName = "Enter your name.";
  else if (f.fullName.trim().length > 100) e.fullName = "Name must be 100 characters or fewer.";

  const hasPhone = f.phone.trim() !== "";
  const hasEmail = f.email.trim() !== "";
  if (!hasPhone && !hasEmail) {
    e.phone = "Enter a phone number or an email address.";
    e.email = "Enter an email address or a phone number.";
  } else {
    if (hasPhone && !isValidPhone(f.phone)) e.phone = "Enter a valid phone number.";
    if (hasEmail && !isValidEmail(f.email)) e.email = "Enter a valid email address.";
  }

  if (!oneOf(enquiryTypes, f.enquiryType)) e.enquiryType = "Select an enquiry type.";

  if (f.message.trim().length < 10) e.message = "Tell us a little more (at least 10 characters).";
  else if (f.message.length > MAX_NOTES) e.message = `Message must be ${MAX_NOTES} characters or fewer.`;

  if (!f.consent) e.consent = "Please confirm you agree to be contacted about your enquiry.";

  return e;
}
