import type { ReactNode } from "react";
import { Caption } from "./primitives";

/**
 * Intake-to-claim handoff, recreated as wireframes with sample data. Every field,
 * status and label shown here exists in the shipped portal; no client data is used.
 */

const Field = ({ label, value, tone }: { label: string; value: string; tone?: "warn" | "ok" }) => (
  <div className="flex min-w-0 items-center justify-between gap-3 border-b border-border/70 py-1.5 last:border-0">
    <span className="shrink-0 text-[12px] text-muted-foreground">{label}</span>
    <span
      className={`min-w-0 truncate text-right text-[12.5px] font-medium ${
        tone === "warn" ? "text-amber-700 dark:text-amber-400" : tone === "ok" ? "text-emerald-700 dark:text-emerald-400" : "text-foreground"
      }`}
    >
      {value}
    </span>
  </div>
);

const Chip = ({ children, solid }: { children: ReactNode; solid?: boolean }) => (
  <span
    className={`inline-flex h-7 items-center rounded-md px-2.5 text-[12px] font-semibold ${
      solid ? "bg-foreground text-background" : "text-foreground ring-1 ring-border"
    }`}
  >
    {children}
  </span>
);

const Pool = ({ used, total = 8 }: { used: number; total?: number }) => (
  <div className="flex gap-1" aria-hidden="true">
    {Array.from({ length: total }).map((_, i) => (
      <span key={i} className={`h-3.5 w-3.5 rounded-[3px] ${i < used ? "bg-foreground" : "border border-border bg-background"}`} />
    ))}
  </div>
);

const Frame = ({ phone, label, children }: { phone?: boolean; label: string; children: ReactNode }) => (
  <div
    role="img"
    aria-label={label}
    className={`grid content-start gap-2.5 bg-muted/40 ${
      phone
        ? "mx-auto w-full max-w-[240px] rounded-[1.75rem] border-[6px] border-foreground/80 px-3.5 pb-5 pt-4"
        : "rounded-xl border border-border p-4"
    }`}
  >
    {children}
  </div>
);

const steps: { who: string; title: string; note: string; frame: ReactNode }[] = [
  {
    who: "Client, on a phone",
    title: "Intake collects the billing inputs once",
    note: "Insurance, card photos and Medi-Cal ID are saved step by step. The other-doula question is there because Medi-Cal's visit limits are shared across every doula billing for the same pregnancy.",
    frame: (
      <Frame phone label="Client intake on a phone, step 2 of 4: insurance, eligibility pending review, card photo buttons and a question about another doula billing insurance">
        <div className="flex justify-between text-[10.5px] text-muted-foreground">
          <span>Insurance</span>
          <span>2 of 4</span>
        </div>
        <div className="grid grid-cols-4 gap-1" aria-hidden="true">
          <span className="h-1 rounded-full bg-foreground" />
          <span className="h-1 rounded-full bg-foreground" />
          <span className="h-1 rounded-full bg-border" />
          <span className="h-1 rounded-full bg-border" />
        </div>
        <div>
          <Field label="Eligibility" value="Pending review" tone="warn" />
          <Field label="Plan" value="Medi-Cal plan" />
          <Field label="Member ID" value="•••• 4821" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <Chip>Card front</Chip>
          <Chip>Card back</Chip>
        </div>
        <p className="text-[11.5px] leading-4 text-foreground">Working with another doula who bills insurance?</p>
        <div className="flex gap-1.5">
          <Chip>Yes</Chip>
          <Chip solid>No</Chip>
        </div>
      </Frame>
    ),
  },
  {
    who: "Doula",
    title: "Intake answers come back as warnings",
    note: "What the client reported shows up on the doula's record before she bills: another doula's visits may have used part of the cap, and secondary insurance changes the billing order. If the intake email goes unanswered, she copies the link and texts it.",
    frame: (
      <Frame label="Doula's client record: intake emailed but not back yet, consent signed, a warning that the client is working with another doula who has used 2 visits, no secondary insurance, and email again and copy link buttons">
        <p className="text-[13px] font-semibold text-foreground">Sample client</p>
        <div>
          <Field label="Intake form" value="Emailed, not back yet" tone="warn" />
          <Field label="Consent signed" value="Yes" tone="ok" />
          <Field label="Secondary insurance" value="No" />
        </div>
        <div className="rounded-md bg-amber-500/10 px-2.5 py-2 text-[11.5px] leading-4 text-foreground">
          <span className="font-semibold">Another doula: 2 visits used.</span> The cap may be partly used. Coordinate before billing.
        </div>
        <div className="flex gap-1.5">
          <Chip>Email again</Chip>
          <Chip solid>Copy link</Chip>
        </div>
      </Frame>
    ),
  },
  {
    who: "Doula",
    title: "Care details become billing codes",
    note: "The doula picks a visit type, date, length and whether it was in person, by video or by phone. The portal assigns the code, and remote visits get the matching telehealth modifier.",
    frame: (
      <Frame label="Log visit form: postpartum visit, 60 minutes by video, billed as Z1038 with modifier 95">
        <p className="text-[13px] font-semibold text-foreground">Log a visit</p>
        <div>
          <Field label="Type" value="Postpartum" />
          <Field label="Duration" value="60 min" />
          <Field label="Visit" value="Video" />
        </div>
        <div className="rounded-md bg-background px-2.5 py-2 text-[12px] text-foreground ring-1 ring-border">
          Billed as <span className="font-mono font-semibold">Z1038</span> · modifier <span className="font-mono font-semibold">95</span>
        </div>
        <div className="flex justify-end">
          <Chip solid>Log visit</Chip>
        </div>
      </Frame>
    ),
  },
  {
    who: "Biller",
    title: "The claim is assembled from the steps before it",
    note: "Plan and member ID come from intake, the code and modifier from the visit. Every field is click-to-copy into the payer's portal. After filing there, the biller attaches the submitted form so the doula keeps her own copy for audits.",
    frame: (
      <Frame label="Biller's claim sheet: submitted claim with plan and member ID from intake, Z1038 with modifier 95 from the visit, approve, deny and CMS-1500 actions, and an attach receipt button">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-foreground">Claim</p>
          <span className="rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground ring-1 ring-border">Submitted</span>
        </div>
        <div>
          <Field label="Plan" value="Medi-Cal plan ⧉" />
          <Field label="Member ID" value="•••• 4821 ⧉" />
          <Field label="Code" value="Z1038 · 95 ⧉" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Chip solid>Approve</Chip>
          <Chip>Deny</Chip>
          <Chip>CMS-1500</Chip>
        </div>
        <div className="border-t border-dashed border-border pt-2 text-[11.5px] text-muted-foreground">
          Filed with the payer? <span className="font-semibold text-foreground">Attach receipt</span>
        </div>
      </Frame>
    ),
  },
];

