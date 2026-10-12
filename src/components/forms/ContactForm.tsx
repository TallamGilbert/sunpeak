"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import { submitContactMessage } from "@/app/actions";
import { ConsentCheckbox, ErrorSummary, SelectField, TextareaField, TextField } from "@/components/forms/Fields";
import { SubmissionError, SubmissionResult } from "@/components/forms/SubmissionResult";
import { useLeadForm } from "@/components/forms/useLeadForm";
import { buttonClasses } from "@/components/ui/Button";
import { enquiryTypes, MAX_NOTES, validateContact, type ContactFields } from "@/lib/leads";

const labels: Record<keyof ContactFields, string> = {
  fullName: "Name",
  phone: "Phone number",
  email: "Email address",
  enquiryType: "Enquiry type",
  message: "Message",
  consent: "Consent",
};

const empty: ContactFields = {
  fullName: "",
  phone: "",
  email: "",
  enquiryType: "",
  message: "",
  consent: false,
};

export function ContactForm() {
  const { values, errors, status, set, onSubmit, reset, summaryRef, resultRef } = useLeadForm({
    initial: empty,
    validate: validateContact,
    submit: submitContactMessage,
  });

  if (status.kind === "demo" || status.kind === "sent") {
    return <SubmissionResult status={status} resultRef={resultRef} onReset={reset} what="message" />;
  }

  const submitting = status.kind === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting} className="space-y-6">
      <ErrorSummary errors={errors} labels={labels} summaryRef={summaryRef} />

      <TextField
        name="fullName"
        label="Name"
        autoComplete="name"
        required
        value={values.fullName}
        onChange={(e) => set("fullName", e.target.value)}
        error={errors.fullName}
      />
      <p className="-mb-2 text-sm text-muted-text">Provide a phone number, an email address, or both.</p>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          name="phone"
          label="Phone number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
        />
        <TextField
          name="email"
          label="Email address"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
        />
      </div>
      <SelectField
        name="enquiryType"
        label="What is your enquiry about?"
        required
        options={enquiryTypes}
        value={values.enquiryType}
        onChange={(e) => set("enquiryType", e.target.value)}
        error={errors.enquiryType}
      />
      <TextareaField
        name="message"
        label="Message"
        required
        maxLength={MAX_NOTES}
        hint={`${values.message.length}/${MAX_NOTES} characters`}
        value={values.message}
        onChange={(e) => set("message", e.target.value)}
        error={errors.message}
      />
      <ConsentCheckbox name="consent" checked={values.consent} onChange={(v) => set("consent", v)} error={errors.consent}>
        I agree to Sunpeak using these details to respond to my enquiry, as described in the{" "}
        <Link href="/privacy-policy" className="font-semibold text-forest underline underline-offset-2">
          privacy notice
        </Link>
        .
      </ConsentCheckbox>

      {status.kind === "error" && <SubmissionError message={status.message} />}

      <button type="submit" disabled={submitting} className={buttonClasses("secondary", "lg", "w-full sm:w-auto sm:min-w-48")}>
        {submitting ? (
          <>
            <LoaderCircle aria-hidden className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
