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
  const shellWidth = featured ? 240 : 220;
  const shellHeight = featured ? 400 : 380;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/project/${project.id}`} className="group block">
        <div className={`rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-accent/30 h-full flex flex-col ${featured ? 'md:flex-row md:items-stretch' : ''}`}>
          
          {/* Image / Interactive preview area */}
          <div
            className={`${featured ? 'md:w-3/5' : ''} ${DemoComponent ? 'flex items-center justify-center bg-muted/30 py-8' : 'aspect-[16/10]'} relative overflow-hidden flex items-center justify-center`}
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
                      desktopWidth={featured ? 480 : 380}
                      desktopHeight={featured ? 400 : 520}
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
                alt={project.title}
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
          <div className={`p-5 flex flex-col ${featured ? 'md:w-2/5 md:justify-center md:p-8' : 'flex-1'}`}>
            <p className="text-xs font-semibold text-accent mb-1">{project.impact}</p>
            <h3 className={`font-bold mb-1 ${featured ? 'text-2xl' : 'text-lg'}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
            <p className={`text-muted-foreground mb-3 ${featured ? 'text-base' : 'text-sm line-clamp-2'}`}>{project.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {project.tags.slice(0, featured ? 6 : 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
