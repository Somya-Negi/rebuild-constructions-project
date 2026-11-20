import { ArrowDownRight } from 'lucide-react';

const links = [
  { label: 'Construction', id: '#construction' },
  { label: 'Kitchens', id: '#kitchens' },
  { label: 'Bathrooms', id: '#bathrooms' },
  { label: 'Painting', id: '#painting' },
  { label: 'Renovation', id: '#renovation' }
];

export default function FeatureNav() {
  return <nav className="feature-jump" aria-label="Explore our service experiences">
    <div className="container feature-jump-inner">
      <span className="feature-jump-caption">EXPLORE EACH SERVICE <ArrowDownRight size={14} aria-hidden="true" /></span>
      <div className="feature-jump-links">{links.map((item, i) => <a key={item.id} href={item.id}><span>{String(i + 1).padStart(2, '0')}</span>{item.label}</a>)}</div>
    </div>
  </nav>;
}
