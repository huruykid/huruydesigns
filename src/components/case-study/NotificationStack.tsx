import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bell } from "lucide-react";

const notifications = [
  { msg: "It's a match, Berhane! The feelings mutual! Start a conversation.", icon: Heart },
  { msg: "Congrats! 2 users you recommended have matched each other!", icon: Bell },
  { msg: "Your Shmagele Score: You've ranked as the #7 Top Ranked Shmagele", icon: Bell },
  { msg: "Thank you for helping our community create more connections!", icon: Heart },
];

const NotificationStack = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= notifications.length) {
      const timer = setTimeout(() => setVisibleCount(0), 2500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 900);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <div className="space-y-2 min-h-[200px]">
      <AnimatePresence>
        {notifications.slice(0, visibleCount).map((n, i) => (
          <motion.div
            key={`${i}-${visibleCount > notifications.length ? "r" : ""}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="flex items-start gap-3 p-3 rounded-xl border border-border bg-card shadow-sm"
          >
            <div className="shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
              <n.icon className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground leading-tight">Beles</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{n.msg}</p>
            </div>
            <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">now</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationStack;
