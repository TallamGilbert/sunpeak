import { CircleAlert } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const controlBase =
  "block w-full rounded-sm border bg-surface px-3.5 text-base text-ink placeholder:text-muted transition-colors duration-150 focus:border-forest focus:outline-2 focus:outline-offset-0 focus:outline-forest/25";

const controlState = (error?: string) =>
  error ? "border-danger focus:border-danger focus:outline-danger/25" : "border-line hover:border-forest/40";

function describedBy(name: string, hint?: ReactNode, error?: string) {
  const ids = [hint ? `${name}-hint` : null, error ? `${name}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}

export function Label({
  htmlFor,
  children,
  optional,
  as: Tag = "label",
}: {
  htmlFor?: string;
  children: ReactNode;
  optional?: boolean;
  as?: "label" | "legend";
}) {
  return (
    <Tag {...(Tag === "label" ? { htmlFor } : {})} className="block text-sm font-semibold text-ink">
      {children}
      {optional && <span className="ml-1.5 font-normal text-muted-text">(optional)</span>}
    </Tag>
  );
}

export function Hint({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1 text-sm text-muted-text">
      {children}
    </p>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-danger">
      <CircleAlert aria-hidden className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

type Common = { name: string; label: ReactNode; hint?: ReactNode; error?: string; optional?: boolean };

export function TextField({
  name,
  label,
  hint,
  error,
  optional,
  className = "",
  ...props
}: Common & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
  return (
    <div className={className}>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      {hint && <Hint id={`${name}-hint`}>{hint}</Hint>}
      <input
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={`${controlBase} ${controlState(error)} mt-2 min-h-12`}
        {...props}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  hint,
  error,
  optional,
  options,
  placeholder = "Select an option",
  className = "",
  ...props
}: Common & {
  options: readonly (string | { value: string; label: string })[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name">) {
  return (
    <div className={className}>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      {hint && <Hint id={`${name}-hint`}>{hint}</Hint>}
      <div className="relative mt-2">
        <select
          id={name}
          name={name}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(name, hint, error)}
          className={`${controlBase} ${controlState(error)} min-h-12 appearance-none pr-10`}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => {
            const opt = typeof o === "string" ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            );
          })}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-forest"
        >
          <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

export function TextareaField({
  name,
  label,
  hint,
  error,
  optional,
  className = "",
  ...props
}: Common & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  return (
    <div className={className}>
      <Label htmlFor={name} optional={optional}>
        {label}
      </Label>
      {hint && <Hint id={`${name}-hint`}>{hint}</Hint>}
      <textarea
        id={name}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hint, error)}
        className={`${controlBase} ${controlState(error)} mt-2 min-h-32 py-3 leading-relaxed`}
        {...props}
      />
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

export function RadioCards({
  name,
  legend,
  hint,
  error,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: ReactNode;
  hint?: ReactNode;
  error?: string;
  options: readonly { value: string; label: string; hint?: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset aria-describedby={describedBy(name, hint, error)} aria-invalid={error ? true : undefined}>
      <Label as="legend">{legend}</Label>
      {hint && <Hint id={`${name}-hint`}>{hint}</Hint>}
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {options.map((o, i) => {
          const id = `${name}-${o.value}`;
          return (
            <label
              key={o.value}
              htmlFor={id}
              className={`flex min-h-12 cursor-pointer items-start gap-3 rounded-sm border bg-surface p-3.5 transition-colors has-[:checked]:border-forest has-[:checked]:bg-sage/60 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-forest ${
                error ? "border-danger" : "border-line hover:border-forest/40"
              }`}
            >
              <input
                id={id}
                // Lets the error summary link focus the group.
                {...(i === 0 ? { "data-first": name } : {})}
                type="radio"
                name={name}
                value={o.value}
                checked={value === o.value}
                onChange={() => onChange(o.value)}
                className="mt-0.5 size-4 shrink-0 accent-forest focus-visible:outline-none"
              />
              <span>
                <span className="block text-sm font-semibold text-ink">{o.label}</span>
                {o.hint && <span className="mt-0.5 block text-xs text-muted-text">{o.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </fieldset>
  );
}

export function ConsentCheckbox({
  name,
  checked,
  onChange,
  error,
  children,
}: {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-forest"
        />
        <label htmlFor={name} className="text-sm leading-relaxed text-ink">
          {children}
        </label>
      </div>
      <FieldError id={`${name}-error`} message={error} />
    </div>
  );
}

/** Lists all errors after a failed submit, with links that move focus to each field. */
export function ErrorSummary({
  errors,
  labels,
  summaryRef,
}: {
  errors: Record<string, string | undefined>;
  labels: Record<string, string>;
  summaryRef: React.RefObject<HTMLDivElement | null>;
}) {
  const entries = Object.entries(errors).filter(([, v]) => v);
  if (entries.length === 0) return null;
  return (
    <div
      ref={summaryRef}
      tabIndex={-1}
      role="alert"
      aria-labelledby="error-summary-title"
      className="rounded-md border border-danger/40 bg-danger-soft p-5 focus:outline-2 focus:outline-danger"
    >
      <h2 id="error-summary-title" className="text-base font-bold text-danger!">
        Please check {entries.length === 1 ? "1 field" : `${entries.length} fields`}
      </h2>
      <ul className="mt-2 space-y-1 text-sm">
        {entries.map(([name, message]) => (
          <li key={name}>
            <a
              href={`#${name}`}
              onClick={(e) => {
                e.preventDefault();
                const el =
                  document.getElementById(name) ?? document.querySelector<HTMLElement>(`[data-first="${name}"]`);
                el?.focus();
                el?.scrollIntoView({ block: "center" });
              }}
              className="text-danger underline underline-offset-2"
            >
              {labels[name] ?? name}: {message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
