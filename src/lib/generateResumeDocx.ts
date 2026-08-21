import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  HeadingLevel,
  ExternalHyperlink,
  Packer,
} from "docx";
import { saveAs } from "file-saver";

// ── Resume Data (mirrored from Resume.tsx) ──

const experience = [
  { period: "Mar 2025 – Present", title: "Senior UX Designer", org: "Capital Group (via Luxoft)", location: "Los Angeles, CA", bullets: [
    "Design research and analysis tools for investment analysts at a $2.7T asset manager, translating complex regulated enterprise workflows into intuitive, trusted interfaces",
    "Partner with product, engineering, and compliance stakeholders to shape AI-assisted research experiences that meet strict governance and accuracy standards",
    "Contribute to design systems and interaction patterns that scale across Capital Group's internal analyst platform",
  ]},
  { period: "2024 – Present", title: "AI Product Designer & Builder", org: "Appfinity Labs (Independent)", location: "Los Angeles, CA", bullets: [
    "Prototype and ship AI-powered products using LLM integrations, prompt engineering, and conversational UX patterns",
    "Design guardrails, feedback loops, and human-in-the-loop flows that keep generative AI outputs accurate and on-brand",
    "Build production React interfaces that connect design decisions directly to working code",
  ]},
  { period: "Apr 2023 – Mar 2025", title: "UX Designer", org: "Asure Software", location: "Austin, TX", bullets: [
    "Led end-to-end UX for a compliance engine used by 9,000+ payroll agencies, re-architecting tax compliance workflows that reduced filing errors",
    "Designed persona and conversational scripts for 'Luna,' an enterprise AI chatbot integrated across HR, payroll, and benefits",
    "Built and authored WCAG-compliant design system guidelines, establishing accessibility standards across web and mobile products",
    "Facilitated cross-functional workshops with product, engineering, and SME stakeholders to align on content strategy and information architecture",
  ]},
  { period: "Jan 2020 – Feb 2023", title: "UX Designer", org: "IMMERSE", location: "Los Angeles, CA", bullets: [
    "Designed onboarding flows for VR-based English language learning experiences, improving learner retention",
    "Developed Immerse's first content and design framework, establishing reusable guidelines for instructional designers",
    "Conducted usability testing to identify linguistic friction points. Rewrote prompt sequences reducing user errors",
    "Partnered with instructional designers and engineers to ensure UI copy aligned with pedagogical best practices",
  ]},
  { period: "Jan 2016 – Jan 2020", title: "Product Designer", org: "Datable", location: "Oakland, CA", bullets: [
    "Managed UX writing and design for multiple concurrent SaaS client projects across diverse industries",
    "Established a modular design system in Figma with standardized copy patterns for error states, empty states, and CTAs",
    "Collaborated with stakeholders to refine CTA copy based on business KPIs and conversion data",
  ]},
];

const sideProjects = [
  { title: "EBT Finder", description: "Designed a review-first SNAP/EBT store locator for 12M+ users. UX Research, Figma, Prototyping" },
  { title: "Beles", description: "Designed a culturally authentic dating app for the Tigrayan diaspora community" },
];

const leadership = [
  { period: "2020 – Present", title: "Communications Team Lead", org: "HPN4Tigray", location: "Portland, OR", description: "Led storytelling and advocacy campaigns that increased donor contributions by 25% and expanded reach by 44%. Built reusable design templates that accelerated campaign launches by 37%." },
];

const skillGroups = [
  { label: "Design", skills: ["Figma", "Prototyping", "Wireframing", "Visual Design", "Design Systems", "Information Architecture", "Journey Mapping"] },
  { label: "Research", skills: ["Usability Testing", "Heuristic Evaluation", "Competitive Analysis", "User Interviews"] },
  { label: "Development", skills: ["React", "HTML/CSS", "JavaScript"] },
  { label: "Collaboration", skills: ["Agile", "Scrum", "Cross-functional Teams", "Lean UX"] },
  { label: "AI", skills: ["Prompt Engineering", "AI Prototyping", "LLM Integration", "AI-Assisted Research"] },
];

const FONT = "Calibri";
const ACCENT_COLOR = "F97316";
const BORDER_NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NO_BORDERS = { top: BORDER_NONE, bottom: BORDER_NONE, left: BORDER_NONE, right: BORDER_NONE };

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 300, after: 140 },
    children: [
      new TextRun({ text: text.toUpperCase(), font: FONT, size: 22, bold: true, color: ACCENT_COLOR }),
    ],
  });
}

