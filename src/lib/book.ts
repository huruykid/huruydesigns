/**
 * Everything /book renders. Edit this file, not the page, when the book's details change.
 *
 * Buying: each format goes live the moment it has a `url`. Until then its button
 * shows "Coming soon" and the page offers an email for launch-day news, so the store
 * never links to a listing that doesn't exist yet. Paste the Amazon product URL
 * (e.g. https://www.amazon.com/dp/XXXXXXXXXX) into `url` once KDP says the format is live.
 *
 * Cover: `coverImage` is empty until the final cover file is added to /public/images/book/.
 * While it's empty the page draws a stand-in of "The Wall" design (BookCover.tsx).
 */

export interface BookFormat {
  id: "paperback" | "kindle";
  label: string;
  detail: string;
  /** Retailer the button sends people to. */
  retailer: string;
  /** Live product page. Leave undefined until the listing is live. */
  url?: string;
  /** Display price, e.g. "$17.99". Optional. */
  price?: string;
  isbn?: string;
}

export const book = {
  title: "The Oracle of San Quentin",
  subtitle:
    "How Curtis ‘Wall Street’ Carroll Taught Himself to Read, Found the Stock Market by Mistake, and Counted Down Twenty-Seven Years to the Gate",
  author: "Huruy Kidanemariam",
  path: "/book",
  /** Final cover art, e.g. "/images/book/oracle-cover.webp" (2:3). Empty draws the stand-in. */
  coverImage: "",
  coverAlt:
    "Cover of The Oracle of San Quentin: rows of cream tally marks on a black wall, crossed by a red band carrying the title",

  pitch:
    "He walked into prison unable to read. He walked out twenty-seven years later as the man other prisoners, and some of the guards, asked about their money.",

  description: [
    "Curtis Carroll grew up in East Oakland and was arrested for murder at seventeen. He went to prison unable to read. Inside, he taught himself, page by page, until the newspaper's financial pages put the stock market in front of him. He didn't know what he was looking at. He decided to find out.",
    "What followed made him known as “Wall Street”: a self-taught investor running a financial-literacy class inside San Quentin, a TED talk recorded behind the walls, and a long countdown to the gate that included setbacks of his own making. The Oracle of San Quentin tells that story in his voice, from the first word he sounded out to the morning he walked free.",
    "It's a book about literacy as a way out, about money as something you're taught or kept from, and about whether a man can become someone the worst thing he did doesn't fully describe.",
  ],

  /** Shown in full on the page: the book is unofficial and partly dramatized. */
  authorsNote:
    "This is an unofficial biography. It is not written, authorized or endorsed by Curtis Carroll. It is told in his first-person voice, reconstructed from his public interviews and published reporting; those words are the author’s, not Mr. Carroll’s own. Some scenes, characters and conversations are dramatized, and the chapter notes at the back say which.",

  formats: [
    {
      id: "paperback",
      label: "Paperback",
      detail: "6 × 9 in. Printed and shipped by Amazon.",
      retailer: "Amazon",
      isbn: "979-8-16-092454-0",
    },
    {
      id: "kindle",
      label: "Kindle eBook",
      detail: "Read on Kindle devices and the free Kindle app.",
      retailer: "Amazon",
    },
  ] as BookFormat[],

  /** Where "tell me when it's out" goes. */
  notifyEmail: "huruydesigns@gmail.com",
} as const;

export const liveFormats = () => book.formats.filter((f) => !!f.url);
export const isBookOnSale = () => liveFormats().length > 0;
