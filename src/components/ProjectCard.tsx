import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import type { Project } from "@/lib/projects";
import { imageDimensions } from "@/lib/imageDimensions";

/**
 * Homepage work card: a large cover, then "Title, Client | headline result" and a
 * few scannable tags. The whole card is the link.
 */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const dims = imageDimensions[project.image];
  const outcome = project.keyResults?.[0];
  const tags = project.cardTags ?? project.tags.slice(0, 3);

  return (
    <Link
      to={`/project/${project.id}`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      aria-label={`${project.title}${project.client ? `, ${project.client}` : ""}: ${outcome ? `${outcome.value} ${outcome.label}` : project.impact}`}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <img
          src={project.image}
          alt=""
          width={dims?.width ?? 1200}
          height={dims?.height ?? 750}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="pt-4">
        <p className="text-[17px] leading-snug">
          <span className="font-medium text-foreground">{project.title}</span>
          {project.client && <span className="text-muted-foreground">, {project.client}</span>}
        </p>
        {outcome && (
          <p className="mt-1 text-[15px] text-muted-foreground">
            {outcome.value} {outcome.label}
          </p>
        )}
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
          {tags.map((t) => (
            <li key={t} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {t}
            </li>
          ))}
          {project.gated && (
            <li className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              <Lock className="h-3 w-3" aria-hidden="true" /> Details by request
            </li>
          )}
        </ul>
      </div>
    </Link>
  );
};

export default ProjectCard;
