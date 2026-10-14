import { useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck, Baby, Briefcase, CalendarHeart, Church, Cigarette, Flame, GraduationCap, Hand, Heart,
  HeartHandshake, MapPin, MessageCircle, Ruler, ShieldCheck, Sparkles, User, Users, Wine, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A working miniature of the shipped Beles Discover screen (App Store and
 * belesconnect.app), ported from the app's own components in
 * huruykid/beles-love-connect: ProfileDocument, BasicsChips, the like button,
 * the Dating/Friends toggle, the tab bar and MatchOverlay. The palette, type and
 * layout are the app's; only the data is a fixed demo profile (one of the demo
 * members that ship with the app).
 *
 * Try it: switch Dating/Friends (the react affordance forks: heart vs. a kemay
 * wave), scroll Hiwet's profile, and react to any photo, prompt or the vouch to
 * see the match moment with the Shmagele's suggestion.
 */

/** The app's oklch tokens, converted to the hsl triplets this site's Tailwind expects. */
const THEME: CSSProperties = {
  ["--background" as string]: "24 30% 4%",
  ["--foreground" as string]: "44 22% 96%",
  ["--card" as string]: "26 20% 8%",
  ["--card-foreground" as string]: "44 22% 96%",
  ["--primary" as string]: "55 99% 57%",
  ["--primary-foreground" as string]: "26 29% 5%",
  ["--muted" as string]: "26 14% 12%",
  ["--muted-foreground" as string]: "31 7% 64%",
  ["--border" as string]: "24 7% 15%",
  ["--elevated" as string]: "26 17% 10%",
  fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
  colorScheme: "dark",
};
/** Logical width the app is laid out at; demos scale it to the frame they're given. */
const APP_WIDTH = 390;
const display = "font-['Space_Grotesk',ui-sans-serif,system-ui,sans-serif]";
const elevated = "bg-[hsl(var(--elevated))]";

type Intent = "dating" | "friends";
type Target = { type: "photo" | "prompt" | "bio" | "shmagele"; ref: string | null };

const hiwet = {
  name: "Hiwet",
  age: 31,
  verified: true,
  city: "Los Angeles, CA",
  roots: "Adwa, Tigray",
  distanceMiles: 4,
  bio: "Nurse, weekend hiker, keeper of the family jebena. Looking for something serious.",
  photos: ["/images/beles/demo/hiwet-1.webp", "/images/beles/demo/hiwet-2.webp", "/images/beles/demo/hiwet-3.webp"],
  prompts: [
    { q: "A perfect Sunday", a: "Buna at my aunt's, then a long walk in Griffith Park." },
    { q: "The way to win me over", a: "Know your grandmother's village, or ask me about mine." },
  ],
  basics: [
    { key: "height", Icon: Ruler, text: "5'5\"" },
    { key: "work", Icon: Briefcase, text: "Nurse" },
    { key: "education", Icon: GraduationCap, text: "BSc Nursing" },
    { key: "faith", Icon: Church, text: "Orthodox Christian" },
    { key: "family", Icon: Baby, text: "Want kids" },
    { key: "drinking", Icon: Wine, text: "Drinks: socially" },
    { key: "smoking", Icon: Cigarette, text: "Smokes: never" },
  ] as { key: string; Icon: LucideIcon; text: string }[],
  shmagele: { by: "Aunt Letebrhan", relationship: "Aunt", note: "Serious, kind, keeps her family close. She'll make you laugh at the coffee ceremony." },
  suggestedBy: "Aster",
  suggestedNote: "She keeps the family jebena. You two will talk for hours.",
  tags: ["Hiking", "Coffee ceremony", "Tigrigna music", "Tigrigna", "English"],
};

const same = (a: Target | null, b: Target) => !!a && a.type === b.type && a.ref === b.ref;

function LikeButton({ onClick, label, hit, friends, className }: { onClick: () => void; label: string; hit: boolean; friends: boolean; className?: string }) {
  const Icon = friends ? Hand : Heart;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex size-11 items-center justify-center rounded-full border shadow-lg transition-transform active:scale-90",
        hit ? "border-primary bg-primary text-primary-foreground" : "border-white/20 bg-black/55 text-white backdrop-blur hover:bg-black/70",
        className,
      )}
    >
      <Icon className={cn("size-5", hit && "fill-current")} aria-hidden="true" />
    </button>
  );
}

