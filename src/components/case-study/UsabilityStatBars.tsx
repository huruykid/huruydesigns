import { motion } from "framer-motion";

const stats = [
  { label: "Lacked personal connection", value: 62.5, desc: "did not feel personal connection with overall layout", color: "bg-accent" },
  { label: "Women: Just Friends", value: 50, desc: "of women would use app today with Just Friends option", color: "bg-primary" },
  { label: "Shmagele confusion", value: 37.5, desc: "were confused about Shmagele feature", color: "bg-destructive" },
  { label: "Men: Just Friends", value: 12.5, desc: "of men would use app today with Just Friends option", color: "bg-muted-foreground" },
];

const UsabilityStatBars = () => (
  <div className="space-y-5 py-4">
    {stats.map((stat, i) => (
      <div key={i} className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-semibold text-foreground">{stat.label}</span>
          <span className="text-sm font-bold text-accent tabular-nums">{stat.value}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-muted/40 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${stat.color}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${stat.value}%` }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{stat.desc}</p>
      </div>
    ))}
  </div>
);

export default UsabilityStatBars;
