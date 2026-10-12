import { book } from "@/lib/book";

/**
 * The book cover. Uses the real cover file when book.coverImage is set; until then
 * it draws a stand-in of "The Wall" design (black, dense cream tally marks, red title
 * band) so the page never shows an empty box. 2:3, like the 6x9 trim.
 */

// Deterministic jitter so the server-rendered and hydrated SVG are identical.
const rand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

const W = 600;
const H = 900;
const BAND_Y = 372;
const BAND_H = 236;

const tallyPaths = (() => {
  const r = rand(27);
  const paths: string[] = [];
  const rowH = 46;
  for (let y = 26; y < H - 30; y += rowH) {
    // Leave the band and the author line clear.
    if (y + 34 > BAND_Y - 6 && y < BAND_Y + BAND_H + 6) continue;
    if (y > H - 96) continue;
    let x = 22 + r() * 14;
    while (x < W - 70) {
      const tilt = (r() - 0.5) * 4;
      const len = 30 + r() * 6;
      let d = "";
      for (let i = 0; i < 4; i++) {
        const sx = x + i * 9 + (r() - 0.5) * 2;
        d += `M${sx.toFixed(1)} ${(y + r() * 2).toFixed(1)}l${tilt.toFixed(1)} ${len.toFixed(1)}`;
      }
      // The fifth stroke crosses the four.
      d += `M${(x - 4).toFixed(1)} ${(y + len * 0.72).toFixed(1)}L${(x + 33).toFixed(1)} ${(y + len * 0.22).toFixed(1)}`;
      paths.push(d);
      x += 50 + r() * 8;
    }
  }
  return paths.join("");
})();

interface BookCoverProps {
  className?: string;
  /** Load eagerly: true for the hero cover. */
  priority?: boolean;
}

const BookCover = ({ className = "", priority = false }: BookCoverProps) => {
  if (book.coverImage) {
    return (
      <img
        src={book.coverImage}
        alt={book.coverAlt}
        width={W}
        height={H}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`aspect-[2/3] w-full object-cover ${className}`}
      />
    );
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={book.coverAlt} className={`aspect-[2/3] w-full ${className}`}>
      <rect width={W} height={H} fill="#0b0b0b" />
      <path d={tallyPaths} stroke="#e9dfc7" strokeOpacity="0.78" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <rect y={BAND_Y} width={W} height={BAND_H} fill="#b3201b" />
      <g fill="#f6efe0" fontFamily="Georgia, 'Times New Roman', serif" textAnchor="middle">
        <text x={W / 2} y={BAND_Y + 62} fontSize="30" letterSpacing="9">THE</text>
        <text x={W / 2} y={BAND_Y + 132} fontSize="64" fontWeight="700" letterSpacing="3">ORACLE</text>
        <text x={W / 2} y={BAND_Y + 196} fontSize="36" letterSpacing="6">OF SAN QUENTIN</text>
      </g>
      <text
        x={W / 2}
        y={H - 44}
        fill="#e9dfc7"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="24"
        letterSpacing="7"
        textAnchor="middle"
      >
        {book.author.toUpperCase()}
      </text>
    </svg>
  );
};

export default BookCover;
