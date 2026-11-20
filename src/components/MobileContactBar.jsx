import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import { getWhatsAppHref } from '@/lib/contact';

export default function MobileContactBar() {
  const whatsappUrl = getWhatsAppHref();

  return <nav className="mobile-contact-bar" aria-label="Quick project contact">
    <Link className="mobile-contact-primary" href="/#contact-form">Get an estimate <ArrowUpRight size={17} aria-hidden="true" /></Link>
    {whatsappUrl ? <TrackedWhatsAppLink className="mobile-contact-secondary" href={whatsappUrl} source="mobile_contact_bar"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</TrackedWhatsAppLink> : <Link className="mobile-contact-secondary" href="/services">Services</Link>}
  </nav>;
}