export const DoulaHandoff = () => (
  <figure className="cs-wide mb-0">
    <ol className="grid list-none gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="grid content-start gap-4">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[11px] font-bold tabular-nums tracking-normal text-background" aria-hidden="true">
              {i + 1}
            </span>
            {s.who}
          </p>
          {s.frame}
          <p className="text-[15px] leading-6">
            <span className="font-semibold text-foreground">{s.title}.</span> {s.note}
          </p>
        </li>
      ))}
    </ol>
    <figcaption>
      <Caption>Recreated as wireframes with sample data. Fields and statuses match the shipped portal; no real clients or doulas.</Caption>
    </figcaption>
  </figure>
);

/** The family's side: the visit roadmap a client sees on their phone. */
export const ClientRoadmap = () => (
  <Frame phone label="Client's care journey on a phone: prenatal, birth day and postpartum timeline, three of eight shared visits used, extended postpartum visits and additional visits that need a referral">
    <p className="text-[13px] font-semibold text-foreground">Your doula care journey</p>
    <div className="relative grid grid-cols-3 py-1 text-center text-[10.5px]" aria-hidden="true">
      <span className="absolute left-[16%] right-[16%] top-[9px] h-px bg-border" />
      {["Prenatal", "Birth day", "Postpartum"].map((m, i) => (
        <span key={m} className="relative grid justify-items-center gap-1">
          <span className={`h-[18px] w-[18px] rounded-full ${i === 0 ? "bg-foreground ring-4 ring-foreground/15" : "border border-border bg-background"}`} />
          <span className={i === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}>{m}</span>
        </span>
      ))}
    </div>
    <div className="grid gap-1.5">
      <Pool used={3} />
      <span className="text-[11px] text-muted-foreground">3 of 8 shared visits used</span>
    </div>
    <div>
      <Field label="Extended postpartum" value="2 visits" />
      <Field label="Additional visits" value="Needs referral" tone="warn" />
    </div>
  </Frame>
);

export interface DocumentRow {
  doc: string;
  covers: string;
}

const consentDocuments: DocumentRow[] = [
  {
    doc: "Billing Expectations Notice",
    covers: "Medi-Cal's visit limits, including that visits with another doula count toward the same total, and keeping coverage active.",
  },
  {
    doc: "Emergency Referral Consent",
    covers: "The doula may call 911 or the client's provider in an emergency; the client keeps every medical decision.",
  },
  {
    doc: "Doula contract",
    covers: "What the client and the doula each commit to, cancellation notice and how either side ends the agreement.",
  },
];

export const ConsentDocumentsTable = () => (
  <div className="cs-wide">
    {/* Phones: stacked list. */}
    <dl className="divide-y divide-border border-y border-border text-[15px] leading-6 sm:hidden">
      {consentDocuments.map((d) => (
        <div key={d.doc} className="grid gap-1 py-4">
          <dt className="font-semibold text-foreground">{d.doc}</dt>
          <dd>{d.covers}</dd>
          <dd className="text-sm text-muted-foreground">Owner: Program Manager · Live, signed separately</dd>
        </div>
      ))}
    </dl>
    <table className="hidden w-full border-collapse text-left text-[15px] leading-6 sm:table">
      <thead>
        <tr className="border-b border-border text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <th scope="col" className="py-3 pr-6 font-semibold">Document</th>
          <th scope="col" className="py-3 pr-6 font-semibold">What the client agrees to</th>
          <th scope="col" className="py-3 pr-6 font-semibold">Owner</th>
          <th scope="col" className="py-3 font-semibold">Status</th>
        </tr>
      </thead>
      <tbody>
        {consentDocuments.map((d) => (
          <tr key={d.doc} className="border-b border-border/60 align-top">
            <th scope="row" className="py-4 pr-6 font-semibold text-foreground">{d.doc}</th>
            <td className="py-4 pr-6">{d.covers}</td>
            <td className="whitespace-nowrap py-4 pr-6">Program Manager</td>
            <td className="py-4">Live in the client portal, signed separately</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
