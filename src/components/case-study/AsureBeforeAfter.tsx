import type { ReactNode } from "react";
import { Caption } from "./primitives";

/**
 * Annotated before and after for editing a tax rate. Both sides are wireframes
 * recreated from memory with sample values; nothing is taken from Asure's product.
 */

const Pin = ({ n, className }: { n: number; className: string }) => (
  <span
    aria-hidden="true"
    className={`absolute flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-foreground text-[11px] font-bold tabular-nums text-background shadow-sm ${className}`}
  >
    {n}
  </span>
);

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex min-w-0 items-center gap-3">
    <span className="w-24 shrink-0 text-xs text-muted-foreground">{label}</span>
    <span className="flex h-8 min-w-0 flex-1 items-center truncate rounded-md border border-border bg-background px-2.5 text-[13px] text-muted-foreground">{children}</span>
  </div>
);

const notes = [
  {
    title: "One status became four.",
    body: "The old form had a single Active status, so nobody could tell whether an edit was already live. Draft, in review, locked and released are now always visible.",
  },
  {
    title: "Impact before saving.",
    body: "The old form showed database IDs. The new one shows which employers, filing frequencies and payees a change reaches before anyone saves it.",
  },
  {
    title: "Save stopped meaning live.",
    body: "Saving used to change production. Now it creates a draft, and release is a separate, logged step.",
  },
];

const AsureBeforeAfter = () => (
  <figure className="cs-wide mb-0">
    <div className="grid gap-8 md:grid-cols-2">
      <div className="grid content-start gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Before · legacy, recreated</p>
        <div className="relative grid gap-3 rounded-xl border border-border bg-muted/40 py-5 pl-5 pr-12" role="img" aria-label="Before: a flat form with tax code, rate, formula ID, a single Active status and a Save button that changed production">
          <Row label="Tax code">CA_SDI_01</Row>
          <Row label="Rate">1.200</Row>
          <Row label="Formula ID">FRM-00412</Row>
          <Row label="Status">Active ▾</Row>
          <div className="flex justify-end">
            <span className="inline-flex h-8 items-center rounded-md bg-foreground px-4 text-[13px] font-semibold text-background">Save</span>
          </div>
          <Pin n={1} className="right-3 top-[156px]" />
          <Pin n={2} className="right-3 top-[112px]" />
          <Pin n={3} className="right-3 bottom-[24px]" />
        </div>
      </div>
      <div className="grid content-start gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground">After · shipped design, recreated</p>
        <div className="relative grid gap-3 rounded-xl border border-border bg-muted/40 py-5 pl-5 pr-12" role="img" aria-label="After: a CA-SDI draft revision with a four-step status bar, an impact summary of 214 employers, the rate field and a Save draft button">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-foreground">CA-SDI</span>
            <span className="rounded-full bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground ring-1 ring-border">Draft</span>
          </div>
          <div>
            <div className="grid grid-cols-4 gap-1" aria-hidden="true">
              <span className="h-1 rounded-full bg-foreground" />
              <span className="h-1 rounded-full bg-border" />
              <span className="h-1 rounded-full bg-border" />
              <span className="h-1 rounded-full bg-border" />
            </div>
            <div className="mt-1 grid grid-cols-4 gap-1 text-[11px] text-muted-foreground">
              <span className="font-semibold text-foreground">Draft</span><span>In review</span><span>Locked</span><span>Released</span>
            </div>
          </div>
          <div className="rounded-md bg-orange-500/10 px-3 py-2 text-[12.5px] text-foreground">Affects 214 employers · 3 filing frequencies · 1 payee</div>
          <Row label="Rate">1.250 %</Row>
          <div className="flex justify-end gap-2">
            <span className="inline-flex h-8 items-center rounded-md px-3 text-[13px] font-semibold text-foreground ring-1 ring-border">Discard</span>
            <span className="inline-flex h-8 items-center rounded-md bg-foreground px-4 text-[13px] font-semibold text-background">Save draft…</span>
          </div>
          <Pin n={1} className="right-3 top-[58px]" />
          <Pin n={2} className="right-3 top-[124px]" />
          <Pin n={3} className="right-3 bottom-[24px]" />
        </div>
      </div>
    </div>
    <ol className="mt-8 grid list-none gap-5 md:grid-cols-3">
      {notes.map((n, i) => (
        <li key={n.title} className="grid grid-cols-[1.5rem_1fr] gap-3 border-t border-border pt-4">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[11px] font-bold tabular-nums text-background" aria-hidden="true">{i + 1}</span>
          <p className="text-[15px] leading-6">
            <span className="font-semibold text-foreground">{n.title}</span> {n.body}
          </p>
        </li>
      ))}
    </ol>
    <figcaption>
      <Caption>Both screens recreated from memory as wireframes with sample values. Not Asure's production UI.</Caption>
    </figcaption>
  </figure>
);

export default AsureBeforeAfter;
