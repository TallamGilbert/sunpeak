import Link from "next/link";
import { BatteryCharging, Calculator, Clock, FileText, LifeBuoy, Mail, Phone } from "lucide-react";

import { ContactForm } from "@/components/forms/ContactForm";
import { DemoModeNotice } from "@/components/forms/DemoModeNotice";
import { FaqList } from "@/components/ui/Accordion";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeader } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Sunpeak Energy Solutions about solar, battery storage, backup power or solar water heating.",
  path: "/contact",
});

const enquiryOptions = [
  { icon: FileText, title: "Request a quote", body: "Share details about your property and we’ll prepare for a consultation.", href: "/request-a-quote" },
  { icon: BatteryCharging, title: "Explore solutions", body: "Compare solar, battery, backup and water heating options.", href: "/solutions" },
  { icon: Calculator, title: "Estimate savings", body: "Test your own assumptions with the savings calculator.", href: "/solar-savings" },
  { icon: LifeBuoy, title: "Read the FAQs", body: "Answers to common questions about planning and maintenance.", href: "/faqs" },
];

const contactFaqs = [
  {
    question: "How quickly will I get a response?",
    answer:
      "This site’s forms currently run in demo mode, so messages are not sent and no one will respond.",
  },
  {
    question: "Should I use the contact form or the quote form?",
    answer:
      "Use the quote form if you’re considering a new system. It asks the questions we’d need to prepare. Use the contact form for general questions or anything else.",
  },
  {
    question: "Can I visit your office?",
    answer:
      "Sunpeak is a fictional company, so no office address or map is published. A live site would show a verified address and directions here.",
  },
  {
    question: "What information should I have ready?",
    answer:
      "A recent electricity bill or token history, a rough list of the appliances you want to run, and photos of your roof are all helpful, but none are required to get in touch.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        image={images.modernHome}
        eyebrow="Contact"
        title="Talk to us about your energy needs."
        intro="Questions about solar, batteries, backup power or solar water heating? Send us a message and tell us a little about your property."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="rounded-md border border-line bg-surface p-5 sm:p-8">
              <h2 className="text-2xl font-bold">Send a message</h2>
              <p className="mt-2 mb-8 text-muted-text">Fields marked as required are needed for us to reply.</p>
              <DemoModeNotice />
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-md border border-line bg-surface p-6 sm:p-8">
              <h2 className="text-lg font-bold">Contact details</h2>
              <p className="mt-1 text-sm text-muted-text">Sample details for a fictional business.</p>
              <dl className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <Mail aria-hidden className="mt-0.5 size-5 shrink-0 text-forest-700" />
                  <div>
                    <dt className="spec-label">Email (sample)</dt>
                    <dd className="mt-1 font-medium text-ink">{site.contact.email}</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone aria-hidden className="mt-0.5 size-5 shrink-0 text-forest-700" />
                  <div>
                    <dt className="spec-label">Phone (sample)</dt>
                    <dd className="mt-1 font-medium text-ink">{site.contact.phone}</dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock aria-hidden className="mt-0.5 size-5 shrink-0 text-forest-700" />
                  <div className="flex-1">
                    <dt className="spec-label">Opening hours (illustrative)</dt>
                    <dd className="mt-2">
                      <dl className="space-y-1.5 text-sm">
                        {site.contact.hours.map((h) => (
                          <div key={h.days} className="flex justify-between gap-4">
                            <dt className="text-muted-text">{h.days}</dt>
                            <dd className="font-medium text-ink">{h.time}</dd>
                          </div>
                        ))}
                      </dl>
                    </dd>
                  </div>
                </div>
              </dl>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted-text">
                No office address or map is shown because Sunpeak is a fictional company.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="white" labelledBy="enquiry-heading">
        <SectionHeader id="enquiry-heading" eyebrow="Ways we can help" title="Choose the best place to start" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {enquiryOptions.map(({ icon: Icon, title, body, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex h-full flex-col rounded-md border border-line bg-paper p-6 transition-colors duration-200 hover:border-forest/40 hover:bg-surface"
              >
                <Icon aria-hidden strokeWidth={1.75} className="size-6 text-forest-700" />
                <span className="mt-4 font-display text-lg font-bold text-forest">{title}</span>
                <span className="mt-1.5 text-sm leading-relaxed text-muted-text">{body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="contact-faq-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="contact-faq-heading" eyebrow="FAQs" title="Contact questions" />
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={contactFaqs} />
          </div>
        </div>
      </Section>
    </>
  );
}
