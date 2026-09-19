import { Link } from "react-router-dom";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/lib/projects";
import { imageDimensions } from "@/lib/imageDimensions";

/**
 * Compact project card: cover, title, one outcome, one link. The whole card is
 * the link. Interactive demos live inside the case studies, once.
 */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const dims = imageDimensions[project.image];
  const outcome = project.keyResults?.[0];

  return (
    <Link
      to={`/project/${project.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${project.title}: ${outcome ? `${outcome.value} ${outcome.label}` : project.impact}`}
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={project.image}
          alt=""
          width={dims?.width ?? 1200}
          height={dims?.height ?? 750}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1 flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">{project.impact}</span>
          {project.gated && (
            <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <Lock className="h-3 w-3" aria-hidden="true" /> Full study by request
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold leading-7 font-display">{project.title}</h3>
        {outcome && (
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{outcome.value}</span> {outcome.label}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          Read the case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
