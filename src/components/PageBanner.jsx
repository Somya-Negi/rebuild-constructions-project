import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import MediaImage from '@/components/MediaImage';

export default function PageBanner({ label, title, description, image, imageAlt, parent = null }) {
  return <section className={`page-banner-v3 ${image ? 'page-banner-with-image' : ''}`}>
    {image && <><MediaImage src={image} alt={imageAlt || 'Design reference photograph'} className="page-banner-photo" priority sizes="100vw" /><div className="page-banner-shade" aria-hidden="true" /></>}
    <div className="container page-banner-inner">
      <nav className="page-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><ChevronRight size={13} aria-hidden="true" />{parent && <><Link href={parent.href}>{parent.label}</Link><ChevronRight size={13} aria-hidden="true" /></>}<span aria-current="page">{title}</span></nav>
      <span className="page-banner-label">{label}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  </section>;
}
