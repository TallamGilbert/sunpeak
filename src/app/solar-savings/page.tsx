import { CtaBand } from "@/components/CtaBand";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Solar Savings Calculator",
  description:
    "Estimate how solar could affect your electricity bill using your own assumptions. Transparent formulas, results in Kenyan shillings. An illustrative estimate, not a quote.",
  path: "/solar-savings",
});

const formulas = [
  { label: "Estimated monthly reduction", formula: "Monthly bill × assumed offset %" },
  { label: "Estimated annual reduction", formula: "Estimated monthly reduction × 12" },
  { label: "Estimated remaining bill", formula: "Monthly bill − estimated monthly reduction" },
  {
    label: "Simple payback (years)",
    formula: "System cost ÷ (annual reduction − annual maintenance)",
    note: "Only calculated when the result is positive.",
  },
];

const factors = [
  { title: "Tariffs", body: "Electricity prices, charges and levies change over time, which affects the value of each unit solar replaces." },
  { title: "Consumption patterns", body: "Solar generates during the day. Energy used at night needs a battery or comes from the grid." },
  { title: "System size", body: "A larger system can offset more consumption, up to the limits of your roof space and usage." },
  { title: "Site conditions", body: "Orientation, shading, dust and local weather all affect how much a system produces." },
  { title: "Battery use", body: "Batteries let you use more solar energy but add cost and have their own efficiency losses." },
  { title: "Installation costs", body: "Equipment choice, roof type, cable runs and electrical upgrades all affect the upfront cost." },
];

export default function SolarSavingsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Solar Savings Calculator" }]}
        image={images.panelTexture}
        eyebrow="Savings calculator"
        title="Explore what solar could mean for your bill."
        intro="Enter your own figures to see an illustrative estimate in Kenyan shillings. Every result is calculated with the simple formulas shown below the calculator."
      />

      <Section>
        <SavingsCalculator />
      </Section>

      <Section tone="white" labelledBy="formulas-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              id="formulas-heading"
              eyebrow="Transparent formulas"
              title="How the estimate is calculated"
              intro="The calculator does simple arithmetic on the numbers you provide. It does not model your electrical installation, sunlight at your location or equipment performance."
            />
          </div>
          <dl className="divide-y divide-line rounded-md border border-line lg:col-span-7">
            {formulas.map((f) => (
              <div key={f.label} className="grid gap-1 p-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-semibold text-forest">{f.label}</dt>
                <dd>
                  <code className="font-mono text-sm text-ink">{f.formula}</code>
                  {f.note && <p className="mt-1 text-sm text-muted-text">{f.note}</p>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section labelledBy="factors-heading">
        <SectionHeader
          id="factors-heading"
          eyebrow="Real-world results"
          title="What affects actual savings"
          intro="A professional assessment considers these factors before recommending a system or estimating savings."
        />
        <ul className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((f) => (
            <li key={f.title} className="bg-surface p-6">
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-text">{f.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        title="Want a figure based on your actual property?"
        body="A professional quote considers your consumption, roof, equipment and site conditions. Share a few details to get started."
      />
    </>
  );
}
