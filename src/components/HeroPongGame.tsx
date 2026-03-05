import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import headshot from "@/assets/huruy-headshot.jpg";

interface Question {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    question: "What does Fitts's Law predict?",
    choices: ["Color preference", "Time to reach a target", "Reading speed"],
    correctIndex: 1,
    explanation: "Larger, closer targets are faster to click.",
  },
  {
    question: "What is a dark pattern?",
    choices: ["Low-contrast UI", "Deceptive design trick", "Dark mode theme"],
    correctIndex: 1,
    explanation: "Dark patterns manipulate users into unintended actions.",
  },
  {
    question: "Hick's Law says more options means…",
    choices: ["Faster decisions", "Longer decision time", "Better satisfaction"],
    correctIndex: 1,
    explanation: "More choices = more time to decide.",
  },
  {
    question: "What does 'affordance' mean in UX?",
    choices: ["Budget-friendly design", "A visual cue for interaction", "White space"],
    correctIndex: 1,
    explanation: "Affordances signal how an element can be used.",
  },
  {
    question: "What's the purpose of a usability test?",
    choices: ["Test server load", "Observe real user behavior", "Check pixel accuracy"],
    correctIndex: 1,
    explanation: "Watch real users to find real problems.",
  },
  {
    question: "Jakob's Law states users prefer…",
    choices: ["Unique layouts", "Sites that work like others they know", "Bright colors"],
    correctIndex: 1,
    explanation: "Users spend most time on other sites — match expectations.",
  },
  {
    question: "What is cognitive load?",
    choices: ["Page weight in KB", "Mental effort to use a UI", "Number of animations"],
    correctIndex: 1,
    explanation: "Reduce mental effort for better usability.",
  },
  {
    question: "The 'F-pattern' describes how users…",
    choices: ["Organize files", "Scan web pages", "Navigate mobile apps"],
    correctIndex: 1,
    explanation: "Eye-tracking shows users scan in an F-shape.",
  },
  {
    question: "What is progressive disclosure?",
    choices: ["Gradual animations", "Showing info only when needed", "Loading screens"],
    correctIndex: 1,
    explanation: "Reveal complexity gradually to reduce overwhelm.",
  },
  {
    question: "WCAG stands for…",
    choices: ["Web Content Accessibility Guidelines", "Web Color & Graphics", "Widget Configuration Guide"],
    correctIndex: 0,
    explanation: "WCAG sets the standard for accessible web content.",
  },
  {
    question: "What's the minimum contrast ratio for normal text (WCAG AA)?",
    choices: ["3:1", "4.5:1", "7:1"],
    correctIndex: 1,
    explanation: "4.5:1 is the AA standard for normal-sized text.",
  },
  {
    question: "What is a mental model?",
    choices: ["A wireframe prototype", "User's expectation of how things work", "A CSS framework"],
    correctIndex: 1,
    explanation: "Design should match users' existing mental models.",
  },
  {
    question: "The aesthetic-usability effect says…",
    choices: ["Pretty things seem easier to use", "Usability beats aesthetics", "Users ignore visuals"],
    correctIndex: 0,
    explanation: "Attractive designs are perceived as more usable.",
  },
  {
    question: "What is a heuristic evaluation?",
    choices: ["A/B testing", "Expert review against UX principles", "User survey"],
    correctIndex: 1,
    explanation: "Experts evaluate UI against established heuristics.",
  },
  {
    question: "The Von Restorff effect says we remember…",
    choices: ["The first item", "The item that stands out", "The last item"],
    correctIndex: 1,
    explanation: "Distinctive elements are more memorable.",
  },
];

const TITLES: { min: number; title: string; emoji: string }[] = [
  { min: 5, title: "Senior UX Architect", emoji: "🏆" },
  { min: 4, title: "UX Lead Material", emoji: "🌟" },
  { min: 3, title: "Solid Mid-Level", emoji: "💪" },
  { min: 2, title: "Junior Potential", emoji: "🌱" },
  { min: 0, title: "Intern Energy", emoji: "😅" },
];

