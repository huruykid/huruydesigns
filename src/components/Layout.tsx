import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatBubble from "./ChatBubble";

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1 pt-16"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <ChatBubble />
    </div>
  );
};

export default Layout;
