import { ArrowRight } from "lucide-react";

/**
 * Public parts of the Asure Compliance case study. These render on the passcode
 * teaser as well as inside the gated narrative, so they hold no proprietary prose.
 */

export const asureEntities = ["Tax Code", "Payee", "Formula", "Filing Frequency", "Holiday Calendar", "Revision & Release"];

export const teaserTransformations = [
  { from: "Raw database relationships", to: "Structured entity hierarchy" },
  { from: "Implicit state changes", to: "Explicit state machine" },
  { from: "Hidden threshold logic", to: "Surfaced validation logic" },
  { from: "Disconnected entity forms", to: "Unified configuration flows" },
];

export const EntityDiagram = () => (
  <figure className="rounded-xl border border-border bg-card/50 p-6 overflow-x-auto mb-6" aria-label="Entity ecosystem diagram">
    <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-6">Entity Ecosystem</p>
    <div className="flex items-start justify-between gap-3 min-w-[660px] px-2">
      {asureEntities.map((e, i) => (
        <div key={e} className="flex items-center gap-3">
          <div className="flex flex-col items-center text-center" style={{ width: 80 }}>
            <div className="w-16 h-16 rounded-xl bg-accent/10 border-2 border-accent flex items-center justify-center">
              <span className="text-accent font-bold text-sm">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="text-xs font-medium text-foreground mt-2.5 leading-tight">{e}</p>
          </div>
          {i < asureEntities.length - 1 && (
            <ArrowRight className="h-4 w-4 text-accent/40 shrink-0 mt-[-1.25rem]" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  </figure>
);

const states = [
  { label: "Draft", desc: "Editable", color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-400" },
  { label: "In Review", desc: "SME sign-off", color: "bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-400" },
  { label: "Locked", desc: "Immutable", color: "bg-orange-500/20 border-orange-500/50 text-orange-800 dark:text-orange-400" },
  { label: "Released", desc: "Live / versioned", color: "bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-400" },
];

export const StateMachineDiagram = () => (
  <figure className="rounded-xl border border-border bg-card/50 p-6 overflow-x-auto mb-6" aria-label="Revision lifecycle state machine">
    <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-4">Revision Lifecycle State Machine</p>
    <div className="flex items-center gap-0 min-w-[500px]">
      {states.map((s, i) => (
        <div key={s.label} className="flex items-center flex-1">
          <div className="flex flex-col items-center text-center flex-1">
            <div className={`px-4 py-3 rounded-lg border-2 ${s.color}`}>
              <p className="font-bold text-sm">{s.label}</p>
              <p className="text-xs opacity-80 mt-0.5">{s.desc}</p>
            </div>
          </div>
          {i < states.length - 1 && (
            <ArrowRight className="h-4 w-4 text-muted-foreground/40 shrink-0 -mx-1" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
    <ul className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
      <li>Lock prevents all edits until explicitly unlocked</li>
      <li>Release creates an immutable version snapshot</li>
      <li>Rollback is available to any prior released state</li>
      <li>The audit log captures every state transition</li>
    </ul>
  </figure>
);
