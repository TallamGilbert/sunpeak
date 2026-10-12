import { Suspense } from "react";

import { DemoModeNotice } from "@/components/forms/DemoModeNotice";
import { QuoteForm, QuoteFormFromParams } from "@/components/forms/QuoteForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Request a Solar Quote",
  description:
    "Tell us about your property and energy needs to request a solar consultation. No technical knowledge needed. A request is not a final quote or installation booking.",
  path: "/request-a-quote",
});

const nextSteps = [
  { title: "We review your request", body: "We look at your property type, energy concerns and any bill information you shared." },
  { title: "We talk it through", body: "A short conversation to understand your appliances, usage patterns and priorities." },
  { title: "Site assessment", body: "Where needed, we assess your roof, shading and electrical installation." },
  { title: "Itemised quotation", body: "You receive a written proposal showing equipment, work involved and the assumptions behind any estimates." },
];

export default function RequestQuotePage() {
  return (
    <div className="bg-paper">
      <div className="container-site pt-8 pb-20">
        <Breadcrumbs items={[{ label: "Request a Quote" }]} />
        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="eyebrow text-forest-700">Request a quote</p>
            <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold sm:text-5xl">Tell us about your energy needs.</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-text">
              It takes about three minutes. You don’t need to know any technical specifications. We’ll use your
              answers to prepare for a conversation about the right options.
            </p>
            <div className="mt-10 rounded-md border border-line bg-surface p-5 sm:p-8">
              <DemoModeNotice />
              <Suspense fallback={<QuoteForm />}>
                <QuoteFormFromParams />
              </Suspense>
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-md bg-forest p-6 text-on-forest-muted sm:p-8 lg:sticky lg:top-28 on-dark">
              <h2 className="text-xl font-bold text-white!">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="grid size-7 place-items-center rounded-xs bg-lime text-xs font-bold text-forest">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-white!">{s.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 border-t border-white/15 pt-6 text-sm leading-relaxed">
                A submitted request is not a final quote or a confirmed installation booking. Any quotation depends on
                your energy requirements and a site assessment.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
