/**
 * Typed content for /appstore, the App Store launch service page. Kept out of the
 * component so prices, packages and the Beles timeline live in one place and the
 * page, its JSON-LD and its tests all read the same facts.
 */

import { projects } from "./projects";

export const BELES_APP_STORE_URL = "https://apps.apple.com/us/app/beles-tigrayan-dating/id6810825951";
export const EBT_FINDER_APP_STORE_URL = "https://apps.apple.com/app/ebt-finder/id6751323829";
/** Google Calendar booking page: 15-minute intro calls, Mon/Wed/Fri 12-1pm and Tue/Thu 6-7pm Pacific. */
export const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0PLAAK5cjS4Gu7ooPkMRlZ9eUpUHOS9gfoIRr1dRDPMMbyiKIZIhkhjgKbBE6GClPVkzC-D34k";

/**
 * EBT Finder proof for /appstore, derived from its case-study data in projects.ts so the
 * numbers, store frames and post-launch stories can't drift between the two pages.
 */
const ebt = projects.find((p) => p.id === "ebtfinder")?.shipped;
const ebtStat = (needle: RegExp) => ebt?.stats?.find((s) => needle.test(s.label));
const ebtStory = (needle: RegExp) => ebt?.postLaunch?.find((s) => needle.test(s.title));

/** Live version on the App Store, read from App Store Connect on 2026-10-14. */
export const EBT_FINDER_LIVE_VERSION = "1.0.4";

export const ebtProof = {
  stats: [ebtStat(/locations mapped/), ebtStat(/TestFlight builds/)].filter((s): s is NonNullable<typeof s> => Boolean(s)),
  stories: [ebtStory(/Apple rejected/), ebtStory(/TestFlight builds/)].filter((s): s is NonNullable<typeof s> => Boolean(s)),
  frames: (ebt?.storeFrames ?? []).slice(0, 4),
};

export interface ServicePackage {
  id: "check" | "rescue" | "launch" | "polish";
  name: string;
  price: string;
  /** Machine-readable price for JSON-LD. */
  priceValue: number;
  note?: string;
  payment: string;
  bestFor: string;
  includes: string[];
}

export const packages: ServicePackage[] = [
  {
    id: "rescue",
    name: "Rejection Rescue",
    price: "$750",
    priceValue: 750,
    payment: "$250 to start, $500 when Apple approves",
    bestFor: "Apple already rejected your app.",
    includes: [
      "Free diagnosis before you pay anything",
      "Fixes, in your code",
      "The reply to App Review",
      "Resubmissions until approved",
    ],
  },
  {
    id: "launch",
    name: "Launch",
    price: "$1,500",
    priceValue: 1500,
    note: "Founding price $995 for the first five clients",
    payment: "Half to start, half when Apple approves",
    bestFor: "Works on the web, never submitted.",
    includes: [
      "Native iOS build, no rewrite",
      "Tab bar, push, offline screen, haptics",
      "Sign in with Apple and account deletion where required",
      "App Store Connect, privacy labels, reviewer notes",
      "Listing copy and screenshots",
      "Submission and free resubmits",
    ],
  },
  {
    id: "polish",
    name: "Launch + Polish",
    price: "$2,500",
    priceValue: 2500,
    payment: "Half to start, half when Apple approves",
    bestFor: "Should look and earn like a real iPhone app.",
    includes: [
      "Everything in Launch",
      "UX pass against Apple's Human Interface Guidelines",
      "App Store keyword set",
      "In-app purchases through RevenueCat",
    ],
  },
];

/**
 * The low-commitment way in for apps that have never been submitted: a paid pre-submission
 * audit credited toward Launch. Rejected apps get a free diagnosis instead (see Rescue).
 */
export const readinessCheck: ServicePackage = {
  id: "check",
  name: "Readiness Check",
  price: "$250",
  priceValue: 250,
  payment: "Paid up front. Credited in full toward Launch if you book within 30 days.",
  bestFor: "Never submitted. You want to know what Apple will flag first.",
  includes: [
    "Review against 4.2, 4.8, 5.1.1, 2.1, 1.2 and 3.1.1",
    "Fix list, ranked by what Apple flags first",
    "Draft reviewer notes",
    "20-minute call within two business days",
  ],
};

/** Every package a visitor can pick on the intake form, entry option first. */
export const intakePackages = [readinessCheck, ...packages];

export const addOns = [
  { name: "Android", price: "+$400", detail: "Google Play build and listing from the same app." },
  { name: "Care plan", price: "$149/month", detail: "Your updates shipped, iOS and SDK upgrades, key renewals and review replies." },
];

