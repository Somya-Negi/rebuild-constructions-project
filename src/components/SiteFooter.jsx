import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { serviceGroups, groupServices, serviceHref } from '@/data/catalog';

export default function SiteFooter() {
  return <footer className="footer"><div className="container footer-main">
    <div className="footer-brand-col"><Link className="footer-logo-frame" href="/" aria-label={`${site.brand} home`}><img src={site.logo} alt={`${site.brand} logo`} /></Link><span className="footer-descriptor">{site.descriptor}</span><p>{site.tagline}</p></div>
    <div className="footer-navigation"><span className="footer-heading">PAGES</span><Link href="/">Home</Link><Link href="/construction">Construction</Link><Link href="/interior-work">Interior Work</Link><Link href="/#approach">How We Work</Link></div>
    <div className="footer-navigation"><span className="footer-heading">SERVICES</span>{serviceGroups.map(group => <div key={group.id} className="footer-service-group"><span>{group.shortTitle}</span>{groupServices(group.id).map(service => <Link href={serviceHref(service.slug)} key={service.slug}>{service.title}</Link>)}</div>)}</div>
    <div className="footer-contact-col">
      <span className="footer-heading">CONTACT</span>
      <p>Have a construction or interior project in mind?</p>
      <address className="footer-contact-details">
        <a href={`tel:+91${site.phone}`}>
          <Phone size={17} aria-hidden="true" /><span>{site.phone}</span>
        </a>
        <a href={`mailto:${site.email}`}>
          <Mail size={17} aria-hidden="true" /><span>{site.email}</span>
        </a>
        <a href={site.locationMapUrl} target="_blank" rel="noopener noreferrer">
          <MapPin size={17} aria-hidden="true" /><span>{site.location}</span>
        </a>
      </address>
      <Link className="footer-contact-link" href="/#contact-form">Tell us about your project <ArrowUpRight size={17} aria-hidden="true" /></Link>
    </div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.brand}</span><Link href="/privacy">PRIVACY INFORMATION</Link><Link href="/">BACK TO HOME</Link></div></footer>;
}
