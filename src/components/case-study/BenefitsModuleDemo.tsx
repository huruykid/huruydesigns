import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronDown, ChevronUp, X, Check,
  Home, Clock, Heart, MoreHorizontal, DollarSign,
  AlertCircle, Calendar, Shield, Activity,
} from "lucide-react";

// ── Brand ──────────────────────────────────────────────────────────────────
const TEAL = "#0d7a9c";
const TEAL_BG = "#e8f5f9";

// ── Benefit plans data ─────────────────────────────────────────────────────
const PLANS = [
  { name: "Medical",                cost: "$156.40", status: "active",  detail: "BCBS PPO · $1,500 deductible · Family coverage" },
  { name: "Dental",                 cost: "$18.50",  status: "active",  detail: "Delta Dental · $1,000 annual max · Preventive 100%" },
  { name: "Long Term Disability",   cost: "$12.80",  status: "active",  detail: "60% of salary · 90-day elimination period" },
  { name: "Vision",                 cost: "$8.25",   status: "active",  detail: "VSP · $150 frame allowance · Annual exam covered" },
  { name: "Basic Life",             cost: "$0.00",   status: "active",  detail: "2x annual salary · AD&D included · Employer-paid" },
  { name: "HSA Wellcare",           cost: "$125.00", status: "active",  detail: "$3,850 annual contribution limit · Triple tax advantage" },
  { name: "Voluntary Life",         cost: "$24.60",  status: "active",  detail: "Up to $500K · Guaranteed issue $250K" },
  { name: "Spouse Voluntary Life",  cost: "$14.30",  status: "active",  detail: "Up to $250K · No evidence of insurability under $25K" },
  { name: "Dependent Voluntary Life",cost: "$9.75",  status: "active",  detail: "$5K–$25K coverage per dependent child" },
  { name: "Flexible Spending",      cost: "Waived",  status: "waived",  detail: "Not enrolled · $2,850 annual limit available" },
  { name: "Short Term Disability",  cost: "Waived",  status: "waived",  detail: "Not enrolled · 60% salary · 14-day elimination" },
  { name: "Accidental Life",        cost: "Waived",  status: "waived",  detail: "Not enrolled · Up to $500K coverage available" },
];

const LIFE_EVENTS = [
  { icon: "💍", label: "Marriage / Domestic Partnership" },
  { icon: "👶", label: "New Child (Birth / Adoption)" },
  { icon: "💔", label: "Divorce / Separation" },
  { icon: "📋", label: "Loss of Other Coverage" },
];

// ── Shared sub-components ──────────────────────────────────────────────────
function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`mx-3 rounded-2xl bg-white overflow-hidden mb-3 ${className}`}
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.05)" }}
    >
      {children}
    </div>
  );
}

// ── Open Enrollment Banner ─────────────────────────────────────────────────
function EnrollmentBanner({ onBegin }: { onBegin: () => void }) {
  return (
    <SectionCard>
      <div className="p-4">
        <div className="flex items-start gap-2 mb-2">
          <span className="text-base">📋</span>
          <div>
            <p className="font-bold" style={{ fontSize: 12, color: TEAL }}>Open Enrollment Has Begun!</p>
            <p className="mt-1 leading-relaxed" style={{ fontSize: 10, color: "#4b5563" }}>
              Starting <span className="font-semibold">August 21st, 2023</span>, employees may enroll or update benefits.{" "}
              <span className="font-bold" style={{ color: TEAL }}>Complete by August 25th, 2023.</span>
            </p>
          </div>
        </div>
        <button
          onClick={onBegin}
          className="w-full mt-3 rounded-xl py-2.5 text-white font-bold transition-opacity hover:opacity-90 active:opacity-80"
          style={{ background: TEAL, fontSize: 11 }}
        >
          Begin Enrollment
        </button>
      </div>
    </SectionCard>
  );
}

