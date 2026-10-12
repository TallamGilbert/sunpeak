import type { MetadataRoute } from "next";

import { projects } from "@/lib/projects";
import { absoluteUrl } from "@/lib/site";
import { solutions } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", priority: 1 },
    { path: "/solutions", priority: 0.9 },
    { path: "/projects", priority: 0.7 },
    { path: "/solar-savings", priority: 0.8 },
    { path: "/request-a-quote", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/faqs", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy-policy", priority: 0.2 },
    { path: "/image-credits", priority: 0.1 },
  ];

  return [
    ...staticPaths.map(({ path, priority }) => ({ url: absoluteUrl(path), priority })),
    ...solutions.map((s) => ({ url: absoluteUrl(`/solutions/${s.slug}`), priority: 0.8 })),
    ...projects.map((p) => ({ url: absoluteUrl(`/projects/${p.slug}`), priority: 0.5 })),
  ];
}
