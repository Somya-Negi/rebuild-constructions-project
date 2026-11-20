'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppHref } from '@/lib/contact';
import { QuoteTrigger } from '@/components/ui/QuoteDialogProvider';
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink';
import WhatsAppMark from '@/components/ui/WhatsAppMark';

/** Visual invitation only; never fabricate an unread message or notification count. */
export default function FloatingWhatsApp() {
  const href = getWhatsAppHref();
  const [promptVisible, setPromptVisible] = useState(true);
  const mark = href ? <WhatsAppMark /> : <MessageCircle aria-hidden="true" />;
  return <div className="floating-contact-wrap">
    {promptVisible && <div className="floating-contact-prompt" role="note">
      <span>Have a question?</span>
      <button type="button" aria-label="Dismiss chat suggestion" onClick={() => setPromptVisible(false)}><X size={14} aria-hidden="true" /></button>
    </div>}
    {href
      ? <TrackedWhatsAppLink href={href} source="floating" className="floating-whatsapp" aria-label="Chat about your project on WhatsApp" title="Chat on WhatsApp">{mark}</TrackedWhatsAppLink>
      : <QuoteTrigger className="floating-whatsapp" entry="whatsapp" source="floating" aria-label="Open project contact options" title="Contact options">{mark}</QuoteTrigger>}
  </div>;
}
