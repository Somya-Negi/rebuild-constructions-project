import './globals.css';
import './projects.css';
import Navigation from '@/components/Navigation';
import SiteFooter from '@/components/SiteFooter';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { QuoteDialogProvider } from '@/components/ui/QuoteDialogProvider';
import { pageRobots, siteOrigin, canonical } from '@/lib/seo';
import { site } from '@/data/site';

export const metadata = {
  title: `${site.brand} | Home Construction & Interior Work`,
  description: 'Explore new home construction and full-home interiors, including kitchens, bathrooms, painting and custom carpentry.',
  robots: pageRobots(),
  alternates: canonical('/'),
  ...(siteOrigin ? { metadataBase: new URL(siteOrigin) } : {}),
};

export default function RootLayout({ children }) {
  return <html lang="en"><body><QuoteDialogProvider><a className="skip-link" href="#main-content">Skip to content</a><Navigation />{children}<SiteFooter /><FloatingWhatsApp /></QuoteDialogProvider></body></html>;
}
