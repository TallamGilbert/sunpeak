"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

import { submitQuoteRequest } from "@/app/actions";
import {
  ConsentCheckbox,
  ErrorSummary,
  RadioCards,
  SelectField,
  TextareaField,
  TextField,
} from "@/components/forms/Fields";
import { SubmissionError, SubmissionResult } from "@/components/forms/SubmissionResult";
import { useLeadForm } from "@/components/forms/useLeadForm";
import { buttonClasses } from "@/components/ui/Button";
import {
  backupOptions,
  energyConcerns,
  MAX_NOTES,
  propertyTypes,
  solutionOptions,
  validateQuote,
  type QuoteFields,
} from "@/lib/leads";

const labels: Record<keyof QuoteFields, string> = {
  fullName: "Full name",
  phone: "Phone number",
  email: "Email address",
  propertyType: "Property type",
  location: "Location",
  energyConcern: "Primary energy concern",
  solution: "Preferred solution",
  monthlyBill: "Average monthly bill",
  backup: "Backup power",
  notes: "Additional notes",
  consent: "Consent",
};

const empty: QuoteFields = {
  fullName: "",
  phone: "",
  email: "",
  propertyType: "",
  location: "",
  energyConcern: "",
  solution: "",
  monthlyBill: "",
  backup: "",
  notes: "",
  consent: false,
};

/** Reads ?solution= so solution pages can pre-select their option. */
export function QuoteFormFromParams() {
  const param = useSearchParams().get("solution") ?? "";
  const valid = solutionOptions.some((o) => o.value === param);
  return <QuoteForm key={valid ? param : "none"} initialSolution={valid ? param : ""} />;
}

export function QuoteForm({ initialSolution = "" }: { initialSolution?: string }) {
  const { values, errors, status, set, onSubmit, reset, summaryRef, resultRef } = useLeadForm({
    initial: { ...empty, solution: initialSolution },
    validate: validateQuote,
    submit: submitQuoteRequest,
  });

  if (status.kind === "demo" || status.kind === "sent") {
    return <SubmissionResult status={status} resultRef={resultRef} onReset={reset} what="quote request" />;
  }

  const submitting = status.kind === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting} className="space-y-10">
      <ErrorSummary errors={errors} labels={labels} summaryRef={summaryRef} />

      <fieldset className="space-y-6">
        <legend className="font-display text-xl font-bold text-forest">Your details</legend>
        <TextField
          name="fullName"
          label="Full name"
          autoComplete="name"
          required
          value={values.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          error={errors.fullName}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField
            name="phone"
            label="Phone number"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            hint="e.g. 0712 345 678"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            error={errors.phone}
          />
          <TextField
            name="email"
            label="Email address"
            type="email"
            autoComplete="email"
            optional
            hint="If you’d like a written follow-up"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            error={errors.email}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-display text-xl font-bold text-forest">Your property</legend>
        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField
            name="propertyType"
            label="Property type"
            required
            options={propertyTypes}
            value={values.propertyType}
            onChange={(e) => set("propertyType", e.target.value)}
            error={errors.propertyType}
          />
          <TextField
            name="location"
            label="Property location or town"
            autoComplete="address-level2"
            required
            hint="e.g. Kitengela, Eldoret"
            value={values.location}
            onChange={(e) => set("location", e.target.value)}
            error={errors.location}
          />
        </div>
      </fieldset>

      <fieldset className="space-y-6">
        <legend className="font-display text-xl font-bold text-forest">Your energy needs</legend>
        <p className="-mt-3 text-sm text-muted-text">
          No technical knowledge needed. Choose the closest options and we’ll ask follow-up questions.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField
            name="energyConcern"
            label="Primary energy concern"
            required
            options={energyConcerns}
            value={values.energyConcern}
            onChange={(e) => set("energyConcern", e.target.value)}
            error={errors.energyConcern}
          />
          <SelectField
            name="solution"
            label="Preferred solution"
            required
            options={solutionOptions}
            value={values.solution}
            onChange={(e) => set("solution", e.target.value)}
            error={errors.solution}
          />
        </div>
        <TextField
          name="monthlyBill"
          label="Average monthly electricity bill (KES)"
          optional
          inputMode="numeric"
          hint="An approximate figure is fine."
          placeholder="e.g. 8,000"
          value={values.monthlyBill}
          onChange={(e) => set("monthlyBill", e.target.value)}
          error={errors.monthlyBill}
          className="sm:max-w-[calc(50%-0.75rem)]"
        />
        <RadioCards
          name="backup"
          legend="Backup power requirements"
          hint="What would you like to keep running during a power cut?"
          options={backupOptions}
          value={values.backup}
          onChange={(v) => set("backup", v)}
          error={errors.backup}
        />
        <TextareaField
          name="notes"
          label="Additional notes"
          optional
          maxLength={MAX_NOTES}
          hint={`Anything else that would help, such as roof type, outage frequency or key appliances. ${values.notes.length}/${MAX_NOTES} characters.`}
          value={values.notes}
          onChange={(e) => set("notes", e.target.value)}
          error={errors.notes}
        />
      </fieldset>

      <div className="space-y-6 border-t border-line pt-8">
        <ConsentCheckbox
          name="consent"
          checked={values.consent}
          onChange={(v) => set("consent", v)}
          error={errors.consent}
        >
          I agree to Sunpeak using these details to respond to my request, as described in the{" "}
          <Link href="/privacy-policy" className="font-semibold text-forest underline underline-offset-2">
            privacy notice
          </Link>
          .
        </ConsentCheckbox>

        {status.kind === "error" && <SubmissionError message={status.message} />}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button type="submit" disabled={submitting} className={buttonClasses("primary", "lg", "sm:min-w-56")}>
            {submitting ? (
              <>
                <LoaderCircle aria-hidden className="size-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Request a Quote"
            )}
          </button>
          <p className="text-sm text-muted-text">
            Submitting this form is not a final quote or a confirmed installation booking.
          </p>
        </div>
      </div>
    </form>
  );
}