function Card({ children, tone = "card", hit, onLike, likeLabel, friends }: { children: ReactNode; tone?: "card" | "primary"; hit: boolean; onLike?: () => void; likeLabel: string; friends: boolean }) {
  return (
    <div className={cn("relative rounded-[1.5rem] border p-5", tone === "primary" ? "border-primary/35 bg-primary/5" : "border-border bg-card", hit && "ring-2 ring-primary")}>
      {children}
      {onLike && <LikeButton hit={hit} onClick={onLike} label={likeLabel} friends={friends} className="absolute bottom-4 right-4" />}
    </div>
  );
}

function PhotoBlock({ src, alt, hit, onLike, friends }: { src: string; alt: string; hit: boolean; onLike: () => void; friends: boolean }) {
  return (
    <div className={cn("relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]", elevated, hit && "ring-2 ring-primary")}>
      <img src={src} alt={alt} width={640} height={800} loading="lazy" className="size-full object-cover" />
      <LikeButton hit={hit} onClick={onLike} label={friends ? "Say kemay to this photo" : "Like this photo"} friends={friends} className="absolute bottom-4 right-4" />
    </div>
  );
}

function BelesIcon({ className }: { className?: string }) {
  const heart = "M50 90C30 74 8 56 8 36A21 21 0 0 1 50 26A21 21 0 0 1 92 36C92 56 70 74 50 90Z";
  return (
    <svg viewBox="0 0 100 100" className={cn("shrink-0", className)} role="img" aria-label="Beles">
      <defs>
        <clipPath id="beles-demo-heart"><path d={heart} /></clipPath>
      </defs>
      <g clipPath="url(#beles-demo-heart)">
        <rect x="0" y="0" width="100" height="100" fill="#DA121A" />
        <polygon points="0,8 56,50 0,92" fill="#FCDD09" />
        <polygon points="68.0,26.0 72.8,39.4 87.0,39.8 75.8,48.5 79.8,62.2 68.0,54.2 56.2,62.2 60.2,48.5 49.0,39.8 63.2,39.4" fill="#FCDD09" />
      </g>
      <path d={heart} fill="none" stroke="#FCDD09" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
}

/** The match moment, as MatchOverlay renders it when a Shmagele's suggestion turns mutual. */
export function BelesMatchMoment({ intent = "dating", onClose, className }: { intent?: Intent; onClose?: () => void; className?: string }) {
  const friends = intent === "friends";
  return (
    <div className={cn("flex flex-col items-center justify-center bg-background/95 px-8 py-10 text-center text-foreground backdrop-blur-sm", className)}>
      <h2 className={cn(display, "text-4xl font-bold leading-tight")}>{hiwet.suggestedBy} might have been onto something</h2>
      <p className="mt-3 text-sm text-muted-foreground">
        {friends ? `You both said kemay. Start a conversation with ${hiwet.name}.` : `The feeling is mutual. Start a conversation with ${hiwet.name}.`}
      </p>
      <div className="mt-5 w-full max-w-xs rounded-2xl border border-primary/30 bg-primary/10 p-3 text-left">
        <p className="flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-widest text-primary">
          <Sparkles className="size-3" aria-hidden="true" /> {hiwet.suggestedBy} suggested them
        </p>
        <p className="mt-1.5 text-sm leading-relaxed">“{hiwet.suggestedNote}”</p>
      </div>
      <img
        src={hiwet.photos[0]}
        alt={hiwet.name}
        width={640}
        height={853}
        className="mt-8 h-64 w-48 rotate-3 rounded-3xl border-4 border-primary object-cover"
        style={{ boxShadow: "0 12px 40px -12px rgba(254,237,37,0.55)" }}
      />
      <a
        href="https://belesconnect.app?utm_source=portfolio&utm_medium=case_study&utm_campaign=beles_demo"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(display, "mt-8 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-bold text-primary-foreground")}
      >
        <MessageCircle className="size-4" aria-hidden="true" /> Say kemay
        <span className="sr-only"> (opens the live Beles app in a new tab)</span>
      </a>
      {onClose && (
        <button type="button" onClick={onClose} className={cn(display, "mt-3 w-full max-w-xs rounded-full border border-border px-6 py-4 font-bold text-foreground")}>
          Keep looking
        </button>
      )}
    </div>
  );
}

