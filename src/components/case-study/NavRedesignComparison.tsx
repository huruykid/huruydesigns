import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Search, Heart, Calendar, MessageCircle, User } from "lucide-react";

const beforeIcons = [
  { icon: Home, label: "Home" },
  { icon: Search, label: "Search" },
  { icon: Heart, label: "Matches" },
  { icon: Calendar, label: "Events" },
  { icon: MessageCircle, label: "Chat" },
  { icon: User, label: "Profile" },
];

const afterIcons = [
  { icon: Home, label: "Home" },
  { icon: Heart, label: "Matches" },
  { icon: Calendar, label: "Events" },
  { icon: User, label: "Profile" },
];

const NavRedesignComparison = () => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setShowAfter(false)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !showAfter ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          Before
        </button>
        <button
          onClick={() => setShowAfter(true)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            showAfter ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          }`}
        >
          After
        </button>
      </div>

      {/* Mock phone nav */}
      <div className="mx-auto max-w-xs rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs text-muted-foreground text-center font-medium">
            {showAfter ? "Streamlined: 4 icons" : "Original: 6 icons"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showAfter ? "after" : "before"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-around py-3 px-2"
          >
            {(showAfter ? afterIcons : beforeIcons).map((item, i) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <item.icon className="h-5 w-5 text-foreground" />
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="px-4 py-3 border-t border-border">
          <p className="text-xs text-center italic text-muted-foreground">
            {showAfter
              ? '"Much easier to navigate. I can find everything I need."'
              : '"The bottom bar feels cramped with too many icons."'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavRedesignComparison;
