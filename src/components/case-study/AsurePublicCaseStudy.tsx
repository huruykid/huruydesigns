import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, Search, Users, ArrowRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CaseStudySection from "./CaseStudySection";
import { EntityDiagram, StateMachineDiagram, teaserTransformations, asureEntities } from "./AsureDiagrams";
import type { Project } from "@/lib/projects";

interface Props {
  project: Project;
}

/**
 * The architecture-level Asure Compliance story, public and indexable. It covers
 * the system model, the decisions and their reasoning. Client-specific detail
 * (the discovery narrative, validation rules, stakeholder specifics and outcomes)
 * stays in the passcode-gated narrative served by verify-passcode.
 */

const decisions = [
  {
    title: "Map the entity model before touching a screen",
    body: `The brief was a screen redesign. Nobody in the room (engineering, product or the compliance experts) held a complete picture of how the ${asureEntities.length} entity types depended on each other, so every screen would have encoded a partial model. I stopped the redesign, ran whiteboard sessions with all three groups, and drew the dependency chain end to end. That diagram became the contract everything else was built on.`,
    rejected: "Redesigning module by module. Faster to show progress, and it would have shipped six inconsistent mental models.",
  },
  {
    title: "UI state maps 1:1 to backend state",
    body: "In a compliance product, a screen that looks saved while the system is still deciding is a filing error waiting to happen. I pushed for an explicit revision lifecycle (draft, in review, locked, released) exposed exactly as the system holds it, with no optimistic UI and no abstract statuses. Engineering initially resisted the extra states; the compliance team made the case with me.",
    rejected: "Friendlier, simplified statuses. They read better and hid the one thing users needed to know: whether a change was live.",
  },
  {
    title: "Surface the validation logic instead of the errors",
    body: "Thresholds and jurisdiction rules changed which fields mattered, and users only found out by failing a save. I designed conditional disclosure driven by the same rules: fields appear when a threshold makes them relevant, warnings arrive before hard stops, and every hard stop says why. Configuration became a guided path rather than a guessing game.",
    rejected: "A comprehensive help panel. It documents the rules; it doesn't stop the mistake.",
  },
  {
    title: "One interaction model for 9,000+ agencies",
    body: "Each agency's configuration had grown bespoke. I defined a single create, edit, link and review pattern with filterable, searchable tables and dependency warnings on destructive actions, so that a new jurisdiction is onboarded with the same model rather than a new design.",
    rejected: "Per-agency templates. Quick wins for the biggest agencies, and a maintenance cliff for everyone else.",
  },
];

const AsurePublicCaseStudy = ({ project }: Props) => (
  <>
    <CaseStudySection label="Context" title="A compliance engine under every payroll" icon={<Search className="h-4 w-4" />}>
      <p className="mb-8">
        Asure's compliance engine sits underneath payroll processing for thousands of employers across the US and Canada, covering more than 9,000 tax agencies. Every jurisdiction has its own rules, and a misconfiguration doesn't produce a bug. It produces a failed filing or a penalty. I was embedded onsite in Dallas as the sole designer, working directly with engineering, product and the compliance subject-matter experts.
      </p>
      <EntityDiagram />
    </CaseStudySection>

    <CaseStudySection label="The Hard Problem" title="The brief was screens. The problem was a missing shared model." icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-4">{project.problem}</p>
      <p>
        Engineers understood the data layer. Compliance experts understood the regulatory logic. Product understood the roadmap. The connections between those layers had never been drawn, and the product had been built on that gap for years. The most consequential design work on this project was forcing that conversation and capturing its result.
      </p>
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
            {i === 1 && <div className="mt-6"><StateMachineDiagram /></div>}
          </motion.div>
        ))}
      </div>
    </CaseStudySection>

    <CaseStudySection label="What Changed" title="Legacy to redesign" icon={<Star className="h-4 w-4" />}>
      <div className="grid gap-2 mb-6">
        {teaserTransformations.map((t) => (
          <div key={t.from} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card">
            <span className="text-sm text-muted-foreground line-through flex-1">{t.from}</span>
            <ArrowRight className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium text-foreground flex-1">{t.to}</span>
          </div>
        ))}
      </div>
      <p>
        The outcomes here are structural rather than vanity metrics: a class of silent state changes eliminated, entity relationships visible in navigation and forms, an audit-ready revision history, and a configuration model that scales to new jurisdictions without a redesign.
      </p>
    </CaseStudySection>

    <CaseStudySection label="Working Across Disciplines" title="Three definitions of released, one contract" icon={<Users className="h-4 w-4" />}>
      <p>
        The sharpest moment was discovering that engineering, compliance and product each meant something different by "released". Reconciling those into one state machine was a negotiation, not a wireframe, and it could only happen with all three in the room. The full narrative below covers that discovery, the validation rules, the stakeholder work and the impact in detail.
      </p>
    </CaseStudySection>
  </>
);

export default AsurePublicCaseStudy;
