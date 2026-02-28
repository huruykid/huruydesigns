import { motion } from "framer-motion";
import {
  AlertTriangle,
  Lightbulb,
  BarChart3,
  Rocket,
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
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CaseStudySection from "./CaseStudySection";
import TaxComplianceDashboardDemo from "./TaxComplianceDashboardDemo";
import ResponsiveAppShell from "./ResponsiveAppShell";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

const problemCards = [
  { icon: <Lock className="h-5 w-5" />, title: "Backend Logic Exposed", body: "Database-level relationships surfaced in the UI with no conceptual scaffolding. Users had to understand the system model just to complete basic tasks." },
  { icon: <Eye className="h-5 w-5" />, title: "Implicit State Changes", body: "Saving a configuration could silently alter downstream compliance behavior. Users had no visibility into what changed or what it affected." },
  { icon: <Layers className="h-5 w-5" />, title: "Invisible Entity Relationships", body: "Tax codes, formulas, filing frequencies, and payees were interdependent — but visually disconnected. Edits cascaded in unexpected ways." },
  { icon: <Shield className="h-5 w-5" />, title: "Revision Rules Not Intuitive", body: "When a config should be locked, released, or versioned was undocumented and opaque — creating compliance drift risk." },
  { icon: <Zap className="h-5 w-5" />, title: "Confusing Threshold Triggers", body: "Threshold-based behavioral changes — where one value unlocks or restricts another — were entirely hidden from the user." },
  { icon: <Building2 className="h-5 w-5" />, title: "No Scalability Pattern", body: "9,000+ tax codes with no consistent interaction model. Every configuration felt bespoke and fragile." },
];

const audienceNeeds = [
  { role: "Payroll Admins", need: "Determinism — predictable, safe, explicit configuration flows" },
  { role: "SMEs", need: "Compliance rigor — no way to accidentally violate regulatory rules" },
  { role: "Engineering", need: "Clear state definitions — UI that maps to the actual backend model" },
];

const roleItems = [
  "Spent multiple days onsite in Dallas collaborating with engineering, PM, and SMEs",
  "Facilitated whiteboarding sessions to map entity relationships and dependency chains",
  "Redefined configuration flows to reflect real compliance mental models",
  "Influenced how state transitions were surfaced and communicated in the UI",
  "Designed revision lifecycle behavior — draft, lock, release, version",
  "Created wireframes and interactive prototypes to align all three stakeholder groups",
];

const coreContributions = [
  {
    letter: "A",
    title: "Entity Relationship Clarity",
    subtitle: "Parent-child hierarchy surfaced in navigation and forms — so a payroll admin editing a formula understands what downstream tax codes and filing frequencies are affected.",
    problemPoints: ["Entities visually disconnected", "Hidden downstream dependencies", "No parent-child hierarchy visible", "Silent cascading on edit"],
    solutionPoints: ["Clarified parent-child hierarchy", "Navigation mirrors entity model", "Surfaced downstream impact", "Reduced hidden dependencies"],
  },
  {
    letter: "B",
    title: "State-Driven Revision Lifecycle",
    subtitle: "Explicit state. No silent changes. No compliance drift.",
    problemPoints: ["No visible draft vs. live distinction", "Changes could silently affect live filing", "No audit trail for revisions", "Locking behavior undocumented"],
    solutionPoints: ["Draft → Review → Locked → Released", "Explicit release triggers", "Historical version access", "Audit visibility throughout"],
  },
  {
    letter: "C",
    title: "Dynamic Validation & Threshold Modeling",
    subtitle: "Making threshold logic legible, not surprising",
    problemPoints: ["Threshold triggers implicit and invisible", "No field-level validation feedback", "Jurisdiction rules not surfaced", "Users guessed at required values"],
    solutionPoints: ["Conditional field visibility", "Threshold warnings before errors", "Hard stops with clear rationale", "Jurisdiction-specific validation rules"],
  },
  {
    letter: "D",
    title: "Scalable CRUD for 9,000+ Tax Codes",
    subtitle: "Usability at a scale that breaks default patterns",
    problemPoints: ["Flat, unsortable tax code lists", "No structured search or filtering", "Linking across entities was manual", "Accidental misconfiguration risk"],
    solutionPoints: ["Multi-dimension filterable tables", "Structured search with clear scope", "Deterministic entity linking", "Dependency warnings on destructive actions"],
  },
];

const validationMatrix = [
  { condition: "Rate > jurisdiction threshold", behavior: "Additional rate fields revealed", type: "Warning" },
  { condition: "Filing frequency = quarterly", behavior: "Annual limit field required", type: "Conditional" },
  { condition: "Payee type = electronic", behavior: "Routing + account fields visible", type: "Standard" },
  { condition: "Multi-state employer flag", behavior: "Reciprocity field required", type: "Conditional" },
  { condition: "Missing required jurisdiction field", behavior: "Save blocked, inline guidance shown", type: "Hard Stop" },
  { condition: "Holiday falls on filing date", behavior: "Auto-adjusted date surfaced for review", type: "Warning" },
];

const intuitionCards = [
  { title: "Step-Based Workflows", body: "Complex configurations broken into ordered, completable steps. Progress made visible." },
  { title: "Predictable Patterns", body: "Consistent interaction models across all entity types. Learn once — apply across 9,000+ tax codes." },
  { title: "Clear Status Indicators", body: "Every record communicates its state immediately — draft, locked, released, error." },
  { title: "Visual Hierarchy for Decisions", body: "Critical fields up front, advanced settings revealed progressively." },
  { title: "Progressive Disclosure", body: "Advanced jurisdiction-specific settings hidden by default. Surfaced only when relevant." },
  { title: "Consistent CRUD Patterns", body: "Create, edit, delete, and link interactions followed identical models regardless of entity type." },
];

const transformations = [
  { from: "Raw database relationships", to: "Structured entity hierarchy" },
  { from: "Implicit state changes", to: "Explicit state machine" },
  { from: "Hidden threshold logic", to: "Surfaced validation logic" },
  { from: "Disconnected entity forms", to: "Unified configuration flows" },
  { from: "No revision visibility", to: "Audit-ready revision lifecycle" },
  { from: "Flat unstructured tables", to: "Filterable, searchable tables" },
];

const collaborators = [
  {
    group: "Engineers",
    items: ["Validated technical feasibility of state models", "Informed data architecture constraints", "Confirmed which relationships were database-enforced", "Aligned on API-level state transitions"],
  },
  {
    group: "Subject Matter Experts",
    items: ["Validated compliance accuracy of flows", "Confirmed threshold trigger logic", "Reviewed jurisdiction-specific edge cases", "Approved revision lifecycle model"],
  },
  {
    group: "Product Managers",
    items: ["Aligned design scope with roadmap priorities", "Triaged which entity types to tackle first", "Managed stakeholder expectations on phasing", "Bridged business requirements to design intent"],
  },
];

const impactItems = [
  { icon: <Shield className="h-5 w-5" />, title: "Prevented Silent State Changes", body: "Explicit state machine eliminated a class of errors where configuration edits cascaded invisibly into live payroll filings — protecting compliance for thousands of active employers." },
  { icon: <Layers className="h-5 w-5" />, title: "Clarified Entity Relationships", body: "Parent-child hierarchy made visible in navigation and forms — reducing misconfiguration from disconnected entity editing." },
  { icon: <BarChart3 className="h-5 w-5" />, title: "Reduced Configuration Ambiguity", body: "Structured step-based workflows gave payroll admins a clear path through every configuration — no more guessing, no more silent errors." },
  { icon: <ClipboardList className="h-5 w-5" />, title: "Improved Audit Transparency", body: "Every state change is now traceable with a full revision history — a non-negotiable requirement for regulatory compliance audits." },
  { icon: <Search className="h-5 w-5" />, title: "Aligned UX with Backend State Model", body: "UI state transitions map 1:1 to actual data model states — reducing implementation ambiguity, cutting engineering overhead, and preventing the product from diverging from the system again." },
  { icon: <Building2 className="h-5 w-5" />, title: "Structured Scalable Architecture", body: "Consistent interaction patterns across all 9,000+ tax codes mean new jurisdictions can be onboarded without a redesign." },
];


/* ─── Entity Relationship Diagram ─── */
const EntityDiagram = () => {
  const entities = ["Tax Code", "Payee", "Formula", "Filing Frequency", "Holiday Calendar", "Revision & Release"];
  return (
    <div className="rounded-xl border border-border bg-card/50 p-6 overflow-x-auto mb-6">
      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-6">Entity Ecosystem</p>
      <div className="flex items-start justify-between gap-3 min-w-[660px] px-2">
        {entities.map((e, i) => (
          <div key={e} className="flex items-center gap-3">
            <div className="flex flex-col items-center text-center" style={{ width: 80 }}>
              <div className="w-16 h-16 rounded-xl bg-accent/10 border-2 border-accent flex items-center justify-center">
                <span className="text-accent font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="text-xs font-medium text-foreground mt-2.5 leading-tight">{e}</p>
            </div>
            {i < entities.length - 1 && (
              <ArrowRight className="h-4 w-4 text-accent/40 shrink-0 mt-[-1.25rem]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── State Machine Diagram ─── */
const StateMachineDiagram = () => {
  const states = [
    { label: "Draft", desc: "Editable", color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-600 dark:text-yellow-400" },
    { label: "In Review", desc: "SME sign-off", color: "bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-400" },
    { label: "Locked", desc: "Immutable", color: "bg-orange-500/20 border-orange-500/50 text-orange-600 dark:text-orange-400" },
    { label: "Released", desc: "Live / versioned", color: "bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-400" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card/50 p-6 overflow-x-auto mb-6">
      <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-4">Revision Lifecycle State Machine</p>
      <div className="flex items-center gap-0 min-w-[500px]">
        {states.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center text-center flex-1">
              <div className={`px-4 py-3 rounded-lg border-2 ${s.color}`}>
                <p className="font-bold text-sm">{s.label}</p>
                <p className="text-xs opacity-70 mt-0.5">{s.desc}</p>
              </div>
            </div>
            {i < states.length - 1 && (
              <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0 -mx-1" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span>🔒 Lock prevents all edits until explicitly unlocked</span>
        <span>📦 Release creates immutable version snapshot</span>
        <span>↩️ Rollback available to any prior released state</span>
        <span>📋 Audit log captures every state transition</span>
      </div>
    </div>
  );
};

const AsureComplianceCaseStudy = ({ project, getSlotImage }: Props) => {
  return (
    <>
      {/* 01 — CONTEXT & SCALE */}
      <CaseStudySection label="01 — Context & Scale" title="An engine hidden behind legacy abstraction" icon={<Search className="h-4 w-4" />}>
        <p className="mb-8">
          Asure's payroll compliance engine sits underneath payroll processing for thousands of employers across the US and Canada. Every state, province, and locality has its own rules — and misconfiguring any one of them doesn't produce a bug. It produces a failed tax filing or a regulatory penalty.
        </p>
        <EntityDiagram />
      </CaseStudySection>

      {/* 02 — THE REAL PROBLEM */}
      <CaseStudySection label="02 — The Real Problem" title="The brief was to redesign screens. The real problem was elsewhere." icon={<AlertTriangle className="h-4 w-4" />}>
        <p className="mb-4">
          Nobody — not engineering, not the SME team, not product — had a complete map of how the entities related to each other. Everyone held a partial model. Engineers understood the data layer. SMEs understood the regulatory logic. But the dependency chain connecting a tax code to a formula to a filing frequency to a payee to a holiday calendar had never been drawn end-to-end.
        </p>
        <p className="mb-8">
          That was the real problem. Not the screens. The absence of a shared mental model — and a product that had been built on top of that absence for years.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {problemCards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="border-border bg-muted/20 h-full">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent">{card.icon}</span>
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
          {audienceNeeds.map((a, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
              <span className="text-accent font-bold text-sm shrink-0 mt-0.5">{a.role}</span>
              <p className="text-sm">{a.need}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* 03 — MY ROLE & INFLUENCE */}
      <CaseStudySection label="03 — My Role & Influence" title="Embedded, cross-functional, onsite in Dallas." icon={<Users className="h-4 w-4" />}>
        <p className="mb-4">
          My most significant contribution wasn't a deliverable. It was forcing a conversation that hadn't happened yet.
        </p>
        <p className="mb-4">
          When I mapped the entity dependency chain on a whiteboard — tax code to formula to filing frequency to payee to holiday calendar — the room got quiet. Engineers recognized the data relationships. SMEs recognized the compliance logic. Neither group had seen both layers mapped together before. That diagram became the foundation for everything that followed.
        </p>
        <p className="mb-8">
          I also pushed hard for one specific architectural decision that engineering initially resisted: UI state should map 1:1 to backend state. No abstract statuses, no optimistic UI that hid what was actually happening in the system. For a compliance product, that's not a UX preference — it's a correctness requirement.
        </p>
        <div className="rounded-xl overflow-hidden border border-border mb-8">
          <div className="aspect-[16/7] overflow-hidden">
            <img src="/images/asure/dallas-onsite.png" alt="Onsite collaboration session in Dallas with the Asure engineering and compliance teams" className="w-full h-full object-cover object-[center_25%]" />
          </div>
          <div className="px-4 py-2.5 bg-muted/30 border-t border-border">
            <p className="text-xs text-muted-foreground">Onsite in Dallas — collaborating with engineering and compliance SMEs</p>
          </div>
        </div>
        <div className="space-y-2">
          {roleItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/20 border border-border">
              <span className="text-accent font-bold text-sm shrink-0 mt-0.5">0{i + 1}</span>
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </CaseStudySection>

      {/* 04 — CORE DESIGN CONTRIBUTIONS */}
      <CaseStudySection label="04 — Core Design Contributions" title="Four architectural design systems" icon={<ClipboardList className="h-4 w-4" />}>
        <p className="mb-8">
          Each contribution addressed a distinct failure mode in the legacy system — and together they formed a coherent, scalable configuration platform.
        </p>

        <div className="space-y-12">
          {coreContributions.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
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
                      {c.problemPoints.map((p, j) => (
                        <li key={j} className="text-sm flex items-start gap-2">
                          <span className="text-destructive mt-0.5">✗</span> {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-green-500/20 bg-green-500/5">
                  <CardContent className="p-4">
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-2">Solution</p>
                    <ul className="space-y-1.5">
                      {c.solutionPoints.map((s, j) => (
                        <li key={j} className="text-sm flex items-start gap-2">
                          <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Insert state machine after contribution B */}
              {c.letter === "B" && <div className="mt-6"><StateMachineDiagram /></div>}

              {/* Insert validation matrix after contribution C */}
              {c.letter === "C" && (
                <div className="mt-6 rounded-xl border border-border bg-card/50 overflow-x-auto">
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide p-4 pb-2">Validation Matrix</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-bold text-foreground">Condition</th>
                        <th className="text-left p-3 font-bold text-foreground">Field Behavior</th>
                        <th className="text-left p-3 font-bold text-foreground">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {validationMatrix.map((row, j) => (
                        <tr key={j} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="p-3">{row.condition}</td>
                          <td className="p-3">{row.behavior}</td>
                          <td className="p-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                              row.type === "Hard Stop" ? "bg-destructive/15 text-destructive" :
                              row.type === "Warning" ? "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400" :
                              row.type === "Conditional" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400" :
                              "bg-muted text-foreground"
                            }`}>
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

      {/* 05 — DESIGNING FOR INTUITION */}
      <CaseStudySection label="05 — Designing for Intuition" title="Translating regulatory logic into human mental models" icon={<Lightbulb className="h-4 w-4" />}>
        <p className="mb-6">
          The differentiator wasn't the UI patterns — it was the translation layer. Turning compliance logic into something a payroll admin can confidently configure without a tax law degree.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {intuitionCards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="border-border bg-card/50 h-full">
                <CardContent className="p-5">
                  <h3 className="font-bold text-foreground text-sm mb-1">{card.title}</h3>
                  <p className="text-sm">{card.body}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Transformation panel */}
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
          <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-4">Legacy → Redesign</p>
          <div className="space-y-3">
            {transformations.map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground line-through flex-1">{t.from}</span>
                <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                <span className="text-foreground font-medium flex-1">{t.to}</span>
              </div>
            ))}
          </div>
        </div>
      </CaseStudySection>

      {/* Product Screenshot — Interactive Prototype */}
      <div className="mb-20">
        <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Interactive Prototype</p>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Tax Compliance Dashboard</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Click on chart bars, table rows, and deadlines to explore the interactive prototype.
        </p>
        <ResponsiveAppShell label="Asure — Tax Compliance Dashboard" desktopWidth={680} allowToggle mobileWidth={280} mobileHeight={520}>
          <TaxComplianceDashboardDemo />
        </ResponsiveAppShell>
      </div>

      <CaseStudySection label="06 — Collaboration" title="Three disciplines. One shared mental model." icon={<Users className="h-4 w-4" />}>
        <p className="mb-4">
          The sharpest moment came when we got to revision and release. Engineers had a precise technical definition of "released" — a record flag, a database state. SMEs had a compliance definition — a configuration that had been reviewed, approved, and is now legally in effect. These weren't the same thing, and for years the product had quietly conflated them.
        </p>
        <p className="mb-8">
          The state machine we landed on wasn't just a UX pattern. It was a negotiated definition — a shared contract between what the system does and what the business means. That conversation couldn't have happened in a ticket or a Slack thread. It happened on a whiteboard in Dallas with both sides in the room.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {collaborators.map((col, i) => (
            <Card key={i} className="border-border bg-card/50">
              <CardContent className="p-5">
                <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-3">{col.group}</p>
                <ul className="space-y-2">
                  {col.items.map((item, j) => (
                    <li key={j} className="text-sm flex items-start gap-2">
                      <ChevronRight className="h-3 w-3 mt-1 text-accent shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </CaseStudySection>

      {/* 07 — IMPACT */}
      <CaseStudySection label="07 — Impact" title="Structural outcomes over vanity metrics" icon={<Star className="h-4 w-4" />}>
        <p className="mb-6">
          The results of this work aren't measured in clicks — they're measured in eliminated risk, increased clarity, and an architecture that scales to regulatory complexity.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {impactItems.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Card className="border-accent/20 bg-accent/5 h-full">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-accent">{item.icon}</span>
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
      {project.learnings && project.learnings.length > 0 && (
        <CaseStudySection label="What I Learned" title="Reflections" icon={<Lightbulb className="h-4 w-4" />}>
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

      {/* 08 — LET'S WORK TOGETHER */}
      <div className="rounded-2xl bg-[hsl(220,30%,12%)] dark:bg-[hsl(220,30%,8%)] p-8 sm:p-12 text-center mt-12">
        <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">08 — Let's Work Together</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Let's Work Together</h2>
        <p className="text-base text-white/70 max-w-2xl mx-auto mb-8">
          I specialize in complex enterprise products — systems where getting the UX wrong isn't an inconvenience, it's a liability. If that's the kind of work you're hiring for, let's talk.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="/contact">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Get in Touch <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </a>
          <a href="/#projects">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              View All Projects
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default AsureComplianceCaseStudy;
