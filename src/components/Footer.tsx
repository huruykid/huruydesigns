import { Link } from "react-router-dom";
import { Linkedin, Mail, FileText } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="text-gradient">Huruy</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">UX Designer & Software Developer</p>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://www.linkedin.com/in/huruykidanemariam/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="mailto:huruydesigns@gmail.com" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Email">
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <nav className="flex items-center gap-4 text-sm text-muted-foreground" aria-label="Footer navigation">
          <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          <Link to="/resume" className="hover:text-accent transition-colors">Resume</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
          <Link to="/#projects" className="hover:text-accent transition-colors">Projects</Link>
        </nav>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-8">© {new Date().getFullYear()} Huruy Kidanemariam | UX Designer. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
