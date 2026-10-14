import { Quote } from "lucide-react";
import CaseStudySection from "./CaseStudySection";
import { Wide } from "./primitives";
import { testimonialsFor } from "@/lib/testimonials";

/**
 * "What collaborators said" for one case study. Renders nothing until a real quote
 * with this projectId exists in src/lib/testimonials.ts.
 */
const ProjectQuotes = ({ projectId }: { projectId: string }) => {
  const quotes = testimonialsFor(projectId);
  if (quotes.length === 0) return null;
  return (
    <CaseStudySection label="What Collaborators Said" title="From the people in the room">
      <Wide>
        <div className={`grid gap-px overflow-hidden rounded-xl border border-border bg-border ${quotes.length > 1 ? "md:grid-cols-2" : ""} ${quotes.length > 2 ? "lg:grid-cols-3" : ""}`}>
          {quotes.map((t) => (
            <figure key={t.name + t.role} className="flex h-full flex-col gap-5 bg-background p-6 lg:p-8">
              <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
              <blockquote className="flex-1 text-[17px] leading-7 text-foreground">{t.quote}</blockquote>
              <figcaption className="text-sm">
                {t.name && (
                  <span className="block font-semibold text-foreground">
                    {t.url ? <a href={t.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{t.name}</a> : t.name}
                  </span>
                )}
                <span className="text-muted-foreground">{t.role}, {t.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Wide>
    </CaseStudySection>
  );
};

export default ProjectQuotes;
