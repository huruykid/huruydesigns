// Google Analytics 4 via gtag.js, initialized once at app startup.
// GA4 measurement IDs are public, so hardcoding avoids the connector
// overriding the ID we want to report to.
const measurementId = "G-YD4149ZH3V";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Queue must exist before any event fires, so route-change page views and
// the landing-page view sent from App.tsx on mount land in the queue and
// get replayed when gtag.js loads. "js" and "config" are pushed here too so
// they sit ahead of everything queued later.
window.dataLayer = window.dataLayer || [];

function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer!.push(arguments);
}

gtag("js", new Date());
// SPA: disable automatic page views; we send them on route changes.
gtag("config", measurementId, { send_page_view: false });

export function initAnalytics() {
  // Inject the script lazily; the queue above is already live.
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}
