'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Play } from 'lucide-react';
import MediaSlot from '@/components/MediaSlot';
import MediaImage from '@/components/MediaImage';
import { site } from '@/data/site';

const galleryCopy = {
  construction: {
    kicker: 'PROJECT MEDIA',
    title: 'Home Construction on Site',
    description: 'The first three images illustrate stages of a home build. Photos 4 and 5 show the Ayodhya construction site.',
  },
  renovation: {
    kicker: 'INTERIOR INSPIRATION',
    title: 'Room Photos & Walkthroughs',
    description: 'See real interiors with built-in shelving, pendant lighting and room layouts.',
  },
  kitchens: {
    kicker: 'KITCHEN EXAMPLES',
    title: 'Photos & Videos',
    description: 'Explore finished cabinetry, ceiling lighting and pull-out storage in modern kitchens.',
  },
  bathrooms: {
    kicker: 'BATHROOM EXAMPLES',
    title: 'Bathroom Interiors & Fittings',
    description: 'See finished bathrooms and take a closer look at overhead and handheld showers, recessed lighting, tilework and toilet fittings.',
  },
  painting: {
    kicker: 'PAINT & FINISH INSPIRATION',
    title: 'Painted Walls & Finishes',
    description: 'Explore photos from real homes, from colored accent walls and painted brick to moulding and ceiling details.',
  },
  woodwork: {
    kicker: 'WOODWORK DETAILS',
    title: 'Doors, Cabinetry & Furniture',
    description: 'See wooden doors, fitted cupboards, drawer details, tables, beds and sofas in Indian home interiors.',
  },
};

const defaultGalleryCopy = {
  kicker: 'PROJECT MEDIA',
  title: 'Photos & Videos',
  description: 'Explore photographs and walkthroughs for this service. Select a frame to view it.',
};

/** One consistent mobile-first gallery for all six service pages.
 * It renders only the selected video; media placeholders remain intentional. */
export default function ServiceMediaGallery({ service }) {
  const items = site.approvedMedia[service.feature] || site.approvedMedia[service.category === 'construction' ? (service.feature === 'renovation' ? 'renovation' : 'construction') : 'kitchens'] || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const gesture = useRef(null);
  const active = items[activeIndex];
  if (!items.length) return null;
  const copy = galleryCopy[service.feature] || defaultGalleryCopy;
  const hasVideos = items.some(item => item.type === 'video');

  const move = delta => setActiveIndex(i => (i + delta + items.length) % items.length);
  const startTouch = event => {
    const t = event.touches?.[0];
    if (t) gesture.current = { x: t.clientX, y: t.clientY };
  };
  const endTouch = event => {
    const start = gesture.current;
    const t = event.changedTouches?.[0];
    gesture.current = null;
    if (!start || !t) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.25) move(dx < 0 ? 1 : -1);
  };

  return <section id="service-media" className="section service-media-section" aria-labelledby="service-media-heading">
    <div className="container">
      <div className="service-media-header">
        <div>
          <span className="simple-kicker-v3">{copy.kicker}</span>
          <h2 className="display-heading" id="service-media-heading">{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
      </div>
      <div className="service-media-layout">
        <div className="service-media-stage" onTouchStart={startTouch} onTouchEnd={endTouch}>
          <MediaSlot key={active.id} {...active} autoplay={active.type === 'video'} featured index={activeIndex + 1} />
          <div className="service-media-stage-footer">
            <span aria-live="polite">{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} — {active.title}</span>
            <div className="service-gallery-controls">
              <button type="button" onClick={() => move(-1)} aria-label="Previous media"><ChevronLeft size={20} aria-hidden="true" /></button>
              <button type="button" onClick={() => move(1)} aria-label="Next media"><ChevronRight size={20} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
        <div className="service-media-choices" role="group" aria-label={hasVideos ? 'Select a photo or video' : 'Select a photo'}>
          {items.map((item, index) => <button key={item.id} type="button" className={`service-media-choice ${activeIndex === index ? 'is-active' : ''}`} onClick={() => setActiveIndex(index)} aria-pressed={activeIndex === index} aria-label={`Show ${item.title}`}>
            <span className="service-media-choice-art">
              {item.src && item.type === 'photo' ? <MediaImage src={item.src} alt="" sizes="(max-width: 640px) 35vw, 240px" /> : item.src && item.type === 'video' && item.poster ? <MediaImage src={item.poster} alt="" sizes="(max-width: 640px) 35vw, 240px" /> : <span className="service-choice-icon" aria-hidden="true">{item.type === 'video' ? <Play size={20} /> : <ImageIcon size={20} />}</span>}
              {item.type === 'video' && <><span className="service-media-video-thumb-shade" aria-hidden="true" /><span className="service-choice-icon service-choice-icon-video" aria-hidden="true"><Play size={20} /></span></>}
            </span>
            <span className="service-media-choice-copy"><small>{item.type === 'video' ? 'VIDEO' : 'PHOTO'} {String(index + 1).padStart(2, '0')}</small><strong>{item.title}</strong></span>
          </button>)}
        </div>
      </div>
      {service.feature === 'painting' && active.sourceUrl && <p className="service-media-disclaimer">
        Reference photo by <a className="painting-photo-credit" href={active.sourceUrl}>{active.credit} on Pexels</a>
      </p>}
    </div>
  </section>;
}
