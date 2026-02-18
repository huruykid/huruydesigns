import { useState } from "react";
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
  Home,
  Clock,
  Briefcase,
  Heart,
  MoreHorizontal,
} from "lucide-react";

// ── Brand colours ─────────────────────────────────────────────────────────
const T = "#0d7a9c";          // primary teal
const TL = "#e8f5f9";         // teal light bg
const DIV = "#f0f0f0";        // divider

// ── Type scale (all in px, applied via style) ────────────────────────────
// Section label: 9px bold  |  Body row: 9px  |  Sub-label: 8px  |  Amount: 10px bold

// ── Donut chart ───────────────────────────────────────────────────────────
const SEGMENTS = [
  { label: "Take Home Pay",  pct: 67, amount: "$4,262.79", color: T },
  { label: "Taxes",          pct: 21, amount: "$1,334.70", color: "#e07b39" },
  { label: "Post-Tax Ded.",  pct: 5,  amount: "$317.54",   color: "#8b5cf6" },
  { label: "Pre-Tax Ded.",   pct: 7,  amount: "$444.56",   color: "#10b981" },
];

function buildArcs() {
  const r = 38, cx = 50, cy = 50;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return SEGMENTS.map((seg) => {
    const dash = (seg.pct / 100) * circ;
    const arc = { dash, gap: circ - dash, offset, seg, circ };
    offset += dash;
    return arc;
  });
}
const arcs = buildArcs();

function DonutChart({ active, onSelect }: { active: number | null; onSelect: (i: number | null) => void }) {
  const activeSeg = active !== null ? SEGMENTS[active] : SEGMENTS[0];
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Chart */}
      <div className="relative shrink-0" style={{ width: 110, height: 110 }}>
        <svg width={110} height={110} viewBox="0 0 110 110">
          {arcs.map(({ dash, gap, offset, seg, circ }, i) => (
            <motion.circle
              key={i}
              cx={55} cy={55} r={40}
              fill="none"
              stroke={seg.color}
              strokeWidth={active === i ? 15 : 12}
              strokeDasharray={`${dash * (40 / 38)} ${gap * (40 / 38)}`}
              strokeDashoffset={-offset * (40 / 38)}
              strokeLinecap="butt"
              opacity={active !== null && active !== i ? 0.2 : 1}
              style={{ cursor: "pointer", transformOrigin: "55px 55px", transform: "rotate(-90deg)", transition: "opacity 0.18s, stroke-width 0.18s" }}
              initial={{ strokeDashoffset: (-offset + dash) * (40 / 38) }}
              animate={{ strokeDashoffset: -offset * (40 / 38) }}
              transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.12 }}
              onClick={() => onSelect(active === i ? null : i)}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-semibold leading-none text-center" style={{ fontSize: 7, color: activeSeg.color, maxWidth: 42, textAlign: "center" }}>
            {activeSeg.label}
          </span>
          <span className="font-bold mt-0.5" style={{ fontSize: 9, color: "#111" }}>
            {activeSeg.amount}
          </span>
        </div>
      </div>

      {/* Legend — under the chart */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-1 w-full">
        {SEGMENTS.map((seg, i) => (
          <button
            key={i}
            onClick={() => onSelect(active === i ? null : i)}
            className="flex items-center gap-1.5 text-left rounded px-1.5 py-1 transition-all"
            style={{
              background: active === i ? seg.color + "18" : "#f9fafb",
              border: `1px solid ${active === i ? seg.color : "#e5e7eb"}`,
            }}
          >
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: seg.color }} />
            <span className="font-medium truncate" style={{ fontSize: 8, color: "#374151" }}>{seg.label}</span>
            <span className="ml-auto font-bold shrink-0" style={{ fontSize: 8, color: seg.color }}>{seg.pct}%</span>
          </button>
        ))}
      </div>

      <button style={{ fontSize: 8, color: T }} className="self-start font-semibold">
        View Compensation &amp; Rate →
      </button>
    </div>
  );
}

