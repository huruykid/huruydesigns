import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const navLinks = [
  { label: "Work", path: "/#work", match: "/" },
  { label: "About", path: "/about", match: "/about" },
  { label: "Resume", path: "/resume", match: "/resume" },
  { label: "Contact", path: "/contact", match: "/contact" },
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

  const isActive = (match: string) => location.pathname === match;

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
              aria-current={isActive(l.match) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive(l.match) ? "text-accent" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          {themeButton}
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
          <div className="container mx-auto px-4 py-2 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                aria-current={isActive(l.match) ? "page" : undefined}
                className={`text-base font-medium min-h-12 flex items-center ${isActive(l.match) ? "text-accent" : "text-muted-foreground"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
