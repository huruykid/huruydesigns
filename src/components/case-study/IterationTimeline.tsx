import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const iterations = [
  {
    round: 1,
    label: "Audit & Mapping",
    phase: "Discovery",
    summary: "Mapped the existing Asure portal ecosystem: 4 separate products, 4 different IA patterns. Created a full sitemap of the existing state to expose structural gaps before touching any UI.",
    changes: ["Sitemap of all 4 portals", "Navigation pattern audit", "Entry point inventory"],
  },
  {
    round: 2,
    label: "IA Restructure",
    phase: "Architecture",
    summary: "Proposed a unified information architecture that collapsed four separate navigation systems into one. Validated structure with card sorting sessions with HR admins.",
    changes: ["Unified nav taxonomy", "Card sort with 8 admins", "Module grouping logic"],
  },
  {
    round: 3,
    label: "Lo-fi Wireframes",
    phase: "Wireframing",
    summary: "First sketches of the consolidated dashboard. Focused on the primary admin view, the most complex use case, before tackling employee-facing flows.",
    changes: ["Admin dashboard wireframe", "Primary nav exploration (x4)", "Auth flow sketches"],
  },
  {
    round: 4,
    label: "SSO Flow Design",
    phase: "Wireframing",
    summary: "Redesigned the authentication flow from 4 separate login pages to a single unified entry point. This was the most consistently requested change across all user interviews.",
    changes: ["Single sign-on entry", "Role-based redirects", "Error state handling"],
  },
  {
    round: 5,
    label: "Modular Nav System",
    phase: "Prototyping",
    summary: "Designed the module visibility system so enterprise clients see only the products they've purchased. A key insight: showing everything to everyone was actively hurting adoption.",
    changes: ["Module toggle system", "Client config logic", "Collapsed nav states"],
  },
  {
    round: 6,
    label: "Notification Layer",
    phase: "Prototyping",
    summary: "Designed the admin notification architecture from scratch. Admins had zero visibility into employee-initiated actions, a critical gap that caused errors and compliance risk.",
    changes: ["Real-time alert system", "Priority notification queue", "Action confirmation flows"],
  },
  {
    round: 7,
    label: "Visual System",
    phase: "UI Design",
    summary: "Replaced outdated iconography (the floppy disk was the most complained-about element), unified type hierarchy, and established consistent component patterns across all modules.",
    changes: ["Icon system refresh", "Typography scale", "Component library v1"],
  },
  {
    round: 8,
    label: "Final Iteration",
    phase: "Polish",
    summary: "Addressed the last round of usability test findings: edge cases in the notification flow, admin labeling confusion, and navigation behavior on smaller screens.",
    changes: ["Notification edge cases", "Copy revisions", "Responsive fixes"],
  },
];

const phaseColors: Record<string, string> = {
  Discovery: "text-blue-400",
  Architecture: "text-purple-400",
  Wireframing: "text-amber-400",
  Prototyping: "text-emerald-400",
  "UI Design": "text-rose-400",
  Polish: "text-accent",
};

const IterationTimeline = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => Math.max(0, i - 1));
  const next = () => setActive((i) => Math.min(iterations.length - 1, i + 1));

  const current = iterations[active];

  return (
    <div className="mt-8 rounded-xl border border-border bg-card/40 overflow-hidden">
      {/* Round pills */}
      <div className="flex items-center gap-1 p-4 border-b border-border overflow-x-auto scrollbar-none">
        {iterations.map((it, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              i === active
                ? "bg-accent text-accent-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            R{it.round}
          </button>
        ))}
        {/* Progress bar */}
        <div className="ml-auto shrink-0 flex items-center gap-2 pl-4">
          <span className="text-xs text-muted-foreground">{active + 1}/{iterations.length}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className={`text-xs font-semibold uppercase tracking-wide ${phaseColors[current.phase]}`}>
                  {current.phase}
                </span>
                <h4 className="text-lg font-bold text-foreground mt-0.5">
                  Round {current.round}: {current.label}
                </h4>
              </div>
              {/* Progress dots */}
              <div className="flex gap-1 shrink-0 mt-1">
                {iterations.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-4 bg-accent" : i < active ? "w-1.5 bg-accent/40" : "w-1.5 bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{current.summary}</p>

            <div className="flex flex-wrap gap-2">
              {current.changes.map((c, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted/50 border border-border text-foreground font-medium"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-muted/20">
        <button
          onClick={prev}
          disabled={active === 0}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Previous
        </button>
        <span className="text-xs text-muted-foreground">
          8 rounds · 6+ months
        </span>
        <button
          onClick={next}
          disabled={active === iterations.length - 1}
          className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

export default IterationTimeline;
