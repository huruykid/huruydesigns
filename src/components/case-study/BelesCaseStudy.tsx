import ExistingSolutionsComparison from "./ExistingSolutionsComparison";
import ShmageleFlowDiagram from "./ShmageleFlowDiagram";
import JustFriendsToggle from "./JustFriendsToggle";
import InterviewInsightCards from "./InterviewInsightCards";
import UsabilityStatBars from "./UsabilityStatBars";
import NavRedesignComparison from "./NavRedesignComparison";
import CaseStudySection from "./CaseStudySection";
import { ArrowUpRight } from "lucide-react";
import { DecisionList, NumberedList, StatRow } from "./primitives";
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

const decisionVisuals = [<ShmageleFlowDiagram />, <JustFriendsToggle />, <NavRedesignComparison />];

const BelesCaseStudy = ({ project }: Props) => (
  <>
    <CaseStudySection label="Context" title="A displaced community with nowhere to connect">
      <p className="mb-6">{project.problem}</p>
      <p className="mb-8">Mainstream dating apps had no way to find other Tigrayans, and no concept of the matchmaking tradition the community already trusted.</p>
      <ExistingSolutionsComparison />
    </CaseStudySection>

    <CaseStudySection label="The Hard Problem" title="Tradition inside a modern app, without flattening it">
      <p className="mb-8">
        The obvious product was a swipe app with an ethnicity filter. The interviews (8 people, ages 19 to 55, across the diaspora) pointed somewhere harder: people wanted the trust of traditional matchmaking, a way to stay close to community events, and in many cases connection without dating at all. The design problem was making those three things coexist in one product a 26-year-old and a 55-year-old would both understand.
      </p>
      <InterviewInsightCards />
    </CaseStudySection>

    <CaseStudySection label="Decisions" title="Three calls I made, and what I turned down">
      <DecisionList items={decisions} after={(i) => <div className="mt-6">{decisionVisuals[i]}</div>} />
    </CaseStudySection>

    <CaseStudySection label="Evidence" title="Round one findings, and what changed by round two">
      <p className="mb-6">Eight participants tested the low-fidelity prototype. These were the round-one findings that drove the decisions above.</p>
      <UsabilityStatBars />
      {project.validationMetrics && <StatRow stats={project.validationMetrics} columns={2} className="mt-10" />}
    </CaseStudySection>

    {project.learnings && (
      <CaseStudySection label="What I Learned" title="You can't design for a community from outside it">
        <NumberedList items={project.learnings} />
      </CaseStudySection>
    )}

    <CaseStudySection label="Status" title="Where it stands">
      <p className="mb-6">
        Beles is now a live web app, built and shipped after the research and testing rounds above. The profiles and match flow in the demos on this page come straight from the live product, including the Shmagele suggestion card shown at the moment a match lands. Next up: a beta with community organizations, Tigrinya language support, and instrumenting match and event-attendance rates.
      </p>
      <a
        href="https://belesconnect.app?utm_source=portfolio&utm_medium=case_study&utm_campaign=beles"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center gap-1 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Visit the live app <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </CaseStudySection>
  </>
);

export default BelesCaseStudy;
