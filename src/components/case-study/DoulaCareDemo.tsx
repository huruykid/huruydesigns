import { useMemo, useState, type ReactNode } from "react";
import { AlertTriangle, Check, ClipboardCheck, Copy, FileText, Lock, ShieldCheck, Stethoscope, UserRound, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Recreated, sample-data version of the doula care portal: a doula logs a visit
 * against the client's Medi-Cal visit caps, batches visits into one claim, and a
 * biller works the claims queue. No real client or organization data.
 */

type Role = "doula" | "biller";
type VisitType = "prenatal" | "postpartum" | "extended" | "delivery";
type Modality = "In person" | "Video" | "Audio";
type ClaimStatus = "Submitted" | "Approved" | "Denied" | "Paid";

interface Visit { id: number; type: VisitType; date: string; minutes: number; modality: Modality; claimNote: string; billed: boolean; needsAuth: boolean }
interface Claim { id: string; client: string; visits: number; codes: string[]; ageDays: number; status: ClaimStatus; reason?: string; mediCalId: string; amount: string }
interface AuditEntry { who: string; what: string; when: string }

const PLUM = "#5B2A4E";
const PLUM_BG = "#F6EEF3";

const VISIT_TYPES: Record<VisitType, { label: string; code: string; pool: "perinatal" | "extended" | "delivery" }> = {
  prenatal: { label: "Prenatal visit", code: "Z1034", pool: "perinatal" },
  postpartum: { label: "Postpartum visit", code: "Z1038", pool: "perinatal" },
  extended: { label: "Extended postpartum", code: "T1032", pool: "extended" },
  delivery: { label: "Labor & delivery support", code: "59409", pool: "delivery" },
};
// Medi-Cal doula benefit caps per pregnancy, as the portal tracks them.
const CAPS = { initial: 1, perinatal: 8, extended: 2, delivery: 1 } as const;

const SEED_VISITS: Visit[] = [
  { id: 1, type: "prenatal", date: "2026-08-04", minutes: 60, modality: "In person", claimNote: "Birth plan review", billed: true, needsAuth: false },
  { id: 2, type: "prenatal", date: "2026-08-18", minutes: 60, modality: "Video", claimNote: "Comfort measures", billed: true, needsAuth: false },
  { id: 3, type: "prenatal", date: "2026-09-01", minutes: 45, modality: "In person", claimNote: "Hospital tour prep", billed: true, needsAuth: false },
  { id: 4, type: "prenatal", date: "2026-09-15", minutes: 60, modality: "In person", claimNote: "Labor positions", billed: true, needsAuth: false },
  { id: 7, type: "prenatal", date: "2026-09-19", minutes: 60, modality: "Video", claimNote: "Labor signs review", billed: true, needsAuth: false },
  { id: 5, type: "postpartum", date: "2026-10-02", minutes: 90, modality: "In person", claimNote: "Lactation support", billed: false, needsAuth: false },
  { id: 6, type: "postpartum", date: "2026-10-09", minutes: 60, modality: "Audio", claimNote: "Recovery check-in", billed: false, needsAuth: false },
];

const SEED_CLAIMS: Claim[] = [
  { id: "C-1042", client: "R. M.", visits: 3, codes: ["Z1034"], ageDays: 34, status: "Submitted", mediCalId: "91234567A", amount: "$571.00" },
  { id: "C-1047", client: "T. O.", visits: 2, codes: ["Z1038", "T1032"], ageDays: 22, status: "Submitted", mediCalId: "94418820F", amount: "$390.50" },
  { id: "C-1051", client: "K. D.", visits: 1, codes: ["59409"], ageDays: 6, status: "Approved", mediCalId: "90071355C", amount: "$1,154.00" },
];

const now = () => new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function tone(used: number, cap: number) {
  const pct = used / cap;
  return pct >= 1 ? "bg-red-500" : pct >= 0.8 ? "bg-orange-500" : pct >= 0.5 ? "bg-amber-400" : "bg-emerald-500";
}

function CapMeter({ label, used, cap }: { label: string; used: number; cap: number }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[13px] text-gray-600">{label}</span>
      <span className="flex items-center gap-2">
        <span className="flex gap-1" aria-hidden="true">
          {Array.from({ length: cap }, (_, i) => (
            <span key={i} className={cn("h-2.5 w-2.5 rounded-sm", i < used ? tone(used, cap) : "bg-gray-200")} />
          ))}
        </span>
        <span className="w-10 text-right text-[13px] font-semibold tabular-nums text-gray-900">{Math.min(used, 99)}/{cap}</span>
      </span>
    </div>
  );
}

