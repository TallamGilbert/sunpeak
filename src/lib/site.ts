/**
 * Site-wide configuration. Sunpeak Energy Solutions is a fictional company:
 * every contact detail below is sample data and is labelled as such in the UI.
 */
export const site = {
  name: "Sunpeak Energy Solutions",
  shortName: "Sunpeak",
  tagline: "Smarter energy. Greater independence.",
  description:
    "Practical solar, battery storage, backup power and solar water heating solutions for homes and businesses in Kenya.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sunpeak.belion.co.ke").replace(/\/$/, ""),
  locale: "en_KE",
  copyrightYear: 2026,
  contact: {
    // .example is a reserved domain, so this address can never reach a real inbox.
    email: "hello@sunpeak-energy.example",
    // Deliberately not rendered as a tel: link so no real number gets dialled.
    phone: "+254 7XX XXX XXX",
    hours: [
      { days: "Monday – Friday", time: "8:00 – 17:00" },
      { days: "Saturday", time: "9:00 – 13:00" },
      { days: "Sunday & public holidays", time: "Closed" },
    ],
  },
} as const;

export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
] as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}
