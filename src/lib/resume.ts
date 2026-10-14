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
  github: "https://github.com/huruykid",
  githubLabel: "github.com/huruykid",
  website: "https://huruy.tech",
  websiteLabel: "huruy.tech",
  yearsExperience: "8+",
  currentEmployer: "Capital Group",
  currentEmployerFull: "Capital Group (via Luxoft)",
  availability: "Open to senior UX, senior product design, and staff UX roles: full-time, contract, or consulting. Based in Los Angeles: remote, hybrid, or onsite in LA.",
  summary:
    "Senior UX Designer with 8+ years designing enterprise products where mistakes are costly: payroll compliance, HR platforms, healthcare billing, and conversational AI. I also build what I design, with two apps live on the App Store that I researched, designed, and shipped solo. Currently a Senior UX Designer at Capital Group.",
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
    period: "Mar 2026 – Present",
    start: "2026-03",
    title: "Senior UX Designer",
    org: "Capital Group (via Luxoft)",
    location: "Los Angeles, CA",
    bullets: [
      "Designed Scout, a conversational AI assistant that helps teams with their research, in a regulated industry, partnering with product, engineering, and compliance stakeholders",
      "Contribute to shared design systems and interaction patterns used across product teams",
    ],
  },
  {
    period: "2024 – Present",
    start: "2024-01",
    title: "Founder, Product Designer & Developer",
    org: "Appfinity Labs (Independent)",
    location: "Los Angeles, CA",
    bullets: [
      "Designed and built a HIPAA-compliant doula care and Medi-Cal billing portal for a Bay Area birth-justice nonprofit, now used by about 60 people across 5 community birth organizations: visit logging against Medi-Cal caps, CMS-1500 claims, five roles enforced with row-level security, two-factor sign-in and audit logs",
      "Designed, built and shipped EBT Finder, a SNAP/EBT store locator on the App Store and web: 264,000+ locations across 53 states and territories and about 1,500 US users a month; 9 of 10 test participants found hot food in under 15 seconds",
      "Designed, built and shipped Beles, a dating and community app for the Tigrayan diaspora, now on the App Store; usability testing raised understanding of its traditional matchmaking feature from 5 of 8 testers to 7 of 8",
      "Build production React, Supabase and Capacitor apps, including LLM features with guardrails and human-in-the-loop review",
    ],
  },
  {
    period: "Apr 2023 – Mar 2026",
    start: "2023-04",
    end: "2026-03",
    title: "UX Designer",
    org: "Asure Software",
    location: "Austin, TX",
    bullets: [
      "As the sole designer embedded onsite, re-architected the configuration model behind 9,000+ tax agencies; after launch the team saw fewer configuration errors and faster onboarding of new agencies",
      "Led research and information architecture for OneAsure, consolidating four HR portals and logins into one product across 16 interviews and 24 usability tests; support tickets went down after launch",
      "Designed the persona and conversational scripts for Luna, an enterprise AI chatbot integrated across HR, payroll, and benefits",
      "Authored WCAG-compliant design system guidelines that set accessibility standards across web and mobile products",
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
      "Designed onboarding flows for VR-based English language learning experiences",
      "Created Immerse's first content and design framework, reusable guidelines that instructional designers built lessons from",
      "Ran usability tests to find where learners stumbled on language, then rewrote the prompt sequences around those points",
      "Partnered with instructional designers and engineers so UI copy followed pedagogical best practices",
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
      "Designed and wrote UX for multiple concurrent SaaS client projects across industries",
      "Built a modular Figma design system with standard copy patterns for error states, empty states, and CTAs",
      "Refined CTA copy with stakeholders against business KPIs and conversion data",
    ],
  },
];

export const sideProjects = [
  {
    title: "EBT Finder",
    description:
      "Designed, built, and shipped solo: a review-first SNAP/EBT store locator on the App Store and at ebtfinder.org. UX research, Figma, React, Supabase.",
  },
  {
    title: "Beles",
    description: "Designed, built, and shipped solo: a dating and community app for the Tigrayan diaspora, now on the App Store.",
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
  { label: "Collaboration", skills: ["Cross-functional Teams", "Workshop Facilitation", "Lean UX", "Design Critique"] },
  { label: "AI", skills: ["Prompt Engineering", "AI Prototyping", "LLM Integration", "Human-in-the-Loop Design"] },
];

export const contactLinks = [
  { kind: "email", label: person.email, href: `mailto:${person.email}` },
  { kind: "linkedin", label: person.linkedinLabel, href: person.linkedin },
  { kind: "website", label: person.websiteLabel, href: person.website },
] as const;

export const resumePdfPath = "/resume/huruy-kidanemariam-resume.pdf";
