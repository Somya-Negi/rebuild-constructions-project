'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import MediaImage from '@/components/MediaImage';
import { site } from '@/data/site';
import FeatureHeading from './FeatureHeading';
import ServiceInquiryLink from './ServiceInquiryLink';

export default function ConstructionJourney() {
  const story = site.serviceStories.construction;
  const [index, setIndex] = useState(0);
  const active = story.steps[index];

  return <section className="service-feature construction-feature section section-dark" id="construction" aria-labelledby="construction-title">
    <div className="container">
      <div className="feature-heading-row">
        <FeatureHeading story={story} id="construction-title" light />
        <ServiceInquiryLink service="Home construction" className="text-link text-link-light">Discuss a new build</ServiceInquiryLink>
      </div>
      <div className="construction-layout">
        <div className="construction-image-wrap" aria-live="polite" aria-atomic="true">
          <MediaImage key={active.image} src={active.image} alt={active.alt} className="construction-photo" sizes="(max-width: 800px) 100vw, 66vw" />
          <span className="image-corner-note">PROJECT PHOTO / {String(index + 1).padStart(2, '0')}</span>
        </div>
        <div className="construction-steps">
          <p className="feature-mini-label">THE PROJECT JOURNEY</p>
          <div className="step-options" aria-label="Choose a construction stage">
            {story.steps.map((step, i) => <button key={step.label} type="button" className={`step-option ${i === index ? 'is-active' : ''}`} aria-pressed={i === index} onClick={() => setIndex(i)}>
              <span className="step-number">0{i + 1}</span>
              <span className="step-name">{step.label}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </button>)}
          </div>
          <div className="construction-step-copy" aria-live="polite"><h3>{active.title}</h3><p>{active.description}</p></div>
          <span className="feature-sidenote">Select a stage to explore the work involved.</span>
        </div>
      </div>
    </div>
  </section>;
}
