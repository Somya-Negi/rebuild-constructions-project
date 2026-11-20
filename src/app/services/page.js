import './services.css';
import { pageRobots, canonical } from '@/lib/seo';
import PageBanner from '@/components/PageBanner';
import ServiceExplorer from '@/components/ServiceExplorer';

export const metadata = { robots: pageRobots(), alternates: canonical('/services'), title: 'Services | Home Construction & Interiors', description: 'Explore new home construction, full-home interiors, kitchen and bathroom remodeling, painting and woodwork.' };

export default function ServicesPage() {
  return <main id="main-content">
    <PageBanner label="SERVICES / OVERVIEW" title="Our Services" description="Build a new home, fit out rooms across an entire home or update a specific space. Browse our construction and interior services for photos and enquiry details." />
    <ServiceExplorer showIntro={false} />
  </main>;
}
