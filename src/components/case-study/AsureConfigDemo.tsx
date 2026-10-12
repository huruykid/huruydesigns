import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle, Building2, Calendar, Check, ChevronDown, ChevronRight, CircleAlert, Clock, FileText,
  GitBranch, History, Landmark, Lock, Search, ShieldCheck, Users, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A working recreation of the configuration workflow the Asure case study
 * describes, built to common enterprise-admin patterns (tree navigation that
 * mirrors the data model, record header with lifecycle status, inline
 * validation, an impact confirmation before saving, an audit trail).
 *
 * It demonstrates the four contributions: entity relationships are the
 * navigation, a formula edit surfaces its downstream impact before it saves, the
 * revision moves Draft → In Review → Locked → Released with every step logged,
 * and threshold logic warns before it stops. Agencies are real jurisdictions but
 * every rate, count and person is sample data; this is not Asure's production UI.
 */

type Status = "draft" | "review" | "locked" | "released";
type Tab = "formula" | "dependencies" | "history";

interface Values {
  rate: string;
  wageBase: string;
  effective: string;
}
interface AuditEntry {
  who: string;
  what: string;
  when: string;
}
interface TaxCode {
  id: string;
  code: string;
  name: string;
  party: "Employee" | "Employer";
  maxRate: number;
  version: number;
  status: Status;
  values: Values;
  released: { version: number; rate: number; wageBase: number };
  filing: string[];
  payee: string;
  calendar: string;
  employers: number;
  audit: AuditEntry[];
}
interface Agency {
  id: string;
  name: string;
  state: string;
  codes: TaxCode[];
}

