import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * Unboxed building blocks shared by every case study. Hairlines and numbers do
 * the work that bordered cards used to do, so a page reads as one column of
 * argument instead of a stack of tiles.
 */

export interface Decision {
  title: string;
  body: string;
  rejected: string;
}

export const DecisionList = ({ items, after }: { items: Decision[]; after?: (index: number) => ReactNode }) => (
  <ol className="list-none border-t border-border divide-y divide-border">
    {items.map((d, i) => (
      <li key={d.title} className="py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="grid gap-3 sm:grid-cols-[3.5rem_1fr]"
        >
          <span className="text-sm font-semibold tabular-nums text-accent sm:pt-1" aria-hidden="true">0{i + 1}</span>
          <div className="min-w-0">
            <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground font-display">{d.title}</h3>
            <p className="mb-3 max-w-[64ch]">{d.body}</p>
            <p className="max-w-[64ch] text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Rejected:</span> {d.rejected}
            </p>
            {after?.(i)}
          </div>
        </motion.div>
      </li>
    ))}
  </ol>
);

export const NumberedList = ({ items, tone = "accent" }: { items: string[]; tone?: "accent" | "muted" }) => (
  <ol className="list-none border-t border-border divide-y divide-border">
    {items.map((text, i) => (
      <li key={i} className="grid gap-2 py-5 sm:grid-cols-[3.5rem_1fr]">
        <span className={`text-sm font-semibold tabular-nums ${tone === "accent" ? "text-accent" : "text-muted-foreground"}`} aria-hidden="true">
          0{i + 1}
        </span>
        <p className="max-w-[64ch]">{text}</p>
      </li>
    ))}
  </ol>
);

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

const columnClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

export const StatRow = ({ stats, columns = 4, className = "" }: { stats: Stat[]; columns?: 2 | 3 | 4; className?: string }) => (
  <dl className={`grid grid-cols-2 gap-x-8 gap-y-8 ${columnClass[columns]} ${className}`}>
    {stats.map((s) => (
      <div key={s.label} className="flex flex-col border-t border-border pt-4">
        <dt className="order-2 text-sm font-medium text-foreground">{s.label}</dt>
        <dd className="order-1 mb-2 text-2xl font-bold leading-none tracking-tight text-foreground font-display sm:text-3xl">{s.value}</dd>
        {s.description && <dd className="order-3 mt-1 text-sm text-muted-foreground">{s.description}</dd>}
      </div>
    ))}
  </dl>
);

export const Callout = ({ label, children, className = "" }: { label?: string; children: ReactNode; className?: string }) => (
  <div className={`border-l-2 border-accent pl-5 ${className}`}>
    {label && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{label}</p>}
    <div className="max-w-[64ch] text-foreground">{children}</div>
  </div>
);
