/**
 * Quotes from people Huruy has worked with. Nothing renders until a real quote
 * is added here with the person's permission:
 *   - every quote appears on the About page ("From people I've worked with");
 *   - a quote with `projectId` also appears on that case study, before Outcome.
 *
 * Each entry: the quote verbatim (their words, never edited for meaning), who said
 * it, their role at the time, and the company for context. Two to four sentences.
 * Keep their original email or message as the record.
 *
 * Template (copy, fill, uncomment):
 *   {
 *     quote: "…their words…",
 *     name: "Full name",            // or "" and put the title in role if they prefer
 *     role: "Engineering lead",
 *     context: "Asure Software",
 *     projectId: "asure-compliance", // or "oneasure-portal", "doula-care-portal"
 *     url: "https://www.linkedin.com/in/…",
 *   },
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  context: string;
  /** Optional public profile, e.g. a LinkedIn URL. */
  url?: string;
  /** Case study this quote belongs to; it then also shows on that page. */
  projectId?: string;
}

export const testimonials: Testimonial[] = [];

export const testimonialsFor = (projectId: string) => testimonials.filter((t) => t.projectId === projectId);
