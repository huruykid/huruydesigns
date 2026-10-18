import { describe, expect, it } from "vitest";
import { withLeadReceipt } from "../supabase/functions/appstore-chat/stream";

const id = "12345678-1234-1234-1234-123456789abc";
const upstream = () => new ReadableStream<Uint8Array>({ start(controller) {
  for (const text of ['data: {"choices":[{"delta":{"content":"Hi"}}]}\n\n', 'data: [DO', 'NE]\r\n\r\n']) {
    controller.enqueue(new TextEncoder().encode(text));
  }
  controller.close();
} });

describe("saved lead stream receipt", () => {
  it("keeps reply deltas streaming and emits a receipt before a single DONE", async () => {
    let save!: (value: string) => void;
    const pending = new Promise<string>((resolve) => { save = resolve; });
    const reader = withLeadReceipt(upstream(), pending).getReader();
    const first = await reader.read();
    expect(new TextDecoder().decode(first.value)).toContain('"content":"Hi"');
    save(id);
    let rest = "";
    while (true) { const next = await reader.read(); if (next.done) break; rest += new TextDecoder().decode(next.value); }
    expect(rest).toContain(`data: {"lead_saved":"${id}"}`);
    expect(rest.match(/\[DONE\]/g)).toHaveLength(1);
    expect(rest.indexOf("lead_saved")).toBeLessThan(rest.indexOf("[DONE]"));
  });
  it("adds an emailed receipt only when the lead email was sent", async () => {
    const sent = await new Response(withLeadReceipt(upstream(), Promise.resolve({ id, emailed: true }))).text();
    expect(sent).toContain(`data: {"lead_emailed":"${id}"}`);
    const notSent = await new Response(withLeadReceipt(upstream(), Promise.resolve({ id, emailed: false }))).text();
    expect(notSent).toContain("lead_saved");
    expect(notSent).not.toContain("lead_emailed");
  });
  it("does not acknowledge a lead without a saved contact", async () => {
    const result = Promise.resolve(null);
    const text = await new Response(withLeadReceipt(upstream(), result)).text();
    expect(text).not.toContain("lead_saved");
    expect(text).toContain("[DONE]");
  });
  it("finishes the reply when saving fails", async () => {
    const text = await new Response(withLeadReceipt(upstream(), Promise.reject(new Error("database unavailable")))).text();
    expect(text).not.toContain("lead_saved");
    expect(text).toContain("[DONE]");
  });
});
