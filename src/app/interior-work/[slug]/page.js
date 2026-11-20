import { notFound } from 'next/navigation';
import ServiceDetail, { serviceMetadata } from '@/components/ServiceDetail';
import { groupServices, serviceBySlug } from '@/data/catalog';

const parent = { href: '/interior-work', label: 'Interior Work' };

export function generateStaticParams() {
  return groupServices('interiors').map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (service?.category !== 'interiors') notFound();
  return serviceMetadata(service);
}

export default async function InteriorServicePage({ params }) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (service?.category !== 'interiors') notFound();
  return <ServiceDetail service={service} parent={parent} />;
}
