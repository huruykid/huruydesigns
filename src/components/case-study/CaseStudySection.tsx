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

const CaseStudySection = ({ label, title, children, className = "" }: CaseStudySectionProps) => {
  const headingId = useId();
  return (
    <motion.section
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-24 ${className}`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{label}</p>
      <h2 id={headingId} className="mb-8 max-w-[28ch] text-2xl font-bold leading-tight tracking-tight font-display sm:text-[2rem]">
        {title}
      </h2>
      <div className="text-[17px] leading-7 text-muted-foreground [&>p]:max-w-[64ch]">{children}</div>
    </motion.section>
  );
};

export default CaseStudySection;
