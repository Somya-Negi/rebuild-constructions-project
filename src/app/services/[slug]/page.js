import { notFound, permanentRedirect } from 'next/navigation';
import { serviceBySlug, serviceHref } from '@/data/catalog';

export default async function LegacyServicePage({ params, searchParams }) {
  const { slug } = await params;
  if (!Object.hasOwn(serviceBySlug, slug)) notFound();

  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(await searchParams)) {
    for (const item of [].concat(value)) query.append(key, item);
  }

  const destination = serviceHref(slug);
  permanentRedirect(query.size ? `${destination}?${query}` : destination);
}
