import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { images } from "@/lib/images";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, headingLevel = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const img = images[project.image];
  const Heading = headingLevel;
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-sage">
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
      <div className="flex flex-1 flex-col pt-5">
        <p className="spec-label">{project.propertyType}</p>
        <Heading className="mt-1.5 text-xl font-bold">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.title}
          </Link>
        </Heading>
        <p className="mt-2 text-sm font-medium text-forest-700">
          {project.systemType} <span className="font-normal text-muted-text">· illustrative</span>
        </p>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-text">{project.summary}</p>
        <span aria-hidden className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
          View project
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
      <span aria-hidden className="pointer-events-none absolute -inset-2 rounded-md ring-forest group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
