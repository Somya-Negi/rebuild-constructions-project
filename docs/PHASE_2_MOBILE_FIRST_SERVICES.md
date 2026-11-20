# Phase 2 — Mobile-First Service Experiences

**Status:** Implemented in source; visual demonstration only until approved media/content is provided.

## Summary

This phase continues the Phase 1 premium architectural theme while correcting inconsistent typography, oversized section gaps and weak mobile density. The six new interactive service sections are rendered on the homepage after the Construction/Interiors explorer.

### 1. Consistent type and spacing

`src/app/globals.css` is now mobile-first. The `:root` tokens define all typography and section padding. Media queries only enhance layouts from the smallest viewport upward.

| Token / role | Mobile default | Desktop behavior |
| --- | --- | --- |
| `--text-body` | 16px | 16px (unchanged) |
| `--text-small` | 14px | 14px (unchanged) |
| `--text-label` | 12px | 12px (unchanged) |
| `--type-h1` | fluid approx. 42–61px | fluid approx. 61–102px |
| `--type-h2` | fluid approx. 34–50px | fluid approx. 45–64px |
| `--type-h3` | 27px | 32px |
| `--section-space` | 52px top / bottom | 72px at 800px, 76px at 1200px |
| `--gutter` | 18px | 32px at 640px, 40–48px on desktop |

The intent is **consistent hierarchy**, not literally identical sizes for every heading. Making every text element the same size would damage readability. Every section uses one shared heading component or the shared `.display-heading` class rather than individual one-off sizes. Body copy stays at 16px in both responsive views.

### 2. New components

| Component | Experience | Behavior |
| --- | --- | --- |
| `ConstructionJourney.jsx` | Construction progress | Select Planning, On site, Completion; image/description change |
| `KitchenGallery.jsx` | Kitchen design gallery | Style tabs, next/previous buttons, mobile swipe gesture |
| `BathroomComparison.jsx` | Bathroom comparison | Touch/mouse/keyboard accessible range control reveals image overlay |
| `PaintingStudio.jsx` | Finish/color preview | Four swatches update a rendered illustrative room wall |
| `WoodworkGallery.jsx` | Woodwork gallery | Select cabinetry, storage or feature type; picture and caption change |
| `RenovationStory.jsx` | Renovation media | Editorial layout; `<video controls preload="none">` when configured |
| `FeatureHeading.jsx` | Shared presentation | Consistent section labels, H2 styles and intro body type |
| `FeatureNav.jsx` | Service quick navigation | Horizontal scroll on mobile with anchor navigation |
| `ServiceInquiryLink.jsx` | Service-aware CTA | Contextual WhatsApp link with configured number, otherwise selects service in demo enquiry form |
| `MobileContactBar.jsx` | Mobile lead action | Persistent estimate and services links; WhatsApp option appears only if configured |

The source content resides in `src/data/site.js` → `serviceStories`; media URL fields can later be replaced with approved local images. No new animation or 3D dependency is needed.

### 3. Section order on homepage

1. Navbar and hero
2. Philosophy intro
3. Construction/Interiors explorer
4. Horizontal service quick-jump
5. Construction
6. Kitchens
7. Bathrooms
8. Painting and finishes
9. Woodwork
10. Full-home renovation
11. Selected inspiration portfolio
12. Our approach
13. Service areas (illustrative)
14. Contact + WhatsApp demo form
15. Footer + mobile contact bar

### 4. Media and interactions

**All images are still temporary illustrative placeholders.** The client has indicated real media is available, but the files were not included here. Do not publish these images as completed work.

- **Construction:** Replace the three images with one real project's `planning`, `on-site` and `completion` photography; ensure stage order and claims match reality.
- **Kitchens:** Use at least three approved kitchen projects, one horizontal hero and available detail views. The gallery supports finger swipes, style buttons and keyboard-usable arrows.
- **Bathrooms:** The two current images are intentionally the *same* sample photo. A simulated before filter illustrates the interaction; this is **not** a real renovation. Replace `beforeImage` and `afterImage` with matching-angle original photos and set `simulated: false`; then replace the disclaimer.
- **Painting:** The color module is an illustration, not photo-accurate recoloring or a physical paint sample. Update palettes using actual available finish options and add an approved caution about screen variation.
- **Woodwork:** Replace all three examples with actual cabinetry, wardrobes or feature furniture photography, and ensure category labels match genuine offerings.
- **Renovation:** Configure `videoSrc: '/videos/approved-walkthrough.mp4'` and `videoPoster: '/images/approved-renovation-poster.jpg'` after adding those files in `public/`. With no video configured, the module shows a static demo photograph and does **not** display a fake play control.

### 5. Enquiry behavior

`ServiceInquiryLink.jsx` behaves as follows:

- **WhatsApp configured:** Opens the verified company's `wa.me` link with service-specific prefilled message; the visitor still needs to send the message.
- **WhatsApp blank (demo):** Scrolls to `#contact-form`, dispatches a local browser event and preselects the relevant service in the form.
- **Demo form:** Continues to show an explicit notice that no message is sent without a configured business number. It does not save or submit leads in this phase.

Real form storage, CRM integration, user consent and analytics remain for the lead-generation phase.

### 6. Performance and accessibility

- Uses the existing Next.js/React dependencies; no GSAP, Three.js or other heavy library added.
- Hero image retains priority loading; media inside service sections uses responsive `next/image`, lazy loading by default.
- Renovation video is only created when `videoSrc` exists and uses `preload="none"`, visible controls and `playsInline`.
- Mobile interactive elements use controls approximately 44–55px tall or larger where applicable.
- Sliders, tabs and gallery actions use native buttons or a range input with accessible labels.
- Reduced-motion preferences are respected.
- Mobile contact bar is hidden at desktop widths and never advertises a WhatsApp destination when the number is blank.
- No `autoplay` videos and no scroll-jacking.

### 7. Testing and known limitations

**Completed checks:**

- Parsed all **19 JS/JSX** files with a Babel JSX parser.
- Verified local `@/` imports exist and static in-page anchor destinations resolve.
- Parsed the stylesheet successfully with `tinycss2`.
- Rendered the homepage with a local React SSR verification harness, using substitute SVGs for remote images (for layout checks only).
- Used headless Chromium layout checks at **360px, 390px, 768px and 1280px**. All widths had **zero document-level horizontal overflow** and the body font was exactly **16px** at every tested size. The shared H2 scale was also confirmed consistent across service sections.

**Not completed:** A real Next.js production build and hydrated end-to-end interaction tests, because this environment cannot reach the npm registry and the original uploaded dependencies contain a Windows-only SWC compiler. Run `npm install`, `npm run dev`, then `npm run build` on a machine with registry access. Test actual media URLs and swipe/slider behavior in mobile Safari and Chrome before production.

### 8. How to proceed

1. Review Phase 2 on a 360–390px phone-sized viewport first, then tablets and desktops.
2. Adjust data and media in `src/data/site.js` once approved content arrives; avoid rewriting the layout for copy changes.
3. Only move to live WhatsApp and backend lead integrations after official business contact information is provided.
4. Keep `noindex` until all placeholder claims, imagery, service areas and business information have been approved and replaced.

_This document overrides the Phase 1 type scale and section-gap guidance, which were found to create inconsistent density._
