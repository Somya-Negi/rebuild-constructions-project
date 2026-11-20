'use client';

/** Preserve only three non-identifying campaign tags across internal navigation. */
const tags = ['utm_source', 'utm_medium', 'utm_campaign'];
const storageKey = 'builder_campaign_v1';
export function getCampaignAttribution() {
  if (typeof window === 'undefined') return {};
  let saved = {};
  try { saved = JSON.parse(window.sessionStorage.getItem(storageKey) || '{}') || {}; } catch { /* storage may be unavailable */ }
  const search = new URLSearchParams(window.location.search);
  const incoming = Object.fromEntries(tags.filter(key => search.has(key)).map(key => [key, String(search.get(key)).slice(0,100)]));
  const selected = Object.keys(incoming).length ? incoming : saved;
  if (Object.keys(incoming).length) try { window.sessionStorage.setItem(storageKey, JSON.stringify(incoming)); } catch { /* optional */ }
  return {
    utmSource: selected.utm_source || '',
    utmMedium: selected.utm_medium || '',
    utmCampaign: selected.utm_campaign || '',
  };
}
