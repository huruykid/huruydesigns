// Google Analytics 4 via gtag.js, initialized once at app startup.
const measurementId = import.meta.env
  .VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let initialized = false;

function gtag(...args: unknown[]) {
  window.dataLayer?.push(args);
}

export function initAnalytics() {
  if (!measurementId || initialized) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  gtag("js", new Date());
  // SPA: disable automatic page views; we send them on route changes.
  gtag("config", measurementId, { send_page_view: false });
}

export function trackPageView(path: string) {
  if (!measurementId) return;
  gtag("event", "page_view", { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!measurementId) return;
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
