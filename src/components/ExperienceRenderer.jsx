import ConstructionJourney from './experiences/ConstructionJourney';
import KitchenGallery from './experiences/KitchenGallery';
import PaintingStudio from './experiences/PaintingStudio';
import RenovationStory from './experiences/RenovationStory';

/** Reuse the Phase 2 interactive experiences on their individual service pages. */
export default function ExperienceRenderer({ feature }) {
  switch (feature) {
    case 'construction': return <ConstructionJourney />;
    case 'renovation': return <RenovationStory />;
    case 'kitchens': return <KitchenGallery />;
    case 'painting': return <PaintingStudio />;
    default: return null;
  }
}
