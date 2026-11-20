import '@/app/services/services.css';
import { pageRobots, canonical } from '@/lib/seo';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import PageBanner from '@/components/PageBanner';
import ServicePageNav from '@/components/ServicePageNav';
import ServiceMediaGallery from '@/components/ServiceMediaGallery';
import ExperienceRenderer from '@/components/ExperienceRenderer';
import ServiceCallout from '@/components/ServiceCallout';
import { serviceGroups, groupServices, serviceHref } from '@/data/catalog';

export function serviceMetadata(service) {
  return { title: `${service.title} | Services`, description: service.shortDescription, robots: pageRobots(), alternates: canonical(serviceHref(service.slug)) };
}

export default function ServiceDetail({ service, parent }) {
  const group = serviceGroups.find(item => item.id === service.category);
  const peers = groupServices(service.category).filter(item => item.slug !== service.slug);
  const hasIdeas = ['kitchens', 'painting'].includes(service.feature);

  return <main id="main-content" className="service-page-v4">
    <PageBanner label={`${group.title.toUpperCase()} / SERVICE DETAILS`} title={service.title} description={service.shortDescription} image={service.coverImage || service.image} imageAlt={service.imageAlt} parent={parent} />
    <ServicePageNav service={service} hasIdeas={hasIdeas} />
    <section id="service-overview" className="section service-detail-overview-v3" aria-labelledby="service-about-heading">
      <div className="container service-detail-overview-grid-v3">
        <div><span className="simple-kicker-v3">ABOUT THE SERVICE</span><h2 className="display-heading" id="service-about-heading">What This Service Covers</h2>{service.description && <p>{service.description}</p>}</div>
        <div className="service-detail-includes-v3">{service.includes.map((item, i) => <article key={item.title}><div><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div>
      </div>
    </section>
    {hasIdeas && <div id="service-ideas" className="service-ideas-anchor"><ExperienceRenderer feature={service.feature} /></div>}
    <ServiceMediaGallery service={service} />
    <section className="section prepare-project-section-v3" aria-labelledby="service-questions-heading">
      <div className="container prepare-project-grid-v3">
        <div><span className="simple-kicker-v3">BEFORE AN ESTIMATE</span><h2 className="display-heading" id="service-questions-heading">What to Share With Us</h2><p>A few details about your project will make the initial conversation more useful.</p></div>
        <ol>{service.projectQuestions.map((question, i) => <li key={question}><span>0{i + 1}</span>{question}</li>)}</ol>
      </div>
    </section>
    <ServiceCallout service={service} />
    {peers.length > 0 && <nav className="service-related-nav" aria-label={`Other ${group.title.toLowerCase()}`}><div className="container service-related-inner"><span>Explore other {group.shortTitle.toLowerCase()} services</span><div>{peers.map(item => <Link href={serviceHref(item.slug)} key={item.slug}>{item.title} <ArrowUpRight size={14} aria-hidden="true" /></Link>)}</div></div></nav>}
  </main>;
}
