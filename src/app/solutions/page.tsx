import { CtaBand } from "@/components/CtaBand";
import { SolutionCard } from "@/components/SolutionCard";
import { ArrowLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { solutions } from "@/lib/solutions";

export const metadata = pageMetadata({
  title: "Solar Solutions",
  description:
    "Residential and commercial solar, hybrid systems, battery storage, solar water heating and solar backup systems for homes and businesses in Kenya.",
  path: "/solutions",
});

const comparison = [
  { slug: "residential-solar", purpose: "Reduce household grid use", battery: "Optional", suits: "Homes with roof space" },
  { slug: "commercial-solar", purpose: "Offset daytime business demand", battery: "Optional", suits: "Shops, offices, workshops" },
  { slug: "hybrid-solar-systems", purpose: "Solar use plus outage support", battery: "Yes", suits: "Homes and businesses with outages" },
  { slug: "battery-storage", purpose: "Store energy for evenings and outages", battery: "Yes", suits: "New or compatible existing systems" },
  { slug: "solar-water-heating", purpose: "Heat water with the sun", battery: "Not applicable", suits: "Homes, guest houses, institutions" },
  { slug: "solar-backup-systems", purpose: "Keep essential loads running", battery: "Yes", suits: "Home offices, small businesses" },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solutions" }]}
        image={images.arrayClouds}
        eyebrow="Solar solutions"
        title="Solar solutions planned around your property."
        intro="Whether you want to reduce grid use, keep the lights on during outages or heat water with the sun, the right solution depends on how you use energy. Explore the options below, or ask us to recommend one."
      />

      <Section labelledBy="all-solutions">
        <h2 id="all-solutions" className="sr-only">
          All solutions
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s) => (
            <li key={s.slug} className="flex">
              <SolutionCard solution={s} />
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" labelledBy="compare-heading">
        <SectionHeader
          id="compare-heading"
          eyebrow="Compare"
          title="Which solution fits what you need?"
          intro="A quick comparison to help you get oriented. Many properties combine more than one. For example, rooftop solar with battery storage."
        />
        <div className="mt-10 overflow-x-auto rounded-md border border-line">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="sr-only">Comparison of Sunpeak solar solutions</caption>
            <thead className="bg-paper">
              <tr>
                {["Solution", "Main purpose", "Battery", "Typically suits"].map((h) => (
                  <th key={h} scope="col" className="spec-label px-5 py-3.5 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {comparison.map((row) => {
                const s = solutions.find((x) => x.slug === row.slug)!;
                return (
                  <tr key={row.slug} className="bg-surface">
                    <th scope="row" className="px-5 py-4 font-semibold text-forest">
                      <ArrowLink href={`/solutions/${s.slug}`}>{s.name}</ArrowLink>
                    </th>
                    <td className="px-5 py-4 text-ink">{row.purpose}</td>
                    <td className="px-5 py-4 text-muted-text">{row.battery}</td>
                    <td className="px-5 py-4 text-muted-text">{row.suits}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <CtaBand
        title="Not sure which solution is right for you?"
        body="You don’t need to know the technical details. Tell us about your property and what you’d like solar to do, and we’ll recommend options that fit."
      />
    </>
  );
}
