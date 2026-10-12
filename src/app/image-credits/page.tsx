import Image from "next/image";

import { PageHero } from "@/components/ui/PageHero";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Image Credits",
  description: "Sources and licences for the stock photography used on the Sunpeak Energy Solutions website.",
  path: "/image-credits",
});

export default function ImageCreditsPage() {
  const list = Object.values(images);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Image Credits" }]}
        eyebrow="Credits"
        title="Image credits"
        intro="All photography on this site is stock imagery used for illustration. None of it shows work by Sunpeak, which is a fictional company."
      />
      <div className="container-site py-16 sm:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((img, i) => (
            <li key={img.credit.url} className="overflow-hidden rounded-md border border-line bg-surface">
              <div className="relative aspect-[3/2] bg-sage">
                <Image
                  src={img.src}
                  alt=""
                  fill
                  // The first row is above the fold, so load it straight away.
                  loading={i < 3 ? "eager" : "lazy"}
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-sm">
                <p className="leading-relaxed text-ink">{img.alt}</p>
                <p className="mt-3 text-muted-text">
                  {img.credit.author}, via {img.credit.source}. {img.credit.license}.
                </p>
                <a
                  href={img.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-9 items-center font-semibold text-forest underline underline-offset-2"
                >
                  View original<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-text">
          The solar water heater photograph is by Martinvl and licensed under{" "}
          <a
            href="https://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer license"
            className="font-semibold text-forest underline underline-offset-2"
          >
            CC BY-SA 4.0<span className="sr-only"> (opens in a new tab)</span>
          </a>
          ; it has been resized. Other photographs are used under the Unsplash License.
        </p>
      </div>
    </>
  );
}
