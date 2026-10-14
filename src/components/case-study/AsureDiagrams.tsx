import { ArrowDown, ArrowRight } from "lucide-react";

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

/** Six entities in dependency order: a column on phones, a row once there is room. */
export const EntityDiagram = () => (
  <figure className="mb-6 rounded-xl border border-border bg-card/50 p-6 lg:p-8">
    <figcaption className="mb-6 text-xs font-semibold uppercase tracking-wide text-accent">Entity Ecosystem</figcaption>
    <ol className="flex flex-col items-start gap-2 md:flex-row md:items-start md:justify-between md:gap-0" aria-label="Entities, in dependency order">
      {asureEntities.map((e, i) => (
        <li key={e} className="flex flex-col items-start md:flex-1 md:flex-row md:items-start">
          <div className="flex items-center gap-3 md:flex-1 md:flex-col md:gap-0 md:text-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 border-accent bg-accent/10 md:h-16 md:w-16">
              <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="text-sm font-medium leading-tight text-foreground md:mt-2.5 md:text-xs">{e}</p>
          </div>
          {i < asureEntities.length - 1 && (
            <>
              <ArrowDown className="my-1 ml-4 h-4 w-4 text-accent/50 md:hidden" aria-hidden="true" />
              <ArrowRight className="mt-6 hidden h-4 w-4 shrink-0 text-accent/40 md:block" aria-hidden="true" />
            </>
          )}
        </li>
      ))}
    </ol>
  </figure>
);

const states = [
  { label: "Draft", desc: "Editable", color: "bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-400" },
  { label: "In Review", desc: "SME sign-off", color: "bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-400" },
  { label: "Locked", desc: "Immutable", color: "bg-orange-500/20 border-orange-500/50 text-orange-800 dark:text-orange-400" },
  { label: "Released", desc: "Live / versioned", color: "bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-400" },
];

export const StateMachineDiagram = () => (
  <figure className="mb-6 rounded-xl border border-border bg-card/50 p-6 lg:p-8" aria-label="Revision lifecycle state machine">
    <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-accent">Revision Lifecycle State Machine</p>
    <ol className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-0">
      {states.map((s, i) => (
        <li key={s.label} className="flex flex-col items-center sm:flex-1 sm:flex-row">
          <div className={`w-full rounded-lg border-2 px-4 py-3 text-center sm:flex-1 ${s.color}`}>
            <p className="text-sm font-bold">{s.label}</p>
            <p className="mt-0.5 text-xs opacity-80">{s.desc}</p>
          </div>
          {i < states.length - 1 && (
            <>
              <ArrowDown className="my-1 h-4 w-4 text-muted-foreground/50 sm:hidden" aria-hidden="true" />
              <ArrowRight className="mx-1 hidden h-4 w-4 shrink-0 text-muted-foreground/50 sm:block" aria-hidden="true" />
            </>
          )}
        </li>
      ))}
    </ol>
    <ul className="mt-4 grid gap-1.5 text-xs text-muted-foreground sm:grid-cols-2">
      <li>Lock prevents all edits until explicitly unlocked</li>
      <li>Release creates an immutable version snapshot</li>
      <li>Rollback is available to any prior released state</li>
      <li>The audit log captures every state transition</li>
    </ul>
  </figure>
);
