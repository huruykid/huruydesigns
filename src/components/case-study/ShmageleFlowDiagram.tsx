import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Search, Heart, BarChart, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Invite Matchmaker",
    description:
      "User invites a trusted community elder or family member to act as their Shmagele — a traditional matchmaker who knows them personally.",
  },
  {
    icon: Search,
    title: "Matchmaker Reviews Profiles",
    description:
      "The Shmagele browses a curated set of compatible profiles, filtering by shared cultural values, background, and preferences.",
  },
  {
    icon: Heart,
    title: "Suggest a Match",
    description:
      "The matchmaker sends a curated suggestion along with a personal note explaining why this match could work.",
  },
  {
    icon: BarChart,
    title: "Shmagele Score Calculated",
    description:
      "The app computes a compatibility score based on shared values, cultural alignment, and the matchmaker's endorsement.",
  },
  {
    icon: CheckCircle,
    title: "Review Match",
    description:
      "The user sees the match card with the Shmagele Score, compatibility breakdown, and the matchmaker's personal note.",
  },
];

const ShmageleFlowDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative py-4">
      {/* Vertical connector line */}
      <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-accent/30" />

      {/* Progress fill */}
      <motion.div
        className="absolute left-5 top-8 w-0.5 bg-accent origin-top"
        initial={{ height: 0 }}
        animate={{
          height: `${(activeStep / (steps.length - 1)) * 100}%`,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        style={{ maxHeight: "calc(100% - 4rem)" }}
      />

      <div className="space-y-2">
        {steps.map((step, i) => {
          const isActive = i === activeStep;
          const isCompleted = i < activeStep;
          const Icon = step.icon;

          return (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="relative flex items-start gap-4 w-full text-left group"
            >
              {/* Step indicator */}
              <motion.div
                className={`relative z-10 flex items-center justify-center shrink-0 rounded-full w-10 h-10 border-2 transition-colors duration-200 ${
                  isActive
                    ? "border-accent bg-accent text-accent-foreground"
                    : isCompleted
                      ? "border-accent bg-accent/20 text-accent"
                      : "border-border bg-card text-muted-foreground group-hover:border-accent/50"
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Icon className="h-4 w-4" />
              </motion.div>

              {/* Step content */}
              <div
                className={`flex-1 rounded-lg border p-3 transition-all duration-200 ${
                  isActive
                    ? "border-accent/40 bg-accent/5 shadow-sm"
                    : "border-transparent group-hover:border-border"
                }`}
              >
                <span
                  className={`text-sm font-semibold block ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </span>

                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-xs text-muted-foreground mt-1 overflow-hidden"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShmageleFlowDiagram;
