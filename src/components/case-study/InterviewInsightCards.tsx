import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Lightbulb, RotateCcw } from "lucide-react";

interface InsightCard {
  participant: string;
  quote: string;
  theme: string;
  insight: string;
}

const insights: InsightCard[] = [
  {
    participant: "P3, Female, 26",
    quote: "I stopped using dating apps because none of them understand what matters to me culturally. I want someone who knows what Shmagele means.",
    theme: "Cultural Identity",
    insight: "Mainstream dating apps fail to reflect Tigrayan values, creating a gap that Beles can uniquely fill.",
  },
  {
    participant: "P5, Male, 32",
    quote: "My parents met through a Shmagele. I trust that process more than swiping, but I also want the convenience of technology.",
    theme: "Tradition + Tech",
    insight: "Users want a digital bridge between traditional matchmaking and modern convenience, not a replacement for either.",
  },
  {
    participant: "P1, Female, 19",
    quote: "Honestly, I just want to meet other Tigrayans my age. Dating is secondary. I need community first.",
    theme: "Community Need",
    insight: "A significant portion of users prioritize platonic connection, validating the need for a 'Just Friends' mode.",
  },
  {
    participant: "P7, Male, 55",
    quote: "I would use this if I felt it was safe and respectful. Too many apps feel like they commodify people.",
    theme: "Trust & Safety",
    insight: "Older diaspora members value dignity and respect in UX. Tone and language choices matter as much as features.",
  },
];

const InterviewInsightCards = () => {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-muted-foreground text-center">Click a card to reveal the insight</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insights.map((card, i) => {
          const isFlipped = flippedIndex === i;

          return (
            <button
              key={i}
              onClick={() => toggleFlip(i)}
              className="relative text-left rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent/50 min-h-[160px]"
              aria-label={`${isFlipped ? "Hide" : "Reveal"} insight for ${card.theme}`}
            >
              <AnimatePresence mode="wait">
                {!isFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ opacity: 0, rotateY: -90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: 90 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 flex flex-col h-full"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {card.participant}
                      </span>
                      <Quote className="h-3.5 w-3.5 text-accent/60" />
                    </div>
                    <p className="text-sm text-foreground italic leading-relaxed flex-1">
                      "{card.quote}"
                    </p>
                    <span className="mt-3 inline-flex self-start rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                      {card.theme}
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 flex flex-col h-full bg-accent/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5 text-accent" />
                        <span className="text-xs font-semibold text-accent">Key Insight</span>
                      </div>
                      <RotateCcw className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed flex-1">
                      {card.insight}
                    </p>
                    <span className="mt-3 inline-flex self-start rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-semibold text-accent">
                      {card.theme}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewInsightCards;
