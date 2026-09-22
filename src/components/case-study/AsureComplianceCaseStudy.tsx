import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Lightbulb,
  BarChart3,
  ChevronRight,
  Search,
  Users,
  ClipboardList,
  Star,
  Shield,
  Lock,
  Eye,
  Layers,
  Zap,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CaseStudySection from "./CaseStudySection";
import TaxComplianceDashboardDemo from "./TaxComplianceDashboardDemo";
import ResponsiveAppShell from "./ResponsiveAppShell";
import { EntityDiagram, StateMachineDiagram } from "./AsureDiagrams";
import { Project } from "@/lib/projects";
import type { AsureGatedContent, GatedIconName } from "@/lib/gatedContent";

interface Props {
  project: Project;
  /** Narrative returned by verify-passcode; never bundled with the site. */
  content: AsureGatedContent;
}

const icons: Record<GatedIconName, LucideIcon> = {
  Shield,
  Layers,
  BarChart3,
  ClipboardList,
  Search,
  Building2,
  Lock,
  Eye,
  Zap,
};

const Icon = ({ name }: { name: GatedIconName }) => {
  const Cmp = icons[name] ?? Shield;
  return <Cmp className="h-5 w-5" aria-hidden="true" />;
};

const typeClass = (type: string) =>
  type === "Hard Stop"
    ? "bg-destructive/15 text-destructive"
    : type === "Warning"
    ? "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400"
    : type === "Conditional"
    ? "bg-blue-500/15 text-blue-700 dark:text-blue-400"
    : "bg-muted text-foreground";

