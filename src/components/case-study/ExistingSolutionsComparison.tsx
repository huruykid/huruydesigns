import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Flame, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AppOption {
  id: string;
  name: string;
  tagline: string;
  icon: React.ReactNode;
  painPoints: string[];
}

const apps: AppOption[] = [
  {
    id: "tinder",
    name: "Tinder",
    tagline: "Swipe-based matching",
    icon: <Flame className="h-5 w-5" />,
    painPoints: [
      "No ethnicity or cultural background filters for Tigrayan users",
      "Superficial swiping ignores traditional matchmaking values",
      "Zero community features for cultural events or gatherings",
      "No safety measures for users affected by humanitarian crises",
    ],
  },
  {
    id: "bumble",
    name: "Bumble",
    tagline: "Women-first messaging",
    icon: <MessageCircle className="h-5 w-5" />,
    painPoints: [
      "Cultural preferences limited to broad categories, excluding Tigrayan identity",
      "Women-first approach doesn't integrate traditional courtship customs",
      "No event discovery for diaspora community meetups or festivals",
      "Generic safety tools lack crisis-aware verification features",
    ],
  },
  {
    id: "hinge",
    name: "Hinge",
    tagline: "Designed to be deleted",
    icon: <Heart className="h-5 w-5" />,
    painPoints: [
      "Prompt-based profiles can't capture deep cultural heritage and values",
      "Matching algorithm doesn't account for Shmagele-style compatibility",
      "No features for discovering Tigrayan cultural events nearby",
      "Lacks community-driven trust and authenticity verification",
    ],
  },
];

const culturalNeeds = [
  "Cultural identity filters",
  "Traditional matchmaking",
  "Community events",
  "Crisis-aware safety",
];

const ExistingSolutionsComparison = () => {
  const [selectedApp, setSelectedApp] = useState("tinder");

  const current = apps.find((a) => a.id === selectedApp)!;

  return (
    <div className="space-y-4">
      {/* App selector row */}
      <div className="grid grid-cols-3 gap-3">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => setSelectedApp(app.id)}
            className={`relative rounded-lg border p-4 text-left transition-all duration-200 ${
              selectedApp === app.id
                ? "border-destructive/50 bg-destructive/5 shadow-md"
                : "border-border bg-card hover:border-muted-foreground/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={selectedApp === app.id ? "text-destructive" : "text-muted-foreground"}>
                {app.icon}
              </span>
              <span className="font-bold text-foreground text-sm">{app.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{app.tagline}</p>
            {selectedApp === app.id && (
              <motion.div
                layoutId="app-indicator"
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-destructive rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Pain points panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-5 space-y-3">
              {current.painPoints.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 shrink-0 rounded-full bg-destructive/15 p-1">
                    <X className="h-3.5 w-3.5 text-destructive" />
                  </span>
                  <span className="text-sm text-muted-foreground">{point}</span>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3">
        <span className="text-sm font-semibold text-foreground mr-2">Cultural needs met:</span>
        {culturalNeeds.map((need, i) => (
          <Badge key={i} variant="outline" className="border-destructive/30 text-destructive gap-1 text-xs">
            <X className="h-3 w-3" />
            {need}
          </Badge>
        ))}
        <span className="ml-auto text-sm font-bold text-destructive">0 / 4</span>
      </div>
    </div>
  );
};

export default ExistingSolutionsComparison;
