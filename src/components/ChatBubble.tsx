import { useCallback, useEffect, useRef, useState, lazy, Suspense, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ChatContext, useChat } from "@/hooks/useChat";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage } from "@/lib/chat";

// The panel (and react-markdown with it) only loads the first time someone opens the chat.
const ChatPanel = lazy(() => import("./ChatPanel"));

/**
 * Owns the conversation and the panel, so any entry point (the header button on
 * phones and tablets, the floating launcher from lg up) opens the same chat and history
 * survives closing it.
 */
export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const returnFocus = useRef<HTMLElement | null>(null);
  const refocus = useRef(false);

  const openChat = useCallback((from?: HTMLElement | null) => {
    returnFocus.current = from ?? null;
    setOpen(true);
  }, []);

  const close = () => {
    refocus.current = true;
    setOpen(false);
  };

  // The floating launcher unmounts while the panel is open, so focus is restored
  // once the panel is gone and the opener is back in the DOM.
  useEffect(() => {
    if (!open && refocus.current) {
      refocus.current = false;
      const el = returnFocus.current;
      if (el && el.isConnected) el.focus();
      else document.querySelector<HTMLElement>("[data-chat-launcher]")?.focus();
    }
  }, [open]);

  return (
    <ChatContext.Provider value={{ open, openChat }}>
      {children}
      {open && (
        <Suspense fallback={null}>
          <ChatPanel messages={messages} setMessages={setMessages} onClose={close} />
        </Suspense>
      )}
    </ChatContext.Provider>
  );
};

/**
 * Floating launcher from lg up; below lg the header carries the entry point. Up to
 * ~1,440px the content's right edge reaches under the launcher, so whenever any
 * control (or a demo frame) passes underneath, the launcher steps aside instead of
 * covering it. /appstore has its own embedded assistant, so the launcher stays off there.
 */
const ChatBubble = () => {
  const { open, openChat } = useChat();
  const { pathname } = useLocation();
  const ref = useRef<HTMLButtonElement>(null);
  const [yielding, setYielding] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      // Use the layout box, not getBoundingClientRect: the launcher animates
      // (scale/opacity), and a transformed box would make it flicker in and out.
      if (el.offsetWidth === 0) return setYielding(false);
      const cs = getComputedStyle(el);
      const right = document.documentElement.clientWidth - parseFloat(cs.right);
      const bottom = window.innerHeight - parseFloat(cs.bottom);
      const b = { left: right - el.offsetWidth, right, top: bottom - el.offsetHeight, bottom };
      // Exact rectangle test against every control on the page (and demo frames):
      // if any of them overlaps the launcher, step aside so it stays reachable.
      const pad = 8;
      const L = b.left - pad, R = b.right + pad, T = b.top - pad, B = b.bottom + pad;
      const interactive = "a,button,input,select,textarea,summary,[role=button],[role=tab],[role=switch],[role=option],[data-demo-frame]";
      const over = [...document.querySelectorAll(interactive)].some((n) => {
        if (n === el || el.contains(n)) return false;
        const r = n.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && r.right > L && r.left < R && r.bottom > T && r.top < B;
      });
      setYielding(over);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(check); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [open]);

  // The App Store pages and guides speak to founders, and /appstore has its own assistant.
  if (pathname.startsWith("/appstore") || pathname.startsWith("/guides")) return null;

  return (
    <AnimatePresence>
      {!open && (
        <motion.button
          ref={ref}
          type="button"
          data-chat-launcher
          initial={{ scale: 0 }}
          animate={{ scale: 1, opacity: yielding ? 0 : 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => openChat(e.currentTarget)}
          tabIndex={yielding ? -1 : undefined}
          aria-hidden={yielding || undefined}
          className={`fixed bottom-6 right-6 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:flex print:hidden ${yielding ? "pointer-events-none" : ""}`}
          aria-label="Open chat with Huruy's portfolio assistant"
          aria-haspopup="dialog"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ChatBubble;
