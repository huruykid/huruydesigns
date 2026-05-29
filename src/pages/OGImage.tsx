import headshot from "@/assets/huruy-headshot.jpg";
import SEO from "@/components/SEO";

const OGImage = () => {
  const dots = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 12; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={col * 20 + 10}
          cy={row * 20 + 10}
          r="2"
          fill="hsla(25, 95%, 53%, 0.25)"
        />
      );
    }
  }

  return (
    <>
      <SEO
        title="Open Graph Preview – Huruy Kidanemariam"
        description="Internal Open Graph card preview used to render the 1200x630 social image for Huruy Kidanemariam's portfolio."
        path="/og"
        noindex
      />
    <div
      style={{
        width: 1200,
        height: 630,
        background: "hsl(222, 47%, 6%)",
        fontFamily: "'Space Grotesk', sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "0 80px",
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: "linear-gradient(90deg, hsl(25, 95%, 53%), hsl(30, 100%, 60%))",
        }}
      />

      {/* Dot grid */}
      <svg
        style={{ position: "absolute", top: 40, right: 40, opacity: 0.6 }}
        width={240}
        height={240}
      >
        {dots}
      </svg>

      {/* Bottom-right glow */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "hsla(25, 95%, 53%, 0.08)",
          filter: "blur(80px)",
        }}
      />

      {/* Headshot */}
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          overflow: "hidden",
          flexShrink: 0,
          border: "4px solid hsl(25, 95%, 53%)",
          boxShadow: "0 0 40px hsla(25, 95%, 53%, 0.3)",
        }}
      >
        <img
          src={headshot}
          alt="Huruy Kidanemariam, UX Designer and Product Designer headshot"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }}
        />
      </div>

      {/* Text */}
      <div style={{ marginLeft: 60, position: "relative", zIndex: 1 }}>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "hsl(210, 40%, 96%)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Huruy Kidanemariam
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "hsl(25, 95%, 53%)",
            margin: "12px 0 0",
            fontWeight: 500,
          }}
        >
          UX Designer & Product Designer
        </p>
        <p
          style={{
            fontSize: 18,
            color: "hsl(220, 15%, 60%)",
            margin: "16px 0 0",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          huruy.tech
        </p>
      </div>
    </div>
    </>
  );
};

export default OGImage;
