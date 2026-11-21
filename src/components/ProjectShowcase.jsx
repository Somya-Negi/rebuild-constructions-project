'use client';

import Link from 'next/link';
import { ArrowUpRight, ImagePlus, MapPin } from 'lucide-react';
import { useState } from 'react';
import SectionLabel from '@/components/SectionLabel';
import MediaImage from '@/components/MediaImage';
import { projects } from '@/data/projects';

function ProjectMedia({ project, imageIndex = 0, className = 'project-panel-image' }) {
  const selectedImage = project.images?.[imageIndex] || (project.image ? { src: project.image, alt: project.imageAlt } : null);

  if (selectedImage) {
    return <MediaImage src={selectedImage.src} alt={selectedImage.alt} className={className} sizes="(min-width: 800px) 55vw, 100vw" />;
  }

  return <div className="project-image-placeholder" role="img" aria-label={project.imageAlt}>
    <span className="project-placeholder-mark"><ImagePlus size={28} strokeWidth={1.4} aria-hidden="true" /></span>
    <strong>Project image coming soon</strong>
    <small>Approved site photography will be added here.</small>
  </div>;
}

function ProjectThumbnails({ project, activeImageIndex, onSelect, className = 'project-panel-thumbnails' }) {
  if (!project.images || project.images.length < 2) return null;

  return <div className={className} aria-label={`${project.title} image gallery`}>
    {project.images.map((image, index) => <button
      type="button"
      key={image.src}
      className={`project-preview-thumbnail ${index === activeImageIndex ? 'is-active' : ''}`}
      aria-label={`View ${project.title} image ${index + 1}`}
      aria-pressed={index === activeImageIndex}
      onClick={() => onSelect(index)}
    ><img src={image.src} alt="" /></button>)}
  </div>;
}

function ProjectDetails({ project, active = false }) {
  return <>
    <span className="project-panel-collapsed" aria-hidden={active}>
      <span className="project-panel-collapsed-title">{project.shortTitle || project.title}</span>
    </span>
    <span className="project-panel-active-content" aria-hidden={!active}>
      <span className="project-panel-active-kicker">ACTIVE PROJECT — {project.number} / {String(projects.length).padStart(2, '0')}</span>
      <strong>{project.title}</strong>
      <span className="project-panel-active-meta"><MapPin size={14} aria-hidden="true" />{project.location} <i aria-hidden="true">·</i> {project.category}</span>
      <span className="project-panel-active-description">{project.description}</span>
    </span>
  </>;
}

export default function ProjectShowcase({ variant = 'home' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeProject = projects[activeIndex];
  const selectProject = index => { setActiveIndex(index); setActiveImageIndex(0); };

  return <section className={`project-showcase project-showcase-${variant}`} id={variant === 'home' ? 'projects' : undefined} aria-labelledby={`${variant}-projects-heading`}>
    <div className="container">
      <div className="project-showcase-heading">
        <div>
          <SectionLabel>{variant === 'home' ? 'SELECTED PROJECTS' : 'PROJECT PORTFOLIO'}</SectionLabel>
          <h2 className="display-heading" id={`${variant}-projects-heading`}>{variant === 'home' ? <>Built with <em>purpose.</em></> : <>A record of work, <em>one project at a time.</em></>}</h2>
          <p>{variant === 'home' ? 'Explore selected construction and finishing work. Click a project to expand its story and preview the photography.' : 'Browse construction and finishing work across Ayodhya, Delhi and Ghaziabad. Select a project to expand its story and image gallery.'}</p>
        </div>
        {variant === 'home' && <Link className="text-link project-showcase-link" href="/projects">View all projects <ArrowUpRight size={17} aria-hidden="true" /></Link>}
      </div>

      <div className="project-gallery" style={{ '--project-columns': projects.map((_, index) => index === activeIndex ? '4.5fr' : '1fr').join(' ') }} aria-label="Selected projects gallery">
        {projects.map((project, index) => {
          const active = index === activeIndex;
          return <article className={`project-panel ${active ? 'is-active' : ''}`} key={project.slug} id={`project-${project.slug}`}>
            <button
              type="button"
              className="project-panel-select"
              aria-expanded={active}
              aria-controls={`project-${project.slug}`}
              onClick={() => selectProject(index)}
            >
              <ProjectMedia project={project} imageIndex={active ? activeImageIndex : 0} />
              <span className="project-panel-shade" aria-hidden="true" />
              <span className="project-panel-top"><span className="project-panel-number">{project.number}</span><span className="project-panel-category">{active ? project.category : project.location}</span></span>
              <ProjectDetails project={project} active={active} />
            </button>
            {active && <>
              <ProjectThumbnails project={project} activeImageIndex={activeImageIndex} onSelect={setActiveImageIndex} />
              <Link className="project-panel-view-link" href="/projects" aria-label={`View ${project.title} project page`}>View Project <ArrowUpRight size={16} aria-hidden="true" /></Link>
            </>}
          </article>;
        })}
      </div>

      <div className="project-showcase-mobile">
        <div className="project-mobile-nav" role="tablist" aria-label="Select a project">
          {projects.map((project, index) => <button
            type="button"
            role="tab"
            key={project.slug}
            aria-selected={index === activeIndex}
            aria-controls="project-mobile-preview"
            className={`project-mobile-tab ${index === activeIndex ? 'is-active' : ''}`}
            onClick={() => selectProject(index)}
          ><span>{project.number}</span><strong>{project.shortTitle || project.title}</strong></button>)}
        </div>
        <article className="project-mobile-preview" id="project-mobile-preview" role="tabpanel" aria-live="polite">
          <div className="project-mobile-media">
            <ProjectMedia project={activeProject} imageIndex={activeImageIndex} className="project-mobile-image" />
            <span className="project-preview-index">{activeProject.number} / {String(projects.length).padStart(2, '0')}</span>
            <ProjectThumbnails project={activeProject} activeImageIndex={activeImageIndex} onSelect={setActiveImageIndex} className="project-mobile-thumbnails" />
          </div>
          <div className="project-mobile-copy">
            <span className="project-preview-category">{activeProject.category}</span>
            <h3>{activeProject.title}</h3>
            <p>{activeProject.description}</p>
            <span className="project-preview-note"><MapPin size={15} aria-hidden="true" />{activeProject.location}</span>
            <Link className="project-mobile-view-link" href="/projects">View Project <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </div>
        </article>
      </div>
    </div>
  </section>;
}
