import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResponsiveAppShellProps {
  children: React.ReactNode;
  label?: string;
  /** Height of the desktop frame's viewport. Its width is fluid. */
  desktopHeight?: number;
  /** Narrowest frame the desktop layout still works at; below it the demo uses its mobile layout. */
  minDesktopWidth?: number;
  /** Widest the desktop frame grows. Omit to fill the available space. */
  maxDesktopWidth?: number;
  mobileWidth?: number;
  mobileHeight?: number;
  allowToggle?: boolean;
  /** Always render this frame, whatever the space (e.g. a phone-only app). */
  fixedLayout?: "mobile" | "desktop";
  /** @deprecated The desktop frame is fluid now; kept so old call sites compile. */
  desktopWidth?: number;
}

export type ShellLayout = "mobile" | "desktop";
/** Props every demo inside the shell receives. */
export interface ShellChildProps {
  layout?: ShellLayout;
  /** Inner width of the frame in CSS pixels, so a demo can respond to its own space. */
  frameWidth?: number;
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

/**
 * A browser or phone frame around an interactive demo. The layout is chosen from
 * the width this shell actually gets (a container query, measured), never from
 * the viewport, and the demo is rendered at 1:1. Nothing is scaled down to fit:
 * when the desktop layout would not fit, the demo's own mobile layout is used.
 */
export default function ResponsiveAppShell({
  children,
  label,
  desktopHeight = 520,
  minDesktopWidth = 600,
  maxDesktopWidth,
  mobileWidth = 300,
  mobileHeight = 520,
  allowToggle = false,
  fixedLayout,
}: ResponsiveAppShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [forced, setForced] = useState<ShellLayout | null>(null);

  useIsoLayoutEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;
    const update = () => setWidth(shell.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  const measured = width > 0;
  const desktopFits = measured ? width >= minDesktopWidth : true;
  const activeLayout: ShellLayout =
    fixedLayout ?? (forced === "desktop" && !desktopFits ? "mobile" : forced) ?? (desktopFits ? "desktop" : "mobile");

  const desktopFrame = Math.min(width || maxDesktopWidth || 0, maxDesktopWidth ?? Infinity);
  const phoneFrame = measured ? Math.min(mobileWidth, width) : mobileWidth;
  const frameWidth = activeLayout === "desktop" ? Math.max(0, desktopFrame - 2) : Math.max(0, phoneFrame - 6);

  const enhancedChildren = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<ShellChildProps>, { layout: activeLayout, frameWidth })
      : child,
  );

  const scrollHint = (
    <p className="flex min-h-6 items-center gap-1.5 text-xs text-muted-foreground">
      <motion.span animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} aria-hidden="true">↓</motion.span>
      Scroll inside the frame to explore
    </p>
  );

  // Switching only makes sense when both layouts genuinely fit.
  const togglePill =
    allowToggle && !fixedLayout && desktopFits ? (
      <div className="flex items-center gap-1 rounded-md border border-border bg-background p-1" role="group" aria-label="Preview device">
        {(["mobile", "desktop"] as const).map((l) => (
          <Button
            key={l}
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setForced(l)}
            className={`h-11 w-11 rounded-sm ${activeLayout === l ? "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
            aria-label={l === "mobile" ? "Mobile view" : "Desktop view"}
            aria-pressed={activeLayout === l}
          >
            {l === "mobile" ? <Smartphone className="h-4 w-4" aria-hidden="true" /> : <Monitor className="h-4 w-4" aria-hidden="true" />}
          </Button>
        ))}
      </div>
    ) : null;

  // Controls sit above the frame, so a caption below it stays attached to the visual.
  const controls = (
    <div className={`mb-3 flex w-full items-center gap-3 ${togglePill ? "justify-between" : "justify-center"}`}>
      {scrollHint}
      {togglePill}
    </div>
  );

  const viewportStyle: React.CSSProperties = {
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    overscrollBehavior: "contain",
    containerType: "inline-size",
  };

  return (
    <div ref={shellRef} className="w-full min-w-0 text-left text-sm leading-normal text-foreground" style={{ visibility: measured ? undefined : "hidden" }}>
      <AnimatePresence mode="wait" initial={false}>
        {activeLayout === "mobile" ? (
          <motion.div key="mobile-shell" variants={fadeVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }} className="flex w-full flex-col items-center">
            <div className="flex w-full flex-col items-center" style={{ maxWidth: togglePill ? undefined : phoneFrame }}>{controls}</div>
            <div data-demo-frame className="overflow-hidden rounded-[2.25rem] border-[3px] border-foreground/20 bg-background shadow-xl" style={{ width: phoneFrame }}>
              <div className="flex h-7 items-center justify-center bg-foreground/10 px-8">
                <span className="truncate text-[11px] font-medium text-muted-foreground">{label}</span>
              </div>
              <div className="relative overflow-y-auto" style={{ ...viewportStyle, height: mobileHeight }}>
                {enhancedChildren}
              </div>
              <div className="flex h-5 items-center justify-center bg-foreground/5">
                <div className="h-1 w-20 rounded-full bg-foreground/20" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="desktop-shell" variants={fadeVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.25 }} className="flex w-full flex-col items-center">
            <div className="w-full" style={{ maxWidth: maxDesktopWidth }}>{controls}</div>
            <div data-demo-frame className="w-full overflow-hidden rounded-xl border border-foreground/15 bg-background shadow-xl" style={{ maxWidth: maxDesktopWidth }}>
              <div className="flex items-center border-b border-foreground/10 bg-foreground/[0.04] px-4 py-2.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-3 w-3 rounded-full bg-foreground/15" />
                  <span className="h-3 w-3 rounded-full bg-foreground/15" />
                  <span className="h-3 w-3 rounded-full bg-foreground/15" />
                </div>
                {label && <span className="-ml-12 flex-1 truncate px-12 text-center text-xs font-medium text-muted-foreground">{label}</span>}
              </div>
              <div className="relative overflow-y-auto" style={{ ...viewportStyle, height: desktopHeight }}>
                {enhancedChildren}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
