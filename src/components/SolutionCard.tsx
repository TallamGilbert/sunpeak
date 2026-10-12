import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SolutionIcon } from "@/components/ui/Icon";
import { images } from "@/lib/images";
import type { Solution } from "@/lib/solutions";

export function SolutionCard({ solution, headingLevel = "h3" }: { solution: Solution; headingLevel?: "h2" | "h3" }) {
  const img = images[solution.image];
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-md border border-line bg-surface transition-shadow duration-300 hover:shadow-card">
      <div className="relative">
        <div className="relative aspect-[16/10] overflow-hidden bg-sage">
          <Image
            src={img.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            placeholder="blur"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition: img.position }}
          />
        </div>
        <span className="absolute bottom-0 left-5 grid size-11 translate-y-1/2 place-items-center rounded-sm bg-forest text-lime">
          <SolutionIcon name={solution.icon} className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 pt-9 sm:p-6 sm:pt-10">
        <Heading className="text-xl font-bold">
          <Link href={`/solutions/${solution.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {solution.name}
          </Link>
        </Heading>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted-text">{solution.summary}</p>
        <span aria-hidden className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
          Explore Solution
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
      {/* Visible focus ring for the stretched link. */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-md ring-forest ring-offset-2 group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
