import { Plus } from "lucide-react";

import type { Faq } from "@/lib/solutions";

/**
 * FAQ list built on native <details>, so it works without JavaScript and is
 * keyboard and screen-reader accessible by default.
 */
export function FaqList({ faqs, headingLevel = 3 }: { faqs: Faq[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left">
            <Heading className="font-display text-base font-semibold leading-snug text-forest sm:text-lg">
              {faq.question}
            </Heading>
            <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-sm border border-line text-forest transition-colors group-open:bg-forest group-open:text-white">
              <Plus aria-hidden className="size-4 transition-transform duration-200 group-open:rotate-45" />
            </span>
          </summary>
          <p className="max-w-3xl pr-12 pb-6 leading-relaxed text-muted-text">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
