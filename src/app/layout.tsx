import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ogImage } from "@/lib/metadata";
import { site } from "@/lib/site";

import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Solar Energy Solutions in Kenya`,
    template: `%s | ${site.shortName} Energy Solutions`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: "/",
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#183D32",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-KE" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[100] rounded-sm bg-forest px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
