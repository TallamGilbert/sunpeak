/**
 * Solar savings calculator logic.
 *
 * Produces an illustrative estimate from user-supplied assumptions. It is not
 * a quotation or an electrical assessment. Kept free of UI and path-alias
 * imports so it can be unit tested with Node's built-in test runner.
 */

/** Starting assumption for the offset slider. Users are expected to change it. */
export const DEFAULT_OFFSET_PERCENT = 40;

export const LIMITS = {
  monthlyBill: { min: 1, max: 10_000_000 },
  offsetPercent: { min: 0, max: 100 },
  systemCost: { min: 0, max: 1_000_000_000 },
  annualMaintenance: { min: 0, max: 100_000_000 },
} as const;

export type SavingsInput = {
  monthlyBill: number;
  offsetPercent: number;
  /** Optional. Required for a payback period. */
  systemCost?: number;
  /** Optional. Treated as 0 when omitted. */
  annualMaintenance?: number;
};

export type PaybackResult =
  | { status: "ok"; years: number; netAnnualBenefit: number }
  | { status: "needs-cost" }
  | { status: "not-positive"; netAnnualBenefit: number };

export type SavingsResult = {
  monthlyReduction: number;
  annualReduction: number;
  remainingMonthlyBill: number;
  payback: PaybackResult;
};

export function calculateSavings(input: SavingsInput): SavingsResult {
  const { monthlyBill, offsetPercent } = input;
  const maintenance = input.annualMaintenance ?? 0;

  const monthlyReduction = monthlyBill * (offsetPercent / 100);
  const annualReduction = monthlyReduction * 12;
  const remainingMonthlyBill = monthlyBill - monthlyReduction;

  let payback: PaybackResult;
  if (input.systemCost === undefined || input.systemCost <= 0) {
    payback = { status: "needs-cost" };
  } else {
    const netAnnualBenefit = annualReduction - maintenance;
    payback =
      netAnnualBenefit > 0
        ? { status: "ok", years: input.systemCost / netAnnualBenefit, netAnnualBenefit }
        : { status: "not-positive", netAnnualBenefit };
  }

  return { monthlyReduction, annualReduction, remainingMonthlyBill, payback };
}

export type FieldName = keyof SavingsInput;
export type RawSavingsInput = Record<FieldName, string>;
export type SavingsErrors = Partial<Record<FieldName, string>>;

/** Accepts plain numbers with optional thousands separators, e.g. "12,500". */
export function parseAmount(raw: string): number | null {
  const cleaned = raw.trim().replace(/[,\s]/g, "").replace(/^(KES|KSH)/i, "");
  if (cleaned === "") return null;
  if (!/^-?\d*\.?\d+$/.test(cleaned)) return Number.NaN;
  return Number(cleaned);
}

const fmtLimit = (n: number) => n.toLocaleString("en-KE");

function checkRange(
  value: number,
  { min, max }: { min: number; max: number },
  label: string,
): string | undefined {
  if (Number.isNaN(value)) return `Enter ${label} as a number.`;
  if (value < 0) return `${capitalise(label)} cannot be negative.`;
  if (value < min) return `${capitalise(label)} must be at least ${fmtLimit(min)}.`;
  if (value > max) return `${capitalise(label)} must be no more than ${fmtLimit(max)}.`;
  return undefined;
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Validates raw form strings. Returns parsed input when valid, otherwise a
 * map of field errors. Optional fields may be left blank.
 */
export function validateSavingsInput(
  raw: RawSavingsInput,
): { ok: true; input: SavingsInput } | { ok: false; errors: SavingsErrors } {
  const errors: SavingsErrors = {};

  const bill = parseAmount(raw.monthlyBill);
  if (bill === null) errors.monthlyBill = "Enter your average monthly electricity bill.";
  else {
    const e = checkRange(bill, LIMITS.monthlyBill, "your monthly bill");
    if (e) errors.monthlyBill = e;
  }

  const offset = parseAmount(raw.offsetPercent);
  if (offset === null) errors.offsetPercent = "Enter an offset percentage between 0 and 100.";
  else if (Number.isNaN(offset) || offset < 0 || offset > 100)
    errors.offsetPercent = "The offset must be a percentage between 0 and 100.";

  const cost = parseAmount(raw.systemCost);
  if (cost !== null) {
    const e = checkRange(cost, LIMITS.systemCost, "the system cost");
    if (e) errors.systemCost = e;
  }

  const maintenance = parseAmount(raw.annualMaintenance);
  if (maintenance !== null) {
    const e = checkRange(maintenance, LIMITS.annualMaintenance, "the maintenance cost");
    if (e) errors.annualMaintenance = e;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    input: {
      monthlyBill: bill as number,
      offsetPercent: offset as number,
      systemCost: cost ?? undefined,
      annualMaintenance: maintenance ?? undefined,
    },
  };
}

const kesFormatter = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0,
});

/** Formats an amount in Kenyan shillings, e.g. "Ksh 12,500". */
export function formatKES(amount: number): string {
  return kesFormatter.format(Math.round(amount));
}

/** Formats a payback period, e.g. "6.4 years" or "8 months". */
export function formatYears(years: number): string {
  if (!Number.isFinite(years)) return "—";
  if (years < 1) {
    const months = Math.max(1, Math.round(years * 12));
    return `${months} month${months === 1 ? "" : "s"}`;
  }
  const rounded = Math.round(years * 10) / 10;
  return `${rounded.toLocaleString("en-KE")} year${rounded === 1 ? "" : "s"}`;
}
