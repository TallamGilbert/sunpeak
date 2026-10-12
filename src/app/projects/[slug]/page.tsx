import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArrowLink } from "@/components/ui/Button";
import { Note } from "@/components/ui/Note";
import { Section, SectionHeader } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { getProject, getRelatedProjects, projects } from "@/lib/projects";
import { getSolution } from "@/lib/solutions";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const [lead, ...rest] = project.gallery.map((key) => images[key]);
  const related = getRelatedProjects(project);
  const linkedSolutions = project.solutions.map(getSolution).filter((s) => s !== undefined);

  return (
    <>
      <section className="bg-surface">
        <div className="container-site pt-8 pb-10 sm:pb-12">
          <Breadcrumbs items={[{ href: "/projects", label: "Projects" }, { label: project.title }]} />
          <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                {project.categories.map((c) => (
                  <span key={c} className="rounded-xs border border-line px-2 py-1 text-[0.6875rem] font-semibold tracking-wide text-muted-text uppercase">
                    {c}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold sm:text-5xl">{project.title}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-text">{project.summary}</p>
            </div>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line lg:col-span-5">
              {[
                ["Property type", project.propertyType],
                ["Location", project.location],
                ["System type", project.systemType],
                ["Category", project.categories.join(", ")],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface p-4">
                  <dt className="spec-label">
                    {k}
                    {k !== "Category" && <span className="normal-case tracking-normal"> · illustrative</span>}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-forest">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Gallery */}
        <div className="container-site pb-14 sm:pb-16">
          <div className="grid gap-3 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-md bg-sage sm:col-span-2 sm:row-span-2 sm:aspect-auto">
              <Image
                src={lead.src}
                alt={lead.alt}
                fill
                preload
                sizes="(min-width: 640px) 66vw, 100vw"
                placeholder="blur"
                className="object-cover"
                style={{ objectPosition: lead.position }}
              />
            </figure>
            {rest.slice(0, 2).map((img) => (
              <figure key={img.alt} className="relative aspect-[4/3] overflow-hidden rounded-md bg-sage">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 640px) 33vw, 100vw" placeholder="blur" className="object-cover" style={{ objectPosition: img.position }} />
              </figure>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-text">Stock photography used for illustration. Not images of this scenario.</p>
        </div>
      </section>

      <Section labelledBy="overview-heading">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 space-y-12 lg:col-span-7">
            <div>
              <h2 id="overview-heading" className="text-2xl font-bold sm:text-3xl">
                Project overview
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-text">{project.overview}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">The challenge</h2>
              <p className="mt-1 text-sm text-muted-text italic">A fictional scenario</p>
              <p className="mt-4 leading-relaxed text-muted-text">{project.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Proposed system configuration</h2>
              <p className="mt-4 leading-relaxed text-muted-text">{project.configuration}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Installation considerations</h2>
              <ul className="mt-5 space-y-3">
                {project.installation.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed text-muted-text">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-forest-700" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <div className="rounded-md border border-line bg-surface lg:sticky lg:top-28">
              <div className="border-b border-line p-6">
                <h2 className="text-lg font-bold">System elements</h2>
                <p className="mt-1 text-xs text-muted-text">All capacities are illustrative, not installation records.</p>
              </div>
              <dl className="divide-y divide-line">
                {project.components.map((c) => (
                  <div key={c.label} className="grid grid-cols-[8.5rem_1fr] gap-4 px-6 py-4">
                    <dt className="spec-label pt-0.5">{c.label}</dt>
                    <dd className="text-sm font-medium text-ink">{c.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-line p-6">
                <p className="spec-label">Related solutions</p>
                <ul className="mt-3 space-y-2">
                  {linkedSolutions.map((s) => (
                    <li key={s.slug}>
                      <ArrowLink href={`/solutions/${s.slug}`}>{s.name}</ArrowLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="sage" labelledBy="outcome-heading">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="outcome-heading" eyebrow="Illustrative outcome" title="What the design aims to achieve" />
          </div>
          <div className="lg:col-span-8">
            <ul className="grid gap-4">
              {project.outcome.map((o, i) => (
                <li key={o} className="flex gap-5 rounded-md bg-surface p-6">
                  <span className="font-display text-sm font-bold text-forest-700 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <p className="leading-relaxed text-ink">{o}</p>
                </li>
              ))}
            </ul>
            <Note className="mt-6">
              Outcomes describe design intent for a fictional scenario. They are not measured results or a guarantee of
              performance. Real-world results depend on actual consumption, weather, equipment and site conditions.
            </Note>
          </div>
        </div>
      </Section>

      <Section tone="white" labelledBy="related-projects-heading">
        <SectionHeader id="related-projects-heading" eyebrow="More projects" title="Related projects" />
        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug} className="flex">
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title="Have a similar property or energy challenge?" />
    </>
  );
}
