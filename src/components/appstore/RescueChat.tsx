import { lazy, Suspense, useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Loader2, RotateCcw, Sparkles } from "lucide-react";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";
import { APPSTORE_LEAD_CONVERSION, trackConversion, trackEvent } from "@/lib/analytics";
import { APPSTORE_CHAT_URL, streamChat, type ChatMessage } from "@/lib/chat";
import { chatGreeting, chatStarters } from "@/lib/appStoreService";

// react-markdown only loads once there is an assistant reply to render.
const ReactMarkdown = lazy(() => import("react-markdown"));

const MAX_LEN = 8000;
/** The conversation survives a refresh or a hop to another page within the tab. */
const STORAGE_KEY = "appstore-chat";

type Saved = { id: string; messages: ChatMessage[]; lead?: boolean };

const EMAIL_RE = /[^\s@<>()]+@[^\s@<>()]+\.[a-z]{2,}/i;

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      });

function load(): Saved {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<Saved>;
      if (typeof parsed.id === "string" && Array.isArray(parsed.messages)) {
        return { id: parsed.id, messages: parsed.messages.filter((m) => m && typeof m.content === "string"), lead: parsed.lead === true };
      }
    }
  } catch {
    /* private mode or blocked storage: start fresh */
  }
  return { id: newId(), messages: [] };
}

function save(state: Saved) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* best effort */
  }
}

