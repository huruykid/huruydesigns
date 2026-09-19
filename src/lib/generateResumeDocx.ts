import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ExternalHyperlink,
  Packer,
} from "docx";
import { saveAs } from "file-saver";

import { person, experience, sideProjects, leadership, skillGroups } from "./resume";

const FONT = "Calibri";
const ACCENT_COLOR = "B34A05";
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
      text: person.summary,
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
            children: [new TextRun({ text: person.name, font: FONT, size: 40, bold: true })],
          }),
          // Title
          new Paragraph({
            spacing: { after: 60 },
            children: [new TextRun({ text: person.title, font: FONT, size: 28, color: ACCENT_COLOR, bold: true })],
          }),
          // Contact
          new Paragraph({
            spacing: { after: 120 },
            children: [
              new ExternalHyperlink({
                link: `mailto:${person.email}`,
                children: [new TextRun({ text: person.email, font: FONT, size: 20, color: "555555" })],
              }),
              new TextRun({ text: "  |  ", font: FONT, size: 20, color: "AAAAAA" }),
              new ExternalHyperlink({
                link: person.linkedin,
                children: [new TextRun({ text: person.linkedinLabel, font: FONT, size: 20, color: "555555" })],
              }),
              new TextRun({ text: "  |  ", font: FONT, size: 20, color: "AAAAAA" }),
              new ExternalHyperlink({
                link: person.website,
                children: [new TextRun({ text: person.websiteLabel, font: FONT, size: 20, color: "555555" })],
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
