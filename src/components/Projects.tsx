import { projects } from "@/lib/data";
import Section from "./Section";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <Section id="projects" label="Selected Work" title="Projects">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
