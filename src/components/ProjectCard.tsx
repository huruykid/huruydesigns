import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ResponsiveAppShell from "@/components/case-study/ResponsiveAppShell";
import { AppleLogo } from "@/components/AppStorePromoBanner";
import type { Project } from "@/lib/projects";
import { imageDimensions } from "@/lib/imageDimensions";
import { useId, lazy, Suspense, useEffect, useRef, useState, type ComponentType, type LazyExoticComponent } from "react";
import { getAppStoreUrl, trackAppStoreClick } from "@/lib/analytics";

// Each interactive demo is its own chunk, fetched only once its card scrolls into view.
const demoComponents: Record<string, LazyExoticComponent<ComponentType>> = {
  "oneasure-portal": lazy(() => import("@/components/case-study/BenefitsModuleDemo")),
  ebtfinder: lazy(() => import("@/components/case-study/EBTSearchDemo")),
  beles: lazy(() => import("@/components/case-study/BelesMatchDemo")),
  "asure-compliance": lazy(() => import("@/components/case-study/TaxComplianceDashboardDemo")),
};

const responsiveProjects = new Set(["oneasure-portal", "asure-compliance"]);

/** True once the element has been near the viewport; never flips back. */
function useNearViewport<T extends Element>(rootMargin = "300px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [near, rootMargin]);
  return { ref, near };
}

/** Placeholder with the demo's aspect ratio; never wider than its container so phones don't get a horizontal scroll. */
const DemoSkeleton = ({ width, height }: { width: number; height: number }) => (
  <div
    className="w-full rounded-[2rem] border-[3px] border-foreground/10 bg-muted/40 animate-pulse"
    style={{ maxWidth: width, aspectRatio: `${width} / ${height}` }}
    aria-hidden="true"
  />
);

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const DemoComponent = demoComponents[project.id];
  const useResponsiveShell = DemoComponent && responsiveProjects.has(project.id);
  const shellWidth = 220;
  const shellHeight = 280;
  const titleId = useId();
  const { ref, near } = useNearViewport<HTMLDivElement>();
  const dims = imageDimensions[project.image];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`h-full ${index === 0 ? "scroll-mt-8" : ""}`}
      id={index === 0 ? "first-project" : undefined}
    >
      <article aria-labelledby={titleId} className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-accent/30 focus-within:border-accent/40">
        {/* Image / Interactive preview area */}
        <div
          className={`${DemoComponent ? "bg-muted/30" : ""} relative flex h-[440px] shrink-0 items-center justify-center overflow-hidden p-4 sm:h-[460px] sm:p-5`}
        >
          {DemoComponent ? (
            <div className="relative flex h-full min-w-0 w-full items-center justify-center" role="group" aria-label={`${project.title} interactive preview`}>
              {!near ? (
                <DemoSkeleton width={useResponsiveShell ? 500 : shellWidth} height={useResponsiveShell ? 265 : shellHeight} />
              ) : useResponsiveShell ? (
                <div className="w-full min-w-0">
                  <ResponsiveAppShell
                    allowToggle
                    label={project.title}
                    desktopWidth={500}
                    desktopHeight={265}
                    mobileWidth={shellWidth}
                    mobileHeight={shellHeight}
                  >
                    <Suspense fallback={<DemoSkeleton width={500} height={265} />}>
                      <DemoComponent />
                    </Suspense>
                  </ResponsiveAppShell>
                </div>
              ) : (
                <div
                  className="rounded-[2rem] border-[3px] border-foreground/20 bg-background shadow-2xl overflow-hidden"
                  style={{ width: shellWidth }}
                >
                  <div className="bg-foreground/10 h-5 flex items-center justify-center shrink-0">
                    <div className="w-14 h-1 rounded-full bg-foreground/20" />
                  </div>
                  <div
                    className="relative overflow-y-auto"
                    style={{ height: shellHeight, WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    <Suspense fallback={<DemoSkeleton width={shellWidth} height={shellHeight} />}>
                      <DemoComponent />
                    </Suspense>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img
              src={project.image}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              width={dims?.width ?? 1200}
              height={dims?.height ?? 750}
              alt={`UX case study: ${project.title} by Huruy Kidanemariam`}
              className={`transition-transform duration-500 group-hover:scale-105 ${
                project.image.includes("hero-mockup") ? "h-[115%] w-auto object-contain drop-shadow-xl" : "w-full h-full object-cover"
              }`}
            />
          )}
        </div>

        {/* Text content */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="line-clamp-1 text-xs font-semibold text-accent">{project.impact}</span>
            {project.gated && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                <Lock className="h-3 w-3" aria-hidden="true" /> By request
              </span>
            )}
          </div>
          <h3 id={titleId} className="mb-2 min-h-7 text-xl font-bold leading-7">{project.title}</h3>
          <p className="mb-5 line-clamp-3 text-sm leading-5 text-muted-foreground">{project.description}</p>

          {project.keyResults && (
            <dl className="mb-5 grid grid-cols-1 gap-3 border-l-2 border-accent/30 pl-4 sm:grid-cols-3">
              {project.keyResults.map((result) => (
                <div key={result.label}>
                  <dd className="text-base font-bold leading-5 text-accent">{result.value}</dd>
                  <dt className="mt-1 text-xs leading-4 text-muted-foreground">{result.label}</dt>
                </div>
              ))}
            </dl>
          )}
          <ul className="mb-5 mt-auto flex flex-wrap gap-2" aria-label="Project topics">
            {project.tags.slice(0, 3).map((tag) => (
              <li key={tag}><Badge variant="secondary" className="text-xs font-normal">{tag}</Badge></li>
            ))}
          </ul>

          <Button asChild className="min-h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to={`/project/${project.id}`} aria-label={`${project.gated ? "Preview" : "View"} ${project.title} case study`}>
              {project.gated ? "Preview case study" : "View case study"} <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
          {project.appStoreUrl && (
            <Button asChild variant="secondary" className="mt-3 min-h-11 w-full">
              <a
                href={getAppStoreUrl(project.appStoreUrl, "homepage_card")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${project.title} on the App Store`}
                onClick={() => trackAppStoreClick("homepage_card")}
              >
                <AppleLogo className="h-5 w-5" />
                <span className="whitespace-nowrap text-sm font-semibold">Available on the App Store</span>
              </a>
            </Button>
          )}
        </div>
      </article>
    </motion.div>
  );
};

export default ProjectCard;
