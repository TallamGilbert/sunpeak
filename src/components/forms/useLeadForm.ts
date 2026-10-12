"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";

import type { SubmitResult } from "@/app/actions";
import type { FieldErrors } from "@/lib/leads";

export type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "demo" }
  | { kind: "sent"; reference: string }
  | { kind: "error"; message: string };

/**
 * State and submit handling shared by the quote and contact forms:
 * client-side validation, server-side re-validation and honest result states.
 */
export function useLeadForm<T extends Record<string, string | boolean>>({
  initial,
  validate,
  submit,
}: {
  initial: T;
  validate: (values: T) => FieldErrors<T>;
  submit: (values: T) => Promise<SubmitResult<T>>;
}) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef(status);
  useLayoutEffect(() => {
    statusRef.current = status;
  }, [status]);

  // Pages stay mounted (hidden) after navigation. Clear a finished submission
  // when the user leaves so they come back to a fresh form, not a stale message.
  useLayoutEffect(() => {
    return () => {
      const kind = statusRef.current.kind;
      if (kind === "demo" || kind === "sent") {
        setValues(initial);
        setErrors({});
        setAttempted(false);
        setStatus({ kind: "idle" });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set<K extends keyof T>(key: K, value: T[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    // After a failed submit, re-check as the user corrects fields.
    if (attempted) setErrors(validate(next));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setAttempted(true);

    const clientErrors = validate(values);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setStatus({ kind: "submitting" });
    try {
      const result = await submit(values);
      if (result.status === "invalid") {
        setErrors(result.errors);
        setStatus({ kind: "idle" });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      if (result.status === "error") setStatus({ kind: "error", message: result.message });
      else if (result.status === "sent") setStatus({ kind: "sent", reference: result.reference });
      else setStatus({ kind: "demo" });
    } catch {
      setStatus({
        kind: "error",
        message: "Something went wrong while submitting. Please check your connection and try again.",
      });
    }
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  function reset() {
    setValues(initial);
    setErrors({});
    setAttempted(false);
    setStatus({ kind: "idle" });
  }

  return { values, errors, status, set, onSubmit, reset, summaryRef, resultRef };
}
