import { describe, it, expect } from "vitest";
import { experience, person, skillGroups } from "../resume";
import { projects, publicProjects, findProject } from "../projects";
import { prerenderRoutes } from "../routes";
import { imageDimensions } from "../imageDimensions";

/**
 * Guards against the content drift the September 2026 audit found: dates that
 * disagree between pages, hidden projects leaking into lists, and images without
 * intrinsic dimensions.
 */
describe("resume data", () => {
  it("has one current employer and consistent date order", () => {
    const current = experience.filter((e) => e.period.endsWith("Present") && e.org.startsWith(person.currentEmployer));
    expect(current).toHaveLength(1);
    expect(current[0].start).toBe("2025-03");

    const asure = experience.find((e) => e.org === "Asure Software")!;
    expect(asure.end).toBe("2025-03");
    expect(asure.period).toBe("Apr 2023 – Mar 2025");
  });

  it("orders experience newest first", () => {
    const starts = experience.map((e) => e.start);
    expect([...starts].sort().reverse()).toEqual(starts);
  });

  it("exposes one skills taxonomy with no duplicates", () => {
    const all = skillGroups.flatMap((g) => g.skills);
    expect(new Set(all).size).toBe(all.length);
  });
});

describe("projects", () => {
  it("never lists hidden projects", () => {
    expect(publicProjects().some((p) => p.hidden)).toBe(false);
    expect(projects.some((p) => p.hidden)).toBe(true);
  });

  it("does not put the gated study in the first slot", () => {
    expect(publicProjects()[0].gated).toBeFalsy();
  });

  it("resolves ids with and without hyphens", () => {
    expect(findProject("ebtfinder")?.id).toBe("ebtfinder");
    expect(findProject("ebt-finder")?.id).toBe("ebtfinder");
    expect(findProject("nope")).toBeUndefined();
  });

  it("uses the shipped EBT Finder metric set everywhere", () => {
    const ebt = findProject("ebtfinder")!;
    const text = JSON.stringify(ebt);
    expect(text).not.toMatch(/65%|62%|92%|45% → 89%|100%/);
    expect(ebt.keyResults?.map((r) => r.value)).toContain("10 of 10");
  });

  it("references only images that exist with known dimensions", () => {
    for (const p of projects) {
      const refs = [p.image, ...Object.values(p.sectionImages ?? {})].filter((s): s is string => !!s && s !== "/placeholder.svg");
      for (const ref of refs) {
        expect(ref, `${p.id} references ${ref}`).toMatch(/\.webp$/);
        expect(imageDimensions[ref], `${p.id}: ${ref} has no dimensions`).toBeDefined();
      }
    }
  });
});

describe("prerender routes", () => {
  it("cover every public project and skip hidden ones", () => {
    const paths = prerenderRoutes.map((r) => r.path);
    for (const p of publicProjects()) expect(paths).toContain(`/project/${p.id}`);
    expect(paths).not.toContain("/project/fentfinder");
    expect(paths).not.toContain("/hire");
  });
});
