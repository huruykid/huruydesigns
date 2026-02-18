import { motion } from "framer-motion";
import { AlertTriangle, Users, Lightbulb, BarChart3, Rocket, ChevronRight, Search, CheckCircle2, ClipboardList } from "lucide-react";
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

const stat = (value: string, label: string) => ({ value, label });

const stats = [
  stat("12", "Competitive Audits"),
  stat("16", "User Interviews"),
  stat("24", "Usability Tests"),
  stat("8", "Design Iterations"),
];

const designPhases = [
  {
    num: "01",
    title: "Define Objectives & Scope",
    items: [
      { heading: "Software Audit", body: "Conducted a comprehensive audit of the existing Asure Time & Attendance, Benefits, Payroll, and related portals — analyzing strengths, weaknesses, and benchmarking against industry-leading software." },
      { heading: "Gap Analysis", body: "Performed a thorough gap analysis to understand functionalities and features missing or lagging compared to competitors. Collected user feedback and pain points from current portals." },
      { heading: "Define Project Scope", body: "Clearly defined objectives and scope based on audit findings. Collaborated with stakeholders to set clear expectations for the new Asure HCM portal." },
    ],
  },
  {
    num: "02",
    title: "User Research & Analysis",
    items: [
      { heading: "Interview Script", body: "Prepared an interview script with 8 open-ended questions focused on target audience values, motivations, and daily routines when interacting with the current portal." },
      { heading: "16 Remote Interviews", body: "Interviewed 16 users remotely over 3 weeks. Key insights included understanding user values, motivations, and pain points across different roles." },
      { heading: "Top 5 Pain Points", body: "Synthesized the top 5 user pain points and ensured the new portal directly addressed each one, grounding every design decision in real user feedback." },
    ],
  },
  {
    num: "03",
    title: "Design, Prototypes & Wireframes",
    items: [
      { heading: "Upgraded Look & Feel", body: "First priority was upgrading the portal's visual design — addressing concerns that the current design was challenging to showcase to clients." },
      { heading: "Single Sign-On Entry", body: "Simplified the sign-in process to a single entry point, a key improvement consistently requested during usability testing." },
      { heading: "Customization & Clarity", body: "Clients emphasized customization — tailoring the portal to the specific products they use. Added intuitive on-screen text, pop-up boxes, and clear definitions." },
      { heading: "Admin Notifications", body: "Designed admin notification system so administrators are alerted when employees initiate actions like updating information." },
    ],
  },
  {
    num: "04",
    title: "Implementation & Testing",
    items: [
      { heading: "Usability Testing", body: "Ran 24 usability tests across multiple rounds to validate designs and identify friction points before handoff to engineering." },
      { heading: "Agile Collaboration", body: "Worked in close collaboration with 8 developers, 4 UX designers, and 1 project manager using an agile framework with rapid prototyping." },
      { heading: "8 Iterations", body: "Shipped 8 design iterations incorporating feedback from both users and stakeholders — ensuring the final portal met real-world needs." },
    ],
  },
];

const uiFindings = [
  "Upgrade the portal's look and feel — current design is difficult to showcase to clients",
  "Replace the diskette (floppy disk) save icon — a consistent source of user frustration",
  "Enable product-specific customization to avoid confusion and ensure relevance",
  "Simplify sign-in to a single entry point",
  "Add admin notifications when employees initiate actions (e.g. updating personal info)",
  "Improve on-screen text clarity with better labels, pop-ups, and definitions",
];

