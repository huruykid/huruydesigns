import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RescueChat from "../RescueChat";
import { RESCUE_CHAT_STARTERS } from "@/lib/chat";

/** Events analytics queued for gtag.js (it pushes `arguments` objects onto dataLayer). */
const queued = (name: string) =>
  (window.dataLayer ?? [])
    .map((a) => Array.from(a as ArrayLike<unknown>))
    .filter((a) => a[0] === "event" && a[1] === name)
    .map((a) => a[2] as Record<string, unknown>);

/** An SSE body in the OpenAI delta format the edge function streams through. */
function sse(chunks: string[]) {
  const enc = new TextEncoder();
  const lines = [...chunks.map((c) => `data: ${JSON.stringify({ choices: [{ delta: { content: c } }] })}\n`), "data: [DONE]\n"];
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const l of lines) controller.enqueue(enc.encode(l));
      controller.close();
    },
  });
}

const renderChat = () => render(<MemoryRouter><RescueChat /></MemoryRouter>);

describe("RescueChat", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens on a prompt to paste the rejection, with starter questions and a large composer", () => {
    renderChat();
    expect(screen.getByRole("heading", { name: "What did Apple say?" })).toBeInTheDocument();
    for (const q of RESCUE_CHAT_STARTERS) expect(screen.getByRole("button", { name: q })).toBeInTheDocument();
    const box = screen.getByLabelText("Your message");
    expect(box.tagName).toBe("TEXTAREA");
    expect(box).toHaveAttribute("placeholder", "Paste Apple's rejection message here...");
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });

  it("streams a diagnosis from the appstore-chat function and renders its markdown", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(sse(["That's **4.2**. ", "Read [pricing](#pricing)."]), { status: 200 }),
    );
    renderChat();
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Guideline 4.2 - Design - Minimum Functionality" } });
    fireEvent.keyDown(screen.getByLabelText("Your message"), { key: "Enter" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toMatch(/\/functions\/v1\/appstore-chat$/);
    expect(JSON.parse(String(init?.body))).toEqual({ messages: [{ role: "user", content: "Guideline 4.2 - Design - Minimum Functionality" }] });

    expect(await screen.findByText("Guideline 4.2 - Design - Minimum Functionality")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("4.2")).toBeInTheDocument());
    expect(screen.getByText("4.2").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "pricing" })).toHaveAttribute("href", "#pricing");
    expect(queued("appstore_chat")).toEqual([expect.objectContaining({ turn: 1, source: "typed" })]);
    expect(screen.getByLabelText("Your message")).toHaveValue("");
  });

  it("shows the function's error message and lets the visitor try again", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "A lot of people are asking right now." }), { status: 429 }),
    );
    renderChat();
    fireEvent.click(screen.getByRole("button", { name: RESCUE_CHAT_STARTERS[0] }));
    expect(await screen.findByText("A lot of people are asking right now.")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText("Your message")).toBeEnabled());
    expect(queued("appstore_chat")).toEqual([expect.objectContaining({ turn: 1, source: "starter" })]);
  });
});
