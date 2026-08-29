import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Target, MessageSquareQuote, Lightbulb, Search, Users, BookOpen, ChevronRight, BarChart3, Palette, Rocket, Heart, ImageIcon, AlertTriangle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { projects, Project } from "@/lib/projects";
import CaseStudySection from "@/components/case-study/CaseStudySection";
import ImageSlot from "@/components/case-study/ImageSlot";
import CompetitiveAuditTable from "@/components/case-study/CompetitiveAuditTable";
import ResponsiveAppShell from "@/components/case-study/ResponsiveAppShell";

import BelesCaseStudy from "@/components/case-study/BelesCaseStudy";
import OneAsureCaseStudy from "@/components/case-study/OneAsureCaseStudy";
import AsureComplianceCaseStudy from "@/components/case-study/AsureComplianceCaseStudy";
import EBTFinderCaseStudy from "@/components/case-study/EBTFinderCaseStudy";
import FentFinderCaseStudy from "@/components/case-study/FentFinderCaseStudy";
import AppStorePromoBanner from "@/components/AppStorePromoBanner";
import EBTSearchDemo from "@/components/case-study/EBTSearchDemo";
import BenefitsModuleDemo from "@/components/case-study/BenefitsModuleDemo";
import TaxComplianceDashboardDemo from "@/components/case-study/TaxComplianceDashboardDemo";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import AccessGate from "@/components/AccessGate";

const isRichCaseStudy = (p: Project) => !!p.challenge;

const HeroPhoneMockup = () => {
  const isMobile = useIsMobile();
  return (
    <ResponsiveAppShell label="OneAsure Portal">
      <BenefitsModuleDemo layout={isMobile ? "mobile" : "desktop"} />
    </ResponsiveAppShell>
  );
};

interface SlotProps {
  getSlotImage: (slot: string) => string | undefined;
}

const GATED_PROJECTS = ["asure-compliance"];

const ProjectPage = () => {
  const { id } = useParams();
  const [uploadedImages, setUploadedImages] = useState<Record<string, string>>({});
  const [imagesLoading, setImagesLoading] = useState(true);
  const [accessGranted, setAccessGranted] = useState(false);
  
  const normalizedId = id?.replace(/-/g, "");
  const idx = projects.findIndex((p) => p.id === id || p.id === normalizedId);
  const project = idx !== -1 ? projects[idx] : null;
  const isGated = project ? GATED_PROJECTS.includes(project.id) : false;

  const publicProjects = projects.filter((p) => !GATED_PROJECTS.includes(p.id));
  const nextPublicIdx = publicProjects.findIndex((p) => p.id === id || p.id === normalizedId);
  const next = nextPublicIdx !== -1
    ? publicProjects[(nextPublicIdx + 1) % publicProjects.length]
    : publicProjects[0] || project;

  useEffect(() => {
    if (!isGated) {
      setAccessGranted(true);
      return;
    }
    const granted = sessionStorage.getItem(`access_granted_${project!.id}`) === "true";
    setAccessGranted(granted);
  }, [isGated, project?.id]);

  useEffect(() => {
    if (!project) return;
    setImagesLoading(true);
    const fetchImages = async () => {
      try {
        const { data } = await supabase
          .from("case_study_images" as any)
          .select("slot, image_url")
          .eq("project_id", project.id) as any;
        if (data) {
          const map: Record<string, string> = {};
          for (const row of data) map[row.slot] = row.image_url;
          setUploadedImages(map);
        }
      } finally {
        setImagesLoading(false);
      }
    };
    fetchImages();
  }, [project?.id]);

  const getSlotImage = useCallback((slot: string) => {
    if (imagesLoading) return uploadedImages[slot];
    return uploadedImages[slot] || project?.sectionImages?.[slot];
  }, [uploadedImages, project?.sectionImages, imagesLoading]);

  if (!project || !next) return <Navigate to="/" />;

  if (isGated && !accessGranted) {
    return (
      <Layout>
        <SEO
          title={`${project.title} – Request Access`}
          description="This case study contains proprietary work and is available by request."
          path={`/project/${project.id}`}
        />
        <AccessGate project={project} onAccessGranted={() => setAccessGranted(true)} />
      </Layout>
    );
  }

  const rich = isRichCaseStudy(project);
  const slotProps: SlotProps = { getSlotImage };

  return (
    <Layout>
      <SEO
        title={`Huruy Kidanemariam | ${project.title} – UX Case Study`}
        description={project.seoDescription || project.description}
        path={`/project/${project.id}`}
        image={project.image}
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
          url: `https://huruy.tech/project/${project.id}`,
          image: project.image,
          author: { "@type": "Person", name: "Huruy Kidanemariam" },
          genre: "UX Case Study",
        }}
      />
      {/* Hero */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-accent transition-colors mb-8">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Projects
          </Link>
          <AppStorePromoBanner project={project} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-accent font-semibold text-sm tracking-wide uppercase mb-2">{project.impact}</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}<span className="sr-only">: UX Case Study</span></h1>
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
              {project.id === "oneasure-portal" ? (
                <HeroPhoneMockup />
              ) : project.id === "asure-compliance" ? (
                <ResponsiveAppShell label="Asure Compliance Engine" desktopWidth={480} desktopHeight={400} allowToggle>
                  <TaxComplianceDashboardDemo />
                </ResponsiveAppShell>
              ) : project.id === "ebtfinder" ? (
                <ResponsiveAppShell label="EBT Finder Prototype" allowToggle>
                  <EBTSearchDemo />
                </ResponsiveAppShell>
              ) : imagesLoading ? (
                <Skeleton className="w-full max-w-[420px] aspect-video rounded-xl" />
              ) : getSlotImage("hero") ? (
                <ImageSlot slot="hero" label="Hero Image" imageSrc={getSlotImage("hero")} />
              ) : rich && project.image && project.image !== "/placeholder.svg" ? (
                <div className="flex items-center justify-center w-full">
                  <img
                    src={project.image}
                    alt={`${project.title} case study cover by Huruy Kidanemariam`}
                    className="w-full max-w-[420px] h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              ) : (
                <div className="rounded-xl overflow-hidden border border-border aspect-video bg-muted w-full">
                  <img src={project.image} alt={`${project.title} preview, UX case study by Huruy Kidanemariam`} className="w-full h-full object-cover" />
                </div>
              )}
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
          <AsureComplianceCaseStudy project={project} {...slotProps} />
        ) : project.id === "ebtfinder" ? (
          <EBTFinderCaseStudy project={project} {...slotProps} />
        ) : project.id === "fentfinder" ? (
          <FentFinderCaseStudy project={project} {...slotProps} />
        ) : rich ? (
          <RichCaseStudy project={project} {...slotProps} />
        ) : (
          <SimpleCaseStudy project={project} />
        )}

        {/* Next project */}
        <div className="border-t border-border pt-12">
          <p className="text-sm text-muted-foreground mb-2">Next Project</p>
          <Link to={`/project/${next.id}`} className="group inline-flex items-center gap-2 text-2xl font-bold hover:text-accent transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {next.title} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

