# Phase 3 Refinement — Lead-Generation Homepage & Navigation

**Project:** AAROH builder website demo (placeholder brand); Next.js 15 / React 19; mobile-first.  
**Objective:** Incorporate review feedback without disrupting six service routes or the project detail architecture.

## Decisions made

| Concern | Decision | Implementation |
| --- | --- | --- |
| Services / Projects hard to navigate | Keep both overview links, give each an optional expandable category menu. | `Navigation.jsx`; direct **Services** and **Projects** links work; adjacent chevron expands category/service links. Mobile uses the same click-to-expand pattern. |
| Too many icons and CTAs | Favor plain text, keep only a few purposeful conversion points. | Simplified service-card links and image overlay actions. Primary estimate triggers in header and hero; enquiry form at bottom; one floating WhatsApp control. Removed old fixed mobile CTA bar. |
| Hero copy feels abstract | Use a simple headline with explicit service context. | “Beautiful homes. Thoughtfully built.” plus clear construction/interior description in `src/data/site.js`. |
| Client images and videos not ready for demo | Keep deliberately empty placeholders until approved media arrives. | Construction and renovation pages use photo/video slots. Construction service thumbnails use placeholders, rather than fake built-site photographs. |
| Desire for 3D / UI libraries | Use restrained CSS perspective on hover-capable card layouts, no WebGL. | `src/app/globals.css` styles service-card hover effects. The native dialog and CSS scroll carousel use browser features. |
| Homepage project gallery too distracting | Keep a compact preview of two project examples. Full filterable gallery remains `/projects`. | `src/app/page.js`, `ProjectPreview.jsx`. Relevant examples remain on dedicated service pages. |
| Contact form too far down | Expose a short, click-to-open estimate dialog from header and hero; do **not** show automatic popups. | Native `<dialog>` with close button, Escape support and scrollable mobile layout in `QuoteDialogProvider.jsx`. |
| How We Work visually disconnected | Convert the four-step list to a connected, numbered timeline. | `WorkingProcess.jsx`, mobile vertical, desktop horizontal. |
| Customer feedback looks empty | Add a swipeable / arrow-controlled carousel of clearly marked **sample** review cards. | `ReviewsPreview.jsx`, data in `site.demoReviews`. They are fictional design samples, not customer endorsements. |
| Walkthrough video spaces | Show three empty, labeled video slots, swipeable on phone, grid on desktop. | `VideoWalkthroughs.jsx`, `site.approvedMedia.walkthroughs`. |
| WhatsApp everywhere | One floating WhatsApp shortcut, avoiding duplicate sticky contact bars. | `FloatingWhatsApp.jsx`. Number blank => clearly marked demo action opens estimate dialog, not an invalid WhatsApp URL. |

## Page information architecture

```text
/
  Hero (Request an Estimate popup + Explore Services)
  Our Services (two category anchors, then grouped service cards)
  Selected Work (two examples + View All Projects)
  How We Work (4-step timeline)
  Customer Reviews (sample carousel)
  Project Walkthroughs (3 media slots)
  Contact / Request an Estimate (full form + WhatsApp option)

/services                 grouped directory
/services/[slug]          six dedicated service pages
/projects                 full category-filterable portfolio
/projects/[slug]          sample project detail pages
```

### Desktop and mobile navigation behavior

- The **Services** label opens `/services` directly. Its adjacent chevron expands two columns of individual services.
- The **Projects** label opens `/projects` directly. Its chevron expands the links **All Projects**, **Construction & Renovation**, and **Interior Projects**. The corresponding URL query (`?category=construction` or `?category=interiors`) selects the project filter after hydration.
- Mobile menu uses button-opened submenus, not hover. Pressing Escape or navigating away closes the menus.
- Navigation links and main buttons meet the project's 44px target rule.

## Content replacement: update data instead of JSX

All final business and portfolio content is still pending. Don't publish demonstration images, invented testimonials or service promises as real claims.

1. **Hero and business details:** edit `src/data/site.js` (`site.brand`, `site.hero`, `site.whatsappNumber`). Replace the logo artwork when supplied.
2. **Service copy and category labels:** edit `src/data/catalog.js`. Page templates and service enquiry options already use these data entries.
3. **Real construction / renovation photos:** put approved files in `public/images/`, then populate `site.approvedMedia.construction` and `.renovation` with `src` and `alt`; the placeholder component automatically becomes a responsive image.
4. **Real walkthroughs:** store optimized `.mp4` or `.webm` under `public/videos/`, add a lightweight `poster` image, and populate `site.approvedMedia.walkthroughs`. Videos use `preload="none"` and native controls. Nothing autoplays.
5. **Construction service card and page banners:** set each construction service's `coverImage` path and appropriate `imageAlt` in `src/data/catalog.js`. An empty `coverImage` intentionally displays a placeholder.
6. **Customer reviews:** replace every `site.demoReviews` entry with approved genuine reviews, customer display names and permissioned media, and remove **SAMPLE TESTIMONIAL** labels only after verification.
7. **Project portfolio:** replace sample projects in `src/data/catalog.js` with genuine titles, categories, image paths, galleries and scope details; update slugs and links consistently.
8. **WhatsApp:** set `site.whatsappNumber` to a valid international number with country code, digits only (e.g. country code + local number). Test links on real phones before launch.

## Current enquiry behavior (demo only)

- Hero and desktop-header buttons open the same native estimate dialog; service-aware form selection is supported through its `initialService` prop.
- The bottom form remains available; service buttons can still navigate there with the requested service selected.
- If WhatsApp is configured, submitting the form opens a prefilled WhatsApp conversation. **The visitor must press Send** in WhatsApp; opening a link does not establish a real lead.
- No server-side lead persistence, automatic WhatsApp message, notification, CRM integration, consent workflow or qualified-lead analytics is present yet. These are **pre-launch requirements**.
- No popup is triggered automatically. There is a single floating WhatsApp control (not the old persistent 2-button mobile bar).

## Interaction and performance boundaries

- Native HTML `<dialog>` instead of a heavy UI framework. Browser handles modal focus constraints and Escape dismissal.
- Review cards use CSS scroll-snap with small React next/previous controls. Project category filters remain lightweight.
- A very slight CSS perspective on hover-capable desktop cards gives subtle depth; no transforms run by default on touch/mobile.
- Preserve the shared 16px body font, mobile form inputs, spacing tokens and reduced-motion rules.
- Shadcn UI can be integrated in a later approved technical phase, if needed, after confirming actual value and adding its dependencies. **It is not currently installed.**

## Verification and limitations

- All **40** project JavaScript/JSX files parsed using the TypeScript compiler.
- All three stylesheets parsed using PostCSS.
- **15** routes rendered through a React SSR test harness with Next image/navigation shims and **mock media**; local links/anchors showed no missing targets (611 examined in the smoke-test).
- **36** route-by-viewport static layout checks at widths 320–1280px passed for overflow, 16px body font and basic structure.
- **8** navigation/menu and modal overlay layout checks at widths 320–1280px passed; mobile modal can scroll without exceeding viewport width.
- The QA harness verifies static SSR/layout, not a complete Next.js production build or hydrated click-through. The container cannot reach the npm registry and the uploaded dependencies contain a Windows-only Next SWC binary. Run `npm install`, `npm run build`, and test hydrated menus, carousels, forms, service pages and WhatsApp in your development environment before deployment.
- Demo metadata remains **`noindex, nofollow`**. Do not remove it until approved company identity, real media, privacy policy and working lead delivery are in place.
