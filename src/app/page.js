import './home.css';
import Hero from '@/components/Hero';
import ServiceExplorer from '@/components/ServiceExplorer';
import ProjectShowcase from '@/components/ProjectShowcase';
import WorkingProcess from '@/components/WorkingProcess';
import ReviewsPreview from '@/components/ReviewsPreview';
import ContactSection from '@/components/ContactSection';
export default function Home() {
  return <main id="main-content">
    <Hero />
    <ServiceExplorer />
    <ProjectShowcase />
    <WorkingProcess />
    <ReviewsPreview />
    <ContactSection />
  </main>;
}
