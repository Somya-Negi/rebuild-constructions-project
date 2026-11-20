import { ArrowUpRight } from 'lucide-react';
import { getWhatsAppHref } from '@/lib/contact';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';

/** Direct contextual WhatsApp chat or service-preselected form fallback. */
export default function ServiceInquiryLink({ service, children, className = 'text-link' }) {
  const href = getWhatsAppHref({ service });
  const content = <>{children || `Discuss ${service.toLowerCase()}`} <ArrowUpRight size={18} aria-hidden="true" /></>;
  if (href) return <TrackedWhatsAppLink href={href} source="service_experience" service={service} className={className}>{content}</TrackedWhatsAppLink>;
  return <a href={`/?service=${encodeURIComponent(service)}#contact-form`} className={className}>{content}</a>;
}
