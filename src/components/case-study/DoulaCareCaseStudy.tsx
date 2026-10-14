import CaseStudySection from "./CaseStudySection";
import ResponsiveAppShell from "./ResponsiveAppShell";
import DoulaCareDemo from "./DoulaCareDemo";
import { Caption, DecisionList, Full, NumberedList, StatRow, Wide } from "./primitives";
import type { Project } from "@/lib/projects";
import ProjectQuotes from "./ProjectQuotes";
import { ClientRoadmap, ConsentDocumentsTable, DoulaHandoff } from "./DoulaHandoff";

interface Props {
  project: Project;
  getSlotImage: (slot: string) => string | undefined;
}

/**
 * Client work, shown as a recreation with sample data (permission given). No
 * organization, staff or client names; everything described is in the shipped code.
 */

const rules = [
  { value: "8", label: "prenatal and postpartum visits", description: "One shared pool per pregnancy" },
  { value: "1 + 1", label: "initial visit, labor and delivery", description: "Per pregnancy" },
  { value: "2", label: "extended postpartum visits", description: "Billed in 15-minute units" },
  { value: "CMS-1500", label: "claim form per submission", description: "With HCPCS and ICD-10 codes" },
];

const decisions = [
  {
    title: "Show the visit cap before the visit, and warn instead of blocking",
    body: "Medi-Cal pays for a fixed number of visits per pregnancy, and prenatal and postpartum visits share one pool of eight. I put the pool on every client as a row of boxes that turns amber at half, orange at 80% and red when it's used up, so a doula sees the limit while planning, not when a claim is denied. Over the cap, the visit still logs and is flagged for an extra authorization.",
    rejected: "Blocking the visit at the cap. A doula supporting someone in labor can't stop for paperwork, and an authorization can follow the visit.",
  },
  {
    title: "Separate what an auditor sees from what the doula keeps",
    body: "With a single notes field, a doula has to guess what an auditor will read. I split notes into three: a short claim note that is visible on audits, structured notes from templates the state requires, and private notes that are never attached to a claim. Each field says who will read it.",
    rejected: "A single rich-text notes field. Simpler to build, and it made every doula guess what counted as part of the medical record.",
  },
  {
    title: "Doulas log visits; the system writes the claim",
    body: "Doulas are care workers, not billers. They log a visit in plain language (type, date, duration, in person or remote) and the portal fills in the HCPCS and ICD-10 codes. Completed visits batch into one claim per client, and the CMS-1500 is generated for them to preview.",
    rejected: "Asking doulas to fill in a CMS-1500 directly. It mirrors the payer's form and assumes billing training most doulas don't have.",
  },
  {
    title: "Make the existing billing process workable first",
    body: "For the first phase I scoped the portal to what the organization could run right away: collect the documents, record visits, prepare the CMS-1500 and track each claim to paid. Submitting to payers and handling payment stayed outside it, so the biller's screen is built for the handoff. Every field is click-to-copy for retyping into the payer's portal, each claim shows its age with flags at 20 and 30 days so nothing drifts past a filing deadline, and after filing the biller attaches the submitted form for the doula's records. A denial needs a reason the doula can act on.",
    rejected: "A clearinghouse integration and payments in phase one. Better long term, and it would have held billing back while billers kept retyping claims by hand with no help.",
  },
  {
    title: "Make security part of the flow, not a gate in front of it",
    body: "Two-factor sign-in for admins, billers and doulas, with an authenticator app or an emailed code for anyone who doesn't use one. Sessions lock after 15 minutes idle with a two-minute warning, files open through short-lived links, and admins can view a doula's screen read-only for support, under a banner that stays on top of every dialog.",
    rejected: "Shared logins and letting admins edit as a doula. Faster support, and no way to say who changed a patient's record.",
  },
];

const roles = [
  { role: "Doula", can: "Their own clients, visits and notes. Billing tools unlock with the billing plan and a signed billing agreement." },
  { role: "Biller", can: "The claims queue and the client details a claim needs. No admin settings." },
  { role: "Admin", can: "Everything, including verifying doulas, transfers between doulas and reports for the state. Changing someone's role goes through a checked server function." },
  { role: "Client", can: "Their own visit roadmap, consent forms and upcoming visits." },
  { role: "Apprentice doula", can: "Only the clients and visits a mentor has shared with them." },
  { role: "Across staff roles", can: "Two-factor sign-in, a lock after 15 minutes idle with a two-minute warning, and documents that open through links that expire within minutes." },
];

