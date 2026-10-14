import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ProjectCard";
import SEO from "@/components/SEO";
import { NumberedList, Wide } from "@/components/case-study/primitives";
import { findProject } from "@/lib/projects";
import { experience, person } from "@/lib/resume";

const currentRole = experience.find((role) => role.org === person.currentEmployerFull && !role.end);
const contractProvider = currentRole?.org.match(/\(via (.+)\)/)?.[1];
const startDate = currentRole
  ? new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${currentRole.start}-01T00:00:00Z`))
  : undefined;
const employmentDetails = [
  contractProvider ? `Contract through ${contractProvider}` : currentRole?.org,
  startDate ? `since ${startDate}` : undefined,
  (currentRole?.location ?? person.location).split(",")[0],
].filter(Boolean).join(" · ");

const studies = [
  { id: "asure-compliance", context: "Payroll tax compliance across 9,000+ agencies: a misconfiguration is a failed filing, not a bug." },
  { id: "oneasure-portal", context: "Four HR and payroll portals consolidated into one product with one login." },
];

const principles = [
  "Never show a state the system isn't in.",
  "Warn before you block, and explain every block.",
  "Keep an audit trail the user can read.",
  "Put complex rules in plain language at the moment they apply.",
];

const FintechUX = () => (
  <>
    <SEO
      title="Fintech UX Designer | Huruy Kidanemariam, Senior UX Designer at Capital Group"
      description="Senior UX Designer at Capital Group, designing investment research tools in a regulated environment. Explore Huruy's payroll compliance and HR work at Asure."
      path="/fintech-ux-designer"
      breadcrumbs={[{ name: "Home", path: "/" }, { name: "Fintech UX design", path: "/fintech-ux-designer" }]}
    />
    <div className="container cs-flow pt-16 sm:pt-24 lg:pt-28">
      <section className="mb-16 lg:mb-24" aria-labelledby="fintech-heading">
        <p className="mb-4 text-sm font-medium text-accent">Fintech UX design</p>
        <h1 id="fintech-heading" className="mb-6 text-4xl font-light leading-tight tracking-normal sm:text-5xl">
          Senior UX Designer at Capital Group
        </h1>
        <p className="mb-5 text-lg leading-relaxed text-foreground">
          I design investment research tools for analysts and researchers at Capital Group, the investment management firm behind American Funds. Before that, I spent three years designing payroll tax compliance and HR products at Asure Software. My focus is finance software where a confusing screen becomes a costly mistake.
        </p>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">{employmentDetails}</p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="min-h-11 rounded-full px-6">
            <a href="#case-studies">See the fintech case studies</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-h-11 rounded-full px-6">
            <Link to="/resume">View resume</Link>
          </Button>
        </div>
      </section>

      <section className="mb-16 lg:mb-24" aria-labelledby="capital-group-heading">
        <h2 id="capital-group-heading" className="mb-6 text-2xl font-medium tracking-normal sm:text-3xl">At Capital Group</h2>
        <ul className="mb-6 list-disc space-y-4 pl-5 text-base leading-relaxed marker:text-accent">
          <li>Designing investment research tools for analysts and researchers.</li>
          <li>Designed Scout, a conversational assistant that helps with research.</li>
          <li>Working inside a regulated, high-trust environment.</li>
        </ul>
        <p className="text-sm leading-relaxed text-muted-foreground">
          This work is under NDA, so there are no screens here. Happy to talk through the approach in an interview.
        </p>
      </section>

      <section id="case-studies" className="cs-full cs-flow mb-16 scroll-mt-24 lg:mb-24" aria-labelledby="fintech-studies-heading">
        <h2 id="fintech-studies-heading" className="mb-8 text-2xl font-medium tracking-normal sm:text-3xl">Fintech case studies</h2>
        <Wide>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-10 lg:gap-y-16">
            {studies.map(({ id, context }, index) => {
              const project = findProject(id);
              if (!project) return null;
              return <ProjectCard key={id} project={project} index={index} fintechContext={context} />;
            })}
          </div>
        </Wide>
      </section>

      <section className="mb-16 lg:mb-24" aria-labelledby="finance-principles-heading">
        <h2 id="finance-principles-heading" className="mb-6 text-2xl font-medium tracking-normal sm:text-3xl">How I design for regulated finance</h2>
        <NumberedList items={principles} />
      </section>

      <section className="mb-16 border-t border-border pt-8 lg:mb-24" aria-labelledby="fintech-hiring-heading">
        <h2 id="fintech-hiring-heading" className="mb-6 text-2xl font-medium tracking-normal sm:text-3xl">Hiring for fintech UX?</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button asChild size="lg" className="min-h-11 rounded-full px-6">
            <a href={`mailto:${person.email}`}>Email {person.givenName}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="min-h-11 rounded-full px-6">
            <Link to="/resume">View resume</Link>
          </Button>
        </div>
      </section>
    </div>
  </>
);

export default FintechUX;