/** The guidelines the service is scoped around, in the order Apple numbers them. */
export const guidelines = [
  { number: "1.2", name: "User-Generated Content", note: "Report, block and moderation before you ship" },
  { number: "2.1", name: "App Completeness", note: "Crashes, dead buttons, a reviewer who couldn't sign in" },
  { number: "2.3", name: "Accurate Metadata", note: "Screenshots and copy that match the build" },
  { number: "3.1.1", name: "In-App Purchase", note: "Digital goods sold through Apple, not a web checkout" },
  { number: "4.2", name: "Minimum Functionality", note: "The 'website in a frame' rejection" },
  { number: "4.3", name: "Spam", note: "What makes yours different, shown to the reviewer first" },
  { number: "4.8", name: "Login Services", note: "Sign in with Apple next to Google or social login" },
  { number: "5.1.1", name: "Data Collection and Storage", note: "Account deletion, purpose strings, privacy labels" },
];

export const stacks = ["Lovable", "Bolt", "v0", "Replit", "Cursor", "hand-built React"];

/** The four steps, written for the process cards. */
export const process = [
  {
    title: "Free diagnosis",
    body: "Send the link, or the rejection. Within one business day: the guideline, the fix, and a fixed price.",
  },
  {
    title: "Scoped access",
    body: "You grant only what the job needs. Never your Apple ID password.",
    levels: ["Rejection text only", "App Manager, one app", "Code access"],
  },
  {
    title: "Fix and reply",
    body: "Fixes land in your code. You read the reply to App Review before it goes out.",
  },
  {
    title: "Resubmit until approved",
    body: "I prepare the build; you press Release. Pushback is fixed at no charge. Balance due on approval.",
  },
];

export const trustPoints = [
  "No Apple ID password, ever",
  "App Manager access to one app, revoked at handover",
  "Your code and backend stay where they are",
  "Balance due only when Apple approves",
];

export const workingTerms = [
  { label: "Timelines", body: "Diagnosis within one business day. Apple's review takes as long as Apple takes, usually a day or two." },
  { label: "Working style", body: "Written updates by default. A 15-minute call when you want one." },
];

/** Work the service turns down, stated so prospects can self-select. */
export const exclusions = [
  "Hiding features from the reviewer",
  "Working around a terminated developer account",
  "Apps with nothing app-like to add",
  "Template and spam apps",
];

export const guarantee =
  "If Apple still won't approve the app after we've worked through its feedback, you never pay the second half. Cancel for a full refund any time before I start.";

export const problems = [
  {
    title: "Lovable builds web apps",
    body: "The App Store only takes signed native builds. Lovable's own docs say it publishes to the web, so the iPhone part is on you.",
  },
  {
    title: "Apple rejects websites in a wrapper",
    body: "Guideline 4.2 turns away apps that are just a website in a frame. Wrapping alone is how most AI-built apps get rejected.",
  },
  {
    title: "The last mile is all paperwork",
    body: "Certificates, App Store Connect, privacy labels, screenshot sizes, reviewer notes, version numbers. Each one can stall a launch for days.",
  },
];

/**
 * The screenshots on Beles's live App Store listing, in listing order (captured from
 * apps.apple.com, not mockups). `src` paths are registered in imageDimensions.
 */
export const belesScreens = [
  { src: "/images/beles/appstore/02-discover.webp", caption: "Discover", alt: "Beles Discover screen: a member profile with a compatibility score, Dating and Friends modes, and a Like button" },
  { src: "/images/beles/appstore/03-like-comment.webp", caption: "Like with a comment", alt: "Beles sheet for liking a photo with an optional comment before sending" },
  { src: "/images/beles/appstore/04-likes-you.webp", caption: "Likes you", alt: "Beles Likes screen showing a community vouch and the answer the other member liked" },
  { src: "/images/beles/appstore/05-chat.webp", caption: "Chat", alt: "Beles chat with match context, a vouch, and options to vouch, unmatch or report" },
  { src: "/images/beles/appstore/07-events.webp", caption: "Events", alt: "Beles Events screen listing a Tigray festival and a community fundraiser" },
];

/** Beles, from first iOS build to worldwide release. Dates are 2026. */
export const belesTimeline = [
  { date: "Sep 10", text: "Wrapped the Lovable project in a native iOS shell and uploaded the first three builds to App Store Connect." },
  { date: "Sep 11", text: "Added Sign in with Apple and rebuilt the Discover screen around native patterns." },
  { date: "Sep 12", text: "Built reporting, blocking and an admin panel. External TestFlight cleared Beta App Review, and version 1.0 went in for review as an iPhone app." },
  { date: "Sep 15", text: "Pulled a submission that carried a stale build and resubmitted a clean one." },
  { date: "Sep 20", text: "Released on the App Store in all 175 countries." },
];

