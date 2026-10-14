import { useId } from "react";
import { motion } from "framer-motion";

interface CaseStudySectionProps {
  label: string;
  title: string;
  /** Accepted for compatibility; section labels no longer carry icons. */
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * One case-study section. It is a .cs-flow grid: the label, heading and every
 * child sit in the centred reading column unless the child opts into
 * `cs-wide` or `cs-full` (see <Wide> and <Full> in primitives).
 */
const CaseStudySection = ({ label, title, children, className = "" }: CaseStudySectionProps) => {
  const headingId = useId();
  return (
    <motion.section
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`cs-flow mb-16 text-base leading-7 text-muted-foreground sm:text-[17px] lg:mb-24 ${className}`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{label}</p>
      <h2 id={headingId} className="mb-6 max-w-[28ch] text-2xl font-bold leading-tight tracking-tight text-foreground font-display sm:text-[2rem]">
        {title}
      </h2>
      {children}
    </motion.section>
  );
};

export default CaseStudySection;
