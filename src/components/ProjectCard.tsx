import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BenefitsModuleDemo from "@/components/case-study/BenefitsModuleDemo";
import EBTSearchDemo from "@/components/case-study/EBTSearchDemo";
import BelesMatchDemo from "@/components/case-study/BelesMatchDemo";
import TaxComplianceDashboardDemo from "@/components/case-study/TaxComplianceDashboardDemo";
import ResponsiveAppShell from "@/components/case-study/ResponsiveAppShell";
import type { Project } from "@/lib/projects";
import type { ComponentType } from "react";
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

const ProjectCard = ({ project, index, featured }: { project: Project; index: number; featured?: boolean }) => {
  const DemoComponent = demoComponents[project.id];
  const useResponsiveShell = DemoComponent && responsiveProjects.has(project.id);
  const reverseLayout = featured && project.id === "asure-compliance";
  const shellWidth = featured ? 240 : 220;
  const shellHeight = featured ? 400 : 380;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      
      className={index === 0 ? "scroll-mt-8" : ""}
      id={index === 0 ? "first-project" : undefined}
    >
      <Link to={`/project/${project.id}`} className="group block">
        <div className={`rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-accent/30 h-full flex flex-col ${featured ? (reverseLayout ? 'md:flex-row-reverse md:items-stretch' : 'md:flex-row md:items-stretch') : ''}`}>
          
          {/* Image / Interactive preview area */}
          <div
            className={`${featured ? 'md:w-3/5' : ''} ${DemoComponent ? 'flex items-center justify-center bg-muted/30 py-6' : 'aspect-[16/10]'} relative overflow-hidden flex items-center justify-center`}
            style={{
              background: !DemoComponent && project.image.includes("hero-mockup") && !project.image.includes("ebtfinder")
                ? "linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted) / 0.6) 100%)"
                : undefined,
            }}
          >
            {DemoComponent ? (
              <div className="relative pointer-events-auto flex flex-col items-center gap-3" onClick={(e) => e.preventDefault()}>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent tracking-wide uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  Interactive Preview
                </span>
                {useResponsiveShell ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    <ResponsiveAppShell
                      allowToggle
                      desktopWidth={featured ? 540 : 380}
                      desktopHeight={featured ? 440 : 520}
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
                      onClick={(e) => e.stopPropagation()}
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
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-accent text-accent-foreground rounded-full p-2">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className={`p-6 flex flex-col ${featured ? 'md:w-2/5 md:justify-center md:p-10' : 'flex-1'}`}>
            <span className={`inline-block font-semibold text-accent mb-2 ${featured ? 'text-sm bg-accent/10 px-2 py-0.5 rounded-full' : 'text-xs'}`}>{project.impact}</span>
            <h3 className={`font-bold mb-2 ${featured ? 'text-2xl' : 'text-lg'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
            <p className={`text-muted-foreground ${featured ? 'text-lg mb-4' : 'text-sm line-clamp-2 mb-4'}`}>{project.description}</p>
            {featured && (
              <p className="text-sm text-muted-foreground mb-4">{project.role}</p>
            )}
            {project.keyResults && (
              <div className={`grid grid-cols-3 gap-2 rounded-lg border border-accent/20 bg-accent/5 p-3 ${featured ? 'mb-4' : 'mb-4'}`}>
                {project.keyResults.map((r) => (
                  <div key={r.label} className="text-center">
                    <p className={`font-bold text-accent leading-tight ${featured ? 'text-lg' : 'text-base'}`}>{r.value}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{r.label}</p>
                  </div>
                ))}
              </div>
            )}
            <div className={`flex flex-wrap gap-1.5 ${featured ? 'mt-2' : 'mt-auto'}`}>
              {project.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
              ))}
            </div>
            {project.appStoreUrl && (
              <button
                type="button"
                aria-label="Download EBT Finder on the App Store"
                className="mt-3 inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-foreground px-3.5 py-2 text-background transition-opacity hover:opacity-90 cursor-pointer sm:w-fit sm:justify-start"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  trackAppStoreClick("homepage_card");
                  window.open(getAppStoreUrl(project.appStoreUrl!, "homepage_card"), "_blank", "noopener,noreferrer");
                }}
              >
                <AppleLogo className="h-5 w-5" />
                <span className="whitespace-nowrap text-sm font-semibold">Available on the App Store</span>
              </button>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
