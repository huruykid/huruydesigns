import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Check, Copy, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEO from "@/components/SEO";
import { AppStoreBadgeLink } from "@/components/AppStorePromoBanner";
import { person } from "@/lib/resume";
import { PERSON_REF, absoluteUrl } from "@/lib/seo";
import { APPSTORE_LEAD_CONVERSION, trackConversion, trackEvent } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";
import { imageDimensions } from "@/lib/imageDimensions";
import {
  type IntakeStatus,
  type ServicePackage,
  BELES_APP_STORE_URL,
  BOOKING_URL,
  EBT_FINDER_APP_STORE_URL,
  EBT_FINDER_LIVE_VERSION,
  accountStatuses,
  addOns,
  belesScreens,
  ebtProof,
  exclusions,
  faqs,
  guarantee,
  guidelines,
  intakePackages,
  intakeStatuses,
  packages,
  process,
  readinessCheck,
  requirements,
  stacks,
  trustPoints,
  workingTerms,
} from "@/lib/appStoreService";

const PATH = "/appstore";
const RESCUE_PATH = "/appstore/rescue";
const TITLE = "Get Your Lovable App on the App Store | Huruy Kidanemariam";
const DESCRIPTION =
  "I turn Lovable and other AI-built web apps into native iOS apps that pass Apple review. Free rejection diagnosis. Rejection rescue $750, readiness check $250, full launch from $1,500, balance due on approval.";

/**
 * The /appstore/rescue variant is the landing page for rejection-intent search ads: same
 * page, but the hero speaks to someone holding a rejection and the form opens on Rescue.
 * It is prerendered but kept out of the sitemap and marked noindex, so the two pages never
 * compete in organic search.
 */
const RESCUE_TITLE = "Rejected by App Review? Free Diagnosis, Fixed-Price Fix | Huruy Kidanemariam";
const RESCUE_DESCRIPTION =
  "Paste Apple's rejection message and get a free diagnosis within one business day. Rejection Rescue is a fixed $750: $250 to start, $500 only when Apple approves, free resubmissions.";

export type AppStoreVariant = "launch" | "rescue";

