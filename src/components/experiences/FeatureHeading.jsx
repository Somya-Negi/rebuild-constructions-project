import SectionLabel from '@/components/SectionLabel';

/** Shared service heading: one type scale for all six stories, at every breakpoint. */
export default function FeatureHeading({ story, id, light = false }) {
  return <header className={`feature-heading ${light ? 'feature-heading-light' : ''}`}>
    <SectionLabel light={light}>{story.number} / {story.eyebrow}</SectionLabel>
    <h2 className="display-heading" id={id}>{story.title[0]} <em>{story.title[1]}</em></h2>
    <p className="feature-lead">{story.intro}</p>
  </header>;
}
