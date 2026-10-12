import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { CtaBand } from "@/components/CtaBand";
import { SolutionCard } from "@/components/SolutionCard";
import { FaqList } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { SolutionIcon } from "@/components/ui/Icon";
import { Section, SectionHeader } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { getSolution, solutions } from "@/lib/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return pageMetadata({
    title: solution.name,
    description: solution.summary,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const img = images[solution.image];
  const related = solution.related.map(getSolution).filter((s) => s !== undefined);
  const quoteHref = `/request-a-quote?solution=${solution.slug}`;

  return (
    <>
      {/* Hero: full-bleed photo with a forest tint on the text side */}
      <section aria-labelledby="solution-heading" className="on-dark relative isolate overflow-hidden bg-forest">
        <Image
          src={img.src}
          alt=""
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className={`-z-20 object-cover ${img.background?.flip ? "-scale-x-100" : ""}`}
          style={{ objectPosition: img.background?.position ?? img.position }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/95 via-forest/75 to-forest/25 max-lg:bg-forest/75 max-lg:bg-none"
        />
        <div className="container-site flex min-h-[30rem] flex-col pt-8 pb-16 sm:min-h-[34rem] sm:pb-20 lg:min-h-[38rem] lg:pb-24">
          <Breadcrumbs dark items={[{ href: "/solutions", label: "Solutions" }, { label: solution.name }]} />
          <div className="flex flex-1 items-center pt-12">
            <div className="max-w-2xl">
              <p className="eyebrow flex items-center gap-2.5 text-lime">
                <SolutionIcon name={solution.icon} className="size-5" />
                {solution.name}
              </p>
              <h1 id="solution-heading" className="mt-5 text-4xl leading-[1.08] font-extrabold text-white! sm:text-5xl lg:text-[3.5rem]">
                {solution.heroTitle}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{solution.heroIntro}</p>
              <div className="mt-8 flex flex-col gap-3 xs:flex-row">
                <ButtonLink href={quoteHref} size="lg" arrow>
                  Request a Quote
                </ButtonLink>
                <ButtonLink href="/solar-savings" size="lg" variant="outline-light">
                  Estimate Savings
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* At a glance */}
      <section aria-labelledby="glance-heading" className="border-b border-line bg-paper">
        <div className="container-site py-10">
          <h2 id="glance-heading" className="spec-label text-forest-700!">
            At a glance
          </h2>
          <dl className="mt-5 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {solution.atAGlance.map((item) => (
              <div key={item.label} className="bg-surface p-5">
                <dt className="spec-label">{item.label}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-snug font-semibold text-forest">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Overview + how it works */}
      <Section labelledBy="how-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader id="how-heading" eyebrow="How it works" title={`How ${solution.name.toLowerCase()} works`} />
            <div className="mt-6 space-y-4 leading-relaxed text-muted-text">
              {solution.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {solution.howItWorks.map((step, i) => (
              <li key={step.title} className="rounded-md border border-line bg-surface p-6">
                <span className="font-display text-sm font-bold text-forest-700 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-text">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Use cases */}
      <Section tone="white" labelledBy="uses-heading">
        <SectionHeader id="uses-heading" eyebrow="Use cases" title="Common use cases" />
        <ul className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-3">
          {solution.useCases.map((u) => (
            <li key={u.title} className="border-t-2 border-forest pt-5">
              <h3 className="text-lg font-bold">{u.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-text">{u.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Considerations */}
      <Section tone="sage" labelledBy="considerations-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id="considerations-heading"
              eyebrow="Planning"
              title="Important planning considerations"
              intro="Every recommendation follows a review of your energy use and a site assessment. These are the factors we look at."
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {solution.considerations.map((c) => (
              <li key={c.title} className="flex gap-4 rounded-md bg-surface p-6">
                <Check aria-hidden className="mt-1 size-5 shrink-0 text-forest-700" />
                <div>
                  <h3 className="text-base font-bold">{c.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-muted-text">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* FAQs */}
      <Section tone="white" labelledBy="solution-faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="solution-faq-heading" eyebrow="FAQs" title={`${solution.name} questions`} />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={solution.faqs} />
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section labelledBy="related-heading">
        <SectionHeader id="related-heading" eyebrow="Related" title="Related solutions" />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <li key={s.slug} className="flex">
              <SolutionCard solution={s} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title={`Interested in ${solution.name.toLowerCase()}?`}
        body="Share a few details about your property and energy needs. We’ll follow up to discuss options. A request is not a final quote or a booking."
      />
    </>
  );
}
