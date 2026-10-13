import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, ExternalLink, Mail, Package, PenLine, ShoppingBag, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import BookCover from "@/components/BookCover";
import { book, isBookOnSale, type BookFormat } from "@/lib/book";
import { PERSON, PERSON_REF, SITE_URL, absoluteUrl } from "@/lib/seo";
import { trackEvent } from "@/lib/analytics";

const PAGE_TITLE = `${book.title} by ${book.author} | Book`;
const PAGE_DESC = `${book.pitch} An unofficial biography of Curtis “Wall Street” Carroll, in paperback and Kindle.`;

const notifyHref = `mailto:${book.notifyEmail}?subject=${encodeURIComponent(
  `Tell me when ${book.title} is out`,
)}&body=${encodeURIComponent("Please email me when the book is available.")}`;

const formatIcon = { signed: PenLine, printed: Package, paperback: BookOpen, kindle: Smartphone } as const;

const directFormats = book.formats.filter((f) => f.channel === "direct");
const retailFormats = book.formats.filter((f) => f.channel === "retail");

const bookJsonLd = {
  "@context": "https://schema.org",
  "@type": "Book",
  "@id": `${SITE_URL}${book.path}#book`,
  name: book.title,
  alternativeHeadline: book.subtitle,
  author: PERSON_REF,
  url: `${SITE_URL}${book.path}`,
  inLanguage: "en",
  genre: ["Biography", "True crime", "Personal finance"],
  about: { "@type": "Person", name: "Curtis Carroll", alternateName: "Wall Street" },
  description: book.description[0],
  ...(book.coverImage ? { image: absoluteUrl(book.coverImage) } : {}),
  workExample: retailFormats.map((f) => ({
    "@type": "Book",
    bookFormat: f.id === "kindle" ? "https://schema.org/EBook" : "https://schema.org/Paperback",
    ...(f.isbn ? { isbn: f.isbn.replace(/-/g, "") } : {}),
    ...(f.url ? { url: f.url } : {}),
  })),
};

const BuyButton = ({ format, placement }: { format: BookFormat; placement: string }) =>
  format.url ? (
    <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      <a
        href={format.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("book_buy_click", { format: format.id, channel: format.channel, retailer: format.retailer, placement })
        }
      >
        {format.cta ?? `Buy on ${format.retailer}`}
        <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </Button>
  ) : (
    <p className="flex min-h-11 w-full items-center justify-center rounded-md border border-dashed border-border px-4 text-sm font-medium text-muted-foreground">
      {format.channel === "direct" ? "Available here soon" : `Coming soon to ${format.retailer}`}
    </p>
  );

const FormatCard = ({ format: f }: { format: BookFormat }) => {
  const Icon = formatIcon[f.id];
  return (
    <li className="flex flex-col rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <h4 className="text-xl font-bold tracking-tight font-display">{f.label}</h4>
        </div>
        {f.price && <p className="text-xl font-semibold">{f.price}</p>}
      </div>
      <p className="mb-2 text-sm text-muted-foreground">{f.detail}</p>
      {f.note && <p className="mb-2 text-xs text-muted-foreground">{f.note}</p>}
      {f.isbn && <p className="mb-6 text-xs text-muted-foreground">ISBN {f.isbn}</p>}
      <div className="mt-auto pt-4">
        <BuyButton format={f} placement="store" />
      </div>
    </li>
  );
};

const FormatGroup = ({
  heading,
  blurb,
  formats,
  className = "",
}: {
  heading: string;
  blurb?: string;
  formats: BookFormat[];
  className?: string;
}) => (
  <div className={className}>
    <h3 className="mb-1 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">{heading}</h3>
    {blurb && <p className="mb-5 text-sm text-muted-foreground">{blurb}</p>}
    <ul className={`grid gap-6 md:grid-cols-2 ${blurb ? "" : "mt-5"}`}>
      {formats.map((f) => (
        <FormatCard key={f.id} format={f} />
      ))}
    </ul>
  </div>
);

