import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { person } from "@/lib/resume";
import SEO from "@/components/SEO";
import { projects, findProject, publicProjects, Project } from "@/lib/projects";
import { PERSON_REF, absoluteUrl } from "@/lib/seo";
import { imageDimensions } from "@/lib/imageDimensions";
import ImageSlot from "@/components/case-study/ImageSlot";
import ResponsiveAppShell from "@/components/case-study/ResponsiveAppShell";
import BelesCaseStudy from "@/components/case-study/BelesCaseStudy";
import OneAsureCaseStudy from "@/components/case-study/OneAsureCaseStudy";
import AsureComplianceCaseStudy from "@/components/case-study/AsureComplianceCaseStudy";
import EBTFinderCaseStudy from "@/components/case-study/EBTFinderCaseStudy";
import FentFinderCaseStudy from "@/components/case-study/FentFinderCaseStudy";
import AppStorePromoBanner from "@/components/AppStorePromoBanner";
import EBTSearchDemo from "@/components/case-study/EBTSearchDemo";
import BelesAppDemo from "@/components/case-study/BelesAppDemo";
import OneAsurePortalDemo from "@/components/case-study/OneAsurePortalDemo";
import AsureConfigDemo from "@/components/case-study/AsureConfigDemo";
import { Caption } from "@/components/case-study/primitives";
import { supabase } from "@/integrations/supabase/client";
import NotFound from "./NotFound";
import { asureContent } from "@/lib/asureContent";

/**
 * The prototype under the summary. Complex desktop demos take the whole page
 * container; phone apps stay in a realistically proportioned phone frame.
 */
const HeroVisual = ({ project, heroImage }: { project: Project; heroImage?: string }) => {
  if (project.id === "oneasure-portal") {
    return (
      <div className="mx-auto w-full max-w-[1120px]">
        <ResponsiveAppShell label="OneAsure Portal" allowToggle minDesktopWidth={640} desktopHeight={600} mobileWidth={340} mobileHeight={640}>
          <OneAsurePortalDemo initial="Benefits" />
        </ResponsiveAppShell>
      </div>
    );
  }
  if (project.id === "asure-compliance") {
    return (
      <figure className="w-full">
        <ResponsiveAppShell label="Compliance Engine · tax code configuration" allowToggle minDesktopWidth={640} desktopHeight={620} mobileWidth={340} mobileHeight={640}>
          <AsureConfigDemo />
        </ResponsiveAppShell>
        <Caption center>Recreated with sample data to show the design decisions. Not Asure's production UI.</Caption>
      </figure>
    );
  }
  if (project.id === "beles") {
    return (
      <ResponsiveAppShell label="Beles" fixedLayout="mobile" mobileWidth={320} mobileHeight={640}>
        <BelesAppDemo width={314} height={640} />
      </ResponsiveAppShell>
    );
  }
  if (project.id === "ebtfinder") {
    return (
      <ResponsiveAppShell label="ebtfinder.org" fixedLayout="mobile" mobileWidth={340} mobileHeight={640}>
        <EBTSearchDemo />
      </ResponsiveAppShell>
    );
  }
  if (heroImage) {
    return <ImageSlot slot="hero" label={`${project.title} hero image`} imageSrc={heroImage} priority />;
  }
  if (project.image && project.image !== "/placeholder.svg") {
    const dims = imageDimensions[project.image];
    const isMockup = project.image.includes("hero-mockup");
    return (
      <div className={isMockup ? "flex w-full items-center justify-center" : "mx-auto w-full max-w-[1120px] overflow-hidden rounded-xl border border-border"}>
        <img
          src={project.image}
          alt={`${project.title} case study cover by Huruy Kidanemariam`}
          width={dims?.width ?? 1200}
          height={dims?.height ?? 750}
          decoding="async"
          className={isMockup ? "h-auto w-full max-w-[420px] object-contain drop-shadow-2xl" : "h-auto w-full"}
        />
      </div>
    );
  }
  return null;
};

