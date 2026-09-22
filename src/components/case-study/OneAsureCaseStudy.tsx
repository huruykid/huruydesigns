import { motion } from "framer-motion";
import CaseStudySection from "./CaseStudySection";
import IterationTimeline from "./IterationTimeline";
import AdminNotificationDemo from "./AdminNotificationDemo";
import PayModuleDemo from "./PayModuleDemo";
import ResponsiveAppShell from "./ResponsiveAppShell";
import { DecisionList, NumberedList, StatRow } from "./primitives";
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
      <CaseStudySection label="Context" title="Three portals, three logins, one HR team">
        <p className="mb-4">
          HR professionals at mid-to-large enterprises ran their day across separate Asure portals for time and attendance, benefits and payroll, each with its own login, logic and quirks. Administrators made errors. Employees gave up on self-service. The sales team struggled to demo a product that looked a decade old.
        </p>
        <p>
          I was one of four designers on the project, working with eight developers and a project manager over six months. I owned the research, the information architecture and the presentation of design rationale to stakeholders.
        </p>
      </CaseStudySection>

      <CaseStudySection label="The Hard Problem" title="The ask was a refresh. The problem was trust.">
        <p className="mb-8">
          The brief came from sales: make it look modern. The interviews said something else. Users had stopped trusting the system, and several described avoiding tasks entirely because the process felt too risky. Consolidating three products into one without losing the complexity enterprise clients actually needed was the real work, and it had to happen before any visual change could land.
        </p>
        <StatRow stats={evidence} columns={4} />
      </CaseStudySection>

      <CaseStudySection label="Decisions" title="Four calls I made, and what I turned down">
        <DecisionList items={decisions} />
      </CaseStudySection>

      <CaseStudySection label="The Product" title="The Pay module, as shipped">
        <p className="mb-8 text-base">The Benefits module is the interactive prototype at the top of this page. Pay was the second module to move into the consolidated product.</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center"
        >
          <ResponsiveAppShell label="Pay Module" desktopWidth={480} allowToggle>
            <PayModuleDemo layout={demoLayout} />
          </ResponsiveAppShell>
          <p className="mt-3 max-w-[40ch] text-center text-sm leading-relaxed text-muted-foreground">
            Take-home pay, tax breakdowns, disbursements and pay history, replacing three separate logins.
          </p>
        </motion.div>
        <IterationTimeline />
      </CaseStudySection>

      <CaseStudySection label="Testing" title="24 tests, 8 iterations, and what they caught">
        <p className="mb-8">
          Each round surfaced friction I hadn't anticipated: edge cases in the notification flow, labels that made sense to designers and confused admins, navigation that worked on desktop and broke on small screens. The notification system below went through three of those rounds before it stopped burying the changes that mattered.
        </p>
        <AdminNotificationDemo />
      </CaseStudySection>

      <CaseStudySection label="Outcome" title="One product, and a sales team that could demo it">
        <p className="mb-4">{project.outcomeMetrics}</p>
        <p className="text-base">
          Post-launch, administrators reported fewer errors and faster onboarding, and enterprise prospects engaged with demos again. I have those as qualitative signals from support and sales, not as baselined metrics, which is the first thing I'd change (below).
        </p>
      </CaseStudySection>

      {project.learnings && project.learnings.length > 0 && (
        <CaseStudySection label="What I Learned" title="Stakeholder alignment is a design skill">
          <NumberedList items={project.learnings} />
        </CaseStudySection>
      )}

      {project.whatIdDoDifferently && (
        <CaseStudySection label="Hindsight" title="What I'd do differently">
          <NumberedList items={project.whatIdDoDifferently} tone="muted" />
        </CaseStudySection>
      )}
    </>
  );
};

export default OneAsureCaseStudy;
