import { MessageCircle, ArrowUpRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import EnquiryForm from '@/components/EnquiryForm';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import { getWhatsAppHref } from '@/lib/contact';

export default function ContactSection() {
  const href = getWhatsAppHref();
  return <section className="section contact-section" id="contact" aria-labelledby="contact-heading"><div className="container contact-grid">
    <div className="contact-copy"><SectionLabel>CONTACT & ESTIMATES</SectionLabel><h2 className="display-heading" id="contact-heading">Tell Us About Your Project</h2><p>Planning a new build or interior work? Share your requirements and find out the next steps.</p>
      <div className="contact-divider" />
      {href ? <TrackedWhatsAppLink href={href} source="contact" className="contact-whatsapp">
        <span className="contact-wa-icon"><MessageCircle size={22} aria-hidden="true" /></span><span><strong>Prefer WhatsApp?</strong><small>Start a conversation with the team</small></span><ArrowUpRight size={19} aria-hidden="true" />
      </TrackedWhatsAppLink> : <div className="contact-whatsapp contact-whatsapp-inactive" aria-label="WhatsApp will be connected before launch">
        <span className="contact-wa-icon"><MessageCircle size={22} aria-hidden="true" /></span><span><strong>Contact by WhatsApp</strong><small>Direct chat is currently unavailable</small></span>
      </div>}
    </div>
    <div id="contact-form"><EnquiryForm source="homepage_contact" /></div>
  </div></section>;
}
