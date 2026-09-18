import { motion } from "framer-motion";
import { AlertTriangle, Search, Lightbulb, ChevronRight, Target, Users, MessageSquareQuote, Rocket, Palette, BarChart3, ImageIcon, Heart, Smartphone, Wrench } from "lucide-react";
import { imageDimensions } from "@/lib/imageDimensions";
import AppStorePromoBanner from "@/components/AppStorePromoBanner";
import { Card, CardContent } from "@/components/ui/card";
import CaseStudySection from "./CaseStudySection";
import ImageSlot from "./ImageSlot";
import CompetitiveAuditTable from "./CompetitiveAuditTable";
import ResponsiveAppShell from "./ResponsiveAppShell";
import EBTSearchDemo from "./EBTSearchDemo";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

const EBTFinderCaseStudy = ({ project, getSlotImage }: Props) => (
  <>
    {/* Section 1: Shipped, with production numbers */}
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

    {/* Section 1b: what running it taught me */}
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

    {/* Section 2: Problem & Context */}
    <CaseStudySection label="The Problem" title="Problem & Context" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-4">{project.problem}</p>
      {project.problemBullets && (
        <ul className="space-y-2 mb-6">
          {project.problemBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
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
      <ImageSlot slot="usda-screenshot" label="USDA SNAP Retailer Locator screenshot" imageSrc={getSlotImage("usda-screenshot")} />
      <p className="text-xs text-muted-foreground mt-2 italic">
        "A perfect example of a tool that delivers data but fails in user experience."
      </p>
    </CaseStudySection>

    {/* Insight */}
    {project.insight && (
      <CaseStudySection label="The Insight" title="The opportunity I saw" icon={<Lightbulb className="h-4 w-4" />}>
        <p className="whitespace-pre-line">{project.insight}</p>
      </CaseStudySection>
    )}

    {/* Section 3: Research */}
    {project.competitors && (
      <CaseStudySection label="Research" title="Competitive Analysis" icon={<Search className="h-4 w-4" />}>
        <p className="mb-6">I conducted a deep dive into direct and indirect competitors to understand where the ecosystem was falling short.</p>
        <div className="space-y-4 mb-6">
          {project.competitors.map((c, i) => (
            <Card key={i} className="border-border bg-card/50">
              <CardContent className="p-5">
                <h3 className="font-bold text-foreground mb-1">{c.name}</h3>
                <p>{c.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <CompetitiveAuditTable
          competitors={[
            { name: "EBT Finder", highlight: true },
            { name: "USDA SNAP Locator" },
            { name: "Google Maps" },
            { name: "Fresh EBT (Propel)" },
          ]}
          features={[
            { name: "Mobile-optimized UX", support: [true, false, true, true] },
            { name: "Filter by Hot Food / Grocery Only", support: [true, false, false, false] },
            { name: "User reviews + ratings", support: [true, false, true, false] },
            { name: "Visuals of businesses (via API)", support: [true, false, true, false] },
            { name: "Show only EBT-accepting businesses", support: [true, true, false, true] },
          ]}
        />
        {project.competitiveKeyTakeaways && (
          <div className="mt-6">
            <h3 className="font-bold text-foreground mb-3">Key Takeaways</h3>
            <ul className="space-y-2">
              {project.competitiveKeyTakeaways.map((t, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CaseStudySection>
    )}

    {project.interviews && (
      <CaseStudySection label="User Interviews" title="Hearing from real users" icon={<Users className="h-4 w-4" />}>
        <p className="mb-4">{project.interviews}</p>
        {project.interviewGoals && (
          <div className="mb-6">
            <h3 className="font-bold text-foreground mb-3">Interview Goals</h3>
            <ul className="space-y-2">
              {project.interviewGoals.map((g, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Target className="h-4 w-4 mt-1 text-accent shrink-0" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <ImageSlot slot="ebt-sign" label="SNAP/EBT Accepted sign in store" imageSrc={getSlotImage("ebt-sign")} />
        <p className="text-xs text-muted-foreground mt-2 italic">
          I started with real voices. The interviews showed me what builds trust, what causes friction, and why a sign in the window doesn't always mean a store is accessible or welcoming.
        </p>
      </CaseStudySection>
    )}

    {project.findings && (
      <CaseStudySection label="Key Findings" title="What users told us" icon={<MessageSquareQuote className="h-4 w-4" />}>
        <div className="grid gap-4">
          {project.findings.map((f, i) => (
            <Card key={i} className="border-border bg-muted/30 overflow-hidden">
              <CardContent className="p-6">
                <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Finding {i + 1}</p>
                <h3 className="text-lg font-bold mb-3 text-foreground">{f.title}</h3>
                <blockquote className="border-l-2 border-accent pl-4 italic mb-3">
                  "{f.quote}"
                </blockquote>
                {f.insight && (
                  <div className="bg-accent/5 rounded-lg p-3 border border-accent/20">
                    <p className="text-sm"><strong className="text-accent">Insight:</strong> {f.insight}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </CaseStudySection>
    )}

    {project.researchToDesign && (
      <CaseStudySection label="Translating Research" title="From Research to Features" icon={<Lightbulb className="h-4 w-4" />}>
        <p className="mb-6">Every design decision was backed by user voice, not assumptions.</p>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-bold text-foreground">User Need (Research Finding)</th>
                <th className="text-left p-3 font-bold text-foreground">Design Solution</th>
              </tr>
            </thead>
            <tbody>
              {project.researchToDesign.map((r, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <td className="p-3 italic">{r.need}</td>
                  <td className="p-3">{r.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ImageSlot slot="wireframes" label="Annotated wireframes mapping research to features" imageSrc={getSlotImage("wireframes")} />
      </CaseStudySection>
    )}

    {/* Section 5: The Solution */}
    {project.solutionFeatures && (
      <CaseStudySection label="The Solution" title="What I built" icon={<Rocket className="h-4 w-4" />}>
        {project.goals && (
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {project.goals.map((g, i) => (
              <Card key={i} className="border-border bg-card/50">
                <CardContent className="p-5 flex items-start gap-3">
                  <span className="text-accent font-bold text-lg shrink-0">0{i + 1}</span>
                  <p>{g}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        <div className="space-y-16">
          {project.solutionFeatures.map((feat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-foreground mb-2">{i + 1}. {feat.title}</h3>
              <p className="mb-4">{feat.description}</p>
              
              {feat.imageSlot === "feature-search" ? (
                <div className="my-8 flex justify-center">
                  <ResponsiveAppShell label="EBT Finder Prototype" allowToggle>
                    <EBTSearchDemo />
                  </ResponsiveAppShell>
                </div>
              ) : (
                <ImageSlot slot={feat.imageSlot} label={feat.title} imageSrc={getSlotImage(feat.imageSlot)} />
              )}

              {feat.details.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {feat.details.map((d, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Card className="border-accent/30 bg-accent/5 mt-4">
                <CardContent className="p-4">
                  <p className="text-sm"><strong className="text-accent">Why it matters:</strong> {feat.whyItMatters}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CaseStudySection>
    )}

    {/* Section 6: Design System */}
    {project.designPrinciples && (
      <CaseStudySection label="Design System" title="Visual Design Principles" icon={<Palette className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {project.designPrinciples.map((p, i) => (
            <Card key={i} className="border-border bg-card/50">
              <CardContent className="p-5">
                <h3 className="font-bold text-foreground mb-1">{p.title}</h3>
                <p className="text-sm">{p.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ImageSlot slot="design-system" label="Design system: colors, typography, buttons, icons" imageSrc={getSlotImage("design-system")} />
        {project.userFlow && (
          <div className="mt-10">
            <h3 className="font-bold text-foreground mb-4">User Flow: Search → Filter → Review → Visit</h3>
            <div className="space-y-3">
              {project.userFlow.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="rounded-xl border border-border bg-card/50 p-6 overflow-x-auto">
                <div className="flex items-center gap-0 min-w-[700px]">
                  {[
                    { step: "1", title: "Locate", desc: "Enter location or use GPS", emoji: "📍" },
                    { step: "2", title: "Filter", desc: "Hot Food, Open Now, etc.", emoji: "🔍" },
                    { step: "3", title: "Browse", desc: "View profiles, photos & ratings", emoji: "🏪" },
                    { step: "4", title: "Navigate", desc: "Get directions or save", emoji: "🗺️" },
                    { step: "5", title: "Review", desc: "Leave feedback for others", emoji: "⭐" },
                  ].map((item, i, arr) => (
                    <div key={i} className="flex items-center flex-1">
                      <div className="flex flex-col items-center text-center flex-1">
                        <div className="w-14 h-14 rounded-full bg-accent/15 border-2 border-accent flex items-center justify-center text-2xl mb-2">
                          {item.emoji}
                        </div>
                        <p className="font-bold text-foreground text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[120px]">{item.desc}</p>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-8 h-0.5 bg-accent/40 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CaseStudySection>
    )}

    {/* Section 7: Impact & Validation */}
    {project.validationMetrics && (
      <CaseStudySection label="Impact & Validation" title="Prototype testing results" icon={<BarChart3 className="h-4 w-4" />}>
        <p className="mb-6">
          Before writing any production code, I ran moderated usability tests with 10 participants, each asked to find a hot food location near them in EBT Finder and in the USDA locator. These are the only numbers behind EBT Finder, and they all come from that session.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
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
        <figure className="rounded-xl border border-border bg-card/50 p-6">
          <figcaption className="font-bold text-foreground mb-6 text-center">Time to find a hot food location (median, n=10)</figcaption>
          <div className="space-y-3" role="img" aria-label="EBT Finder: 15 seconds. USDA SNAP locator: 180 seconds.">
            {[
              { label: "EBT Finder", seconds: 15, bar: "bg-accent", text: "text-foreground" },
              { label: "USDA locator", seconds: 180, bar: "bg-muted-foreground/30", text: "text-muted-foreground" },
            ].map((row) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-24 shrink-0">{row.label}</span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${Math.max((row.seconds / 180) * 100, 8)}%` }} />
                </div>
                <span className={`text-xs font-bold w-16 shrink-0 text-right ${row.text}`}>{row.seconds}s</span>
              </div>
            ))}
          </div>
        </figure>
      </CaseStudySection>
    )}

    {/* Section 8: Learnings */}
    {project.learnings && (
      <CaseStudySection label="Learnings" title="What I Learned" icon={<Lightbulb className="h-4 w-4" />}>
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
            <h3 className="text-xl font-bold text-foreground mb-4">What I'd Do Differently</h3>
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

    {/* Section 9: Business Model & Next Steps */}
    {project.businessModel && (
      <CaseStudySection label="Business Model" title="How It Works" icon={<Rocket className="h-4 w-4" />}>
        <p className="mb-6">{project.businessModel}</p>
        {project.businessModelDetails && (
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {project.businessModelDetails.map((d, i) => (
              <Card key={i} className="border-border bg-card/50">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground mb-1">{d.label}</h3>
                  <p className="text-sm">{d.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {project.phasedRoadmap && (
          <>
            <h3 className="text-xl font-bold text-foreground mb-4">What's Next</h3>
            <div className="space-y-4">
              {project.phasedRoadmap.map((p, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
                  <span className="text-accent font-bold text-sm shrink-0 mt-0.5 whitespace-nowrap">{p.phase}</span>
                  <div>
                    <h4 className="font-bold text-foreground">{p.title}</h4>
                    <p className="text-sm mt-1">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CaseStudySection>
    )}

    {/* Closing Statement */}
    {project.closingStatement && (
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
        <Card className="border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5">
          <CardContent className="p-8 text-center">
            <Heart className="h-8 w-8 text-accent mx-auto mb-4" />
            <p className="text-lg text-foreground font-medium mb-6">{project.closingStatement}</p>
            {project.closingStats && (
              <div className="grid sm:grid-cols-3 gap-4">
                {project.closingStats.map((s, i) => (
                  <div key={i}>
                    <p className="text-xs text-accent uppercase font-semibold tracking-wide">{s.label}</p>
                    <p className="text-sm text-foreground mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )}

    {/* Appendix */}
    {project.appendixImages && project.appendixImages.length > 0 && (
      <CaseStudySection label="Appendix" title="Additional Screens" icon={<ImageIcon className="h-4 w-4" />}>
        <div className="grid sm:grid-cols-2 gap-4">
          {project.appendixImages.map((img, i) => (
            <div key={i}>
              <ImageSlot slot={img.slot} label={img.caption} imageSrc={getSlotImage(img.slot)} />
              <p className="text-xs text-muted-foreground mt-2 text-center">{img.caption}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>
    )}
  </>
);

export default EBTFinderCaseStudy;
