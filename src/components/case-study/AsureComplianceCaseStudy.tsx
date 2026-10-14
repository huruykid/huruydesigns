import CaseStudySection from "./CaseStudySection";
import AsureConfigDemo from "./AsureConfigDemo";
import ResponsiveAppShell from "./ResponsiveAppShell";
import { EntityDiagram, StateMachineDiagram } from "./AsureDiagrams";
import { Caption, Full, NumberedList, Wide } from "./primitives";
import AsureBeforeAfter from "./AsureBeforeAfter";
import ProjectQuotes from "./ProjectQuotes";
import { Project } from "@/lib/projects";
import type { AsureGatedContent } from "@/lib/gatedContent";

interface Props {
  project: Project;
  /** Public case study narrative. */
  content: AsureGatedContent;
}

/**
 * Rendered with the same unboxed primitives as the other case studies:
 * hairlines, numbers and a reading column, no icon cards or coloured boxes.
 */

const typeClass = (type: string) =>
  type === "Hard Stop"
    ? "text-destructive ring-destructive/40"
    : type === "Warning"
    ? "text-amber-700 ring-amber-500/50 dark:text-amber-400"
    : "text-foreground ring-border";

/** Short titled points in a hairline grid. */
const PointGrid = ({ items, columns = 2 }: { items: { title: string; body: string }[]; columns?: 2 | 3 }) => (
  <dl className={`grid gap-x-8 gap-y-6 ${columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}>
    {items.map((it) => (
      <div key={it.title} className="border-t border-border pt-4">
        <dt className="mb-1 text-[15px] font-semibold text-foreground">{it.title}</dt>
        <dd className="text-[15px] leading-6">{it.body}</dd>
      </div>
    ))}
  </dl>
);

/** Label on the left, text on the right. */
const Rows = ({ items }: { items: { label: string; text: string }[] }) => (
  <dl className="divide-y divide-border border-y border-border">
    {items.map((r) => (
      <div key={r.label + r.text} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
        <dt className="text-sm font-semibold text-foreground">{r.label}</dt>
        <dd className="text-[15px] leading-6">{r.text}</dd>
      </div>
    ))}
  </dl>
);

const AsureComplianceCaseStudy = ({ project, content }: Props) => (
  <>
    <CaseStudySection label="Context" title="An engine hidden behind legacy abstraction">
      {content.context.map((p, i) => (
        <p key={p} className={i === content.context.length - 1 ? "mb-8" : "mb-4"}>{p}</p>
      ))}
      <Wide>
        <EntityDiagram />
      </Wide>
    </CaseStudySection>

    <CaseStudySection label="The Problem" title="The brief was to redesign screens. The real problem was elsewhere.">
      {content.problem.map((p, i) => (
        <p key={i} className={i === content.problem.length - 1 ? "mb-8" : "mb-4"}>{p}</p>
      ))}
      <Wide className="mb-12">
        <PointGrid items={content.problemCards} columns={3} />
      </Wide>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">What each audience needed</p>
      <Rows items={content.audienceNeeds.map((a) => ({ label: a.role, text: a.need }))} />
    </CaseStudySection>

    <CaseStudySection label="My Role" title="Embedded, cross-functional, onsite in Dallas.">
      {content.role.map((p, i) => (
        <p key={i} className={i === content.role.length - 1 ? "mb-8" : "mb-4"}>{p}</p>
      ))}
      {content.onsitePhoto && (
        <figure className="cs-wide mb-10">
          <div className="aspect-[16/7] overflow-hidden rounded-xl border border-border">
            <img
              src={content.onsitePhoto.src}
              alt={content.onsitePhoto.alt}
              width={1600}
              height={700}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[center_25%]"
            />
          </div>
          <figcaption>
            <Caption>{content.onsitePhoto.caption}</Caption>
          </figcaption>
        </figure>
      )}
      <NumberedList items={content.roleItems} />
    </CaseStudySection>

    <CaseStudySection label="Decisions" title="Four changes that made configuration predictable">
      <p className="mb-8">{content.contributionsIntro}</p>
      <ol className="cs-full cs-flow list-none gap-y-0">
        {content.coreContributions.map((c, i) => (
          <li key={c.letter} className="cs-flow cs-full border-t border-border py-10">
            <div className="grid gap-3 sm:grid-cols-[3.5rem_1fr]">
              <span className="text-sm font-semibold tabular-nums text-accent sm:pt-1" aria-hidden="true">0{i + 1}</span>
              <div className="min-w-0">
                <h3 className="mb-1 font-display text-lg font-bold tracking-tight text-foreground">{c.title}</h3>
                <p className="mb-6 max-w-[64ch] text-sm">{c.subtitle}</p>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Before</p>
                    <ul className="divide-y divide-border border-y border-border text-[15px] leading-6">
                      {c.problemPoints.map((p) => <li key={p} className="py-2">{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">After</p>
                    <ul className="divide-y divide-border border-y border-border text-[15px] leading-6 text-foreground">
                      {c.solutionPoints.map((p) => <li key={p} className="py-2">{p}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {c.letter === "B" && <div className="cs-wide mt-8"><StateMachineDiagram /></div>}

            {c.letter === "C" && (
              <div className="cs-wide mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Validation rules</p>
                {/* Phones: each rule reads as a short stack, so nothing scrolls sideways. */}
                <ul className="divide-y divide-border border-y border-border sm:hidden">
                  {content.validationMatrix.map((row) => (
                    <li key={row.condition} className="space-y-1.5 py-3 text-[15px] leading-6">
                      <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${typeClass(row.type)}`}>{row.type}</span>
                      <p className="font-medium text-foreground">{row.condition}</p>
                      <p>{row.behavior}</p>
                    </li>
                  ))}
                </ul>
                <table className="hidden w-full border-collapse text-left text-[15px] leading-6 sm:table">
                  <thead>
                    <tr className="border-b border-border text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      <th scope="col" className="py-3 pr-6 font-semibold">Condition</th>
                      <th scope="col" className="py-3 pr-6 font-semibold">Field behavior</th>
                      <th scope="col" className="py-3 font-semibold">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.validationMatrix.map((row) => (
                      <tr key={row.condition} className="border-b border-border/60 align-top">
                        <td className="py-3 pr-6 font-medium text-foreground">{row.condition}</td>
                        <td className="py-3 pr-6">{row.behavior}</td>
                        <td className="py-3">
                          <span className={`inline-flex whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ${typeClass(row.type)}`}>{row.type}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </li>
        ))}
      </ol>
    </CaseStudySection>

    <CaseStudySection label="Before & After" title="Editing a tax rate, before and after">
      <p className="mb-8">The same task on the legacy screen and on the redesign. Three changes did most of the work.</p>
      <AsureBeforeAfter />
    </CaseStudySection>

    <CaseStudySection label="Designing for Intuition" title="Translating regulatory logic into human mental models">
      <p className="mb-8">{content.intuitionIntro}</p>
      <Wide className="mb-12">
        <PointGrid items={content.intuitionCards} />
      </Wide>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Legacy to redesign</p>
      <dl className="divide-y divide-border border-y border-border">
        {content.transformations.map((t) => (
          <div key={t.from} className="grid gap-1 py-3 text-[15px] leading-6 sm:grid-cols-[1fr_1.5rem_1fr] sm:items-baseline sm:gap-3">
            <dt className="text-muted-foreground line-through decoration-border">{t.from}</dt>
            <span className="hidden text-muted-foreground sm:block" aria-hidden="true">→</span>
            <dd className="font-medium text-foreground">{t.to}</dd>
          </div>
        ))}
      </dl>
    </CaseStudySection>

    <CaseStudySection label="Interactive Prototype" title="Change a rate, the way an admin would">
      <p className="mb-3">
        A recreation of the configuration workflow, built to show the four decisions above working together. Try it in this order:
      </p>
      <ol className="mb-8 list-decimal space-y-1 pl-5">
        <li>The tree is the entity model: agency, tax code, then its formula, filing frequencies, payee and holiday calendar.</li>
        <li>On CA-SDI, change the rate. Past 25% from the released value you get a warning to confirm; past the jurisdiction maximum, a hard stop with the rule.</li>
        <li>Save the draft and read the impact before it saves, then take it through review, lock and release. Every step lands in History.</li>
      </ol>
      <Full>
        <ResponsiveAppShell label="Compliance Engine · tax code configuration" allowToggle minDesktopWidth={640} desktopHeight={640} mobileWidth={340} mobileHeight={640}>
          <AsureConfigDemo />
        </ResponsiveAppShell>
        <Caption center>Recreated with sample data to show the design decisions. Agencies are real jurisdictions; rates, counts and people are not. Not Asure's production UI.</Caption>
      </Full>
    </CaseStudySection>

    <CaseStudySection label="Collaboration" title="Three disciplines. One shared mental model.">
      {content.collaboration.map((p, i) => (
        <p key={i} className={i === content.collaboration.length - 1 ? "mb-8" : "mb-4"}>{p}</p>
      ))}
      <Wide>
        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-3">
          {content.collaborators.map((col) => (
            <div key={col.group} className="border-t border-border pt-4">
              <h3 className="mb-3 text-[15px] font-semibold text-foreground">{col.group}</h3>
              <ul className="space-y-2 text-[15px] leading-6">
                {col.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Wide>
    </CaseStudySection>

    <ProjectQuotes projectId={project.id} />

    <CaseStudySection label="Outcome" title="No silent changes, and an audit-ready lifecycle">
      <p className="mb-8">{content.impactIntro}</p>
      <Wide>
        <PointGrid items={content.impactItems} />
      </Wide>
    </CaseStudySection>

    {content.learnings.length > 0 && (
      <CaseStudySection label="What I Learned" title="The biggest deliverable was a conversation">
        <NumberedList items={content.learnings} />
      </CaseStudySection>
    )}
  </>
);

export default AsureComplianceCaseStudy;
