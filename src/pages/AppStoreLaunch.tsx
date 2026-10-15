import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Check, Copy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SEO from "@/components/SEO";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import { NumberedList, StatRow, Wide } from "@/components/case-study/primitives";
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
  belesLessons,
  belesScreens,
  belesTimeline,
  ebtProof,
  faqs,
  intakePackages,
  intakeStatuses,
  packages,
  readinessCheck,
  problems,
  requirements,
  steps,
} from "@/lib/appStoreService";

const PATH = "/appstore";
const RESCUE_PATH = "/appstore/rescue";
const HERO_IMAGE = "/images/beles/appstore/02-discover.webp";
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
  "mt-1.5 flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm";

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
      <div role="status" className="rounded-xl border border-accent/30 bg-accent/5 p-6">
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
          <Input id="intake-name" name="name" autoComplete="name" required maxLength={120} className="mt-1.5 h-11" />
        </div>
        <div>
          <Label htmlFor="intake-email">Email</Label>
          <Input id="intake-email" name="email" type="email" autoComplete="email" required maxLength={254} className="mt-1.5 h-11" />
        </div>
      </div>
      <div>
        <Label htmlFor="intake-url">Link to your app</Label>
        <Input id="intake-url" name="appUrl" type="url" inputMode="url" placeholder="https://yourapp.lovable.app" required maxLength={500} className="mt-1.5 h-11" />
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
        <Label htmlFor="intake-details">Anything else</Label>
        <Textarea
          id="intake-details"
          name="details"
          rows={4}
          maxLength={2000}
          placeholder="If Apple rejected it, paste the guideline and message here."
          className="mt-1.5"
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
      <p className="text-xs text-muted-foreground">I reply within one business day. Your details are used only to answer you.</p>
      {state === "failed" && draft && (
        <div role="alert" className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
          <p className="mb-3">
            {error && !/request failed|failed to fetch/i.test(error) ? `${error} ` : "That didn't go through. "}
            You can send the same message by email instead.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="outline" size="sm" className="min-h-11">
              <a href={`mailto:${person.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`}>
                Open in email
              </a>
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={copyDraft} className="min-h-11">
              {copied ? <Check className="mr-1 h-4 w-4" aria-hidden="true" /> : <Copy className="mr-1 h-4 w-4" aria-hidden="true" />}
              {copied ? "Copied" : `Copy message for ${person.email}`}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

const AppStoreLaunch = ({ variant = "launch" }: { variant?: AppStoreVariant }) => {
  const rescue = variant === "rescue";
  const [pkg, setPkg] = useState<PackageId | "">(rescue ? "rescue" : "");
  const [stage, setStage] = useState<IntakeStatus | "">(rescue ? "rejected" : "");
  const choose = (id: PackageId) => {
    setPkg(id);
    if (id === "rescue") setStage("rejected");
    trackEvent("appstore_package_click", { package: id });
  };

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
    <div className="container cs-flow pt-16 sm:pt-24 lg:pt-28">
      <section
        className="cs-wide mb-16 grid items-center gap-12 lg:mb-24 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]"
        aria-labelledby="appstore-heading"
      >
        {rescue ? (
          <div className="max-w-[40rem]">
            <p className="mb-4 text-sm font-medium text-accent">App Store rejection rescue</p>
            <h1 id="appstore-heading" className="mb-6 text-4xl font-light leading-tight tracking-normal sm:text-5xl">
              Rejected by App Review? Paste the message. The diagnosis is free.
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-foreground">
              Within one business day I tell you what the rejection means, what the fix involves, and the fixed price. Rejection Rescue is $750: $250 to start, $500 only when Apple approves, and free resubmissions until it's live.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Guidelines 4.2, 4.8, 5.1.1, 2.1, 1.2 and 3.1.1 · Two of my own Lovable-built apps live on the App Store · Los Angeles, working worldwide
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="min-h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90">
                <a href="#start" onClick={() => choose("rescue")}>Get a free diagnosis</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-11 rounded-full px-6">
                <a href="#pricing">See the packages</a>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Never submitted yet?{" "}
              <Link to={PATH} className="font-medium text-accent underline underline-offset-4">
                Start with the launch service
              </Link>
            </p>
          </div>
        ) : (
          <div className="max-w-[40rem]">
            <p className="mb-4 text-sm font-medium text-accent">Lovable to the App Store</p>
            <h1 id="appstore-heading" className="mb-6 text-4xl font-light leading-tight tracking-normal sm:text-5xl">
              Get your Lovable app approved on the App Store
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-foreground">
              I turn AI-built web apps into native iPhone apps that pass Apple review and feel like they belong on the phone. You keep your code and your backend, and you pay the balance only when Apple approves.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Senior UX designer · Two of my own apps live on the App Store · Los Angeles, working worldwide
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="min-h-11 rounded-full px-6">
                <a href="#start">Tell me about your app</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-11 rounded-full px-6">
                <a href="#beles">See how Beles shipped</a>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Rejected by Apple?{" "}
              <a href="#start" onClick={() => choose("rescue")} className="font-medium text-accent underline underline-offset-4">
                Paste the message for a free diagnosis
              </a>
            </p>
          </div>
        )}
        <figure className="hidden lg:block">
          <img
            src={HERO_IMAGE}
            width={imageDimensions[HERO_IMAGE]?.width}
            height={imageDimensions[HERO_IMAGE]?.height}
            alt="Beles Discover screen on iPhone: a member profile with a compatibility score, Dating and Friends modes, and a native tab bar"
            className="mx-auto h-auto w-full max-w-[290px] rounded-[2.25rem] border-[6px] border-[#0d0d12] shadow-xl"
          />
          <figcaption className="mt-4 text-center text-xs text-muted-foreground">Beles, built in Lovable. Screenshot from its App Store listing.</figcaption>
        </figure>
      </section>

      <section className="cs-wide mb-16 lg:mb-24" aria-labelledby="problem-heading">
        <h2 id="problem-heading" className="mb-8 text-2xl font-medium tracking-normal sm:text-3xl">Why AI-built apps get stuck</h2>
        <div className="grid gap-x-8 gap-y-8 md:grid-cols-3">
          {problems.map((p) => (
            <div key={p.title} className="border-t border-border pt-4">
              <h3 className="mb-2 text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="cs-wide mb-16 scroll-mt-24 lg:mb-24" aria-labelledby="pricing-heading">
        <h2 id="pricing-heading" className="mb-3 text-2xl font-medium tracking-normal sm:text-3xl">Packages</h2>
        <p className="mb-10 max-w-[60ch] text-base leading-relaxed text-muted-foreground">
          Fixed prices. Free resubmissions. The second payment is due only when Apple approves your app. Rejected already? The diagnosis is free.
        </p>
        <ul className="grid list-none gap-x-8 gap-y-12 lg:grid-cols-3">
          {packages.map((p) => (
            <li
              key={p.id}
              aria-labelledby={`pkg-${p.id}`}
              className={`flex flex-col border-t pt-5 ${p.id === "launch" ? "border-t-2 border-accent" : "border-border"}`}
            >
              <h3 id={`pkg-${p.id}`} className="mb-1 text-lg font-semibold text-foreground">{p.name}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{p.bestFor}</p>
              <p className="text-3xl font-bold leading-none tracking-tight text-foreground font-display">{p.price}</p>
              {p.note && <p className="mt-2 text-sm font-medium text-accent">{p.note}</p>}
              <p className="mb-5 mt-2 text-sm text-muted-foreground">{p.payment}</p>
              <ul className="mb-6 space-y-2.5 text-sm leading-relaxed text-foreground">
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant={p.id === "launch" ? "default" : "outline"} className="mt-auto min-h-11 w-full rounded-full sm:w-auto sm:self-start">
                <a href="#start" onClick={() => choose(p.id)}>
                  {p.id === "rescue" ? "Get a free diagnosis" : `Start ${p.name}`}
                </a>
              </Button>
            </li>
          ))}
        </ul>
        <div
          id="readiness-check"
          role="group"
          aria-labelledby="pkg-check"
          className="mt-12 grid gap-6 rounded-xl border border-border p-6 sm:p-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-10"
        >
          <div className="flex flex-col">
            <p className="mb-2 text-sm font-medium text-accent">Never submitted? Start here</p>
            <h3 id="pkg-check" className="mb-1 text-lg font-semibold text-foreground">{readinessCheck.name}</h3>
            <p className="mb-3 text-sm text-muted-foreground">{readinessCheck.bestFor}</p>
            <p className="text-3xl font-bold leading-none tracking-tight text-foreground font-display">{readinessCheck.price}</p>
            <p className="mb-5 mt-2 text-sm text-muted-foreground">{readinessCheck.payment}</p>
            <Button asChild variant="outline" className="mt-auto min-h-11 w-full rounded-full sm:w-auto sm:self-start">
              <a href="#start" onClick={() => choose(readinessCheck.id)}>Book a Readiness Check</a>
            </Button>
          </div>
          <div>
            <ul className="space-y-2.5 text-sm leading-relaxed text-foreground">
              {readinessCheck.includes.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              Book Launch within 30 days and the $250 comes off the price. Already rejected? Skip this: the diagnosis is free.
            </p>
          </div>
        </div>
        <dl className="mt-12 grid gap-x-8 gap-y-4 border-t border-border pt-6 sm:grid-cols-2">
          {addOns.map((a) => (
            <div key={a.name}>
              <dt className="text-sm font-semibold text-foreground">
                {a.name} <span className="font-normal text-muted-foreground">· {a.price}</span>
              </dt>
              <dd className="mt-1 text-sm text-muted-foreground">{a.detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>

    <div className="container pb-4">
      <CaseStudySection id="beles" label="Proof" title="Beles: a Lovable project, live in 175 countries ten days after its first iOS build">
        <p className="mb-8">
          Beles is a dating and community app for the Tigrayan diaspora that I researched, designed and built solo in Lovable. This is how it went from a web app to the App Store, including what broke along the way.
        </p>
        <Wide>
          <StatRow
            columns={3}
            stats={[
              { value: "10 days", label: "First iOS build to worldwide release" },
              { value: "175", label: "Countries at launch" },
              { value: "1 person", label: "Research, design, build and release" },
            ]}
          />
        </Wide>

        <Wide>
          <h3 className="mb-4 mt-12 text-lg font-bold tracking-tight text-foreground font-display">As shipped, from the App Store listing</h3>
          <ul
            aria-label="Beles App Store screenshots"
            className="-mb-2 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible"
          >
            {belesScreens.map((s) => (
              <li key={s.src} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto">
                <figure>
                  <img
                    src={s.src}
                    width={imageDimensions[s.src]?.width}
                    height={imageDimensions[s.src]?.height}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full rounded-2xl border border-border"
                  />
                  <figcaption className="mt-2 text-sm font-medium text-foreground">{s.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Wide>

        <h3 className="mb-4 mt-12 text-lg font-bold tracking-tight text-foreground font-display">Timeline, September 2026</h3>
        <ol className="list-none border-t border-border divide-y divide-border">
          {belesTimeline.map((t) => (
            <li key={t.date} className="grid gap-1 py-4 sm:grid-cols-[5.5rem_1fr] sm:gap-4">
              <span className="text-sm font-semibold tabular-nums text-accent">{t.date}</span>
              <p className="max-w-[64ch]">{t.text}</p>
            </li>
          ))}
        </ol>

        <h3 className="mb-4 mt-12 text-lg font-bold tracking-tight text-foreground font-display">What broke, and what I do differently now</h3>
        <ol className="list-none border-t border-border divide-y divide-border">
          {belesLessons.map((l, i) => (
            <li key={l.title} className="grid gap-2 py-6 sm:grid-cols-[3.5rem_1fr]">
              <span className="text-sm font-semibold tabular-nums text-accent" aria-hidden="true">0{i + 1}</span>
              <div className="min-w-0">
                <h4 className="mb-1.5 font-semibold text-foreground">{l.title}</h4>
                <p className="max-w-[64ch]">{l.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <AppStoreBadgeLink href={BELES_APP_STORE_URL} appName="Beles" onClick={() => trackEvent("appstore_proof_click", { app: "beles" })} />
          <Button asChild size="lg" variant="outline" className="min-h-11 rounded-full px-6">
            <Link to="/project/beles">Read the design case study</Link>
          </Button>
        </div>
      </CaseStudySection>

      <CaseStudySection
        id="ebt-finder"
        label="Proof"
        title="EBT Finder: an App Review rejection fixed without a new build"
      >
        <p className="mb-8">
          EBT Finder helps SNAP households find stores that take EBT. I researched, designed, built and shipped it solo, and version {EBT_FINDER_LIVE_VERSION} is live on the App Store. It's where I learned the release discipline I now bring to client apps.
        </p>
        <Wide>
          <StatRow
            columns={3}
            stats={[
              ...ebtProof.stats.map((s) => ({ value: s.value, label: s.label })),
              { value: EBT_FINDER_LIVE_VERSION, label: "Version live on the App Store" },
            ]}
          />
        </Wide>

        {ebtProof.frames.length > 0 && (
          <Wide>
            <h3 className="mb-4 mt-12 text-lg font-bold tracking-tight text-foreground font-display">The App Store listing I designed</h3>
            <ul
              aria-label="EBT Finder App Store screenshots"
              className="-mb-2 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible"
            >
              {ebtProof.frames.map((f) => (
                <li key={f.src} className="w-[44%] shrink-0 snap-start sm:w-[30%] md:w-auto">
                  <img
                    src={f.src}
                    width={imageDimensions[f.src]?.width}
                    height={imageDimensions[f.src]?.height}
                    alt={f.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full rounded-2xl border border-border"
                  />
                </li>
              ))}
            </ul>
          </Wide>
        )}

        <h3 className="mb-4 mt-12 text-lg font-bold tracking-tight text-foreground font-display">Two release problems, and what they changed</h3>
        <ol className="list-none border-t border-border divide-y divide-border">
          {ebtProof.stories.map((st, i) => (
            <li key={st.title} className="grid gap-2 py-6 sm:grid-cols-[3.5rem_1fr]">
              <span className="text-sm font-semibold tabular-nums text-accent" aria-hidden="true">0{i + 1}</span>
              <div className="min-w-0">
                <h4 className="mb-1.5 font-semibold text-foreground">{st.title}</h4>
                <p className="mb-2 max-w-[64ch]">{st.problem}</p>
                <p className="max-w-[64ch]">
                  <span className="font-semibold text-foreground">Fix:</span> {st.fix}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <AppStoreBadgeLink href={EBT_FINDER_APP_STORE_URL} appName="EBT Finder" onClick={() => trackEvent("appstore_proof_click", { app: "ebtfinder" })} />
          <Button asChild size="lg" variant="outline" className="min-h-11 rounded-full px-6">
            <Link to="/project/ebtfinder">Read the EBT Finder case study</Link>
          </Button>
        </div>
      </CaseStudySection>
    </div>

    <div className="container cs-flow">
      <section className="mb-16 lg:mb-24" aria-labelledby="process-heading">
        <h2 id="process-heading" className="mb-6 text-2xl font-medium tracking-normal sm:text-3xl">How it works</h2>
        <NumberedList items={steps} />
      </section>

      <section className="mb-16 lg:mb-24" aria-labelledby="needs-heading">
        <h2 id="needs-heading" className="mb-6 text-2xl font-medium tracking-normal sm:text-3xl">What I need from you</h2>
        <ul className="list-disc space-y-4 pl-5 text-base leading-relaxed marker:text-accent">
          {requirements.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="mb-16 lg:mb-24" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="mb-6 text-2xl font-medium tracking-normal sm:text-3xl">Questions</h2>
        <div className="border-t border-border divide-y divide-border">
          {faqs.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
                {f.q}
                <span className="text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-2 max-w-[64ch] text-base leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="start" className="mb-16 scroll-mt-24 border-t border-border pt-8 lg:mb-24" aria-labelledby="start-heading">
        <h2 id="start-heading" className="mb-3 text-2xl font-medium tracking-normal sm:text-3xl">Tell me about your app</h2>
        <p className="mb-6 text-base leading-relaxed text-muted-foreground">
          Send the link and where it's stuck. If Apple rejected it, paste their message: the diagnosis is free. Within one business day I'll tell you what's wrong, whether I can get it approved, and the fixed price.
        </p>
        <div className="mb-10 flex flex-col gap-3 rounded-xl border border-border p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-foreground">
            <span className="font-semibold">Rather talk it through?</span>{" "}
            <span className="text-muted-foreground">Book a free 15-minute video call.</span>
          </p>
          <Button asChild variant="outline" className="min-h-11 shrink-0 rounded-full px-5">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("appstore_book_call_click")}>
              <CalendarDays className="mr-1 h-4 w-4" aria-hidden="true" /> Book a 15-minute call
            </a>
          </Button>
        </div>
        <IntakeForm pkg={pkg} onPkgChange={setPkg} stage={stage} onStageChange={setStage} />
      </section>

      <p className="mb-16 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground lg:mb-24">
        The App Store launch service is provided by Appfinity Labs LLC, Los Angeles, California. Not affiliated with or endorsed by Apple or Lovable. App Store is a service mark of Apple Inc.
      </p>
    </div>
  </>
  );
};

export default AppStoreLaunch;
