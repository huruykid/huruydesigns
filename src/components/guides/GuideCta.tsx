import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/** The one action every guide ends on: tell the assistant what Apple said. */
const GuideCta = ({ from }: { from: string }) => (
  <aside aria-label="Get help with your app" className="rounded-3xl border border-border bg-muted/50 p-6 sm:p-8">
    <p className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">Stuck on this with your own app?</p>
    <p className="mt-2 max-w-[52ch] text-base leading-relaxed text-muted-foreground">
      Tell me what Apple said. You'll get a free first read on the fix, and a fixed price if you'd like me to handle it.
    </p>
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        to="/appstore#chat"
        onClick={() => trackEvent("guide_cta_click", { guide: from, target: "chat" })}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Get a free read <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <Link
        to="/appstore#pricing"
        onClick={() => trackEvent("guide_cta_click", { guide: from, target: "pricing" })}
        className="inline-flex min-h-11 items-center px-2 text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
      >
        See pricing
      </Link>
    </div>
  </aside>
);

export default GuideCta;
