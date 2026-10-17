import { beforeEach, describe, expect, it } from "vitest";
import { trackChatGPTLead, trackChatGPTPageView } from "../chatgptAds";

const id = "12345678-1234-1234-1234-123456789abc";
describe("ChatGPT measurement", () => {
  beforeEach(() => { delete window.oaiq; sessionStorage.clear(); document.head.innerHTML = ""; });
  it("loads only on service routes, initializes once and queues route views", () => {
    trackChatGPTPageView("/");
    expect(window.oaiq).toBeUndefined();
    trackChatGPTPageView("/appstore/rescue");
    trackChatGPTPageView("/appstore/quote");
    expect(document.querySelectorAll('script[src="https://bzrcdn.openai.com/sdk/oaiq.min.js"]')).toHaveLength(1);
    expect(window.oaiq?.q).toEqual([
      ["init", { pixelId: "CZYANiWdnTx931NnEBHr3g" }],
      ["measure", "page_viewed", { type: "contents" }],
      ["measure", "page_viewed", { type: "contents" }],
    ]);
  });
  it("counts a saved record once and sends no lead contents", () => {
    trackChatGPTLead("form", id);
    trackChatGPTLead("form", id);
    trackChatGPTLead("chat", "person@example.com");
    expect(window.oaiq?.q?.slice(1)).toEqual([
      ["measure", "lead_created", { type: "customer_action" }, { event_id: `appstore-form-${id}` }],
    ]);
  });
});
