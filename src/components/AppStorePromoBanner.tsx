import { Project } from "@/lib/projects";
import { getAppStoreUrl, trackAppStoreClick } from "@/lib/analytics";

/**
 * Apple's official "Download on the App Store" badge, served by Apple Marketing Tools.
 * Apple's guidelines ask for this badge rather than the Apple logo inside a custom
 * button, and the black badge carries its own grey border so it reads on light and
 * dark backgrounds alike. 119.66 x 40 is the artwork's native size.
 */
export const APP_STORE_BADGE_SRC = "https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us";

interface AppStoreBadgeLinkProps {
  href: string;
  /** App name, used in the accessible label: "Download <appName> on the App Store". */
  appName: string;
  onClick?: () => void;
  className?: string;
}

export const AppStoreBadgeLink = ({ href, appName, onClick, className = "" }: AppStoreBadgeLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Download ${appName} on the App Store`}
    onClick={onClick}
    className={`inline-flex min-h-11 items-center rounded-[10px] transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${className}`}
  >
    <img src={APP_STORE_BADGE_SRC} alt="" width={144} height={48} className="h-12 w-auto" />
  </a>
);

const AppStorePromoBanner = ({ project, placement = "case_study_banner" }: { project: Project; placement?: string }) => {
  if (!project.appStoreUrl) return null;
  return (
    <AppStoreBadgeLink
      href={getAppStoreUrl(project.appStoreUrl, placement)}
      appName={project.title}
      onClick={() => trackAppStoreClick(placement)}
    />
  );
};

export default AppStorePromoBanner;
