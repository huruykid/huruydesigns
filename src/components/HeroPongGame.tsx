import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/huruy-headshot.jpg";

const SYMBOLS = [
  { label: "Empathy", emoji: "💛" },
  { label: "Usability", emoji: "🎯" },
  { label: "Accessibility", emoji: "♿" },
  { label: "Hierarchy", emoji: "📐" },
  { label: "Consistency", emoji: "🔗" },
  { label: "Feedback", emoji: "💬" },
  { label: "Affordance", emoji: "👆" },
  { label: "Clarity", emoji: "💎" },
];

const ROASTS = [
  "Inconsistent design tokens!",
  "Jakob is disappointed 😤",
  "Where's the user research?",
  "Dark pattern alert! 🚨",
  "Cognitive overload detected!",
  "No error states? Bold move.",
];

const ITEM_H = 56;
const VISIBLE_ITEMS = 1;
const REEL_H = ITEM_H * VISIBLE_ITEMS;
const SPIN_CYCLES = 3;

type GameState = "idle" | "spinning" | "result";

const getRandomIndex = () => Math.floor(Math.random() * SYMBOLS.length);

const Reel: React.FC<{
  finalIndex: number;
  spinning: boolean;
  delay: number;
  onStop?: () => void;
}> = ({ finalIndex, spinning, delay, onStop }) => {
  // Build a long strip: multiple full cycles + land on finalIndex
  const strip = React.useMemo(() => {
    const items: typeof SYMBOLS = [];
    for (let c = 0; c < SPIN_CYCLES; c++) {
      items.push(...SYMBOLS);
    }
    items.push(SYMBOLS[finalIndex]);
    return items;
  }, [finalIndex]);

  const totalDistance = -(strip.length - 1) * ITEM_H;

  return (
    <div
      className="relative overflow-hidden rounded-lg border border-accent/20 bg-background/80"
      style={{ height: REEL_H, width: 90 }}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: spinning ? totalDistance : 0 }}
        transition={
          spinning
            ? { duration: 1.2 + delay, ease: [0.2, 0.8, 0.3, 1], delay: 0 }
            : { duration: 0 }
        }
        onAnimationComplete={() => {
          if (spinning && onStop) onStop();
        }}
        className="flex flex-col"
      >
        {(spinning ? strip : [SYMBOLS[finalIndex]]).map((sym, i) => (
          <div
            key={`${sym.label}-${i}`}
            className="flex flex-col items-center justify-center shrink-0"
            style={{ height: ITEM_H }}
          >
            <span className="text-xl leading-none">{sym.emoji}</span>
            <span className="text-[10px] font-bold text-foreground/80 mt-1 tracking-wide">
              {sym.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const HeroPongGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [results, setResults] = useState([0, 1, 2]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"win" | "partial" | "lose">("lose");
  const stoppedCount = useRef(0);
  const [spins, setSpins] = useState(0);

  const evaluateResult = useCallback((r: number[]) => {
    const labels = r.map((i) => SYMBOLS[i].label);
    if (labels[0] === labels[1] && labels[1] === labels[2]) {
      setMessage("Perfect Design System! 🎯");
      setMessageType("win");
    } else if (labels[0] === labels[1] || labels[1] === labels[2] || labels[0] === labels[2]) {
      setMessage("Almost pixel-perfect! ✨");
      setMessageType("partial");
    } else {
      setMessage(ROASTS[Math.floor(Math.random() * ROASTS.length)]);
      setMessageType("lose");
    }
  }, []);

  const spin = useCallback(() => {
    const newResults = [getRandomIndex(), getRandomIndex(), getRandomIndex()];
    setResults(newResults);
    setMessage("");
    stoppedCount.current = 0;
    setGameState("spinning");
    setSpins((s) => s + 1);

    // After all reels stop
    const totalTime = (1.2 + 0.8) * 1000 + 200; // longest reel + buffer
    setTimeout(() => {
      evaluateResult(newResults);
      setGameState("result");
    }, totalTime);
  }, [evaluateResult]);

  const reelDelays = [0, 0.3, 0.6];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="hidden md:flex flex-col items-center shrink-0"
    >
      <div className="relative rounded-2xl overflow-hidden ring-4 ring-accent/30 shadow-2xl bg-background/50 backdrop-blur-sm flex flex-col items-center px-6 py-5 gap-3" style={{ width: 340, minHeight: 340 }}>
        {/* Headshot */}
        <div className="relative">
          <motion.div
            animate={
              gameState === "result"
                ? messageType === "win"
                  ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
                  : messageType === "lose"
                  ? { scale: [1, 0.95, 1] }
                  : {}
                : {}
            }
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-full overflow-hidden ring-3 ring-accent/40 shadow-lg"
          >
            <img
              src={headshot}
              alt="Huruy"
              className={`w-full h-full object-cover transition-all duration-300 ${
                gameState === "result" && messageType === "lose" ? "grayscale" : ""
              }`}
            />
          </motion.div>
          <AnimatePresence>
            {gameState === "result" && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -bottom-1 -right-1 text-lg"
              >
                {messageType === "win" ? "🎉" : messageType === "partial" ? "🤔" : "😬"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Title */}
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
          UX Slot Machine
        </p>

        {/* Reels */}
        <div className="flex gap-2 items-center">
          {results.map((finalIdx, i) => (
            <Reel
              key={`${spins}-${i}`}
              finalIndex={finalIdx}
              spinning={gameState === "spinning"}
              delay={reelDelays[i]}
            />
          ))}
        </div>

        {/* Spin Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={gameState === "spinning"}
          onClick={spin}
          className="px-8 py-2 rounded-full bg-accent text-accent-foreground font-bold text-sm tracking-wide shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {gameState === "spinning" ? "Spinning..." : gameState === "result" ? "Spin Again" : "SPIN"}
        </motion.button>

        {/* Result Message */}
        <div className="h-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                key={message}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`text-sm font-semibold text-center ${
                  messageType === "win"
                    ? "text-green-400"
                    : messageType === "partial"
                    ? "text-accent"
                    : "text-destructive"
                }`}
              >
                {message}
              </motion.p>
            )}
            {gameState === "idle" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-muted-foreground"
              >
                Spin to test your UX luck 🎰
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        A little game for you 🎮
      </p>
    </motion.div>
  );
};

export default HeroPongGame;
