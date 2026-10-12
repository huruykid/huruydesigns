import { useId, useState } from "react";
import { ArrowRight, GitBranch, History, LockKeyhole, ShieldCheck } from "lucide-react";

const stages = [
  {
    label: "Dependencies",
    title: "See what a change affects",
    description: "Keep the related tax code, formula and filing frequency visible before editing a configuration.",
    status: "Draft",
    note: "Editing a draft does not imply that the change is live.",
  },
  {
    label: "Review",
    title: "Make the release decision explicit",
    description: "Show the proposed change and its dependencies together so a reviewer can assess the impact.",
    status: "In review",
    note: "Review, lock and release are distinct steps in the lifecycle.",
  },
  {
    label: "History",
    title: "Keep a traceable revision",
    description: "A released version retains its history. Later changes begin in a new revision, separate from the live configuration.",
    status: "Released",
    note: "The version history explains what changed and when it became live.",
  },
];

/** An explanatory reconstruction, never presented as a production screenshot. */
export default function ComplianceWorkflow({ interactive = false }: { interactive?: boolean }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const stage = stages[selected];
  return (
    <figure className="w-full min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/5">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
        <span className="text-sm font-semibold text-foreground">Asure / Configuration lifecycle</span>
        <span className="text-xs text-muted-foreground">Workflow illustration</span>
      </figcaption>
      <div className="p-5 sm:p-7">
        {interactive && (
          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Explore the configuration workflow">
            {stages.map((item, index) => (
              <button key={item.label} type="button" aria-pressed={selected === index} aria-controls={`${id}-stage`}
                onClick={() => setSelected(index)}
                className={`min-h-11 rounded-lg border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${selected === index ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:text-foreground"}`}>
                {index + 1}. {item.label}
              </button>
            ))}
          </div>
        )}
        <div id={`${id}-stage`} aria-live={interactive ? "polite" : undefined} aria-atomic="true">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Configuration revision</p>
            <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{stage.status}</span>
          </div>
          <p className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">{stage.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
          <div className="my-6 rounded-xl border border-border bg-muted/25 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground"><GitBranch className="h-4 w-4 text-accent" aria-hidden="true" /> Related configuration</div>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
              {["Tax code", "Formula", "Filing frequency"].map((entity) => <li key={entity} className="rounded-md border border-border bg-card px-3 py-3 text-center text-foreground">{entity}</li>)}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Dependencies stay visible while the revision is reviewed.</p>
          </div>
          <ol className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4" aria-label="Revision lifecycle">
            {["Draft", "In review", "Locked", "Released"].map((state, index) => (
              <li key={state} className={`flex items-center justify-between gap-1 rounded-md px-2 py-2.5 ${stage.status === state ? "bg-accent/10 font-semibold text-accent" : "bg-muted/40 text-muted-foreground"}`}>
                {state}{index < 3 && <ArrowRight className="h-3 w-3 shrink-0" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <div className="mt-5 flex items-start gap-2 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
            {selected === 2 ? <History className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> : selected === 1 ? <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" /> : <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />}
            <p>{stage.note}</p>
          </div>
        </div>
      </div>
      <p className="border-t border-border bg-muted/20 px-5 py-3 text-xs leading-relaxed text-muted-foreground">Reconstructed to explain the design approach. Not a production screen or a live compliance tool.</p>
    </figure>
  );
}
