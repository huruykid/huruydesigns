import { motion } from "framer-motion";
import { AlertTriangle, Lightbulb, BarChart3, Search, Users, Rocket } from "lucide-react";
import ExistingSolutionsComparison from "./ExistingSolutionsComparison";
import ShmageleFlowDiagram from "./ShmageleFlowDiagram";
import JustFriendsToggle from "./JustFriendsToggle";
import InterviewInsightCards from "./InterviewInsightCards";
import UsabilityStatBars from "./UsabilityStatBars";
import NavRedesignComparison from "./NavRedesignComparison";
import { Card, CardContent } from "@/components/ui/card";
import CaseStudySection from "./CaseStudySection";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

/**
 * Concept project, kept short and built around the decisions. Research scope: 8
 * interviews, 8-person usability test in two rounds, 5-person navigation follow-up.
 */

const decisions = [
  {
    title: "Explain Shmagele inside the product, not around it",
    body: "Traditional Tigrayan matchmaking works through trusted community members. The first prototype dropped that into the app as a feature name, and 3 of 8 testers didn't understand what it did or why they'd want it. I rejected the easy fix (rename it to something generic) because the tradition was the point. Instead I added an onboarding explainer, contextual tooltips, and a visible Shmagele score so the mechanism explained itself in use. Understanding went from 37.5% to 87.5% in the second round.",
    rejected: "Renaming it \"Trusted Introductions\". Clearer to a Western reader, and it would have erased the thing that made the app worth building.",
  },
  {
    title: "Serve people who want community more than dates",
    body: "Interviews kept surfacing people like Semhal, a student who wanted to meet other Tigrayans and track community events but had no interest in dating right now. Half the women in testing said they'd use the app today if a non-dating mode existed. I added a Just Friends mode as a first-class toggle rather than a hidden setting, and put event discovery in the primary navigation.",
    rejected: "Keeping it a dating app and treating events as a growth feature. Simpler positioning, and it would have excluded the users most eager to sign up.",
  },
  {
    title: "Cut the navigation to what people actually used",
    body: "All 8 testers called the first nav bar cluttered, even though they could find Events. I removed the icons nobody touched, tested three configurations with 5 people, and shipped the one where no participant flagged clutter.",
    rejected: "Keeping every section reachable from the bar for discoverability. Testing showed it cost more than it gave.",
  },
];

const BelesCaseStudy = ({ project }: Props) => (
  <>
    <CaseStudySection label="Context" title="A displaced community with nowhere to connect" icon={<Search className="h-4 w-4" />}>
      <p className="mb-6">{project.problem}</p>
      <p className="mb-4">Mainstream dating apps had no way to find other Tigrayans, and no concept of the matchmaking tradition the community already trusted.</p>
      <ExistingSolutionsComparison />
    </CaseStudySection>

    <CaseStudySection label="The Hard Problem" title="Tradition inside a modern app, without flattening it" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-6">
        The obvious product was a swipe app with an ethnicity filter. The interviews (8 people, ages 19 to 55, across the diaspora) pointed somewhere harder: people wanted the trust of traditional matchmaking, a way to stay close to community events, and in many cases connection without dating at all. The design problem was making those three things coexist in one product a 26-year-old and a 55-year-old would both understand.
      </p>
      <InterviewInsightCards />
    </CaseStudySection>

    <CaseStudySection label="Decisions" title="Three calls I made, and what I turned down" icon={<Lightbulb className="h-4 w-4" />}>
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
            {i === 0 && <div className="mt-6"><ShmageleFlowDiagram /></div>}
            {i === 1 && <div className="mt-6"><JustFriendsToggle /></div>}
            {i === 2 && <div className="mt-6"><NavRedesignComparison /></div>}
          </motion.div>
        ))}
      </div>
    </CaseStudySection>

    <CaseStudySection label="Evidence" title="Round one findings, and what changed by round two" icon={<BarChart3 className="h-4 w-4" />}>
      <p className="mb-4">Eight participants tested the low-fidelity prototype. These were the round-one findings that drove the decisions above.</p>
      <UsabilityStatBars />
      {project.validationMetrics && (
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {project.validationMetrics.map((m) => (
            <Card key={m.label} className="border-accent/30 bg-accent/5">
              <CardContent className="p-5 text-center">
                <p className="text-2xl font-bold text-accent mb-1">{m.value}</p>
                <p className="font-semibold text-foreground text-sm mb-1">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </CaseStudySection>

    {project.learnings && (
      <CaseStudySection label="What I Learned" title="You can't design for a community from outside it" icon={<Users className="h-4 w-4" />}>
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

    <CaseStudySection label="Status" title="Where it stands" icon={<Rocket className="h-4 w-4" />}>
      <p>
        Beles is a tested prototype, not a shipped product. To take it further I would run a beta with community organizations, add Tigrinya language support, and instrument match and event-attendance rates before building anything else. It remains the project that taught me the most about designing for a culture with real depth, and it's why I now start every project by finding the people the obvious solution would leave out.
      </p>
    </CaseStudySection>
  </>
);

export default BelesCaseStudy;
