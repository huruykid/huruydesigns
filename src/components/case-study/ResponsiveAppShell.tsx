import React, { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Monitor } from "lucide-react";

interface ResponsiveAppShellProps {
  children: React.ReactNode;
  label?: string;
  desktopWidth?: number;
  desktopHeight?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  allowToggle?: boolean;
}

const fadeVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
};

export default function ResponsiveAppShell({ children, label, desktopWidth = 520, desktopHeight = 520, mobileWidth = 260, mobileHeight = 480, allowToggle = false }: ResponsiveAppShellProps) {
  const isMobile = useIsMobile();
  const [forcedLayout, setForcedLayout] = useState<"mobile" | "desktop" | null>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const activeLayout: "mobile" | "desktop" = forcedLayout ?? (isMobile ? "mobile" : "desktop");

  // Scale desktop shell down on narrow viewports so it doesn't overflow
  const [viewportWidth, setViewportWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  const desktopScale = activeLayout === "desktop"
    ? Math.min(1, (viewportWidth - 48) / desktopWidth)
    : 1;

  // Scroll prototype into view after toggle (delay to let AnimatePresence finish)
  useEffect(() => {
    if (forcedLayout && shellRef.current) {
      const timeout = setTimeout(() => {
        const top = shellRef.current?.offsetTop ?? 0;
        window.scrollTo({ top: top - 80, behavior: "smooth" });
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [forcedLayout]);

  // Pass layout prop to children via cloneElement
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, { layout: activeLayout });
    }
    return child;
  });

  const scrollHint = (
    <div className="flex items-center gap-1.5">
      <motion.span animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} className="text-muted-foreground text-xs">↓</motion.span>
      <span className="text-muted-foreground text-xs">Scroll to explore</span>
    </div>
  );

  const togglePill = allowToggle ? (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="flex items-center gap-0.5 rounded-full border border-border bg-muted/50 p-1"
    >
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setForcedLayout("mobile"); }}
        className={`rounded-full p-1.5 transition-colors ${
          activeLayout === "mobile"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Mobile view"
      >
        <Smartphone className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); e.preventDefault(); setForcedLayout("desktop"); }}
        className={`rounded-full p-1.5 transition-colors ${
          activeLayout === "desktop"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Desktop view"
      >
        <Monitor className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  ) : null;

  return (
    <div ref={shellRef}>
    <AnimatePresence mode="wait">
      {activeLayout === "mobile" ? (
        <motion.div
          key="mobile-shell"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="rounded-[2.5rem] border-[3px] border-foreground/20 bg-background shadow-2xl overflow-hidden" style={{ width: mobileWidth }}>
              <div className="bg-foreground/10 h-6 flex items-center justify-center shrink-0">
                <div className="w-16 h-1 rounded-full bg-foreground/20" />
              </div>
              <div
                className="relative overflow-y-auto"
                style={{ height: mobileHeight, WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none", overscrollBehavior: "contain" }}
              >
                {enhancedChildren}
              </div>
              <div className="bg-foreground/5 h-5 flex items-center justify-center shrink-0">
                <div className="w-20 h-1 rounded-full bg-foreground/20" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-[2.5rem] bg-accent/5 blur-2xl -z-10 scale-110" />
          </div>
          <div className="mt-3 flex flex-col items-center gap-2">
            {scrollHint}
            {togglePill}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="desktop-shell"
          variants={fadeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex flex-col items-center"
          style={desktopScale < 1 ? { width: desktopWidth * desktopScale, height: (desktopHeight + 40) * desktopScale + 40 } : undefined}
        >
          <div className="relative" style={{ width: desktopWidth, transform: desktopScale < 1 ? `scale(${desktopScale})` : undefined, transformOrigin: 'top center' }}>
            <div
              className="rounded-xl border border-foreground/15 bg-background shadow-2xl overflow-hidden"
              style={{ width: desktopWidth }}
            >
              <div className="flex items-center px-4 py-2.5 bg-foreground/[0.04] border-b border-foreground/10 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                {label && (
                  <span className="flex-1 text-center text-xs font-medium text-muted-foreground -ml-12">
                    {label}
                  </span>
                )}
              </div>
              <div
                className="relative overflow-y-auto"
                style={{
                  height: desktopHeight,
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  overscrollBehavior: "contain",
                }}
              >
                {enhancedChildren}
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl bg-accent/5 blur-2xl -z-10 scale-105" />
          </div>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="mt-3 flex flex-col items-center gap-2"
          >
            {scrollHint}
            {togglePill}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
