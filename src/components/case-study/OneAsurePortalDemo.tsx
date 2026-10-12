import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell, Calendar, ChevronRight, Clock, DollarSign, FileText, Heart, HelpCircle, Home, LogIn, LogOut,
  MoreHorizontal, Plane, Settings, Users,
} from "lucide-react";
import BenefitsModuleDemo from "./BenefitsModuleDemo";
import PayModuleDemo from "./PayModuleDemo";

/**
 * The consolidated OneAsure portal: one navigation across what used to be three
 * products. Pay and Benefits are the full module prototypes; Home, Time and More
 * are lighter screens so every tab goes somewhere. Recreated with sample data.
 */
type Module = "Home" | "Time" | "Pay" | "Benefits" | "More";

const TEAL = "#0d7a9c";
const TEAL_BG = "#e8f5f9";

const NAV: { label: Module; icon: ReactNode }[] = [
  { label: "Home", icon: <Home size={15} /> },
  { label: "Time", icon: <Clock size={15} /> },
  { label: "Pay", icon: <DollarSign size={15} /> },
  { label: "Benefits", icon: <Heart size={15} /> },
  { label: "More", icon: <MoreHorizontal size={15} /> },
];

function Card({ children, onClick, label }: { children: ReactNode; onClick?: () => void; label?: string }) {
  const cls = "mx-3 mt-3 block w-[calc(100%-1.5rem)] rounded-xl border border-gray-100 bg-white p-3.5 text-left shadow-sm";
  return onClick ? (
    <button type="button" onClick={onClick} aria-label={label} className={`${cls} transition-colors hover:border-gray-200`}>
      {children}
    </button>
  ) : (
    <div className={cls}>{children}</div>
  );
}

function HomeScreen({ go }: { go: (m: Module) => void }) {
  return (
    <>
      <p className="px-4 pt-3 font-semibold text-gray-900" style={{ fontSize: 13 }}>Good morning, Jordan</p>
      <p className="px-4 text-gray-500" style={{ fontSize: 10 }}>Here's what needs you this week.</p>
      <Card onClick={() => go("Benefits")} label="Open enrollment, go to Benefits">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg" style={{ background: TEAL_BG, color: TEAL }}><Heart size={15} /></span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-gray-900" style={{ fontSize: 11.5 }}>Open enrollment ends Aug 25</span>
            <span className="block text-gray-500" style={{ fontSize: 9.5 }}>Review your plans in Benefits</span>
          </span>
          <ChevronRight size={14} className="text-gray-400" />
        </div>
      </Card>
      <Card onClick={() => go("Pay")} label="Next paycheck, go to Pay">
        <p className="text-gray-500" style={{ fontSize: 9.5 }}>Next paycheck · Aug 31</p>
        <p className="mt-0.5 font-bold text-gray-900" style={{ fontSize: 18 }}>$3,452.57</p>
        <p className="mt-1 font-medium" style={{ fontSize: 10, color: TEAL }}>View pay details →</p>
      </Card>
      <Card onClick={() => go("Time")} label="Hours this week, go to Time">
        <div className="flex items-center justify-between">
          <span>
            <span className="block text-gray-500" style={{ fontSize: 9.5 }}>Hours this week</span>
            <span className="block font-bold text-gray-900" style={{ fontSize: 16 }}>32.5 <span className="font-normal text-gray-500" style={{ fontSize: 10 }}>/ 40</span></span>
          </span>
          <span className="rounded-full px-2 py-0.5 font-medium" style={{ fontSize: 9, background: TEAL_BG, color: TEAL }}>Timesheet due Fri</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full" style={{ width: "81%", background: TEAL }} /></div>
      </Card>
      <Card>
        <p className="mb-1.5 flex items-center gap-1.5 font-semibold text-gray-900" style={{ fontSize: 11 }}><Bell size={12} /> Updates</p>
        <ul className="space-y-1.5 text-gray-600" style={{ fontSize: 10 }}>
          <li>Your W-4 change takes effect next pay period.</li>
          <li>Office closed Monday, Sep 1 (Labor Day).</li>
        </ul>
      </Card>
    </>
  );
}

