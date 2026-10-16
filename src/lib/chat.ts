export type ChatMessage = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-chat`;
/** The App Store diagnosis assistant on /appstore; same wire format as portfolio-chat. */
export const APPSTORE_CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/appstore-chat`;

export const CHAT_STARTERS = [
  "What has Huruy worked on?",
  "What are Huruy's top skills?",
  "Is Huruy open to new roles?",
  "Tell me about the EBT Finder project",
];

/** Streams a reply from a chat edge function (SSE, OpenAI-style deltas); portfolio-chat by default. */
export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
  url = CHAT_URL,
  conversationId,
}: {
  messages: ChatMessage[];
  onDelta: (t: string) => void;
  onDone: () => void;
  onError: (msg: string) => void;
  url?: string;
  /** Lets the function keep one lead record per conversation (appstore-chat only). */
  conversationId?: string;
}) {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify(conversationId ? { conversation_id: conversationId, messages } : { messages }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || "Something went wrong. Please try again.");
    return;
  }

  if (!resp.body) {
    onError("No response body");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buf.indexOf("\n")) !== -1) {
      let line = buf.slice(0, idx);
      buf = buf.slice(idx + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (!line.startsWith("data: ")) continue;
      const json = line.slice(6).trim();
      if (json === "[DONE]") {
        onDone();
        return;
      }
      try {
        const parsed = JSON.parse(json);
        const c = parsed.choices?.[0]?.delta?.content;
        if (c) onDelta(c);
      } catch {
        // Partial JSON: put the line back and wait for more bytes.
        buf = line + "\n" + buf;
        break;
      }
    }
  }
  onDone();
}
