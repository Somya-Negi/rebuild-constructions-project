import Link from 'next/link';
import { ArrowUpRight, Building2, Sofa } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import { serviceGroups, groupServices } from '@/data/catalog';

/** Grouped, straightforward service architecture; no six full experiences on homepage. */
export default function ServiceExplorer({ showIntro = true }) {
  return <div className="service-directory" id="services">
    {showIntro && <section className="section directory-intro" aria-labelledby="services-heading">
      <div className="container">
        <div className="directory-intro-layout">
          <div className="directory-intro-copy">
            <span className="directory-kicker">TWO WAYS TO BEGIN</span>
            <h2 className="display-heading" id="services-heading">Build, renew, <em>refine.</em></h2>
            <p>Start with the scale of work you have in mind. We will help you move from the first conversation to a home that feels considered at every level.</p>
          </div>
          <div className="directory-route-list" aria-label="Choose a service direction">
            {serviceGroups.map(group => {
              const Icon = group.id === 'construction' ? Building2 : Sofa;
              return <Link className={`directory-route directory-route-${group.id}`} key={group.id} href={group.id === 'construction' ? '/construction' : '/interior-work'}>
                <div className="directory-route-top"><span className="directory-route-number">{group.number}</span><span className="directory-route-icon"><Icon size={20} strokeWidth={1.5} aria-hidden="true" /><ArrowUpRight size={18} aria-hidden="true" /></span></div>
                <div className="directory-route-body"><span>{group.shortTitle}</span><strong>{group.id === 'construction' ? 'Build a new home' : 'Build out or remodel rooms'}</strong><p>{group.description}</p></div>
              </Link>;
            })}
          </div>
        </div>
      </div>
    </section>}
    {serviceGroups.map(group => <section className={`section service-division service-division-${group.id}`} key={group.id} id={`${group.id}-services`} aria-labelledby={`${group.id}-heading`}>
      <div className="container">
        <div className="service-division-header">
          <div><h2 className="display-heading" id={`${group.id}-heading`}>{group.title}</h2><p>{group.description}</p></div>
        </div>
        <div className="service-cards-grid">
          {groupServices(group.id).map(service => <ServiceCard key={service.slug} service={service} />)}
        </div>
      </div>
    </section>)}
  </div>;
}
