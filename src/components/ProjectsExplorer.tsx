"use client";

import { useState } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { projectCategories, type Project, type ProjectCategory } from "@/lib/projects";

type Filter = "All" | ProjectCategory;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));
  const filters: Filter[] = ["All", ...projectCategories];

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.categories.includes(f)).length;
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-sm border px-4 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "border-forest bg-forest text-white"
                  : "border-line bg-surface text-ink hover:border-forest/40"
              }`}
            >
              {f}
              <span className={`text-xs tabular-nums ${active ? "text-lime" : "text-muted-text"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted-text">
        Showing {visible.length} project{visible.length === 1 ? "" : "s"}
        {filter !== "All" && ` in ${filter}`}.
      </p>

      <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <li key={p.slug} className="flex">
            <ProjectCard project={p} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
