'use client';

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import MediaImage from '@/components/MediaImage';

function projectImages(project) {
  if (project.images?.length) return project.images;
  return project.image ? [{ src: project.image, alt: project.imageAlt }] : [];
}

export default function ProjectGallery({ project, priority = false }) {
  const images = projectImages(project);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const activeImage = images[activeIndex];
  const layout = images.length >= 3 ? 'multi' : images.length === 2 ? 'double' : 'single';

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKeyDown = event => {
      if (event.key === 'Escape') setLightboxOpen(false);
      if (event.key === 'ArrowLeft' && images.length > 1) setActiveIndex(current => (current - 1 + images.length) % images.length);
      if (event.key === 'ArrowRight' && images.length > 1) setActiveIndex(current => (current + 1) % images.length);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, images.length]);

  const openAt = index => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };
  const move = direction => setActiveIndex(current => (current + direction + images.length) % images.length);

  if (!activeImage) {
    return <div className="photo-wall photo-wall-single">
      <div className="photo-wall-placeholder" role="img" aria-label={project.imageAlt}>
        <strong>Project image coming soon</strong>
        <small>Approved site photography will be added here.</small>
      </div>
    </div>;
  }

  const photoCard = (image, index, className, extra = null) => <button className={`photo-wall-card ${className}`} type="button" key={image.src} aria-label={`View ${project.title} photo ${index + 1}`} onClick={() => openAt(index)}>
    <MediaImage src={image.src} alt={image.alt} priority={priority && index === 0} className="photo-wall-image" sizes="(min-width: 921px) 66vw, 100vw" />
    <span className="photo-wall-card-shade" aria-hidden="true" />
    {extra}
  </button>;

  return <div className={`photo-wall photo-wall-${layout}`}>
    {layout === 'single' && photoCard(images[0], 0, 'photo-wall-card-single')}
    {layout === 'double' && images.map((image, index) => photoCard(image, index, 'photo-wall-card-double'))}
    {layout === 'multi' && <>
      <div className="photo-wall-main">{photoCard(images[0], 0, 'photo-wall-card-main')}</div>
      <div className="photo-wall-supporting">
        {photoCard(images[1], 1, 'photo-wall-card-support')}
        {photoCard(images[2], 2, 'photo-wall-card-support', images.length > 3 && <span className="photo-wall-more">+{images.length - 3} more</span>)}
      </div>
    </>}
    <span className="photo-wall-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
    {images.length > 1 && <div className="photo-wall-controls" aria-label="Project photo controls">
      <button type="button" aria-label="Previous project photo" onClick={() => move(-1)}><ChevronLeft size={19} aria-hidden="true" /></button>
      <button type="button" aria-label="Next project photo" onClick={() => move(1)}><ChevronRight size={19} aria-hidden="true" /></button>
    </div>}
    {lightboxOpen && <div className="photo-wall-lightbox" role="dialog" aria-modal="true" aria-label={`${project.title} enlarged photo`} onClick={event => { if (event.target === event.currentTarget) setLightboxOpen(false); }}>
      <button className="photo-wall-lightbox-close" type="button" aria-label="Close enlarged photo" onClick={() => setLightboxOpen(false)}><X size={22} aria-hidden="true" /></button>
      {images.length > 1 && <button className="photo-wall-lightbox-arrow photo-wall-lightbox-left" type="button" aria-label="Previous enlarged photo" onClick={() => move(-1)}><ChevronLeft size={28} aria-hidden="true" /></button>}
      <MediaImage key={`lightbox-${activeImage.src}`} src={activeImage.src} alt={activeImage.alt} className="photo-wall-lightbox-image" sizes="100vw" />
      {images.length > 1 && <button className="photo-wall-lightbox-arrow photo-wall-lightbox-right" type="button" aria-label="Next enlarged photo" onClick={() => move(1)}><ChevronRight size={28} aria-hidden="true" /></button>}
    </div>}
  </div>;
}
