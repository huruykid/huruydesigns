import { Link, useLocation } from "react-router-dom";
import { person } from "@/lib/resume";

const linkClass = "py-2 text-muted-foreground transition-colors hover:text-foreground";

const Footer = () => {
  const { pathname } = useLocation();
  const service = pathname === "/appstore" || pathname.startsWith("/appstore/") || pathname === "/guides" || pathname.startsWith("/guides/");
  if (service) return (
    <footer className="print:hidden">
      <div className="service-container border-t border-border py-8 text-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
          <div>
            <Link to="/appstore" className="font-medium">App Store Launch</Link>
            <p className="mt-2 text-muted-foreground">App Store launch and rejection support by Appfinity Labs LLC.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer">
            <Link to="/appstore/pricing" className={linkClass}>Services & Pricing</Link>
            <Link to="/appstore/examples" className={linkClass}>Apps Shipped</Link>
            <Link to="/appstore/process" className={linkClass}>How It Works</Link>
            <Link to="/guides" className={linkClass}>Guides</Link>
            <Link to="/appstore/quote" className={linkClass}>Get a Quote</Link>
          </nav>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Appfinity Labs LLC · Los Angeles, California</p>
          <Link to="/about" className={linkClass}>About Huruy · Portfolio</Link>
        </div>
      </div>
    </footer>
  );
  return (
  <footer className="print:hidden">
    <div className="container">
      <div className="flex flex-col gap-4 border-t border-border py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-foreground">
          © {new Date().getFullYear()} {person.name}. <span className="text-muted-foreground">{person.title}, {person.location}</span>
        </p>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1" aria-label="Footer">
          <a href={`mailto:${person.email}`} className={linkClass}>Email</a>
          <a href={person.linkedin} target="_blank" rel="noreferrer" className={linkClass} aria-label="LinkedIn (opens in a new tab)">
            LinkedIn
          </a>
          <a href={person.github} target="_blank" rel="noreferrer" className={linkClass} aria-label="GitHub (opens in a new tab)">
            GitHub
          </a>
          <Link to="/resume" className={linkClass}>Resume</Link>
          <Link to="/book" className={linkClass}>Book</Link>
          <Link to="/appstore" className={linkClass}>App Store launch</Link>
          <Link to="/guides" className={linkClass}>App Store guides</Link>
        </nav>
      </div>
    </div>
  </footer>
);
};

export default Footer;