function Field({ label, hint, error, children, id }: { label: string; hint?: string; error?: string; children: ReactNode; id: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-gray-700">{label}</label>
      {children}
      {error ? (
        <p id={`${id}-err`} className="mt-1 text-[12.5px] text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-[12.5px] text-gray-500">{hint}</p>
      ) : null}
    </div>
  );
}

export default function DoulaCareDemo({ layout = "desktop", frameWidth = 0 }: { layout?: "mobile" | "desktop"; frameWidth?: number }) {
  const mobile = layout === "mobile";
  const wide = !mobile && frameWidth >= 900;
  const [role, setRole] = useState<Role>("doula");
  const [visits, setVisits] = useState<Visit[]>(SEED_VISITS);
  const [claims, setClaims] = useState<Claim[]>(SEED_CLAIMS);
  const [audit, setAudit] = useState<AuditEntry[]>([{ who: "Doula (you)", what: "Viewed client A. J.", when: "9:02 AM" }]);
  const [toast, setToast] = useState<string | null>(null);

  // Log-visit form
  const [type, setType] = useState<VisitType>("postpartum");
  const [date, setDate] = useState(today());
  const [minutes, setMinutes] = useState("60");
  const [modality, setModality] = useState<Modality>("In person");
  const [claimNote, setClaimNote] = useState("");
  const [privateNote, setPrivateNote] = useState("");
  const [tried, setTried] = useState(false);

  // Biller
  const [openClaim, setOpenClaim] = useState<string | null>("C-1042");
  const [denyReason, setDenyReason] = useState("");
  const [denyTried, setDenyTried] = useState(false);

  const used = useMemo(() => {
    const u = { initial: 1, perinatal: 0, extended: 0, delivery: 0 };
    for (const v of visits) u[VISIT_TYPES[v.type].pool] += 1;
    return u;
  }, [visits]);

  const flash = (m: string) => {
    setToast(m);
    window.setTimeout(() => setToast((t) => (t === m ? null : t)), 2600);
  };
  const log = (who: string, what: string) => setAudit((a) => [{ who, what, when: now() }, ...a].slice(0, 6));

  const errors: Record<string, string> = {};
  if (!date) errors.date = "Enter the visit date.";
  else if (date > today()) errors.date = "A logged visit can't be in the future. Schedule it instead.";
  if (!(Number(minutes) > 0)) errors.minutes = "Enter how long the visit was, in minutes.";
  if (!claimNote.trim()) errors.claimNote = "Add a claim note. Medi-Cal requires one for every billed visit.";

  const pool = VISIT_TYPES[type].pool;
  const poolCap = CAPS[pool];
  const willExceed = used[pool] >= poolCap;

  const submitVisit = () => {
    setTried(true);
    if (Object.keys(errors).length) return;
    const v: Visit = { id: Date.now(), type, date, minutes: Number(minutes), modality, claimNote: claimNote.trim(), billed: false, needsAuth: willExceed };
    setVisits((all) => [...all, v]);
    log("Doula (you)", `Logged ${VISIT_TYPES[type].code} visit for A. J.${willExceed ? " (over cap, flagged for authorization)" : ""}`);
    flash(willExceed ? "Visit logged and flagged: additional authorization may be needed." : "Visit logged. It's ready to bill.");
    setClaimNote("");
    setPrivateNote("");
    setTried(false);
  };

  const unbilled = visits.filter((v) => !v.billed);
  const createClaim = () => {
    if (!unbilled.length) return;
    const codes = [...new Set(unbilled.map((v) => VISIT_TYPES[v.type].code))];
    const id = `C-${1052 + claims.length}`;
    setClaims((c) => [{ id, client: "A. J.", visits: unbilled.length, codes, ageDays: 0, status: "Submitted", mediCalId: "93820114B", amount: `$${(unbilled.length * 190.25).toFixed(2)}` }, ...c]);
    setVisits((all) => all.map((v) => ({ ...v, billed: true })));
    log("Doula (you)", `Submitted claim ${id}: ${unbilled.length} visits, one client`);
    flash(`Claim ${id} sent to billing. The CMS-1500 is generated for you.`);
  };

  const claim = claims.find((c) => c.id === openClaim) ?? null;
  const setStatus = (status: ClaimStatus, reason?: string) => {
    if (!claim) return;
    setClaims((all) => all.map((c) => (c.id === claim.id ? { ...c, status, reason } : c)));
    log("Biller", `${status === "Denied" ? "Denied" : status === "Paid" ? "Marked paid" : "Approved"} ${claim.id}${reason ? `: ${reason}` : ""}`);
    flash(`${claim.id} is now ${status}.`);
    setDenyReason("");
    setDenyTried(false);
  };
  const copy = (label: string, value: string) => {
    void navigator.clipboard?.writeText(value).catch(() => undefined);
    flash(`${label} copied`);
  };

  const touch = mobile ? "min-h-11" : "min-h-9";
  const input = cn("w-full rounded-lg border border-gray-200 bg-white px-3 shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100", mobile ? "h-11 text-base" : "h-10 text-[14px]");
  const btnPrimary = cn("inline-flex items-center justify-center gap-2 rounded-lg px-4 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40", touch);
  const btnSecondary = cn("inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 text-[14px] font-semibold text-gray-800 ring-1 ring-inset ring-gray-200 hover:bg-gray-50", touch);

  const roleSwitch = (
    <div role="tablist" aria-label="Signed in as" className="flex rounded-lg bg-gray-100 p-1">
      {(["doula", "biller"] as const).map((r) => (
        <button
          key={r}
          type="button"
          role="tab"
          aria-selected={role === r}
          onClick={() => { setRole(r); log(r === "doula" ? "Doula (you)" : "Biller", `Signed in as ${r}`); }}
          className={cn("flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 text-[13px] font-medium transition-colors", mobile ? "min-h-11" : "min-h-8", role === r ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-800")}
        >
          {r === "doula" ? <Stethoscope className="size-4" aria-hidden="true" /> : <ClipboardCheck className="size-4" aria-hidden="true" />}
          {r === "doula" ? "Doula" : "Biller"}
        </button>
      ))}
    </div>
  );

  const capsCard = (
    <section aria-label="Medi-Cal visit caps for this client" className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[15px] font-semibold text-gray-900">A. J. <span className="font-normal text-gray-500">· sample client</span></p>
          <p className="text-[12.5px] text-gray-500">Medi-Cal · due Sep 20 · delivered Sep 24</p>
        </div>
        <span className="rounded-full px-2.5 py-1 text-[12px] font-medium" style={{ background: PLUM_BG, color: PLUM }}>Eligibility verified</span>
      </div>
      <div className="space-y-2">
        <CapMeter label="Initial visit" used={used.initial} cap={CAPS.initial} />
        <CapMeter label="Prenatal + postpartum" used={used.perinatal} cap={CAPS.perinatal} />
        <CapMeter label="Extended postpartum" used={used.extended} cap={CAPS.extended} />
        <CapMeter label="Labor & delivery" used={used.delivery} cap={CAPS.delivery} />
      </div>
      {used.perinatal / CAPS.perinatal >= 0.8 && (
        <p className={cn("mt-3 flex items-start gap-2 rounded-lg px-3 py-2 text-[13px]", used.perinatal >= CAPS.perinatal ? "bg-red-50 text-red-800" : "bg-orange-50 text-orange-900")} role="status">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {used.perinatal >= CAPS.perinatal
            ? "All 8 prenatal and postpartum visits used. Additional authorization may be needed."
            : `${CAPS.perinatal - used.perinatal} prenatal or postpartum ${CAPS.perinatal - used.perinatal === 1 ? "visit" : "visits"} left in this pregnancy.`}
        </p>
      )}
    </section>
  );

  const visitForm = (
    <section aria-label="Log a visit" className="rounded-xl border border-gray-100 bg-white p-4">
      <p className="mb-3 text-[15px] font-semibold text-gray-900">Log a past visit</p>
      <div className={cn("grid gap-3", mobile ? "grid-cols-[minmax(0,1fr)]" : "grid-cols-2")}>
        <Field id="dc-type" label="Visit type" hint={`HCPCS ${VISIT_TYPES[type].code} · ICD-10 codes pre-filled`}>
          <select id="dc-type" value={type} onChange={(e) => setType(e.target.value as VisitType)} className={input}>
            {(Object.keys(VISIT_TYPES) as VisitType[]).map((k) => <option key={k} value={k}>{VISIT_TYPES[k].label}</option>)}
          </select>
        </Field>
        <Field id="dc-date" label="Date" error={tried ? errors.date : undefined}>
          <input id="dc-date" type="date" value={date} max={today()} onChange={(e) => setDate(e.target.value)} aria-invalid={tried && !!errors.date} aria-describedby={tried && errors.date ? "dc-date-err" : undefined} className={cn(input, tried && errors.date && "border-red-400 ring-2 ring-red-100")} />
        </Field>
        <Field id="dc-min" label="Duration (minutes)" error={tried ? errors.minutes : undefined}>
          <input id="dc-min" inputMode="numeric" value={minutes} onChange={(e) => setMinutes(e.target.value.replace(/[^\d]/g, ""))} aria-invalid={tried && !!errors.minutes} aria-describedby={tried && errors.minutes ? "dc-min-err" : undefined} className={cn(input, tried && errors.minutes && "border-red-400 ring-2 ring-red-100")} />
        </Field>
        <Field id="dc-mod" label="Modality">
          <select id="dc-mod" value={modality} onChange={(e) => setModality(e.target.value as Modality)} className={input}>
            {(["In person", "Video", "Audio"] as const).map((m) => <option key={m}>{m}</option>)}
          </select>
        </Field>
      </div>
      <div className="mt-3 grid gap-3">
        <Field id="dc-claim" label="Claim note (visible on audits)" error={tried ? errors.claimNote : undefined} hint={`${claimNote.length}/500 · attached to the claim`}>
          <textarea id="dc-claim" rows={2} maxLength={500} value={claimNote} onChange={(e) => setClaimNote(e.target.value)} aria-invalid={tried && !!errors.claimNote} aria-describedby={tried && errors.claimNote ? "dc-claim-err" : undefined} className={cn(input, "h-auto py-2", tried && errors.claimNote && "border-red-400 ring-2 ring-red-100")} placeholder="What support was provided" />
        </Field>
        <Field id="dc-private" label="Private note (only you)" hint="Never attached to claims or audits.">
          <textarea id="dc-private" rows={2} value={privateNote} onChange={(e) => setPrivateNote(e.target.value)} className={cn(input, "h-auto py-2")} placeholder="Reminders for your next visit" />
        </Field>
      </div>
      {willExceed && (
        <p className="mt-3 flex items-start gap-2 rounded-lg bg-orange-50 px-3 py-2 text-[13px] text-orange-900" role="status">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          This visit is over the {VISIT_TYPES[type].label.toLowerCase()} cap. You can still log it; it will be flagged so an authorization can be added before billing.
        </p>
      )}
      <div className={cn("mt-4 flex gap-2", mobile && "flex-col")}>
        <button type="button" onClick={submitVisit} className={btnPrimary} style={{ background: PLUM }}>Log visit</button>
      </div>
    </section>
  );

  const unbilledCard = (
    <section aria-label="Visits ready to bill" className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[15px] font-semibold text-gray-900">Ready to bill</p>
        <span className="text-[12.5px] text-gray-500">One client per claim</span>
      </div>
      {unbilled.length === 0 ? (
        <p className="py-2 text-[13px] text-gray-500">Nothing waiting. Logged visits appear here.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {unbilled.map((v) => (
            <li key={v.id} className="flex items-center justify-between gap-3 py-2 text-[13px]">
              <span className="min-w-0">
                <span className="block truncate font-medium text-gray-900">{VISIT_TYPES[v.type].label} <span className="font-normal text-gray-500">· {VISIT_TYPES[v.type].code}</span></span>
                <span className="block text-gray-500">{fmtDate(v.date)} · {v.minutes} min · {v.modality}</span>
              </span>
              {v.needsAuth && <span className="shrink-0 rounded-full bg-orange-100 px-2 py-0.5 text-[11.5px] font-medium text-orange-900">Needs auth</span>}
            </li>
          ))}
        </ul>
      )}
      <button type="button" disabled={!unbilled.length} onClick={createClaim} className={cn(btnSecondary, "mt-3 w-full disabled:cursor-not-allowed disabled:opacity-40")}>
        <FileText className="size-4" aria-hidden="true" /> Create claim from {unbilled.length} {unbilled.length === 1 ? "visit" : "visits"}
      </button>
    </section>
  );

  const ageBadge = (d: number) =>
    d >= 30 ? "bg-red-100 text-red-800" : d >= 20 ? "bg-amber-100 text-amber-900" : "bg-gray-100 text-gray-600";

  const claimsQueue = (
    <section aria-label="Claims queue" className="rounded-xl border border-gray-100 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <p className="text-[15px] font-semibold text-gray-900">Claims</p>
        <span className="text-[12.5px] text-gray-500">Age flags at 20 and 30 days</span>
      </div>
      <ul className="divide-y divide-gray-100">
        {claims.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              onClick={() => setOpenClaim(c.id)}
              aria-current={openClaim === c.id ? "true" : undefined}
              className={cn("flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[13px] transition-colors hover:bg-gray-50", openClaim === c.id && "bg-gray-50")}
            >
              <span className="min-w-0">
                <span className="block font-medium text-gray-900">{c.id} · {c.client}</span>
                <span className="block truncate text-gray-500">{c.visits} {c.visits === 1 ? "visit" : "visits"} · {c.codes.join(", ")}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className={cn("rounded-full px-2 py-0.5 text-[11.5px] font-medium tabular-nums", ageBadge(c.ageDays))}>{c.ageDays}d</span>
                <span className="w-[74px] text-right text-[12.5px] font-medium" style={{ color: c.status === "Denied" ? "#b91c1c" : c.status === "Paid" ? "#047857" : PLUM }}>{c.status}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );

  const claimDetail = claim && (
    <section aria-label={`Claim ${claim.id}`} className="rounded-xl border border-gray-100 bg-white p-4">
      <p className="text-[15px] font-semibold text-gray-900">{claim.id} <span className="font-normal text-gray-500">· {claim.status}</span></p>
      <p className="mb-3 text-[12.5px] text-gray-500">Copy each field into the payer portal.</p>
      <dl className="space-y-1.5">
        {[
          ["Medi-Cal ID", claim.mediCalId],
          ["Codes", claim.codes.join(", ")],
          ["Visits", String(claim.visits)],
          ["Billed amount", claim.amount],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-1.5">
            <dt className="text-[12.5px] text-gray-500">{k}</dt>
            <dd>
              <button type="button" onClick={() => copy(k, v)} className={cn("flex items-center gap-1.5 text-[13px] font-medium tabular-nums text-gray-900 hover:underline", mobile && "min-h-11")} aria-label={`Copy ${k}: ${v}`}>
                {v} <Copy className="size-3.5 text-gray-400" aria-hidden="true" />
              </button>
            </dd>
          </div>
        ))}
      </dl>
      {claim.reason && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-800">Denied: {claim.reason}</p>}
      {claim.status === "Submitted" && (
        <div className="mt-4 space-y-2">
          <Field id="dc-deny" label="Denial reason" error={denyTried && !denyReason.trim() ? "A denial needs a reason the doula can act on." : undefined}>
            <input id="dc-deny" value={denyReason} onChange={(e) => setDenyReason(e.target.value)} placeholder="e.g. Missing authorization number" aria-invalid={denyTried && !denyReason.trim()} aria-describedby={denyTried && !denyReason.trim() ? "dc-deny-err" : undefined} className={cn(input, denyTried && !denyReason.trim() && "border-red-400 ring-2 ring-red-100")} />
          </Field>
          <div className={cn("flex gap-2", mobile ? "flex-col-reverse" : "justify-end")}>
            <button type="button" onClick={() => { setDenyTried(true); if (denyReason.trim()) setStatus("Denied", denyReason.trim()); }} className={btnSecondary}>Deny</button>
            <button type="button" onClick={() => setStatus("Approved")} className={btnPrimary} style={{ background: PLUM }}>Approve</button>
          </div>
        </div>
      )}
      {claim.status === "Approved" && (
        <button type="button" onClick={() => setStatus("Paid")} className={cn(btnPrimary, "mt-4 w-full")} style={{ background: "#047857" }}>
          <Check className="size-4" aria-hidden="true" /> Mark paid
        </button>
      )}
    </section>
  );

  const auditCard = (
    <section aria-label="Audit trail" className="rounded-xl border border-gray-100 bg-white p-4">
      <p className="mb-2 flex items-center gap-2 text-[15px] font-semibold text-gray-900"><ShieldCheck className="size-4 text-gray-400" aria-hidden="true" /> Audit trail</p>
      <ol className="space-y-1.5">
        {audit.map((a, i) => (
          <li key={`${a.when}-${i}`} className="text-[12.5px] leading-snug">
            <span className="font-medium text-gray-900">{a.what}</span>
            <span className="block text-gray-500">{a.who} · {a.when}</span>
          </li>
        ))}
      </ol>
    </section>
  );

  const doulaView = wide ? (
    <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] gap-4">
      <div className="space-y-4">{visitForm}</div>
      <div className="space-y-4">{capsCard}{unbilledCard}</div>
    </div>
  ) : (
    <div className="space-y-4">{capsCard}{visitForm}{unbilledCard}</div>
  );

  const billerView = wide ? (
    <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-4">
      <div className="space-y-4">{claimsQueue}{auditCard}</div>
      <div className="space-y-4">{claimDetail}</div>
    </div>
  ) : (
    <div className="space-y-4">{claimsQueue}{claimDetail}{auditCard}</div>
  );

  return (
    <div className="relative flex min-h-full flex-col bg-[#FAF8F6] font-sans text-gray-900">
      <header className={cn("flex shrink-0 items-center gap-3 border-b border-gray-100 bg-white", mobile ? "flex-col items-stretch px-4 py-3" : "px-5 py-3")}>
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg text-white" style={{ background: PLUM }} aria-hidden="true"><Users className="size-4" /></span>
          <span className="text-[14px] font-semibold">Doula Care Portal</span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">Sample data</span>
        </div>
        <div className={cn(mobile ? "" : "ml-auto w-56")}>{roleSwitch}</div>
        {!mobile && <span className="flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500" aria-hidden="true"><UserRound className="size-4" /></span>}
      </header>
      <main className={cn("flex-1", mobile ? "p-3" : "p-5")}>
        {role === "doula" ? doulaView : billerView}
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[12px] text-gray-500">
          <Lock className="size-3.5" aria-hidden="true" /> Two-factor sign-in · locks after 15 minutes idle · every claim action is logged
        </p>
      </main>
      {/* Sticky to the bottom of the frame, so it stays visible wherever the demo is scrolled. */}
      <div aria-live="polite" className="pointer-events-none sticky bottom-3 z-40 flex min-h-0 justify-center px-3">
        {toast && <p className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-center text-[12.5px] font-medium text-white shadow-lg"><Check className="size-3.5 text-emerald-400" aria-hidden="true" /> {toast}</p>}
      </div>
    </div>
  );
}
