/**
 * Quotes from people Huruy has worked with. The Hire page renders this section
 * only when at least one entry exists, so nothing shows until real quotes are
 * added here with the person's permission.
 *
 * Each entry: the quote verbatim, who said it, their role at the time, and the
 * project or company for context. Keep quotes short (two to four sentences).
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  context: string;
  /** Optional public profile, e.g. a LinkedIn URL. */
  url?: string;
}

export const testimonials: Testimonial[] = [];
