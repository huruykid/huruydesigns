import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface ResponsiveAppShellProps {
  children: React.ReactNode;
  label?: string;
  desktopWidth?: number;
}

export default function ResponsiveAppShell({ children, label, desktopWidth = 520 }: ResponsiveAppShellProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Phone mockup shell
    return (
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="rounded-[2.5rem] border-[3px] border-foreground/20 bg-background shadow-2xl overflow-hidden w-[260px]">
            <div className="bg-foreground/10 h-6 flex items-center justify-center shrink-0">
              <div className="w-16 h-1 rounded-full bg-foreground/20" />
            </div>
            <div
              className="relative h-[480px] overflow-y-auto"
              style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {children}
            </div>
            <div className="bg-foreground/5 h-5 flex items-center justify-center shrink-0">
              <div className="w-20 h-1 rounded-full bg-foreground/20" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-[2.5rem] bg-accent/5 blur-2xl -z-10 scale-110" />
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="text-muted-foreground text-xs animate-bounce">↓</span>
          <span className="text-muted-foreground text-xs">Scroll to explore</span>
        </div>
      </div>
    );
  }

  // Desktop browser-style frame
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: desktopWidth }}>
        <div
          className="rounded-xl border border-foreground/15 bg-background shadow-2xl overflow-hidden"
          style={{ width: desktopWidth }}
        >
          {/* Title bar */}
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
          {/* Content viewport */}
          <div
            className="relative overflow-y-auto"
            style={{
              height: 520,
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {children}
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl bg-accent/5 blur-2xl -z-10 scale-105" />
      </div>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-3 flex items-center gap-1.5"
      >
        <motion.span animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} className="text-muted-foreground text-xs">↓</motion.span>
        <span className="text-muted-foreground text-xs">Scroll to explore</span>
      </motion.div>
    </div>
  );
}
