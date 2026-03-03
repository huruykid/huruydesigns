import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import headshot from "@/assets/huruy-headshot.jpg";

const CANVAS_W = 340;
const CANVAS_H = 340;
const PADDLE_W = 12;
const PADDLE_H = 70;
const BALL_R = 28;
const PADDLE_GAP = 18;
const BASE_SPEED = 3.5;

const UX_LABELS_LEFT = ["Empathy", "Clarity", "Consistency", "Feedback"];
const UX_LABELS_RIGHT = ["Usability", "Affordance", "Hierarchy", "Accessibility"];
const MISS_MESSAGES = [
  "Dark pattern detected!",
  "Jakob's Law violated!",
  "Where's the affordance?!",
  "Heuristic violation!",
  "Cognitive overload!",
  "No feedback loop!",
];
const STREAK_MSG = "Pixel perfect! 🎯";

type GameState = "idle" | "playing" | "over";

const HeroPongGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState({ player: 0, ai: 0 });
  const [missMsg, setMissMsg] = useState("");
  const [streakMsg, setStreakMsg] = useState("");
  const stateRef = useRef<any>(null);

  // Load headshot image
  useEffect(() => {
    const img = new Image();
    img.src = headshot;
    img.onload = () => { imgRef.current = img; };
  }, []);

  const resetBall = useCallback((toRight: boolean) => ({
    x: CANVAS_W / 2,
    y: CANVAS_H / 2,
    vx: (toRight ? 1 : -1) * BASE_SPEED,
    vy: (Math.random() - 0.5) * 4,
  }), []);

  const startGame = useCallback(() => {
    setGameState("playing");
    setScore({ player: 0, ai: 0 });
    setMissMsg("");
    setStreakMsg("");
    stateRef.current = {
      ball: resetBall(true),
      leftY: CANVAS_H / 2 - PADDLE_H / 2,
      rightY: CANVAS_H / 2 - PADDLE_H / 2,
      mouseY: CANVAS_H / 2,
      streak: 0,
      speed: BASE_SPEED,
      labelIdxL: 0,
      labelIdxR: 0,
      playerScore: 0,
      aiScore: 0,
    };
  }, [resetBall]);

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e: MouseEvent) => {
      if (!stateRef.current) return;
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mouseY = ((e.clientY - rect.top) / rect.height) * CANVAS_H;
    };
    canvas.addEventListener("mousemove", onMove);
    return () => canvas.removeEventListener("mousemove", onMove);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const loop = () => {
      const s = stateRef.current;
      if (!s) return;

      // Move right paddle (player)
      const targetR = Math.max(0, Math.min(CANVAS_H - PADDLE_H, s.mouseY - PADDLE_H / 2));
      s.rightY += (targetR - s.rightY) * 0.15;

      // AI left paddle
      const targetL = s.ball.y - PADDLE_H / 2 + (Math.random() - 0.5) * 20;
      s.leftY += (Math.max(0, Math.min(CANVAS_H - PADDLE_H, targetL)) - s.leftY) * 0.06;

      // Move ball
      s.ball.x += s.ball.vx;
      s.ball.y += s.ball.vy;

      // Top/bottom bounce
      if (s.ball.y - BALL_R < 0) { s.ball.y = BALL_R; s.ball.vy *= -1; }
      if (s.ball.y + BALL_R > CANVAS_H) { s.ball.y = CANVAS_H - BALL_R; s.ball.vy *= -1; }

      // Right paddle hit
      if (
        s.ball.vx > 0 &&
        s.ball.x + BALL_R >= CANVAS_W - PADDLE_GAP - PADDLE_W &&
        s.ball.y >= s.rightY && s.ball.y <= s.rightY + PADDLE_H
      ) {
        s.ball.vx = -Math.abs(s.ball.vx) - 0.15;
        s.ball.vy += (s.ball.y - (s.rightY + PADDLE_H / 2)) * 0.12;
        s.ball.x = CANVAS_W - PADDLE_GAP - PADDLE_W - BALL_R;
        s.streak++;
        s.speed += 0.1;
        s.labelIdxR = (s.labelIdxR + 1) % UX_LABELS_RIGHT.length;
        if (s.streak === 5 || s.streak === 10 || s.streak === 15) {
          setStreakMsg(STREAK_MSG);
          setTimeout(() => setStreakMsg(""), 1500);
        }
      }

      // Left paddle hit
      if (
        s.ball.vx < 0 &&
        s.ball.x - BALL_R <= PADDLE_GAP + PADDLE_W &&
        s.ball.y >= s.leftY && s.ball.y <= s.leftY + PADDLE_H
      ) {
        s.ball.vx = Math.abs(s.ball.vx) + 0.15;
        s.ball.vy += (s.ball.y - (s.leftY + PADDLE_H / 2)) * 0.12;
        s.ball.x = PADDLE_GAP + PADDLE_W + BALL_R;
        s.labelIdxL = (s.labelIdxL + 1) % UX_LABELS_LEFT.length;
      }

      // Scoring
      if (s.ball.x + BALL_R < 0) {
        s.playerScore++;
        setScore({ player: s.playerScore, ai: s.aiScore });
        s.streak = 0;
        Object.assign(s.ball, resetBall(false));
        if (s.playerScore >= 5) { setGameState("over"); return; }
      }
      if (s.ball.x - BALL_R > CANVAS_W) {
        s.aiScore++;
        setScore({ player: s.playerScore, ai: s.aiScore });
        s.streak = 0;
        const msg = MISS_MESSAGES[Math.floor(Math.random() * MISS_MESSAGES.length)];
        setMissMsg(msg);
        setTimeout(() => setMissMsg(""), 2000);
        Object.assign(s.ball, resetBall(true));
        if (s.aiScore >= 5) { setGameState("over"); return; }
      }

      // — Draw —
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Dotted center line
      ctx.setLineDash([6, 8]);
      ctx.strokeStyle = "hsl(var(--accent) / 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(CANVAS_W / 2, 0);
      ctx.lineTo(CANVAS_W / 2, CANVAS_H);
      ctx.stroke();
      ctx.setLineDash([]);

      // Paddles
      const drawPaddle = (x: number, y: number, label: string) => {
        const radius = 6;
        ctx.fillStyle = "hsl(var(--accent))";
        ctx.beginPath();
        ctx.roundRect(x, y, PADDLE_W, PADDLE_H, radius);
        ctx.fill();

        // Label
        ctx.save();
        ctx.translate(x + PADDLE_W / 2, y + PADDLE_H / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = "hsl(var(--accent-foreground))";
        ctx.font = "bold 8px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label.toUpperCase(), 0, 0);
        ctx.restore();
      };

      drawPaddle(PADDLE_GAP, s.leftY, UX_LABELS_LEFT[s.labelIdxL]);
      drawPaddle(CANVAS_W - PADDLE_GAP - PADDLE_W, s.rightY, UX_LABELS_RIGHT[s.labelIdxR]);

      // Ball (headshot)
      ctx.save();
      ctx.beginPath();
      ctx.arc(s.ball.x, s.ball.y, BALL_R, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      if (imgRef.current) {
        ctx.drawImage(
          imgRef.current,
          s.ball.x - BALL_R,
          s.ball.y - BALL_R,
          BALL_R * 2,
          BALL_R * 2
        );
      } else {
        ctx.fillStyle = "hsl(var(--accent))";
        ctx.fill();
      }
      ctx.restore();

      // Ball ring
      ctx.strokeStyle = "hsl(var(--accent) / 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(s.ball.x, s.ball.y, BALL_R, 0, Math.PI * 2);
      ctx.stroke();

      // Score
      ctx.fillStyle = "hsl(var(--muted-foreground))";
      ctx.font = "bold 16px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${s.aiScore}`, CANVAS_W / 2 - 30, 28);
      ctx.fillText(`${s.playerScore}`, CANVAS_W / 2 + 30, 28);

      ctx.font = "9px 'Space Grotesk', sans-serif";
      ctx.fillText("AI", CANVAS_W / 2 - 30, 42);
      ctx.fillText("YOU", CANVAS_W / 2 + 30, 42);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gameState, resetBall]);

  // Draw idle state
  useEffect(() => {
    if (gameState !== "idle" && gameState !== "over") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const drawIdle = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Draw headshot centered
      if (imgRef.current) {
        const r = 60;
        ctx.save();
        ctx.beginPath();
        ctx.arc(CANVAS_W / 2, CANVAS_H / 2 - 10, r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(imgRef.current, CANVAS_W / 2 - r, CANVAS_H / 2 - 10 - r, r * 2, r * 2);
        ctx.restore();

        ctx.strokeStyle = "hsl(var(--accent) / 0.4)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(CANVAS_W / 2, CANVAS_H / 2 - 10, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Decorative paddles
      ctx.fillStyle = "hsl(var(--accent) / 0.3)";
      ctx.beginPath();
      ctx.roundRect(PADDLE_GAP, CANVAS_H / 2 - PADDLE_H / 2, PADDLE_W, PADDLE_H, 6);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(CANVAS_W - PADDLE_GAP - PADDLE_W, CANVAS_H / 2 - PADDLE_H / 2, PADDLE_W, PADDLE_H, 6);
      ctx.fill();

      // Text
      ctx.fillStyle = "hsl(var(--foreground))";
      ctx.font = "bold 14px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";

      if (gameState === "over") {
        ctx.fillText(
          score.player > score.ai ? "You win! 🎉" : "Game over!",
          CANVAS_W / 2,
          CANVAS_H / 2 + 70
        );
        ctx.fillStyle = "hsl(var(--muted-foreground))";
        ctx.font = "12px 'Space Grotesk', sans-serif";
        ctx.fillText(`${score.ai} – ${score.player}`, CANVAS_W / 2, CANVAS_H / 2 + 90);
        ctx.fillText("Click to play again", CANVAS_W / 2, CANVAS_H / 2 + 112);
      } else {
        ctx.fillText("UX Pong", CANVAS_W / 2, CANVAS_H / 2 + 70);
        ctx.fillStyle = "hsl(var(--muted-foreground))";
        ctx.font = "12px 'Space Grotesk', sans-serif";
        ctx.fillText("Click to play", CANVAS_W / 2, CANVAS_H / 2 + 90);
      }
    };

    // Wait for image
    if (imgRef.current) {
      drawIdle();
    } else {
      const interval = setInterval(() => {
        if (imgRef.current) { drawIdle(); clearInterval(interval); }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [gameState, score]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="hidden md:flex flex-col items-center shrink-0"
    >
      <div className="relative rounded-2xl overflow-hidden ring-4 ring-accent/30 shadow-2xl cursor-pointer bg-background/50 backdrop-blur-sm">
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          onClick={() => {
            if (gameState === "idle" || gameState === "over") startGame();
          }}
          className="block"
          style={{ width: CANVAS_W, height: CANVAS_H }}
        />

        {/* Overlay messages */}
        {missMsg && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <span className="bg-destructive/90 text-destructive-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
              {missMsg}
            </span>
          </motion.div>
        )}

        {streakMsg && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none"
          >
            <span className="bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-lg">
              {streakMsg}
            </span>
          </motion.div>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        {gameState === "playing" ? "Move mouse to control right paddle" : "A little game for you 🎮"}
      </p>
    </motion.div>
  );
};

export default HeroPongGame;
