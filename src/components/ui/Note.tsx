import { Info } from "lucide-react";
import type { ReactNode } from "react";

/** Bordered note explaining an assumption or disclaimer. */
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex gap-3 rounded-md border border-line bg-surface p-4 text-sm leading-relaxed text-muted-text ${className}`}>
      <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-forest-700" />
      <div>{children}</div>
    </div>
  );
}
