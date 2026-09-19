import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { imageDimensions } from "@/lib/imageDimensions";
import AppStorePromoBanner from "@/components/AppStorePromoBanner";
import CaseStudySection from "./CaseStudySection";
import ImageSlot from "./ImageSlot";
import { Callout, NumberedList, StatRow } from "./primitives";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

/**
 * Seven sections, in the order a hiring manager reads them: what shipped, what
 * broke in production, the problem, the research that shaped the design, the
 * product, the test results, and what I'd change. The search demo lives in the
 * page hero, so it is not repeated here.
 */
const EBTFinderCaseStudy = ({ project, getSlotImage }: Props) => (
  <>
    {/* Shipped, with production numbers */}
    {project.shipped && (
      <CaseStudySection label="Shipped" title="From prototype to the App Store">
        <p className="mb-8">{project.shipped.summary}</p>
        {project.shipped.stats && (
          <>
            <StatRow stats={project.shipped.stats} columns={4} />
            <p className="mb-10 mt-4 text-xs text-muted-foreground">
              Sources: {Array.from(new Set(project.shipped.stats.map((s) => s.source))).join(", ")}. Read on 2026-09-18.
            </p>
          </>
        )}
        <dl className="mb-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {project.shipped.facts.map((f) => (
            <div key={f.label} className="border-t border-border pt-3">
              <dt className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{f.label}</dt>
              <dd className="text-[15px] leading-6 text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
        {project.shipped.screens && (
          <div className="mb-10">
            <h3 className="mb-4 font-bold tracking-tight text-foreground font-display">The live app</h3>
            <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4" aria-label="Screens from the shipped EBT Finder app">
              {project.shipped.screens.map((shot) => {
                const dims = imageDimensions[shot.src];
                return (
                  <li key={shot.src} className="w-[240px] shrink-0 snap-start">
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      width={dims?.width}
                      height={dims?.height}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full rounded-xl border border-border"
                    />
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{shot.caption}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <AppStorePromoBanner project={project} placement="case_study_shipped" />
      </CaseStudySection>
    )}

    {/* What running it taught me */}
    {project.shipped?.postLaunch && (
      <CaseStudySection label="Running It" title="What broke after launch, and what I did about it">
        <p className="mb-8">
          A prototype never meets a changed API, an App Review rejection or a user with one bar of signal. The product did. These are the problems that mattered, each with the decision behind the fix.
        </p>
        <ol className="list-none border-t border-border divide-y divide-border">
          {project.shipped.postLaunch.map((item, i) => (
            <li key={item.title} className="py-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid gap-3 sm:grid-cols-[3.5rem_1fr]"
              >
                <span className="text-sm font-semibold tabular-nums text-accent sm:pt-1" aria-hidden="true">0{i + 1}</span>
                <div className="min-w-0">
                  <h3 className="mb-3 text-lg font-bold tracking-tight text-foreground font-display">{item.title}</h3>
                  <dl className="max-w-[64ch] space-y-2 text-[15px] leading-6">
                    <div><dt className="inline font-semibold text-foreground">What happened: </dt><dd className="inline">{item.problem}</dd></div>
                    <div><dt className="inline font-semibold text-foreground">What I did: </dt><dd className="inline">{item.fix}</dd></div>
                    <div><dt className="inline font-semibold text-accent">What it taught me: </dt><dd className="inline">{item.lesson}</dd></div>
                  </dl>
                </div>
              </motion.div>
            </li>
          ))}
        </ol>
      </CaseStudySection>
    )}

    {/* The problem */}
    <CaseStudySection label="The Problem" title="Problem & Context">
      <p className="mb-5">{project.problem}</p>
      {project.problemBullets && (
        <ul className="mb-8 max-w-[64ch] space-y-2">
          {project.problemBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="mt-1.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {project.problemImpact && (
        <Callout label="Impact" className="mb-8">
          <p>{project.problemImpact}</p>
        </Callout>
      )}
      {project.competitiveKeyTakeaways && (
        <p className="mb-8 text-[15px] leading-6">
          <span className="font-semibold text-foreground">Competitive audit</span> (USDA locator, Google Maps, Yelp, Propel): {project.competitiveKeyTakeaways[0].toLowerCase()}.
        </p>
      )}
      <ImageSlot slot="usda-screenshot" label="USDA SNAP Retailer Locator screenshot" imageSrc={getSlotImage("usda-screenshot")} />
    </CaseStudySection>

    {/* Research: what shaped the design */}
    {project.findings && (
      <CaseStudySection label="Research" title="Seven interviews, three findings, five decisions">
        {project.interviews && <p className="mb-8">{project.interviews}</p>}
        <div className="mb-12 grid gap-x-8 gap-y-8 md:grid-cols-3">
          {project.findings.map((f, i) => (
            <div key={i} className="border-t border-border pt-5">
              <h3 className="mb-3 font-bold tracking-tight text-foreground font-display">{f.title}</h3>
              <blockquote className="mb-3 border-l-2 border-accent pl-4 text-[15px] italic leading-6 text-foreground">"{f.quote}"</blockquote>
              {f.insight && <p className="text-sm leading-6">{f.insight}</p>}
            </div>
          ))}
        </div>
        {project.researchToDesign && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <caption className="mb-4 text-left font-bold tracking-tight text-foreground font-display">What users said, and what it became</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">User need</th>
                  <th scope="col" className="py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Design decision</th>
                </tr>
              </thead>
              <tbody>
                {project.researchToDesign.map((r, i) => (
                  <tr key={i} className="border-b border-border/60 align-top">
                    <td className="py-3 pr-4 italic">{r.need}</td>
                    <td className="py-3 text-foreground">{r.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <ImageSlot slot="wireframes" label="Annotated wireframes mapping research to features" imageSrc={getSlotImage("wireframes")} />
      </CaseStudySection>
    )}

    {/* The product */}
    {project.solutionFeatures && (
      <CaseStudySection label="The Solution" title="What I built">
        <p className="mb-10 text-base">The search and filter flow is the interactive prototype at the top of this page. The features below are what turn a search result into a store a person will actually walk into.</p>
        <div className="space-y-12">
          {project.solutionFeatures.map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="border-t border-border pt-8">
              <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground font-display">{i + 1}. {feat.title}</h3>
              <p className="mb-4 max-w-[64ch]">{feat.description}</p>
              <ImageSlot slot={feat.imageSlot} label={feat.title} imageSrc={getSlotImage(feat.imageSlot)} />
              {feat.details.length > 0 && (
                <ul className="mt-4 max-w-[64ch] space-y-1 text-[15px]">
                  {feat.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 max-w-[64ch] text-[15px] leading-6"><strong className="text-accent">Why it matters:</strong> {feat.whyItMatters}</p>
            </motion.div>
          ))}
        </div>
      </CaseStudySection>
    )}

    {/* Prototype validation */}
    {project.validationMetrics && (
      <CaseStudySection label="Validation" title="Prototype testing results">
        <p className="mb-8">
          Before writing production code, I ran moderated usability tests with 10 participants, each asked to find a hot food location near them in EBT Finder and in the USDA locator. These are the only numbers behind EBT Finder, and they all come from that session.
        </p>
        <StatRow stats={project.validationMetrics} columns={4} />
      </CaseStudySection>
    )}

    {/* Learnings and hindsight */}
    {project.learnings && (
      <CaseStudySection label="Learnings" title="What I learned, and what I'd change">
        <NumberedList items={project.learnings} />
        {project.whatIdDoDifferently && (
          <>
            <h3 className="mb-4 mt-12 text-xl font-bold tracking-tight text-foreground font-display">What I'd do differently</h3>
            <NumberedList items={project.whatIdDoDifferently} tone="muted" />
          </>
        )}
      </CaseStudySection>
    )}
  </>
);

export default EBTFinderCaseStudy;
