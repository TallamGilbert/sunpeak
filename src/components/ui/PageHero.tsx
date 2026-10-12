import Image from "next/image";
import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { SiteImage } from "@/lib/images";

/**
 * Inner-page hero. With an `image` it becomes a full-bleed photo header with a
 * forest tint, matching the home, About and solution pages; without one it is
 * a plain text header for utility pages.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  image?: SiteImage;
  children?: ReactNode;
}) {
  if (!image) {
    return (
      <section className="border-b border-line bg-surface">
        <div className="container-site pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pb-20">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 max-w-3xl sm:mt-14">
            {eyebrow && <p className="eyebrow mb-4 text-forest-700">{eyebrow}</p>}
            <h1 className="text-4xl leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.5rem]">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-text">{intro}</p>}
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="on-dark relative isolate overflow-hidden bg-forest">
      <Image
        src={image.src}
        alt=""
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        className={`-z-20 object-cover ${image.background?.flip ? "-scale-x-100" : ""}`}
        style={{ objectPosition: image.background?.position ?? image.position }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-forest/95 via-forest/75 to-forest/25 max-lg:bg-forest/75 max-lg:bg-none"
      />
      <div className="container-site flex min-h-[24rem] flex-col pt-8 pb-14 sm:min-h-[28rem] sm:pb-16 lg:min-h-[30rem] lg:pb-20">
        <Breadcrumbs dark items={crumbs} />
        <div className="flex flex-1 items-center pt-10 sm:pt-12">
          <div className="max-w-3xl">
            {eyebrow && <p className="eyebrow mb-4 text-lime">{eyebrow}</p>}
            <h1 className="text-4xl leading-[1.08] font-extrabold text-white! sm:text-5xl lg:text-[3.5rem]">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{intro}</p>}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
