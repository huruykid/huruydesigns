import { useState, useRef, useEffect, useCallback, useId, type Dispatch, type SetStateAction } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown, { type Components } from "react-markdown";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { CHAT_STARTERS, streamChat, type ChatMessage } from "@/lib/chat";

interface ChatPanelProps {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  onClose: () => void;
}

// Internal links the bot writes (e.g. /project/ebtfinder) navigate client-side so the
// conversation survives; external ones open in a new tab.
const markdownComponents: Components = {
  a: ({ href, children }) => {
    if (href && href.startsWith("/")) return <Link to={href}>{children}</Link>;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

const ChatPanel = ({ messages, setMessages, onClose }: ChatPanelProps) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const titleId = useId();
  const descId = useId();
  const inputId = useId();

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus moves into the dialog on open; ChatBubble returns it to the launcher on close.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Escape closes from anywhere on the page while the panel is open (focus may have
  // left the panel after following a link the bot produced).
  useEffect(() => {
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onDocKey);
    return () => document.removeEventListener("keydown", onDocKey);
  }, [onClose]);

  // Tab stays inside the panel.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && panelRef.current) {
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", content: text.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput("");
    setLoading(true);

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
        messages: history,
        onDelta: upsert,
        onDone: () => setLoading(false),
        onError: (msg) => {
          setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
          setLoading(false);
        },
      });
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      aria-describedby={descId}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed z-50 flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden print:hidden",
        isMobile ? "inset-2 rounded-2xl" : "bottom-6 right-6 w-[400px] h-[560px]",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-sm font-bold" aria-hidden="true">
            H
          </div>
          <div>
            <p id={titleId} className="text-sm font-semibold">Ask about Huruy's work</p>
            <p id={descId} className="text-xs text-muted-foreground">AI assistant, answers from this portfolio</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3" aria-live="polite" aria-relevant="additions text">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Hi! I'm the assistant for Huruy's portfolio. Ask me about his work, skills, or experience.
            </p>
            <div className="flex flex-wrap gap-2">
              {CHAT_STARTERS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs min-h-11 px-3 py-2 rounded-full border border-border bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm",
                m.role === "user" ? "bg-accent text-accent-foreground rounded-br-md" : "bg-secondary text-secondary-foreground rounded-bl-md",
              )}
            >
              <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
              {m.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none [&_p]:my-1 [&_ul]:my-1 [&_a]:text-accent [&_a]:underline">
                  <ReactMarkdown components={markdownComponents}>{m.content}</ReactMarkdown>
                </div>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex justify-start">
            <div className="bg-secondary rounded-2xl rounded-bl-md px-3.5 py-2.5">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">Assistant is typing</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 px-4 py-3 border-t border-border bg-card"
      >
        <label htmlFor={inputId} className="sr-only">Your question</label>
        <input
          id={inputId}
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Huruy's work..."
          className="flex-1 min-h-11 rounded-md bg-transparent px-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          disabled={loading}
          autoComplete="off"
          maxLength={2000}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="h-11 w-11 rounded-full bg-accent text-accent-foreground flex items-center justify-center disabled:opacity-40 hover:bg-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </motion.div>
  );
};

export default ChatPanel;
