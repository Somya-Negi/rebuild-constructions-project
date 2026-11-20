import Link from 'next/link';
import MediaImage from '@/components/MediaImage';
import SectionLabel from '@/components/SectionLabel';
import { QuoteTrigger } from '@/components/ui/QuoteDialogProvider';
import { site } from '@/data/site';

export default function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-heading">
    <MediaImage src={site.hero.image} alt={site.hero.imageAlt} className="hero-image" priority sizes="100vw" />
    <div className="hero-overlay" aria-hidden="true" />
    <div className="container hero-layout">
      <div className="hero-main">
        <SectionLabel light>{site.hero.eyebrow}</SectionLabel>
        <h1 id="hero-heading">{site.hero.heading[0]}<br /><em>{site.hero.heading[1]}</em></h1>
        <p className="hero-description">{site.hero.description}</p>
        <div className="hero-actions">
          <QuoteTrigger className="button button-light" source="hero">Request an Estimate</QuoteTrigger>
          <Link className="hero-secondary" href="/construction">Explore Construction</Link>
          <Link className="hero-secondary" href="/interior-work">Explore Interior Work</Link>
        </div>
      </div>
    </div>
  </section>;
}
