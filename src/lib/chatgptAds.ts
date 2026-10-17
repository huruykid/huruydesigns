/** Public Pixel ID for the huruy.tech conversion source in ChatGPT Ads Manager. */
const PIXEL_ID = "CZYANiWdnTx931NnEBHr3g";
type PixelQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window { oaiq?: PixelQueue }
}

function initPixel() {
  if (typeof window === "undefined") return;
  if (!window.oaiq) {
    const queue: PixelQueue = (...args) => { queue.q!.push(args); };
    queue.q = [];
    window.oaiq = queue;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
    document.head.appendChild(script);
    queue("init", { pixelId: PIXEL_ID });
  }
  return window.oaiq;
}

export function trackChatGPTPageView(path: string) {
  if (!/^\/(appstore|guides)(\/|$)/.test(path)) return;
  initPixel()?.("measure", "page_viewed", { type: "contents" });
}

/** Only opaque saved-record IDs leave the app; never contact details or transcripts. */
export function trackChatGPTLead(channel: "form" | "chat", leadId: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(leadId)) return;
  const pixel = initPixel();
  if (!pixel) return;
  const eventId = `appstore-${channel}-${leadId}`;
  // The stable event_id also lets the receiver deduplicate if storage is unavailable.
  try { if (sessionStorage.getItem(eventId)) return; } catch { /* optional storage */ }
  pixel("measure", "lead_created", { type: "customer_action" }, { event_id: eventId });
  try { sessionStorage.setItem(eventId, "1"); } catch { /* optional storage */ }
}
