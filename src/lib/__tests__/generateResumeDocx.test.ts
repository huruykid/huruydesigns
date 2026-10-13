import { describe, expect, it } from "vitest";
import { Packer } from "docx";
import JSZip from "jszip";
import { readFileSync } from "node:fs";

import { buildResumeDocument } from "../generateResumeDocx";
import { experience, person } from "../resume";

describe("ATS Word resume", () => {
  it("is a single column with no tables and every role in order", async () => {
    const buf = await Packer.toBuffer(buildResumeDocument());
    const xml = await (await JSZip.loadAsync(buf)).file("word/document.xml")!.async("string");

    expect(xml).not.toContain("<w:tbl>");
    expect(xml).toContain(person.name);

    const positions = experience.map((job) => xml.indexOf(`${job.org} | ${job.location} | ${job.period}`));
    expect(positions.every((p) => p > 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);

    for (const heading of ["SUMMARY", "EXPERIENCE", "SKILLS"]) expect(xml).toContain(heading);
  });

  it("floats the photo outside the text flow when one is provided", async () => {
    const photo = readFileSync("src/assets/huruy-headshot-circle.png");
    const zip = await JSZip.loadAsync(await Packer.toBuffer(buildResumeDocument(photo)));
    const xml = await zip.file("word/document.xml")!.async("string");

    expect(xml).toContain("<wp:anchor");
    expect(xml).not.toContain("<w:tbl>");
    expect(Object.keys(zip.files).some((f) => f.startsWith("word/media/"))).toBe(true);
  });
});