function TimeScreen() {
  const [clockedIn, setClockedIn] = useState(false);
  const days = [
    { d: "Mon", h: 8 }, { d: "Tue", h: 8.5 }, { d: "Wed", h: 8 }, { d: "Thu", h: 8 }, { d: "Fri", h: clockedIn ? 0.1 : 0 },
  ];
  return (
    <>
      <Card>
        <div className="flex items-center justify-between gap-3">
          <span>
            <span className="block text-gray-500" style={{ fontSize: 9.5 }}>{clockedIn ? "Clocked in at 9:41 AM" : "You're clocked out"}</span>
            <span className="block font-bold text-gray-900" style={{ fontSize: 15 }}>{clockedIn ? "On the clock" : "Friday, Aug 29"}</span>
          </span>
          <button
            type="button"
            onClick={() => setClockedIn((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold text-white"
            style={{ fontSize: 11, background: clockedIn ? "#b42318" : TEAL }}
          >
            {clockedIn ? <LogOut size={13} /> : <LogIn size={13} />} {clockedIn ? "Clock out" : "Clock in"}
          </button>
        </div>
      </Card>
      <Card>
        <p className="mb-2 font-semibold text-gray-900" style={{ fontSize: 11 }}>This week</p>
        <ul className="space-y-1.5">
          {days.map(({ d, h }) => (
            <li key={d} className="flex items-center gap-2" style={{ fontSize: 10 }}>
              <span className="w-7 text-gray-500">{d}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100"><span className="block h-full rounded-full" style={{ width: `${(h / 10) * 100}%`, background: TEAL }} /></span>
              <span className="w-9 text-right tabular-nums text-gray-700">{h ? `${h}h` : "-"}</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-right font-semibold text-gray-900" style={{ fontSize: 10.5 }}>32.5 hours</p>
      </Card>
      <Card>
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg" style={{ background: TEAL_BG, color: TEAL }}><Plane size={15} /></span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-gray-900" style={{ fontSize: 11.5 }}>PTO balance: 64 hours</span>
            <span className="block text-gray-500" style={{ fontSize: 9.5 }}>Accrues 3.08 hours per pay period</span>
          </span>
        </div>
        <button type="button" className="mt-2.5 w-full rounded-lg border py-1.5 font-semibold" style={{ fontSize: 10.5, color: TEAL, borderColor: TEAL }}>Request time off</button>
      </Card>
    </>
  );
}

function MoreScreen() {
  const items = [
    { icon: <FileText size={14} />, label: "Documents", sub: "W-2s, policies, signed forms" },
    { icon: <Users size={14} />, label: "Company directory", sub: "Find a coworker" },
    { icon: <Calendar size={14} />, label: "Company calendar", sub: "Holidays and pay dates" },
    { icon: <Settings size={14} />, label: "Settings", sub: "Notifications, security, sign-in" },
    { icon: <HelpCircle size={14} />, label: "Help", sub: "Contact HR or payroll" },
  ];
  return (
    <div className="mx-3 mt-3 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      {items.map((it, i) => (
        <div key={it.label} className={`flex items-center gap-2.5 px-3.5 py-2.5 ${i ? "border-t border-gray-100" : ""}`}>
          <span className="flex size-7 items-center justify-center rounded-lg" style={{ background: TEAL_BG, color: TEAL }}>{it.icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-medium text-gray-900" style={{ fontSize: 11.5 }}>{it.label}</span>
            <span className="block text-gray-500" style={{ fontSize: 9.5 }}>{it.sub}</span>
          </span>
          <ChevronRight size={13} className="text-gray-300" />
        </div>
      ))}
    </div>
  );
}

const SUBTITLES: Record<Exclude<Module, "Pay" | "Benefits">, string> = {
  Home: "Everything in one place",
  Time: "Clock in, timesheets and time off",
  More: "Documents, directory and settings",
};

/** Home, Time and More share the portal chrome the Pay and Benefits modules draw themselves. */
function PortalScreen({ module, layout, go, children }: { module: Module; layout: "mobile" | "desktop"; go: (m: Module) => void; children: ReactNode }) {
  const navButton = (item: (typeof NAV)[number], mobile: boolean) => {
    const active = item.label === module;
    return (
      <button
        key={item.label}
        type="button"
        onClick={() => go(item.label)}
        aria-current={active ? "page" : undefined}
        className={mobile ? "flex flex-1 flex-col items-center justify-center gap-0.5" : "flex w-full flex-col items-center justify-center gap-0.5 py-2.5 transition-colors"}
        style={{ color: active ? TEAL : "#9ca3af", background: !mobile && active ? TEAL_BG : "transparent" }}
      >
        {item.icon}
        <span className="font-medium" style={{ fontSize: mobile ? 9 : 8, color: active ? TEAL : "#9ca3af" }}>{item.label}</span>
        {mobile && active && <span className="h-1 w-1 rounded-full" style={{ background: TEAL }} />}
      </button>
    );
  };
  return (
    <div className="flex h-full w-full select-none flex-col bg-gray-50" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {layout === "mobile" && (
        <div className="flex shrink-0 items-center justify-between px-4 py-1.5 text-white" style={{ background: TEAL, fontSize: 9 }}>
          <span className="font-semibold">9:41 AM</span>
          <span className="opacity-80">●●● WiFi 🔋</span>
        </div>
      )}
      <div className={layout === "desktop" ? "flex min-h-0 flex-1" : "contents"}>
        {layout === "desktop" && (
          <div className="flex shrink-0 flex-col items-center border-r border-gray-200 bg-white py-3" style={{ width: 56 }}>
            {NAV.map((n) => navButton(n, false))}
          </div>
        )}
        <div className={layout === "desktop" ? "flex min-w-0 flex-1 flex-col" : "contents"}>
          <div className="flex shrink-0 items-center justify-between px-4 py-3 text-white" style={{ background: TEAL }}>
            <div>
              <p className="font-bold" style={{ fontSize: 15 }}>{module}</p>
              <p className="mt-0.5 opacity-70" style={{ fontSize: 9.5 }}>{SUBTITLES[module as keyof typeof SUBTITLES]}</p>
            </div>
            <div className="flex size-8 items-center justify-center rounded-full bg-white/20 font-bold text-white" style={{ fontSize: 12 }}>JD</div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto pb-3" style={{ scrollbarWidth: "none" }}>{children}</div>
        </div>
      </div>
      {layout === "mobile" && (
        <div className="flex shrink-0 items-center border-t border-gray-100 bg-white" style={{ height: 52 }}>
          {NAV.map((n) => navButton(n, true))}
        </div>
      )}
    </div>
  );
}

export default function OneAsurePortalDemo({ layout = "mobile", initial = "Benefits" }: { layout?: "mobile" | "desktop"; initial?: Module }) {
  const [module, setModule] = useState<Module>(initial);
  const go = (label: string) => setModule(label as Module);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={module}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="h-full w-full"
      >
        {module === "Benefits" ? (
          <BenefitsModuleDemo layout={layout} onNavigate={go} />
        ) : module === "Pay" ? (
          <PayModuleDemo layout={layout} onNavigate={go} />
        ) : (
          <PortalScreen module={module} layout={layout} go={go}>
            {module === "Home" ? <HomeScreen go={go} /> : module === "Time" ? <TimeScreen /> : <MoreScreen />}
          </PortalScreen>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
