import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/ui/Accordion";
import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { faqGroups } from "@/lib/faqs";

export const metadata = pageMetadata({
  title: "Solar FAQs",
  description:
    "Answers to common questions about solar power, batteries, backup systems, installation, maintenance and costs for homes and businesses in Kenya.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "FAQs" }]}
        image={images.groundArrayGrass}
        eyebrow="FAQs"
        title="Frequently asked questions."
        intro="General answers about how solar works, planning a system and what to expect. Whether a particular system suits your property depends on a site assessment and your energy requirements."
      />

      <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <nav aria-label="FAQ topics" className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            <p className="spec-label">Topics</p>
            <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-0">
              {faqGroups.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="inline-flex min-h-11 items-center rounded-sm border border-line bg-surface px-3 text-sm font-medium text-forest hover:border-forest/40 lg:border-0 lg:bg-transparent lg:px-0 lg:hover:underline lg:underline-offset-4"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="space-y-16 lg:col-span-9">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`}>
              <h2 id={`${g.id}-heading`} className="mb-4 text-2xl font-bold">
                {g.title}
              </h2>
              <FaqList faqs={g.faqs} />
            </section>
          ))}
        </div>
      </div>

      <CtaBand title="Have a question that isn’t answered here?" />
    </>
  );
}
