import './home.css';
import Hero from '@/components/Hero';
import ServiceExplorer from '@/components/ServiceExplorer';
import WorkingProcess from '@/components/WorkingProcess';
import ReviewsPreview from '@/components/ReviewsPreview';
import ContactSection from '@/components/ContactSection';
export default function Home() {
  return <main id="main-content">
    <Hero />
    <ServiceExplorer />
    <WorkingProcess />
    <ReviewsPreview />
    <ContactSection />
  </main>;
}
