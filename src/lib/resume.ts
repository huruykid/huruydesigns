/**
 * Single source of truth for resume facts.
 *
 * Imported by the Resume page, the About page, the homepage skills section, the
 * Word export, and the chatbot prompt generator (scripts/build-chat-prompt.ts).
 * Edit dates, titles and bullets here and nowhere else.
 */

export const person = {
  name: "Huruy Kidanemariam",
  givenName: "Huruy",
  familyName: "Kidanemariam",
  title: "Senior UX Designer",
  tagline: "Senior UX Designer & Builder",
  location: "Los Angeles, CA",
  email: "huruydesigns@gmail.com",
  linkedin: "https://www.linkedin.com/in/huruykidanemariam/",
  linkedinLabel: "linkedin.com/in/huruykidanemariam",
  website: "https://huruy.tech",
  websiteLabel: "huruy.tech",
  yearsExperience: "8+",
  currentEmployer: "Capital Group",
  currentEmployerFull: "Capital Group (via Luxoft)",
  availability: "Open to senior UX, senior product design, and staff UX roles: full-time, contract, or consulting. Open to relocation, hybrid, or remote.",
  summary:
    "Senior UX Designer with 8+ years in UX, interaction, and product design, including enterprise conversational AI, payroll, and benefits. Hands-on with generative AI patterns, prompt engineering, and LLM response guardrails in production applications. Currently a Senior UX Designer at Capital Group.",
  /** One positioning line used across the homepage, About and Hire pages. */
  positioning:
    "Senior UX Designer and Builder with 8+ years crafting accessible, human-centered products for enterprise SaaS, compliance, AI, and social impact.",
} as const;

export interface ExperienceItem {
  period: string;
  start: string;
  end?: string;
  title: string;
  org: string;
  location: string;
  bullets: string[];
}

export const experience: ExperienceItem[] = [
  {
    period: "Mar 2025 – Present",
    start: "2025-03",
    title: "Senior UX Designer",
    org: "Capital Group (via Luxoft)",
    location: "Los Angeles, CA",
    bullets: [
      "Design internal enterprise products in a regulated industry, partnering with product, engineering, and compliance stakeholders",
      "Contribute to shared design systems and interaction patterns used across product teams",
    ],
  },
  {
    period: "2024 – Present",
    start: "2024-01",
    title: "AI Product Designer & Builder",
    org: "Appfinity Labs (Independent)",
    location: "Los Angeles, CA",
    bullets: [
      "Prototype and ship AI-powered products using LLM integrations, prompt engineering, and conversational UX patterns",
      "Design guardrails, feedback loops, and human-in-the-loop flows that keep generative AI outputs accurate and on-brand",
      "Build production React interfaces that connect design decisions directly to working code",
    ],
  },
  {
    period: "Apr 2023 – Mar 2025",
    start: "2023-04",
    end: "2025-03",
    title: "UX Designer",
    org: "Asure Software",
    location: "Austin, TX",
    bullets: [
      "Led end-to-end UX for a compliance engine used by 9,000+ tax agencies, re-architecting tax compliance workflows that reduced filing errors",
      "Designed persona and conversational scripts for 'Luna,' an enterprise AI chatbot integrated across HR, payroll, and benefits",
      "Built and authored WCAG-compliant design system guidelines, establishing accessibility standards across web and mobile products",
      "Facilitated cross-functional workshops with product, engineering, and SME stakeholders to align on content strategy and information architecture",
    ],
  },
  {
    period: "Jan 2020 – Feb 2023",
    start: "2020-01",
    end: "2023-02",
    title: "UX Designer",
    org: "IMMERSE",
    location: "Los Angeles, CA",
    bullets: [
      "Designed onboarding flows for VR-based English language learning experiences, improving learner retention",
      "Developed Immerse's first content and design framework, establishing reusable guidelines for instructional designers",
      "Conducted usability testing to identify linguistic friction points. Rewrote prompt sequences reducing user errors",
      "Partnered with instructional designers and engineers to ensure UI copy aligned with pedagogical best practices",
    ],
  },
  {
    period: "Jan 2016 – Jan 2020",
    start: "2016-01",
    end: "2020-01",
    title: "Product Designer",
    org: "Datable",
    location: "Oakland, CA",
    bullets: [
      "Managed UX writing and design for multiple concurrent SaaS client projects across diverse industries",
      "Established a modular design system in Figma with standardized copy patterns for error states, empty states, and CTAs",
      "Collaborated with stakeholders to refine CTA copy based on business KPIs and conversion data",
    ],
  },
];

export const sideProjects = [
  {
    title: "EBT Finder",
    description:
      "Designed, built, and shipped a review-first SNAP/EBT store locator to the App Store. UX research, Figma, React, Supabase.",
  },
  {
    title: "Beles",
    description: "Designed a culturally authentic dating app for the Tigrayan diaspora community",
  },
];

export const leadership = [
  {
    period: "2020 – Present",
    title: "Communications Team Lead",
    org: "HPN4Tigray",
    location: "Portland, OR",
    description:
      "Lead storytelling and advocacy campaigns for a diaspora humanitarian network, and built the reusable design templates the team uses to launch campaigns.",
  },
];

export interface SkillGroup {
  label: string;
  skills: string[];
}

/** The one skills taxonomy used on the homepage, About, Resume and in the chatbot. */
export const skillGroups: SkillGroup[] = [
  {
    label: "Design",
    skills: ["Figma", "Prototyping", "Wireframing", "Visual Design", "Design Systems", "Information Architecture", "Journey Mapping"],
  },
  {
    label: "Research",
    skills: ["Usability Testing", "Heuristic Evaluation", "Competitive Analysis", "User Interviews"],
  },
  { label: "Development", skills: ["React", "HTML/CSS", "JavaScript"] },
  { label: "Collaboration", skills: ["Agile", "Scrum", "Cross-functional Teams", "Lean UX"] },
  { label: "AI", skills: ["Prompt Engineering", "AI Prototyping", "LLM Integration", "Human-in-the-Loop Design"] },
];

export const contactLinks = [
  { kind: "email", label: person.email, href: `mailto:${person.email}` },
  { kind: "linkedin", label: person.linkedinLabel, href: person.linkedin },
  { kind: "website", label: person.websiteLabel, href: person.website },
] as const;

export const resumePdfPath = "/resume/huruy-kidanemariam-resume.pdf";
