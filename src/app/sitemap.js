import { siteIndexable, siteOrigin } from '@/lib/seo';
import { services, serviceHref } from '@/data/catalog';
export default function sitemap() {
  if (!siteIndexable) return [];
  const pages = ['/', '/services', '/interior-work', ...services.map(service => serviceHref(service.slug))];
  return pages.map(path => ({ url: `${siteOrigin}${path}`, changeFrequency: 'monthly', priority: path === '/' ? 1 : path.startsWith('/interior-work/') ? 0.7 : 0.8 }));
}
