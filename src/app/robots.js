import { siteIndexable, siteOrigin } from '@/lib/seo';
export default function robots() {
  if (!siteIndexable) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${siteOrigin}/sitemap.xml` };
}
