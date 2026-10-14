import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import FintechUX from "../FintechUX";
import { person } from "@/lib/resume";
import { findProject } from "@/lib/projects";

const renderPage = () => render(<HelmetProvider><MemoryRouter><FintechUX /></MemoryRouter></HelmetProvider>);

describe("Fintech UX page", () => {
  it("leads with Capital Group and approved high-level details", () => {
    renderPage();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Senior UX Designer at Capital Group");
    expect(screen.getByText("Contract through Luxoft · since March 2026 · Los Angeles")).toBeInTheDocument();
    const section = screen.getByRole("region", { name: "At Capital Group" });
    expect(within(section).getAllByRole("listitem")).toHaveLength(3);
    expect(within(section).getByText(/Designed Scout/)).toBeInTheDocument();
    expect(within(section).queryByRole("img")).toBeNull();
    expect(within(section).getByText(/under NDA/)).toBeInTheDocument();
  });

  it("takes supporting card content from shared projects", () => {
    renderPage();
    const section = screen.getByRole("region", { name: "Fintech case studies" });
    for (const id of ["asure-compliance", "oneasure-portal"]) {
      const project = findProject(id);
      expect(project).toBeDefined();
      if (!project) return;
      expect(within(section).getByRole("heading", { name: project.title })).toBeInTheDocument();
      expect(within(section).getByText(project.description)).toBeInTheDocument();
      expect(within(section).getByText(project.impact)).toBeInTheDocument();
      expect(within(section).getByRole("link", { name: new RegExp(project.title) })).toHaveAttribute("href", `/project/${id}`);
    }
  });

  it("wires anchor, resume and email links", () => {
    renderPage();
    expect(screen.getByRole("link", { name: "See the fintech case studies" })).toHaveAttribute("href", "#case-studies");
    expect(screen.getByRole("region", { name: "Fintech case studies" })).toHaveAttribute("id", "case-studies");
    for (const link of screen.getAllByRole("link", { name: "View resume" })) expect(link).toHaveAttribute("href", "/resume");
    expect(screen.getByRole("link", { name: `Email ${person.givenName}` })).toHaveAttribute("href", `mailto:${person.email}`);
    expect(within(screen.getByRole("region", { name: "How I design for regulated finance" })).getAllByRole("listitem")).toHaveLength(4);
  });
});