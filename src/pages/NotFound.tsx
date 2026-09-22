import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  return (
    <section className="flex min-h-[60vh] items-center justify-center py-24">
      <SEO
        title="Page Not Found | Huruy Kidanemariam"
        description="This page can't be found on Huruy Kidanemariam's UX portfolio. Head back home or browse the featured case studies."
        path={location.pathname}
        noindex
      />
      <div className="container mx-auto px-4 text-center">
        <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">404</p>
        <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you're looking for doesn't exist or has moved.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/">Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/#work">Browse case studies</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
