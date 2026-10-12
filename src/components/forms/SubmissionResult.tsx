import Link from "next/link";
import { CircleAlert, CircleCheck, Info } from "lucide-react";
import type { RefObject } from "react";

import { buttonClasses } from "@/components/ui/Button";
import type { FormStatus } from "@/components/forms/useLeadForm";

/** Honest outcome panel: distinguishes demo mode from a request that was actually sent. */
export function SubmissionResult({
  status,
  resultRef,
  onReset,
  what,
}: {
  status: Extract<FormStatus, { kind: "demo" | "sent" }>;
  resultRef: RefObject<HTMLDivElement | null>;
  onReset: () => void;
  what: "quote request" | "message";
}) {
  const sent = status.kind === "sent";
  return (
    <div
      ref={resultRef}
      tabIndex={-1}
      role="status"
      className="rounded-md border border-line bg-surface p-6 focus:outline-none sm:p-10"
    >
      <span className={`grid size-12 place-items-center rounded-sm ${sent ? "bg-lime text-forest" : "bg-sage text-forest"}`}>
        {sent ? <CircleCheck aria-hidden className="size-6" /> : <Info aria-hidden className="size-6" />}
      </span>

      {sent ? (
        <>
          <h2 className="mt-6 text-2xl font-bold">Thank you. Your {what} has been received.</h2>
          <p className="mt-3 leading-relaxed text-muted-text">
            Your reference is <strong className="font-semibold text-ink">{status.reference}</strong>. Someone will be in
            touch using the details you provided.
          </p>
          {what === "quote request" && (
            <p className="mt-3 leading-relaxed text-muted-text">
              Please note that this is a request for a consultation. It is not a final quote or a confirmed installation
              booking. A quotation follows a review of your energy needs and, usually, a site assessment.
            </p>
          )}
        </>
      ) : (
        <>
          <p className="spec-label mt-6">Demo mode</p>
          <h2 className="mt-2 text-2xl font-bold">Your {what} passed validation but was not sent.</h2>
          <p className="mt-3 leading-relaxed text-muted-text">
            No lead-capture backend is configured for this website.
            Your details have <strong className="font-semibold text-ink">not been sent, stored or shared</strong>, and
            nobody will contact you.
          </p>
          <p className="mt-3 leading-relaxed text-muted-text">
            In a live deployment, this form would forward the request to a CRM or email inbox, and the visitor would be
            told it is a request for a consultation, not a final quote or confirmed booking.
          </p>
        </>
      )}

      <div className="mt-8 flex flex-col gap-3 xs:flex-row">
        <button type="button" onClick={onReset} className={buttonClasses("secondary", "md")}>
          {sent ? "Send another" : "Start again"}
        </button>
        <Link href="/solutions" className={buttonClasses("outline", "md")}>
          Explore solutions
        </Link>
      </div>
    </div>
  );
}

export function SubmissionError({ message }: { message: string }) {
  return (
    <div role="alert" className="flex gap-3 rounded-md border border-danger/40 bg-danger-soft p-4 text-sm text-danger">
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      <p>
        <strong className="font-semibold">Your request was not submitted.</strong> {message}
      </p>
    </div>
  );
}
