import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import headshot from "@/assets/huruy-headshot.jpg";

type GameState = "idle" | "playing" | "gameover";

const CANVAS_W = 340;
const CANVAS_H = 340;
const PADDLE_W = 12;
const PADDLE_H = 70;
const BALL_R = 28;
const PADDLE_GAP = 18;
const BASE_SPEED = 3.5;

const UX_MISS_MESSAGES = [
  "Dark pattern detected!",
  "Jakob's Law violated!",
  "Where's the affordance?!",
  "Heuristic violation!",
  "Cognitive overload!",
  "No feedback loop!",
  "Fitts's Law broken!",
];

const UX_LABELS_LEFT = ["Empathy", "Research", "Clarity", "Ethics"];
const UX_LABELS_RIGHT = ["Usability", "Access", "Delight", "Intent"];

const HeroPongGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [missMsg, setMissMsg] = useState("");
  const [streak, setStreak] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const gameRef = useRef({
    ballX: CANVAS_W / 2,
    ballY: CANVAS_H / 2,
    dx: BASE_SPEED,
    dy: BASE_SPEED * 0.6,
    leftY: CANVAS_H / 2 - PADDLE_H / 2,
    rightY: CANVAS_H / 2 - PADDLE_H / 2,
    mouseY: CANVAS_H / 2,
    score: 0,
    streak: 0,
    speed: BASE_SPEED,
    flash: 0,
    labelIdx: 0,
  });

  // Load headshot image
  useEffect(() => {
    const img = new Image();
    img.src = headshot;
    img.onload = () => { imgRef.current = img; };
  }, []);

  const resetBall = useCallback(() => {
    const g = gameRef.current;
    g.ballX = CANVAS_W / 2;
    g.ballY = CANVAS_H / 2;
    g.dx = g.speed * (Math.random() > 0.5 ? 1 : -1);
    g.dy = g.speed * 0.6 * (Math.random() > 0.5 ? 1 : -1);
  }, []);

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.score = 0;
    g.streak = 0;
    g.speed = BASE_SPEED;
    g.flash = 0;
    g.labelIdx = 0;
    setScore(0);
    setStreak(0);
    setMissMsg("");
    setShowCelebration(false);
    resetBall();
    setGameState("playing");
  }, [resetBall]);

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      gameRef.current.mouseY = ((e.clientY - rect.top) / rect.height) * CANVAS_H;
    };
    canvas.addEventListener("mousemove", onMove);
    return () => canvas.removeEventListener("mousemove", onMove);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent").trim();
    const accentHSL = accentColor ? `hsl(${accentColor})` : "#f97316";
    const fgColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground").trim();
    const fgHSL = fgColor ? `hsl(${fgColor})` : "#fff";
    const mutedColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--muted-foreground").trim();
    const mutedHSL = mutedColor ? `hsl(${mutedColor})` : "#888";

    const loop = () => {
      const g = gameRef.current;

      // AI paddle (left) — follows ball with slight lag
      const leftTarget = g.ballY - PADDLE_H / 2;
      g.leftY += (leftTarget - g.leftY) * 0.06;
      g.leftY = Math.max(0, Math.min(CANVAS_H - PADDLE_H, g.leftY));

      // Player paddle (right)
      g.rightY = Math.max(0, Math.min(CANVAS_H - PADDLE_H, g.mouseY - PADDLE_H / 2));

      // Move ball
      g.ballX += g.dx;
      g.ballY += g.dy;

      // Top/bottom bounce
      if (g.ballY - BALL_R <= 0 || g.ballY + BALL_R >= CANVAS_H) {
        g.dy = -g.dy;
        g.ballY = Math.max(BALL_R, Math.min(CANVAS_H - BALL_R, g.ballY));
      }

      // Left paddle collision
      if (
        g.ballX - BALL_R <= PADDLE_GAP + PADDLE_W &&
        g.ballY >= g.leftY &&
        g.ballY <= g.leftY + PADDLE_H &&
        g.dx < 0
      ) {
        g.dx = -g.dx;
        g.ballX = PADDLE_GAP + PADDLE_W + BALL_R;
        g.score++;
        g.streak++;
        g.speed += 0.12;
        g.dx = g.dx > 0 ? g.speed : -g.speed;
        setScore(g.score);
        setStreak(g.streak);
        if (g.streak % 5 === 0 && g.streak > 0) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 1200);
        }
      }

      // Right paddle collision
      if (
        g.ballX + BALL_R >= CANVAS_W - PADDLE_GAP - PADDLE_W &&
        g.ballY >= g.rightY &&
        g.ballY <= g.rightY + PADDLE_H &&
        g.dx > 0
      ) {
        g.dx = -g.dx;
        g.ballX = CANVAS_W - PADDLE_GAP - PADDLE_W - BALL_R;
        g.score++;
        g.streak++;
        g.speed += 0.12;
        g.dx = g.dx > 0 ? g.speed : -g.speed;
        setScore(g.score);
        setStreak(g.streak);
        if (g.streak % 5 === 0 && g.streak > 0) {
          setShowCelebration(true);
          setTimeout(() => setShowCelebration(false), 1200);
        }
      }

      // Miss — ball goes off left or right
      if (g.ballX < -BALL_R || g.ballX > CANVAS_W + BALL_R) {
        g.flash = 8;
        g.labelIdx = (g.labelIdx + 1) % UX_LABELS_LEFT.length;
        const msg = UX_MISS_MESSAGES[Math.floor(Math.random() * UX_MISS_MESSAGES.length)];
        setMissMsg(msg);
        setStreak(0);
        g.streak = 0;
        setGameState("gameover");
        return;
      }

      // --- Draw ---
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Flash on miss
      if (g.flash > 0) {
        ctx.fillStyle = `rgba(239,68,68,${g.flash * 0.03})`;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        g.flash--;
      }

      // Center line
      ctx.setLineDash([6, 8]);
      ctx.strokeStyle = mutedHSL;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(CANVAS_W / 2, 0);
      ctx.lineTo(CANVAS_W / 2, CANVAS_H);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      // Paddles
      const drawPaddle = (x: number, y: number, label: string) => {
        ctx.fillStyle = accentHSL;
        ctx.beginPath();
        const r = 6;
        ctx.roundRect(x, y, PADDLE_W, PADDLE_H, r);
        ctx.fill();
        // Label
        ctx.save();
        ctx.translate(x + PADDLE_W / 2, y + PADDLE_H / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = fgHSL;
        ctx.font = "bold 9px 'Space Grotesk', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = 0.7;
        ctx.fillText(label, 0, 0);
        ctx.restore();
      };

      const li = g.labelIdx % UX_LABELS_LEFT.length;
      drawPaddle(PADDLE_GAP, g.leftY, UX_LABELS_LEFT[li]);
      drawPaddle(CANVAS_W - PADDLE_GAP - PADDLE_W, g.rightY, UX_LABELS_RIGHT[li]);

      // Ball (headshot)
      ctx.save();
      ctx.beginPath();
      ctx.arc(g.ballX, g.ballY, BALL_R, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      if (imgRef.current) {
        ctx.drawImage(
          imgRef.current,
          g.ballX - BALL_R,
          g.ballY - BALL_R,
          BALL_R * 2,
          BALL_R * 2
        );
      } else {
        ctx.fillStyle = accentHSL;
        ctx.fill();
      }
      ctx.restore();

      // Ball ring
      ctx.strokeStyle = accentHSL;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(g.ballX, g.ballY, BALL_R + 1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Score
      ctx.fillStyle = fgHSL;
      ctx.font = "bold 14px 'Space Grotesk', sans-serif";
      ctx.textAlign = "right";
      ctx.globalAlpha = 0.6;
      ctx.fillText(`${g.score}`, CANVAS_W - 12, 22);
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [gameState]);

  // Draw idle state
  useEffect(() => {
    if (gameState !== "idle" && gameState !== "gameover") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
      // Draw headshot centered
      const cx = CANVAS_W / 2;
      const cy = CANVAS_H / 2 - (gameState === "gameover" ? 15 : 0);
      const r = 60;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      if (imgRef.current) {
        ctx.drawImage(imgRef.current, cx - r, cy - r, r * 2, r * 2);
      }
      ctx.restore();

      // Ring
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent").trim();
      const accentHSL = accentColor ? `hsl(${accentColor})` : "#f97316";
      const fgColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--foreground").trim();
      const fgHSL = fgColor ? `hsl(${fgColor})` : "#fff";

      ctx.strokeStyle = accentHSL;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, r + 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Text
      ctx.fillStyle = fgHSL;
      ctx.font = "bold 13px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";

      if (gameState === "gameover") {
        ctx.fillText(`Score: ${score}`, cx, cy + r + 28);
        ctx.globalAlpha = 0.6;
        ctx.font = "12px 'Space Grotesk', sans-serif";
        ctx.fillText("Click to play again", cx, cy + r + 48);
        ctx.globalAlpha = 1;
        // Miss message
        if (missMsg) {
          ctx.fillStyle = "#ef4444";
          ctx.font = "bold 11px 'Space Grotesk', sans-serif";
          ctx.fillText(missMsg, cx, cy - r - 16);
        }
      } else {
        ctx.globalAlpha = 0.6;
        ctx.font = "12px 'Space Grotesk', sans-serif";
        ctx.fillText("Click to play UX Pong", cx, cy + r + 28);
        ctx.globalAlpha = 1;
      }
    };

    // Wait for image
    if (imgRef.current) {
      draw();
    } else {
      const check = setInterval(() => {
        if (imgRef.current) { draw(); clearInterval(check); }
      }, 50);
      return () => clearInterval(check);
    }
  }, [gameState, score, missMsg]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="hidden md:block shrink-0 relative"
    >
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 text-accent font-bold text-sm whitespace-nowrap"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          ✨ Pixel perfect! ✨
        </motion.div>
      )}
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        onClick={() => {
          if (gameState === "idle" || gameState === "gameover") startGame();
        }}
        className="rounded-2xl ring-4 ring-accent/30 shadow-2xl cursor-pointer bg-background/50 backdrop-blur-sm"
        style={{ width: CANVAS_W, height: CANVAS_H }}
      />
    </motion.div>
  );
};

export default HeroPongGame;
