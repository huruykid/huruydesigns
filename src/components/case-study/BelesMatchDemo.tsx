import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";

/**
 * Static preview of the Beles match moment. Clicking anywhere opens the live
 * app (belesconnect.app) in a new tab instead of running an in-page demo.
 */
const LIVE_URL =
  "https://belesconnect.app?utm_source=portfolio&utm_medium=case_study&utm_campaign=beles_demo";

const BelesMatchDemo = () => (
  <a
    href={LIVE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Open the live Beles app in a new tab"
    style={{
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(180deg, #0a0a0a 0%, #141414 40%, #0a0a0a 100%)",
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      textDecoration: "none",
      cursor: "pointer",
    }}
  >
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
        animate={{ opacity: [0, 0.15, 0], y: [20, -60], scale: [0.5, 1] }}
        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
        style={{ position: "absolute", left: `${15 + i * 14}%`, top: "30%", color: "#facc15", pointerEvents: "none" }}
      >
        <Heart size={12} fill="currentColor" />
      </motion.div>
    ))}

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "22px 20px 16px", flex: 1, justifyContent: "center", width: "100%" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 8, letterSpacing: 3, textTransform: "uppercase", color: "#facc15", marginBottom: 4 }}>✦ BELES ✦</div>
        <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: "#facc15" }}>It's a match!</h2>
        <p style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
          The feeling is mutual with Hiwet, 29
        </p>
        <p style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
          Los Angeles, CA · Roots: Adwa, Tigray
        </p>
      </div>

      {/* Overlapping avatars */}
      <div style={{ position: "relative", width: 120, height: 70, marginBottom: 16 }}>
        <div style={{
          position: "absolute", left: 8, top: 0,
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, #facc15, #eab308)",
          border: "3px solid #0a0a0a",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, fontWeight: 700, color: "#0a0a0a",
        }}>
          Y
        </div>
        <div style={{
          position: "absolute", right: 8, top: 0,
          width: 56, height: 56, borderRadius: "50%",
          background: "linear-gradient(135deg, #c2185b, #c2185bdd)",
          border: "3px solid #0a0a0a",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, fontWeight: 700, color: "#0a0a0a",
        }}>
          H
        </div>
        <div style={{
          position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
          background: "#facc15", borderRadius: "50%", width: 22, height: 22,
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "2px solid #0a0a0a", zIndex: 2,
        }}>
          <Heart size={10} fill="#0a0a0a" color="#0a0a0a" />
        </div>
      </div>

      {/* Shmagele suggestion card */}
      <div style={{
        width: "85%", borderRadius: 12, marginBottom: 14,
        border: "1px solid rgba(250,204,21,0.35)",
        background: "rgba(250,204,21,0.1)",
        padding: "8px 10px", textAlign: "left",
      }}>
        <p style={{ fontSize: 7, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#facc15", margin: 0 }}>
          Shmagele Aster suggested them
        </p>
        <p style={{ fontSize: 9, lineHeight: 1.4, color: "rgba(255,255,255,0.75)", margin: "4px 0 0" }}>
          "She keeps the family jebena. You two will talk for hours."
        </p>
      </div>

      {/* Open-live-app button */}
      <div style={{
        width: "80%", padding: "10px 0", borderRadius: 24,
        background: "linear-gradient(135deg, #facc15, #eab308)",
        color: "#0a0a0a", fontSize: 12, fontWeight: 800, textAlign: "center",
        boxShadow: "0 4px 16px rgba(250,204,21,0.3)",
      }}>
        <ArrowUpRight size={12} style={{ display: "inline", verticalAlign: -2, marginRight: 4 }} />
        Try it live
      </div>
    </div>
  </a>
);

export default BelesMatchDemo;
