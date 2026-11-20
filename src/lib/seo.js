/** No page is public-indexable before BOTH business content and origin are approved. */
const urlValue = (process.env.SITE_URL || '').trim();
export const siteOrigin = /^https:\/\/[^/]+/i.test(urlValue) ? urlValue.replace(/\/+$/, '') : '';
export const siteIndexable = process.env.SITE_INDEXING_ENABLED === 'true' && process.env.CONTENT_APPROVED === 'true' && Boolean(siteOrigin);
export const pageRobots = (approved = true) => ({ index: siteIndexable && approved, follow: siteIndexable && approved });
export const canonical = (path, approved = true) => siteIndexable && approved ? { canonical: `${siteOrigin}${path}` } : undefined;