const getTitle = (score: number) =>
  TITLES.find((t) => score >= t.min) || TITLES[TITLES.length - 1];

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const CONFETTI_COLORS = ["#f59e0b", "#ef4444", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

const ConfettiBurst: React.FC = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 280,
        y: (Math.random() - 0.5) * 280,
        rotate: Math.random() * 720 - 360,
        scale: Math.random() * 0.6 + 0.4,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: p.scale, rotate: p.rotate }}
          transition={{ duration: 1.4, delay: p.delay, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};

type Phase = "intro" | "question" | "answered" | "result";

const HeroPongGame: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionSet, setQuestionSet] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const startGame = useCallback(() => {
    setQuestionSet(shuffle(QUESTIONS).slice(0, 5));
    setCurrentIdx(0);
    setScore(0);
    setSelectedChoice(null);
    setPhase("question");
  }, []);

  const pickAnswer = useCallback(
    (choiceIdx: number) => {
      if (phase !== "question") return;
      setSelectedChoice(choiceIdx);
      if (choiceIdx === questionSet[currentIdx].correctIndex) {
        setScore((s) => s + 1);
      }
      setPhase("answered");
    },
    [phase, questionSet, currentIdx]
  );

  const nextQuestion = useCallback(() => {
    if (currentIdx + 1 >= 5) {
      setPhase("result");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedChoice(null);
      setPhase("question");
    }
  }, [currentIdx]);

  const q = questionSet[currentIdx];
  const isCorrect = selectedChoice === q?.correctIndex;
  const titleData = getTitle(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="hidden md:flex flex-col items-center shrink-0"
    >
      <div
        className="relative rounded-2xl overflow-hidden ring-4 ring-accent/30 shadow-2xl bg-background/50 backdrop-blur-sm flex flex-col items-center px-5 py-5 gap-3"
        style={{ width: 340, minHeight: 340 }}
      >
        {/* Headshot */}
        <motion.div
          animate={
            phase === "answered"
              ? isCorrect
                ? { scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }
                : { scale: [1, 0.9, 1], x: [0, -4, 4, -4, 0] }
              : phase === "result"
              ? { scale: [1, 1.1, 1] }
              : {}
          }
          transition={{ duration: 0.5 }}
          className="w-16 h-16 rounded-full overflow-hidden ring-3 ring-accent/40 shadow-lg relative shrink-0"
        >
          <img
            src={headshot}
            alt="Huruy"
            className={`w-full h-full object-cover object-top transition-all duration-300 ${
              phase === "answered" && !isCorrect ? "grayscale" : ""
            }`}
          />
          <AnimatePresence>
            {phase === "answered" && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -bottom-1 -right-1 text-lg"
              >
                {isCorrect ? "🎉" : "😬"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Title */}
        <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
          UX Trivia Challenge
        </p>

        {/* Content area */}
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            {/* INTRO */}
            {phase === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                <p className="text-sm text-foreground/80 leading-relaxed px-2">
                  Think you know UX? <br />
                  <span className="text-muted-foreground text-xs">
                    5 questions · earn your title
                  </span>
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="px-8 py-2 rounded-full bg-accent text-accent-foreground font-bold text-sm tracking-wide shadow-md"
                >
                  Start Quiz
                </motion.button>
              </motion.div>
            )}

            {/* QUESTION */}
            {(phase === "question" || phase === "answered") && q && (
              <motion.div
                key={`q-${currentIdx}`}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ duration: 0.35 }}
                className="w-full flex flex-col items-center gap-2"
              >
                {/* Progress */}
                <div className="flex gap-1.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        i < currentIdx
                          ? "bg-accent"
                          : i === currentIdx
                          ? "bg-accent/60 ring-2 ring-accent/30"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Question */}
                <p className="text-sm font-semibold text-foreground text-center leading-snug px-1">
                  {q.question}
                </p>

                {/* Choices */}
                <div className="flex flex-col gap-1.5 w-full mt-1">
                  {q.choices.map((choice, i) => {
                    const isSelected = selectedChoice === i;
                    const isRight = i === q.correctIndex;
                    let btnClass =
                      "w-full text-left px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ";

                    if (phase === "answered") {
                      if (isRight) {
                        btnClass += "border-green-500/50 bg-green-500/10 text-green-400";
                      } else if (isSelected && !isRight) {
                        btnClass += "border-destructive/50 bg-destructive/10 text-destructive";
                      } else {
                        btnClass += "border-border/30 bg-muted/20 text-muted-foreground/50";
                      }
                    } else {
                      btnClass +=
                        "border-border/50 bg-background/60 text-foreground/80 hover:border-accent/50 hover:bg-accent/5 cursor-pointer";
                    }

                    return (
                      <motion.button
                        key={i}
                        whileHover={phase === "question" ? { scale: 1.02 } : {}}
                        whileTap={phase === "question" ? { scale: 0.98 } : {}}
                        disabled={phase === "answered"}
                        onClick={() => pickAnswer(i)}
                        className={btnClass}
                      >
                        {choice}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation + Next */}
                <AnimatePresence>
                  {phase === "answered" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col items-center gap-2 w-full"
                    >
                      <p className="text-[11px] text-muted-foreground text-center italic px-2">
                        {q.explanation}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextQuestion}
                        className="px-6 py-1.5 rounded-full bg-accent text-accent-foreground font-bold text-xs shadow-sm"
                      >
                        {currentIdx + 1 >= 5 ? "See Results" : "Next →"}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* RESULT */}
            {phase === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3 text-center"
              >
                {score === 5 && <ConfettiBurst />}
                <span className="text-3xl">{titleData.emoji}</span>
                <div>
                  <p className="text-lg font-bold text-foreground">
                    {score}/5
                  </p>
                  <p className="text-sm font-semibold text-accent">
                    {titleData.title}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="px-6 py-2 rounded-full bg-accent text-accent-foreground font-bold text-xs shadow-md"
                >
                  Play Again
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Test your UX knowledge 🧠
      </p>
    </motion.div>
  );
};

export default HeroPongGame;
