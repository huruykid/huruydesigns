import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, FileText, Printer, ChevronDown, ChevronUp,
  Download, Check, X, Plus, Calculator,
  Home, Clock, Heart, MoreHorizontal, DollarSign,
} from "lucide-react";

// ── Brand ──────────────────────────────────────────────────────────────────
const TEAL = "#0d7a9c";
const TEAL_BG = "#e8f5f9";

// ── Donut data ─────────────────────────────────────────────────────────────
const SEGMENTS = [
  { label: "Take Home Pay", short: "Take Home",  pct: 67, amount: "$4,262.79", color: TEAL },
  { label: "Taxes",         short: "Taxes",       pct: 21, amount: "$1,334.70", color: "#e07b39" },
  { label: "Post-Tax Ded.", short: "Post-Tax",    pct: 5,  amount: "$317.54",   color: "#8b5cf6" },
  { label: "Pre-Tax Ded.",  short: "Pre-Tax",     pct: 7,  amount: "$444.56",   color: "#10b981" },
];

function buildArcs() {
  const r = 42, circ = 2 * Math.PI * r;
  let offset = 0;
  return SEGMENTS.map((seg) => {
    const dash = (seg.pct / 100) * circ;
    const arc = { dash, gap: circ - dash, offset, circ };
    offset += dash;
    return arc;
  });
}
const ARCS = buildArcs();

