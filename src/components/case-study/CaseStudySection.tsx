import { useId } from "react";
import { motion } from "framer-motion";

interface CaseStudySectionProps {
  label: string;
  title: string;
  /** Accepted for compatibility; section labels no longer carry icons. */
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /** Anchor id; derived from the label when omitted. */
  id?: string;
}

const slugify = (text: string) =>
  text.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/**
 * One case-study section. It is a .cs-flow grid: the label, heading and every
 * child sit in the centred reading column unless the child opts into
 * `cs-wide` or `cs-full` (see <Wide> and <Full> in primitives).
 */
const CaseStudySection = ({ label, title, children, className = "", id }: CaseStudySectionProps) => {
  const headingId = useId();
  const anchor = id ?? slugify(label);
  return (
    <motion.section
      id={anchor}
      data-cs-section={label}
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`cs-flow mb-16 scroll-mt-24 text-base leading-7 text-muted-foreground sm:text-[17px] lg:mb-24 ${className}`}
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
