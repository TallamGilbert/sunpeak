import type { Metadata } from "next";

import { site } from "@/lib/site";

export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Sunpeak Energy Solutions – Smarter energy. Greater independence.",
};

/** Page-level metadata with canonical URL and Open Graph fields. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.shortName}`, description, images: [ogImage.url] },
  };
}