const ProjectPage = () => {
  const { id } = useParams();
  const project = findProject(id);
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});

  // Reset image overrides when navigating between projects.
  useEffect(() => {
    setUploadedImages({});
  }, [project?.id]);

  // Optional per-slot image overrides. The statically known image renders immediately;
  // an override swaps in when (and if) the row arrives.
  useEffect(() => {
    if (!project) return;
    let cancelled = false;
    supabase
      .from("case_study_images")
      .select("slot, image_url")
      .eq("project_id", project.id)
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const map: Record<string, string> = {};
        for (const row of data) map[row.slot] = row.image_url;
        setUploadedImages(map);
      });
    return () => {
      cancelled = true;
    };
  }, [project?.id, project]);

  const getSlotImage = useCallback(
    (slot: string) => uploadedImages[slot] || project?.sectionImages?.[slot],
    [uploadedImages, project?.sectionImages],
  );

  if (!project) return <NotFound />;

  const visible = publicProjects();
  const currentIdx = visible.findIndex((p) => p.id === project.id);
  const next = visible[(currentIdx + 1) % visible.length] ?? projects[0];

  const slotProps = { getSlotImage };
  const ogImage = project.ogImage ?? project.image;
  const ogDims = imageDimensions[ogImage];

  return (
    <>
      <SEO
        title={`${project.title} UX Case Study | Huruy Kidanemariam`}
        description={project.seoDescription || project.description}
        path={`/project/${project.id}`}
        image={ogImage !== "/placeholder.svg" ? ogImage : undefined}
        imageWidth={ogDims?.width}
        imageHeight={ogDims?.height}
        imageAlt={`${project.title} case study cover, by Huruy Kidanemariam`}
        ogType="article"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: project.title, path: `/project/${project.id}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          url: absoluteUrl(`/project/${project.id}`),
          image: ogImage !== "/placeholder.svg" ? absoluteUrl(ogImage) : undefined,
          author: PERSON_REF,
          genre: "UX Case Study",
        }}
      />
      {/* Hero */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container">
          <Link to="/#work" className="mb-10 inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-accent">
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" /> All work
          </Link>
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {project.logo && (
                <img
                  src={project.logo}
                  alt=""
                  width={64}
                  height={64}
                  decoding="async"
                  className="mb-6 h-14 w-14 rounded-[22%] shadow-[0_6px_16px_-6px_rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:ring-white/15 sm:h-16 sm:w-16"
                />
              )}
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-accent">{project.impact}</p>
              <h1 className="mb-6 text-4xl font-bold tracking-tight font-display sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
                {project.title}<span className="sr-only">: UX Case Study</span>
              </h1>
              <p className="mb-8 max-w-[52ch] text-lg leading-relaxed text-muted-foreground sm:text-xl">{project.description}</p>
              <AppStorePromoBanner project={project} />
              <dl className="mb-8 mt-8 grid max-w-xl gap-x-8 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
                <dt className="font-medium text-foreground">Role</dt>
                <dd className="text-muted-foreground">{project.role}</dd>
                <dt className="font-medium text-foreground">Timeline</dt>
                <dd className="text-muted-foreground">{project.timeline}</dd>
                <dt className="font-medium text-foreground">Tools</dt>
                <dd className="text-muted-foreground">{project.tools.join(", ")}</dd>
              </dl>
              {project.keyResults && (
                <dl className="grid max-w-2xl grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
                  {project.keyResults.map((r) => (
                    <div key={r.label} className="flex flex-col">
                      <dt className="order-2 text-sm leading-5 text-muted-foreground">{r.label}</dt>
                      <dd className="order-1 mb-1 text-2xl font-bold leading-none tracking-tight text-foreground font-display">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </motion.div>
            {/* At a glance: the one-minute read, beside the title so reviewers get context before the demo */}
            <motion.section
              aria-labelledby="tldr-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="min-w-0 rounded-xl border border-border bg-background p-6 lg:p-8"
            >
              <h2 id="tldr-heading" className="mb-6 text-xs font-semibold uppercase tracking-[0.14em] text-accent">At a glance</h2>
              <dl className="grid gap-6">
                {[
                  { k: "Problem", v: project.problem },
                  { k: "Solution", v: project.solution },
                  { k: "Outcome", v: project.outcomeMetrics },
                ].map(({ k, v }) => (
                  <div key={k} className="min-w-0">
                    <dt className="mb-1.5 text-base font-bold tracking-tight text-foreground font-display">{k}</dt>
                    <dd className="text-[15px] leading-7 text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </motion.section>
          </div>
        </div>
      </section>

      {/* The interactive prototype or hero visual, after the summary */}
      <section aria-label={`${project.title} prototype`} className="border-y border-border">
        <div className="container flex justify-center py-16 lg:py-24">
          <HeroVisual project={project} heroImage={uploadedImages.hero} />
        </div>
      </section>

      {/* Content */}
      <div className="container pb-16 pt-16 lg:pb-24 lg:pt-24">
        {project.id === "beles" ? (
          <BelesCaseStudy project={project} {...slotProps} />
        ) : project.id === "oneasure-portal" ? (
          <OneAsureCaseStudy project={project} {...slotProps} />
        ) : project.id === "asure-compliance" ? (
          <AsureComplianceCaseStudy project={project} content={asureContent} />
        ) : project.id === "ebtfinder" ? (
          <EBTFinderCaseStudy project={project} {...slotProps} />
        ) : project.id === "fentfinder" ? (
          <FentFinderCaseStudy project={project} {...slotProps} />
        ) : null}

        {/* Next project, and a way to reach Huruy without going back to the homepage */}
        <div className="mx-auto grid max-w-[1120px] gap-10 border-t border-border pt-16 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Next project</p>
            <Link to={`/project/${next.id}`} className="group inline-flex items-center gap-2 text-2xl font-medium tracking-tight hover:underline underline-offset-4">
              {next.title} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Hiring for a senior UX role?</p>
            <p className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
              <a href={`mailto:${person.email}?subject=${encodeURIComponent(`Senior UX role (re: ${project.title})`)}`} className="underline underline-offset-4 hover:text-muted-foreground">
                Email {person.givenName}
              </a>
              <Link to="/resume" className="underline underline-offset-4 hover:text-muted-foreground">View resume</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
