"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { RotateCcw } from "lucide-react";

import { FieldError, Hint, Label } from "@/components/forms/Fields";
import { buttonClasses } from "@/components/ui/Button";
import {
  calculateSavings,
  DEFAULT_OFFSET_PERCENT,
  formatKES,
  formatYears,
  validateSavingsInput,
  type FieldName,
  type RawSavingsInput,
} from "@/lib/savings";

const initial: RawSavingsInput = {
  monthlyBill: "",
  offsetPercent: String(DEFAULT_OFFSET_PERCENT),
  systemCost: "",
  annualMaintenance: "",
};

const inputClass =
  "block w-full min-h-12 rounded-sm border bg-surface text-base text-ink tabular-nums placeholder:text-muted transition-colors duration-150 focus:border-forest focus:outline-2 focus:outline-offset-0 focus:outline-forest/25";

export function SavingsCalculator() {
  const [raw, setRaw] = useState<RawSavingsInput>(initial);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});

  const validation = validateSavingsInput(raw);
  const errors = validation.ok ? {} : validation.errors;
  const result = validation.ok ? calculateSavings(validation.input) : null;
  const billEntered = raw.monthlyBill.trim() !== "";

  // Show an error once a field has been left, or as soon as it holds an invalid value.
  const visibleError = (f: FieldName) => (touched[f] || raw[f].trim() !== "" ? errors[f] : undefined);

  const update = (f: FieldName, v: string) => setRaw((r) => ({ ...r, [f]: v }));
  const blur = (f: FieldName) => setTouched((t) => ({ ...t, [f]: true }));

  const offsetNumber = Number(raw.offsetPercent);
  const sliderValue = Number.isFinite(offsetNumber) ? Math.min(100, Math.max(0, offsetNumber)) : DEFAULT_OFFSET_PERCENT;

  return (
    <div className="grid overflow-hidden rounded-md border border-line bg-surface shadow-card lg:grid-cols-12">
      {/* Inputs */}
      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        aria-labelledby="calc-inputs-heading"
        className="space-y-7 p-5 sm:p-8 lg:col-span-6 lg:p-10"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="calc-inputs-heading" className="text-xl font-bold">
            Your assumptions
          </h2>
          <button
            type="button"
            onClick={() => {
              setRaw(initial);
              setTouched({});
            }}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-sm px-2 text-sm font-medium text-muted-text hover:text-forest"
          >
            <RotateCcw aria-hidden className="size-4" />
            Reset
          </button>
        </div>

        <MoneyField
          name="monthlyBill"
          label="Average monthly electricity bill"
          hint="Check a few recent bills or token purchases and use a typical month."
          value={raw.monthlyBill}
          onChange={(v) => update("monthlyBill", v)}
          onBlur={() => blur("monthlyBill")}
          error={visibleError("monthlyBill")}
          placeholder="e.g. 12,000"
          required
        />

        <OffsetField
          value={raw.offsetPercent}
          sliderValue={sliderValue}
          onChange={(v) => update("offsetPercent", v)}
          onBlur={() => blur("offsetPercent")}
          error={visibleError("offsetPercent")}
        />

        <div className="border-t border-line pt-7">
          <p className="spec-label">For a payback estimate</p>
          <div className="mt-5 space-y-7">
            <MoneyField
              name="systemCost"
              label="Estimated system cost"
              optional
              hint="From a quotation, if you have one. Leave blank to skip the payback estimate."
              value={raw.systemCost}
              onChange={(v) => update("systemCost", v)}
              onBlur={() => blur("systemCost")}
              error={visibleError("systemCost")}
              placeholder="e.g. 600,000"
            />
            <MoneyField
              name="annualMaintenance"
              label="Estimated annual maintenance cost"
              optional
              hint="Cleaning, inspections and servicing. Leave blank to assume zero."
              value={raw.annualMaintenance}
              onChange={(v) => update("annualMaintenance", v)}
              onBlur={() => blur("annualMaintenance")}
              error={visibleError("annualMaintenance")}
              placeholder="e.g. 10,000"
            />
          </div>
        </div>
      </form>

      {/* Results */}
      <section
        aria-labelledby="calc-results-heading"
        className="on-dark flex flex-col bg-forest p-5 text-on-forest-muted sm:p-8 lg:col-span-6 lg:p-10"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="calc-results-heading" className="text-xl font-bold text-white!">
            Illustrative estimate
          </h2>
          <span className="text-xs">Based on your assumptions</span>
        </div>

        {result && validation.ok ? (
          <Results result={result} input={validation.input} />
        ) : (
          <div className="mt-8 flex flex-1 flex-col justify-center rounded-md border border-dashed border-white/20 p-8 text-center">
            <p className="font-display text-lg font-semibold text-white">
              {billEntered ? "Check the highlighted fields" : "Enter your monthly bill to see an estimate"}
            </p>
            <p className="mt-2 text-sm">Results update as you type. Nothing you enter leaves your browser.</p>
          </div>
        )}

        <p className="mt-8 border-t border-white/15 pt-6 text-xs leading-relaxed">
          This is an illustrative estimate, not a quotation or an electrical assessment. Actual results depend on
          tariffs, consumption patterns, system size, site conditions, battery use and installation costs.
        </p>
        <Link href="/request-a-quote" className={buttonClasses("primary", "lg", "mt-6 w-full")}>
          Request a Professional Quote
        </Link>
      </section>
    </div>
  );
}