export const belesLessons = [
  {
    title: "Sign-in broke inside the app, not on the web",
    body: "The first build called a web address that redirects. Browsers follow that quietly; the native app didn't, so sign-in failed. The fix was pointing the app at the final production host, shipped in build 2.",
  },
  {
    title: "A missing iPad screenshot can block submission",
    body: "App Store Connect won't submit a universal app without 13-inch iPad screenshots, and Beles had no iPad layout. Shipping it as iPhone-only was the honest fix, not stretched screenshots.",
  },
  {
    title: "Dating apps live under Apple's user-generated content rules",
    body: "Apple expects reporting, blocking and moderation in any app where people post content. I built an admin panel for reports, member suspension and events before submitting.",
  },
  {
    title: "Release closes the version",
    body: "Once 1.0 went live, App Store Connect rejected every further 1.0 build. Updates needed a new version number, so the next release went out as 1.0.1.",
  },
  {
    title: "Sign in with Apple needs native wiring",
    body: "The web flow doesn't carry over by itself; the iOS project has to register the native plugin. I caught it after launch and fixed it in the 1.0.1 update. On client apps I test it on a real device before submitting.",
  },
];

export const steps = [
  "Intake: you send the app link and where you're stuck. If Apple rejected it, I reply within one business day with a free diagnosis and a fixed price.",
  "Readiness audit against the guidelines that reject AI-built apps most: 4.2, 4.8, 5.1.1 and 2.1.",
  "Native build of your app with the features Apple looks for, tested on a real iPhone through TestFlight.",
  "Listing: copy, screenshots, privacy labels and notes for the App Review team.",
  "Submission. If Apple pushes back, I fix it and resubmit. You pay the balance when it's approved.",
];

export const requirements = [
  "An Apple Developer Program membership in your name or your company's ($99 a year). Company accounts need a D-U-N-S number, which can take days to weeks, so start it first.",
  "An App Store Connect invite for me with the App Manager role. Never your Apple ID password.",
  "Access to your code (GitHub or a Lovable export) and your backend.",
  "Your app name, icon, privacy policy link, support link, and a demo login for Apple's reviewer.",
];

export const faqs = [
  {
    q: "Do I need a Mac?",
    a: "No. I build and submit the iOS app. You only need an Apple Developer account.",
  },
  {
    q: "Can you guarantee Apple approves it?",
    a: "No one can promise Apple's decision. What I can promise: if Apple rejects it, I fix it and resubmit at no charge, and you don't pay the second half until it's approved. If your app has nothing app-like to add, I'll tell you at intake instead of taking your money.",
  },
  {
    q: "What if you can't take my app, or Apple never approves it?",
    a: "If your app isn't a fit, I tell you at intake and you pay nothing; I only take a deposit after we've agreed on scope. You can cancel for a full refund any time before I start work. Once I've started, the deposit covers the work done, and if Apple still won't approve the app after we've worked through its feedback, you never pay the second half.",
  },
  {
    q: "Is the rejection diagnosis really free?",
    a: "Yes. Send your app link and paste Apple's rejection message. Within one business day I'll tell you what the rejection means, what the fix involves, and the fixed price to do it. No payment details, no obligation.",
  },
  {
    q: "Can I start smaller?",
    a: "If your app has never been submitted, the $250 Readiness Check reviews it against the guidelines Apple rejects AI-built apps for, with a ranked fix list, draft reviewer notes and a short call. Fix it yourself, or book Launch within 30 days and the $250 comes off the price.",
  },
  {
    q: "Do I have to rebuild my app?",
    a: "No. Your iOS app is built from the code you already have. Your backend, including Lovable Cloud, stays where it is.",
  },
  {
    q: "Can I keep building in Lovable?",
    a: "Yes. Your Lovable project stays the source of truth. Getting later changes onto the iPhone means a new build and review, which the care plan covers.",
  },
  {
    q: "How long does it take?",
    a: "Usually one to two weeks, and most of that is waiting on your Apple account and Apple's review. Apple reviews most submissions within two days.",
  },
  {
    q: "What if my app wasn't built in Lovable?",
    a: "Apps from Bolt, v0, Replit, Cursor or a hand-built React site work the same way. If it runs as a web app, it can usually become an iOS app.",
  },
  {
    q: "Who is doing the work?",
    a: "I am, personally. I'm a senior UX designer, and I research, design, build and ship my own apps. Two of them, Beles and EBT Finder, are live on the App Store.",
  },
];

export type IntakeStatus = "not-submitted" | "rejected" | "testflight" | "not-started";

export const intakeStatuses: { value: IntakeStatus; label: string }[] = [
  { value: "not-submitted", label: "Built, never submitted to Apple" },
  { value: "rejected", label: "Rejected by Apple" },
  { value: "testflight", label: "In TestFlight, stuck before release" },
  { value: "not-started", label: "Still building it" },
];

export const accountStatuses = [
  "I have an Apple Developer account",
  "I've started enrolling",
  "Not yet",
];