const OneAsureCaseStudy = ({ project, getSlotImage, onUploaded, projectId }: Props) => (
  <>
    {/* Problem */}
    <CaseStudySection label="The Problem" title="Disparate systems, broken workflows" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-6">{project.problem}</p>
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
      <ImageSlot slot="problem-screenshot" label="Current portal screenshot" imageSrc={getSlotImage("problem-screenshot")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Overview */}
    <CaseStudySection label="Overview" title="Revolutionizing Asure HCM" icon={<Lightbulb className="h-4 w-4" />}>
      <p className="mb-6">This project aimed to streamline HR management by consolidating diverse functionalities into a cohesive and efficient system. I actively collaborated with cross-functional teams, leveraging insights to refine the portal's overall user experience.</p>
      <p className="mb-8 text-muted-foreground">My responsibilities spanned information architecture, wireframing, and prototyping to enhance the portal's usability.</p>

      {/* Team grid */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Team", items: ["4 UX designers", "8 developers", "1 project manager"] },
          { label: "My Role", items: ["UX design", "UX research", "Stakeholder Presentation"] },
          { label: "Timeline", items: ["Overall: 6+ months", "Discovery: 4+ weeks", "Design & Testing: 8 weeks"] },
        ].map((col, i) => (
          <Card key={i} className="border-border bg-card/50">
            <CardContent className="p-5">
              <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-3">{col.label}</p>
              <ul className="space-y-1">
                {col.items.map((item, j) => (
                  <li key={j} className="text-sm">{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </CaseStudySection>

    {/* Stats */}
    <CaseStudySection label="By the Numbers" title="Research at scale" icon={<BarChart3 className="h-4 w-4" />}>
      <p className="mb-6">We actively engaged in user interviews throughout the design process to guarantee that the features we were developing aligned with the actual needs of our users.</p>
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

    {/* Design Process */}
    <CaseStudySection label="Design Process" title="My Design Process" icon={<ClipboardList className="h-4 w-4" />}>
      {/* Phase timeline */}
      <div className="flex flex-wrap gap-2 mb-10">
        {designPhases.map((p) => (
          <div key={p.num} className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5">
            <span className="text-accent font-bold text-xs">{p.num}</span>
            <span className="text-xs font-medium text-foreground">{p.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-12">
        {designPhases.map((phase, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-accent font-bold text-2xl">{phase.num}</span>
              <h3 className="text-xl font-bold text-foreground">{phase.title}</h3>
            </div>
            <div className="space-y-4 ml-10">
              {phase.items.map((item, j) => (
                <div key={j} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                  <div>
                    <p className="font-bold text-foreground text-sm mb-1">{item.heading}</p>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </CaseStudySection>

    {/* UI Design Findings */}
    <CaseStudySection label="UI Design" title="What users asked for" icon={<Search className="h-4 w-4" />}>
      <p className="mb-6">The first priority was upgrading the portal's look and feel, addressing concerns that the current design was challenging to showcase to clients. Users were unanimous on several specific needs:</p>
      <div className="space-y-3 mb-8">
        {uiFindings.map((f, i) => (
          <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
            <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
            <p className="text-sm">{f}</p>
          </div>
        ))}
      </div>
      <ImageSlot slot="ui-design" label="Upgraded portal UI screens" imageSrc={getSlotImage("ui-design")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Solution */}
    <CaseStudySection label="The Solution" title="One unified HCM portal" icon={<Lightbulb className="h-4 w-4" />}>
      <p className="mb-8">{project.solution}</p>
      <ImageSlot slot="solution" label="Final portal design" imageSrc={getSlotImage("solution")} projectId={projectId} onUploaded={onUploaded} />
    </CaseStudySection>

    {/* Learnings */}
    {project.learnings && (
      <CaseStudySection label="Learnings" title="What I Learned" icon={<Lightbulb className="h-4 w-4" />}>
        <div className="space-y-4">
          {project.learnings.map((l, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/20 border border-border">
              <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
              <p>{l}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>
    )}

    {/* Next Steps */}
    {project.nextSteps && project.nextSteps.length > 0 && (
      <CaseStudySection label="Next Steps" title="What comes next" icon={<Rocket className="h-4 w-4" />}>
        <p className="mb-6">After finishing the design, our next steps involve talking to the people who will use the portal and those who help sell it. We want to hear what they think and keep making the portal better based on their suggestions.</p>
        <div className="space-y-3">
          {project.nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>

        <Card className="border-accent/30 bg-accent/5 mt-8">
          <CardContent className="p-6 text-center">
            <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">Thank you for reading</p>
            <p className="text-foreground font-medium">Want to work together? Feel free to reach out — or just say hello on LinkedIn.</p>
          </CardContent>
        </Card>
      </CaseStudySection>
    )}
  </>
);

export default OneAsureCaseStudy;
