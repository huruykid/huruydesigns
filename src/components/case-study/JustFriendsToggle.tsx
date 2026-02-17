import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users } from "lucide-react";

type Mode = "dating" | "friends";

const JustFriendsToggle = () => {
  const [mode, setMode] = useState<Mode>("dating");

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-4">
      {/* Segmented toggle */}
      <div className="flex rounded-lg bg-muted p-1 gap-1">
        {([
          { key: "dating" as Mode, label: "Dating", icon: Heart },
          { key: "friends" as Mode, label: "Just Friends", icon: Users },
        ]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`relative flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              mode === key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {mode === key && (
              <motion.div
                layoutId="toggle-bg"
                className="absolute inset-0 rounded-md bg-background shadow-sm"
                transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* Preview card */}
      <AnimatePresence mode="wait">
        {mode === "dating" ? (
          <motion.div
            key="dating"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-accent/30 bg-accent/5 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Makda, 28</p>
                <p className="text-xs text-muted-foreground">Suggested by your Shmagele</p>
              </div>
              <Heart className="h-5 w-5 text-accent fill-accent/20" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[87%] rounded-full bg-accent" />
              </div>
              <span className="text-xs font-bold text-accent">87%</span>
            </div>
            <p className="text-xs text-muted-foreground">Compatibility based on shared values & culture</p>
          </motion.div>
        ) : (
          <motion.div
            key="friends"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg border border-border bg-muted/30 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">Yohannes, 24</p>
                <p className="text-xs text-muted-foreground">Community member near you</p>
              </div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Tigrayan cooking", "Cultural events", "Music"].map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground">
                  {tag}
                </span>
              ))}
            </div>
            <button className="w-full rounded-md bg-foreground text-background py-1.5 text-xs font-medium hover:opacity-90 transition-opacity">
              Connect
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JustFriendsToggle;
