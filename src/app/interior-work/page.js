import './interior-work.css';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { canonical, pageRobots } from '@/lib/seo';
import MediaImage from '@/components/MediaImage';
import { groupServices, serviceHref } from '@/data/catalog';

const description = 'Explore full-home interiors, kitchen and bathroom remodeling, painting and custom carpentry.';

export const metadata = {
  title: 'Interior Work | Rebuild Constructions',
  description,
  robots: pageRobots(),
  alternates: canonical('/interior-work'),
};

export default function InteriorWorkPage() {
  return (
    <main id="main-content" className="interior-overview">
      <section className="interior-intro" aria-labelledby="interior-title">
        <div className="container interior-intro-layout">
          <div className="interior-intro-copy">
            <nav className="interior-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">Interior Work</span>
            </nav>
            <h1 id="interior-title">Interior Work</h1>
            <p>{description}</p>
          </div>
          <MediaImage src="/images/projects/renovation-kitchen-dining-inspiration.jpg"
            alt="An open-plan kitchen and dining room with contemporary furnishings"
            className="interior-intro-photo" sizes="(min-width: 900px) 52vw, 100vw" priority />
        </div>
      </section>

      <section className="section container interior-services" aria-labelledby="interior-services-title">
        <h2 id="interior-services-title" className="display-heading">Explore by service</h2>
        <ul className="interior-service-list">
          {groupServices('interiors').map(service => (
            <li key={service.slug}>
              <Link href={serviceHref(service.slug)} className="interior-service-link">
                <MediaImage src={service.coverImage || service.image} alt="" className="interior-service-photo"
                  sizes="(min-width: 900px) 144px, 76px" />
                <h3>{service.title}</h3>
                <p>{service.shortDescription}</p>
                <span className="interior-service-arrow"><ArrowUpRight size={21} aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
