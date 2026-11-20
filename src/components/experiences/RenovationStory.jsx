import { ArrowRight } from 'lucide-react';
import MediaImage from '@/components/MediaImage';
import { site } from '@/data/site';
import FeatureHeading from './FeatureHeading';
import ServiceInquiryLink from './ServiceInquiryLink';

export default function RenovationStory() {
  const story = site.serviceStories.renovation;
  return <section className="service-feature renovation-feature section" id="renovation" aria-labelledby="renovation-title">
    <div className="container">
      <div className="renovation-header"><FeatureHeading story={story} id="renovation-title" /><ServiceInquiryLink service="Full-home renovation">Discuss a renovation</ServiceInquiryLink></div>
      <div className="renovation-layout">
        <div className="renovation-main-media">
          {story.videoSrc ? <video controls muted defaultMuted playsInline preload="none" poster={story.videoPoster || undefined} className="renovation-video"><source src={story.videoSrc} type={story.videoSrc.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />Your browser does not support video playback.</video> : <MediaImage src={story.image} alt={story.imageAlt} className="renovation-image" sizes="(max-width: 800px) 100vw, 67vw"/>}
          {!story.videoSrc && <span className="image-corner-note">DESIGN REFERENCE / WALKTHROUGH</span>}
        </div>
        <div className="renovation-side"><MediaImage src={story.detailImage} alt={story.detailAlt} className="renovation-detail-image" sizes="(max-width: 800px) 45vw, 24vw"/>
          <div className="renovation-steps"><span className="feature-mini-label">FROM EXISTING TO EXTRAORDINARY</span>
            {story.highlights.map((item, i) => <div className="renovation-step" key={item}><span>0{i+1}</span><p>{item}</p><ArrowRight size={15} aria-hidden="true" /></div>)}
          </div>
        </div>
      </div>
      <p className="feature-sidenote renovation-note">Project photography and a walkthrough can be viewed together when available.</p>
    </div>
  </section>;
}
