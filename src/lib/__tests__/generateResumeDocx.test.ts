import { describe, expect, it } from "vitest";
import { Packer } from "docx";
import JSZip from "jszip";

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
});