// ── Donut ──────────────────────────────────────────────────────────────────
function DonutChart({ active, onSelect }: { active: number | null; onSelect: (i: number | null) => void }) {
  const focused = active !== null ? SEGMENTS[active] : SEGMENTS[0];
  const R = 42, SIZE = 120;
  const center = SIZE / 2;

  return (
    <div className="flex flex-col items-center gap-3 px-4 py-3">
      {/* Chart */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {ARCS.map(({ dash, gap, offset, circ }, i) => (
            <motion.circle
              key={i}
              cx={center} cy={center} r={R}
              fill="none"
              stroke={SEGMENTS[i].color}
              strokeWidth={active === i ? 18 : 14}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
              opacity={active !== null && active !== i ? 0.18 : 1}
              style={{
                cursor: "pointer",
                transformOrigin: `${center}px ${center}px`,
                transform: "rotate(-90deg)",
                transition: "opacity 0.2s, stroke-width 0.18s",
              }}
              initial={{ strokeDashoffset: (-offset + dash) }}
              animate={{ strokeDashoffset: -offset }}
              transition={{ duration: 0.85, ease: "easeOut", delay: i * 0.1 }}
              onClick={() => onSelect(active === i ? null : i)}
            />
          ))}
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-semibold leading-tight text-center" style={{ fontSize: 9, color: focused.color, maxWidth: 48, textAlign: "center" }}>
            {focused.short}
          </span>
          <span className="font-bold" style={{ fontSize: 11, color: "#111" }}>
            {focused.amount}
          </span>
        </div>
      </div>

      {/* Legend pills — 2 column grid */}
      <div className="grid grid-cols-2 gap-1.5 w-full">
        {SEGMENTS.map((seg, i) => (
          <button
            key={i}
            onClick={() => onSelect(active === i ? null : i)}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-left transition-all"
            style={{
              background: active === i ? seg.color + "1a" : "#f5f5f5",
              border: `1.5px solid ${active === i ? seg.color : "#e5e7eb"}`,
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
            <div className="min-w-0">
              <p className="font-medium truncate" style={{ fontSize: 9, color: "#374151" }}>{seg.short}</p>
              <p className="font-bold" style={{ fontSize: 9, color: seg.color }}>{seg.pct}%</p>
            </div>
          </button>
        ))}
      </div>

      <button style={{ fontSize: 10, color: TEAL }} className="self-start font-semibold">
        View Compensation &amp; Rate →
      </button>
    </div>
  );
}

// ── Calc overlay ───────────────────────────────────────────────────────────
function CalcOverlay({ title, onClose }: { title: string; onClose: () => void }) {
  const [gross, setGross] = useState("");
  const result = gross ? `≈ $${(parseFloat(gross) * 0.72).toFixed(2)}` : null;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)" }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl mx-4 w-full max-w-[210px] overflow-hidden"
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="font-bold" style={{ fontSize: 12, color: "#111" }}>{title}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={13} />
          </button>
        </div>
        <div className="px-4 pb-4">
          <p style={{ fontSize: 10, color: "#6b7280" }} className="mb-2">Gross income per pay period</p>
          <input
            type="number"
            value={gross}
            onChange={(e) => setGross(e.target.value)}
            placeholder="e.g. 6350"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-teal-400"
            style={{ fontSize: 11 }}
          />
          {result ? (
            <div className="rounded-xl p-3 text-center" style={{ background: TEAL_BG }}>
              <p style={{ fontSize: 9, color: "#6b7280" }}>Estimated take-home</p>
              <p className="font-bold mt-0.5" style={{ fontSize: 15, color: TEAL }}>{result}</p>
            </div>
          ) : (
            <p style={{ fontSize: 10, color: "#9ca3af" }} className="text-center">Enter an amount above</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────
function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <span className="font-bold uppercase tracking-wide" style={{ fontSize: 9, color: "#9ca3af", letterSpacing: "0.08em" }}>
        {title}
      </span>
      {action && (
        <button className="font-semibold" style={{ fontSize: 10, color: TEAL }}>{action}</button>
      )}
    </div>
  );
}

// ── Card wrapper ───────────────────────────────────────────────────────────
function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-3 rounded-2xl bg-white overflow-hidden mb-3 ${className}`}
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)" }}>
      {children}
    </div>
  );
}

// ── Expandable row ─────────────────────────────────────────────────────────
function ListRow({
  icon, label, value, onClick, expanded, last = false,
}: {
  icon?: React.ReactNode; label: string; value?: string; onClick?: () => void; expanded?: boolean; last?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
      style={{
        minHeight: 44,
        borderBottom: last ? "none" : "1px solid #f0f0f0",
      }}
    >
      {icon && (
        <span className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0" style={{ background: TEAL_BG }}>
          <span style={{ color: TEAL }}>{icon}</span>
        </span>
      )}
      <span className="flex-1 font-medium" style={{ fontSize: 11, color: "#1f2937" }}>{label}</span>
      {value && <span className="font-bold shrink-0" style={{ fontSize: 11, color: TEAL }}>{value}</span>}
      {onClick && (
        expanded
          ? <ChevronUp size={12} className="text-gray-400 shrink-0 ml-1" />
          : <ChevronDown size={12} className="text-gray-400 shrink-0 ml-1" />
      )}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
interface PayModuleDemoProps {
  layout?: "mobile" | "desktop";
}

export default function PayModuleDemo({ layout = "mobile" }: PayModuleDemoProps) {
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
    { name: "Checking", pct: "80%" },
    { name: "Savings", pct: "10%" },
    { name: "Savings 2", pct: "10%" },
  ];
  const history = [
    { date: "Aug 31, 2024", amount: "$3,452.57" },
    { date: "Aug 15, 2024", amount: "$3,452.57" },
    { date: "Jul 31, 2024", amount: "$3,452.57" },
  ];
  const w2years = ["2022", "2021", "2020", "2019"];

  function handleDownloadW2(i: number) {
    if (downloadedW2.has(i) || downloadingW2 !== null) return;
    setDownloadingW2(i);
    setTimeout(() => {
      setDownloadingW2(null);
      setDownloadedW2((prev) => new Set(prev).add(i));
    }, 1200);
  }

  const navItems = [
    { icon: <Home size={15} />, label: "Home",     active: false },
    { icon: <Clock size={15} />, label: "Time",     active: false },
    { icon: <DollarSign size={15} />, label: "Pay", active: true  },
    { icon: <Heart size={15} />, label: "Benefits", active: false },
    { icon: <MoreHorizontal size={15} />, label: "More", active: false },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-gray-50 select-none" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── Status bar ──────────────────────────────────────── */}
      {layout === "mobile" && (
        <div
          className="flex items-center justify-between px-4 py-1.5 text-white shrink-0"
          style={{ background: TEAL, fontSize: 9 }}
        >
          <span className="font-semibold">9:41 AM</span>
          <div className="flex items-center gap-2 opacity-80">
            <span>●●●</span><span>WiFi</span><span>🔋</span>
          </div>
        </div>
      )}

      {/* ── App header ──────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-white shrink-0"
        style={{ background: TEAL }}
      >
        <div>
          <p className="font-bold" style={{ fontSize: 15 }}>Pay</p>
          <p className="opacity-70 mt-0.5" style={{ fontSize: 9.5 }}>View &amp; manage financial info</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white" style={{ fontSize: 12 }}>
          JD
        </div>
      </div>

      {/* ── Scrollable body ──────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-2" style={{ scrollbarWidth: "none" }}>

        {/* ── Pay card ──────────────────────────────────────── */}
        <div className="mx-3 mt-3 mb-3 rounded-2xl p-4" style={{ background: TEAL, color: "white" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="opacity-70 uppercase tracking-wide font-semibold" style={{ fontSize: 9 }}>
              Net Pay · Current Period
            </span>
            <button onClick={() => setSalaryVisible(v => !v)} className="opacity-70 hover:opacity-100">
              {salaryVisible ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {salaryVisible ? (
              <motion.p key="shown" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="font-bold mb-4 tracking-tight" style={{ fontSize: 26 }}>
                $4,262.79
              </motion.p>
            ) : (
              <motion.p key="hidden" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="font-bold mb-4 tracking-widest opacity-60" style={{ fontSize: 20 }}>
                ● ● ● ●
              </motion.p>
            )}
          </AnimatePresence>
          <div className="flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 bg-white/20 font-semibold hover:bg-white/30 transition-colors"
              style={{ fontSize: 10 }}
            >
              <FileText size={11} /> View Paystub
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2 bg-white/10 border border-white/30 font-semibold hover:bg-white/20 transition-colors"
              style={{ fontSize: 10 }}
            >
              <Printer size={11} /> Print
            </button>
          </div>
        </div>

        {/* ── Pay Breakdown ─────────────────────────────────── */}
        <SectionCard>
          <SectionHeader title="Pay Breakdown" />
          <div className="relative">
            <DonutChart active={activeSegment} onSelect={setActiveSegment} />
            <AnimatePresence>
              {activeCalc && (
                <CalcOverlay
                  title={activeCalc === "deductions" ? "Deductions Calculator" : "W-4 Calculator"}
                  onClose={() => setActiveCalc(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </SectionCard>

        {/* ── Calculators ───────────────────────────────────── */}
        <div className="mx-3 mb-3 grid grid-cols-2 gap-2">
          {[
            { key: "deductions" as const, label: "Deductions Calc", Icon: Calculator },
            { key: "w4" as const, label: "W-4 Calculator", Icon: FileText },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveCalc(key)}
              className="flex flex-col items-start rounded-2xl p-3 bg-white hover:bg-gray-50 transition-colors text-left"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)" }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-2" style={{ background: TEAL_BG }}>
                <Icon size={14} style={{ color: TEAL }} />
              </div>
              <p className="font-semibold leading-tight" style={{ fontSize: 10, color: "#374151" }}>{label}</p>
              <p className="font-bold mt-1" style={{ fontSize: 10, color: TEAL }}>Launch →</p>
            </button>
          ))}
        </div>

        {/* ── Pay Disbursement ──────────────────────────────── */}
        <SectionCard>
          <SectionHeader title="Pay Disbursement" action="View All" />
          {disbursements.map((d, i) => (
            <div key={i}>
              <ListRow
                label={d.name}
                value={d.pct}
                onClick={() => setExpandedDisb(expandedDisb === i ? null : i)}
                expanded={expandedDisb === i}
                last={i === disbursements.length - 1 && !showAddAlloc}
              />
              <AnimatePresence>
                {expandedDisb === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100">
                      <input
                        type="number"
                        defaultValue={parseInt(d.pct)}
                        className="border border-gray-200 rounded-lg px-2 py-1 focus:outline-none w-14 text-center"
                        style={{ fontSize: 11 }}
                      />
                      <span style={{ fontSize: 10, color: "#6b7280" }}>% allocation</span>
                      <button
                        className="ml-auto rounded-lg px-3 py-1 text-white font-semibold"
                        style={{ background: TEAL, fontSize: 10 }}
                      >
                        Save
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button
            onClick={() => setShowAddAlloc(v => !v)}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-50 border-t border-gray-100 transition-colors"
          >
            <Plus size={12} style={{ color: TEAL }} />
            <span className="font-semibold" style={{ fontSize: 10, color: TEAL }}>Add New Allocation</span>
          </button>
          <AnimatePresence>
            {showAddAlloc && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <input
                    value={allocName}
                    onChange={e => setAllocName(e.target.value)}
                    placeholder="Account name"
                    className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none"
                    style={{ fontSize: 11 }}
                  />
                  <div className="flex gap-2">
                    <input
                      value={allocPct}
                      onChange={e => setAllocPct(e.target.value)}
                      placeholder="% amount"
                      type="number"
                      className="border border-gray-200 rounded-lg px-3 py-2 flex-1 focus:outline-none"
                      style={{ fontSize: 11 }}
                    />
                    <button
                      className="rounded-lg px-4 py-2 text-white font-semibold"
                      style={{ background: TEAL, fontSize: 10 }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SectionCard>

        {/* ── Pay History ───────────────────────────────────── */}
        <SectionCard>
          <SectionHeader title="Pay History" action="View All" />
          {history.map((h, i) => (
            <div key={i}>
              <ListRow
                label={h.date}
                value={h.amount}
                onClick={() => setExpandedHistory(expandedHistory === i ? null : i)}
                expanded={expandedHistory === i}
                last={i === history.length - 1}
              />
              <AnimatePresence>
                {expandedHistory === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 space-y-1.5">
                      {[
                        { l: "Gross Pay", v: "$5,359.86" },
                        { l: "Taxes",     v: "−$1,334.70" },
                        { l: "Deductions",v: "−$372.57" },
                        { l: "Net Pay",   v: h.amount },
                      ].map(({ l, v }, j) => (
                        <div key={j} className="flex justify-between">
                          <span style={{ fontSize: 10, color: "#6b7280" }}>{l}</span>
                          <span
                            className="font-semibold"
                            style={{ fontSize: 10, color: j === 3 ? TEAL : "#374151" }}
                          >
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </SectionCard>

        {/* ── W-2s ──────────────────────────────────────────── */}
        <SectionCard>
          <SectionHeader title="W-2s" action="View Prior Years" />
          {w2years.map((yr, i) => (
            <div
              key={i}
              className="flex items-center px-4 hover:bg-gray-50 transition-colors"
              style={{
                minHeight: 44,
                borderBottom: i < w2years.length - 1 ? "1px solid #f0f0f0" : "none",
              }}
            >
              <span className="flex-1 font-medium" style={{ fontSize: 11, color: "#1f2937" }}>{yr} W-2</span>
              <button
                onClick={() => handleDownloadW2(i)}
                className="w-7 h-7 rounded-xl flex items-center justify-center transition-all"
                style={{ background: downloadedW2.has(i) ? "#d1fae5" : TEAL_BG }}
              >
                {downloadingW2 === i ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
                    <Download size={12} style={{ color: TEAL }} />
                  </motion.div>
                ) : downloadedW2.has(i) ? (
                  <Check size={12} style={{ color: "#10b981" }} />
                ) : (
                  <Download size={12} style={{ color: TEAL }} />
                )}
              </button>
            </div>
          ))}
        </SectionCard>

        {/* ── Marketplace ───────────────────────────────────── */}
        <SectionCard className="mb-4">
          <SectionHeader title="Marketplace" />
          <div className="px-4 pb-4">
            <div
              className="rounded-xl p-3"
              style={{ background: "linear-gradient(135deg, #0d7a9c 0%, #0a5f78 100%)", color: "white" }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold" style={{ fontSize: 12 }}>ZayZoon</p>
                  <p className="opacity-75 mt-0.5" style={{ fontSize: 9 }}>Wages in seconds</p>
                </div>
                <span className="font-bold rounded-lg px-2 py-0.5 bg-white/20" style={{ fontSize: 9 }}>
                  ⚡ Instant
                </span>
              </div>
              <p className="opacity-80 mb-3" style={{ fontSize: 9.5 }}>
                Access up to 50% of your earned wages before payday. No interest, no fees.
              </p>
              <AnimatePresence>
                {showZayZoon && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden opacity-70 mb-2"
                    style={{ fontSize: 9 }}
                  >
                    ZayZoon connects directly to your payroll, so you can withdraw your earned wages instantly. Repaid automatically on your next payday, no credit check required.
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="flex gap-2">
                <button
                  className="flex-1 rounded-lg py-1.5 bg-white font-bold text-center transition-colors"
                  style={{ fontSize: 10, color: TEAL }}
                >
                  Try It Now
                </button>
                <button
                  onClick={() => setShowZayZoon(v => !v)}
                  className="flex-1 rounded-lg py-1.5 bg-white/15 border border-white/30 font-semibold text-center transition-colors"
                  style={{ fontSize: 10, color: "white" }}
                >
                  {showZayZoon ? "Less" : "Learn More"}
                </button>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── Bottom nav — always visible ───────────────────── */}
      {layout === "mobile" && (
        <div
          className="shrink-0 flex items-center bg-white border-t border-gray-100"
          style={{ height: 52, boxShadow: "0 -1px 0 rgba(0,0,0,0.06)" }}
        >
          {navItems.map((item, i) => (
            <button
              key={i}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors"
              style={{ color: item.active ? TEAL : "#9ca3af" }}
            >
              {item.icon}
              <span className="font-medium" style={{ fontSize: 9, color: item.active ? TEAL : "#9ca3af" }}>
                {item.label}
              </span>
              {item.active && (
                <span className="w-1 h-1 rounded-full" style={{ background: TEAL }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
