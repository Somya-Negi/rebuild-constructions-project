# Phase 4 — Service Page Experience & Project Gallery

## Intent

Phase 4 builds on the revised Phase 3 demo. The homepage and site-wide navigation remain intentionally concise. The six service detail routes now share one mobile-first media system, while interior services keep their distinct design demo interactions. Portfolio detail pages become richer, swipe-friendly case-study templates.

## Changed architecture

- `src/components/ServicePageNav.jsx` — short on-page navigation and one top estimate action, populated with the current service.
- `src/components/ServiceMediaGallery.jsx` — shared selectable photo/video stage. Only the selected video is rendered. Mobile: horizontal thumbnail strip and swipe; desktop: main stage with vertical media selector.
- `src/components/ProjectGallery.jsx` — project photo viewer with thumbnail selection, prev/next controls, touch swipe and native-dialog enlargement. The gallery is labeled demo imagery.
- `src/components/ServiceCallout.jsx` — bottom estimate action opens existing native dialog with the service preselected; no extra in-experience prompts.
- `src/app/services/[slug]/page.js` — clear hierarchy: service banner -> jump links -> scope -> visual ideas (interiors only) -> photos/videos -> related project examples -> information to share -> estimate -> related service text links.
- `src/app/projects/[slug]/page.js` — structured project metadata fields and interactive gallery, always-visible labeled video placeholder, related projects and service-aware enquiry.
- `src/app/services/services.css` and `src/app/projects/projects.css` contain the page-specific layouts and gallery styles. Both use the type scale and spacing in `src/app/globals.css`.
- `src/data/site.js` — empty photo/video configurations for ALL six service pages.

## Client media replacement workflow

1. Put approved photo files under `public/images/` and videos/poster frames under `public/videos/`.
2. Edit **only** the associated data entries in `src/data/site.js` under `approvedMedia` (`construction`, `renovation`, `kitchens`, `bathrooms`, `painting`, `woodwork`).
3. For a photo, set `src: '/images/kitchen-01.webp'` and a factual `alt` describing what the photo shows.
4. For a video, set `src: '/videos/kitchen-walkthrough.mp4'` and `poster: '/images/kitchen-poster.webp'`.
5. For portfolio case studies, edit the corresponding object in `src/data/catalog.js` (`title`, `description`, `gallery`, `image`, `imageAlt`, `videoSrc`, `videoPoster`); update the case-study markup only when real project metadata is confirmed.
6. Replace or remove the *sample* labels and illustrative image notes only after the real assets, rights and accompanying project claims are verified.

Video players use `preload="none"` and do not autoplay. The selected video only appears on interaction in service galleries; this avoids loading every video on a page.

## Responsive rules

- Base body font is `16px` at every viewport size; display headings have a consistent shared responsive scale.
- Mobile: single-column overview, touch-swipable media choices, and horizontal related-project previews. Sections use existing consistent spacing tokens.
- Tablet: wider media stage and two-column project cards.
- Desktop: selective sticky on-page navigation, two-column media layout, and full-width project photographs.
- Touch targets for primary gallery controls and the estimate action are at least 44px high.
- Only fine-pointer hover states receive subtle movement; reduced-motion settings disable the new transitions.

## Enquiry behavior

- Opening `Get an estimate` or `Request an estimate` uses the existing `QuoteDialogProvider`, preselecting the current service.
- The single existing floating WhatsApp control remains present. With a blank business phone number it opens the demo-safe form; it does not claim a message was sent.
- Forms still do not persist leads or send business notifications: that backend belongs to a later commercial integration phase.

## Quality assurance

- Server-rendered all 15 public routes in the test harness, with substitute preview images.
- 105 responsive route-width checks: 15 routes at 320, 360, 390, 768, 800, 1024 and 1280px. No document-level horizontal overflow and 16px computed body text.
- Gallery controls, modal bounds and on-page anchor targets checked at 320, 390, 800 and 1280px.
- Parsed all 43 JavaScript/JSX source files and all four CSS files.
- This environment has not completed a real Next.js production build or a hydrated end-to-end browser test; run them locally before deployment.

## Still explicitly demo-only

Brand identity, business claims, location, project stories, photos, videos, reviews, WhatsApp number, lead delivery and SEO indexability. Do not publish as factual commercial claims or index the demo before client approval.
