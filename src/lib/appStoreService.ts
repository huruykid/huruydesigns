/**
 * Typed content for /appstore, the App Store launch service page. Kept out of the
 * component so prices, packages and the Beles timeline live in one place and the
 * page, its JSON-LD and its tests all read the same facts.
 */

export const BELES_APP_STORE_URL = "https://apps.apple.com/us/app/beles-tigrayan-dating/id6810825951";
export const EBT_FINDER_APP_STORE_URL = "https://apps.apple.com/app/ebt-finder/id6751323829";

export interface ServicePackage {
  id: "rescue" | "launch" | "polish";
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
      "Diagnosis of the rejection (4.2, 4.8, 5.1.1, 2.1 and others)",
      "The fixes, in your code",
      "A reply to App Review that answers what they asked",
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
    bestFor: "Your app works on the web and has never been submitted.",
    includes: [
      "Native iOS build of your existing app, no rewrite",
      "The native features Apple looks for: tab bar, push, offline screen, haptics",
      "Sign in with Apple and in-app account deletion where Apple requires them",
      "App Store Connect setup, privacy labels and reviewer notes",
      "Listing copy and screenshots for every required size",
      "Submission and free resubmits until approved",
    ],
  },
  {
    id: "polish",
    name: "Launch + Polish",
    price: "$2,500",
    priceValue: 2500,
    payment: "Half to start, half when Apple approves",
    bestFor: "You want it to look and earn like a real iPhone app.",
    includes: [
      "Everything in Launch",
      "A UX pass on your key screens against Apple's Human Interface Guidelines",
      "App Store keyword set for search",
      "In-app purchases through RevenueCat if you sell digital goods",
    ],
  },
];

export const addOns = [
  { name: "Android", price: "+$400", detail: "Google Play build and listing from the same app." },
  { name: "Care plan", price: "$149/month", detail: "Your updates shipped, iOS and SDK upgrades, key renewals and review replies." },
];

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
  "Intake: you send the app link and where you're stuck. I reply within one business day with a yes, a no, or questions.",
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