const DoulaCareCaseStudy = ({ project }: Props) => (
  <>
    <CaseStudySection label="Context" title="Care Medi-Cal now pays for, on a system built for clinics">
      <p className="mb-4">
        California's Medi-Cal now covers doula care: prenatal visits, support during labor and postpartum visits. For community doulas that should mean steady income for work they already do. In practice, billing Medi-Cal means codes, visit limits per pregnancy, eligibility checks and claim forms designed for clinics with billing staff.
      </p>
      <p className="mb-4">
        A Bay Area birth-justice nonprofit that matches families with community doulas asked me to build the platform that would let its doulas get paid. I was the only designer and developer, working weekly with the nonprofit's leadership from October 2025.
      </p>
      <p>
        The brief centered Black doulas and doulas serving underserved communities, and its goal was billing support that kept them independent: their own clients, their own records, their own relationships with families. That became a product requirement. A doula sees her own clients, visits and claims, and chooses whether to bill through the portal at all; billing tools unlock only after she picks the billing plan and signs a billing agreement. Admins get enough oversight to support the work, and when they look at a doula's screen it's read-only.
      </p>
    </CaseStudySection>

    <CaseStudySection label="The Problem" title="Make Medi-Cal billing invisible, without hiding the rules">
      <p className="mb-8">
        Client sign-ups lived in Google Forms and email, and the information involved is protected health information. The rules couldn't be simplified away: every visit has a code, every pregnancy has caps, and every claim has to survive an audit. The design problem was making a doula's day feel like care work while the system did the compliance work underneath.
      </p>
      <StatRow stats={rules} columns={4} />
      <Caption>The Medi-Cal doula benefit rules the portal tracks per client.</Caption>
    </CaseStudySection>

    <CaseStudySection label="The Service" title="Billing starts before the first visit">
      <p className="mb-8">
        I treated intake, visit documentation and claim preparation as one workflow, not three features. Each step has to hand the next person what they need: the client supplies insurance and signs consent, the doula documents care, and the biller turns both into a claim without chasing anyone for a member ID.
      </p>
      <DoulaHandoff />
      <div className="cs-wide mt-16 grid items-center gap-8 md:grid-cols-[260px_1fr] md:gap-12">
        <ClientRoadmap />
        <div>
          <h3 className="mb-3 font-display text-lg font-bold tracking-tight text-foreground">The family's side is built for a phone, and for care</h3>
          <p className="mb-4">
            Clients sign in on their phones to finish intake and consent, see their upcoming visits and follow where they are in the pregnancy. Their roadmap counts down the same pool of eight visits their doula bills against, without a single billing code on screen.
          </p>
          <p>
            Real use shaped it. When a user reported that visit names were squeezed off narrow screens, I stacked those rows on phones and cut an indent that had left about 230px of usable width on a 375px screen.
          </p>
        </div>
      </div>
      <Caption>Client roadmap recreated with sample data.</Caption>
    </CaseStudySection>

    <CaseStudySection label="Decisions" title="Five calls I made, and what I turned down">
      <DecisionList items={decisions} />
    </CaseStudySection>

    <CaseStudySection label="Interactive Prototype" title="Log a visit, then bill it">
      <p className="mb-3">A recreation with sample data. Try it in this order:</p>
      <ol className="mb-8 list-decimal space-y-1 pl-5">
        <li>As the doula, look at the caps: with one of eight prenatal and postpartum visits left, the warning is already showing.</li>
        <li>Log a postpartum visit to use the last one, then log another: it still logs, flagged for an authorization.</li>
        <li>Create a claim from the visits, then switch to Biller: copy fields, approve, or deny (a reason is required). Every step lands in the audit trail.</li>
      </ol>
      <Full>
        <ResponsiveAppShell label="Doula Care Portal" allowToggle minDesktopWidth={640} desktopHeight={660} mobileWidth={340} mobileHeight={660}>
          <DoulaCareDemo />
        </ResponsiveAppShell>
        <Caption center>Recreated with sample data to show the design decisions. No real clients, doulas or organizations. Not the production UI.</Caption>
      </Full>
    </CaseStudySection>

    <CaseStudySection label="Dependencies" title="The intake flow depended on decisions outside the interface">
      <p className="mb-4">
        By November 2025 the intake and signature flows worked, but three documents clients would sign didn't exist yet: the Billing Expectations Notice, the Emergency Referral Consent and the doula contract. No screen could fix that.
      </p>
      <p className="mb-8">
        I took one question into the next stakeholder meeting: who writes these, and who arranges their legal review? The organization's Program Manager took ownership, and all three are now live in the client portal. Each is signed on its own, with the date it was signed, and shows the client as pending until then.
      </p>
      <ConsentDocumentsTable />
    </CaseStudySection>

    <CaseStudySection label="Access" title="Five roles, each enforced in the database">
      <p className="mb-8">
        Hiding a button isn't access control. Each role's limits are enforced by row-level security in the database, so a doula's session can't read another doula's clients even through the API, and no one can raise their own role.
      </p>
      <Wide>
        <dl className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {roles.map((r) => (
            <div key={r.role} className="bg-background p-6 lg:p-8">
              <dt className="mb-2 font-display text-lg font-bold tracking-tight text-foreground">{r.role}</dt>
              <dd className="text-[15px] leading-6">{r.can}</dd>
            </div>
          ))}
        </dl>
      </Wide>
    </CaseStudySection>

    <ProjectQuotes projectId={project.id} />

    <CaseStudySection label="Outcome" title="56 accounts across five community birth organizations">
      <p className={project.measured ? "mb-8" : "mb-4"}>{project.outcomeMetrics}</p>
      {/* Real totals from the portal, shown only once the nonprofit has OK'd them (projects.ts → measured). */}
      {project.measured && (
        <>
          <StatRow stats={project.measured.stats} columns={project.measured.stats.length >= 4 ? 4 : 2} />
          <Caption>{project.measured.source}</Caption>
        </>
      )}
    </CaseStudySection>

    {project.learnings && (
      <CaseStudySection label="What I Learned" title="In healthcare, design decides who sees what">
        <NumberedList items={project.learnings} />
      </CaseStudySection>
    )}

    {project.whatIdDoDifferently && (
      <CaseStudySection label="Hindsight" title="What I'd do differently">
        <NumberedList items={project.whatIdDoDifferently} tone="muted" />
      </CaseStudySection>
    )}
  </>
);

export default DoulaCareCaseStudy;
