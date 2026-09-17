import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage } from "@/lib/chat";

// The panel (and react-markdown with it) only loads the first time someone opens the chat.
const ChatPanel = lazy(() => import("./ChatPanel"));

/**
 * Floating chat launcher. Message history lives here, above the lazily loaded panel,
 * so closing and reopening the chat keeps the conversation.
 */
const ChatBubble = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const refocusLauncher = useRef(false);

  // The launcher unmounts while the panel is open, so focus is returned to it here,
  // once it is back in the DOM, rather than from inside the panel.
  useEffect(() => {
    if (!open && refocusLauncher.current) {
      refocusLauncher.current = false;
      launcherRef.current?.focus();
    }
  }, [open]);

  const close = () => {
    refocusLauncher.current = true;
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Open chat with Huruy's portfolio assistant"
            aria-haspopup="dialog"
          >
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>

      {open && (
        <Suspense fallback={null}>
          <ChatPanel messages={messages} setMessages={setMessages} onClose={close} />
        </Suspense>
      )}
    </>
  );
};

export default ChatBubble;
