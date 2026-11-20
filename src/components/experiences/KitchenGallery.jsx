'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import MediaImage from '@/components/MediaImage';
import { site } from '@/data/site';
import FeatureHeading from './FeatureHeading';

export default function KitchenGallery() {
  const story = site.serviceStories.kitchens;
  const [index, setIndex] = useState(0);
  const swipeStart = useRef(null);
  const selected = story.gallery[index];
  const previous = () => setIndex(i => (i - 1 + story.gallery.length) % story.gallery.length);
  const next = () => setIndex(i => (i + 1) % story.gallery.length);
  const onTouchStart = event => {
    const touch = event.touches[0];
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const onTouchEnd = event => {
    if (!swipeStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - swipeStart.current.x;
    const deltaY = touch.clientY - swipeStart.current.y;
    swipeStart.current = null;
    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      if (deltaX < 0) next(); else previous();
    }
  };

  return <section className="service-feature kitchen-feature section" id="kitchens" aria-labelledby="kitchens-title">
    <div className="container">
      <FeatureHeading story={story} id="kitchens-title" />
      <div className="kitchen-layout">
        <div className="kitchen-image-wrap" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <MediaImage key={selected.image} src={selected.image} alt={selected.alt} className="kitchen-photo" sizes="(max-width: 800px) 100vw, 64vw" />
          <div className="kitchen-image-label"><span>DESIGN VISUALIZATION</span><strong>{String(index + 1).padStart(2, '0')} <small>/ {String(story.gallery.length).padStart(2, '0')}</small></strong></div>
          <div className="gallery-arrows">
            <button type="button" onClick={previous} aria-label="Previous kitchen design"><ArrowLeft size={20} /></button>
            <button type="button" onClick={next} aria-label="Next kitchen design"><ArrowRight size={20} /></button>
          </div>
        </div>
        <div className="kitchen-detail">
          <p className="feature-mini-label">EXPLORE THE KITCHEN</p>
          <div className="kitchen-style-list" role="group" aria-label="Kitchen views">
            {story.gallery.map((item, i) => <button type="button" className={i === index ? 'is-active' : ''} key={item.image} aria-pressed={i === index} onClick={() => setIndex(i)}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>{item.label}<ArrowRight size={17} aria-hidden="true" /></button>)}
          </div>
          <div className="kitchen-detail-copy" aria-live="polite"><h3>{selected.title}</h3><p>{selected.detail}</p></div>
        </div>
      </div>
    </div>
  </section>;
}
