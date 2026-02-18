import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Target, MessageSquareQuote, Lightbulb, Search, Users, BookOpen, ChevronRight, BarChart3, Palette, Rocket, Heart, ImageIcon, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { projects, Project } from "@/lib/projects";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import ImageSlot from "@/components/case-study/ImageSlot";
import CompetitiveAuditTable from "@/components/case-study/CompetitiveAuditTable";
import FentFinderCaseStudy from "@/components/case-study/FentFinderCaseStudy";
import BelesCaseStudy from "@/components/case-study/BelesCaseStudy";
import OneAsureCaseStudy from "@/components/case-study/OneAsureCaseStudy";
import { supabase } from "@/integrations/supabase/client";

const isRichCaseStudy = (p: Project) => !!p.challenge;

interface SlotProps {
  getSlotImage: (slot: string) => string | undefined;
  onUploaded: (slot: string, url: string) => void;
  projectId: string;
}

const ProjectPage = () => {
  const { id } = useParams();
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});

  const idx = projects.findIndex((p) => p.id === id);
  const project = idx !== -1 ? projects[idx] : null;
  const next = idx !== -1 ? projects[(idx + 1) % projects.length] : null;

  useEffect(() => {
    if (!project) return;
    const fetchImages = async () => {
      const { data } = await supabase
        .from("case_study_images" as any)
        .select("slot, image_url")
        .eq("project_id", project.id) as any;
      if (data) {
        const map: Record<string, string> = {};
        for (const row of data) map[row.slot] = row.image_url;
        setUploadedImages(map);
      }
    };
    fetchImages();
  }, [project?.id]);

  const getSlotImage = useCallback((slot: string) => {
    return uploadedImages[slot] || project?.sectionImages?.[slot];
  }, [uploadedImages, project?.sectionImages]);

  const handleUploaded = useCallback((slot: string, url: string) => {
    setUploadedImages(prev => ({ ...prev, [slot]: url }));
  }, []);

  if (!project || !next) return <Navigate to="/" />;

  const rich = isRichCaseStudy(project);
  const slotProps: SlotProps = { getSlotImage, onUploaded: handleUploaded, projectId: project.id };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">{project.impact}</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span><strong className="text-foreground">Role:</strong> {project.role}</span>
                <span><strong className="text-foreground">Timeline:</strong> {project.timeline}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {project.tools.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
              {project.challenge && (
                <Card className="border-accent/30 bg-accent/5 max-w-2xl">
                  <CardContent className="p-5">
                    <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-1">The Challenge</p>
                    <p className="text-foreground">{project.challenge}</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center justify-center">
              {getSlotImage("hero") ? (
                <ImageSlot slot="hero" label="Hero Image" imageSrc={getSlotImage("hero")} projectId={project.id} onUploaded={handleUploaded} />
              ) : rich && project.image && project.image !== "/placeholder.svg" ? (
                <div className="flex items-center justify-center w-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-w-[420px] h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              ) : rich ? (
                <ImageSlot slot="hero" label="Main app screen or USDA vs. Your design comparison" projectId={project.id} onUploaded={handleUploaded} />
              ) : (
                <div className="rounded-xl overflow-hidden border border-border aspect-video bg-muted w-full">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 pb-24 max-w-4xl">
        {project.id === "ai-fent-finder" ? (
          <FentFinderCaseStudy project={project} {...slotProps} />
        ) : project.id === "beles" ? (
          <BelesCaseStudy project={project} {...slotProps} />
        ) : project.id === "oneasure-portal" ? (
          <OneAsureCaseStudy project={project} {...slotProps} />
        ) : rich ? (
          <RichCaseStudy project={project} {...slotProps} />
        ) : (
          <SimpleCaseStudy project={project} />
        )}

        {/* Next project */}
        <div className="border-t border-border pt-12">
          <p className="text-sm text-muted-foreground mb-2">Next Project</p>
          <Link to={`/project/${next.id}`} className="group inline-flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {next.title} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

/* ===== Simple case study (non-EBT projects) ===== */
const SimpleCaseStudy = ({ project }: { project: Project }) => (
  <>
    <CaseStudySection label="The Problem" title="What needed to change" icon={<Search className="h-4 w-4" />}>
      <p>{project.problem}</p>
    </CaseStudySection>
    <CaseStudySection label="The Process" title="How I approached it">
      <p>{project.process}</p>
    </CaseStudySection>
    <CaseStudySection label="The Solution" title="What we built">
      <p>{project.solution}</p>
    </CaseStudySection>
    <CaseStudySection label="The Impact" title="Measurable outcomes" icon={<Target className="h-4 w-4" />}>
      <p>{project.outcomeMetrics}</p>
    </CaseStudySection>
  </>
);

/* ===== Rich case study (EBT Finder style) ===== */
const RichCaseStudy = ({ project, getSlotImage, onUploaded, projectId }: { project: Project } & SlotProps) => (
  <>
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
      <ImageSlot slot="usda-screenshot" label="USDA SNAP Retailer Locator screenshot" imageSrc={getSlotImage("usda-screenshot")} projectId={projectId} onUploaded={onUploaded} />
      <p className="text-xs text-muted-foreground/60 mt-2 italic">
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
            { name: "Show only EBT-accepting businesses", support: [true, true, true, true] },
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

    {/* User Interviews */}
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
        <ImageSlot slot="ebt-sign" label="SNAP/EBT Accepted sign in store" imageSrc={getSlotImage("ebt-sign")} projectId={projectId} onUploaded={onUploaded} />
        <p className="text-xs text-muted-foreground/60 mt-2 italic">
          We started with real voices. User interviews helped us understand what builds trust, what causes friction, and why a simple sign doesn't always mean a store is accessible or welcoming.
        </p>
      </CaseStudySection>
    )}

    {/* Research Findings */}
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

    {/* Section 4: Research to Design */}
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
        <ImageSlot slot="wireframes" label="Annotated wireframes mapping research to features" imageSrc={getSlotImage("wireframes")} projectId={projectId} onUploaded={onUploaded} />
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
              <ImageSlot slot={feat.imageSlot} label={feat.title} imageSrc={getSlotImage(feat.imageSlot)} projectId={projectId} onUploaded={onUploaded} />
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
        <ImageSlot slot="design-system" label="Design system — colors, typography, buttons, icons" imageSrc={getSlotImage("design-system")} projectId={projectId} onUploaded={onUploaded} />
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
              { label: "User satisfaction", ebt: 100, usda: 20, unit: "%", maxVal: 100 },
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
              <ImageSlot slot={img.slot} label={img.caption} aspectRatio="aspect-[4/3]" imageSrc={getSlotImage(img.slot)} projectId={projectId} onUploaded={onUploaded} />
              <p className="text-xs text-muted-foreground mt-2 text-center">{img.caption}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>
    )}
  </>
);

export default ProjectPage;