// ── Calc overlay ──────────────────────────────────────────────────────────
function CalcOverlay({ title, onClose }: { title: string; onClose: () => void }) {
  const [gross, setGross] = useState("");
  const result = gross ? `≈ $${(parseFloat(gross) * 0.72).toFixed(2)}` : null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="absolute inset-0 z-30 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <div className="bg-white rounded-xl shadow-2xl mx-3 w-full max-w-[190px] p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold" style={{ fontSize: 10, color: "#111" }}>{title}</span>
          <button onClick={onClose} className="text-gray-400"><X size={11} /></button>
        </div>
        <p style={{ fontSize: 8, color: "#6b7280" }} className="mb-1">Gross income / pay period</p>
        <input
          type="number"
          value={gross}
          onChange={(e) => setGross(e.target.value)}
          placeholder="e.g. 6350"
          className="w-full border border-gray-200 rounded-lg px-2 py-1 mb-2 focus:outline-none"
          style={{ fontSize: 9 }}
        />
        {result ? (
          <div className="rounded-lg p-2 text-center" style={{ background: TL }}>
            <p style={{ fontSize: 8, color: "#6b7280" }}>Estimated take-home</p>
            <p className="font-bold" style={{ fontSize: 12, color: T }}>{result}</p>
          </div>
        ) : (
          <p style={{ fontSize: 8, color: "#9ca3af" }} className="text-center">Enter an amount above</p>
        )}
      </div>
    </motion.div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────
function Section({ title, action, children }: { title: string; action?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white overflow-hidden" style={{ borderBottom: `1px solid ${DIV}` }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: `1px solid ${DIV}` }}>
        <span className="font-bold" style={{ fontSize: 9.5, color: "#374151" }}>{title}</span>
        {action && <button className="font-semibold" style={{ fontSize: 8.5, color: T }}>{action}</button>}
      </div>
      {children}
    </div>
  );
}

// ── Row component ──────────────────────────────────────────────────────────
function Row({
  left, right, sub, onClick, expanded, icon,
}: {
  left: React.ReactNode; right?: React.ReactNode; sub?: string; onClick?: () => void; expanded?: boolean; icon?: React.ReactNode;
}) {
  return (
    <button
      className="w-full flex items-center gap-2.5 px-4 hover:bg-gray-50 transition-colors text-left"
      style={{ height: 38, borderTop: `1px solid ${DIV}` }}
      onClick={onClick}
    >
      {icon && <span className="text-gray-400 flex items-center shrink-0">{icon}</span>}
      <span style={{ fontSize: 9.5, color: "#374151" }} className="flex-1 font-medium truncate">{left}</span>
      {sub && <span style={{ fontSize: 8.5, color: "#9ca3af" }} className="shrink-0">{sub}</span>}
      {right && <span className="font-bold shrink-0" style={{ fontSize: 9.5, color: T }}>{right}</span>}
      {onClick && (
        expanded
          ? <ChevronUp size={10} className="text-gray-400 shrink-0" />
          : <ChevronDown size={10} className="text-gray-400 shrink-0" />
      )}
    </button>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────
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
    { name: "Checking", icon: <Landmark size={9} />, pct: "80%" },
    { name: "Savings", icon: <PiggyBank size={9} />, pct: "10%" },
    { name: "Savings 2", icon: <PiggyBank size={9} />, pct: "10%" },
  ];
  const history = [
    { date: "Aug 31, 2024", amount: "$3,452.57" },
    { date: "Aug 15, 2024", amount: "$3,452.57" },
    { date: "Jul 31, 2024", amount: "$3,452.57" },
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

  const navItems = [
    { icon: <Home size={13} />, label: "Home", active: false },
    { icon: <Clock size={13} />, label: "Time", active: false },
    { icon: <FileText size={13} />, label: "Pay", active: true },
    { icon: <Heart size={13} />, label: "Benefits", active: false },
    { icon: <MoreHorizontal size={13} />, label: "More", active: false },
  ];

  return (
    <div className="relative flex flex-col w-full h-full bg-gray-50 select-none overflow-hidden" style={{ fontSize: 10 }}>

      {/* ── Status bar ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-1 text-white shrink-0" style={{ background: T, fontSize: 8 }}>
        <span className="font-semibold">9:41 AM</span>
        <div className="flex items-center gap-2 opacity-80">
          <span>●●●</span>
          <span>WiFi</span>
          <span>100%</span>
        </div>
      </div>

      {/* ── App header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-3 py-2 text-white shrink-0" style={{ background: T }}>
        <div>
          <p className="font-bold leading-none" style={{ fontSize: 11 }}>Pay</p>
          <p className="opacity-75 mt-0.5" style={{ fontSize: 7.5 }}>View &amp; manage your financial info</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Search size={12} />
          <Bell size={12} />
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <User size={9} />
          </div>
        </div>
      </div>

      {/* ── Scrollable body ─────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto" style={{ scrollbarWidth: "none" }}>

        {/* Pay Card */}
        <div className="mx-3 mt-3 mb-2.5 rounded-xl p-4" style={{ background: TL, border: `1px solid ${T}30` }}>
          <div className="flex items-center justify-between mb-1.5">
            <span style={{ fontSize: 8.5, color: "#6b7280" }} className="uppercase tracking-wide font-semibold">Net Pay · Current Period</span>
            <button onClick={() => setSalaryVisible((v) => !v)} className="text-gray-400">
              {salaryVisible ? <EyeOff size={11} /> : <Eye size={11} />}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {salaryVisible ? (
              <motion.p key="shown" initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="font-bold mb-3" style={{ fontSize: 20, color: T }}>
                $4,262.79
              </motion.p>
            ) : (
              <motion.p key="hidden" initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="font-bold mb-3 tracking-widest" style={{ fontSize: 20, color: T }}>
                ● ● ● ●
              </motion.p>
            )}
          </AnimatePresence>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-white font-semibold" style={{ background: T, fontSize: 9 }}>
              <FileText size={9} /> View Paystub
            </button>
            <button className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-semibold border" style={{ color: T, borderColor: T, fontSize: 9 }}>
              <Printer size={9} /> Print Paystub
            </button>
          </div>
        </div>

        {/* Pay Breakdown */}
        <Section title="Pay Breakdown">
          <div className="relative px-4 py-3">
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
        </Section>

        {/* Calculators */}
        <div className="mx-3 my-2.5 grid grid-cols-2 gap-2">
          {[
            { key: "deductions" as const, label: "Deductions Calculator", Icon: Calculator },
            { key: "w4" as const, label: "W-4 Calculator", Icon: FileText },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveCalc(key)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-white text-left hover:bg-gray-50 transition-colors"
              style={{ border: `1px solid ${DIV}` }}
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: TL }}>
                <Icon size={12} style={{ color: T }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold leading-tight" style={{ fontSize: 8.5, color: "#374151" }}>{label}</p>
                <p className="font-bold mt-0.5" style={{ fontSize: 8.5, color: T }}>Launch →</p>
              </div>
            </button>
          ))}
        </div>

        {/* Pay Disbursement */}
        <Section title="Pay Disbursement" action="View All">
          {disbursements.map((d, i) => (
            <div key={i}>
              <Row
                icon={d.icon}
                left={d.name}
                right={d.pct}
                onClick={() => setExpandedDisb(expandedDisb === i ? null : i)}
                expanded={expandedDisb === i}
              />
              <AnimatePresence>
                {expandedDisb === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50">
                      <input
                        type="number"
                        defaultValue={parseInt(d.pct)}
                        className="border border-gray-200 rounded px-1.5 py-0.5 focus:outline-none w-12"
                        style={{ fontSize: 9 }}
                      />
                      <span style={{ fontSize: 8, color: "#6b7280" }}>% allocation</span>
                      <button className="ml-auto rounded-md px-2 py-0.5 text-white font-bold" style={{ background: T, fontSize: 8 }}>Save</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button
            onClick={() => setShowAddAlloc((v) => !v)}
            className="w-full flex items-center gap-2 px-4 hover:bg-gray-50 transition-colors"
            style={{ height: 36, borderTop: `1px solid ${DIV}` }}
          >
            <Plus size={10} style={{ color: T }} />
            <span className="font-semibold" style={{ fontSize: 8.5, color: T }}>Add New Allocation</span>
          </button>
          <AnimatePresence>
            {showAddAlloc && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="flex flex-col gap-2 px-4 py-3 bg-gray-50">
                  <input value={allocName} onChange={(e) => setAllocName(e.target.value)} placeholder="Account name"
                    className="border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none" style={{ fontSize: 9 }} />
                  <input value={allocPct} onChange={(e) => setAllocPct(e.target.value)} type="number" placeholder="% e.g. 20"
                    className="border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none" style={{ fontSize: 9 }} />
                  <button className="rounded-lg px-3 py-1.5 text-white font-bold self-end" style={{ background: T, fontSize: 8.5 }}>Add</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Section>

        {/* Pay History */}
        <Section title="Pay History" action="View Full">
          {history.map((h, i) => (
            <div key={i}>
              <Row
                left={h.date}
                right={h.amount}
                onClick={() => setExpandedHistory(expandedHistory === i ? null : i)}
                expanded={expandedHistory === i}
              />
              <AnimatePresence>
                {expandedHistory === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-3 py-2 bg-gray-50 space-y-1">
                      {[
                        { label: "Gross Pay", value: "$6,344.06" },
                        { label: "Taxes",     value: "−$1,334.70" },
                        { label: "Net Pay",   value: "$3,452.57" },
                      ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between">
                          <span style={{ fontSize: 8, color: "#6b7280" }}>{row.label}</span>
                          <span className="font-semibold" style={{ fontSize: 8, color: "#374151" }}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </Section>

        {/* W-2s */}
        <Section title="W-2s" action="Prior Years">
          {w2years.map((yr, i) => (
            <div key={yr} className="flex items-center justify-between px-3" style={{ height: 34, borderTop: `1px solid ${DIV}` }}>
              <span className="font-medium" style={{ fontSize: 9, color: "#374151" }}>{yr} W-2</span>
              <button
                onClick={() => handleDownloadW2(i)}
                className="flex items-center gap-1 rounded-md px-2 py-0.5 font-semibold transition-all"
                style={{
                  background: downloadedW2.has(i) ? "#d1fae5" : TL,
                  color: downloadedW2.has(i) ? "#059669" : T,
                  fontSize: 8,
                }}
              >
                {downloadingW2 === i ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }} className="inline-flex">
                    <Download size={8} />
                  </motion.span>
                ) : downloadedW2.has(i) ? <Check size={8} /> : <Download size={8} />}
                {downloadedW2.has(i) ? "Saved" : "Download"}
              </button>
            </div>
          ))}
        </Section>

        {/* Marketplace */}
        <Section title="Marketplace">
          <div className="px-3 py-2">
            <div className="rounded-lg p-2.5" style={{ background: "linear-gradient(135deg,#1a1a2e,#16213e)" }}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: "#f59e0b" }}>
                  <Zap size={11} className="text-white" />
                </div>
                <div>
                  <p className="font-bold text-white leading-none" style={{ fontSize: 9 }}>ZayZoon</p>
                  <p style={{ fontSize: 7.5, color: "#9ca3af" }} className="mt-0.5">Wages in seconds</p>
                </div>
              </div>
              <AnimatePresence>
                {showZayZoon && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-1.5" style={{ fontSize: 7.5, color: "#d1d5db", lineHeight: 1.5 }}
                  >
                    Access up to 50% of your earned wages before payday. No interest, no fees.
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="flex gap-1.5 mt-1">
                <button className="flex-1 rounded-md py-1 text-white font-bold" style={{ background: "#f59e0b", fontSize: 8 }}>
                  Try It Now
                </button>
                <button
                  onClick={() => setShowZayZoon((v) => !v)}
                  className="flex-1 rounded-md py-1 font-semibold border transition-colors"
                  style={{ color: "#d1d5db", borderColor: "#374151", fontSize: 8 }}
                >
                  {showZayZoon ? "Less Info" : "Learn More"}
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Bottom spacer so content clears the nav */}
        <div style={{ height: 48 }} />
      </div>

      {/* ── Bottom nav (sticky) ──────────────────────────────────── */}
      <div
        className="shrink-0 flex items-center border-t bg-white"
        style={{ borderColor: DIV, height: 44 }}
      >
        {navItems.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center justify-center gap-0.5">
            <span style={{ color: item.active ? T : "#9ca3af" }}>{item.icon}</span>
            <span className="font-medium" style={{ fontSize: 7, color: item.active ? T : "#9ca3af" }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
