import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Hire", path: "/senior-ux-designer" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Escape closes the menu and returns focus; clicking outside closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const themeLabel = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
  const themeButton = (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label={themeLabel} aria-pressed={theme === "dark"} className="h-11 w-11">
      {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </Button>
  );

  const isActive = (path: string) => location.pathname === path || (path === "/senior-ux-designer" && location.pathname === "/hire");

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border print:hidden">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4" aria-label="Primary">
        <Link to="/" className="text-xl font-bold tracking-tight font-display" aria-label="Huruy Kidanemariam, home">
          <span className="text-gradient">Huruy</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              aria-current={isActive(l.path) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive(l.path) ? "text-accent" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          {themeButton}
          <Button asChild size="sm" variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <Link to="/resume">
              <FileText className="h-4 w-4 mr-1" aria-hidden="true" /> Resume
            </Link>
          </Button>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <div className="flex md:hidden items-center gap-2">
          {themeButton}
          <Button
            ref={toggleRef}
            variant="ghost"
            size="icon"
            className="h-11 w-11"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls={menuId}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <nav id={menuId} className="md:hidden bg-background border-b border-border animate-fade-in" aria-label="Mobile">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                aria-current={isActive(l.path) ? "page" : undefined}
                className={`text-sm font-medium py-2 min-h-11 flex items-center ${isActive(l.path) ? "text-accent" : "text-muted-foreground"}`}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild size="sm" variant="outline" className="border-accent text-accent hover:bg-accent/10 hover:text-accent w-fit min-h-11">
              <Link to="/resume">
                <FileText className="h-4 w-4 mr-1" aria-hidden="true" /> Resume
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 w-fit min-h-11">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
