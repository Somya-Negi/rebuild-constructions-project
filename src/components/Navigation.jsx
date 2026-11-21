'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { site } from '@/data/site';
import { groupServices, serviceHref } from '@/data/catalog';

function NavigationLinks({ pathname, expanded, setExpanded, closeMenu, mobile = false }) {
  const current = href => pathname === href ? 'page' : undefined;
  const panelId = `${mobile ? 'drawer' : 'desktop'}-interiors-nav-panel`;

  return (
    <nav className={mobile ? 'drawer-nav nav-v4' : 'nav-links nav-v4'} aria-label="Main navigation">
      <Link href="/" className="nav-regular-link" aria-current={current('/')} onClick={closeMenu}>Home</Link>
      <Link href="/construction" className="nav-regular-link" aria-current={current('/construction')} onClick={closeMenu}>Construction</Link>
      <div className="nav-group">
        <div className="nav-group-heading">
          <Link href="/interior-work" className="nav-direct-link" aria-current={current('/interior-work') || (pathname.startsWith('/interior-work/') ? 'location' : undefined)} onClick={closeMenu}>Interior Work</Link>
          <button type="button" className="nav-expand" aria-expanded={expanded} aria-controls={panelId}
            aria-label={`${expanded ? 'Hide' : 'Show'} interior work links`} onClick={() => setExpanded(open => !open)}>
            <ChevronDown size={16} aria-hidden="true" />
          </button>
        </div>
        <div id={panelId} className="nav-panel" hidden={!expanded}>
          <Link className="nav-panel-overview" href="/interior-work" onClick={closeMenu}>View all interior services</Link>
          {groupServices('interiors').map(service => {
            const href = serviceHref(service.slug);
            return <Link href={href} key={service.slug} aria-current={current(href)} onClick={closeMenu}>{service.title}</Link>;
          })}
        </div>
      </div>
      <Link href="/projects" className="nav-regular-link" aria-current={current('/projects')} onClick={closeMenu}>Projects</Link>
      <Link href="/#approach" className="nav-regular-link" onClick={closeMenu}>How It Works</Link>
      <Link href="/#contact" className={mobile ? 'drawer-contact' : 'nav-regular-link'} onClick={closeMenu}>
        Contact{mobile && <ArrowUpRight size={18} aria-hidden="true" />}
      </Link>
    </nav>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const headerRef = useRef(null);
  const drawerRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => {
    drawerRef.current?.close();
    setMobileOpen(false);
    setExpanded(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 38);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => closeMenu(), [pathname, closeMenu]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 800px)');
    const onKey = event => {
      if (event.key === 'Escape' && !drawerRef.current?.open) setExpanded(false);
    };
    const onPointer = event => {
      if (!headerRef.current?.contains(event.target)) setExpanded(false);
    };
    desktop.addEventListener('change', closeMenu);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      desktop.removeEventListener('change', closeMenu);
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [closeMenu]);

  const solid = pathname !== '/' || scrolled || mobileOpen || expanded;
  const links = { pathname, expanded, setExpanded, closeMenu };

  return (
    <header ref={headerRef} className={`site-header ${solid ? 'is-scrolled' : ''}`}>
      <div className="container nav-shell">
        <Link className="brand-lockup" href="/" aria-label={`${site.brand} home`} onClick={closeMenu}>
          <span className="brand-logo-frame" aria-hidden="true"><img src={site.logo} alt="" /></span>
          <span className="sr-only">{site.brand} {site.descriptor}</span>
        </Link>
        <NavigationLinks {...links} />
        <button className="nav-toggle" type="button" aria-controls="mobile-navigation"
          aria-expanded={mobileOpen} aria-haspopup="dialog" aria-label="Open navigation"
          onClick={() => { drawerRef.current.showModal(); setMobileOpen(true); }}>
          <Menu size={22} aria-hidden="true" />
        </button>
      </div>
      <dialog ref={drawerRef} className="nav-drawer" id="mobile-navigation" aria-label="Site menu"
        onCancel={event => { event.preventDefault(); closeMenu(); }}
        onClick={event => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="nav-drawer-content">
          <div className="nav-drawer-header">
            <span className="brand-logo-frame"><img src={site.logo} alt={site.brand} /></span>
            <button className="nav-drawer-close" type="button" aria-label="Close navigation" autoFocus onClick={closeMenu}>
              <X size={21} aria-hidden="true" />
            </button>
          </div>
          <NavigationLinks {...links} mobile />
        </div>
      </dialog>
    </header>
  );
}
