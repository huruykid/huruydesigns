import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, Search, ClipboardList, Users, FlaskConical, Star, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CaseStudySection from "./CaseStudySection";
import IterationTimeline from "./IterationTimeline";
import AdminNotificationDemo from "./AdminNotificationDemo";
import PayModuleDemo from "./PayModuleDemo";
import BenefitsModuleDemo from "./BenefitsModuleDemo";
import ResponsiveAppShell from "./ResponsiveAppShell";
import { useIsMobile } from "@/hooks/use-mobile";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

const evidence = [
  { value: "12", label: "HCM platforms audited" },
  { value: "16", label: "user interviews" },
  { value: "24", label: "usability tests" },
  { value: "8", label: "design iterations" },
];

const decisions = [
  {
    title: "Reframe the brief from a refresh to a consolidation",
    body: "The request was a visual refresh so sales could demo the product. After 16 interviews the real finding was that users had lost trust in the system: three portals, three logins, three sets of rules, and admins avoiding tasks that felt risky. I brought that back to stakeholders as a sequencing argument: structure first, then visuals, or the refresh would put a new coat of paint on the same fragmentation.",
    rejected: "Shipping the refresh first to unblock sales. It would have hit the date and left every structural complaint in place.",
  },
  {
    title: "One entry point, then modular navigation",
    body: "Single sign-on was the most requested and least contested change, so it anchored the new IA. Behind it, I designed navigation that surfaces only the modules a client has purchased. Enterprise customers buy different subsets of the suite, and showing everyone everything was a large part of why the product felt bloated.",
    rejected: "A universal navigation with disabled items for unpurchased modules. Consistent for us, confusing for a customer who never bought Payroll.",
  },
  {
    title: "Make admin-side risk visible in real time",
    body: "Admins had no signal when employees changed sensitive information, and the errors that followed were expensive to reverse. I designed a notification layer for those events, tested it across three rounds, and cut it back twice when the first versions buried the important changes in noise.",
    rejected: "A daily digest. Simpler to build, and useless for the changes that needed a same-hour response.",
  },
  {
    title: "Modernize the visual language, but after the structure",
    body: "The floppy-disk save icon was a near-universal complaint, and the sales team could not demo the old UI with confidence. I updated iconography, type hierarchy and component patterns across all modules once the IA was settled, so the credibility gain landed on a product that also worked.",
    rejected: "Doing this first. See decision one.",
  },
];

const OneAsureCaseStudy = ({ project }: Props) => {
  const isMobile = useIsMobile();
  const demoLayout = isMobile ? "mobile" : "desktop";

  return (
    <>
      <CaseStudySection label="Context" title="Three portals, three logins, one HR team" icon={<Search className="h-4 w-4" />}>
        <p className="mb-4">
          HR professionals at mid-to-large enterprises ran their day across separate Asure portals for time and attendance, benefits and payroll, each with its own login, logic and quirks. Administrators made errors. Employees gave up on self-service. The sales team struggled to demo a product that looked a decade old.
        </p>
        <p>
          I was one of four designers on the project, working with eight developers and a project manager over six months. I owned the research, the information architecture and the presentation of design rationale to stakeholders.
        </p>
      </CaseStudySection>

      <CaseStudySection label="The Hard Problem" title="The ask was a refresh. The problem was trust." icon={<AlertTriangle className="h-4 w-4" />}>
        <p className="mb-6">
          The brief came from sales: make it look modern. The interviews said something else. Users had stopped trusting the system, and several described avoiding tasks entirely because the process felt too risky. Consolidating three products into one without losing the complexity enterprise clients actually needed was the real work, and it had to happen before any visual change could land.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {evidence.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="border-accent/30 bg-accent/5">
                <CardContent className="p-5 text-center">
                  <p className="text-3xl font-bold text-accent mb-1">{s.value}</p>
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide">{s.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection label="Decisions" title="Four calls I made, and what I turned down" icon={<Lightbulb className="h-4 w-4" />}>
        <div className="space-y-6">
          {decisions.map((d, i) => (
            <motion.div key={d.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="border-border bg-card/50">
                <CardContent className="p-5">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-accent font-bold">0{i + 1}</span>
                    <h3 className="font-bold text-foreground">{d.title}</h3>
                  </div>
                  <p className="text-sm mb-3">{d.body}</p>
                  <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Rejected:</span> {d.rejected}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </CaseStudySection>

      <CaseStudySection label="The Product" title="Two of the modules, as shipped" icon={<ClipboardList className="h-4 w-4" />}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-6 mb-10"
        >
          <div className="flex flex-col items-center w-full sm:w-auto shrink-0">
            <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-3">Benefits Module</p>
            <ResponsiveAppShell label="Benefits Module" desktopWidth={480} allowToggle>
              <BenefitsModuleDemo layout={demoLayout} />
            </ResponsiveAppShell>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2 max-w-[280px] text-center">
              Open enrollment, life events and the full benefit list with plan details in one scrollable view.
            </p>
          </div>
          <div className="flex flex-col items-center w-full sm:w-auto shrink-0">
            <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-3">Pay Module</p>
            <ResponsiveAppShell label="Pay Module" desktopWidth={480} allowToggle>
              <PayModuleDemo layout={demoLayout} />
            </ResponsiveAppShell>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2 max-w-[280px] text-center">
              Take-home pay, tax breakdowns, disbursements and pay history, replacing three separate logins.
            </p>
          </div>
        </motion.div>
        <IterationTimeline />
      </CaseStudySection>

      <CaseStudySection label="Testing" title="24 tests, 8 iterations, and what they caught" icon={<FlaskConical className="h-4 w-4" />}>
        <p className="mb-4">
          Each round surfaced friction I hadn't anticipated: edge cases in the notification flow, labels that made sense to designers and confused admins, navigation that worked on desktop and broke on small screens. The notification system below went through three of those rounds before it stopped burying the changes that mattered.
        </p>
        <AdminNotificationDemo />
      </CaseStudySection>

      <CaseStudySection label="Outcome" title="One product, and a sales team that could demo it" icon={<Star className="h-4 w-4" />}>
        <p className="mb-4">{project.outcomeMetrics}</p>
        <p className="text-sm text-muted-foreground">
          Post-launch, administrators reported fewer errors and faster onboarding, and enterprise prospects engaged with demos again. I have those as qualitative signals from support and sales, not as baselined metrics, which is the first thing I'd change (below).
        </p>
      </CaseStudySection>

      {project.learnings && project.learnings.length > 0 && (
        <CaseStudySection label="What I Learned" title="Stakeholder alignment is a design skill" icon={<Users className="h-4 w-4" />}>
          <div className="space-y-4">
            {project.learnings.map((l, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
                <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
                <p className="text-sm">{l}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>
      )}

      {project.whatIdDoDifferently && (
        <CaseStudySection label="Hindsight" title="What I'd do differently" icon={<Rocket className="h-4 w-4" />}>
          <div className="space-y-4">
            {project.whatIdDoDifferently.map((w, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/10 border border-border/50">
                <span className="text-muted-foreground font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
                <p className="text-sm">{w}</p>
              </div>
            ))}
          </div>
        </CaseStudySection>
      )}
    </>
  );
};

export default OneAsureCaseStudy;
