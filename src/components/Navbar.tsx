import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useChat } from "@/hooks/useChat";

const navLinks = [
  { label: "Work", path: "/#work", match: "/" },
  { label: "About", path: "/about", match: "/about" },
  { label: "Resume", path: "/resume", match: "/resume" },
  { label: "Book", path: "/book", match: "/book" },
  { label: "Contact", path: "/contact", match: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const { openChat } = useChat();
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
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-lg border-b border-transparent print:hidden">
      <nav className="container flex items-center justify-between h-16" aria-label="Primary">
        <Link to="/" className="text-[15px] font-semibold tracking-tight" aria-label="Huruy Kidanemariam, home">
          Huruy Kidanemariam
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              aria-current={isActive(l.match) ? "page" : undefined}
              className={`text-sm transition-colors hover:text-foreground ${isActive(l.match) ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          {/* Tablets: the gutter is too narrow for a floating launcher, so the assistant sits here. */}
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 lg:hidden"
            onClick={(e) => openChat(e.currentTarget)}
            aria-label="Ask about Huruy's work (AI assistant)"
            aria-haspopup="dialog"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </Button>
          {themeButton}
        </div>

        {/* Mobile: the assistant lives here rather than floating over content */}
        <div className="flex md:hidden items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11"
            onClick={(e) => openChat(e.currentTarget)}
            aria-label="Ask about Huruy's work (AI assistant)"
            aria-haspopup="dialog"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </Button>
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
          <div className="container py-2 flex flex-col">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                aria-current={isActive(l.match) ? "page" : undefined}
                className={`text-base min-h-12 flex items-center ${isActive(l.match) ? "text-foreground font-medium" : "text-muted-foreground"}`}
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
