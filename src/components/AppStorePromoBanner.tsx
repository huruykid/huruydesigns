import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import { getAppStoreUrl, trackAppStoreClick } from "@/lib/analytics";

export const AppleLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={className} aria-hidden="true">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const PLACEMENT = "case_study_banner";

const AppStorePromoBanner = ({ project }: { project: Project }) => {
  if (!project.appStoreUrl) return null;
  const url = getAppStoreUrl(project.appStoreUrl, PLACEMENT);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background shadow-lg">
        <AppleLogo className="h-8 w-8" />
      </div>
      <div className="flex-1">
        <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-1">Live on iOS</p>
        <h2 className="text-xl sm:text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Get {project.title} on the App Store
        </h2>
        <p className="text-sm text-muted-foreground">
          This concept shipped. Download the real app and find EBT-friendly stores near you.
        </p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${project.title} on the App Store`}
        onClick={() => trackAppStoreClick(PLACEMENT)}
        className="inline-flex shrink-0 items-center gap-2.5 rounded-lg bg-foreground px-4 py-2.5 text-background transition-opacity hover:opacity-90"
      >
        <AppleLogo className="h-5 w-5" />
        <span className="text-left leading-tight">
          <span className="block text-[9px] uppercase tracking-wide opacity-80">Download on the</span>
          <span className="block text-sm font-semibold">App Store</span>
        </span>
      </a>
    </motion.div>
  );
};

export default AppStorePromoBanner;
