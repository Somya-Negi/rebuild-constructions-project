'use client';
import { trackConversion } from '@/lib/conversions';

export default function TrackedWhatsAppLink({ href, source = 'unknown', service = '', children, className = '', ...props }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => trackConversion('whatsapp_click', { source, service })} {...props}>{children}</a>;
}
