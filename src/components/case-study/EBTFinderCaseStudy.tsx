import { motion } from "framer-motion";
import { AlertTriangle, Search, Lightbulb, ChevronRight, Target, Users, MessageSquareQuote, Rocket, Palette, BarChart3, ImageIcon, Heart } from "lucide-react";
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

const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const EBTFinderCaseStudy = ({ project, getSlotImage }: Props) => (
  <>
    {/* App Store promo banner */}
    {project.appStoreUrl && (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6"
      >
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg">
          <AppleLogo className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-1">Live on iOS</p>
          <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Get EBT Finder on the App Store
          </h2>
          <p className="text-sm text-muted-foreground">
            This concept shipped. Download the real app and find EBT-friendly stores near you.
          </p>
        </div>
        <a
          href={project.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download EBT Finder on the App Store"
          className="inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90"
        >
          <AppleLogo className="h-5 w-5" />
          <span className="text-left leading-tight">
            <span className="block text-[9px] uppercase tracking-wide opacity-80">Download on the</span>
            <span className="block text-sm font-semibold">App Store</span>
          </span>
        </a>
      </motion.div>
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
          We started with real voices. User interviews helped us understand what builds trust, what causes friction, and why a simple sign doesn't always mean a store is accessible or welcoming.
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
      <CaseStudySection label="The Solution" title="What we built" icon={<Rocket className="h-4 w-4" />}>
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
      <CaseStudySection label="Impact & Validation" title="Prototype Testing Results" icon={<BarChart3 className="h-4 w-4" />}>
        <p className="mb-6">Even without launch, usability testing validated the concept:</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {project.validationMetrics.map((m, i) => (
            <Card key={i} className="border-accent/30 bg-accent/5">
              <CardContent className="p-5 text-center">
                <p className="text-3xl font-bold text-accent mb-1">{m.value}</p>
                <p className="font-semibold text-foreground text-sm mb-1">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card/50 p-6">
          <h3 className="font-bold text-foreground mb-6 text-center">EBT Finder vs. USDA SNAP Locator</h3>
          <div className="space-y-5">
            {[
              { label: "Find hot food location", ebt: 15, usda: 180, unit: "sec", maxVal: 180 },
              { label: "Mobile usability", ebt: 95, usda: 30, unit: "%", maxVal: 100 },
              { label: "User satisfaction", ebt: 95, usda: 20, unit: "%", maxVal: 100 },
              { label: "Trust & confidence", ebt: 80, usda: 25, unit: "%", maxVal: 100 },
            ].map((row, i) => {
              const ebtWidth = Math.max((row.ebt / row.maxVal) * 100, 8);
              const usdaWidth = Math.max((row.usda / row.maxVal) * 100, 8);
              return (
                <div key={i}>
                  <p className="text-sm font-medium text-foreground mb-2">{row.label}</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-24 shrink-0">EBT Finder</span>
                      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${ebtWidth}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-foreground w-16 shrink-0 text-right">{row.ebt}{row.unit}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-24 shrink-0">USDA Tool</span>
                      <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-muted-foreground/30 rounded-full"
                          style={{ width: `${usdaWidth}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground w-16 shrink-0 text-right">{row.usda}{row.unit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
              <ImageSlot slot={img.slot} label={img.caption} aspectRatio="aspect-[4/3]" imageSrc={getSlotImage(img.slot)} />
              <p className="text-xs text-muted-foreground mt-2 text-center">{img.caption}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>
    )}
  </>
);

export default EBTFinderCaseStudy;
