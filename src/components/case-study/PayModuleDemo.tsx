import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  FileText,
  Printer,
  ChevronDown,
  ChevronUp,
  Download,
  Check,
  X,
  Search,
  Bell,
  User,
  Plus,
  Calculator,
  Landmark,
  PiggyBank,
  Zap,
} from "lucide-react";

// ── Brand colours (OneAsure teal) ──────────────────────────────────────────
const TEAL = "#0d7a9c";
const TEAL_LIGHT = "#e6f4f8";
const TEAL_MID = "#1a6e8e";

// ── Donut chart data ───────────────────────────────────────────────────────
const SEGMENTS = [
  { label: "Take Home Pay", pct: 67, amount: "$4,262.79", color: TEAL },
  { label: "Taxes", pct: 21, amount: "$1,334.70", color: "#e07b39" },
  { label: "Post-Tax Ded.", pct: 5, amount: "$317.54", color: "#8b5cf6" },
  { label: "Pre-Tax Ded.", pct: 7, amount: "$444.56", color: "#10b981" },
];

function buildArcs(segments: typeof SEGMENTS) {
  const r = 52;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  return segments.map((seg) => {
    const dash = (seg.pct / 100) * circumference;
    const arc = { dash, gap: circumference - dash, offset, seg };
    offset += dash;
    return arc;
  });
}

const arcs = buildArcs(SEGMENTS);

function DonutChart({ active, onSelect }: { active: number | null; onSelect: (i: number | null) => void }) {
  const r = 52;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * r;

  const activeSegment = active !== null ? SEGMENTS[active] : SEGMENTS[0];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: 140, height: 140 }}>
        <svg width={140} height={140} viewBox="0 0 140 140">
          {arcs.map(({ dash, gap, offset, seg }, i) => {
            const dim = active !== null && active !== i;
            return (
              <motion.circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth={active === i ? 18 : 14}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                opacity={dim ? 0.25 : 1}
                style={{ cursor: "pointer", transformOrigin: `${cx}px ${cy}px`, transform: "rotate(-90deg)", transition: "opacity 0.2s, stroke-width 0.2s" }}
                initial={{ strokeDashoffset: -offset + dash }}
                animate={{ strokeDashoffset: -offset }}
                transition={{ duration: 1, ease: "easeOut", delay: i * 0.15 }}
                onClick={() => onSelect(active === i ? null : i)}
              />
            );
          })}
        </svg>
        {/* Centre label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[9px] font-semibold text-center leading-tight" style={{ color: activeSegment.color, maxWidth: 60, textAlign: "center" }}>
            {activeSegment.label}
          </span>
          <span className="text-[11px] font-bold mt-0.5" style={{ color: "#111" }}>
            {activeSegment.amount}
          </span>
        </div>
      </div>

      {/* Legend pills */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 w-full px-1">
        {SEGMENTS.map((seg, i) => (
          <button
            key={i}
            onClick={() => onSelect(active === i ? null : i)}
            className="flex items-center gap-1.5 text-left rounded-full px-2 py-0.5 transition-all"
            style={{
              background: active === i ? seg.color + "22" : "transparent",
              border: `1px solid ${active === i ? seg.color : "#e5e7eb"}`,
            }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: seg.color }} />
            <span className="text-[9px] font-medium text-gray-700 truncate">{seg.label}</span>
          </button>
        ))}
      </div>

      <button className="text-[9px] font-semibold mt-0.5" style={{ color: TEAL }}>
        View Compensation &amp; Rate →
      </button>
    </div>
  );
}

