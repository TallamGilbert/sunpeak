import Image from "next/image";
import { Check } from "lucide-react";

import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Sunpeak Energy Solutions helps homeowners and businesses in Kenya plan practical solar and backup power systems, with clear quotations and support beyond installation.",
  path: "/about",
});

const heroImage = images.heroRooftopInstall;

const values = [
  { title: "Clarity", body: "We explain options in plain language, and show the assumptions behind every estimate." },
  { title: "Practicality", body: "We recommend what suits your property and budget, even when that means a smaller system." },
  { title: "Care", body: "Safe, tidy installations that respect your home or business, and the people in it." },
  { title: "Responsibility", body: "Systems designed to last, with guidance that helps you get the most from them." },
];

const quoteIncludes = [
  "An itemised list of equipment, with make, model and quantity",
  "What the system is designed to do, and what it isn’t",
  "Which circuits or appliances are backed up, if any",
  "Installation work, including any electrical upgrades",
  "The assumptions behind any estimated savings",
  "Warranty terms as provided by manufacturers",
];

const process = [
  { title: "Enquiry", body: "You tell us about your property and what you’d like solar to do." },
  { title: "Consultation", body: "We discuss your energy use, priorities and budget, and answer your questions." },
  { title: "Site assessment", body: "We check your roof, shading, electrical installation and equipment locations." },
  { title: "Proposal", body: "You receive an itemised quotation with the design rationale and assumptions." },
  { title: "Installation", body: "Installation, testing and commissioning, with minimal disruption." },
  { title: "Handover & support", body: "A walk-through of your system, monitoring set-up and maintenance guidance." },
];

const team = [
  { initials: "AW", name: "Amina Wanjiru", role: "Energy Planning Lead", body: "Leads consultations and load reviews, and translates energy use into practical system options." },
  { initials: "BO", name: "Brian Otieno", role: "Systems Designer", body: "Prepares system designs and itemised proposals, balancing performance, budget and expansion." },
  { initials: "GC", name: "Grace Chebet", role: "Installation Coordinator", body: "Plans site work, schedules installations and keeps customers informed from start to handover." },
  { initials: "DM", name: "Daniel Mwangi", role: "Customer Support", body: "Supports customers after installation with monitoring questions and maintenance guidance." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero: full-bleed photo with a forest tint, matching the home and solution headers */}
      <section aria-labelledby="about-heading" className="on-dark relative isolate overflow-hidden bg-forest">
        <Image
          src={heroImage.src}
          alt=""
          fill
          preload
          sizes="100vw"
          placeholder="blur"
          className={`-z-20 object-cover ${heroImage.background?.flip ? "-scale-x-100" : ""}`}
          style={{ objectPosition: heroImage.background?.position ?? heroImage.position }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/95 via-forest/75 to-forest/25 max-lg:bg-forest/75 max-lg:bg-none"
        />
        <div className="container-site flex min-h-[30rem] flex-col pt-8 pb-12 sm:min-h-[34rem] lg:min-h-[38rem] lg:pb-14">
          <Breadcrumbs dark items={[{ label: "About" }]} />
          <div className="flex flex-1 items-center py-12">
            <div className="max-w-2xl">
              <p className="eyebrow text-lime">About Sunpeak</p>
              <h1
                id="about-heading"
                className="mt-5 text-4xl leading-[1.08] font-extrabold text-white! sm:text-5xl lg:text-[3.5rem]"
              >
                Helping homes and businesses take control of their energy.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                Sunpeak Energy Solutions helps homeowners and businesses in Kenya adopt solar energy through practical,
                well-planned systems, from rooftop solar and battery storage to backup power and solar water heating.
              </p>
              <div className="mt-8 flex flex-col gap-3 xs:flex-row">
                <ButtonLink href="/request-a-quote" size="lg" arrow>
                  Request a Consultation
                </ButtonLink>
                <ButtonLink href="/projects" size="lg" variant="outline-light">
                  See Our Projects
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and values */}
      <Section labelledBy="mission-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              id="mission-heading"
              eyebrow="Our mission"
              title="Reliable power and better control over energy use."
              intro="Our mission is to help people make confident, well-informed decisions about solar, and to deliver systems that do what they were designed to do."
            />
          </div>
          <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {values.map((v) => (
              <li key={v.title} className="bg-surface p-6 sm:p-7">
                <span aria-hidden className="block h-1 w-8 bg-lime" />
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-text">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Approach */}
      <Section tone="white" labelledBy="approach-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-sage">
            <Image
              src={images.modernHome.src}
              alt={images.modernHome.alt}
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeader
              id="approach-heading"
              eyebrow="Our approach"
              title="We start with how you use energy, not with a package."
            />
            <div className="mt-6 space-y-4 leading-relaxed text-muted-text">
              <p>
                Good solar design begins with understanding consumption: how much energy a property uses, when it uses
                it, and which loads matter most. From there we consider roof space, shading, budget and whether backup
                power is needed.
              </p>
              <p>
                We explain the trade-offs between options, such as battery capacity versus cost or backing up essential
                circuits versus the whole property, so you can choose what fits your priorities.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Quotations and education */}
      <Section tone="sage" labelledBy="quotes-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              id="quotes-heading"
              eyebrow="Clear quotations"
              title="Quotations you can understand and compare."
              intro="We believe customers should know exactly what they are paying for and why. Every Sunpeak quotation is written to be read, not just signed."
            />
            <p className="mt-6 leading-relaxed text-muted-text">
              We also take time to explain how your system works, how to read your monitoring and what to expect in
              different weather, so you can get the most from it.
            </p>
          </div>
          <div className="rounded-md bg-surface p-6 sm:p-8 lg:col-span-7">
            <h3 className="text-lg font-bold">Every quotation includes</h3>
            <ul className="mt-5 divide-y divide-line">
              {quoteIncludes.map((item) => (
                <li key={item} className="flex gap-3 py-3.5">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-forest-700" />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section labelledBy="process-heading">
        <SectionHeader
          id="process-heading"
          eyebrow="Installation and support"
          title="What working with us looks like."
          intro="A clear process from first enquiry to long-term support."
        />
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step, i) => (
            <li key={step.title} className="border-t border-line pt-5">
              <span className="font-display text-sm font-bold text-forest-700 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-text">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Team */}
      <Section tone="white" labelledBy="team-heading">
        <div className="flex flex-col gap-4">
          <SectionHeader
            id="team-heading"
            title="The team"
            intro="The people who guide each project, from the first conversation to handover and beyond."
          />
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} className="rounded-md border border-line bg-paper p-6">
              <span
                aria-hidden
                className="grid size-14 place-items-center rounded-sm bg-forest font-display text-lg font-bold text-lime"
              >
                {m.initials}
              </span>
              <h3 className="mt-5 text-lg font-bold">{m.name}</h3>
              <p className="text-sm font-medium text-forest-700">{m.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-text">{m.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Ready to talk about your energy needs?"
        body="Request a consultation and we’ll start with a conversation about how you use power and what you’d like solar to do."
      />
    </>
  );
}
