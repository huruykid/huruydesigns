import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Building2, FileText, DollarSign, Scale, ClipboardList, Clock,
  Upload, Download, Calendar, X,
} from "lucide-react";

// ── Brand ──
const NAVY = "#1a2332";
const ACCENT = "#e07b39";
const GREEN = "#2d9b5a";
const GREEN_LIGHT = "#e8f5ed";
const BLUE = "#3b82f6";
const BLUE_LIGHT = "#eff6ff";
const RED_LIGHT = "#fef2f2";

// ── Nav items ──
const navItems = [
  { icon: <Home size={16} />, label: "Home", active: true },
  { icon: <Building2 size={16} />, label: "Agency", active: false },
  { icon: <FileText size={16} />, label: "Filing & Payment", active: false },
  { icon: <DollarSign size={16} />, label: "Minimum Wage", active: false },
  { icon: <Scale size={16} />, label: "Garnishment Rules", active: false },
  { icon: <ClipboardList size={16} />, label: "Payroll Compliance", active: false },
  { icon: <Clock size={16} />, label: "Releases", active: false },
];

// ── Stats ──
const stats = [
  { label: "Total Tax Paid (2025)", value: "$89,650", sub: "Federal and state combined", trend: "↓ 12% vs 2024", trendColor: RED_LIGHT, trendText: "#dc2626", icon: <DollarSign size={16} /> },
  { label: "Pending Filings", value: "3", sub: "Due in next 30 days", trend: null, trendColor: null, trendText: null, icon: <FileText size={16} /> },
  { label: "Compliance Rate", value: "98.5%", sub: "All-time compliance score", trend: "↑ 2.5% from last year", trendColor: GREEN_LIGHT, trendText: GREEN, icon: <ClipboardList size={16} /> },
  { label: "Next Deadline", value: "10 days", sub: "Q4 Estimated Tax Payment", trend: null, trendColor: null, trendText: null, icon: <Clock size={16} /> },
];

// ── Chart data ──
const chartData = [
  { month: "Jul", paid: 12200, pending: 0 },
  { month: "Aug", paid: 8200, pending: 0 },
  { month: "Sep", paid: 14800, pending: 0 },
  { month: "Oct", paid: 11200, pending: 0 },
  { month: "Nov", paid: 13400, pending: 0 },
  { month: "Dec", paid: 9800, pending: 1800 },
];

// ── Deadlines ──
const deadlines = [
  { title: "Q4 2025 Estimated Tax Payment", date: "Jan 15, 2026", type: "Payment", badge: "Due Soon", badgeColor: ACCENT },
  { title: "Annual Business Tax Return", date: "Mar 15, 2026", type: "Filing", badge: "Upcoming", badgeColor: BLUE },
  { title: "Payroll Tax Report - December", date: "Jan 31, 2026", type: "Report", badge: "Upcoming", badgeColor: BLUE },
  { title: "Sales Tax Filing - Q4", date: "Jan 20, 2026", type: "Filing", badge: "Due Soon", badgeColor: ACCENT },
];

// ── Filings table ──
const filings = [
  { doc: "Form 941 - Q3 2025", date: "Oct 31, 2025", status: "Completed", amount: "$12,450" },
  { doc: "State Sales Tax - November", date: "Dec 20, 2025", status: "Completed", amount: "$3,280" },
  { doc: "Estimated Tax Payment Q4", date: "Dec 15, 2025", status: "Completed", amount: "$8,500" },
  { doc: "Form 1099-MISC Preparation", date: "Jan 5, 2026", status: "Pending", amount: "-" },
  { doc: "Property Tax Assessment", date: "Dec 28, 2025", status: "In Review", amount: "$5,200" },
];

function statusBadge(status: string) {
  const map: Record<string, { bg: string; text: string }> = {
    Completed: { bg: GREEN_LIGHT, text: GREEN },
    Pending: { bg: "#fff7ed", text: ACCENT },
    "In Review": { bg: BLUE_LIGHT, text: BLUE },
  };
  const s = map[status] ?? { bg: "#f3f4f6", text: "#6b7280" };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 8, background: s.bg, color: s.text }}>
      {status}
    </span>
  );
}

