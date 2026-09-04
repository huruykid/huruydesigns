import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import BenefitsModuleDemo from "@/components/case-study/BenefitsModuleDemo";
import EBTSearchDemo from "@/components/case-study/EBTSearchDemo";
import BelesMatchDemo from "@/components/case-study/BelesMatchDemo";
import TaxComplianceDashboardDemo from "@/components/case-study/TaxComplianceDashboardDemo";
import ResponsiveAppShell from "@/components/case-study/ResponsiveAppShell";
import type { Project } from "@/lib/projects";
import { useId, useState, type ComponentType } from "react";
import { getAppStoreUrl, trackAppStoreClick } from "@/lib/analytics";

const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const demoComponents: Record<string, ComponentType> = {
  "oneasure-portal": BenefitsModuleDemo,
  "ebtfinder": EBTSearchDemo,
  "beles": BelesMatchDemo,
  "asure-compliance": TaxComplianceDashboardDemo,
};

const responsiveProjects = new Set(["oneasure-portal", "asure-compliance"]);

const ProjectCard = ({ project, index }: { project: Project; index: number; featured?: boolean }) => {
  const DemoComponent = demoComponents[project.id];
  const useResponsiveShell = DemoComponent && responsiveProjects.has(project.id);
  const shellWidth = 220;
  const shellHeight = 340;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const titleId = useId();
  const detailsId = useId();

  return (
    <motion.div
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
            className={`${DemoComponent ? 'bg-muted/30' : ''} relative flex h-[400px] shrink-0 items-center justify-center overflow-hidden p-4 sm:h-[420px] sm:p-5`}
            style={{
              background: !DemoComponent && project.image.includes("hero-mockup") && !project.image.includes("ebtfinder")
                ? "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.6) 100%)"
                : undefined,
            }}
          >
            {DemoComponent ? (
              <div className="relative flex h-full min-w-0 w-full items-center justify-center" role="group" aria-label={`${project.title} interactive preview`}>
                {useResponsiveShell ? (
                  <div className="w-full min-w-0">
                    <ResponsiveAppShell
                      allowToggle
                      label={project.title}
                      desktopWidth={500}
                      desktopHeight={330}
                      mobileWidth={shellWidth}
                      mobileHeight={shellHeight}
                    >
                      <DemoComponent />
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
                      style={{
                        height: shellHeight,
                        WebkitOverflowScrolling: "touch",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      <DemoComponent />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <img
                src={project.image}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                width={1200}
                height={750}
                alt={`UX case study: ${project.title} by Huruy Kidanemariam`}

                className={`transition-transform duration-500 group-hover:scale-105 ${
                  project.image === "/placeholder.svg"
                    ? "w-full h-full object-cover"
                    : project.image.includes("hero-mockup")
                    ? "h-[115%] w-auto object-contain drop-shadow-xl"
                    : "w-full h-full object-cover"
                }`}
              />
            )}
          </div>

          {/* Text content */}
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <span className="mb-2 line-clamp-1 text-xs font-semibold text-accent">{project.impact}</span>
            <h3 id={titleId} className="mb-2 min-h-7 text-xl font-bold leading-7">{project.title}</h3>
            <p className="mb-5 min-h-[3.75rem] line-clamp-3 text-sm leading-5 text-muted-foreground">{project.description}</p>

            <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen} className="mt-auto">
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="min-h-11 w-full justify-between" aria-controls={detailsId}>
                  View details
                  <ChevronDown className={`transition-transform ${detailsOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent id={detailsId} className="pt-4">
                {project.keyResults && (
                  <dl className="grid grid-cols-1 gap-3 border-l-2 border-accent/30 pl-4 sm:grid-cols-3">
                    {project.keyResults.map((result) => (
                      <div key={result.label}>
                        <dt className="text-xs leading-4 text-muted-foreground">{result.label}</dt>
                        <dd className="mt-1 text-base font-bold leading-5 text-accent">{result.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="mt-4 flex flex-wrap gap-2" aria-label="Project topics">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button asChild className="mt-3 min-h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to={`/project/${project.id}`} aria-label={`View ${project.title} case study`}>
                View case study <ArrowUpRight aria-hidden="true" />
              </Link>
            </Button>
            {project.appStoreUrl && (
              <Button
                variant="secondary"
                aria-label="Download EBT Finder on the App Store"
                className="mt-3 min-h-11 w-full"
                onClick={() => {
                  trackAppStoreClick("homepage_card");
                  if (project.appStoreUrl) {
                    window.open(getAppStoreUrl(project.appStoreUrl, "homepage_card"), "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <AppleLogo className="h-5 w-5" />
                <span className="whitespace-nowrap text-sm font-semibold">Available on the App Store</span>
              </Button>
            )}
          </div>
      </article>
    </motion.div>
  );
};

export default ProjectCard;