function Results({
  result,
  input,
}: {
  result: ReturnType<typeof calculateSavings>;
  input: Parameters<typeof calculateSavings>[0];
}) {
  const reductionShare = input.offsetPercent;
  const { payback } = result;
  const maintenance = input.annualMaintenance ?? 0;

  return (
    <div className="mt-6 flex-1">
      <p className="sr-only" aria-live="polite">
        Estimated monthly bill reduction {formatKES(result.monthlyReduction)}, annual reduction{" "}
        {formatKES(result.annualReduction)}.
      </p>

      <div>
        <p className="spec-label text-on-forest-muted!">Estimated monthly bill reduction</p>
        <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-lime tabular-nums sm:text-5xl">
          {formatKES(result.monthlyReduction)}
        </p>
      </div>

      {/* Bill split */}
      <div className="mt-6" aria-hidden>
        <div className="flex h-2.5 overflow-hidden rounded-xs bg-white/15">
          <div className="bg-lime transition-[width] duration-300" style={{ width: `${reductionShare}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs">
          <span>Estimated reduction {reductionShare}%</span>
          <span>Remaining {Math.round((100 - reductionShare) * 10) / 10}%</span>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-md bg-white/10 xs:grid-cols-2">
        <Stat label="Estimated annual reduction" value={formatKES(result.annualReduction)} />
        <Stat label="Estimated remaining monthly bill" value={formatKES(result.remainingMonthlyBill)} />
        <div className="bg-forest-800 p-4 xs:col-span-2">
          <dt className="spec-label text-on-forest-muted!">Estimated simple payback</dt>
          <dd className="mt-1.5">
            {payback.status === "ok" && (
              <span className="font-display text-2xl font-bold text-white tabular-nums">{formatYears(payback.years)}</span>
            )}
            {payback.status === "needs-cost" && (
              <span className="text-sm text-white">Add an estimated system cost to calculate a payback period.</span>
            )}
            {payback.status === "not-positive" && (
              <span className="block text-sm leading-relaxed text-white">
                A positive payback period can’t be calculated with these assumptions. The estimated annual reduction (
                {formatKES(result.annualReduction)}) does not exceed the annual maintenance cost (
                {formatKES(maintenance)}).
              </span>
            )}
          </dd>
        </div>
      </dl>

      <details className="group mt-6 rounded-md border border-white/15">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 px-4 text-sm font-semibold text-white">
          Show the working
          <span aria-hidden className="text-lime transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <dl className="space-y-3 border-t border-white/15 px-4 py-4 font-mono text-[0.75rem] leading-relaxed">
          <Working
            label="Monthly reduction"
            formula={`${formatKES(input.monthlyBill)} × ${input.offsetPercent}% = ${formatKES(result.monthlyReduction)}`}
          />
          <Working label="Annual reduction" formula={`${formatKES(result.monthlyReduction)} × 12 = ${formatKES(result.annualReduction)}`} />
          <Working
            label="Remaining monthly bill"
            formula={`${formatKES(input.monthlyBill)} − ${formatKES(result.monthlyReduction)} = ${formatKES(result.remainingMonthlyBill)}`}
          />
          {input.systemCost !== undefined && input.systemCost > 0 && (
            <Working
              label="Simple payback"
              formula={`${formatKES(input.systemCost)} ÷ (${formatKES(result.annualReduction)} − ${formatKES(maintenance)})${
                payback.status === "ok" ? ` = ${formatYears(payback.years)}` : " → not positive"
              }`}
            />
          )}
        </dl>
      </details>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-forest-800 p-4">
      <dt className="spec-label text-on-forest-muted!">{label}</dt>
      <dd className="mt-1.5 font-display text-xl font-bold text-white tabular-nums">{value}</dd>
    </div>
  );
}

function Working({ label, formula }: { label: string; formula: string }) {
  return (
    <div>
      <dt className="font-sans text-xs font-semibold text-white">{label}</dt>
      <dd className="mt-0.5 break-words">{formula}</dd>
    </div>
  );
}

function MoneyField({
  name,
  label,
  hint,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  optional,
  required,
}: {
  name: string;
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  placeholder?: string;
  optional?: boolean;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      <Hint id={`${name}-hint`}>{hint}</Hint>
      <div className="relative mt-2">
        <span aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-semibold text-muted-text">
          KES
        </span>
        <input
          id={name}
          name={name}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${name}-hint${error ? ` ${name}-error` : ""}`}
          className={`${inputClass} pr-3.5 pl-14 ${error ? "border-danger" : "border-line hover:border-forest/40"}`}
        />
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

function OffsetField({
  value,
  sliderValue,
  onChange,
  onBlur,
  error,
}: {
  value: string;
  sliderValue: number;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
}) {
  const sliderId = useId();
  return (
    <div>
      <Label htmlFor="offsetPercent">Share of your bill solar could offset</Label>
      <Hint id="offsetPercent-hint">
        Your assumption. The starting value of {DEFAULT_OFFSET_PERCENT}% is a placeholder to adjust, not a typical
        result. It depends on system size, battery use and when you use power.
      </Hint>
      <div className="mt-3 flex items-center gap-4">
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={sliderValue}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Offset percentage slider"
          aria-valuetext={`${sliderValue} percent`}
          className="h-11 flex-1 cursor-pointer accent-forest"
        />
        <div className="relative w-28 shrink-0">
          <input
            id="offsetPercent"
            name="offsetPercent"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            aria-invalid={error ? true : undefined}
            aria-describedby={`offsetPercent-hint${error ? " offsetPercent-error" : ""}`}
            className={`${inputClass} pr-8 pl-3.5 text-right ${error ? "border-danger" : "border-line hover:border-forest/40"}`}
          />
          <span aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-sm font-semibold text-muted-text">
            %
          </span>
        </div>
      </div>
      <FieldError id="offsetPercent-error" message={error} />
    </div>
  );
}
