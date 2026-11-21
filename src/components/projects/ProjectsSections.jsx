import ProjectSection from '@/components/projects/ProjectSection';
import { projects } from '@/data/projects';

export default function ProjectsSections() {
  return <section className="projects-sections" aria-label="Project case studies">
    {projects.map((project, index) => <ProjectSection key={project.slug} project={project} index={index} />)}
  </section>;
}
