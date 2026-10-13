import {
  Document,
  Paragraph,
  TextRun,
  BorderStyle,
  ExternalHyperlink,
  Packer,
  ImageRun,
  HorizontalPositionRelativeFrom,
  HorizontalPositionAlign,
  VerticalPositionRelativeFrom,
  VerticalPositionAlign,
  TextWrappingType,
} from "docx";
import { saveAs } from "file-saver";

import { person, experience, leadership, skillGroups } from "./resume";
import headshotCircleUrl from "@/assets/huruy-headshot-circle.png";

/**
 * ATS-friendly Word resume.
 *
 * One column, standard section headings, plain text runs and real bullets. No
 * tables, text boxes, icons or columns: applicant tracking systems read those
 * out of order or drop them. Side projects are not repeated here because they
 * already appear as the Appfinity Labs role under Experience.
 *
 * The photo floats at the top right, outside the text flow, so parsers that
 * ignore images still read the name, contact line and sections in order. The
 * PNG is pre-cropped to a circle with transparent corners (Word has no
 * portable circular mask).
 */

const FONT = "Calibri";
const TEXT = "1F1F1F";
const MUTED = "555555";
// Half-point sizes. Two pages is fine for 8+ years, so this favors easy reading
// over cramming: 11pt body, 0.75in margins, 1.15 line spacing.
const BODY = 22;
const META = 21;

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    spacing: { before: 300, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "BBBBBB", space: 2 } },
    children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 24, bold: true, color: TEXT })],
  });
}

function roleHeader(title: string, org: string, location: string, period: string): Paragraph[] {
  return [
    new Paragraph({
      spacing: { before: 200, after: 20 },
      keepNext: true,
      children: [new TextRun({ text: title, font: FONT, size: 22, bold: true, color: TEXT })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      keepNext: true,
      children: [new TextRun({ text: `${org} | ${location} | ${period}`, font: FONT, size: META, color: MUTED })],
    }),
  ];
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    spacing: { after: 60 },
    bullet: { level: 0 },
    indent: { left: 360, hanging: 240 },
    children: [new TextRun({ text, font: FONT, size: BODY, color: TEXT })],
  });
}

function link(text: string, href: string): ExternalHyperlink {
  return new ExternalHyperlink({ link: href, children: [new TextRun({ text, font: FONT, size: META, color: TEXT })] });
}

const PHOTO_PX = 84; // ~0.9in at 96dpi

function photoRun(data: ArrayBuffer | Uint8Array): ImageRun {
  return new ImageRun({
    type: "png",
    data,
    transformation: { width: PHOTO_PX, height: PHOTO_PX },
    altText: { name: "Photo", title: person.name, description: `Photo of ${person.name}` },
    floating: {
      horizontalPosition: { relative: HorizontalPositionRelativeFrom.MARGIN, align: HorizontalPositionAlign.RIGHT },
      verticalPosition: { relative: VerticalPositionRelativeFrom.MARGIN, align: VerticalPositionAlign.TOP },
      wrap: { type: TextWrappingType.SQUARE },
      margins: { left: 114300 },
    },
  });
}

/** Builds the document. Exported separately from the download so it can be tested. */
export function buildResumeDocument(photo?: ArrayBuffer | Uint8Array): Document {
  const sep = () => new TextRun({ text: "  |  ", font: FONT, size: META, color: MUTED });

  const children: Paragraph[] = [
    new Paragraph({
      spacing: { after: 20 },
      children: [
        ...(photo ? [photoRun(photo)] : []),
        new TextRun({ text: person.name, font: FONT, size: 40, bold: true, color: TEXT }),
      ],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: person.title, font: FONT, size: 26, color: TEXT })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        new TextRun({ text: person.location, font: FONT, size: META, color: TEXT }),
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
      spacing: { after: 60 },
      children: [new TextRun({ text: person.summary, font: FONT, size: BODY, color: TEXT })],
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
          spacing: { after: 60 },
          children: [
            new TextRun({ text: `${group.label}: `, font: FONT, size: BODY, bold: true, color: TEXT }),
            new TextRun({ text: group.skills.join(", "), font: FONT, size: BODY, color: TEXT }),
          ],
        }),
    ),

    sectionHeading("Leadership & Community"),
    ...leadership.flatMap((item) => [
      ...roleHeader(item.title, item.org, item.location, item.period),
      bullet(item.description),
    ]),
  ];

  return new Document({
    creator: person.name,
    title: `${person.name} – Resume`,
    styles: { default: { document: { run: { font: FONT, size: BODY }, paragraph: { spacing: { line: 276 } } } } },
    sections: [
      {
        // US Letter; the docx library defaults to A4.
        properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1008, bottom: 1008, left: 1080, right: 1080 } } },
        children,
      },
    ],
  });
}

export async function generateAndDownloadDocx() {
  // A missing photo should never block the download.
  const photo = await fetch(headshotCircleUrl)
    .then((r) => (r.ok ? r.arrayBuffer() : undefined))
    .catch(() => undefined);
  const blob = await Packer.toBlob(buildResumeDocument(photo));
  saveAs(blob, "huruy-kidanemariam-resume-ats.docx");
}
