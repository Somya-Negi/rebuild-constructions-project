'use client';

import { QuoteTrigger } from '@/components/ui/QuoteDialogProvider';

const photoLabels = { bathrooms: 'Bathroom photos', woodwork: 'Woodwork photos' };

/** Compact on-page navigation. The main action opens the shared estimate dialog. */
export default function ServicePageNav({ service, hasIdeas = false }) {
  const items = [
    { href: '#service-overview', label: 'Overview' },
    ...(hasIdeas ? [{ href: '#service-ideas', label: 'Design ideas' }] : []),
    { href: '#service-media', label: photoLabels[service.feature] ?? 'Photos & videos' },
  ];
  return <div className="service-jump-shell">
    <div className="container service-jump-inner">
      <nav className="service-jump-links" aria-label="On this service page">
        {items.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
      <QuoteTrigger className="service-jump-estimate" source="service_top" service={service.inquiryLabel}>Get an estimate</QuoteTrigger>
    </div>
  </div>;
}
