import { motion } from "framer-motion";

interface CaseStudySectionProps {
  label: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const CaseStudySection = ({ label, title, icon, children, className = "" }: CaseStudySectionProps) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`mb-20 ${className}`}>
    <div className="flex items-center gap-2 mb-2">
      {icon && <span className="text-accent">{icon}</span>}
      <p className="text-accent font-semibold text-sm tracking-wide uppercase">{label}</p>
    </div>
    <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
    <div className="text-muted-foreground leading-relaxed">{children}</div>
  </motion.div>
);

export default CaseStudySection;
