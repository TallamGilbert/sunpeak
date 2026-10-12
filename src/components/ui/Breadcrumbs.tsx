import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { href?: string; label: string };

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const linkColour = dark ? "text-on-forest-muted hover:text-white" : "text-muted-text hover:text-forest";
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link href="/" className={`${linkColour} underline-offset-4 hover:underline`}>
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className={`size-3.5 ${dark ? "text-on-forest-muted" : "text-muted"}`} />
            {item.href ? (
              <Link href={item.href} className={`${linkColour} underline-offset-4 hover:underline`}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className={dark ? "text-white" : "text-ink"}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
