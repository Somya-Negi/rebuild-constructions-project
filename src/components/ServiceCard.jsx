import Link from 'next/link';
import MediaImage from './MediaImage';
import { serviceHref } from '@/data/catalog';

export default function ServiceCard({ service }) {
  const isWholeHome = service.category === 'construction' || service.feature === 'renovation';
  return <article className={`service-card-v3${isWholeHome ? ' service-card-whole-home' : ''}`}>
    <Link href={serviceHref(service.slug)} className="service-card-image-link" aria-label={`Explore ${service.title}`}>
      {service.category === 'construction' && !service.coverImage ? <div className="service-card-placeholder-v4" role="img" aria-label={`${service.title} project image placeholder`}>
        <span>PROJECT PHOTOGRAPH</span><strong>{service.title}</strong><small>PROJECT PHOTO SPACE</small>
      </div> : <MediaImage src={service.coverImage || service.image} alt={service.imageAlt} className="service-card-image" sizes={isWholeHome ? '(max-width: 639px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw'} />}
    </Link>
    <div className="service-card-content">
      <h3><Link href={serviceHref(service.slug)}>{service.title}</Link></h3>
      <p>{service.shortDescription}</p>
      <Link href={serviceHref(service.slug)} className="service-card-action">
        View Service
      </Link>
    </div>
  </article>;
}
