import type { Metadata } from "next";
import Image from "next/image";
import {
  BatteryCharging,
  CalendarRange,
  ClipboardList,
  FileText,
  Gauge,
  Handshake,
  Lightbulb,
  LifeBuoy,
  PencilRuler,
  SlidersHorizontal,
  Wrench,
} from "lucide-react";

import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { SolutionCard } from "@/components/SolutionCard";
import { FaqList } from "@/components/ui/Accordion";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { homeFaqs } from "@/lib/faqs";
import { images } from "@/lib/images";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { solutions } from "@/lib/solutions";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Solar Energy Solutions in Kenya` },
  description:
    "Explore practical solar, battery storage, backup power and solar water heating solutions for homes and businesses in Kenya, designed around your property, energy needs and budget.",
  alternates: { canonical: "/" },
};

const benefits = [
  { icon: Gauge, title: "Lower Grid Dependence", body: "Use solar power during the day to reduce how much electricity you draw from the grid." },
  { icon: BatteryCharging, title: "Backup Power Options", body: "Add battery storage to support chosen appliances when grid supply is interrupted." },
  { icon: PencilRuler, title: "Tailored System Design", body: "Systems sized around your consumption, roof, budget and priorities, not a fixed package." },
  { icon: CalendarRange, title: "Long-Term Energy Planning", body: "Plan for future loads and expansion so your system can grow with your needs." },
];

// Dividers for a 1 → 2 → 4 column strip.
const benefitBorders = [
  "",
  "border-t sm:border-t-0 sm:border-l",
  "border-t lg:border-t-0 lg:border-l",
  "border-t sm:border-l lg:border-t-0",
];

const factors = [
  { title: "Energy consumption", body: "How many kWh you use, and when during the day you use them." },
  { title: "Appliance requirements", body: "Which appliances matter most, and how much power they draw." },
  { title: "Available roof space", body: "Area, orientation, pitch and shading all affect how much solar fits." },
  { title: "Budget", body: "What you want to invest now, and whether you plan to expand later." },
  { title: "Battery backup", body: "Whether you need power during outages, and for which loads." },
];

const steps = [
  { icon: ClipboardList, title: "Assess", body: "Understand the property’s energy use and power requirements, from bills, appliance lists and a site visit." },
  { icon: PencilRuler, title: "Design", body: "Select suitable panels, inverter, battery capacity and system configuration, and explain the trade-offs." },
  { icon: Wrench, title: "Install", body: "Carry out installation and system commissioning, with safe isolation, protection and testing." },
  { icon: LifeBuoy, title: "Support", body: "Provide guidance on using, monitoring and maintaining your system after handover." },
];

const principles = [
  { icon: Lightbulb, title: "Practical Recommendations", body: "We recommend what suits your property and goals, including when a smaller system or no battery makes more sense." },
  { icon: FileText, title: "Transparent Quotations", body: "Itemised quotes that show the equipment, the work involved and the assumptions behind any estimates." },
  { icon: SlidersHorizontal, title: "Thoughtful System Design", body: "Designs based on your load profile and site conditions, with room to expand if you need it later." },
  { icon: Handshake, title: "Support Beyond Installation", body: "Clear handover, guidance on monitoring and maintenance, and a point of contact when you have questions." },
];

const savingsFactors = [
  "Electricity consumption",
  "Tariffs",
  "System sizing",
  "Sunlight",
  "Installation costs",
  "Battery usage",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* D. Introduction */}
      <Section labelledBy="intro-heading">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            {/* Fills the text column's height on desktop so the image doesn't float. */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-sage sm:aspect-[5/4] lg:aspect-auto lg:h-full lg:min-h-[32rem]">
              <Image
                src={images.arrayTrees.src}
                alt={images.arrayTrees.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <SectionHeader
              id="intro-heading"
              eyebrow="Our approach"
              title="Solar designed around the way you use power."
              intro="There is no one-size-fits-all solar system. The right setup depends on your property and on what you want solar to do for you. We start with a few practical questions."
            />
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {factors.map((f, i) => (
                <li key={f.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-4">
                  <span className="font-display text-sm font-bold text-forest-700 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold">{f.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted-text">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <ButtonLink href="/solutions" variant="secondary" size="lg" arrow className="mt-8">
              Explore Our Solutions
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* E. Solutions overview */}
      <Section tone="white" labelledBy="solutions-heading">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="solutions-heading"
            eyebrow="Solutions"
            title="Solar solutions for homes and businesses."
            intro="From rooftop solar to battery storage and solar water heating, each solution is planned around your property and priorities."
          />
          <ArrowLink href="/solutions" className="shrink-0">
            View all solutions
          </ArrowLink>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <li key={s.slug} className="flex">
              <SolutionCard solution={s} />
            </li>
          ))}
        </ul>
      </Section>

      {/* F. How solar works */}
      <Section labelledBy="process-heading">
        <SectionHeader
          id="process-heading"
          eyebrow="How it works"
          title="From first conversation to working system."
          intro="A clear four-step process, so you know what happens at each stage and what we need from you."
        />
        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li
              key={title}
              className="relative flex gap-5 lg:flex-col lg:gap-0 lg:[&:not(:last-child)]:after:absolute lg:[&:not(:last-child)]:after:top-6 lg:[&:not(:last-child)]:after:right-[-1rem] lg:[&:not(:last-child)]:after:left-16 lg:[&:not(:last-child)]:after:h-px lg:[&:not(:last-child)]:after:bg-line"
            >
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-sm border border-line bg-surface text-forest lg:mx-0">
                <Icon aria-hidden strokeWidth={1.75} className="size-5" />
              </span>
              <div className="lg:mt-6">
                <p className="spec-label">Step {i + 1}</p>
                <h3 className="mt-1 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-text">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* G. Featured projects */}
      <Section tone="white" labelledBy="projects-heading">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeader
              id="projects-heading"
              title="Example projects, from family homes to retail."
              intro="Fictional scenarios showing how we would approach different properties. System details are illustrative, not records of real installations."
            />
          </div>
          <ArrowLink href="/projects" className="shrink-0">
            View all projects
          </ArrowLink>
        </div>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <li key={p.slug} className="flex">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </Section>

      {/* H. Energy savings */}
      <Section tone="sage" labelledBy="savings-heading" backgroundImage={images.panelTexture.src}>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHeader
              id="savings-heading"
              eyebrow="Energy savings"
              title="Understand what solar could mean for your energy costs."
              intro="Potential savings are different for every property. Our calculator lets you test your own assumptions and see exactly how each figure is worked out."
            />
            <h3 className="mt-8 text-sm font-semibold text-ink">What affects potential savings</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {savingsFactors.map((f) => (
                <li key={f} className="rounded-sm border border-forest/15 bg-surface px-3 py-1.5 text-sm text-forest">
                  {f}
                </li>
              ))}
            </ul>
            <ButtonLink href="/solar-savings" size="lg" variant="secondary" arrow className="mt-8">
              Try the Solar Savings Calculator
            </ButtonLink>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <figure className="rounded-md border border-line bg-surface p-6 shadow-card sm:p-8">
              <figcaption className="spec-label">How the calculator works</figcaption>
              <dl className="mt-5 space-y-4 text-sm">
                {[
                  ["Monthly reduction", "Monthly bill × offset %"],
                  ["Annual reduction", "Monthly reduction × 12"],
                  ["Remaining bill", "Monthly bill − monthly reduction"],
                  ["Simple payback", "System cost ÷ (annual reduction − maintenance)"],
                ].map(([label, formula]) => (
                  <div key={label} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="font-semibold text-forest">{label}</dt>
                    <dd className="mt-1 font-mono text-[0.8125rem] text-muted-text">{formula}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-muted-text">
                Results are illustrative estimates based on the figures you enter, not a quote or engineering
                assessment.
              </p>
            </figure>
          </div>
        </div>
      </Section>

      {/* I. Why choose Sunpeak */}
      <Section labelledBy="why-heading">
        <SectionHeader
          id="why-heading"
          eyebrow="Why Sunpeak"
          title="Straightforward advice, carefully designed systems."
          intro="The principles behind how we work with every customer."
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          {principles.map(({ icon: Icon, title, body }) => (
            <li key={title} className="bg-surface p-6 sm:p-8">
              <Icon aria-hidden strokeWidth={1.75} className="size-6 text-forest-700" />
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-text">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* J. FAQs */}
      <Section tone="white" labelledBy="faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader
              id="faq-heading"
              eyebrow="FAQs"
              title="Common questions about solar."
              intro="General answers to help you get started. Whether a particular system suits your property depends on a site assessment and your energy requirements."
            />
            <ArrowLink href="/faqs" className="mt-6">
              See all FAQs
            </ArrowLink>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={homeFaqs} />
          </div>
        </div>
      </Section>

      {/* K. Final CTA */}
      <CtaBand />
    </>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="on-dark relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-forest"
    >
      <Image
        src={images.heroArraySky.src}
        alt=""
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        className="-z-20 object-cover object-[60%_100%]"
      />
      {/* Forest tint on the text side keeps the headline legible over the sky. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/90 via-forest/60 to-forest/10 max-lg:bg-forest/60 max-lg:bg-none"
      />
      <div className="container-site flex flex-1 items-center py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <h1
            id="hero-heading"
            className="text-[2.5rem] leading-[1.04] font-extrabold tracking-[-0.03em] text-white! sm:text-6xl lg:text-[4.5rem]"
          >
            Take control of your energy, one sunny day at a time.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            Explore practical solar and backup power solutions designed around your property, energy needs, and
            budget.
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row">
            <ButtonLink href="/request-a-quote" size="lg" arrow>
              Request a Quote
            </ButtonLink>
            <ButtonLink href="/solutions" size="lg" variant="outline-light">
              Explore Our Solutions
            </ButtonLink>
          </div>
        </div>
      </div>

      {/* C. Benefits strip: frosted glass panel over the bottom of the hero image */}
      <div className="container-site pb-6 sm:pb-10">
        <section
          aria-label="Key benefits"
          className="rounded-md border border-white/20 bg-forest/30 shadow-[0_8px_32px_rgb(0_0_0/0.18)] backdrop-blur-lg backdrop-saturate-150"
        >
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, body }, i) => (
              <li key={title} className={`flex gap-4 border-white/15 p-5 sm:p-6 ${benefitBorders[i]}`}>
                <Icon aria-hidden strokeWidth={1.75} className="mt-0.5 size-6 shrink-0 text-lime" />
                <div>
                  <h2 className="text-base font-bold text-white!">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
