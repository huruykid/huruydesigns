import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/projects";

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link to={`/project/${project.id}`} className="group block">
        <div className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 group-hover:border-accent/30">
          <div className="aspect-[16/10] bg-muted relative overflow-hidden flex items-center justify-center">
            {project.image.includes("app-screenshot") ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-accent text-accent-foreground rounded-full p-2">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        <div className="p-5">
          <p className="text-xs font-semibold text-accent mb-1">{project.impact}</p>
          <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default ProjectCard;