// ── Bar Chart component ──
function BarChart({ onBarClick }: { onBarClick: (i: number) => void }) {
  const maxVal = 16000;
  const yTicks = [0, 4000, 8000, 12000, 16000];

  const yTicksDesc = [...yTicks].reverse();

  return (
    <div className="relative h-full" style={{ minHeight: 120 }}>
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-4 flex flex-col justify-between" style={{ width: 36 }}>
        {yTicksDesc.map((t) => (
          <span key={t} className="text-right pr-1" style={{ fontSize: 7, color: "#9ca3af" }}>{t.toLocaleString()}</span>
        ))}
      </div>
      {/* Grid + bars */}
      <div className="absolute top-0 bottom-4 right-0" style={{ left: 40 }}>
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="absolute w-full border-t border-gray-100" style={{ top: `${i * 25}%` }} />
        ))}
        {/* Bars */}
        <div className="flex items-end justify-around h-full px-1">
          {chartData.map((d, i) => {
            const paidH = (d.paid / maxVal) * 100;
            const pendH = (d.pending / maxVal) * 100;
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center flex-1 px-1 cursor-pointer"
                style={{ height: "100%", justifyContent: "flex-end" }}
                onClick={() => onBarClick(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {d.pending > 0 && (
                  <motion.div
                    initial={{ height: 0 }} animate={{ height: `${pendH}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="w-full max-w-[28px] rounded-t"
                    style={{ background: ACCENT }}
                  />
                )}
                <motion.div
                  initial={{ height: 0 }} animate={{ height: `${paidH}%` }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="w-full max-w-[28px]"
                  style={{ background: GREEN, borderRadius: d.pending > 0 ? 0 : "4px 4px 0 0" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
      {/* X-axis labels */}
      <div className="absolute bottom-0 flex justify-between" style={{ left: 40, right: 0, paddingLeft: 4, paddingRight: 4 }}>
        {chartData.map((d, i) => (
          <span key={i} className="flex-1 text-center" style={{ fontSize: 8, color: "#6b7280" }}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}

// ── Detail modal ──
function DetailModal({ filing, onClose }: { filing: typeof filings[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 8 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl w-[260px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="font-bold" style={{ fontSize: 12, color: NAVY }}>{filing.doc}</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
        </div>
        <div className="px-4 pb-4 space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-900">{filing.date}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Status</span>
            {statusBadge(filing.status)}
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold" style={{ color: NAVY }}>{filing.amount}</span>
          </div>
          <button className="w-full flex items-center justify-center gap-1.5 rounded-lg py-2 font-semibold text-white" style={{ fontSize: 10, background: ACCENT }}>
            <Download size={12} /> Download Document
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Month detail modal ──
function MonthDetailModal({ data, onClose }: { data: typeof chartData[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.4)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 8 }} animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl w-[220px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <span className="font-bold" style={{ fontSize: 13, color: NAVY }}>{data.month} Breakdown</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
        </div>
        <div className="px-4 pb-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded" style={{ background: GREEN }} /> Paid</span>
            <span className="font-bold" style={{ color: NAVY }}>${data.paid.toLocaleString()}</span>
          </div>
          {data.pending > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded" style={{ background: ACCENT }} /> Pending</span>
              <span className="font-bold" style={{ color: NAVY }}>${data.pending.toLocaleString()}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
            <span className="font-semibold text-gray-600">Total</span>
            <span className="font-bold" style={{ color: NAVY }}>${(data.paid + data.pending).toLocaleString()}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ──
export default function TaxComplianceDashboardDemo({ layout = "desktop" }: { layout?: "mobile" | "desktop" }) {
  const [activeNav, setActiveNav] = useState(0);
  const [selectedFiling, setSelectedFiling] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [hoveredDeadline, setHoveredDeadline] = useState<number | null>(null);

  const mob = layout === "mobile";

  return (
    <div className={`relative flex w-full h-full bg-gray-50 select-none overflow-hidden ${mob ? "flex-col" : ""}`} style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* ── Sidebar (desktop) / Header-only (mobile, nav at bottom) ── */}
      {mob ? (
        <div className="shrink-0 bg-white border-b border-gray-200 flex items-center gap-2 px-3 py-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: ACCENT }}>
            <span className="font-bold text-white" style={{ fontSize: 8 }}>A</span>
          </div>
          <span className="font-bold" style={{ fontSize: 10, color: NAVY }}>Tax Compliance</span>
        </div>
      ) : (
        <div className="shrink-0 flex flex-col border-r border-gray-200 bg-white" style={{ width: 110 }}>
          <div className="flex items-center gap-1.5 px-2.5 py-2.5 border-b border-gray-100">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: ACCENT }}>
              <span className="font-bold text-white" style={{ fontSize: 8 }}>A</span>
            </div>
            <span className="font-bold" style={{ fontSize: 10, color: NAVY }}>Compliance</span>
          </div>
          <nav className="flex-1 py-2">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveNav(i)}
                className="w-full flex items-center gap-1.5 px-2 py-1.5 text-left transition-colors"
                style={{
                  fontSize: 9,
                  fontWeight: activeNav === i ? 600 : 400,
                  color: activeNav === i ? ACCENT : "#6b7280",
                  background: activeNav === i ? "#fff7ed" : "transparent",
                  borderLeft: activeNav === i ? `3px solid ${ACCENT}` : "3px solid transparent",
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="border-t border-gray-100 px-2 py-2 flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold" style={{ fontSize: 7, background: BLUE }}>JD</div>
            <div>
              <p className="font-semibold" style={{ fontSize: 7, color: NAVY }}>John Doe</p>
              <p style={{ fontSize: 6, color: "#9ca3af" }}>john@company.com</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 min-h-0 flex flex-col relative overflow-hidden">
        {/* Header */}
        <div className={`flex items-center justify-between ${mob ? "px-3 py-2" : "px-4 py-2.5"} border-b border-gray-200 bg-white shrink-0`}>
          <div>
            <p className="font-bold" style={{ fontSize: mob ? 12 : 14, color: NAVY }}>Tax Compliance Dashboard</p>
            {!mob && <p style={{ fontSize: 9, color: "#6b7280" }}>Monitor your tax obligations, deadlines, and compliance status</p>}
          </div>
          {!mob && (
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 9, color: NAVY }} className="font-medium">Timothy J. Allied</span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold" style={{ fontSize: 9, background: "#8b5cf6" }}>TA</div>
            </div>
          )}
        </div>

        {/* Scrollable body */}
        <div className={`flex-1 min-h-0 overflow-y-auto ${mob ? "p-2" : "p-3"}`} style={{ scrollbarWidth: "none" }}>
          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-lg p-3 border border-gray-100"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 8, color: "#6b7280" }}>{s.label}</span>
                  <span style={{ color: ACCENT }}>{s.icon}</span>
                </div>
                <p className="font-bold" style={{ fontSize: mob ? 14 : 13, color: NAVY }}>{s.value}</p>
                <p style={{ fontSize: 7, color: "#9ca3af" }}>{s.sub}</p>
                {s.trend && (
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded-full font-semibold" style={{ fontSize: 7, background: s.trendColor!, color: s.trendText! }}>
                    {s.trend}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Chart + Deadlines */}
          {/* Chart - full width */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 flex flex-col mb-2" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 className="font-bold mb-0.5" style={{ fontSize: 11, color: NAVY }}>Tax Payment Overview</h3>
            <p className="mb-3" style={{ fontSize: 8, color: "#9ca3af" }}>Monthly tax payments and obligations (Last 6 months)</p>
            <div className="flex-1"><BarChart onBarClick={(i) => setSelectedMonth(i)} /></div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <span className="flex items-center gap-1" style={{ fontSize: 8, color: "#6b7280" }}>
                <span className="w-2.5 h-2.5 rounded" style={{ background: GREEN }} /> Paid
              </span>
              <span className="flex items-center gap-1" style={{ fontSize: 8, color: "#6b7280" }}>
                <span className="w-2.5 h-2.5 rounded" style={{ background: ACCENT }} /> Pending
              </span>
            </div>
          </div>

          {/* Deadlines - full width */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 mb-3" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 className="font-bold mb-0.5" style={{ fontSize: 11, color: NAVY }}>Upcoming Deadlines</h3>
            <p className="mb-2" style={{ fontSize: 8, color: "#9ca3af" }}>Important tax dates and filing requirements</p>
            <div className={`grid ${mob ? "grid-cols-1" : "grid-cols-2"} gap-2`}>
              {deadlines.map((dl, i) => (
                <motion.div
                  key={i}
                  onHoverStart={() => setHoveredDeadline(i)}
                  onHoverEnd={() => setHoveredDeadline(null)}
                  className="rounded-lg p-2 border transition-colors cursor-pointer"
                  style={{
                    borderColor: hoveredDeadline === i ? ACCENT + "60" : "#f3f4f6",
                    background: hoveredDeadline === i ? "#fffbf5" : "white",
                  }}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <div className="flex items-start gap-1.5">
                      <Calendar size={10} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                      <span className="font-semibold leading-tight" style={{ fontSize: 8, color: NAVY }}>{dl.title}</span>
                    </div>
                    <span className="shrink-0 px-1.5 py-0.5 rounded-full font-semibold text-white" style={{ fontSize: 6, background: dl.badgeColor }}>
                      {dl.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-4" style={{ fontSize: 7, color: "#9ca3af" }}>
                    <span>{dl.date}</span>
                    <span>• {dl.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Table - full width */}
          <div className="bg-white rounded-lg border border-gray-100 p-3 min-w-0 overflow-hidden mb-2" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 className="font-bold mb-0.5" style={{ fontSize: 11, color: NAVY }}>Recent Filings & Payments</h3>
            <p className="mb-2" style={{ fontSize: 8, color: "#9ca3af" }}>Your tax filing history and payment records</p>
            <table className="w-full" style={{ fontSize: 8 }}>
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-1.5 font-bold" style={{ color: NAVY }}>Document</th>
                  {!mob && <th className="text-left py-1.5 font-bold" style={{ color: NAVY }}>Date</th>}
                  <th className="text-left py-1.5 font-bold" style={{ color: NAVY }}>Status</th>
                  <th className="text-left py-1.5 font-bold" style={{ color: NAVY }}>Amount</th>
                  {!mob && <th className="text-left py-1.5 font-bold" style={{ color: NAVY }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filings.map((f, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelectedFiling(i)}>
                    <td className="py-1.5 flex items-center gap-1">
                      <FileText size={10} className="shrink-0" style={{ color: "#9ca3af" }} />
                      <span className={mob ? "max-w-[100px] truncate block" : ""} style={{ color: NAVY }}>{f.doc}</span>
                    </td>
                    {!mob && <td className="py-1.5" style={{ color: "#6b7280" }}>{f.date}</td>}
                    <td className="py-1.5">{statusBadge(f.status)}</td>
                    <td className="py-1.5 font-semibold" style={{ color: NAVY }}>{f.amount}</td>
                    {!mob && (
                      <td className="py-1.5">
                        <button className="text-gray-400 hover:text-gray-600" onClick={(e) => { e.stopPropagation(); }}>
                          <Download size={10} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quick Actions - full width */}
          <div className="bg-white rounded-lg border border-gray-100 p-3" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 className="font-bold mb-0.5" style={{ fontSize: 11, color: NAVY }}>Quick Actions</h3>
            <p className="mb-2.5" style={{ fontSize: 8, color: "#9ca3af" }}>Common tasks and utilities</p>
            <div className={`grid ${mob ? "grid-cols-2" : "grid-cols-4"} gap-1.5`}>
              {[
                { icon: <Upload size={13} />, label: "Upload Docs" },
                { icon: <FileText size={13} />, label: "File Return" },
                { icon: <DollarSign size={13} />, label: "Make Payment" },
                { icon: <Download size={13} />, label: "Download" },
              ].map((a, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center justify-center gap-1 rounded-md py-2.5 border transition-all cursor-pointer"
                  style={{ borderColor: BLUE + "30", background: BLUE_LIGHT }}
                >
                  <span className="rounded-full p-1" style={{ color: BLUE, background: BLUE + "12" }}>{a.icon}</span>
                  <span className="font-semibold leading-tight" style={{ fontSize: 8, color: BLUE }}>{a.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Modals - inside the flex-constrained main content area so absolute inset-0 stays visible */}
        <AnimatePresence>
          {selectedFiling !== null && (
            <DetailModal filing={filings[selectedFiling]} onClose={() => setSelectedFiling(null)} />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedMonth !== null && (
            <MonthDetailModal data={chartData[selectedMonth]} onClose={() => setSelectedMonth(null)} />
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom nav (mobile only) ── */}
      {mob && (
        <div className="sticky bottom-0 z-10 shrink-0 bg-white border-t border-gray-200 flex items-center justify-around px-1 py-1.5">
          {navItems.slice(0, 5).map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveNav(i)}
              className="flex flex-col items-center gap-0.5 rounded-md px-1.5 py-1 transition-colors"
              style={{
                color: activeNav === i ? ACCENT : "#9ca3af",
                background: activeNav === i ? "#fff7ed" : "transparent",
              }}
            >
              {item.icon}
              <span style={{ fontSize: 6, fontWeight: activeNav === i ? 600 : 400 }}>{item.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
