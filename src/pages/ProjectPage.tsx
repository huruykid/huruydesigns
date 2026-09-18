import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import { projects, findProject, publicProjects, Project } from "@/lib/projects";
import { PERSON_REF, absoluteUrl } from "@/lib/seo";
import { imageDimensions } from "@/lib/imageDimensions";
import ImageSlot from "@/components/case-study/ImageSlot";
import ResponsiveAppShell from "@/components/case-study/ResponsiveAppShell";
import BelesCaseStudy from "@/components/case-study/BelesCaseStudy";
import OneAsureCaseStudy from "@/components/case-study/OneAsureCaseStudy";
import AsureComplianceCaseStudy from "@/components/case-study/AsureComplianceCaseStudy";
import AsurePublicCaseStudy from "@/components/case-study/AsurePublicCaseStudy";
import CapitalGroupCaseStudy from "@/components/case-study/CapitalGroupCaseStudy";
import EBTFinderCaseStudy from "@/components/case-study/EBTFinderCaseStudy";
import FentFinderCaseStudy from "@/components/case-study/FentFinderCaseStudy";
import AppStorePromoBanner from "@/components/AppStorePromoBanner";
import EBTSearchDemo from "@/components/case-study/EBTSearchDemo";
import BenefitsModuleDemo from "@/components/case-study/BenefitsModuleDemo";
import TaxComplianceDashboardDemo from "@/components/case-study/TaxComplianceDashboardDemo";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import AccessGate from "@/components/AccessGate";
import NotFound from "./NotFound";
import type { AsureGatedContent } from "@/lib/gatedContent";

const HeroPhoneMockup = () => {
  const isMobile = useIsMobile();
  return (
    <ResponsiveAppShell label="OneAsure Portal">
      <BenefitsModuleDemo layout={isMobile ? "mobile" : "desktop"} />
    </ResponsiveAppShell>
  );
};

const HeroVisual = ({ project, heroImage }: { project: Project; heroImage?: string }) => {
  if (project.id === "oneasure-portal") return <HeroPhoneMockup />;
  if (project.id === "asure-compliance") {
    return (
      <ResponsiveAppShell label="Asure Compliance Engine" desktopWidth={480} desktopHeight={400} allowToggle>
        <TaxComplianceDashboardDemo />
      </ResponsiveAppShell>
    );
  }
  if (project.id === "ebtfinder") {
    return (
      <ResponsiveAppShell label="EBT Finder Prototype" allowToggle>
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
      <div className={isMockup ? "flex items-center justify-center w-full" : "w-full overflow-hidden rounded-xl border border-border"}>
        <img
          src={project.image}
          alt={`${project.title} case study cover by Huruy Kidanemariam`}
          width={dims?.width ?? 1200}
          height={dims?.height ?? 750}
          decoding="async"
          className={isMockup ? "w-full max-w-[420px] h-auto object-contain drop-shadow-2xl" : "w-full h-auto"}
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
  const [gatedContent, setGatedContent] = useState<AsureGatedContent | null>(null);

  // Reset unlocked content when navigating between projects.
  useEffect(() => {
    setGatedContent(null);
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Link to="/#projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" aria-hidden="true" /> Back to projects
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">{project.impact}</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3 font-display">
                {project.title}<span className="sr-only">: UX Case Study</span>
              </h1>
              <div className="mb-6">
                <AppStorePromoBanner project={project} />
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span><strong className="text-foreground">Role:</strong> {project.role}</span>
                <span><strong className="text-foreground">Timeline:</strong> {project.timeline}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tools.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
              </div>
              {project.challenge && (
                <div className="border-l-2 border-accent/40 pl-4 max-w-2xl">
                  <p className="text-accent font-semibold text-xs uppercase tracking-wide mb-1">The Challenge</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.challenge}</p>
                </div>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center justify-center">
              <HeroVisual project={project} heroImage={uploadedImages.hero} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 pb-24 max-w-4xl">
        {project.id === "beles" ? (
          <BelesCaseStudy project={project} {...slotProps} />
        ) : project.id === "oneasure-portal" ? (
          <OneAsureCaseStudy project={project} {...slotProps} />
        ) : project.id === "asure-compliance" ? (
          gatedContent ? (
            <AsureComplianceCaseStudy project={project} content={gatedContent} />
          ) : (
            <>
              <AsurePublicCaseStudy project={project} />
              <AccessGate project={project} onAccessGranted={setGatedContent} />
            </>
          )
        ) : project.id === "capital-group-research" ? (
          <CapitalGroupCaseStudy project={project} {...slotProps} />
        ) : project.id === "ebtfinder" ? (
          <EBTFinderCaseStudy project={project} {...slotProps} />
        ) : project.id === "fentfinder" ? (
          <FentFinderCaseStudy project={project} {...slotProps} />
        ) : null}

        {/* Next project */}
        <div className="border-t border-border pt-12">
          <p className="text-sm text-muted-foreground mb-2">Next project</p>
          <Link to={`/project/${next.id}`} className="group inline-flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors font-display">
            {next.title} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
