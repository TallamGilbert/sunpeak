import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { site } from "@/lib/site";
import { solutions } from "@/lib/solutions";

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Projects" },
  { href: "/solar-savings", label: "Solar Savings Calculator" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
  { href: "/request-a-quote", label: "Request a Quote" },
];

export function Footer() {
  return (
    <footer className="on-dark bg-forest text-on-forest-muted">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo dark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Practical solar, battery storage and backup power solutions for homes and businesses in Kenya.
          </p>
          <p className="mt-5 max-w-sm rounded-sm border border-white/15 p-3 text-xs leading-relaxed">
            Sunpeak Energy Solutions is a fictional company created for a portfolio concept. Projects,
            people and contact details on this site are illustrative.
          </p>
        </div>

        <FooterColumn title="Solutions" className="lg:col-span-3">
          {solutions.map((s) => (
            <FooterLink key={s.slug} href={`/solutions/${s.slug}`}>
              {s.name}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Company" className="lg:col-span-2">
          {companyLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>
              {l.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold text-white!">
            Contact <span className="font-normal text-on-forest-muted">(sample details)</span>
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="sr-only">Email</dt>
              <dd>{site.contact.email}</dd>
            </div>
            <div>
              <dt className="sr-only">Phone</dt>
              <dd>{site.contact.phone}</dd>
            </div>
          </dl>
          <h3 className="mt-6 text-sm font-semibold text-white!">
            Opening hours <span className="font-normal text-on-forest-muted">(illustrative)</span>
          </h3>
          <dl className="mt-3 space-y-1.5 text-sm">
            {site.contact.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt>{h.days}</dt>
                <dd className="text-white">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. Portfolio concept.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className="underline-offset-4 hover:text-white hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/image-credits" className="underline-offset-4 hover:text-white hover:underline">
                Image Credits
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <h2 className="text-sm font-semibold text-white!">{title}</h2>
      <ul className="mt-4 space-y-1">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-flex min-h-9 items-center text-sm underline-offset-4 hover:text-white hover:underline">
        {children}
      </Link>
    </li>
  );
}
