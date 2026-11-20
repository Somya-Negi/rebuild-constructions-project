'use client';
/** Privacy-safe events. No names, phone numbers, enquiry text or URLs with query strings. */
export function trackConversion(eventName, { source = 'unknown', service = '' } = {}) {
  if (typeof window === 'undefined') return;
  const allowed = ['estimate_open', 'generate_lead', 'whatsapp_click'];
  if (!allowed.includes(eventName)) return;
  const details = {
    service_type: String(service).slice(0, 100),
    placement: String(source).slice(0, 50),
  };
  // Works with existing GTM/GA4 integrations. No analytics scripts or cookies are installed here.
  if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: eventName, ...details });
  else if (typeof window.gtag === 'function') window.gtag('event', eventName, details);
}