// ── Micro calculator overlay ───────────────────────────────────────────────
function CalcOverlay({ title, onClose }: { title: string; onClose: () => void }) {
  const [gross, setGross] = useState("");
  const result = gross ? `≈ $${(parseFloat(gross) * 0.72).toFixed(2)}` : null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="absolute inset-0 z-20 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-4 mx-4 w-full max-w-[200px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-gray-800">{title}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={13} />
          </button>
        </div>
        <label className="block text-[9px] text-gray-500 mb-1">Gross Income / pay period</label>
        <input
          type="number"
          value={gross}
          onChange={(e) => setGross(e.target.value)}
          placeholder="e.g. 6350"
          className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs mb-2 focus:outline-none focus:border-teal-400"
        />
        {result && (
          <div className="rounded-lg p-2 text-center" style={{ background: TEAL_LIGHT }}>
            <p className="text-[9px] text-gray-500">Estimated take-home</p>
            <p className="text-sm font-bold" style={{ color: TEAL }}>
              {result}
            </p>
          </div>
        )}
        {!result && (
          <p className="text-[9px] text-gray-400 text-center">Enter an amount to calculate</p>
        )}
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function PayModuleDemo() {
  const [salaryVisible, setSalaryVisible] = useState(false);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [activeCalc, setActiveCalc] = useState<"deductions" | "w4" | null>(null);
  const [expandedDisb, setExpandedDisb] = useState<number | null>(null);
  const [showAddAlloc, setShowAddAlloc] = useState(false);
  const [expandedHistory, setExpandedHistory] = useState<number | null>(null);
  const [downloadedW2, setDownloadedW2] = useState<Set<number>>(new Set());
  const [downloadingW2, setDownloadingW2] = useState<number | null>(null);
  const [showZayZoon, setShowZayZoon] = useState(false);
  const [allocName, setAllocName] = useState("");
  const [allocPct, setAllocPct] = useState("");

  const disbursements = [
    { name: "Checking", icon: <Landmark size={10} />, pct: "80%" },
    { name: "Savings", icon: <PiggyBank size={10} />, pct: "10%" },
    { name: "Savings 2", icon: <PiggyBank size={10} />, pct: "10%" },
  ];

  const history = [
    { date: "Aug 31", amount: "$3,452.57" },
    { date: "Aug 30", amount: "$3,452.57" },
    { date: "Jul 31", amount: "$3,452.57" },
  ];

  const w2years = ["2022", "2021", "2020", "2019"];

  function handleDownloadW2(i: number) {
    if (downloadedW2.has(i)) return;
    setDownloadingW2(i);
    setTimeout(() => {
      setDownloadingW2(null);
      setDownloadedW2((prev) => new Set(prev).add(i));
    }, 1100);
  }

  return (
    <div className="relative w-full bg-gray-50 text-gray-800 font-sans select-none" style={{ fontSize: 11 }}>
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-2.5 text-white" style={{ background: TEAL }}>
        <div>
          <p className="font-bold text-[12px] leading-none">Pay</p>
          <p className="text-[8px] opacity-80 mt-0.5">View &amp; Manage financial info</p>
        </div>
        <div className="flex gap-2">
          <Search size={13} />
          <Bell size={13} />
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <User size={10} />
          </div>
        </div>
      </div>

      {/* ── Pay Card ─────────────────────────────────────────────── */}
      <div className="mx-3 mt-3 rounded-xl p-3 shadow-sm" style={{ background: TEAL_LIGHT, border: `1px solid ${TEAL}22` }}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-[9px] text-gray-500 uppercase tracking-wide font-semibold">Net Pay · Current Period</p>
          <button onClick={() => setSalaryVisible((v) => !v)} className="text-gray-400 hover:text-gray-600 transition-colors">
            {salaryVisible ? <EyeOff size={11} /> : <Eye size={11} />}
          </button>
        </div>
        <AnimatePresence mode="wait">
          {salaryVisible ? (
            <motion.p key="shown" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xl font-bold mb-2.5" style={{ color: TEAL }}>
              $4,262.79
            </motion.p>
          ) : (
            <motion.p key="hidden" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xl font-bold mb-2.5 tracking-widest" style={{ color: TEAL }}>
              ●●●●●
            </motion.p>
          )}
        </AnimatePresence>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-[9px] font-semibold text-white transition-opacity hover:opacity-90" style={{ background: TEAL }}>
            <FileText size={9} /> View Paystub
          </button>
          <button className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-[9px] font-semibold border transition-opacity hover:opacity-70" style={{ color: TEAL, borderColor: TEAL }}>
            <Printer size={9} /> Print Paystub
          </button>
        </div>
      </div>

      {/* ── Pay Breakdown ────────────────────────────────────────── */}
      <div className="mx-3 mt-3 rounded-xl p-3 shadow-sm bg-white relative overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
        <p className="text-[10px] font-bold text-gray-700 mb-2">Pay Breakdown</p>
        <DonutChart active={activeSegment} onSelect={setActiveSegment} />

        {/* Calculator overlays */}
        <AnimatePresence>
          {activeCalc && (
            <CalcOverlay title={activeCalc === "deductions" ? "Deductions Calculator" : "W-4 Calculator"} onClose={() => setActiveCalc(null)} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Calculators ──────────────────────────────────────────── */}
      <div className="mx-3 mt-3 grid grid-cols-2 gap-2">
        {[
          { key: "deductions" as const, label: "Deductions Calculator", Icon: Calculator },
          { key: "w4" as const, label: "W-4 Calculator", Icon: FileText },
        ].map(({ key, label, Icon }) => (
          <div key={key} className="rounded-xl p-2.5 bg-white shadow-sm" style={{ border: "1px solid #e5e7eb" }}>
            <div className="flex items-center justify-center w-7 h-7 rounded-lg mb-2" style={{ background: TEAL_LIGHT }}>
              <Icon size={13} style={{ color: TEAL }} />
            </div>
            <p className="text-[9px] font-semibold text-gray-700 mb-1 leading-tight">{label}</p>
            <button
              onClick={() => setActiveCalc(key)}
              className="text-[9px] font-bold px-2 py-1 rounded-lg text-white w-full transition-opacity hover:opacity-90"
              style={{ background: TEAL }}
            >
              Launch
            </button>
          </div>
        ))}
      </div>

      {/* ── Pay Disbursement ─────────────────────────────────────── */}
      <div className="mx-3 mt-3 rounded-xl bg-white shadow-sm overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
        <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
          <p className="text-[10px] font-bold text-gray-700">Pay Disbursement</p>
          <button className="text-[9px] font-semibold" style={{ color: TEAL }}>View All</button>
        </div>
        {disbursements.map((d, i) => (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors"
              style={{ borderTop: i > 0 ? "1px solid #f3f4f6" : undefined }}
              onClick={() => setExpandedDisb(expandedDisb === i ? null : i)}
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{d.icon}</span>
                <span className="text-[10px] font-medium">{d.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold" style={{ color: TEAL }}>{d.pct}</span>
                {expandedDisb === i ? <ChevronUp size={9} className="text-gray-400" /> : <ChevronDown size={9} className="text-gray-400" />}
              </div>
            </button>
            <AnimatePresence>
              {expandedDisb === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-2.5 pt-1 bg-gray-50 flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={parseInt(d.pct)}
                      className="w-14 border border-gray-200 rounded-lg px-1.5 py-1 text-[10px] focus:outline-none focus:border-teal-400"
                    />
                    <span className="text-[9px] text-gray-500">% allocation</span>
                    <button className="ml-auto text-[9px] font-bold px-2 py-1 rounded-lg text-white" style={{ background: TEAL }}>Save</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div className="border-t border-gray-100">
          <button
            onClick={() => setShowAddAlloc((v) => !v)}
            className="w-full flex items-center gap-1.5 px-3 py-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={10} style={{ color: TEAL }} />
            <span className="text-[9px] font-semibold" style={{ color: TEAL }}>Add New Allocation</span>
          </button>
          <AnimatePresence>
            {showAddAlloc && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-3 pb-3 pt-1 bg-gray-50 flex flex-col gap-1.5">
                  <input value={allocName} onChange={(e) => setAllocName(e.target.value)} placeholder="Account name" className="w-full border border-gray-200 rounded-lg px-2 py-1 text-[10px] focus:outline-none" />
                  <input value={allocPct} onChange={(e) => setAllocPct(e.target.value)} type="number" placeholder="%" className="w-full border border-gray-200 rounded-lg px-2 py-1 text-[10px] focus:outline-none" />
                  <button className="text-[9px] font-bold px-2 py-1 rounded-lg text-white" style={{ background: TEAL }}>Add</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Pay History ──────────────────────────────────────────── */}
      <div className="mx-3 mt-3 rounded-xl bg-white shadow-sm overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
        <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
          <p className="text-[10px] font-bold text-gray-700">Pay History</p>
          <button className="text-[9px] font-semibold" style={{ color: TEAL }}>View Full</button>
        </div>
        {history.map((h, i) => (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors"
              style={{ borderTop: "1px solid #f3f4f6" }}
              onClick={() => setExpandedHistory(expandedHistory === i ? null : i)}
            >
              <span className="text-[10px] font-medium">{h.date}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-gray-700">{h.amount}</span>
                {expandedHistory === i ? <ChevronUp size={9} className="text-gray-400" /> : <ChevronDown size={9} className="text-gray-400" />}
              </div>
            </button>
            <AnimatePresence>
              {expandedHistory === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-3 pb-2.5 pt-1 bg-gray-50 space-y-1">
                    {[
                      { label: "Gross Pay", value: "$6,344.06" },
                      { label: "Taxes", value: "−$1,334.70" },
                      { label: "Net Pay", value: "$3,452.57" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between">
                        <span className="text-[9px] text-gray-500">{row.label}</span>
                        <span className="text-[9px] font-semibold text-gray-700">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* ── W-2s ─────────────────────────────────────────────────── */}
      <div className="mx-3 mt-3 rounded-xl bg-white shadow-sm overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
        <div className="flex items-center justify-between px-3 pt-2.5 pb-1">
          <p className="text-[10px] font-bold text-gray-700">W-2s</p>
          <button className="text-[9px] font-semibold" style={{ color: TEAL }}>View Prior Years</button>
        </div>
        {w2years.map((yr, i) => (
          <div key={yr} className="flex items-center justify-between px-3 py-2" style={{ borderTop: "1px solid #f3f4f6" }}>
            <span className="text-[10px] font-medium">{yr} W-2</span>
            <button
              onClick={() => handleDownloadW2(i)}
              className="flex items-center gap-1 text-[9px] font-semibold px-2 py-1 rounded-lg transition-all"
              style={{
                background: downloadedW2.has(i) ? "#d1fae5" : TEAL_LIGHT,
                color: downloadedW2.has(i) ? "#059669" : TEAL,
              }}
            >
              {downloadingW2 === i ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}>
                  <Download size={9} />
                </motion.div>
              ) : downloadedW2.has(i) ? (
                <Check size={9} />
              ) : (
                <Download size={9} />
              )}
              {downloadedW2.has(i) ? "Saved" : "Download"}
            </button>
          </div>
        ))}
      </div>

      {/* ── Marketplace ──────────────────────────────────────────── */}
      <div className="mx-3 mt-3 mb-4 rounded-xl bg-white shadow-sm overflow-hidden" style={{ border: "1px solid #e5e7eb" }}>
        <div className="px-3 pt-2.5 pb-1">
          <p className="text-[10px] font-bold text-gray-700">Marketplace</p>
        </div>
        <div className="px-3 pb-3">
          <div className="rounded-xl p-2.5" style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)" }}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "#f59e0b" }}>
                <Zap size={12} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-white leading-none">ZayZoon</p>
                <p className="text-[8px] text-gray-400 mt-0.5">Wages in seconds</p>
              </div>
            </div>
            <AnimatePresence>
              {showZayZoon && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="text-[8px] text-gray-300 mb-2 leading-relaxed overflow-hidden"
                >
                  Access up to 50% of your earned wages before payday. No interest, no fees. Instantly deposited to your bank account.
                </motion.p>
              )}
            </AnimatePresence>
            <div className="flex gap-2 mt-1">
              <button className="flex-1 rounded-lg py-1 text-[9px] font-bold text-white" style={{ background: "#f59e0b" }}>
                Try It Now
              </button>
              <button
                onClick={() => setShowZayZoon((v) => !v)}
                className="flex-1 rounded-lg py-1 text-[9px] font-semibold text-gray-300 border border-gray-600 hover:border-gray-400 transition-colors"
              >
                {showZayZoon ? "Less Info" : "Learn More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