const SimpleCaseStudy = ({ project }: { project: Project }) => (
  <>
    <CaseStudySection label="The Problem" title="What needed to change" icon={<Search className="h-4 w-4" />}>
      <p>{project.problem}</p>
    </CaseStudySection>
    <CaseStudySection label="The Process" title="How I approached it">
      <p>{project.process}</p>
    </CaseStudySection>
    <CaseStudySection label="The Solution" title="What we built">
      <p>{project.solution}</p>
    </CaseStudySection>
    <CaseStudySection label="The Impact" title="Measurable outcomes" icon={<Target className="h-4 w-4" />}>
      <p>{project.outcomeMetrics}</p>
    </CaseStudySection>
  </>
);

const RichCaseStudy = ({ project, getSlotImage }: { project: Project } & SlotProps) => (
  <>
    <CaseStudySection label="The Problem" title="Problem & Context" icon={<AlertTriangle className="h-4 w-4" />}>
      <p className="mb-4">{project.problem}</p>
      {project.problemBullets && (
        <ul className="space-y-2 mb-6">
          {project.problemBullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <ChevronRight className="h-4 w-4 mt-1 text-accent shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {project.problemImpact && (
        <Card className="border-destructive/30 bg-destructive/5 mb-6">
          <CardContent className="p-5">
            <p className="text-sm font-semibold text-destructive uppercase tracking-wide mb-1">Impact</p>
            <p className="text-foreground">{project.problemImpact}</p>
          </CardContent>
        </Card>
      )}
      <ImageSlot slot="usda-screenshot" label="USDA SNAP Retailer Locator screenshot" imageSrc={getSlotImage("usda-screenshot")} />
    </CaseStudySection>

    {project.insight && (
      <CaseStudySection label="The Insight" title="The opportunity I saw" icon={<Lightbulb className="h-4 w-4" />}>
        <p className="whitespace-pre-line">{project.insight}</p>
      </CaseStudySection>
    )}

    {project.competitors && (
      <CaseStudySection label="Research" title="Competitive Analysis" icon={<Search className="h-4 w-4" />}>
        <div className="space-y-4 mb-6">
          {project.competitors.map((c, i) => (
            <Card key={i} className="border-border bg-card/50">
              <CardContent className="p-5">
                <h3 className="font-bold text-foreground mb-1">{c.name}</h3>
                <p>{c.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <CompetitiveAuditTable
          competitors={[
            { name: "EBT Finder", highlight: true },
            { name: "USDA SNAP Locator" },
            { name: "Google Maps" },
            { name: "Fresh EBT (Propel)" },
          ]}
          features={[
            { name: "Mobile-optimized UX", support: [true, false, true, true] },
            { name: "Filter by Hot Food / Grocery Only", support: [true, false, false, false] },
            { name: "User reviews + ratings", support: [true, false, true, false] },
            { name: "Visuals of businesses (via API)", support: [true, false, true, false] },
            { name: "Show only EBT-accepting businesses", support: [true, true, false, true] },
          ]}
        />
      </CaseStudySection>
    )}

    {project.interviews && (
      <CaseStudySection label="User Interviews" title="Hearing from real users" icon={<Users className="h-4 w-4" />}>
        <p className="mb-4">{project.interviews}</p>
        <ImageSlot slot="ebt-sign" label="SNAP/EBT Accepted sign in store" imageSrc={getSlotImage("ebt-sign")} />
      </CaseStudySection>
    )}
  </>
);

export default ProjectPage;
