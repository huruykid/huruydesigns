import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, User, DollarSign, Calendar, Shield, RefreshCw } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: User,
    title: "Personal info updated",
    actor: "Maya Chen",
    detail: "Changed home address. Review required.",
    time: "just now",
    priority: "high",
  },
  {
    id: 2,
    icon: DollarSign,
    title: "Direct deposit changed",
    actor: "James Okonkwo",
    detail: "New bank account added to payroll",
    time: "2m ago",
    priority: "high",
  },
  {
    id: 3,
    icon: Calendar,
    title: "PTO request submitted",
    actor: "Sara Lim",
    detail: "Mar 3–7 · 5 days · Team coverage needed",
    time: "5m ago",
    priority: "medium",
  },
  {
    id: 4,
    icon: Shield,
    title: "Benefits enrollment",
    actor: "David Torres",
    detail: "Added dependent. Eligibility verification pending.",
    time: "12m ago",
    priority: "medium",
  },
  {
    id: 5,
    icon: User,
    title: "Emergency contact updated",
    actor: "Priya Nair",
    detail: "Contact info modified",
    time: "18m ago",
    priority: "low",
  },
];

const priorityStyle: Record<string, string> = {
  high: "bg-rose-500/10 border-rose-500/20 text-rose-400",
  medium: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  low: "bg-muted border-border text-muted-foreground",
};

const AdminNotificationDemo = () => {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [pulse, setPulse] = useState(false);

  const visible = notifications.filter((n) => !dismissed.includes(n.id));

  const dismiss = (id: number) => setDismissed((prev) => [...prev, id]);

  const reset = () => {
    setPulse(true);
    setDismissed([]);
    setTimeout(() => setPulse(false), 600);
  };

  // Simulate incoming notification
  useEffect(() => {
    if (dismissed.length === 0) return;
    // nothing; just here for extension
  }, [dismissed]);

  return (
    <div className="mt-8 rounded-xl border border-border bg-card/40 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Bell className="h-4 w-4 text-foreground" />
            {visible.length > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent" />
            )}
          </div>
          <span className="text-sm font-semibold text-foreground">Admin Notifications</span>
          {visible.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
              {visible.length} pending
            </span>
          )}
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className={`h-3 w-3 ${pulse ? "animate-spin" : ""}`} />
          Reset
        </button>
      </div>

      {/* Context callout */}
      <div className="px-5 py-3 bg-muted/20 border-b border-border">
        <p className="text-xs text-muted-foreground italic">
          Before this feature: administrators had <span className="text-foreground font-medium">no visibility</span> into employee-initiated actions. Each card below represents a real-time event surfaced by the new notification layer.
        </p>
      </div>

      {/* Notification list */}
      <div className="p-4 space-y-2 min-h-[260px]">
        <AnimatePresence>
          {visible.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-2 py-12 text-center"
            >
              <CheckCircle2 className="h-8 w-8 text-accent" />
              <p className="text-sm font-semibold text-foreground">All caught up</p>
              <p className="text-xs text-muted-foreground">No pending actions require your review.</p>
              <button
                onClick={reset}
                className="mt-2 text-xs text-accent hover:underline"
              >
                Load more notifications
              </button>
            </motion.div>
          ) : (
            visible.map((n) => {
              const Icon = n.icon;
              return (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-start gap-3 p-3.5 rounded-lg border ${priorityStyle[n.priority]}`}
                >
                  <div className="shrink-0 mt-0.5 p-1.5 rounded-lg bg-background/60">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-foreground truncate">{n.title}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                    </div>
                    <p className="text-[11px] font-medium text-foreground/80 mb-0.5">{n.actor}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{n.detail}</p>
                  </div>
                  <button
                    onClick={() => dismiss(n.id)}
                    className="shrink-0 mt-0.5 p-1 rounded hover:bg-background/40 transition-colors text-muted-foreground hover:text-foreground"
                    aria-label="Dismiss"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </button>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-border bg-muted/20">
        <p className="text-xs text-muted-foreground text-center">
          Dismiss each alert to simulate the admin review workflow
        </p>
      </div>
    </div>
  );
};

export default AdminNotificationDemo;