/** The match moment on its own, at a given frame size (used where the page talks about it). */
export function BelesMatchPreview({ width: preferred = 280, height = 560, frameWidth }: { width?: number; height?: number; frameWidth?: number }) {
  // Fill the phone frame the shell gives us; the app keeps its 390pt proportions.
  const width = frameWidth || preferred;
  const zoom = width / APP_WIDTH;
  return (
    <div style={{ ...THEME, width, height, overflow: "hidden" }} className="bg-background">
      <div style={{ zoom, width: APP_WIDTH, height: height / zoom }}>
        <BelesMatchMoment className="size-full" />
      </div>
    </div>
  );
}

const NAV = [
  { label: "Discover", Icon: Flame, active: true },
  { label: "Likes", Icon: Heart },
  { label: "Matches", Icon: MessageCircle },
  { label: "Events", Icon: CalendarHeart },
  { label: "Profile", Icon: User },
];

export default function BelesAppDemo({ width: preferred = 300, height = 600, frameWidth }: { width?: number; height?: number; frameWidth?: number }) {
  const width = frameWidth || preferred;
  const [intent, setIntent] = useState<Intent>("dating");
  const [hit, setHit] = useState<Target | null>(null);
  const [matched, setMatched] = useState(false);
  const friends = intent === "friends";
  const likeVerb = friends ? "Say kemay to" : "Like";
  const zoom = width / APP_WIDTH;

  const react = (t: Target) => {
    setHit(t);
    window.setTimeout(() => setMatched(true), 450);
  };
  const reset = () => {
    setMatched(false);
    setHit(null);
  };

  const photoTarget = (i: number): Target => ({ type: "photo", ref: String(i) });
  const promptTarget = (i: number): Target => ({ type: "prompt", ref: hiwet.prompts[i].q });

  const promptCard = (i: number) => (
    <Card key={`p${i}`} hit={same(hit, promptTarget(i))} onLike={() => react(promptTarget(i))} likeLabel={`${likeVerb} ${hiwet.name}'s answer to “${hiwet.prompts[i].q}”`} friends={friends}>
      <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">{hiwet.prompts[i].q}</p>
      <p className={cn(display, "mt-1.5 pr-10 text-xl font-bold leading-snug")}>{hiwet.prompts[i].a}</p>
    </Card>
  );
  const photo = (i: number) => (
    <PhotoBlock key={`ph${i}`} src={hiwet.photos[i]} alt={`${hiwet.name}, photo ${i + 1} of ${hiwet.photos.length}`} hit={same(hit, photoTarget(i))} onLike={() => react(photoTarget(i))} friends={friends} />
  );

  return (
    <div style={{ ...THEME, width, height, position: "relative", overflow: "hidden" }} className="bg-background text-foreground">
      <div style={{ zoom, width: APP_WIDTH, height: height / zoom, display: "flex", flexDirection: "column" }}>
        {/* Discover header */}
        <header className="flex shrink-0 items-center justify-between gap-3 px-5 pb-3 pt-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <BelesIcon className="size-9" />
            <p className="flex min-w-0 items-center gap-1 truncate text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" aria-hidden="true" /> LA
            </p>
          </div>
          <div className={cn("inline-flex rounded-full p-1", elevated)} role="group" aria-label="What you're here for">
            {([
              { k: "dating", label: "Dating", Icon: HeartHandshake },
              { k: "friends", label: "Friends", Icon: Users },
            ] as const).map(({ k, label, Icon }) => (
              <button
                key={k}
                type="button"
                aria-pressed={intent === k}
                onClick={() => setIntent(k)}
                className={cn(
                  "flex min-h-11 items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                  intent === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </header>

        {/* The profile, as one scrolling document */}
        <div className="min-h-0 flex-1 overflow-y-auto pb-6" style={{ scrollbarWidth: "none" }}>
          <article aria-label={`${hiwet.name}, ${hiwet.age}`}>
            <div className={cn("relative aspect-[4/5] w-full overflow-hidden", elevated)}>
              <img src={hiwet.photos[0]} alt={`${hiwet.name}, main photo`} width={640} height={800} className="size-full object-cover" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent pb-5 pl-5 pr-20 pt-24 text-white">
                <h2 className={cn(display, "text-3xl font-bold leading-tight")}>
                  {hiwet.name}, {hiwet.age}
                  <ShieldCheck className="ml-2 inline size-6 text-primary" aria-label="Verified by the community" />
                </h2>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-white/90">
                  <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
                  {hiwet.city} · {hiwet.roots} · about {hiwet.distanceMiles} mi away
                </p>
              </div>
              <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                  <Sparkles className="size-3.5" aria-hidden="true" /> {hiwet.suggestedBy} suggests
                </span>
                <span className="rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur">86% compatible</span>
              </div>
              <LikeButton
                hit={same(hit, photoTarget(0))}
                onClick={() => react(photoTarget(0))}
                label={`${likeVerb} ${hiwet.name}'s main photo`}
                friends={friends}
                className="absolute bottom-5 right-5"
              />
            </div>

            <div className="space-y-4 px-5 pt-4">
              <ul className="flex flex-wrap gap-2">
                {hiwet.basics.map(({ key, Icon, text }) => (
                  <li key={key} className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm", elevated)}>
                    <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>

              <Card tone="primary" hit={false} likeLabel="" friends={friends}>
                <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-primary">
                  <Sparkles className="size-3.5" aria-hidden="true" /> Suggested by {hiwet.suggestedBy}
                </p>
                <p className="mt-1.5 leading-relaxed">“{hiwet.suggestedNote}”</p>
              </Card>

              <Card hit={same(hit, { type: "bio", ref: null })} onLike={() => react({ type: "bio", ref: null })} likeLabel={`${likeVerb} ${hiwet.name}'s bio`} friends={friends}>
                <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-muted-foreground">About {hiwet.name}</p>
                <p className="mt-1.5 pr-10 leading-relaxed">{hiwet.bio}</p>
              </Card>
              {photo(1)}
              {promptCard(0)}
              {photo(2)}
              {promptCard(1)}
              <Card
                tone="primary"
                hit={same(hit, { type: "shmagele", ref: null })}
                onLike={() => react({ type: "shmagele", ref: null })}
                likeLabel={`${likeVerb} what ${hiwet.shmagele.by} says about ${hiwet.name}`}
                friends={friends}
              >
                <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-primary">
                  <BadgeCheck className="size-3.5" aria-hidden="true" /> Vouched for by their Shmagele
                </p>
                <p className="mt-1.5 pr-10 leading-relaxed">“{hiwet.shmagele.note}”</p>
                <p className="mt-2 text-xs font-semibold text-muted-foreground">{hiwet.shmagele.by} · {hiwet.shmagele.relationship}</p>
              </Card>
              <div className="flex flex-wrap gap-2 pt-1">
                {hiwet.tags.map((t) => (
                  <span key={t} className={cn("rounded-full px-3 py-1.5 text-sm text-muted-foreground", elevated)}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        </div>

        {/* Tab bar */}
        <nav aria-label="App tabs (preview)" className="shrink-0 border-t border-border bg-background/90 px-2 pb-4 backdrop-blur-xl">
          <div className="flex items-stretch justify-around py-2">
            {NAV.map(({ label, Icon, active }) => (
              <span key={label} className={cn("flex min-h-11 flex-1 flex-col items-center gap-1 py-1.5 text-xs font-medium", active ? "text-primary" : "text-muted-foreground")}>
                <Icon className={cn("size-5", active && "fill-primary/20")} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {matched && (
          <motion.div
            key="match"
            role="dialog"
            aria-modal="true"
            aria-label="It's a match"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-10"
          >
            <div style={{ zoom, width: APP_WIDTH, height: height / zoom }}>
              <BelesMatchMoment intent={intent} onClose={reset} className="size-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
