import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, ChevronRight, MessageSquareQuote, Rocket, BarChart3, Smartphone, Wrench } from "lucide-react";
import { imageDimensions } from "@/lib/imageDimensions";
import AppStorePromoBanner from "@/components/AppStorePromoBanner";
import { Card, CardContent } from "@/components/ui/card";
import CaseStudySection from "./CaseStudySection";
import ImageSlot from "./ImageSlot";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

/**
 * Six sections, in the order a hiring manager reads them: what shipped, what
 * broke in production, the problem, the research that shaped the design, the
 * product, the test results, and what I'd change. The search demo lives in the
 * page hero, so it is not repeated here.
 */
const EBTFinderCaseStudy = ({ project, getSlotImage }: Props) => (
  <>
    {/* Shipped, with production numbers */}
    {project.shipped && (
      <CaseStudySection label="Shipped" title="From prototype to the App Store" icon={<Smartphone className="h-4 w-4" />}>
        <p className="mb-6">{project.shipped.summary}</p>
        {project.shipped.stats && (
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2">
            {project.shipped.stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-accent/30 bg-accent/5 p-4 text-center">
                <dd className="text-2xl sm:text-3xl font-bold text-accent mb-1">{s.value}</dd>
                <dt className="text-xs font-semibold text-foreground">{s.label}</dt>
              </div>
            ))}
          </dl>
        )}
        {project.shipped.stats && (
          <p className="text-xs text-muted-foreground mb-8">
            Sources: {Array.from(new Set(project.shipped.stats.map((s) => s.source))).join(", ")}. Read on 2026-09-18.
          </p>
        )}
        <dl className="grid sm:grid-cols-2 gap-4 mb-8">
          {project.shipped.facts.map((f) => (
            <div key={f.label} className="rounded-lg border border-border bg-card/50 p-4">
              <dt className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">{f.label}</dt>
              <dd className="text-sm text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
        {project.shipped.screens && (
          <div className="mb-8">
            <h3 className="font-bold text-foreground mb-3">The live app</h3>
            <ul className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4" aria-label="Screens from the shipped EBT Finder app">
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
                      className="w-full h-auto rounded-xl border border-border"
                    />
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{shot.caption}</p>
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
      <CaseStudySection label="Running It" title="What broke after launch, and what I did about it" icon={<Wrench className="h-4 w-4" />}>
        <p className="mb-6">
          A prototype never meets a changed API, an App Review rejection or a user with one bar of signal. The product did. These are the problems that mattered, each with the decision behind the fix.
        </p>
        <div className="space-y-4">
          {project.shipped.postLaunch.map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-accent font-bold">0{i + 1}</span>
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                  </div>
                  <dl className="space-y-2 text-sm">
                    <div><dt className="inline font-semibold text-foreground">What happened: </dt><dd className="inline">{item.problem}</dd></div>
                    <div><dt className="inline font-semibold text-foreground">What I did: </dt><dd className="inline">{item.fix}</dd></div>
                    <div><dt className="inline font-semibold text-accent">What it taught me: </dt><dd className="inline text-muted-foreground">{item.lesson}</dd></div>
                  </dl>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CaseStudySection>
    )}

    {/* The problem */}
    <CaseStudySection label="The Problem" title="Problem & Context" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-4">{project.problem}</p>
      {project.problemBullets && (
        <ul className="space-y-2 mb-6">
          {project.problemBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {project.problemImpact && (
        <Card className="border-destructive/30 bg-destructive/5 mb-6">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-destructive uppercase tracking-wide mb-1">Impact</p>
            <p className="text-foreground">{project.problemImpact}</p>
          </CardContent>
        </Card>
      )}
      {project.competitiveKeyTakeaways && (
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">Competitive audit</span> (USDA locator, Google Maps, Yelp, Propel): {project.competitiveKeyTakeaways[0].toLowerCase()}.
        </p>
      )}
      <ImageSlot slot="usda-screenshot" label="USDA SNAP Retailer Locator screenshot" imageSrc={getSlotImage("usda-screenshot")} />
    </CaseStudySection>

    {/* Research: what shaped the design */}
    {project.findings && (
      <CaseStudySection label="Research" title="Seven interviews, three findings, five decisions" icon={<MessageSquareQuote className="h-4 w-4" />}>
        {project.interviews && <p className="mb-6">{project.interviews}</p>}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {project.findings.map((f, i) => (
            <Card key={i} className="border-border bg-muted/30">
              <CardContent className="p-5">
                <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                <blockquote className="border-l-2 border-accent pl-3 text-sm italic mb-3">"{f.quote}"</blockquote>
                {f.insight && <p className="text-sm text-muted-foreground">{f.insight}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
        {project.researchToDesign && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <caption className="text-left font-bold text-foreground mb-3">What users said, and what it became</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="text-left p-3 font-bold text-foreground">User need</th>
                  <th scope="col" className="text-left p-3 font-bold text-foreground">Design decision</th>
                </tr>
              </thead>
              <tbody>
                {project.researchToDesign.map((r, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="p-3 italic">{r.need}</td>
                    <td className="p-3">{r.solution}</td>
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
      <CaseStudySection label="The Solution" title="What I built" icon={<Rocket className="h-4 w-4" />}>
        <p className="mb-8 text-sm text-muted-foreground">The search and filter flow is the interactive prototype at the top of this page. The three features below are what turns a search result into a store a person will actually walk into.</p>
        <div className="space-y-12">
          {project.solutionFeatures.map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-foreground mb-2">{i + 1}. {feat.title}</h3>
              <p className="mb-4">{feat.description}</p>
              <ImageSlot slot={feat.imageSlot} label={feat.title} imageSrc={getSlotImage(feat.imageSlot)} />
              {feat.details.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {feat.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" aria-hidden="true" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-4 text-sm"><strong className="text-accent">Why it matters:</strong> {feat.whyItMatters}</p>
            </motion.div>
          ))}
        </div>
      </CaseStudySection>
    )}

    {/* Prototype validation */}
    {project.validationMetrics && (
      <CaseStudySection label="Validation" title="Prototype testing results" icon={<BarChart3 className="h-4 w-4" />}>
        <p className="mb-6">
          Before writing production code, I ran moderated usability tests with 10 participants, each asked to find a hot food location near them in EBT Finder and in the USDA locator. These are the only numbers behind EBT Finder, and they all come from that session.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {project.validationMetrics.map((m) => (
            <Card key={m.label} className="border-accent/30 bg-accent/5">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-accent mb-1">{m.value}</p>
                <p className="font-semibold text-foreground text-sm mb-1">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CaseStudySection>
    )}

    {/* Learnings and hindsight */}
    {project.learnings && (
      <CaseStudySection label="Learnings" title="What I learned, and what I'd change" icon={<Lightbulb className="h-4 w-4" />}>
        <div className="space-y-4 mb-10">
          {project.learnings.map((l, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
              <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
              <p>{l}</p>
            </div>
          ))}
        </div>
        {project.whatIdDoDifferently && (
          <>
            <h3 className="text-xl font-bold text-foreground mb-4">What I'd do differently</h3>
            <div className="space-y-4">
              {project.whatIdDoDifferently.map((w, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/10 border border-border/50">
                  <span className="text-muted-foreground font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
                  <p>{w}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </CaseStudySection>
    )}
  </>
);

export default EBTFinderCaseStudy;
