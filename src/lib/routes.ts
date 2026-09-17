import { publicProjects } from "./projects";

export interface PrerenderRoute {
  path: string;
  /** Sitemap hints. Omit to keep the route out of the sitemap (still prerendered). */
  priority?: number;
  changefreq?: "weekly" | "monthly" | "yearly";
}

/**
 * Every public route the build prerenders to its own HTML file and, when it has a
 * priority, lists in sitemap.xml. Hidden projects, /hire (redirects), /resume/alt
 * and /og are deliberately absent.
 */
export const prerenderRoutes: PrerenderRoute[] = [
  { path: "/", priority: 1.0, changefreq: "monthly" },
  { path: "/senior-ux-designer", priority: 0.9, changefreq: "monthly" },
  { path: "/about", priority: 0.8, changefreq: "monthly" },
  { path: "/resume", priority: 0.8, changefreq: "monthly" },
  { path: "/contact", priority: 0.7, changefreq: "yearly" },
  ...publicProjects()
    .filter((p) => !p.gated)
    .map((p) => ({ path: `/project/${p.id}`, priority: 0.8, changefreq: "monthly" as const })),
  // The gated study's teaser is public and indexable; the narrative is not.
  ...publicProjects()
    .filter((p) => p.gated)
    .map((p) => ({ path: `/project/${p.id}`, priority: 0.6, changefreq: "yearly" as const })),
];