const Book = () => {
  const onSale = isBookOnSale();

  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        path={book.path}
        ogType="website"
        image="/og/book.png"
        imageAlt={`${book.title}, a book by ${book.author}`}
        jsonLd={[bookJsonLd, { "@context": "https://schema.org", ...PERSON }]}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Book", path: book.path },
        ]}
      />

      {/* Hero */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-full max-w-[18rem] sm:max-w-xs lg:max-w-sm"
            >
              <div className="overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55),0_10px_20px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
                <BookCover priority />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {onSale ? "New book" : "Book · Coming soon"}
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight font-display sm:text-5xl lg:text-6xl">{book.title}</h1>
              <p className="mb-6 max-w-[56ch] text-base leading-relaxed text-muted-foreground sm:text-lg">{book.subtitle}</p>
              <p className="mb-8 text-sm font-medium">
                by{" "}
                <Link to="/about" className="underline decoration-border underline-offset-4 hover:text-accent hover:decoration-accent">
                  {book.author}
                </Link>
              </p>
              <blockquote className="mb-10 max-w-[52ch] border-l-2 border-accent pl-5 text-lg leading-relaxed text-foreground sm:text-xl">
                {book.pitch}
              </blockquote>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href="#buy">
                    <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" />
                    {onSale ? "Buy the book" : "Formats & availability"}
                  </a>
                </Button>
                {!onSale && (
                  <Button asChild size="lg" variant="outline">
                    <a href={notifyHref}>
                      <Mail className="mr-2 h-4 w-4" aria-hidden="true" /> Email me when it's out
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Store */}
      <section id="buy" className="scroll-mt-20 border-t border-border/50 bg-muted/30 py-20" aria-labelledby="buy-heading">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Store</p>
            <h2 id="buy-heading" className="mb-3 text-3xl font-bold tracking-tight font-display">Get a copy</h2>
            <p className="text-muted-foreground">
              {onSale
                ? "Buy a signed copy straight from the author, or pick up the book on Amazon."
                : "The book is in final production. Buttons switch on here the day each format goes live."}
            </p>
          </div>

          <FormatGroup
            heading="Buy direct"
            blurb="Sold from this site, so more of every copy goes to the author."
            formats={directFormats}
          />
          <FormatGroup heading="On Amazon" formats={retailFormats} className="mt-12" />

          {!onSale && (
            <p className="mt-8 text-sm text-muted-foreground">
              Want to know the day it's out?{" "}
              <a href={notifyHref} className="font-medium text-accent underline underline-offset-4">
                Send a quick email
              </a>{" "}
              and you'll get a note at launch.
            </p>
          )}
        </div>
      </section>

      {/* About the book */}
      <section className="py-20" aria-labelledby="about-book-heading">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">About the book</p>
              <h2 id="about-book-heading" className="mb-6 text-3xl font-bold tracking-tight font-display">
                From a prison cell to “Wall Street”
              </h2>
              <div className="space-y-5 text-[17px] leading-8 text-muted-foreground">
                {book.description.map((p) => (
                  <p key={p.slice(0, 24)} className="max-w-[62ch]">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <aside className="self-start rounded-2xl border border-border bg-card p-6 sm:p-8" aria-labelledby="note-heading">
              <h2 id="note-heading" className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                A note on this book
              </h2>
              <p className="text-sm leading-7 text-muted-foreground">{book.authorsNote}</p>
            </aside>
          </div>
        </div>
      </section>

      {/* About the author */}
      <section className="border-t border-border/50 py-20" aria-labelledby="author-heading">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">About the author</p>
          <h2 id="author-heading" className="mb-4 text-3xl font-bold tracking-tight font-display">{book.author}</h2>
          <p className="mb-6 text-[17px] leading-8 text-muted-foreground">
            Huruy is a senior UX designer in Los Angeles and the founder of Appfinity Labs, an independent product studio.
            He builds products that remove a barrier for the people using them. This is his first book, written from
            Curtis Carroll's public interviews and the reporting around his life.
          </p>
          <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline">
            More about Huruy <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
