'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';
import EnquiryForm from '@/components/EnquiryForm';
import { getWhatsAppDigits } from '@/lib/contact';
import { trackConversion } from '@/lib/conversions';

const QuoteDialogContext = createContext(null);

/** Shared, keyboard-accessible native dialog with an unobtrusive 50% scroll prompt. */
export function QuoteDialogProvider({ children }) {
  const dialogRef = useRef(null);
  const shownOnPathRef = useRef(new Set());
  const pathname = usePathname();
  const [request, setRequest] = useState({ service: '', entry: 'estimate', source: 'unspecified', key: 0 });

  const openQuote = useCallback(({ service = '', entry = 'estimate', source = 'unspecified' } = {}) => {
    if (pathname) shownOnPathRef.current.add(pathname);
    setRequest(old => ({ service, entry, source, key: old.key + 1 }));
    trackConversion('estimate_open', { source, service });
    if (dialogRef.current && !dialogRef.current.open) dialogRef.current.showModal();
  }, [pathname]);
  const closeQuote = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const isEligiblePage = pathname === '/' || pathname === '/projects' || pathname === '/construction' || pathname.startsWith('/interior-work');
    if (!isEligiblePage || !pathname || shownOnPathRef.current.has(pathname)) return undefined;

    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0 || window.scrollY / scrollableHeight < .5) return;

      shownOnPathRef.current.add(pathname);
      openQuote({ entry: 'estimate', source: 'scroll_50', service: '' });
      window.removeEventListener('scroll', handleScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openQuote, pathname]);

  return <QuoteDialogContext.Provider value={{ openQuote, closeQuote }}>
    {children}
    <dialog ref={dialogRef} className="quote-dialog" aria-labelledby="quote-dialog-heading" onClick={event => { if (event.target === event.currentTarget) closeQuote(); }}>
      <div className="quote-dialog-content">
        <div className="quote-dialog-top">
          <div>
            <span className="simple-kicker-v3">START YOUR PROJECT</span>
            <h2 id="quote-dialog-heading">Request an Estimate</h2>
          </div>
          <button className="quote-dialog-close" type="button" aria-label="Close estimate form" onClick={closeQuote}><X size={22} aria-hidden="true" /></button>
        </div>
        {request.entry === 'whatsapp' && !getWhatsAppDigits() && <p className="quote-dialog-demo" role="status">WhatsApp chat is currently unavailable. Online estimate requests are available once enquiry handling is enabled.</p>}
        <EnquiryForm key={request.key} initialService={request.service} source={request.source} variant="modal" />
      </div>
    </dialog>
  </QuoteDialogContext.Provider>;
}

export function QuoteTrigger({ children, className = '', service = '', entry = 'estimate', source = 'unspecified', onClick, ...rest }) {
  const context = useContext(QuoteDialogContext);
  if (!context) throw new Error('QuoteTrigger must be rendered inside QuoteDialogProvider');
  return <button type="button" className={className} onClick={() => { onClick?.(); context.openQuote({ service, entry, source }); }} {...rest}>{children}</button>;
}
