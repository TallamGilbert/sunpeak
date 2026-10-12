import { CtaBand } from "@/components/CtaBand";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { images } from "@/lib/images";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/projects";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects showing how Sunpeak approaches residential, commercial, hybrid and backup power solar systems. Scenarios and system details are illustrative.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Projects" }]}
        image={images.groundArraySky}
        eyebrow="Portfolio"
        title="Projects across homes and businesses."
        intro="Each project is a fictional scenario that shows how we would assess a property, design a system and explain the trade-offs."
      />

      <Section>
        <ProjectsExplorer projects={projects} />
      </Section>

      <CtaBand />
    </>
  );
}
