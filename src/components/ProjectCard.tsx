import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import type { Project } from "@/lib/projects";
import { imageDimensions } from "@/lib/imageDimensions";

/**
 * Homepage work card: a large cover, then "Title, Client | headline result" and a
 * few scannable tags. The whole card is the link.
 */
/** `wide`: spans the whole grid row, cover beside the text (used for an odd last card). */
const ProjectCard = ({ project, index, fintechContext, wide = false }: { project: Project; index: number; fintechContext?: string; wide?: boolean }) => {
  const cover = project.cardImage ?? project.image;
  const dims = imageDimensions[cover];
  const outcome = project.keyResults?.[0];
  const tags = project.cardTags ?? project.tags.slice(0, 3);

  return (
    <Link
      to={`/project/${project.id}`}
      className={`group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background ${fintechContext ? "h-full border border-border p-6 lg:p-8" : ""} ${wide ? "md:col-span-2 md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-16" : ""}`}
      aria-label={`${project.title}${project.client ? `, ${project.client}` : ""}: ${outcome ? `${outcome.value} ${outcome.label}` : project.impact}`}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <img
          src={cover}
          alt=""
          width={dims?.width ?? 1600}
          height={dims?.height ?? 1200}
          loading={index < 2 ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className={wide ? "pt-4 md:pt-0" : "pt-4"}>
        {fintechContext ? <h3 className="text-[17px] font-medium leading-snug text-foreground">{project.title}</h3> : <p className="text-[17px] leading-snug">
          <span className="font-medium text-foreground">{project.title}</span>
          {project.client && <span className="text-muted-foreground">, {project.client}</span>}
        </p>}
        {fintechContext ? <p className="mt-1 text-[15px] text-muted-foreground">{project.impact}</p> : outcome && (
          <p className="mt-1 text-[15px] text-muted-foreground">
            {outcome.value} {outcome.label}
          </p>
        )}
        {wide && !fintechContext && <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">{project.description}</p>}
        {fintechContext && (
          <>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{project.description}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground">{fintechContext}</p>
          </>
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
