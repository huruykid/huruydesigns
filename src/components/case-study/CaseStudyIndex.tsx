import { useEffect, useState } from "react";

/**
 * "On this page": the case study's sections as jump links, with a reading time.
 * Built from the rendered sections after mount so each case study stays the
 * single source of its own structure.
 */

interface Entry {
  id: string;
  label: string;
  title: string;
}

const CaseStudyIndex = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-cs-section]"));
    setEntries(
      sections.map((s) => ({
        id: s.id,
        label: s.dataset.csSection ?? "",
        title: s.querySelector("h2")?.textContent?.trim() ?? "",
      })),
    );
    const words = sections.reduce((n, s) => n + (s.innerText || "").split(/\s+/).filter(Boolean).length, 0);
    setMinutes(Math.max(1, Math.round(words / 220)));
  }, []);

  if (entries.length < 3) return null;

  return (
    <nav id="on-this-page" aria-label="On this page" className="cs-flow mb-16 scroll-mt-24 lg:mb-24">
      <p className="mb-4 flex flex-wrap items-baseline gap-x-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        On this page
        <span className="font-medium normal-case tracking-normal text-muted-foreground">
          {entries.length} sections · about {minutes} min
        </span>
      </p>
      <ol className="grid list-none gap-x-8 border-t border-border sm:grid-cols-2">
        {entries.map((e, i) => (
          <li key={e.id} className="border-b border-border">
            <a
              href={`#${e.id}`}
              className="grid min-h-11 grid-cols-[2rem_1fr] items-baseline gap-2 py-2.5 text-[15px] leading-6 text-foreground hover:text-accent"
            >
              <span className="text-xs font-semibold tabular-nums text-muted-foreground" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="font-semibold">{e.label}</span>
                {e.title && <span className="text-muted-foreground"> · {e.title}</span>}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default CaseStudyIndex;
