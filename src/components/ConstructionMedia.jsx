import SectionLabel from '@/components/SectionLabel';
import MediaSlot from '@/components/MediaSlot';
import { site } from '@/data/site';

/** Render authentic media when approved files arrive; keep clear empty slots until then. */
export default function ConstructionMedia({ service }) {
  const construction = service.slug === 'home-construction';
  const slots = construction ? site.approvedMedia.construction : site.approvedMedia.renovation;
  const mediaCounts = { photo: 0, video: 0 };
  const numberedSlots = slots.map(slot => ({ ...slot, index: ++mediaCounts[slot.type] }));
  return <section className="section construction-media-v4" aria-labelledby="construction-media-heading"><div className="container">
    <div className="section-title-row-v3"><div><SectionLabel>PROJECT PHOTOS & VIDEOS</SectionLabel><h2 className="display-heading" id="construction-media-heading">See the Work in Detail</h2></div><p>Actual {construction ? 'construction-stage' : 'before-and-after renovation'} photographs and walkthrough videos will appear here.</p></div>
    <div className="construction-media-grid-v4">
      {numberedSlots.map((slot, index) => <MediaSlot key={slot.id} {...slot} featured={index === 0} />)}
    </div>
    {slots.some(slot => !slot.src) && <p className="demo-media-note">Empty spaces will be replaced with original, approved project media.</p>}
  </div></section>;
}
