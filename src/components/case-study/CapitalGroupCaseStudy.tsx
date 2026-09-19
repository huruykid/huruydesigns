import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Lightbulb, Search, ShieldCheck, Users, Layers, ArrowRight, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CaseStudySection from "./CaseStudySection";
import { Project } from "@/lib/projects";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

/**
 * Current-role narrative. Everything here is deliberately confidential-safe: it
 * describes the class of problem and how I work on it, never specific features,
 * data, screens or results. Add specifics only where cleared to share them.
 */

const decisions = [
  {
    title: "Provenance is part of the answer, not a footnote",
    body: "An AI-assisted summary an analyst can't trace is a liability, so every generated claim carries its sources in the same view, one click from the underlying material. I treat the citation as a first-class element of the interaction, with its own states, rather than a link appended afterwards.",
    rejected: "A cleaner reading experience that surfaced sources only on request. It tested well for speed and badly for trust; analysts told us they would not act on anything they had to go looking for.",
  },
  {
    title: "The model drafts and surfaces; the analyst decides",
    body: "I design assistance around what an analyst does anyway: pulling the relevant passages, comparing figures across documents, flagging changes since the last read. The tool accelerates those moves and stops short of forming the view. The analyst's judgment stays visibly the last step.",
    rejected: "Recommendation-style outputs that lead with a conclusion. They read as confident, which in regulated research is exactly the wrong default.",
  },
  {
    title: "Review and confidence are designed states, not warnings",
    body: "Working with compliance from the first prototype, I modeled who reviews what, when, and what they see: what is verified, what is pending analyst review, what needs sign-off. Those states live in the components themselves, so a team can't build a screen that skips them.",
    rejected: "A generic disclaimer banner. It satisfies a checklist and changes no behavior.",
  },
];

const howIWorkHere = [
  { icon: Search, title: "Shadow the workflow first", body: "Sessions with analysts on their real research before any wireframe, to find the moments where speed and trust collide." },
  { icon: Layers, title: "Prototype the risky moments in code", body: "Product, engineering and compliance review clickable prototypes of the trust-critical interactions, not decks describing them." },
  { icon: Users, title: "Negotiate the states with compliance", body: "Review and sign-off flows are agreed with the people who own the policy, then encoded as components." },
  { icon: ShieldCheck, title: "Codify into the design system", body: "Patterns that survive testing become shared components with usage rules, so every team ships the same trust model." },
];

const CapitalGroupCaseStudy = ({ project }: Props) => (
  <>
    <div className="mb-12 flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      <p>
        This is current, confidential work for a regulated financial institution. This page describes the problem class and how I approach it. Specifics (features, data, results) are available in conversation where I'm cleared to share them.
      </p>
    </div>

    <CaseStudySection label="Context" title="Analysts already have a workflow that works" icon={<Search className="h-4 w-4" />}>
      <p className="mb-4">
        Investment analysts at Capital Group read, compare and synthesize enormous volumes of material, and their output is subject to governance that most software never meets. Any new tool competes with a process they trust. An AI-assisted one starts with a deficit: the model can be fluent and wrong, and in this environment a confident error costs more than a slow answer.
      </p>
      <p>
        I joined (via Luxoft) to design research and analysis tools for that audience, embedded with product, engineering and compliance. The brief was about capability. The actual job turned out to be about trust.
      </p>
    </CaseStudySection>

    <CaseStudySection label="The Hard Problem" title="Where the model's work ends and the analyst's judgment begins" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-4">{project.problem}</p>
      <p>
        Every interaction decision comes back to one question: can the analyst see exactly what the system did, check it in one step, and remain the author of the conclusion? If the answer is no, the feature is unusable here no matter how good it looks.
      </p>
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
          </motion.div>
        ))}
      </div>
    </CaseStudySection>

    <CaseStudySection label="How I Work Here" title="From shadowing to shared components" icon={<Users className="h-4 w-4" />}>
      <div className="grid sm:grid-cols-2 gap-4">
        {howIWorkHere.map((h) => (
          <Card key={h.title} className="border-border bg-card/50">
            <CardContent className="p-5">
              <h.icon className="h-5 w-5 text-accent mb-3" aria-hidden="true" />
              <h3 className="font-bold text-foreground text-sm mb-1">{h.title}</h3>
              <p className="text-sm">{h.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </CaseStudySection>

    {project.learnings && (
      <CaseStudySection label="What I've Learned So Far" title="Trust is a workflow property" icon={<ShieldCheck className="h-4 w-4" />}>
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

    <div className="rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
      <h2 className="text-2xl font-bold mb-3 font-display">Want the specifics?</h2>
      <p className="text-muted-foreground max-w-xl mx-auto mb-6">
        I can walk through the work in a conversation, within what I'm cleared to share. The Asure Compliance study covers a comparable problem in full.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link to="/contact?role=senior-ux-designer">
            Email Huruy <ArrowRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/project/asure-compliance">Read the Asure study</Link>
        </Button>
      </div>
    </div>
  </>
);

export default CapitalGroupCaseStudy;
