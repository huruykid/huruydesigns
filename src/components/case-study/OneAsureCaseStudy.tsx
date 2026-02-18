import { motion } from "framer-motion";
import {
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Rocket,
  ChevronRight,
  Search,
  CheckCircle2,
  ClipboardList,
  Users,
  FlaskConical,
  Star,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CaseStudySection from "./CaseStudySection";
import ImageSlot from "./ImageSlot";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
  onUploaded: (slot: string, url: string) => void;
  projectId: string;
}

const stats = [
  { value: "12", label: "Competitive Audits" },
  { value: "16", label: "User Interviews" },
  { value: "24", label: "Usability Tests" },
  { value: "8", label: "Design Iterations" },
];

const problemPoints = [
  {
    heading: "Fragmentation",
    body: "Users toggled between disconnected portals with no unified experience, forcing them to relearn context every time they switched tasks.",
  },
  {
    heading: "Inconsistency",
    body: "UI patterns varied wildly across modules, creating steep learning curves even for experienced users.",
  },
  {
    heading: "Workflow complexity",
    body: "Multi-step processes lacked clear guidance, leading to admin errors that were costly to reverse.",
  },
  {
    heading: "No single sign-on",
    body: "Every product had its own entry point, adding friction before users even began their work.",
  },
  {
    heading: "An outdated visual design",
    body: "The existing UI was difficult for the sales team to present to prospective clients, actively undermining business growth.",
  },
];

const researchSteps = [
  {
    heading: "Competitive Audit",
    body: "I began with a structured audit of 12 competing HCM platforms — analyzing information architecture, navigation patterns, onboarding flows, and visual design. This gave the team a benchmark and surfaced opportunities the existing Asure suite was missing entirely.",
  },
  {
    heading: "User Interviews",
    body: "I prepared an 8-question interview script focused on understanding how different user roles — administrators, HR managers, employees — interacted with the current portal day-to-day. After 16 remote sessions across three weeks, users weren't just frustrated with individual features — they had lost trust in the system. Several described avoiding certain tasks entirely because the process felt too risky.",
  },
  {
    heading: "Gap Analysis",
    body: "I mapped interview findings against the audit to identify where the product was farthest from user expectations. This became the foundation for scoping the project — helping stakeholders understand not just what to build, but why the sequence mattered.",
  },
];

const designDecisions = [
  {
    heading: "Single sign-on entry point",
    body: "The most consistently requested change across usability testing. I redesigned the authentication flow to a single unified entry, reducing cognitive load before users even entered the product.",
  },
  {
    heading: "Modular customization",
    body: "Enterprise clients use different subsets of Asure's product suite. Rather than showing every feature to every user, I designed a customizable navigation system that surfaced only the modules each client had purchased — reducing confusion and making the portal feel purpose-built.",
  },
  {
    heading: "Admin notification system",
    body: "Administrators had no awareness when employees initiated sensitive actions like updating personal information. I designed a notification layer that surfaced these events in real time, reducing the risk of missed changes.",
  },
  {
    heading: "Visual redesign",
    body: "I prioritized modernizing the UI early — updating iconography (the floppy disk save icon was a near-universal complaint), improving type hierarchy, and introducing consistent component patterns across all modules. A credible visual language was the prerequisite for everything else landing well.",
  },
];

const outcomes = [
  "Administrators reported significantly reduced errors thanks to clearer workflows and real-time notifications",
  "The sales team gained a product they could confidently demo to enterprise prospects",
  "Users no longer needed to manage multiple entry points or navigate inconsistent interfaces",
];