// ── Enrollment Flow Overlay ────────────────────────────────────────────────
function EnrollmentOverlay({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const steps = ["Select Plans", "Review", "Confirm"];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col bg-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ background: TEAL, color: "white" }}>
        <p className="font-bold" style={{ fontSize: 13 }}>Open Enrollment</p>
        <button onClick={onClose}><X size={15} /></button>
      </div>

      {/* Step indicators */}
      <div className="flex items-center px-4 py-3 gap-2 shrink-0 border-b border-gray-100">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white font-bold"
              style={{ background: i <= step ? TEAL : "#e5e7eb", fontSize: 9 }}
            >
              {i < step ? <Check size={10} /> : i + 1}
            </div>
            <span style={{ fontSize: 9, color: i <= step ? TEAL : "#9ca3af" }} className="font-semibold truncate">{s}</span>
            {i < steps.length - 1 && <div className="h-px flex-1" style={{ background: i < step ? TEAL : "#e5e7eb" }} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: "none" }}>
        {step === 0 && (
          <div className="space-y-2">
            <p className="font-semibold mb-3" style={{ fontSize: 11, color: "#374151" }}>Select plans to enroll in:</p>
            {["Medical", "Dental", "Vision", "HSA Wellcare"].map((plan, i) => (
              <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-50">
                <input type="checkbox" defaultChecked={i < 2} className="accent-teal-600 w-4 h-4" />
                <span className="font-medium" style={{ fontSize: 11, color: "#1f2937" }}>{plan}</span>
              </label>
            ))}
          </div>
        )}
        {step === 1 && (
          <div className="space-y-2">
            <p className="font-semibold mb-3" style={{ fontSize: 11, color: "#374151" }}>Review your selections:</p>
            {["Medical: $156.40", "Dental: $18.50"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-xl" style={{ background: TEAL_BG }}>
                <Check size={12} style={{ color: TEAL }} />
                <span style={{ fontSize: 11, color: "#1f2937" }}>{item}</span>
              </div>
            ))}
            <div className="mt-3 p-3 rounded-xl border border-dashed border-gray-300">
              <div className="flex justify-between">
                <span className="font-semibold" style={{ fontSize: 11, color: "#374151" }}>Est. Total / Period</span>
                <span className="font-bold" style={{ fontSize: 11, color: TEAL }}>$174.90</span>
              </div>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ background: "#d1fae5" }}
            >
              <Check size={24} style={{ color: "#10b981" }} />
            </motion.div>
            <p className="font-bold" style={{ fontSize: 14, color: "#1f2937" }}>Enrollment Complete!</p>
            <p className="mt-2" style={{ fontSize: 10, color: "#6b7280" }}>Your benefits selections have been submitted.</p>
          </div>
        )}
      </div>

      {/* Action button */}
      {step < 2 ? (
        <div className="px-4 pb-4 shrink-0">
          <button
            onClick={() => setStep(s => s + 1)}
            className="w-full rounded-xl py-2.5 text-white font-bold"
            style={{ background: TEAL, fontSize: 11 }}
          >
            {step === 0 ? "Continue to Review →" : "Confirm Enrollment"}
          </button>
        </div>
      ) : (
        <div className="px-4 pb-4 shrink-0">
          <button
            onClick={onClose}
            className="w-full rounded-xl py-2.5 font-bold border"
            style={{ color: TEAL, borderColor: TEAL, fontSize: 11 }}
          >
            Done
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ── Life Event Overlay ─────────────────────────────────────────────────────
function LifeEventOverlay({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="absolute inset-0 z-40 flex flex-col bg-white"
    >
      <div className="flex items-center justify-between px-4 py-3 shrink-0" style={{ background: TEAL, color: "white" }}>
        <p className="font-bold" style={{ fontSize: 13 }}>Life Event</p>
        <button onClick={onClose}><X size={15} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: "none" }}>
        {!submitted ? (
          <>
            <p className="mb-4" style={{ fontSize: 11, color: "#4b5563" }}>
              Select your qualifying life event to begin updating your benefits:
            </p>
            <div className="space-y-2">
              {LIFE_EVENTS.map((evt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all"
                  style={{
                    border: `1.5px solid ${selected === i ? TEAL : "#e5e7eb"}`,
                    background: selected === i ? TEAL_BG : "white",
                  }}
                >
                  <span style={{ fontSize: 18 }}>{evt.icon}</span>
                  <span className="font-medium" style={{ fontSize: 11, color: "#1f2937" }}>{evt.label}</span>
                  {selected === i && <Check size={13} style={{ color: TEAL, marginLeft: "auto" }} />}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: TEAL_BG }}>
              <span style={{ fontSize: 26 }}>{selected !== null ? LIFE_EVENTS[selected].icon : "✓"}</span>
            </div>
            <p className="font-bold" style={{ fontSize: 14, color: "#1f2937" }}>Event Submitted</p>
            <p className="mt-2" style={{ fontSize: 10, color: "#6b7280" }}>HR will reach out within 30 days to process your changes.</p>
          </div>
        )}
      </div>
      {!submitted && (
        <div className="px-4 pb-4 shrink-0">
          <button
            onClick={() => selected !== null && setSubmitted(true)}
            className="w-full rounded-xl py-2.5 text-white font-bold transition-opacity"
            style={{ background: TEAL, fontSize: 11, opacity: selected !== null ? 1 : 0.4 }}
          >
            Continue →
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
interface BenefitsModuleDemoProps {
  layout?: "mobile" | "desktop";
}

export default function BenefitsModuleDemo({ layout = "mobile" }: BenefitsModuleDemoProps) {
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);
  const [showEnrollment, setShowEnrollment] = useState(false);
  const [showLifeEvent, setShowLifeEvent] = useState(false);

  const activePlans = PLANS.filter(p => p.status === "active");
  const waivedPlans = PLANS.filter(p => p.status === "waived");

  const navItems = [
    { icon: <Home size={15} />,          label: "Home",     active: false },
    { icon: <Clock size={15} />,         label: "Time",     active: false },
    { icon: <DollarSign size={15} />,    label: "Pay",      active: false },
    { icon: <Heart size={15} />,         label: "Benefits", active: true  },
    { icon: <MoreHorizontal size={15} />,label: "More",     active: false },
  ];

  const sideNav = layout === "desktop" && (
    <div className="shrink-0 flex flex-col items-center py-3 bg-white border-r border-gray-200" style={{ width: 56 }}>
      {navItems.map((item, i) => (
        <button
          key={i}
          className="flex flex-col items-center justify-center gap-0.5 w-full py-2.5 transition-colors"
          style={{
            color: item.active ? TEAL : "#9ca3af",
            background: item.active ? TEAL_BG : "transparent",
          }}
        >
          {item.icon}
          <span className="font-medium" style={{ fontSize: 8, color: item.active ? TEAL : "#9ca3af" }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <div
      className="flex flex-col w-full h-full bg-gray-50 select-none"
      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
    >
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

      {/* ── Desktop: side nav + content | Mobile: just content ── */}
      <div className={layout === "desktop" ? "flex flex-1 min-h-0" : "contents"}>
        {sideNav}
        <div className={layout === "desktop" ? "flex flex-col flex-1 min-w-0" : "contents"}>

      {/* ── App header ──────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 text-white shrink-0"
        style={{ background: TEAL }}
      >
        <div>
          <p className="font-bold" style={{ fontSize: 15 }}>Benefits</p>
          <p className="opacity-70 mt-0.5" style={{ fontSize: 9.5 }}>Get a detailed look at your benefits</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white" style={{ fontSize: 12 }}>
          JD
        </div>
      </div>

      {/* ── Scrollable body ──────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto pb-2 relative" style={{ scrollbarWidth: "none" }}>

        {/* ── Open Enrollment Banner ────────────────────────── */}
        <div className="pt-3">
          <EnrollmentBanner onBegin={() => setShowEnrollment(true)} />
        </div>

        {/* ── Life Event card ───────────────────────────────── */}
        <SectionCard>
          <div className="p-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-base">🧬</span>
              <div>
                <p className="font-bold" style={{ fontSize: 12, color: TEAL }}>Life Event</p>
                <p className="mt-1 leading-relaxed" style={{ fontSize: 10, color: "#4b5563" }}>
                  Tell us about your life event. We will assist you in managing the related changes or updates.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowLifeEvent(true)}
              className="w-full mt-3 rounded-xl py-2.5 font-bold border-2 transition-colors hover:bg-teal-50"
              style={{ color: TEAL, borderColor: TEAL, fontSize: 11 }}
            >
              Modify Benefits
            </button>
          </div>
        </SectionCard>

        {/* ── Benefit List ──────────────────────────────────── */}
        <SectionCard>
          <div className="px-4 pt-4 pb-2 flex items-center justify-between">
            <span className="font-bold uppercase tracking-wide" style={{ fontSize: 9, color: "#9ca3af", letterSpacing: "0.08em" }}>
              Benefit List
            </span>
            <span className="font-semibold" style={{ fontSize: 9, color: "#9ca3af" }}>Cost / Pay Period</span>
          </div>

          {/* Active plans */}
          {activePlans.map((plan, i) => {
            const globalIdx = i;
            const isExpanded = expandedPlan === globalIdx;
            return (
              <div key={i}>
                <button
                  onClick={() => setExpandedPlan(isExpanded ? null : globalIdx)}
                  className="w-full flex items-center px-4 hover:bg-gray-50 transition-colors"
                  style={{ minHeight: 42, borderBottom: "1px solid #f0f0f0" }}
                >
                  <span className="flex-1 text-left font-medium" style={{ fontSize: 11, color: "#1f2937" }}>{plan.name}</span>
                  <span className="font-bold shrink-0 mr-2" style={{ fontSize: 11, color: TEAL }}>{plan.cost}</span>
                  {isExpanded
                    ? <ChevronUp size={11} className="text-gray-400 shrink-0" />
                    : <ChevronRight size={11} className="text-gray-400 shrink-0" />
                  }
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-gray-100" style={{ background: TEAL_BG }}>
                        <p style={{ fontSize: 9.5, color: "#374151" }}>{plan.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Waived plans */}
          {waivedPlans.map((plan, i) => {
            const globalIdx = activePlans.length + i;
            const isExpanded = expandedPlan === globalIdx;
            return (
              <div key={i}>
                <button
                  onClick={() => setExpandedPlan(isExpanded ? null : globalIdx)}
                  className="w-full flex items-center px-4 hover:bg-gray-50 transition-colors"
                  style={{
                    minHeight: 42,
                    borderBottom: i < waivedPlans.length - 1 ? "1px solid #f0f0f0" : "none",
                    opacity: 0.55,
                  }}
                >
                  <span className="flex-1 text-left font-medium" style={{ fontSize: 11, color: "#6b7280" }}>{plan.name}</span>
                  <span className="font-medium shrink-0 mr-2" style={{ fontSize: 11, color: "#9ca3af" }}>Waived</span>
                  {isExpanded
                    ? <ChevronUp size={11} className="text-gray-400 shrink-0" />
                    : <ChevronRight size={11} className="text-gray-400 shrink-0" />
                  }
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                        <p style={{ fontSize: 9.5, color: "#6b7280" }}>{plan.detail}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Total row */}
          <div
            className="flex items-center justify-between px-4 py-3 mt-1"
            style={{ borderTop: "2px solid #e5e7eb" }}
          >
            <span className="font-bold" style={{ fontSize: 11, color: "#1f2937" }}>Total Cost / Pay Period</span>
            <span className="font-bold" style={{ fontSize: 14, color: TEAL }}>$369.60</span>
          </div>
        </SectionCard>

        {/* ── View Summary button ───────────────────────────── */}
        <div className="mx-3 mb-4">
          <button
            className="w-full rounded-xl py-3 font-bold border-2 transition-colors hover:bg-teal-50"
            style={{ color: TEAL, borderColor: TEAL, fontSize: 11 }}
          >
            View Benefits Summary
          </button>
        </div>

        {/* ── Overlays ──────────────────────────────────────── */}
        <AnimatePresence>
          {showEnrollment && <EnrollmentOverlay onClose={() => setShowEnrollment(false)} />}
        </AnimatePresence>
        <AnimatePresence>
          {showLifeEvent && <LifeEventOverlay onClose={() => setShowLifeEvent(false)} />}
        </AnimatePresence>
      </div>

        </div>{/* end desktop content column */}
      </div>{/* end desktop flex row */}

      {/* ── Bottom nav ────────────────────────────────────── */}
      {layout === "mobile" && (
        <div
          className="shrink-0 flex items-center bg-white border-t border-gray-100"
          style={{ height: 52, boxShadow: "0 -1px 0 rgba(0,0,0,0.06)" }}
        >
          {navItems.map((item, i) => (
            <button
              key={i}
              className="flex-1 flex flex-col items-center justify-center gap-0.5"
              style={{ color: item.active ? TEAL : "#9ca3af" }}
            >
              {item.icon}
              <span className="font-medium" style={{ fontSize: 9, color: item.active ? TEAL : "#9ca3af" }}>
                {item.label}
              </span>
              {item.active && <span className="w-1 h-1 rounded-full" style={{ background: TEAL }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
