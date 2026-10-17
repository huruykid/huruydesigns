// Google Analytics 4 via gtag.js, initialized once at app startup.
// GA4 measurement IDs are public, so hardcoding avoids the connector
// overriding the ID we want to report to.
const measurementId = "G-YD4149ZH3V";
/** Google Ads account tag; conversions for the App Store service are reported to it. */
const adsId = "AW-11554603785";
/** Google Ads conversion action "App Store diagnosis request" (Submit lead form). */
export const APPSTORE_LEAD_CONVERSION = `${adsId}/Ig_zCOTzxZ0dEImG1YUr`;

/** OpenAI Ads measurement pixel (data source "huruy.tech"); measures ChatGPT ad leads. */
export const OPENAI_PIXEL_ID = "CZYANiWdnTx931NnEBHr3g";
const OPENAI_PIXEL_SRC = "https://bzrcdn.openai.com/sdk/oaiq.min.js";

type Oaiq = ((...args: unknown[]) => void) & { q?: unknown[] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    oaiq?: Oaiq;
  }
}

/**
 * Queues the OpenAI pixel and loads it right away (async), not on idle: the SDK reads
 * the ad click reference (`oppref`) from the landing URL, which an SPA can change
 * before an idle callback runs.
 */
function loadOpenAiPixel() {
  if (window.oaiq) return;
  // Same queue shape as OpenAI's loader snippet: it stores the arguments object.
  const q: Oaiq = function () {
    // eslint-disable-next-line prefer-rest-params
    q.q!.push(arguments);
  };
  q.q = [];
  window.oaiq = q;
  q("init", { pixelId: OPENAI_PIXEL_ID });
  const script = document.createElement("script");
  script.async = true;
  script.src = OPENAI_PIXEL_SRC;
  document.head.appendChild(script);
}

function gtag(..._args: unknown[]) {
  // Browser-only: the SSR prerender bundle imports this module too.
  if (typeof window === "undefined") return;
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer!.push(arguments);
}

if (typeof window !== "undefined") {
  // The queue must exist before any event fires, so route-change page views
  // and the landing-page view sent from App.tsx on mount land in the queue and
  // get replayed when gtag.js loads. "js" and "config" are pushed here too so
  // they sit ahead of everything queued later.
  window.dataLayer = window.dataLayer || [];
  gtag("js", new Date());
  // SPA: disable automatic page views; we send them on route changes.
  gtag("config", measurementId, { send_page_view: false });
  // The same gtag.js serves Google Ads; this config lets conversion events reach it.
  gtag("config", adsId);
  loadOpenAiPixel();
}

let scriptInjected = false;

export function initAnalytics() {
  if (scriptInjected) return;
  scriptInjected = true;

  // Inject the script lazily; the queue above is already live.
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function trackPageView(path: string) {
  gtag("event", "page_view", { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  gtag("event", name, params);
}

/** Reports a Google Ads conversion. Safe to call anywhere; it queues until gtag.js loads. */
export function trackConversion(sendTo: string, params?: Record<string, unknown>) {
  gtag("event", "conversion", { send_to: sendTo, ...params });
}

/**
 * Reports a lead to OpenAI Ads (standard event `lead_created`). `eventId` deduplicates
 * repeats of the same lead, so pass something stable such as the chat conversation id.
 */
export function trackOpenAiLead(eventId: string) {
  if (typeof window === "undefined" || !window.oaiq) return;
  window.oaiq("measure", "lead_created", { type: "customer_action" }, { event_id: eventId });
}

/**
 * Appends UTM parameters and Apple's campaign token (ct) to an App Store URL
 * so installs can be attributed to the CTA placement that drove them.
 */
export function getAppStoreUrl(baseUrl: string, placement: string): string {
  const url = new URL(baseUrl);
  url.searchParams.set("utm_source", "portfolio");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_campaign", "ios_installs");
  url.searchParams.set("utm_content", placement);
  url.searchParams.set("ct", `portfolio-${placement}`);
  return url.toString();
}

export function trackAppStoreClick(placement: string) {
  trackEvent("app_store_click", { placement });
}
