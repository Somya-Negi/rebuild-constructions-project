import { QuoteTrigger } from '@/components/ui/QuoteDialogProvider';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import { getWhatsAppHref } from '@/lib/contact';

export default function ServiceCallout({ service, source = 'service_bottom' }) {
  const whatsappHref = getWhatsAppHref({ service: service.inquiryLabel });
  return <section id="service-estimate" className="service-cta-v3" aria-labelledby="service-estimate-heading">
    <div className="container service-cta-inner-v3">
      <div><span>START YOUR PROJECT</span><h2 id="service-estimate-heading">Need help with {service.title.toLowerCase()}?</h2><p>Share the type of work you need and where your project is located.</p></div>
      <div className="service-cta-actions">
        <QuoteTrigger className="button button-light" source={source} service={service.inquiryLabel}>Request an estimate</QuoteTrigger>
        {whatsappHref && <TrackedWhatsAppLink href={whatsappHref} source={source} service={service.inquiryLabel} className="text-link text-link-light">Chat on WhatsApp</TrackedWhatsAppLink>}
      </div>
    </div>
  </section>;
}
