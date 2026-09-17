import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";
import { person } from "@/lib/resume";

const Footer = () => (
  <footer className="border-t border-border bg-card print:hidden">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg font-display">
            <span className="text-gradient">Huruy</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">{person.tagline}</p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-accent transition-colors"
            aria-label="Huruy on LinkedIn (opens in a new tab)"
          >
            <Linkedin className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${person.email}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground hover:text-accent transition-colors"
            aria-label={`Email ${person.email}`}
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
          <Link to="/about" className="py-2 hover:text-accent transition-colors">About</Link>
          <Link to="/senior-ux-designer" className="py-2 hover:text-accent transition-colors">Hire</Link>
          <Link to="/resume" className="py-2 hover:text-accent transition-colors">Resume</Link>
          <Link to="/contact" className="py-2 hover:text-accent transition-colors">Contact</Link>
          <Link to="/#projects" className="py-2 hover:text-accent transition-colors">Projects</Link>
        </nav>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8">
        © {new Date().getFullYear()} {person.name} | {person.title}. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
