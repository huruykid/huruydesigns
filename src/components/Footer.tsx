import { Link } from "react-router-dom";
import { person } from "@/lib/resume";

const linkClass = "py-2 text-muted-foreground transition-colors hover:text-foreground";

const Footer = () => (
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

export default Footer;
