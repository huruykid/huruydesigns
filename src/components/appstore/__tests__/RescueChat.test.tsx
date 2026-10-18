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
function sse(chunks: string[], leadId?: string) {
  const enc = new TextEncoder();
  const lines = [...chunks.map((c) => `data: ${JSON.stringify({ choices: [{ delta: { content: c } }] })}\n`), ...(leadId ? [`data: ${JSON.stringify({ lead_saved: leadId })}\n`] : []), "data: [DONE]\n"];
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

  it("fires the intake key event and the Ads conversion once, only after the server confirms a saved contact", async () => {
    let turn = 0;
    vi.spyOn(globalThis, "fetch").mockImplementation(() => Promise.resolve(new Response(sse(["Thanks."], ++turn > 1 ? "12345678-1234-1234-1234-123456789abc" : undefined), { status: 200 })));
    renderChat();
    const box = screen.getByLabelText("Your message");
    fireEvent.change(box, { target: { value: "It was rejected under 4.2" } });
    fireEvent.keyDown(box, { key: "Enter" });
    await screen.findByText("Thanks.");
    expect(queued("appstore_intake")).toEqual([]);
    fireEvent.change(box, { target: { value: "Sure, Jane Doe, jane@example.com" } });
    fireEvent.keyDown(box, { key: "Enter" });
    await waitFor(() => expect(screen.getAllByText("Thanks.")).toHaveLength(2));
    expect(queued("appstore_intake")).toEqual([expect.objectContaining({ channel: "chat", stage: "chat", turn: 2 })]);
    expect(queued("conversion")).toEqual([expect.objectContaining({ send_to: expect.stringMatching(/^AW-/), value: 1 })]);
    fireEvent.change(box, { target: { value: "Also my phone is 415 555 0100, jane@example.com" } });
    fireEvent.keyDown(box, { key: "Enter" });
    await waitFor(() => expect(screen.getAllByText("Thanks.")).toHaveLength(3));
    expect(queued("appstore_intake")).toHaveLength(1);
  });

  it("recovers after leaving before the first reply and preserves the conversation id", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch")
      .mockImplementationOnce(() => new Promise<Response>(() => {}))
      .mockResolvedValue(new Response(sse(["You can continue."]), { status: 200 }));
    const first = renderChat();
    fireEvent.click(screen.getByRole("button", { name: chatStarters[0] }));
    const firstId = body(fetchMock.mock.calls[0][1]).conversation_id;
    await waitFor(() => expect(JSON.parse(sessionStorage.getItem("appstore-chat") ?? "{}").messages).toEqual([
      { role: "user", content: chatStarters[0] },
    ]));
    first.unmount();
    renderChat();
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Can we continue?" } });
    fireEvent.keyDown(screen.getByLabelText("Your message"), { key: "Enter" });
    const sent = body(fetchMock.mock.calls[1][1]);
    expect(sent.conversation_id).toBe(firstId);
    expect(sent.messages).toEqual([
      { role: "user", content: chatStarters[0] },
      { role: "assistant", content: expect.stringContaining("interrupted") },
      { role: "user", content: "Can we continue?" },
    ]);
    await screen.findByText("You can continue.");
  });

  it("repairs an already broken saved user/user transcript without losing earlier messages or lead status", async () => {
    const messages = [
      { role: "user", content: "First question" },
      { role: "assistant", content: "First answer" },
      { role: "user", content: "Interrupted question" },
      { role: "user", content: "Tried again" },
      { role: "assistant", content: "Messages must alternate between user and assistant" },
    ];
    sessionStorage.setItem("appstore-chat", JSON.stringify({ id: "saved-id", messages, lead: true }));
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(sse(["Recovered."]), { status: 200 }));
    renderChat();
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Next question" } });
    fireEvent.keyDown(screen.getByLabelText("Your message"), { key: "Enter" });
    expect(body(fetchMock.mock.calls[0][1]).messages).toEqual([
      ...messages.slice(0, 3),
      { role: "assistant", content: expect.stringContaining("interrupted") },
      ...messages.slice(3),
      { role: "user", content: "Next question" },
    ]);
    await screen.findByText("Recovered.");
    expect(JSON.parse(sessionStorage.getItem("appstore-chat") ?? "{}").lead).toBe(true);
  });

  it("allows another turn after a stream finishes without any reply", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(sse([]), { status: 200 }))
      .mockResolvedValueOnce(new Response(sse(["Recovered."]), { status: 200 }));
    renderChat();
    fireEvent.click(screen.getByRole("button", { name: chatStarters[0] }));
    await waitFor(() => expect(screen.getByLabelText("Your message")).toBeEnabled());
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Try again" } });
    fireEvent.keyDown(screen.getByLabelText("Your message"), { key: "Enter" });
    expect(body(fetchMock.mock.calls[1][1]).messages).toEqual([
      { role: "user", content: chatStarters[0] },
      { role: "assistant", content: expect.stringContaining("interrupted") },
      { role: "user", content: "Try again" },
    ]);
    await screen.findByText("Recovered.");
  });

  it("keeps a partial reply and stream error in one assistant turn", async () => {
    const encoder = new TextEncoder();
    let failStream: (() => void) | undefined;
    const partial = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: "Partial reply" } }] })}\n`));
        failStream = () => controller.error(new Error("Connection lost"));
      },
    });
    const fetchMock = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(partial, { status: 200 }))
      .mockResolvedValueOnce(new Response(sse(["Recovered."]), { status: 200 }));
    renderChat();
    fireEvent.click(screen.getByRole("button", { name: chatStarters[0] }));
    await screen.findByText("Partial reply");
    failStream?.();
    await waitFor(() => expect(screen.getByLabelText("Your message")).toBeEnabled());
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Try again" } });
    fireEvent.keyDown(screen.getByLabelText("Your message"), { key: "Enter" });
    expect(body(fetchMock.mock.calls[1][1]).messages).toEqual([
      { role: "user", content: chatStarters[0] },
      { role: "assistant", content: expect.stringMatching(/^Partial reply\n\nSomething went wrong/) },
      { role: "user", content: "Try again" },
    ]);
    await screen.findByText("Recovered.");
  });

  it.each([200, 429])("does not count a typed email without a saved lead receipt (%s)", async (status) => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(
      status === 200 ? sse(["Thanks."]) : JSON.stringify({ error: "Try again" }), { status },
    ));
    renderChat();
    fireEvent.change(screen.getByLabelText("Your message"), { target: { value: "Contact jane@example.com" } });
    fireEvent.keyDown(screen.getByLabelText("Your message"), { key: "Enter" });
    await waitFor(() => expect(screen.getByLabelText("Your message")).toBeEnabled());
    expect(queued("appstore_intake")).toEqual([]);
    expect(queued("conversion")).toEqual([]);
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