const BELES_LOGO = "/images/logos/beles.webp";
const EBT_LOGO = "/images/logos/ebtfinder.webp";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "App Store launch for AI-built apps",
    serviceType: "iOS app publishing and App Store review",
    description: DESCRIPTION,
    url: absoluteUrl(PATH),
    provider: PERSON_REF,
    areaServed: "Worldwide",
    offers: intakePackages.map((p) => ({
      "@type": "Offer",
      name: p.name,
      price: p.priceValue,
      priceCurrency: "USD",
      description: p.bestFor,
      url: absoluteUrl(`${PATH}#start`),
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

const selectClass =
  "mt-1.5 flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

type IntakeState = "idle" | "sending" | "sent" | "failed";
type PackageId = ServicePackage["id"];

interface IntakeFormProps {
  pkg: PackageId | "";
  onPkgChange: (id: PackageId | "") => void;
  stage: IntakeStatus | "";
  onStageChange: (stage: IntakeStatus | "") => void;
}

const IntakeForm = ({ pkg, onPkgChange, stage: stageValue, onStageChange }: IntakeFormProps) => {
  const [state, setState] = useState<IntakeState>("idle");
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState<{ subject: string; body: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const field = (key: string) => ((data.get(key) as string) || "").trim();
    const payload = {
      name: field("name"),
      email: field("email"),
      appUrl: field("appUrl"),
      stage: field("stage"),
      account: field("account"),
      details: field("details"),
      website: field("website"),
    };
    const stage = intakeStatuses.find((st) => st.value === payload.stage);
    if (!payload.name || !payload.email || !payload.appUrl || !stage) return;

    // The lead backend has no package column, so the choice travels at the top of the details.
    const chosen = intakePackages.find((p) => p.id === pkg);
    if (chosen) payload.details = [`Interested in: ${chosen.name} (${chosen.price})`, payload.details].filter(Boolean).join("\n\n");

    const kind = chosen?.id === "check" ? "readiness check" : stage.value === "rejected" ? "rescue" : "launch";
    const subject = `App Store ${kind}: ${payload.name}`;
    const body = [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `App: ${payload.appUrl}`,
      `Where it stands: ${stage.label}`,
      `Apple Developer account: ${payload.account || "Not said"}`,
      "",
      payload.details || "(No details yet)",
    ].join("\n");
    setDraft({ subject, body });
    setError(null);
    setState("sending");

    try {
      const { data: res, error: fnError } = await supabase.functions.invoke<{ ok: boolean; error?: string }>("appstore-lead", {
        body: payload,
      });
      if (fnError || !res?.ok) throw new Error(res?.error ?? fnError?.message ?? "Request failed");
      setState("sent");
      trackEvent("appstore_intake", { stage: stage.value, package: pkg || "unsure", channel: "form" });
      trackConversion(APPSTORE_LEAD_CONVERSION, { value: 1, currency: "USD" });
    } catch (err) {
      setError(err instanceof Error ? err.message : null);
      setState("failed");
      trackEvent("appstore_intake_failed", { stage: stage.value });
    }
  };

  const copyDraft = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${person.email}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (state === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-border bg-card p-6">
        <p className="mb-1 flex items-center gap-2 font-semibold text-foreground">
          <Check className="h-5 w-5 text-accent" aria-hidden="true" /> Got it. Thanks.
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          I'll reply to your email within one business day with a yes, a no, or questions. If you'd rather talk now,{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
            book a 15-minute call
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="App Store intake">
      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="intake-website">Website</label>
        <input id="intake-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="intake-name">Name</Label>
          <Input id="intake-name" name="name" autoComplete="name" required maxLength={120} className="mt-1.5 h-11 rounded-lg" />
        </div>
        <div>
          <Label htmlFor="intake-email">Email</Label>
          <Input id="intake-email" name="email" type="email" autoComplete="email" required maxLength={254} className="mt-1.5 h-11 rounded-lg" />
        </div>
      </div>
      <div>
        <Label htmlFor="intake-url">Link to your app</Label>
        <Input id="intake-url" name="appUrl" type="url" inputMode="url" placeholder="https://yourapp.lovable.app" required maxLength={500} className="mt-1.5 h-11 rounded-lg" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="intake-stage">Where it stands</Label>
          <select
            id="intake-stage"
            name="stage"
            required
            value={stageValue}
            onChange={(e) => onStageChange(e.target.value as IntakeStatus | "")}
            className={selectClass}
          >
            <option value="" disabled>Choose one</option>
            {intakeStatuses.map((st) => (
              <option key={st.value} value={st.value}>{st.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="intake-account">Apple Developer account</Label>
          <select id="intake-account" name="account" defaultValue="" className={selectClass}>
            <option value="">Choose one</option>
            {accountStatuses.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="intake-package">What you'd like</Label>
        <select
          id="intake-package"
          name="package"
          value={pkg}
          onChange={(e) => onPkgChange(e.target.value as PackageId | "")}
          className={selectClass}
        >
          <option value="">Not sure yet</option>
          {intakePackages.map((p) => (
            <option key={p.id} value={p.id}>{`${p.name} (${p.price})`}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="intake-details">What's going on?</Label>
        <Textarea
          id="intake-details"
          name="details"
          rows={5}
          maxLength={2000}
          placeholder="If Apple rejected it, paste the guideline and their message here."
          className="mt-1.5 rounded-lg"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={state === "sending"}
        className="min-h-11 w-full rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90 sm:w-auto"
      >
        <Send className="mr-1 h-4 w-4" aria-hidden="true" /> {state === "sending" ? "Sending…" : "Get a free diagnosis"}
      </Button>
      <p className="text-xs text-muted-foreground">Reply within one business day. Don't send passwords or API keys.</p>
      {state === "failed" && draft && (
        <div role="alert" className="rounded-xl border border-border bg-muted/40 p-4 text-sm">
          <p className="mb-3">
            {error && !/request failed|failed to fetch/i.test(error) ? `${error} ` : "That didn't go through. "}
            You can send the same message by email instead.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline" size="sm" className="min-h-11 rounded-full">
              <a href={`mailto:${person.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}>
                Open in email
              </a>
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={copyDraft} className="min-h-11 rounded-full">
              {copied ? <Check className="mr-1 h-4 w-4" aria-hidden="true" /> : <Copy className="mr-1 h-4 w-4" aria-hidden="true" />}
              {copied ? "Copied" : `Copy message for ${person.email}`}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

/* ---------- Small layout pieces, kept local so the page reads top to bottom ---------- */

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <p className="mb-3 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{children}</p>
);

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  band?: boolean;
  /** Rendered beside the title on wide screens, for a section whose content is one card. */
  aside?: ReactNode;
  children?: ReactNode;
}

/** One page section: eyebrow, title, optional lede, content. `band` tints the full-width background. */
const Section = ({ id, eyebrow, title, lede, band, aside, children }: SectionProps) => {
  const headingId = `${id ?? eyebrow?.toLowerCase().replace(/\s+/g, "-") ?? "section"}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${band ? "bg-muted/50" : ""} scroll-mt-24 py-16 sm:py-20 lg:py-24`}>
      <div className="container">
        <div className={`mx-auto max-w-[1120px] ${aside ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-center" : ""}`}>
          <div>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 id={headingId} className="max-w-[26ch] text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance">
              {title}
            </h2>
            {lede && <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-muted-foreground sm:text-lg">{lede}</p>}
          </div>
          {aside}
          {children && <div className={aside ? "mt-4 lg:col-span-2" : "mt-10"}>{children}</div>}
        </div>
      </div>
    </section>
  );
};

const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-border bg-card shadow-[0_1px_2px_hsl(var(--foreground)/0.04)] ${className}`}>{children}</div>
);

const Chip = ({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "bad" | "good" }) => {
  const tones = {
    neutral: "bg-muted text-muted-foreground",
    bad: "bg-destructive/10 text-destructive",
    good: "bg-foreground text-background",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[11px] leading-none ${tones[tone]}`}>{children}</span>;
};

const PrimaryLink = ({ href, onClick, children, to }: { href?: string; to?: string; onClick?: () => void; children: ReactNode }) => (
  <Button asChild size="lg" className="min-h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90">
    {to ? (
      <Link to={to} onClick={onClick}>{children} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
    ) : (
      <a href={href} onClick={onClick}>{children} <ArrowRight className="h-4 w-4" aria-hidden="true" /></a>
    )}
  </Button>
);

const OutlineLink = ({ href, onClick, children }: { href: string; onClick?: () => void; children: ReactNode }) => (
  <Button asChild size="lg" variant="outline" className="min-h-11 rounded-full px-6">
    <a href={href} onClick={onClick}>{children}</a>
  </Button>
);

const stages = ["Rejected", "Diagnosed", "Fixed", "Resubmitted", "Approved"] as const;

/** A mock of the message a founder is holding when they land here, plus the path out of it. */
const ResolutionCenterMock = () => (
  <div className="rounded-3xl bg-muted/60 p-4 sm:p-6" aria-hidden="true">
    <Card>
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span className="inline-block h-5 w-5 rounded-md bg-foreground" />
          Resolution Center
        </span>
        <Chip tone="bad"><X className="h-3 w-3" /> Rejected</Chip>
      </div>
      <div className="px-5 py-4">
        <p className="font-mono text-xs leading-relaxed text-muted-foreground">Guideline 4.2 – Design – Minimum Functionality</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          The experience your app provides is not sufficiently different from a mobile browsing experience. Please revise your app to include features that go beyond a repackaged website.
        </p>
      </div>
      <div className="border-t border-border px-5 py-3 font-mono text-xs text-muted-foreground">○ Waiting on your reply in Resolution Center</div>
    </Card>
    <div className="my-3 flex justify-end">
      <Card className="px-3 py-1.5 font-mono text-[11px] text-muted-foreground">● diagnosed free, within one business day</Card>
    </div>
    <Card className="p-5">
      <p className="text-sm font-medium text-foreground">A typical case, start to finish</p>
      <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {stages.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            <Chip tone={i === 0 ? "bad" : i === stages.length - 1 ? "good" : "neutral"}>
              {i === 0 ? <X className="h-3 w-3" /> : i === stages.length - 1 ? <Check className="h-3 w-3" /> : null}
              {s}
            </Chip>
            {i < stages.length - 1 && <span className="text-muted-foreground/60">→</span>}
          </li>
        ))}
      </ol>
    </Card>
  </div>
);

const PackageCard = ({
  pkg,
  core,
  cta,
  onChoose,
  role,
}: {
  pkg: ServicePackage;
  core?: boolean;
  cta: string;
  onChoose: (id: PackageId) => void;
  role?: "group";
}) => (
  <li
    role={role}
    aria-labelledby={`pkg-${pkg.id}`}
    className={`flex flex-col rounded-2xl border bg-card p-6 shadow-[0_1px_2px_hsl(var(--foreground)/0.04)] ${core ? "border-foreground/30" : "border-border"}`}
  >
    <div className="flex items-start justify-between gap-3">
      <h3 id={`pkg-${pkg.id}`} className="text-lg font-medium text-foreground">{pkg.name}</h3>
      {core && <Chip>Core service</Chip>}
    </div>
    <p className="mt-3 text-4xl font-medium tracking-tight text-foreground">{pkg.price}</p>
    {pkg.note && <p className="mt-1 font-mono text-xs text-muted-foreground">{pkg.note}</p>}
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pkg.bestFor}</p>
    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{pkg.payment}</p>
    <p className="mt-5 border-t border-border pt-4 font-mono text-xs text-muted-foreground">Includes</p>
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground">
      {pkg.includes.map((item) => (
        <li key={item} className="flex gap-2.5">
          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
    <div className="mt-auto pt-6">
      <Button asChild variant="outline" className="min-h-11 w-full rounded-full">
        <a href="#start" onClick={() => onChoose(pkg.id)}>{cta}</a>
      </Button>
    </div>
  </li>
);

/* ------------------------------------------ Page ------------------------------------------ */

const AppStoreLaunch = ({ variant = "launch" }: { variant?: AppStoreVariant }) => {
  const rescue = variant === "rescue";
  const [pkg, setPkg] = useState<PackageId | "">(rescue ? "rescue" : "");
  const [stage, setStage] = useState<IntakeStatus | "">(rescue ? "rejected" : "");
  const choose = (id: PackageId) => {
    setPkg(id);
    if (id === "rescue") setStage("rejected");
    trackEvent("appstore_package_click", { package: id });
  };
  const carePlan = addOns.find((a) => /care/i.test(a.name));
  const android = addOns.find((a) => /android/i.test(a.name));

  return (
    <>
      <SEO
        title={rescue ? RESCUE_TITLE : TITLE}
        description={rescue ? RESCUE_DESCRIPTION : DESCRIPTION}
        path={rescue ? RESCUE_PATH : PATH}
        image="/og/appstore.png"
        imageAlt="Get your Lovable app approved on the App Store: Huruy Kidanemariam's fixed-price launch service, shown with Beles and EBT Finder"
        jsonLd={rescue ? undefined : jsonLd}
        noindex={rescue}
        breadcrumbs={
          rescue
            ? [{ name: "Home", path: "/" }, { name: "App Store launch", path: PATH }, { name: "Rejection rescue", path: RESCUE_PATH }]
            : [{ name: "Home", path: "/" }, { name: "App Store launch", path: PATH }]
        }
      />

      {/* Hero */}
      <section aria-labelledby="appstore-heading" className="relative overflow-hidden">
        <div className="bg-dotgrid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="container relative pt-14 sm:pt-20 lg:pt-24">
          <div className="mx-auto grid max-w-[1120px] items-start gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:gap-16 lg:pb-24">
            <div className="max-w-[40rem]">
              <Eyebrow>{rescue ? "App Store rejection rescue" : "Lovable to the App Store"}</Eyebrow>
              <h1 id="appstore-heading" className="text-[2.75rem] font-medium leading-[1.02] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {rescue ? (
                  <>
                    Rejected by App Review?{" "}
                    <span className="font-serif-display mt-1 block font-normal italic">The diagnosis is free.</span>
                  </>
                ) : (
                  <>
                    Built it in Lovable?{" "}
                    <span className="font-serif-display mt-1 block font-normal italic">Let's get it on the App Store.</span>
                  </>
                )}
              </h1>
              <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
                {rescue
                  ? "Paste Apple's message. Within one business day: what it means, what the fix involves, and a fixed price."
                  : "A native iPhone app from the code you already have, through App Review, for a fixed price. The balance is due when Apple approves."}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {rescue ? (
                  <>
                    <PrimaryLink href="#start" onClick={() => choose("rescue")}>Get a free diagnosis</PrimaryLink>
                    <OutlineLink href="#pricing">See pricing</OutlineLink>
                  </>
                ) : (
                  <>
                    <PrimaryLink href="#start">Tell me about your app</PrimaryLink>
                    <OutlineLink href="#pricing">See pricing</OutlineLink>
                  </>
                )}
              </div>
              <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
                {trustPoints.slice(0, 3).map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                {rescue ? (
                  <>
                    Never submitted yet?{" "}
                    <Link to={PATH} className="font-medium text-accent underline underline-offset-4">Start with the launch service</Link>
                  </>
                ) : (
                  <>
                    Rejected by Apple?{" "}
                    <a href="#start" onClick={() => choose("rescue")} className="font-medium text-accent underline underline-offset-4">
                      Paste the message for a free diagnosis
                    </a>
                  </>
                )}
              </p>
            </div>
            <ResolutionCenterMock />
          </div>
        </div>
      </section>

      {/* Scope */}
      <Section eyebrow="Scope" title="What I fix" lede="Any App Review guideline. The common ones:">
        <Card className="p-2 sm:p-4">
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {guidelines.map((g) => (
              <li key={g.number} className="flex items-baseline gap-3 border-b border-border px-3 py-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+4)]:border-b-0">
                <span className="font-mono text-sm text-accent">{g.number}</span>
                <span className="font-medium text-foreground">{g.name}</span>
              </li>
            ))}
          </ul>
        </Card>
        <p className="mt-6 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Stacks:</span> {stacks.join(", ")}.
        </p>
      </Section>

      {/* Process */}
      <Section id="how-it-works" eyebrow="Process" title="How it works" lede="Four steps. Your account and your code stay yours." band>
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title}>
              <Card className="flex h-full flex-col p-6">
                <span className="inline-flex w-fit rounded-full bg-muted px-2.5 py-1 font-mono text-[11px] text-muted-foreground" aria-hidden="true">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-medium text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                {step.levels && (
                  <ul className="mt-4 space-y-2 text-sm text-foreground">
                    {step.levels.map((l, j) => (
                      <li key={l} className="flex items-center gap-2.5">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-border font-mono text-[10px] text-muted-foreground" aria-hidden="true">{j}</span>
                        {l}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {workingTerms.map((w) => (
            <div key={w.label} className="rounded-2xl bg-muted p-5">
              <p className="font-mono text-xs text-muted-foreground">{w.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{w.body}</p>
            </div>
          ))}
        </div>
        <details className="group mt-6 rounded-2xl border border-border bg-card p-5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground">
            What I need from you
            <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            {requirements.map((r) => (
              <li key={r} className="flex gap-2.5">
                <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </details>
      </Section>

      {/* Cases */}
      <Section id="beles" eyebrow="Cases" title="From a Lovable project to the App Store" lede="Two apps of my own, both live.">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Card className="flex flex-col p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <img src={BELES_LOGO} width={imageDimensions[BELES_LOGO]?.width} height={imageDimensions[BELES_LOGO]?.height} alt="" className="h-10 w-10 rounded-xl" loading="lazy" decoding="async" />
              <h3 className="text-xl font-medium text-foreground">Beles</h3>
            </div>
            <p className="mt-3 text-base text-muted-foreground">Built in Lovable. First iOS build to 175 countries in ten days.</p>
            <p className="mt-3 font-mono text-xs text-accent">4.8 · 1.2 · 2.3 · iPhone-only</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground">
              A dating app, built solo. Native sign-in, Sign in with Apple, and the reporting and blocking Apple requires, all added before approval.
            </p>
            <ul aria-label="Beles App Store screenshots" className="mt-6 grid grid-cols-5 gap-2">
              {belesScreens.map((s) => (
                <li key={s.src}>
                  <img
                    src={s.src}
                    width={imageDimensions[s.src]?.width}
                    height={imageDimensions[s.src]?.height}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full rounded-lg border border-border"
                  />
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <AppStoreBadgeLink href={BELES_APP_STORE_URL} appName="Beles" onClick={() => trackEvent("appstore_proof_click", { app: "beles" })} />
              <Link to="/project/beles" className="text-sm font-medium text-accent underline underline-offset-4">Read the design case study</Link>
            </div>
          </Card>

          <Card className="flex flex-col p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <img src={EBT_LOGO} width={imageDimensions[EBT_LOGO]?.width} height={imageDimensions[EBT_LOGO]?.height} alt="" className="h-10 w-10 rounded-xl" loading="lazy" decoding="async" />
              <h3 className="text-xl font-medium text-foreground">EBT Finder</h3>
            </div>
            <p className="mt-3 text-base text-muted-foreground">Rejected by App Review, approved without a new build. Version {EBT_FINDER_LIVE_VERSION} is live.</p>
            <p className="mt-3 font-mono text-xs text-accent">2.1 · {ebtProof.stats[0]?.value} locations</p>
            <p className="mt-4 text-sm leading-relaxed text-foreground">
              The reviewer couldn't create an account. The cause was on the server, not in the app: fixed the same day and explained in Resolution Center.
            </p>
            {ebtProof.frames.length > 0 && (
              <ul aria-label="EBT Finder App Store screenshots" className="mt-6 grid grid-cols-4 gap-2">
                {ebtProof.frames.map((f) => (
                  <li key={f.src}>
                    <img
                      src={f.src}
                      width={imageDimensions[f.src]?.width}
                      height={imageDimensions[f.src]?.height}
                      alt={f.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-auto w-full rounded-lg border border-border"
                    />
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <AppStoreBadgeLink href={EBT_FINDER_APP_STORE_URL} appName="EBT Finder" onClick={() => trackEvent("appstore_proof_click", { app: "ebtfinder" })} />
              <Link to="/project/ebtfinder" className="text-sm font-medium text-accent underline underline-offset-4">Read the EBT Finder case study</Link>
            </div>
          </Card>
        </div>
        <Card className="mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="text-lg font-medium text-foreground">Your app could be next.</p>
            <p className="mt-1 text-sm text-muted-foreground">Send the link or the rejection. Get the real cause and a fixed price.</p>
          </div>
          <PrimaryLink href="#start" onClick={() => rescue && choose("rescue")}>Get a free diagnosis</PrimaryLink>
        </Card>
      </Section>

      {/* Pricing */}
      <Section
        id="pricing"
        eyebrow="Pricing"
        title="Fixed prices, quoted after the free diagnosis"
        lede="The price is set before work starts and doesn't move unless the scope does. No hourly billing."
        band
      >
        <ul className="grid list-none gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label="Packages">
          <PackageCard pkg={readinessCheck} cta="Book a Readiness Check" onChoose={choose} role="group" />
          {packages.map((p) => (
            <PackageCard key={p.id} pkg={p} core={p.id === "rescue"} cta={p.id === "rescue" ? "Get a free diagnosis" : `Start ${p.name}`} onChoose={choose} />
          ))}
          {carePlan && (
            <li className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_1px_2px_hsl(var(--foreground)/0.04)]">
              <h3 className="text-lg font-medium text-foreground">{carePlan.name}</h3>
              <p className="mt-3 text-4xl font-medium tracking-tight text-foreground">
                {carePlan.price.replace("/month", "")} <span className="font-mono text-sm font-normal text-muted-foreground">per month</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{carePlan.detail}</p>
              {android && (
                <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{android.name} {android.price}.</span> {android.detail}
                </p>
              )}
            </li>
          )}
          <li className="flex flex-col justify-center rounded-2xl bg-muted p-6">
            <p className="text-lg font-medium text-foreground">Not sure which fits?</p>
            <p className="font-serif-display mt-1 text-2xl italic text-foreground">Start with the free diagnosis.</p>
            <div className="mt-5">
              <PrimaryLink href="#start">Get a free diagnosis</PrimaryLink>
            </div>
          </li>
        </ul>
      </Section>

      {/* Guarantee */}
      <Section eyebrow="Guarantee" title="What I stand behind">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Card className="border-l-4 border-l-foreground p-6 sm:p-8">
            <p className="font-serif-display text-2xl italic leading-snug text-foreground sm:text-3xl">{guarantee}</p>
          </Card>
          <Card className="p-6 sm:p-8">
            <p className="font-medium text-foreground">What I don't take on</p>
            <ul className="mt-4 divide-y divide-border">
              {exclusions.map((x) => (
                <li key={x} className="flex items-center gap-3 py-3 text-sm text-foreground">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive" aria-hidden="true">
                    <X className="h-3 w-3" />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </Card>
        </div>
        <p className="mt-5 max-w-[70ch] text-sm leading-relaxed text-muted-foreground">
          Covers the guidelines in the written diagnosis. Nobody outside Apple can promise approval.
        </p>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Questions" band>
        <Card className="divide-y divide-border px-6 sm:px-8">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
                {f.q}
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-2 max-w-[70ch] text-base leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </Card>
      </Section>

      {/* Intake */}
      <Section
        id="start"
        eyebrow="Free diagnosis"
        title={rescue ? "Paste the rejection. Get a diagnosis within one business day." : "Tell me about your app."}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="text-base leading-relaxed text-muted-foreground">
              No call, no discovery session. Send the link and where it's stuck. Paste the rejection if there is one.
            </p>
            <ul className="mt-6 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
              {trustPoints.slice(0, 3).map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl bg-muted p-5">
              <p className="text-sm font-medium text-foreground">Rather talk?</p>
              <p className="mt-1 text-sm text-muted-foreground">Free 15 minutes, no pitch.</p>
              <Button asChild variant="outline" className="mt-4 min-h-11 rounded-full px-5">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("appstore_book_call_click")}>
                  <CalendarDays className="mr-1 h-4 w-4" aria-hidden="true" /> Book a 15-minute call
                </a>
              </Button>
            </div>
          </div>
          <Card className="p-6 sm:p-8">
            <IntakeForm pkg={pkg} onPkgChange={setPkg} stage={stage} onStageChange={setStage} />
          </Card>
        </div>
      </Section>

      <div className="container pb-16">
        <p className="mx-auto max-w-[1120px] border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
          The App Store launch service is provided by Appfinity Labs LLC, Los Angeles, California. Not affiliated with or endorsed by Apple or Lovable. App Store is a service mark of Apple Inc.
        </p>
      </div>
    </>
  );
};

export default AppStoreLaunch;
