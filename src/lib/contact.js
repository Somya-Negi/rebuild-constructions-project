import { site } from '@/data/site';

/** Configure the actual number through NEXT_PUBLIC_WHATSAPP_NUMBER at deployment. */
export function getWhatsAppDigits() {
  const digits = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || site.whatsappNumber || '').replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15 ? digits : '';
}
export function getWhatsAppHref({ service = '', reference = '' } = {}) {
  const digits = getWhatsAppDigits();
  if (!digits) return '';
  const project = service && service !== 'Other' ? service.toLowerCase() : 'a construction or interior project';
  const message = reference
    ? `Hello ${site.brand}, I'm following up on my estimate request. My enquiry reference is ${reference}.`
    : `Hello ${site.brand}, I'd like to discuss ${project}. Please let me know how we can proceed.`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
