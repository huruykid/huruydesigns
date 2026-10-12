import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle, Building2, Calendar, Check, ChevronDown, ChevronRight, CircleAlert, Clock, FileText,
  GitBranch, Landmark, Lock, Search, ShieldCheck, Users, X,
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

const fmtDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};
const fmtMoney = (v: string) => {
  const n = Number(v);
  if (Number.isNaN(n)) return v;
  return n === 0 ? "No limit" : `$${n.toLocaleString("en-US")}`;
};

function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset", STATUS[status].pill, className)}>
      <span className={cn("size-1.5 rounded-full", STATUS[status].dot)} aria-hidden="true" />
      {STATUS[status].label}
    </span>
  );
}

/** Four segments that fill as the revision moves through its lifecycle. */
function Progress({ status }: { status: Status }) {
  const at = ORDER.indexOf(status);
  return (
    <ol className="grid grid-cols-4 gap-1.5" aria-label={`Revision status: ${STATUS[status].label}`}>
      {ORDER.map((s, i) => (
        <li key={s} aria-current={i === at ? "step" : undefined}>
          <span className={cn("block h-1 rounded-full", i < at ? "bg-emerald-500" : i === at ? "bg-gray-900" : "bg-gray-200")} aria-hidden="true" />
          <span className={cn("mt-1 flex items-center gap-1 text-[11px]", i === at ? "font-semibold text-gray-900" : i < at ? "text-emerald-700" : "text-gray-400")}>
            {i < at && <Check className="size-3" aria-hidden="true" />}
            {STATUS[s].label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Field({ id, label, aside, hint, suffix, prefix, value, display, onChange, readOnly, error, type = "text" }: {
  id: string; label: string; aside?: ReactNode; hint?: string; suffix?: string; prefix?: ReactNode; value: string; display?: string;
  onChange: (v: string) => void; readOnly: boolean; error?: string; type?: "text" | "date";
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label htmlFor={id} className="flex items-center gap-1 text-[12px] font-medium text-gray-700">
          {label}
          {readOnly && <Lock className="size-3 text-gray-400" aria-label="read only" />}
        </label>
        {aside}
      </div>
      <div
        className={cn(
          "flex h-10 items-center rounded-lg border bg-white text-[13px] transition-shadow",
          error ? "border-red-400 ring-2 ring-red-100" : "border-gray-200 shadow-sm focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100",
          readOnly && "border-transparent bg-gray-50 shadow-none",
        )}
      >
        {prefix && <span className="pl-3 text-gray-400">{prefix}</span>}
        {readOnly && display !== undefined ? (
          <input id={id} value={display} readOnly className="h-full min-w-0 flex-1 bg-transparent px-3 tabular-nums text-gray-700 outline-none" />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            readOnly={readOnly}
            onChange={(e) => onChange(e.target.value)}
            inputMode={type === "text" ? "decimal" : undefined}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
            className={cn("h-full min-w-0 flex-1 bg-transparent px-3 tabular-nums outline-none", readOnly && "text-gray-700")}
          />
        )}
        {suffix && <span className="pr-3 text-gray-400">{suffix}</span>}
      </div>
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 flex items-start gap-1 text-[11.5px] leading-snug text-red-600">
          <CircleAlert className="mt-px size-3.5 shrink-0" aria-hidden="true" /> {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[11.5px] leading-snug text-gray-500">{hint}</p>
      ) : null}
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
  const rateNum = Number(values.rate);
  const delta = !Number.isNaN(rateNum) && current.released.rate > 0 ? Math.round(((rateNum - current.released.rate) / current.released.rate) * 100) : null;

  const searchBox = (
    <div className="relative w-full">
      <div className="flex h-9 items-center gap-2 rounded-lg bg-gray-100 px-3 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-200">
        <Search className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 9,214 agencies"
          aria-label="Search agencies and tax codes"
          className="h-full min-w-0 flex-1 bg-transparent text-[12.5px] outline-none placeholder:text-gray-400"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="text-gray-400 hover:text-gray-700">
            <X className="size-3.5" />
          </button>
        )}
      </div>
      {query && (
        <div className="absolute right-0 top-11 z-20 w-full min-w-[260px] overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl" role="listbox" aria-label="Search results">
          <p className="px-3 py-1.5 text-[11px] text-gray-400">
            {matches.length} {matches.length === 1 ? "result" : "results"} in sample data
          </p>
          {matches.length === 0 && <p className="px-3 pb-2 text-[12px] text-gray-500">Nothing matches “{query}”.</p>}
          {matches.slice(0, 6).map(({ agency: a, code: c }) => (
            <button
              key={c.id}
              type="button"
              role="option"
              aria-selected={c.id === current.id}
              onClick={() => select(a.id, c.id)}
              className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left hover:bg-gray-50"
            >
              <span className="min-w-0">
                <span className="block truncate text-[12.5px] font-medium text-gray-900">{c.code} · {c.name}</span>
                <span className="block truncate text-[11px] text-gray-500">{a.name}</span>
              </span>
              <StatusPill status={c.status} />
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const tree = (
    <nav aria-label="Entity tree" className="space-y-1 text-[12.5px]">
      {agencies.map((a) => {
        const open = a.id === agencyId;
        return (
          <div key={a.id}>
            <button
              type="button"
              onClick={() => select(a.id, a.codes[0].id)}
              aria-expanded={open}
              className={cn("flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-gray-100", open ? "font-semibold text-gray-900" : "text-gray-600")}
            >
              <ChevronRight className={cn("size-3.5 text-gray-400 transition-transform", open && "rotate-90")} aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{a.name}</span>
              <span className="text-[10.5px] font-medium text-gray-400">{a.state}</span>
            </button>
            {open && (
              <ul className="mt-0.5 space-y-0.5 pl-5">
                {a.codes.map((c) => {
                  const sel = c.id === current.id;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => select(a.id, c.id)}
                        aria-current={sel ? "page" : undefined}
                        className={cn("flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors", sel ? "bg-white font-medium text-gray-900 shadow-sm ring-1 ring-gray-200" : "text-gray-600 hover:bg-gray-100")}
                      >
                        <span className={cn("size-2 shrink-0 rounded-full", STATUS[c.status].dot)} aria-label={STATUS[c.status].label} />
                        <span className="min-w-0 flex-1 truncate">{c.code}</span>
                        <span className="text-[10.5px] text-gray-400">v{c.version}</span>
                      </button>
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

  /** The dependency chain, drawn the way it was mapped on the whiteboard. */
  const chain = (
    <ol className="relative space-y-0">
      {[
        { icon: Landmark, label: "Agency", value: agency.name },
        { icon: FileText, label: "Tax code", value: `${current.code} · ${current.name}` },
        { icon: GitBranch, label: "Formula", value: `v${current.version} · ${Number(values.rate).toFixed(3)}% of ${fmtMoney(values.wageBase).toLowerCase() === "no limit" ? "all wages" : `wages up to ${fmtMoney(values.wageBase)}`}` },
        { icon: Clock, label: `Filing frequencies (${current.filing.length})`, value: current.filing.join(", ") },
        { icon: Building2, label: "Payee", value: current.payee },
        { icon: Calendar, label: "Holiday calendar", value: current.calendar },
      ].map(({ icon: Icon, label, value }, i, all) => (
        <li key={label} className="relative flex gap-3 pb-4">
          {i < all.length - 1 && <span className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-gray-200" aria-hidden="true" />}
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500"><Icon className="size-4" aria-hidden="true" /></span>
          <span className="min-w-0 pt-0.5">
            <span className="block text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</span>
            <span className="block text-[13px] text-gray-900">{value}</span>
          </span>
        </li>
      ))}
      <li className="flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2.5 text-[12.5px] text-orange-900">
        <Users className="size-4 shrink-0" aria-hidden="true" />
        <span><span className="font-semibold">{current.employers} employers</span> run payroll on this tax code. A release changes their withholding from the effective date.</span>
      </li>
    </ol>
  );

  const impactStrip = (
    <button
      type="button"
      onClick={() => setTab("dependencies")}
      className="flex w-full items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-left text-[12px] text-gray-600 transition-colors hover:bg-gray-100"
    >
      <ShieldCheck className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
      <span className="min-w-0 flex-1 truncate">
        Affects <span className="font-semibold text-gray-900">{current.employers} employers</span> · {current.filing.length} filing {current.filing.length === 1 ? "frequency" : "frequencies"} · 1 payee
      </span>
      <span className="shrink-0 font-medium text-gray-900">See what it affects <span aria-hidden="true">→</span></span>
    </button>
  );

  const lockedNote = !editable && (
    <p className="flex items-start gap-2 rounded-lg bg-gray-50 px-3 py-2.5 text-[12px] leading-snug text-gray-600">
      <Lock className="mt-0.5 size-3.5 shrink-0 text-gray-400" aria-hidden="true" />
      {current.status === "review" && "Waiting on review. Fields are read-only until it's approved or returned to draft."}
      {current.status === "locked" && "Approved and locked. Nothing changes in payroll until it's released."}
      {current.status === "released" && `v${current.version} is in effect. Start a new revision to change it; this one stays live until the next is released.`}
    </p>
  );

  const formulaTab = (
    <div className="space-y-4">
      {lockedNote}
      <div className={cn("grid gap-x-5 gap-y-4", !mobile && "grid-cols-2")}>
        <Field
          id={`${current.id}-rate`}
          label="Rate"
          suffix="%"
          value={values.rate}
          onChange={(v) => setValue("rate", v)}
          readOnly={!editable}
          error={errors.rate}
          hint={`Max ${current.maxRate.toFixed(3)}% under ${agency.state} rules`}
          aside={
            delta !== null && delta !== 0 && !errors.rate ? (
              <span className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-medium", Math.abs(delta) > 25 ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600")}>
                {delta > 0 ? "+" : ""}{delta}% vs v{current.released.version}
              </span>
            ) : undefined
          }
        />
        <Field
          id={`${current.id}-base`}
          label="Taxable wage base"
          prefix="$"
          value={values.wageBase}
          display={fmtMoney(values.wageBase).replace("$", "")}
          onChange={(v) => setValue("wageBase", v.replace(/[^\d.]/g, ""))}
          readOnly={!editable}
          error={errors.wageBase}
          hint="Per employee, per year. 0 means no limit."
        />
        <Field
          id={`${current.id}-eff`}
          label="Effective date"
          type="date"
          value={values.effective}
          display={fmtDate(values.effective)}
          onChange={(v) => setValue("effective", v)}
          readOnly={!editable}
          hint="Filings on or after this date use this revision."
        />
        <div>
          <p className="mb-1.5 text-[12px] font-medium text-gray-700">Applies to</p>
          <div className="flex h-10 items-center gap-2 rounded-lg bg-gray-50 px-3 text-[13px] text-gray-700">
            <Users className="size-4 text-gray-400" aria-hidden="true" /> {current.party} wages
          </div>
        </div>
      </div>
      {editable && warning && !errors.rate && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-[12px] leading-snug text-amber-900" role="status">
          <p className="flex items-start gap-2 font-medium"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" /> {warning}</p>
          <label className="mt-2.5 flex cursor-pointer items-center gap-2 pl-6">
            <input type="checkbox" checked={ack} onChange={(e) => setAcknowledged((a) => ({ ...a, [current.id]: e.target.checked }))} className="size-4 rounded accent-amber-700" />
            I've checked this against the agency notice
          </label>
        </div>
      )}
    </div>
  );

  const historyTab = (
    <ol>
      {current.audit.map((e, i) => (
        <li key={`${e.when}-${i}`} className="relative flex gap-3 pb-4">
          {i < current.audit.length - 1 && <span className="absolute left-[5px] top-4 h-[calc(100%-0.5rem)] w-px bg-gray-200" aria-hidden="true" />}
          <span className={cn("mt-1.5 size-[11px] shrink-0 rounded-full border-2", i === 0 ? "border-gray-900 bg-gray-900" : "border-gray-300 bg-white")} aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-[13px] font-medium text-gray-900">{e.what}</span>
            <span className="block text-[11.5px] text-gray-500">{e.who} · {e.when}</span>
          </span>
        </li>
      ))}
    </ol>
  );

  const canSubmit = editable && !dirty && !hasErrors && (!warning || ack);
  const stateLine =
    editable && dirty ? { dot: "bg-amber-500", text: "Unsaved changes" }
    : editable ? { dot: "bg-gray-400", text: hasErrors ? "Fix the highlighted field" : warning && !ack ? "Confirm the unusual change to submit" : "Draft saved · not in effect" }
    : current.status === "review" ? { dot: "bg-amber-500", text: `Waiting on ${REVIEWER.split(" ·")[0]}` }
    : current.status === "locked" ? { dot: "bg-indigo-500", text: "Approved · ready to release" }
    : { dot: "bg-emerald-500", text: `In effect from ${fmtDate(values.effective)}` };

  const btn = "inline-flex h-9 items-center justify-center rounded-lg px-4 text-[12.5px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40";
  const primary = `${btn} text-white hover:opacity-90`;
  const secondary = `${btn} bg-white text-gray-800 ring-1 ring-inset ring-gray-200 hover:bg-gray-50`;

  const buttons = (
    <>
      {editable && dirty && (
        <button type="button" onClick={() => setEdits((e) => { const { [current.id]: _d, ...r } = e; return r; })} className={`${btn} text-gray-600 hover:bg-gray-100`}>
          Discard
        </button>
      )}
      {editable && dirty && (
        <button type="button" disabled={hasErrors} onClick={() => setModal("save")} className={`${primary} bg-gray-900`}>
          Save draft…
        </button>
      )}
      {editable && !dirty && (
        <button type="button" disabled={!canSubmit} onClick={() => transition("review")} className={primary} style={{ background: ACCENT }}>
          Submit for review
        </button>
      )}
      {current.status === "review" && (
        <>
          <button type="button" onClick={() => transition("draft")} className={secondary}>Return to draft</button>
          <button type="button" onClick={() => transition("locked")} className={primary} style={{ background: ACCENT }}>Approve as reviewer</button>
        </>
      )}
      {current.status === "locked" && (
        <button type="button" onClick={() => setModal("release")} className={primary} style={{ background: ACCENT }}>Release…</button>
      )}
      {current.status === "released" && (
        <button type="button" onClick={newRevision} className={secondary}>Create new revision</button>
      )}
    </>
  );

  const footer = (
    <div className={cn("flex shrink-0 gap-3 border-t border-gray-100 bg-white", mobile ? "flex-col px-4 py-3" : "items-center justify-between px-6 py-3")}>
      <p className="flex items-center gap-2 text-[12px] text-gray-500">
        <span className={cn("size-2 rounded-full", stateLine.dot)} aria-hidden="true" /> {stateLine.text}
      </p>
      <div className={cn("flex gap-2", mobile ? "flex-col-reverse" : "items-center")}>{buttons}</div>
    </div>
  );

  const tabs = (
    <div role="tablist" aria-label="Record sections" className="flex gap-5 border-b border-gray-100 text-[12.5px]">
      {([
        { id: "formula", label: "Formula" },
        { id: "dependencies", label: "Dependencies" },
        { id: "history", label: `History (${current.audit.length})` },
      ] as const).map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={tab === id}
          onClick={() => setTab(id)}
          className={cn("-mb-px border-b-2 pb-2.5 transition-colors", tab === id ? "border-gray-900 font-semibold text-gray-900" : "border-transparent text-gray-500 hover:text-gray-800")}
        >
          {label}
        </button>
      ))}
    </div>
  );

  const header = (
    <div className="space-y-3.5">
      <div>
        <p className="truncate text-[11.5px] text-gray-400">
          {agency.name} <span aria-hidden="true">/</span> Tax codes
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <h3 className="text-[20px] font-semibold tracking-tight text-gray-900">{current.code}</h3>
          <StatusPill status={current.status} />
        </div>
        <p className="mt-0.5 text-[12.5px] text-gray-500">
          {current.name} · v{current.version}{current.status !== "released" ? ` (v${current.released.version} in effect)` : ""}
        </p>
      </div>
      <Progress status={current.status} />
      {impactStrip}
    </div>
  );

  const body = tab === "formula" ? formulaTab : tab === "history" ? historyTab : chain;

  const overlays = (
    <>
      <AnimatePresence>
        {modal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 flex items-center justify-center bg-gray-900/30 p-4 backdrop-blur-[2px]">
            <motion.div initial={{ y: 8, scale: 0.98 }} animate={{ y: 0, scale: 1 }} role="dialog" aria-modal="true" aria-labelledby="asure-modal-title" className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
              {modal === "save" ? (
                <>
                  <h4 id="asure-modal-title" className="text-[15px] font-semibold text-gray-900">Save draft v{current.version}?</h4>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-gray-600">
                    Once released, this changes {current.code} for <strong className="text-gray-900">{current.employers} employers</strong> and {current.filing.length} filing {current.filing.length === 1 ? "frequency" : "frequencies"} from {fmtDate(values.effective)}. Saving keeps it in Draft, so nothing changes in payroll yet.
                  </p>
                </>
              ) : (
                <>
                  <h4 id="asure-modal-title" className="text-[15px] font-semibold text-gray-900">Release {current.code} v{current.version}?</h4>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-gray-600">
                    v{current.version} takes effect {fmtDate(values.effective)} for <strong className="text-gray-900">{current.employers} employers</strong>, replacing v{current.released.version}. The release is logged and v{current.released.version} stays in History.
                  </p>
                </>
              )}
              <div className="mt-5 flex justify-end gap-2">
                <button type="button" onClick={() => setModal(null)} className={`${btn} text-gray-600 hover:bg-gray-100`}>Cancel</button>
                <button type="button" onClick={modal === "save" ? confirmSave : () => transition("released")} className={primary} style={{ background: modal === "save" ? "#111827" : ACCENT }}>
                  {modal === "save" ? "Save draft" : `Release v${current.version}`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div aria-live="polite" className="pointer-events-none absolute inset-x-0 top-14 z-40 flex justify-center px-3">
        <AnimatePresence>
          {toast && (
            <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-center text-[12px] font-medium text-white shadow-lg">
              <Check className="size-3.5 text-emerald-400" aria-hidden="true" /> {toast}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </>
  );

  const brand = (
    <div className="flex items-center gap-2">
      <span className="flex size-7 items-center justify-center rounded-lg text-[12px] font-bold text-white" style={{ background: ACCENT }} aria-hidden="true">A</span>
      <span className="text-[13px] font-semibold text-gray-900">Compliance Engine</span>
      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">Sample data</span>
    </div>
  );
  const avatar = <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10.5px] font-semibold text-gray-600" aria-label="Signed in as a payroll admin">PA</span>;

  if (mobile) {
    return (
      <div className="relative flex h-full min-h-[480px] flex-col bg-white font-sans text-gray-900">
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-gray-100 px-4">{brand}{avatar}</div>
        <div className="space-y-2 border-b border-gray-100 p-4">
          {searchBox}
          <label className="block">
            <span className="sr-only">Tax code</span>
            <span className="relative block">
              <select
                value={`${agency.id}:${current.id}`}
                onChange={(e) => { const [a, c] = e.target.value.split(":"); select(a, c); }}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-8 text-[13px] shadow-sm"
              >
                {agencies.map((a) => (
                  <optgroup key={a.id} label={a.name}>
                    {a.codes.map((c) => <option key={c.id} value={`${a.id}:${c.id}`}>{c.code} · {STATUS[c.status].label}</option>)}
                  </optgroup>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-gray-400" aria-hidden="true" />
            </span>
          </label>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5" style={{ scrollbarWidth: "none" }}>
          {header}
          {tabs}
          {body}
        </div>
        {footer}
        {overlays}
      </div>
    );
  }

  return (
    <div className="relative flex h-full min-h-[520px] flex-col bg-white font-sans text-gray-900">
      <div className="flex h-12 shrink-0 items-center gap-4 border-b border-gray-100 px-5">
        {brand}
        <div className="ml-auto w-56">{searchBox}</div>
        {avatar}
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[200px] shrink-0 flex-col border-r border-gray-100 bg-gray-50/70 px-3 py-4">
          <p className="mb-2 flex items-baseline justify-between px-2 text-[11px] font-medium text-gray-400">
            <span className="uppercase tracking-wide">Agencies</span>
            <span>3 of 9,214</span>
          </p>
          <div className="min-h-0 flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>{tree}</div>
        </aside>
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-4" style={{ scrollbarWidth: "none" }}>
            {header}
            {tabs}
            {body}
          </div>
          {footer}
        </main>
      </div>
      {overlays}
    </div>
  );
}
