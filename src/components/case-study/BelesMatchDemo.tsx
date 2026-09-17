import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";

const matches = [
  { name: "Berhane", color: "#c2185b" },
  { name: "Selam", color: "#7b1fa2" },
  { name: "Dawit", color: "#1565c0" },
  { name: "Tigist", color: "#2e7d32" },
];

const BelesMatchDemo = () => {
  const [matchIndex, setMatchIndex] = useState(0);
  const [sent, setSent] = useState(false);

  const match = matches[matchIndex];

  const handleSayKemey = () => setSent(true);

  const handleKeepSwiping = () => {
    setSent(false);
    setMatchIndex((prev) => (prev + 1) % matches.length);
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(180deg, #1a0a0e 0%, #2d1520 40%, #1a0a0e 100%)",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Status bar */}
      <div style={{ width: "100%", padding: "6px 12px", display: "flex", justifyContent: "space-between", fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
        <span>9:41</span>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 14, height: 8, border: "1px solid rgba(255,255,255,0.5)", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", left: 1, top: 1, bottom: 1, right: 4, background: "rgba(255,255,255,0.5)", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Background hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0.5 }}
          animate={{
            opacity: [0, 0.15, 0],
            y: [20, -60],
            scale: [0.5, 1],
          }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
          style={{
            position: "absolute",
            left: `${15 + i * 14}%`,
            top: "30%",
            color: "#d4a055",
            pointerEvents: "none",
          }}
        >
          <Heart size={12} fill="currentColor" />
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!sent ? (
          <motion.div
            key={`match-${matchIndex}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 20px 20px", flex: 1, justifyContent: "center" }}
          >
            {/* Match text */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: "center", marginBottom: 24 }}
            >
              <div style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: "#d4a055", marginBottom: 4 }}>✦ BELES ✦</div>
              <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, background: "linear-gradient(135deg, #d4a055, #f0d08c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                It's a match!
              </h2>
              <p style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                You and {match.name} liked each other
              </p>
            </motion.div>

            {/* Overlapping avatars */}
            <div style={{ position: "relative", width: 120, height: 70, marginBottom: 28 }}>
              <motion.div
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                style={{
                  position: "absolute", left: 8, top: 0,
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg, #d4a055, #c08a3a)",
                  border: "3px solid #1a0a0e",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 700, color: "#fff",
                }}
              >
                Y
              </motion.div>
              <motion.div
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3, type: "spring" }}
                style={{
                  position: "absolute", right: 8, top: 0,
                  width: 56, height: 56, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${match.color}, ${match.color}dd)`,
                  border: "3px solid #1a0a0e",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, fontWeight: 700, color: "#fff",
                }}
              >
                {match.name[0]}
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                style={{
                  position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
                  background: "#d4a055", borderRadius: "50%", width: 22, height: 22,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid #1a0a0e", zIndex: 2,
                }}
              >
                <Heart size={10} fill="#fff" color="#fff" />
              </motion.div>
            </div>

            {/* Buttons */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSayKemey}
              style={{
                width: "80%", padding: "10px 0", borderRadius: 24, border: "none",
                background: "linear-gradient(135deg, #d4a055, #c08a3a)",
                color: "#1a0a0e", fontSize: 12, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 4px 16px rgba(212,160,85,0.3)",
                marginBottom: 10,
              }}
            >
              <MessageCircle size={12} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} />
              Say Kemey 👋
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleKeepSwiping}
              style={{
                width: "80%", padding: "9px 0", borderRadius: 24,
                background: "transparent", color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 11, fontWeight: 600, cursor: "pointer",
              }}
            >
              Keep Swiping
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, padding: "20px", textAlign: "center" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
              style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "linear-gradient(135deg, #d4a055, #c08a3a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 16, boxShadow: "0 4px 20px rgba(212,160,85,0.4)",
              }}
            >
              <MessageCircle size={22} color="#1a0a0e" />
            </motion.div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#d4a055", margin: 0 }}>Kemey sent!</h3>
            <p style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 6, lineHeight: 1.4 }}>
              {match.name} will see your greeting.<br />Good things take time ✨
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleKeepSwiping}
              style={{
                marginTop: 24, padding: "9px 28px", borderRadius: 24,
                background: "transparent", color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
                fontSize: 11, fontWeight: 600, cursor: "pointer",
              }}
            >
              Keep Swiping
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BelesMatchDemo;
