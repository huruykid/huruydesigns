import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";
import { person } from "@/lib/resume";

const Footer = () => (
  <footer className="border-t border-border bg-card print:hidden">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{person.name}</span>, {person.title}, {person.location}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="Footer">
          <Link to="/#work" className="py-2 hover:text-accent transition-colors">Work</Link>
          <Link to="/about" className="py-2 hover:text-accent transition-colors">About</Link>
          <Link to="/resume" className="py-2 hover:text-accent transition-colors">Resume</Link>
          <Link to="/contact" className="py-2 hover:text-accent transition-colors">Contact</Link>
          <a href={person.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 py-2 hover:text-accent transition-colors" aria-label="Huruy on LinkedIn (opens in a new tab)">
            <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
          </a>
          <a href={`mailto:${person.email}`} className="inline-flex items-center gap-1.5 py-2 hover:text-accent transition-colors">
            <Mail className="h-4 w-4" aria-hidden="true" /> {person.email}
          </a>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