function buildSidebar(): TableCell {
  const children: Paragraph[] = [];

  // Skills
  children.push(sectionHeading("Skills"));
  for (const group of skillGroups) {
    children.push(new Paragraph({
      spacing: { before: 120, after: 50 },
      children: [new TextRun({ text: group.label, font: FONT, size: 20, bold: true })],
    }));
    children.push(new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: group.skills.join(", "), font: FONT, size: 19, color: "444444" })],
    }));
  }

  // Education
  children.push(sectionHeading("Education"));
  children.push(new Paragraph({
    children: [new TextRun({ text: "CSU Eastbay", font: FONT, size: 22 })],
  }));

  // Side Projects
  children.push(sectionHeading("Side Projects"));
  for (const p of sideProjects) {
    children.push(new Paragraph({
      spacing: { before: 80, after: 30 },
      children: [new TextRun({ text: p.title, font: FONT, size: 22, bold: true })],
    }));
    children.push(new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: p.description, font: FONT, size: 19, color: "666666" })],
    }));
  }

  return new TableCell({
    width: { size: 25, type: WidthType.PERCENTAGE },
    borders: NO_BORDERS,
    margins: { right: 200 },
    children,
  });
}

function buildMainColumn(): TableCell {
  const children: Paragraph[] = [];

  // Summary
  children.push(sectionHeading("Summary"));
  children.push(new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({
      text: "Senior UX Designer with 8+ years in UX, interaction, and product design, including enterprise conversational AI, payroll, and benefits. Hands-on with generative AI patterns, prompt engineering, and LLM response guardrails in production applications. Currently designing research tools for analysts at Capital Group.",
      font: FONT, size: 22,
    })],
  }));

  // Experience
  children.push(sectionHeading("Experience"));
  for (const job of experience) {
    children.push(new Paragraph({
      spacing: { before: 180, after: 30 },
      children: [
        new TextRun({ text: job.title, font: FONT, size: 24, bold: true }),
        new TextRun({ text: `  |  ${job.period}`, font: FONT, size: 20, color: "666666" }),
      ],
    }));
    children.push(new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: `${job.org} · ${job.location}`, font: FONT, size: 20, color: ACCENT_COLOR })],
    }));
    for (const bullet of job.bullets) {
      children.push(new Paragraph({
        spacing: { after: 80 },
        bullet: { level: 0 },
        children: [new TextRun({ text: bullet, font: FONT, size: 22 })],
      }));
    }
  }

  // Leadership
  children.push(sectionHeading("Design Leadership"));
  for (const item of leadership) {
    children.push(new Paragraph({
      spacing: { before: 180, after: 30 },
      children: [
        new TextRun({ text: item.title, font: FONT, size: 24, bold: true }),
        new TextRun({ text: `  |  ${item.period}`, font: FONT, size: 20, color: "666666" }),
      ],
    }));
    children.push(new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: `${item.org} · ${item.location}`, font: FONT, size: 20, color: ACCENT_COLOR })],
    }));
    children.push(new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: item.description, font: FONT, size: 22 })],
    }));
  }

  return new TableCell({
    width: { size: 75, type: WidthType.PERCENTAGE },
    borders: NO_BORDERS,
    margins: { left: 200 },
    children,
  });
}

export async function generateAndDownloadDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: FONT, size: 22 } },
      },
    },
    sections: [
      {
        properties: { page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } } },
        children: [
          // Name
          new Paragraph({
            spacing: { after: 40 },
            children: [new TextRun({ text: "Huruy Kidanemariam", font: FONT, size: 40, bold: true })],
          }),
          // Title
          new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: "Senior UX Designer", font: FONT, size: 28, color: ACCENT_COLOR, bold: true })],
          }),
          // Contact
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new ExternalHyperlink({
                link: "mailto:huruydesigns@gmail.com",
                children: [new TextRun({ text: "huruydesigns@gmail.com", font: FONT, size: 20, color: "555555" })],
              }),
              new TextRun({ text: "  |  ", font: FONT, size: 20, color: "AAAAAA" }),
              new ExternalHyperlink({
                link: "https://www.linkedin.com/in/huruykidanemariam/",
                children: [new TextRun({ text: "linkedin.com/in/huruykidanemariam", font: FONT, size: 20, color: "555555" })],
              }),
              new TextRun({ text: "  |  ", font: FONT, size: 20, color: "AAAAAA" }),
              new ExternalHyperlink({
                link: "https://huruy.tech",
                children: [new TextRun({ text: "huruy.tech", font: FONT, size: 20, color: "555555" })],
              }),
            ],
          }),
          // Orange separator line
          new Paragraph({
            spacing: { after: 200 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_COLOR } },
            children: [],
          }),
          // Two-column table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: { top: BORDER_NONE, bottom: BORDER_NONE, left: BORDER_NONE, right: BORDER_NONE, insideHorizontal: BORDER_NONE, insideVertical: BORDER_NONE },
            rows: [
              new TableRow({
                children: [buildSidebar(), buildMainColumn()],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "huruy-kidanemariam-resume.docx");
}
