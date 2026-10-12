import Link from "next/link";

/** Sunpeak mark: a peak rising over a horizon line, with a small sun. */
export function LogoMark({ className = "size-9", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false">
      <rect width="40" height="40" rx="5" fill={dark ? "#B7E36B" : "#183D32"} />
      <circle cx="27" cy="13" r="3.5" fill={dark ? "#183D32" : "#B7E36B"} />
      <path
        d="M7 29 L17 15.5 L22.5 22.5 L25.5 19 L33 29"
        fill="none"
        stroke={dark ? "#183D32" : "#FFFFFF"}
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ dark = false, onNavigate }: { dark?: boolean; onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onNavigate={onNavigate}
      className="flex items-center gap-2.5 rounded-sm"
      aria-label="Sunpeak Energy Solutions, home"
    >
      <LogoMark dark={dark} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold tracking-tight ${dark ? "text-white" : "text-forest"}`}>
          Sunpeak
        </span>
        <span className={`mt-1 text-[0.625rem] font-semibold tracking-[0.18em] uppercase ${dark ? "text-on-forest-muted" : "text-muted-text"}`}>
          Energy Solutions
        </span>
      </span>
    </Link>
  );
}
