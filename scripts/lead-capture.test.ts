import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("../supabase/functions/_shared/transactional-email-templates/send-email.ts", () => ({
  sendTemplateEmail: vi.fn().mockResolvedValue({ sent: false, reason: "recipient_suppressed" }),
}));
import { captureLead } from "../supabase/functions/appstore-chat/lead";

const id = "12345678-1234-1234-1234-123456789abc";
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe("chat lead capture confirmation", () => {
  it.each([
    { saved: true, shared: true, receipt: id },
    { saved: false, shared: true, receipt: null },
    { saved: true, shared: false, receipt: null },
  ])("returns $receipt when save=$saved and visitor contact=$shared", async ({ saved, shared, receipt }) => {
    vi.stubGlobal("Deno", { env: { get: () => "test-only" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({ choices: [{ message: { tool_calls: [{ function: { arguments: JSON.stringify({ email: "jane@example.com" }) } }] } }] }))
      .mockResolvedValueOnce(Response.json([]))
      .mockResolvedValueOnce(Response.json([{ id, email: "jane@example.com", notified: true }], { status: saved ? 200 : 500 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await captureLead(id, [{ role: "user", content: shared ? "Email jane@example.com" : "Help me launch my app" }])).toBe(receipt);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
