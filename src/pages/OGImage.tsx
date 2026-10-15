import { useSearchParams } from "react-router-dom";
import headshot from "@/assets/huruy-headshot.jpg";
import SEO from "@/components/SEO";
import BookCover from "@/components/BookCover";
import { book } from "@/lib/book";
import { person } from "@/lib/resume";
import { publicProjects } from "@/lib/projects";

/**
 * 1200x630 social preview cards, rendered here and captured to public/og/ by
 * scripts/build-og-images.mjs. /og is noindex and never linked.
 *
 *   /og                  default card (home, about, resume, contact)
 *   /og?card=book        the book page
 *   /og?card=appstore    the App Store service page
 *   /og?card=<project>   one card per public project
 */

const INK = "#0A0A0A";
const BODY = "#404040";
const MUTED = "#737373";
const PAPER = "#FAFAFA";

/** The favicon's HK tile, drawn small in the corner of every card. */
const Mark = ({ dark = false }: { dark?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
    <img src="/favicon.svg" alt="" width={40} height={40} style={{ borderRadius: 9, filter: dark ? "invert(1)" : undefined }} />
    <span style={{ fontSize: 22, color: dark ? "#A3A3A3" : MUTED, letterSpacing: "-0.01em" }}>huruy.tech</span>
  </div>
);

const Frame = ({ children, bg = PAPER }: { children: React.ReactNode; bg?: string }) => (
  <div
    data-og-card
    style={{
      width: 1200,
      height: 630,
      background: bg,
      fontFamily: "Inter, system-ui, sans-serif",
      position: "relative",
      overflow: "hidden",
      display: "flex",
    }}
  >
    {children}
  </div>
);

const DefaultCard = () => (
  <Frame>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 0 64px 80px" }}>
      <Mark />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h1 style={{ fontSize: 76, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, color: INK, margin: 0 }}>
          {person.name}
        </h1>
        <p style={{ fontSize: 34, color: BODY, margin: 0, letterSpacing: "-0.01em" }}>{person.title} &amp; Builder</p>
        <p style={{ fontSize: 26, lineHeight: 1.4, color: MUTED, margin: "8px 0 0", maxWidth: 620 }}>
          Enterprise products where mistakes are costly, plus two apps I designed, built and shipped solo.
        </p>
      </div>
      <p style={{ fontSize: 22, color: MUTED, margin: 0 }}>Payroll compliance · HR platforms · Conversational AI</p>
    </div>
    <div style={{ width: 420, display: "flex", alignItems: "center", justifyContent: "center", paddingRight: 72 }}>
      <img
        src={headshot}
        alt=""
        style={{ width: 340, height: 340, borderRadius: "50%", objectFit: "cover", objectPosition: "center 18%", boxShadow: "0 0 0 1px rgba(0,0,0,0.06)" }}
      />
    </div>
  </Frame>
);

const BookCard = () => (
  <Frame bg="#0E0E0E">
    <div style={{ width: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 340, boxShadow: "0 30px 60px rgba(0,0,0,0.55)" }}>
        <BookCover priority />
      </div>
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px 64px 24px" }}>
      <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E26A4F", margin: 0 }}>A new book</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <h1 style={{ fontSize: 68, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.02, color: "#F5F5F5", margin: 0 }}>{book.title}</h1>
        <p style={{ fontSize: 26, lineHeight: 1.4, color: "#BDBDBD", margin: 0 }}>
          How Curtis “Wall Street” Carroll taught himself to read, found the stock market by mistake, and counted down 27 years to the gate.
        </p>
        <p style={{ fontSize: 24, color: "#F5F5F5", margin: 0 }}>by {book.author}</p>
      </div>
      <p style={{ fontSize: 22, color: "#A3A3A3", margin: 0 }}>Paperback and Kindle  ·  huruy.tech/book</p>
    </div>
  </Frame>
);

/** The /appstore service page: the offer on the left, the two shipped apps on the right. */
const AppStoreCard = () => {
  const phone: React.CSSProperties = {
    width: 250,
    borderRadius: 34,
    border: "6px solid #1d1a18",
    boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
    display: "block",
  };
  return (
    <Frame bg="#0E0E0E">
      <div style={{ width: 640, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 24px 64px 80px" }}>
        <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#FEED25", margin: 0 }}>
          Lovable to the App Store
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <h1 style={{ fontSize: 62, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.04, color: "#F5F5F5", margin: 0 }}>
            Get your Lovable app approved on the App Store
          </h1>
          <p style={{ fontSize: 26, lineHeight: 1.4, color: "#BDBDBD", margin: 0 }}>
            Fixed price. The balance is due only when Apple approves.
          </p>
        </div>
        <p style={{ fontSize: 22, color: "#A3A3A3", margin: 0 }}>Two apps shipped solo  ·  huruy.tech/appstore</p>
      </div>
      <div style={{ flex: 1, position: "relative" }}>
        <img src="/images/ebtfinder/app/live-home.webp" alt="" style={{ ...phone, position: "absolute", left: 40, top: 150, transform: "rotate(-6deg)" }} />
        <img src="/images/beles/appstore/02-discover.webp" alt="" style={{ ...phone, position: "absolute", left: 230, top: 70, transform: "rotate(4deg)" }} />
      </div>
    </Frame>
  );
};

const ProjectCard = ({ id }: { id: string }) => {
  const project = publicProjects().find((p) => p.id === id);
  if (!project) return <DefaultCard />;
  return (
    <Frame>
      <div style={{ width: 560, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 48px 64px 80px" }}>
        <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED, margin: 0 }}>
          Case study{project.client && project.client !== "Independent" ? ` · ${project.client}` : ""}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <h1 style={{ fontSize: 60, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, color: INK, margin: 0 }}>{project.title}</h1>
          <p style={{ fontSize: 28, lineHeight: 1.35, color: BODY, margin: 0 }}>{project.impact}</p>
        </div>
        <Mark />
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        <img src={project.cardImage ?? project.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
      </div>
    </Frame>
  );
};

const OGImage = () => {
  const [params] = useSearchParams();
  const card = params.get("card");
  return (
    <>
      <SEO
        title="Open Graph Preview – Huruy Kidanemariam"
        description="Internal page that renders the 1200x630 social preview cards for Huruy Kidanemariam's portfolio."
        path="/og"
        noindex
      />
      {card === "book" ? <BookCard /> : card === "appstore" ? <AppStoreCard /> : card ? <ProjectCard id={card} /> : <DefaultCard />}
    </>
  );
};

export default OGImage;
