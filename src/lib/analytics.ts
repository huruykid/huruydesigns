// Google Analytics 4 via gtag.js, initialized once at app startup.
// GA4 measurement IDs are public, so hardcoding avoids the connector
// overriding the ID we want to report to.
const measurementId = "G-YD4149ZH3V";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function gtag(..._args: unknown[]) {
  // Browser-only: the SSR prerender bundle imports this module too.
  if (typeof window === "undefined") return;
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