const STATUS: Record<Status, { label: string; dot: string; pill: string }> = {
  draft: { label: "Draft", dot: "bg-gray-400", pill: "bg-gray-100 text-gray-700 ring-gray-300" },
  review: { label: "In Review", dot: "bg-amber-500", pill: "bg-amber-50 text-amber-800 ring-amber-300" },
  locked: { label: "Locked", dot: "bg-indigo-500", pill: "bg-indigo-50 text-indigo-800 ring-indigo-300" },
  released: { label: "Released", dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-800 ring-emerald-300" },
};
const ORDER: Status[] = ["draft", "review", "locked", "released"];
const ACCENT = "#c2410c";
const YOU = "You · Payroll admin";
const REVIEWER = "M. Chen · Compliance SME";

const code = (c: Omit<TaxCode, "values" | "audit"> & { audit?: AuditEntry[]; rate?: number }): TaxCode => ({
  ...c,
  values: { rate: (c.rate ?? c.released.rate).toFixed(3), wageBase: String(c.released.wageBase), effective: "2026-01-01" },
  audit: c.audit ?? [{ who: REVIEWER, what: `Released v${c.released.version}`, when: "Dec 12, 2025" }],
});

const AGENCIES: Agency[] = [
  {
    id: "ca", name: "California EDD", state: "CA",
    codes: [
      code({
        id: "ca-sdi", code: "CA-SDI", name: "State Disability Insurance", party: "Employee", maxRate: 5,
        version: 15, status: "draft", released: { version: 14, rate: 1.1, wageBase: 0 }, rate: 1.2,
        filing: ["Quarterly · DE 9", "Quarterly · DE 9C", "Annual · DE 9ADJ"], payee: "CA Employment Development Dept.", calendar: "California state holidays", employers: 214,
        audit: [
          { who: YOU, what: "Edited rate 1.100% → 1.200%", when: "Today 9:05 AM" },
          { who: YOU, what: "Created v15 from v14", when: "Today 9:02 AM" },
          { who: REVIEWER, what: "Released v14", when: "Dec 12, 2025" },
        ],
      }),
      code({
        id: "ca-ui", code: "CA-UI", name: "Unemployment Insurance", party: "Employer", maxRate: 6.2,
        version: 9, status: "review", released: { version: 8, rate: 3.4, wageBase: 7000 },
        filing: ["Quarterly · DE 9", "Quarterly · DE 88"], payee: "CA Employment Development Dept.", calendar: "California state holidays", employers: 214,
        audit: [{ who: YOU, what: "Submitted v9 for review", when: "Yesterday 3:40 PM" }, { who: REVIEWER, what: "Released v8", when: "Dec 12, 2025" }],
      }),
      code({
        id: "ca-ett", code: "CA-ETT", name: "Employment Training Tax", party: "Employer", maxRate: 0.1,
        version: 6, status: "released", released: { version: 6, rate: 0.1, wageBase: 7000 },
        filing: ["Quarterly · DE 9"], payee: "CA Employment Development Dept.", calendar: "California state holidays", employers: 198,
      }),
    ],
  },
  {
    id: "ny", name: "New York DOL", state: "NY",
    codes: [
      code({
        id: "ny-ui", code: "NY-UI", name: "Unemployment Insurance", party: "Employer", maxRate: 9.9,
        version: 11, status: "released", released: { version: 11, rate: 4.1, wageBase: 12800 },
        filing: ["Quarterly · NYS-45"], payee: "NY Department of Labor", calendar: "New York state holidays", employers: 167,
      }),
      code({
        id: "ny-rsf", code: "NY-RSF", name: "Re-employment Service Fund", party: "Employer", maxRate: 0.1,
        version: 4, status: "released", released: { version: 4, rate: 0.075, wageBase: 12800 },
        filing: ["Quarterly · NYS-45"], payee: "NY Department of Labor", calendar: "New York state holidays", employers: 167,
      }),
    ],
  },
  {
    id: "tx", name: "Texas Workforce Commission", state: "TX",
    codes: [
      code({
        id: "tx-ui", code: "TX-UI", name: "Unemployment Tax", party: "Employer", maxRate: 6.31,
        version: 7, status: "released", released: { version: 7, rate: 2.7, wageBase: 9000 },
        filing: ["Quarterly · C-3"], payee: "Texas Workforce Commission", calendar: "Texas state holidays", employers: 241,
      }),
    ],
  },
];

const now = () => {
  const d = new Date();
  return `Today ${d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;
};

function validate(c: TaxCode, v: Values) {
  const rate = Number(v.rate);
  const errors: Partial<Record<keyof Values, string>> = {};
  let warning: string | null = null;
  if (v.rate.trim() === "" || Number.isNaN(rate)) errors.rate = "Enter a rate.";
  else if (rate < 0) errors.rate = "Rate can't be negative.";
  else if (rate > c.maxRate)
    errors.rate = `Rate can't exceed ${c.maxRate.toFixed(3)}%, the maximum in this jurisdiction's rules (${c.code}-R02).`;
  else if (c.released.rate > 0 && Math.abs(rate - c.released.rate) / c.released.rate > 0.25)
    warning = `Unusual change: ${c.released.rate.toFixed(3)}% → ${rate.toFixed(3)}% (${rate > c.released.rate ? "+" : ""}${Math.round(((rate - c.released.rate) / c.released.rate) * 100)}% vs. v${c.released.version}). Confirm against the agency's rate notice.`;
  const base = Number(v.wageBase);
  if (v.wageBase.trim() === "" || Number.isNaN(base) || base < 0) errors.wageBase = "Enter a wage base of 0 or more (0 means no limit).";
  return { errors, warning };
}

function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset", STATUS[status].pill, className)}>
      <span className={cn("size-1.5 rounded-full", STATUS[status].dot)} aria-hidden="true" />
      {STATUS[status].label}
    </span>
  );
}