const OneAsureCaseStudy = ({ project, getSlotImage, onUploaded, projectId }: Props) => (
  <>
    {/* Challenge */}
    <CaseStudySection label="The Challenge" title="Fragmented systems, fractured workflows" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-4">
        HR professionals at mid-to-large enterprises were navigating a fractured ecosystem — separate portals for time &amp; attendance, benefits, and payroll, each with its own login, its own logic, and its own quirks. The result wasn't just frustrating. It was expensive. Administrators made errors. Employees gave up. And the sales team struggled to demo a product that looked like it was built in a different decade.
      </p>
      <p>
        The ask was clear: consolidate everything into one cohesive HR portal. The hard part was figuring out how — without losing the complexity that enterprise clients actually needed.
      </p>
    </CaseStudySection>

    {/* Meta bar */}
    <div className="grid sm:grid-cols-3 gap-4 mb-20">
      {[
        { label: "Role", items: ["UX Designer", "UX Researcher", "Stakeholder Presenter"] },
        { label: "Timeline & Tools", items: ["6+ months", "Figma · Ionic · Jira"] },
        { label: "Team", items: ["4 UX designers", "8 developers", "1 project manager"] },
      ].map((col, i) => (
        <Card key={i} className="border-border bg-card/50">
          <CardContent className="p-5">
            <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-3">{col.label}</p>
            <ul className="space-y-1">
              {col.items.map((item, j) => (
                <li key={j} className="text-sm text-foreground">{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* The Problem */}
    <CaseStudySection label="The Problem" title="Five pain points that drove everything" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-6">
        Before jumping into solutions, I needed to understand exactly where the current experience was breaking down. Through a software audit of the existing Asure suite and 16 remote user interviews conducted over three weeks, five core pain points emerged.
      </p>
      <div className="space-y-3 mb-8">
        {problemPoints.map((p, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
            <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
            <div>
              <p className="font-bold text-foreground text-sm mb-1">{p.heading}</p>
              <p className="text-sm">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm italic">
        The last point mattered more than it might seem. A product that can't be demoed confidently is a product that doesn't get sold. Design quality wasn't just a UX concern — it was a business risk.
      </p>
    </CaseStudySection>

    {/* My Role */}
    <CaseStudySection label="My Role" title="Full lifecycle ownership" icon={<Users className="h-4 w-4" />}>
      <p>
        I led UX research and design across the full project lifecycle. Specifically, I owned the interview research process — writing the script, conducting sessions, and synthesizing findings into the top pain points that drove our design decisions. I also led information architecture, wireframing, and prototyping for key portal modules, and was responsible for presenting design decisions and rationale to stakeholders throughout the project.
      </p>
    </CaseStudySection>

    {/* Stats */}
    <CaseStudySection label="Research at Scale" title="By the numbers" icon={<BarChart3 className="h-4 w-4" />}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-5 text-center">
                <p className="text-4xl font-bold text-accent mb-1">{s.value}</p>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </CaseStudySection>

    {/* Research & Discovery */}
    <CaseStudySection label="Research & Discovery" title="Grounding design in real needs" icon={<Search className="h-4 w-4" />}>
      <div className="space-y-4">
        {researchSteps.map((step, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <div>
                <p className="font-bold text-foreground text-sm mb-1">{step.heading}</p>
                <p className="text-sm">{step.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </CaseStudySection>

    {/* Design Process */}
    <CaseStudySection label="Design Process" title="Four decisions that shaped the portal" icon={<ClipboardList className="h-4 w-4" />}>
      <p className="mb-6">
        With research grounded, I moved into IA, wireframes, and iterative prototyping across eight design rounds. A few decisions were particularly significant.
      </p>
      <div className="space-y-4">
        {designDecisions.map((d, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
              <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
              <div>
                <p className="font-bold text-foreground text-sm mb-1">{d.heading}</p>
                <p className="text-sm">{d.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <ImageSlot slot="ui-design" label="Portal UI screens" imageSrc={getSlotImage("ui-design")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Testing & Iteration */}
    <CaseStudySection label="Testing & Iteration" title="24 tests, 8 iterations" icon={<FlaskConical className="h-4 w-4" />}>
      <p className="mb-4">
        I ran 24 usability tests across multiple rounds, testing with real users in realistic task scenarios. Each round surfaced friction I hadn't anticipated — edge cases in the notification flow, labeling that made sense to designers but confused admins, navigation patterns that worked on desktop but broke on smaller screens.
      </p>
      <p>
        Eight full design iterations later, the product was substantially different from the initial concept — and substantially better. The iteration process wasn't a sign that we got things wrong early. It was the process working as intended.
      </p>
      <ImageSlot slot="solution" label="Final portal design" imageSrc={getSlotImage("solution")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Outcome */}
    <CaseStudySection label="Outcome" title="One portal, measurable impact" icon={<Star className="h-4 w-4" />}>
      <p className="mb-6">
        The final OneAsure portal consolidated Time &amp; Attendance, Benefits, Payroll, and related HR functions into a single, unified experience — with one login, consistent UI patterns, and workflows that reflected how people actually worked.
      </p>
      <div className="space-y-3">
        {outcomes.map((o, i) => (
          <div key={i} className="flex items-start gap-3">
            <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
            <span className="text-sm">{o}</span>
          </div>
        ))}
      </div>
    </CaseStudySection>

    {/* Learnings */}
    {project.learnings && project.learnings.length > 0 && (
      <CaseStudySection label="What I Learned" title="Stakeholder alignment is a design skill" icon={<Lightbulb className="h-4 w-4" />}>
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

    {/* Next Steps */}
    <CaseStudySection label="Next Steps" title="From building to listening" icon={<Rocket className="h-4 w-4" />}>
      <p className="mb-8">
        Post-launch, the focus shifts from building to listening. The next phase involves structured feedback sessions with both end users and the sales team, using those insights to prioritize the next round of feature improvements — with the goal of not just meeting expectations, but raising them.
      </p>

      <Card className="border-accent/30 bg-accent/5">
        <CardContent className="p-6">
          <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-3">Conducted over 6+ months</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {stats.map((s, i) => (
              <span key={i} className="text-sm text-foreground">
                <span className="font-bold text-accent">{s.value}</span> {s.label}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </CaseStudySection>
  </>
);

export default OneAsureCaseStudy;