// Same-page anchors stay anchors, internal routes navigate client-side, everything else
// opens in a new tab.
const markdownComponents: Components = {
  a: ({ href, children }) => {
    if (href && href.startsWith("#")) return <a href={href}>{children}</a>;
    if (href && href.startsWith("/")) return <Link to={href}>{children}</Link>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

const Bubble = ({ role, children, className }: { role: "user" | "assistant"; children: React.ReactNode; className?: string }) => (
  <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
    <div
      className={cn(
        "max-w-[88%] rounded-3xl px-5 py-3.5 text-[15px] leading-relaxed sm:max-w-[80%]",
        role === "user" ? "whitespace-pre-wrap rounded-br-lg bg-accent text-accent-foreground" : "rounded-bl-lg bg-muted text-foreground",
        className,
      )}
    >
      <span className="sr-only">{role === "user" ? "You: " : "Assistant: "}</span>
      {children}
    </div>
  </div>
);

/**
 * The large, embedded assistant under the /appstore hero. It opens by asking what is
 * going on, works out the problem, gives a real read, and, when the visitor wants help,
 * collects what Huruy needs for a quote. Replies stream from the appstore-chat edge
 * function, which also records the lead as details come in.
 */
const RescueChat = () => {
  const [state, setState] = useState<Saved>(() => (typeof window === "undefined" ? { id: "", messages: [] } : load()));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputId = useId();
  const hintId = useId();
  const { id: conversationId, messages } = state;

  const setMessages = useCallback((update: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
    setState((prev) => ({ ...prev, messages: typeof update === "function" ? update(prev.messages) : update }));
  }, []);

  useEffect(() => {
    if (conversationId) save(state);
  }, [state, conversationId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  // The composer grows with a pasted rejection, up to a cap, then scrolls.
  const resize = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 224)}px`;
  };

  const send = async (raw: string, source: "typed" | "starter") => {
    const text = raw.trim();
    if (!text || loading) return;
    const userMsg: ChatMessage = { role: "user", content: text.slice(0, MAX_LEN) };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);
    const turn = history.filter((m) => m.role === "user").length;
    trackEvent("appstore_chat", { turn, source, length: text.length });
    // The first message carrying an email is the lead: same key event and Ads conversion
    // as the written form, once per conversation, so paid traffic is measured either way.
    if (!state.lead && EMAIL_RE.test(text)) {
      setState((prev) => ({ ...prev, lead: true }));
      trackEvent("appstore_intake", { stage: "chat", package: "unsure", channel: "chat", turn });
      trackConversion(APPSTORE_LEAD_CONVERSION, { value: 1, currency: "USD" });
    }
    requestAnimationFrame(resize);

    let acc = "";
    const upsert = (chunk: string) => {
      acc += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: acc } : m));
        }
        return [...prev, { role: "assistant", content: acc }];
      });
    };

    try {
      await streamChat({
        url: APPSTORE_CHAT_URL,
        conversationId: conversationId || undefined,
        messages: history,
        onDelta: upsert,
        onDone: () => setLoading(false),
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
          setLoading(false);
        },
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong. Please try again, or send the form below and Huruy replies within one business day." },
      ]);
      setLoading(false);
    }
  };

  const startOver = () => {
    if (loading) return;
    trackEvent("appstore_chat_reset", { turns: messages.filter((m) => m.role === "user").length });
    setState({ id: newId(), messages: [] });
    setInput("");
    inputRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void send(input, "typed");
    }
  };

  const empty = messages.length === 0;

  return (
    <div className="flex h-[640px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm sm:h-[720px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground" aria-hidden="true">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="font-medium text-foreground">App Store assistant</p>
            <p className="text-sm text-muted-foreground">Works out the problem, then what Huruy would do about it</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {!empty && (
            <button
              type="button"
              onClick={startOver}
              disabled={loading}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Start over
            </button>
          )}
          <span className="hidden rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-block">
            Free, no sign-up
          </span>
        </div>
      </div>

      {/* Conversation */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-6 sm:px-7"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
        aria-relevant="additions text"
      >
        <div className="mx-auto max-w-[52rem] space-y-5">
          <Bubble role="assistant" className={empty ? "text-base sm:text-lg" : undefined}>
            {chatGreeting}
          </Bubble>

          {empty && (
            <ul className="flex flex-wrap gap-2 pl-1" aria-label="Where people usually start">
              {chatStarters.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => void send(q, "starter")}
                    className="min-h-11 rounded-full border border-border bg-background px-4 py-2 text-left text-sm text-foreground transition-colors hover:border-foreground/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {messages.map((m, i) => (
            <Bubble key={i} role={m.role}>
              {m.role === "assistant" ? (
                <Suspense fallback={<p className="whitespace-pre-wrap">{m.content}</p>}>
                  <div className="prose prose-sm max-w-none text-foreground dark:prose-invert [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_li]:my-0.5 [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-2">
                    <ReactMarkdown components={markdownComponents}>{m.content}</ReactMarkdown>
                  </div>
                </Suspense>
              ) : (
                m.content
              )}
            </Bubble>
          ))}

          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="rounded-3xl rounded-bl-lg bg-muted px-5 py-3.5">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
                <span className="sr-only">Assistant is typing</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input, "typed");
        }}
        className="border-t border-border bg-card px-4 py-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-[52rem] items-end gap-3 rounded-2xl border border-input bg-background p-2 pl-4 focus-within:ring-2 focus-within:ring-ring">
          <label htmlFor={inputId} className="sr-only">Your message</label>
          <textarea
            id={inputId}
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              resize();
            }}
            onKeyDown={onKeyDown}
            rows={2}
            maxLength={MAX_LEN}
            placeholder={empty ? "Tell me what's going on, or paste Apple's message..." : "Reply..."}
            aria-describedby={hintId}
            disabled={loading}
            className="max-h-56 min-h-[3.25rem] flex-1 resize-none bg-transparent py-2.5 text-base leading-relaxed text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            aria-label="Send message"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <p id={hintId} className="mx-auto mt-2 max-w-[52rem] text-xs text-muted-foreground">
          Enter to send, Shift+Enter for a new line. An assistant gives the first read; Huruy reviews anything you ask to have quoted. Prefer a form?{" "}
          <a href="#start" className="font-medium text-accent underline underline-offset-4">It's below</a>.
        </p>
      </form>
    </div>
  );
};

export default RescueChat;