function Stepper({ status, compact }: { status: Status; compact?: boolean }) {
  const at = ORDER.indexOf(status);
  return (
    <ol className="flex items-center gap-1" aria-label={`Revision status: ${STATUS[status].label}`}>
      {ORDER.map((s, i) => (
        <li key={s} className="flex items-center gap-1">
          <span
            className={cn(
              "flex items-center gap-1 rounded-full text-[10px] font-medium",
              compact ? "px-1.5 py-0.5" : "px-2 py-0.5",
              i < at && "text-emerald-700",
              i === at && "bg-gray-900 text-white",
              i > at && "text-gray-400",
            )}
            aria-current={i === at ? "step" : undefined}
          >
            {i < at ? <Check className="size-3" aria-hidden="true" /> : <span className="tabular-nums">{i + 1}</span>}
            {(!compact || i === at) && STATUS[s].label}
          </span>
          {i < ORDER.length - 1 && <span className={cn("h-px w-3", i < at ? "bg-emerald-400" : "bg-gray-300")} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function Field({ id, label, hint, suffix, prefix, value, onChange, readOnly, error, children }: {
  id: string; label: string; hint?: string; suffix?: string; prefix?: string; value: string;
  onChange: (v: string) => void; readOnly: boolean; error?: string; children?: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 flex items-center gap-1 text-[11px] font-medium text-gray-700">
        {label}
        {readOnly && <Lock className="size-3 text-gray-400" aria-label="read only" />}
      </label>
      <div
        className={cn(
          "flex h-8 items-center rounded-md border bg-white text-[12px]",
          error ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900",
          readOnly && "border-gray-200 bg-gray-50 text-gray-600",
        )}
      >
        {prefix && <span className="pl-2.5 text-gray-500">{prefix}</span>}
        <input
          id={id}
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          inputMode="decimal"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
          className="h-full min-w-0 flex-1 bg-transparent px-2.5 tabular-nums outline-none"
        />
        {suffix && <span className="pr-2.5 text-gray-500">{suffix}</span>}
      </div>
      {error ? (
        <p id={`${id}-err`} className="mt-1 flex items-start gap-1 text-[10.5px] leading-snug text-red-700">
          <CircleAlert className="mt-px size-3 shrink-0" aria-hidden="true" /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[10.5px] leading-snug text-gray-500">{hint}</p>
      ) : null}
      {children}
    </div>
  );
}

export default function AsureConfigDemo({ layout = "desktop" }: { layout?: "mobile" | "desktop" }) {
  const mobile = layout === "mobile";
  const [agencies, setAgencies] = useState<Agency[]>(AGENCIES);
  const [agencyId, setAgencyId] = useState("ca");
  const [codeId, setCodeId] = useState("ca-sdi");
  const [tab, setTab] = useState<Tab>("formula");
  const [query, setQuery] = useState("");
  const [edits, setEdits] = useState<Record<string, Values>>({});
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});
  const [modal, setModal] = useState<null | "save" | "release">(null);
  const [toast, setToast] = useState<string | null>(null);

  const agency = agencies.find((a) => a.id === agencyId)!;
  const current = agency.codes.find((c) => c.id === codeId) ?? agency.codes[0];
  const values = edits[current.id] ?? current.values;
  const dirty = !!edits[current.id] && JSON.stringify(edits[current.id]) !== JSON.stringify(current.values);
  const editable = current.status === "draft";
  const { errors, warning } = validate(current, values);
  const hasErrors = Object.keys(errors).length > 0;
  const ack = !!acknowledged[current.id];

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return agencies.flatMap((a) =>
      a.codes
        .filter((c) => [a.name, a.state, c.code, c.name].some((s) => s.toLowerCase().includes(q)))
        .map((c) => ({ agency: a, code: c })),
    );
  }, [agencies, query]);

  const flash = (msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((t) => (t === msg ? null : t)), 2600);
  };

  const update = (fn: (c: TaxCode) => TaxCode) =>
    setAgencies((all) => all.map((a) => ({ ...a, codes: a.codes.map((c) => (c.id === current.id ? fn(c) : c)) })));

  const log = (c: TaxCode, who: string, what: string): AuditEntry[] => [{ who, what, when: now() }, ...c.audit];

  const select = (aId: string, cId: string) => {
    setAgencyId(aId);
    setCodeId(cId);
    setQuery("");
    setTab("formula");
  };

  const setValue = (k: keyof Values, v: string) => setEdits((e) => ({ ...e, [current.id]: { ...values, [k]: v } }));

  const confirmSave = () => {
    const before = current.values;
    const changes = (Object.keys(values) as (keyof Values)[])
      .filter((k) => values[k] !== before[k])
      .map((k) => `${k === "wageBase" ? "wage base" : k} ${k === "rate" ? `${Number(before[k]).toFixed(3)}% → ${Number(values[k]).toFixed(3)}%` : `${before[k]} → ${values[k]}`}`);
    update((c) => ({ ...c, values: { ...values, rate: Number(values.rate).toFixed(3) }, audit: log(c, YOU, `Edited ${changes.join(", ")}`) }));
    setEdits((e) => {
      const { [current.id]: _drop, ...rest } = e;
      return rest;
    });
    setModal(null);
    flash(`Draft v${current.version} saved. Not in effect until released.`);
  };

  const transition = (to: Status) => {
    const words: Record<string, [string, string]> = {
      "draft>review": [YOU, `Submitted v${current.version} for review`],
      "review>draft": [REVIEWER, `Returned v${current.version} to draft`],
      "review>locked": [REVIEWER, `Approved and locked v${current.version}`],
      "locked>released": [REVIEWER, `Released v${current.version}, effective ${values.effective}`],
    };
    const [who, what] = words[`${current.status}>${to}`];
    update((c) => ({
      ...c,
      status: to,
      released: to === "released" ? { version: c.version, rate: Number(c.values.rate), wageBase: Number(c.values.wageBase) } : c.released,
      audit: log(c, who, what),
    }));
    setModal(null);
    flash(`${current.code} v${current.version} is now ${STATUS[to].label}.`);
  };

  const newRevision = () => {
    update((c) => ({ ...c, version: c.version + 1, status: "draft", audit: log(c, YOU, `Created v${c.version + 1} from v${c.version}`) }));
    setAcknowledged((a) => ({ ...a, [current.id]: false }));
    flash(`v${current.version + 1} created as a draft. v${current.version} stays in effect.`);
  };

  // ── Pieces ────────────────────────────────────────────────────────────────
  const searchBox = (
    <div className="relative">
      <div className="flex h-8 items-center gap-2 rounded-md border border-gray-300 bg-white px-2.5 focus-within:border-gray-900">
        <Search className="size-3.5 shrink-0 text-gray-400" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 9,214 agencies"
          aria-label="Search agencies and tax codes"
          className="h-full min-w-0 flex-1 bg-transparent text-[11.5px] outline-none placeholder:text-gray-400"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-gray-400 hover:text-gray-700">
            <X className="size-3.5" />
          </button>
        )}
      </div>
      {query && (
        <div className="absolute left-0 top-9 z-20 w-[260px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg" role="listbox" aria-label="Search results">
          <p className="border-b border-gray-100 px-2.5 py-1.5 text-[10px] text-gray-500">
            {matches.length} {matches.length === 1 ? "result" : "results"} in sample data
          </p>
          {matches.length === 0 && <p className="px-2.5 py-2 text-[11px] text-gray-500">No agencies or codes match “{query}”.</p>}
          {matches.slice(0, 6).map(({ agency: a, code: c }) => (
            <button
              key={c.id}
              type="button"
              role="option"
              aria-selected={c.id === current.id}
              onClick={() => select(a.id, c.id)}
              className="flex w-full items-center justify-between gap-2 px-2.5 py-1.5 text-left hover:bg-gray-50"
            >
              <span className="min-w-0">
                <span className="block truncate text-[11.5px] font-medium text-gray-900">{c.code} · {c.name}</span>
                <span className="block truncate text-[10px] text-gray-500">{a.name}</span>
              </span>
              <StatusPill status={c.status} />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const tree = (
    <nav aria-label="Entity tree" className="text-[11.5px]">
      {agencies.map((a) => {
        const open = a.id === agencyId;
        return (
          <div key={a.id} className="mb-0.5">
            <button
              type="button"
              onClick={() => select(a.id, a.codes[0].id)}
              aria-expanded={open}
              className={cn("flex w-full items-center gap-1 rounded px-1.5 py-1 text-left hover:bg-gray-100", open && "font-semibold text-gray-900")}
            >
              {open ? <ChevronDown className="size-3 text-gray-400" aria-hidden="true" /> : <ChevronRight className="size-3 text-gray-400" aria-hidden="true" />}
              <Landmark className="size-3.5 text-gray-500" aria-hidden="true" />
              <span className="truncate">{a.name}</span>
            </button>
            {open && (
              <ul className="ml-3 border-l border-gray-200 pl-1.5">
                {a.codes.map((c) => {
                  const sel = c.id === current.id;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => select(a.id, c.id)}
                        aria-current={sel ? "page" : undefined}
                        className={cn("flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left", sel ? "bg-orange-50 text-gray-900" : "text-gray-700 hover:bg-gray-100")}
                        style={sel ? { boxShadow: `inset 2px 0 0 ${ACCENT}` } : undefined}
                      >
                        <span className={cn("size-1.5 shrink-0 rounded-full", STATUS[c.status].dot)} aria-label={STATUS[c.status].label} />
                        <span className="truncate font-medium">{c.code}</span>
                      </button>
                      {sel && (
                        <ul className="mb-1 ml-3 border-l border-gray-200 pl-1.5 text-[10.5px] text-gray-500">
                          {[
                            { icon: GitBranch, label: "Formula", tab: "formula" as Tab },
                            { icon: Clock, label: `Filing frequency (${c.filing.length})`, tab: "dependencies" as Tab },
                            { icon: Building2, label: "Payee", tab: "dependencies" as Tab },
                            { icon: Calendar, label: "Holiday calendar", tab: "dependencies" as Tab },
                          ].map(({ icon: Icon, label, tab: t }) => (
                            <li key={label}>
                              <button type="button" onClick={() => setTab(t)} className="flex w-full items-center gap-1.5 rounded px-1.5 py-0.5 text-left hover:bg-gray-100 hover:text-gray-800">
                                <Icon className="size-3" aria-hidden="true" /> {label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );

  const impact = (
    <div className="space-y-2.5 text-[11px]">
      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
        <ShieldCheck className="size-3.5" aria-hidden="true" /> Downstream impact
      </p>
      <div className="rounded-md border border-gray-200 bg-white p-2.5">
        <p className="flex items-center gap-1.5 font-semibold text-gray-900"><Users className="size-3.5 text-gray-500" aria-hidden="true" /> {current.employers} employers</p>
        <p className="mt-0.5 text-[10.5px] leading-snug text-gray-500">use {current.code} in payroll. A release changes their withholding from the effective date.</p>
      </div>
      <div className="rounded-md border border-gray-200 bg-white p-2.5">
        <p className="mb-1 flex items-center gap-1.5 font-semibold text-gray-900"><Clock className="size-3.5 text-gray-500" aria-hidden="true" /> Filing frequencies</p>
        <ul className="space-y-0.5 text-[10.5px] text-gray-600">{current.filing.map((f) => <li key={f}>{f}</li>)}</ul>
      </div>
      <div className="rounded-md border border-gray-200 bg-white p-2.5">
        <p className="flex items-center gap-1.5 font-semibold text-gray-900"><Building2 className="size-3.5 text-gray-500" aria-hidden="true" /> Payee</p>
        <p className="mt-0.5 text-[10.5px] text-gray-600">{current.payee}</p>
        <p className="mt-1.5 flex items-center gap-1.5 font-semibold text-gray-900"><Calendar className="size-3.5 text-gray-500" aria-hidden="true" /> Holiday calendar</p>
        <p className="mt-0.5 text-[10.5px] text-gray-600">{current.calendar}</p>
      </div>
    </div>
  );

  const formulaTab = (
    <div className="space-y-3">
      {!editable && (
        <p className="flex items-start gap-1.5 rounded-md bg-gray-50 px-2.5 py-2 text-[10.5px] leading-snug text-gray-600 ring-1 ring-inset ring-gray-200">
          <Lock className="mt-px size-3 shrink-0" aria-hidden="true" />
          {current.status === "review" && "In review. Fields are read-only until the reviewer approves or returns it to draft."}
          {current.status === "locked" && "Locked and approved. Release it to put it in effect, or nothing changes."}
          {current.status === "released" && `v${current.version} is in effect. Create a new revision to change it; this version stays live until the new one is released.`}
        </p>
      )}
      <div className={cn("grid gap-3", !mobile && "grid-cols-2")}>
        <Field id={`${current.id}-rate`} label="Rate" suffix="%" value={values.rate} onChange={(v) => setValue("rate", v)} readOnly={!editable} error={errors.rate}
          hint={`Released v${current.released.version}: ${current.released.rate.toFixed(3)}% · max ${current.maxRate.toFixed(3)}%`} />
        <Field id={`${current.id}-base`} label="Taxable wage base" prefix="$" value={values.wageBase} onChange={(v) => setValue("wageBase", v)} readOnly={!editable} error={errors.wageBase}
          hint="Per employee, per year. 0 = no limit." />
        <Field id={`${current.id}-eff`} label="Effective date" value={values.effective} onChange={(v) => setValue("effective", v)} readOnly={!editable} hint="Filings on or after this date use this revision." />
        <div>
          <p className="mb-1 text-[11px] font-medium text-gray-700">Applies to</p>
          <p className="flex h-8 items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 text-[12px] text-gray-600">{current.party} wages</p>
        </div>
      </div>
      {editable && warning && !errors.rate && (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-2.5 text-[10.5px] leading-snug text-amber-900" role="status">
          <p className="flex items-start gap-1.5 font-medium"><AlertTriangle className="mt-px size-3.5 shrink-0" aria-hidden="true" /> {warning}</p>
          <label className="mt-2 flex cursor-pointer items-center gap-1.5 pl-5">
            <input type="checkbox" checked={ack} onChange={(e) => setAcknowledged((a) => ({ ...a, [current.id]: e.target.checked }))} className="size-3.5 accent-amber-700" />
            I've checked this against the agency notice
          </label>
        </div>
      )}
    </div>
  );

  const historyTab = (
    <ol className="space-y-0 text-[11px]">
      {current.audit.map((e, i) => (
        <li key={`${e.when}-${i}`} className="relative flex gap-2.5 pb-3 pl-0.5">
          <span className="relative mt-1 flex flex-col items-center">
            <span className={cn("size-2 rounded-full", i === 0 ? "bg-gray-900" : "bg-gray-300")} aria-hidden="true" />
            {i < current.audit.length - 1 && <span className="absolute top-3 h-[calc(100%-2px)] w-px bg-gray-200" aria-hidden="true" />}
          </span>
          <span className="min-w-0">
            <span className="block font-medium text-gray-900">{e.what}</span>
            <span className="block text-[10px] text-gray-500">{e.who} · {e.when}</span>
          </span>
        </li>
      ))}
    </ol>
  );

  const canSubmit = editable && !dirty && !hasErrors && (!warning || ack);
  const actions = (
    <div className={cn("flex items-center gap-2", mobile ? "flex-col-reverse items-stretch" : "justify-end")}>
      {editable && dirty && (
        <button type="button" onClick={() => setEdits((e) => { const { [current.id]: _d, ...r } = e; return r; })} className="h-8 rounded-md px-3 text-[11.5px] font-medium text-gray-700 hover:bg-gray-100">
          Discard changes
        </button>
      )}
      {editable && dirty && (
        <button type="button" disabled={hasErrors} onClick={() => setModal("save")} className="h-8 rounded-md bg-gray-900 px-3 text-[11.5px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40">
          Save draft…
        </button>
      )}
      {editable && !dirty && (
        <button type="button" disabled={!canSubmit} onClick={() => transition("review")} title={!canSubmit ? (hasErrors ? "Fix the errors first" : "Confirm the unusual change first") : undefined}
          className="h-8 rounded-md px-3 text-[11.5px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40" style={{ background: ACCENT }}>
          Submit for review
        </button>
      )}
      {current.status === "review" && (
        <>
          <button type="button" onClick={() => transition("draft")} className="h-8 rounded-md border border-gray-300 bg-white px-3 text-[11.5px] font-medium text-gray-800 hover:bg-gray-50">
            Return to draft
          </button>
          <button type="button" onClick={() => transition("locked")} className="h-8 rounded-md px-3 text-[11.5px] font-semibold text-white" style={{ background: ACCENT }}>
            Approve as reviewer
          </button>
        </>
      )}
      {current.status === "locked" && (
        <button type="button" onClick={() => setModal("release")} className="h-8 rounded-md px-3 text-[11.5px] font-semibold text-white" style={{ background: ACCENT }}>
          Release…
        </button>
      )}
      {current.status === "released" && (
        <button type="button" onClick={newRevision} className="h-8 rounded-md border border-gray-300 bg-white px-3 text-[11.5px] font-semibold text-gray-900 hover:bg-gray-50">
          Create new revision
        </button>
      )}
    </div>
  );

  const tabs = (
    <div role="tablist" aria-label="Record sections" className="flex gap-3 border-b border-gray-200 text-[11.5px]">
      {([
        { id: "formula", label: "Formula", icon: FileText },
        { id: "dependencies", label: "Dependencies", icon: GitBranch },
        { id: "history", label: `History (${current.audit.length})`, icon: History },
      ] as const).map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={tab === id}
          onClick={() => setTab(id)}
          className={cn("-mb-px flex items-center gap-1 border-b-2 pb-1.5 pt-0.5", tab === id ? "font-semibold text-gray-900" : "border-transparent text-gray-500 hover:text-gray-800")}
          style={tab === id ? { borderColor: ACCENT } : undefined}
        >
          <Icon className="size-3.5" aria-hidden="true" /> {label}
        </button>
      ))}
    </div>
  );

  const header = (
    <div>
      <p className="truncate text-[10px] text-gray-500">
        Agencies <span aria-hidden="true">›</span> {agency.name} <span aria-hidden="true">›</span> Tax codes
      </p>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
        <h3 className="text-[15px] font-semibold tracking-tight text-gray-900">{current.code}</h3>
        <StatusPill status={current.status} />
        <span className="text-[10.5px] text-gray-500">v{current.version}{current.status !== "released" && ` · v${current.released.version} in effect`}</span>
      </div>
      <p className="mt-0.5 text-[11px] text-gray-600">{current.name} · {current.party}</p>
      <div className="mt-2.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}><Stepper status={current.status} compact={mobile} /></div>
    </div>
  );

  const body = tab === "formula" ? formulaTab : tab === "history" ? historyTab : impact;

  const overlays = (
    <>
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 flex items-center justify-center bg-gray-900/40 p-4">
            <motion.div initial={{ y: 8, scale: 0.98 }} animate={{ y: 0, scale: 1 }} role="dialog" aria-modal="true" aria-labelledby="asure-modal-title" className="w-full max-w-sm rounded-lg bg-white p-4 shadow-xl">
              {modal === "save" ? (
                <>
                  <h4 id="asure-modal-title" className="text-[13px] font-semibold text-gray-900">Save draft v{current.version}?</h4>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600">
                    When released, this changes {current.code} for <strong className="text-gray-900">{current.employers} employers</strong> and {current.filing.length} filing {current.filing.length === 1 ? "frequency" : "frequencies"} from {values.effective}. Saving keeps it in Draft; nothing changes in payroll yet.
                  </p>
                </>
              ) : (
                <>
                  <h4 id="asure-modal-title" className="text-[13px] font-semibold text-gray-900">Release {current.code} v{current.version}?</h4>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600">
                    v{current.version} becomes legally in effect from {values.effective} for <strong className="text-gray-900">{current.employers} employers</strong>, replacing v{current.released.version}. The release is logged and v{current.released.version} stays available in History.
                  </p>
                </>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setModal(null)} className="h-8 rounded-md px-3 text-[11.5px] font-medium text-gray-700 hover:bg-gray-100">Cancel</button>
                <button type="button" onClick={modal === "save" ? confirmSave : () => transition("released")} className="h-8 rounded-md px-3 text-[11.5px] font-semibold text-white" style={{ background: modal === "save" ? "#111827" : ACCENT }}>
                  {modal === "save" ? "Save draft" : `Release v${current.version}`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div aria-live="polite" className="pointer-events-none absolute inset-x-0 top-12 z-40 flex justify-center px-3">
        <AnimatePresence>
          {toast && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-md bg-gray-900 px-3 py-1.5 text-center text-[10.5px] font-medium text-white shadow-lg">
              {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  const appBar = (
    <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-gray-200 bg-white px-3">
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded text-[11px] font-bold text-white" style={{ background: ACCENT }} aria-hidden="true">A</span>
        <span className="text-[12px] font-semibold text-gray-900">Compliance Engine</span>
        {!mobile && <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[9.5px] font-medium text-gray-500">Sample data</span>}
      </div>
      <span className="flex size-6 items-center justify-center rounded-full bg-gray-200 text-[9.5px] font-semibold text-gray-700" aria-label="Signed in as a payroll admin">PA</span>
    </div>
  );

  if (mobile) {
    return (
      <div className="relative flex h-full min-h-[480px] flex-col bg-gray-50 font-sans text-gray-900">
        {appBar}
        <div className="space-y-2 border-b border-gray-200 bg-white p-3">
          {searchBox}
          <label className="block">
            <span className="sr-only">Tax code</span>
            <select
              value={`${agency.id}:${current.id}`}
              onChange={(e) => { const [a, c] = e.target.value.split(":"); select(a, c); }}
              className="h-8 w-full rounded-md border border-gray-300 bg-white px-2 text-[11.5px]"
            >
              {agencies.map((a) => (
                <optgroup key={a.id} label={a.name}>
                  {a.codes.map((c) => <option key={c.id} value={`${a.id}:${c.id}`}>{c.code} · {STATUS[c.status].label}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-3" style={{ scrollbarWidth: "none" }}>
          {header}
          {tabs}
          {body}
        </div>
        <div className="border-t border-gray-200 bg-white p-3">{actions}</div>
        {overlays}
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[520px] flex-col bg-gray-50 font-sans text-gray-900">
      {appBar}
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[196px] shrink-0 flex-col gap-2.5 border-r border-gray-200 bg-white p-2.5">
          {searchBox}
          <p className="px-1.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Agencies</p>
          <div className="min-h-0 flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>{tree}</div>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3.5" style={{ scrollbarWidth: "none" }}>
            {header}
            {tabs}
            {tab === "dependencies" ? impact : body}
          </div>
          <div className="border-t border-gray-200 bg-white px-3.5 py-2.5">{actions}</div>
        </main>
        {tab !== "dependencies" && <aside className="w-[178px] shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-50 p-2.5" style={{ scrollbarWidth: "none" }}>{impact}</aside>}
      </div>
      {overlays}
    </div>
  );
}
