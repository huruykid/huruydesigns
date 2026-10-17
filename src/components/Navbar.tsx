import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useChat } from "@/hooks/useChat";

const navLinks = [
  { label: "Work", path: "/#work", match: "/" },
  { label: "Fintech", path: "/fintech-ux-designer", match: "/fintech-ux-designer" },
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
  }, [location.pathname, location.hash]);

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

  // The prerendered HTML can't know the visitor's theme, so the first render must not
  // depend on it: both icons are drawn and CSS (the .dark class set before paint) picks one,
  // and the pressed state is filled in after mount. Otherwise dark-mode visitors hit a
  // hydration mismatch and React re-renders the whole page.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const themeButton = (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Dark theme" aria-pressed={mounted ? theme === "dark" : undefined} className="h-11 w-11">
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </Button>
  );

  const founderPage = location.pathname === "/appstore" || location.pathname.startsWith("/appstore/") || location.pathname === "/guides" || location.pathname.startsWith("/guides/");
  const pageLinks = founderPage
    ? [
        { label: "Services & Pricing", path: "/appstore/pricing", match: "/appstore/pricing" },
        { label: "Apps Shipped", path: "/appstore/examples", match: "/appstore/examples" },
        { label: "How It Works", path: "/appstore/process", match: "/appstore/process" },
        { label: "Guides", path: "/guides", match: "/guides" },
        { label: "Get a Quote", path: "/appstore/quote", match: "/appstore/quote" },
      ]
    : navLinks;
  const isActive = (match: string) => location.pathname === match || (match === "/guides" && location.pathname.startsWith("/guides/"));

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-lg border-b border-transparent print:hidden">
      <nav className={`${founderPage ? "service-container" : "container"} flex items-center justify-between h-16`} aria-label="Primary">
        <Link to={founderPage ? "/appstore" : "/"} className="text-[15px] font-semibold tracking-tight" aria-label={founderPage ? "App Store Launch, service home" : "Huruy Kidanemariam, home"}>
          {founderPage ? "App Store Launch" : "Huruy Kidanemariam"}
        </Link>

        {/* Desktop */}
        <div className={`${founderPage ? "hidden lg:flex" : "hidden md:flex"} items-center gap-3 lg:gap-6 whitespace-nowrap`}>
          {pageLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              aria-current={isActive(l.match) ? "page" : undefined}
              className={`inline-flex min-h-11 items-center text-sm transition-colors hover:text-foreground ${isActive(l.match) ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          {/* Tablets: the gutter is too narrow for a floating launcher, so the assistant sits here. */}
          {!founderPage && (
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
          )}
          {themeButton}
        </div>

        {/* Mobile: the assistant lives here rather than floating over content */}
        <div className={`flex ${founderPage ? "lg:hidden" : "md:hidden"} items-center gap-1`}>
          {!founderPage && (
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
          )}
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
        <nav id={menuId} className={`${founderPage ? "lg:hidden" : "md:hidden"} bg-background border-b border-border animate-fade-in`} aria-label="Mobile">
          <div className={`${founderPage ? "service-container" : "container"} py-2 flex flex-col`}>
            {pageLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                onClick={() => setOpen(false)}
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
