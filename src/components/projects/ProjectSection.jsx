import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import ProjectGallery from '@/components/projects/ProjectGallery';
import { projects } from '@/data/projects';

export default function ProjectSection({ project, index }) {
  return <article className={`project-wall-section ${index % 2 ? 'project-wall-section-stone' : ''}`} id={`project-${project.slug}`}>
    <div className="container project-wall-inner">
      <header className="project-wall-heading">
        <div className="project-wall-heading-top">
          <span>{project.number} / SELECTED PROJECTS</span>
          <span>{project.category} <i aria-hidden="true">·</i> {project.location}</span>
        </div>
        <h2>{project.title}</h2>
        <span className="project-wall-location"><MapPin size={16} aria-hidden="true" />{project.location}</span>
      </header>
      <ProjectGallery project={project} priority={index === 0} />
      <footer className="project-wall-footer">
        <p>{project.description}</p>
        <Link className="project-wall-cta" href={project.enquiryHref || '/#contact-form'}>Discuss a similar project <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </footer>
    </div>
  </article>;
}
