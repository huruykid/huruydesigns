import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";

const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

/**
 * Renders guide copy with the two inline marks the content uses: [label](/path) links
 * (internal paths and #anchors via the router, others in a new tab) and **bold**.
 */
const GuideText = ({ text }: { text: string }) => {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const i = m.index ?? 0;
    if (i > last) out.push(text.slice(last, i));
    if (m[3]) {
      out.push(<strong key={i} className="font-medium text-foreground">{m[3]}</strong>);
    } else {
      const [, label, href] = m;
      out.push(
        href.startsWith("/") ? (
          <Link key={i} to={href} className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground">
            {label}
          </Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground">
            {label}
          </a>
        ),
      );
    }
    last = i + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out.map((n, i) => <Fragment key={i}>{n}</Fragment>)}</>;
};

export default GuideText;
