import { Document, Paragraph, TextRun, BorderStyle, ExternalHyperlink, Packer } from "docx";
import { saveAs } from "file-saver";

import { person, experience, leadership, skillGroups } from "./resume";

/**
 * ATS-friendly Word resume.
 *
 * One column, standard section headings, plain text runs and real bullets. No
 * tables, text boxes, icons or columns: applicant tracking systems read those
 * out of order or drop them. Side projects are not repeated here because they
 * already appear as the Appfinity Labs role under Experience.
 */

const FONT = "Calibri";
const TEXT = "1F1F1F";
const MUTED = "555555";

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB", space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 22, bold: true, color: TEXT })],
  });
}

function roleHeader(title: string, org: string, location: string, period: string): Paragraph[] {
  return [
    new Paragraph({
      spacing: { before: 120, after: 0 },
      keepNext: true,
      children: [new TextRun({ text: title, font: FONT, size: 22, bold: true, color: TEXT })],
    }),
    new Paragraph({
      spacing: { after: 40 },
      keepNext: true,
      children: [new TextRun({ text: `${org} | ${location} | ${period}`, font: FONT, size: 20, color: MUTED })],
    }),
  ];
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 30 },
    bullet: { level: 0 },
    indent: { left: 340, hanging: 220 },
    children: [new TextRun({ text, font: FONT, size: 20, color: TEXT })],
  });
}

function link(text: string, href: string): ExternalHyperlink {
  return new ExternalHyperlink({ link: href, children: [new TextRun({ text, font: FONT, size: 20, color: TEXT })] });
}

/** Builds the document. Exported separately from the download so it can be tested. */
export function buildResumeDocument(): Document {
  const sep = () => new TextRun({ text: "  |  ", font: FONT, size: 20, color: MUTED });

  const children: Paragraph[] = [
    new Paragraph({
      spacing: { after: 20 },
      children: [new TextRun({ text: person.name, font: FONT, size: 36, bold: true, color: TEXT })],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: person.title, font: FONT, size: 24, color: TEXT })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: person.location, font: FONT, size: 20, color: TEXT }),
        sep(),
        link(person.email, `mailto:${person.email}`),
        sep(),
        link(person.linkedinLabel, person.linkedin),
        sep(),
        link(person.websiteLabel, person.website),
      ],
    }),

    sectionHeading("Summary"),
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: person.summary, font: FONT, size: 20, color: TEXT })],
    }),

    sectionHeading("Experience"),
    ...experience.flatMap((job) => [
      ...roleHeader(job.title, job.org, job.location, job.period),
      ...job.bullets.map(bullet),
    ]),

    sectionHeading("Skills"),
    ...skillGroups.map(
      (group) =>
        new Paragraph({
          spacing: { after: 20 },
          children: [
            new TextRun({ text: `${group.label}: `, font: FONT, size: 20, bold: true, color: TEXT }),
            new TextRun({ text: group.skills.join(", "), font: FONT, size: 20, color: TEXT }),
          ],
        }),
    ),

    sectionHeading("Leadership & Community"),
    ...leadership.flatMap((item) => [
      new Paragraph({
        spacing: { before: 80, after: 20 },
        keepNext: true,
        children: [
          new TextRun({ text: item.title, font: FONT, size: 20, bold: true, color: TEXT }),
          new TextRun({ text: `  ${item.org} | ${item.location} | ${item.period}`, font: FONT, size: 20, color: MUTED }),
        ],
      }),
      new Paragraph({ children: [new TextRun({ text: item.description, font: FONT, size: 20, color: TEXT })] }),
    ]),
  ];

  return new Document({
    creator: person.name,
    title: `${person.name} – Resume`,
    styles: { default: { document: { run: { font: FONT, size: 20 }, paragraph: { spacing: { line: 250 } } } } },
    sections: [
      {
        // US Letter; the docx library defaults to A4.
        properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 576, bottom: 576, left: 720, right: 720 } } },
        children,
      },
    ],
  });
}

export async function generateAndDownloadDocx() {
  const blob = await Packer.toBlob(buildResumeDocument());
  saveAs(blob, "huruy-kidanemariam-resume-ats.docx");
}
