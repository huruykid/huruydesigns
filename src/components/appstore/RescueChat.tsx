import { lazy, Suspense, useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Loader2, Sparkles } from "lucide-react";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { APPSTORE_CHAT_URL, RESCUE_CHAT_STARTERS, streamChat, type ChatMessage } from "@/lib/chat";

// react-markdown only loads once there is an assistant reply to render.
const ReactMarkdown = lazy(() => import("react-markdown"));

const MAX_LEN = 8000;

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

/**
 * The large, embedded diagnosis chat under the /appstore hero. A visitor pastes Apple's
 * rejection (or describes where they're stuck) and gets the guideline, the fix and the
 * package that fits, streamed from the appstore-chat edge function.
 */
const RescueChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const turns = useRef(0);
  const inputId = useId();
  const hintId = useId();

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

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
    turns.current += 1;
    trackEvent("appstore_chat", { turn: turns.current, source, length: text.length });
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
            <p className="font-medium text-foreground">Rejection assistant</p>
            <p className="text-sm text-muted-foreground">Reads Apple's message against Huruy's playbook</p>
          </div>
        </div>
        <span className="hidden shrink-0 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-block">
          Free, no sign-up
        </span>
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
        {empty ? (
          <div className="mx-auto flex h-full max-w-[44rem] flex-col items-center justify-center text-center">
            <h3 className="font-serif-display text-3xl italic text-foreground sm:text-4xl">What did Apple say?</h3>
            <p className="mt-3 max-w-[40ch] text-base text-muted-foreground">
              Paste the message from Resolution Center, or describe where you're stuck. You'll get the guideline, the fix and the price.
            </p>
            <ul className="mt-8 grid w-full gap-2 sm:grid-cols-2" aria-label="Common questions">
              {RESCUE_CHAT_STARTERS.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => void send(q, "starter")}
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-left text-sm text-foreground transition-colors hover:border-foreground/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mx-auto max-w-[52rem] space-y-5">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[88%] rounded-3xl px-5 py-3.5 text-[15px] leading-relaxed sm:max-w-[80%]",
                    m.role === "user"
                      ? "whitespace-pre-wrap rounded-br-lg bg-accent text-accent-foreground"
                      : "rounded-bl-lg bg-muted text-foreground",
                  )}
                >
                  <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
                  {m.role === "assistant" ? (
                    <Suspense fallback={<p className="whitespace-pre-wrap">{m.content}</p>}>
                      <div className="prose prose-sm max-w-none text-foreground dark:prose-invert [&_a]:font-medium [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_li]:my-0.5 [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_ul]:my-2">
                        <ReactMarkdown components={markdownComponents}>{m.content}</ReactMarkdown>
                      </div>
                    </Suspense>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
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
        )}
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
            placeholder="Paste Apple's rejection message here..."
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
          Enter to send, Shift+Enter for a new line. A first read from an assistant; Huruy's own diagnosis comes from{" "}
          <a href="#start" className="font-medium text-accent underline underline-offset-4">the form below</a> within one business day.
        </p>
      </form>
    </div>
  );
};

export default RescueChat;
