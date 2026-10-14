import { createContext, useContext } from "react";

export interface ChatState {
  open: boolean;
  /** Opens the panel; focus returns to `from` when it closes. */
  openChat: (from?: HTMLElement | null) => void;
}

export const ChatContext = createContext<ChatState | null>(null);

/** Opens the portfolio assistant from any entry point (header button, floating launcher). */
export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside <ChatProvider>");
  return ctx;
};
