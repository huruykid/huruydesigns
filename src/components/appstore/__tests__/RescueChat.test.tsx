import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RescueChat from "../RescueChat";
import { chatGreeting, chatStarters } from "@/lib/appStoreService";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

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
const body = (init?: RequestInit) => JSON.parse(String(init?.body)) as { conversation_id?: string; messages: unknown[] };

describe("RescueChat", () => {
  beforeEach(() => {
    window.dataLayer = [];
    sessionStorage.clear();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens by asking what's going on, with starters and a large composer", () => {
    renderChat();
    expect(screen.getByText(chatGreeting)).toBeInTheDocument();
    for (const q of chatStarters) expect(screen.getByRole("button", { name: q })).toBeInTheDocument();
    const box = screen.getByLabelText("Your message");
    expect(box.tagName).toBe("TEXTAREA");
    expect(box).toHaveAttribute("placeholder", "Tell me what's going on, or paste Apple's message...");
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Start over" })).not.toBeInTheDocument();
  });

  it("streams a reply from appstore-chat with a conversation id and renders its markdown", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(sse(["That's **4.2**. ", "See [pricing](#pricing)."]), { status: 200 }),
    );
    renderChat();
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Guideline 4.2 - Design - Minimum Functionality" } });
    fireEvent.keyDown(screen.getByLabelText("Your message"), { key: "Enter" });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toMatch(/\/functions\/v1\/appstore-chat$/);
    const sent = body(init);
    expect(sent.conversation_id).toMatch(UUID);
    expect(sent.messages).toEqual([{ role: "user", content: "Guideline 4.2 - Design - Minimum Functionality" }]);

    expect(await screen.findByText("Guideline 4.2 - Design - Minimum Functionality")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText("4.2")).toBeInTheDocument());
    expect(screen.getByText("4.2").tagName).toBe("STRONG");
    expect(screen.getByRole("link", { name: "pricing" })).toHaveAttribute("href", "#pricing");
    expect(queued("appstore_chat")).toEqual([expect.objectContaining({ turn: 1, source: "typed" })]);
    expect(screen.getByLabelText("Your message")).toHaveValue("");
    expect(screen.getByLabelText("Your message")).toHaveAttribute("placeholder", "Reply...");
  });

  it("keeps the conversation and its id across a remount, and Start over begins a new one", async () => {
    // A fresh Response per call: a body stream can only be read once.
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(() => Promise.resolve(new Response(sse(["Got it."]), { status: 200 })));
    const first = renderChat();
    fireEvent.click(screen.getByRole("button", { name: chatStarters[0] }));
    await screen.findByText("Got it.");
    const firstId = body(fetchMock.mock.calls[0][1]).conversation_id;
    first.unmount();

    renderChat();
    expect(screen.getByText(chatStarters[0])).toBeInTheDocument();
    expect(screen.getByText("Got it.")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "It was built in Lovable" } });
    fireEvent.submit(screen.getByLabelText("Your message").closest("form")!);
    const second = body(fetchMock.mock.calls[1][1]);
    expect(second.conversation_id).toBe(firstId);
    expect(second.messages).toHaveLength(3);
    await waitFor(() => expect(screen.getAllByText("Got it.")).toHaveLength(2));

    fireEvent.click(screen.getByRole("button", { name: "Start over" }));
    expect(screen.queryByText("Got it.")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: chatStarters[0] })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: chatStarters[1] }));
    expect(body(fetchMock.mock.calls[2][1]).conversation_id).not.toBe(firstId);
    expect(queued("appstore_chat_reset")).toEqual([expect.objectContaining({ turns: 2 })]);
  });

  it("shows the function's error message and lets the visitor try again", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "A lot of people are asking right now." }), { status: 429 }),
    );
    renderChat();
    fireEvent.click(screen.getByRole("button", { name: chatStarters[0] }));
    expect(await screen.findByText("A lot of people are asking right now.")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByLabelText("Your message")).toBeEnabled());
    expect(queued("appstore_chat")).toEqual([expect.objectContaining({ turn: 1, source: "starter" })]);
  });
});