const AsureComplianceCaseStudy = ({ project, content }: Props) => (
  <>
    {/* 01 - CONTEXT & SCALE */}
    <CaseStudySection label="01 | Context & Scale" title="An engine hidden behind legacy abstraction" icon={<Search className="h-4 w-4" />}>
      {content.context.map((p) => (
        <p key={p} className="mb-8">{p}</p>
      ))}
      <EntityDiagram />
    </CaseStudySection>

    {/* 02 - THE REAL PROBLEM */}
    <CaseStudySection label="02 | The Real Problem" title="The brief was to redesign screens. The real problem was elsewhere." icon={<AlertTriangle className="h-4 w-4" />}>
      {content.problem.map((p, i) => (
        <p key={i} className={i === content.problem.length - 1 ? "mb-8" : "mb-4"}>{p}</p>
      ))}

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {content.problemCards.map((card, i) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <Card className="border-border bg-muted/20 h-full">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent"><Icon name={card.icon} /></span>
                  <h3 className="font-bold text-foreground text-sm">{card.title}</h3>
                </div>
                <p className="text-sm">{card.body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Audience Needs</p>
        {content.audienceNeeds.map((a) => (
          <div key={a.role} className="flex items-start gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
            <span className="text-accent font-bold text-sm shrink-0 mt-0.5">{a.role}</span>
            <p className="text-sm">{a.need}</p>
          </div>
        ))}
      </div>
    </CaseStudySection>

    {/* 03 - MY ROLE & INFLUENCE */}
    <CaseStudySection label="03 | My Role & Influence" title="Embedded, cross-functional, onsite in Dallas." icon={<Users className="h-4 w-4" />}>
      {content.role.map((p, i) => (
        <p key={i} className={i === content.role.length - 1 ? "mb-8" : "mb-4"}>{p}</p>
      ))}
      {content.onsitePhoto && (
        <figure className="rounded-xl overflow-hidden border border-border mb-8">
          <div className="aspect-[16/7] overflow-hidden">
            <img
              src={content.onsitePhoto.src}
              alt={content.onsitePhoto.alt}
              width={1600}
              height={700}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-[center_25%]"
            />
          </div>
          <figcaption className="px-4 py-2.5 bg-muted/30 border-t border-border">
            <p className="text-xs text-muted-foreground">{content.onsitePhoto.caption}</p>
          </figcaption>
        </figure>
      )}
      <div className="space-y-2">
        {content.roleItems.map((item, i) => (
          <div key={item} className="flex items-start gap-4 p-3 rounded-lg bg-muted/20 border border-border">
            <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
            <p className="text-sm">{item}</p>
          </div>
        ))}
      </div>
    </CaseStudySection>

    {/* 04 - CORE DESIGN CONTRIBUTIONS */}
    <CaseStudySection label="04 | Core Design Contributions" title="Four architectural design systems" icon={<ClipboardList className="h-4 w-4" />}>
      <p className="mb-8">{content.contributionsIntro}</p>

      <div className="space-y-12">
        {content.coreContributions.map((c) => (
          <motion.div key={c.letter} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-accent font-bold text-lg">{c.letter}</span>
              <h3 className="text-lg font-bold text-foreground">{c.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground italic mb-4">{c.subtitle}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-destructive uppercase tracking-wide mb-2">Problem</p>
                  <ul className="space-y-1.5">
                    {c.problemPoints.map((p) => (
                      <li key={p} className="text-sm flex items-start gap-2">
                        <span className="text-destructive mt-0.5" aria-hidden="true">✗</span> {p}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-green-500/20 bg-green-500/5">
                <CardContent className="p-4">
                  <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide mb-2">Solution</p>
                  <ul className="space-y-1.5">
                    {c.solutionPoints.map((s) => (
                      <li key={s} className="text-sm flex items-start gap-2">
                        <span className="text-green-700 dark:text-green-400 mt-0.5" aria-hidden="true">✓</span> {s}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {c.letter === "B" && <div className="mt-6"><StateMachineDiagram /></div>}

            {c.letter === "C" && (
              <div className="mt-6 rounded-xl border border-border bg-card/50 overflow-x-auto">
                <p className="text-xs font-semibold text-accent uppercase tracking-wide p-4 pb-2">Validation Matrix</p>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th scope="col" className="text-left p-3 font-bold text-foreground">Condition</th>
                      <th scope="col" className="text-left p-3 font-bold text-foreground">Field Behavior</th>
                      <th scope="col" className="text-left p-3 font-bold text-foreground">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.validationMatrix.map((row) => (
                      <tr key={row.condition} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-3">{row.condition}</td>
                        <td className="p-3">{row.behavior}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${typeClass(row.type)}`}>
                            {row.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </CaseStudySection>

    {/* 05 - DESIGNING FOR INTUITION */}
    <CaseStudySection label="05 | Designing for Intuition" title="Translating regulatory logic into human mental models" icon={<Lightbulb className="h-4 w-4" />}>
      <p className="mb-6">{content.intuitionIntro}</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {content.intuitionCards.map((card, i) => (
          <motion.div key={card.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <Card className="border-border bg-card/50 h-full">
              <CardContent className="p-5">
                <h3 className="font-bold text-foreground text-sm mb-1">{card.title}</h3>
                <p className="text-sm">{card.body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
        <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-4">Legacy to Redesign</p>
        <div className="space-y-3">
          {content.transformations.map((t) => (
            <div key={t.from} className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground line-through flex-1">{t.from}</span>
              <ArrowRight className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
              <span className="text-foreground font-medium flex-1">{t.to}</span>
            </div>
          ))}
        </div>
      </div>
    </CaseStudySection>

    {/* Interactive Prototype */}
    <div className="mb-4">
      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Interactive Prototype</p>
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-display">Tax Compliance Dashboard</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        Click on chart bars, table rows, and deadlines to explore the interactive prototype.
      </p>
      <ResponsiveAppShell label="Asure | Tax Compliance Dashboard" desktopWidth={680} allowToggle mobileWidth={280} mobileHeight={520}>
        <TaxComplianceDashboardDemo />
      </ResponsiveAppShell>
    </div>

    {/* 06 - COLLABORATION */}
    <CaseStudySection label="06 | Collaboration" title="Three disciplines. One shared mental model." icon={<Users className="h-4 w-4" />}>
      {content.collaboration.map((p, i) => (
        <p key={i} className={i === content.collaboration.length - 1 ? "mb-8" : "mb-4"}>{p}</p>
      ))}
      <div className="grid sm:grid-cols-3 gap-4">
        {content.collaborators.map((col) => (
          <Card key={col.group} className="border-border bg-card/50">
            <CardContent className="p-5">
              <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-3">{col.group}</p>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item} className="text-sm flex items-start gap-2">
                    <ChevronRight className="h-3 w-3 mt-1 text-accent shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </CaseStudySection>

    {/* 07 - IMPACT */}
    <CaseStudySection label="07 | Impact" title="Structural outcomes over vanity metrics" icon={<Star className="h-4 w-4" />}>
      <p className="mb-6">{content.impactIntro}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {content.impactItems.map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <Card className="border-accent/20 bg-accent/5 h-full">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent"><Icon name={item.icon} /></span>
                  <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                </div>
                <p className="text-sm">{item.body}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </CaseStudySection>

    {/* Learnings */}
    {content.learnings.length > 0 && (
      <CaseStudySection label="What I Learned" title="Reflections" icon={<Lightbulb className="h-4 w-4" />}>
        <div className="space-y-4">
          {content.learnings.map((l, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
              <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
              <p className="text-sm">{l}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>
    )}

    {/* 08 - LET'S WORK TOGETHER */}
    <div className="rounded-2xl bg-[hsl(220,30%,12%)] dark:bg-[hsl(220,30%,8%)] p-8 sm:p-12 text-center mt-12">
      <p className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-2">08 | Let's Work Together</p>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-display">Let's Work Together</h2>
      <p className="text-base text-white/80 max-w-2xl mx-auto mb-8">
        I specialize in complex enterprise products like {project.title}: systems where getting the UX wrong isn't an inconvenience, it's a liability. If that's the kind of work you're hiring for, let's talk.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/contact">
            Email Huruy <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
          <Link to="/#work">View all projects</Link>
        </Button>
      </div>
    </div>
  </>
);

export default AsureComplianceCaseStudy;
