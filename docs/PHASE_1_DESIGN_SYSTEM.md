# Phase 1 — Architectural Luxury Design System

**Project:** Construction + Interior Design Lead-Generation Website  
**Status:** Design demo / approved visual direction, unapproved business content  
**Stack:** Next.js App Router, React, JSX, Tailwind and custom CSS  
**Design intent:** Premium architectural editorial design with obvious paths to consultation.

## 1. Brand direction

**Visual concept:** An architectural studio's restraint combined with a construction business's clarity. Real project photography eventually leads the experience. Interface elements should frame and organize the imagery, not compete with it.

Brand identity in `src/data/site.js` (`AAROH`) is a **placeholder**, not the client's confirmed name.

**Tone:** Quietly confident, considered, detailed and practical. Avoid overclaiming, fabricated numbers, assumed credentials and invented customer outcomes.

### Tokens

| Token | Hex | Purpose |
| --- | --- | --- |
| `--canvas` | `#F6F4EE` | Main warm backdrop |
| `--surface` | `#FFFDFA` | Cards and contact form |
| `--ink` | `#252B27` | Standard type |
| `--forest` | `#202924` | Dark project sections / primary buttons |
| `--forest-2` | `#303C34` | Secondary dark sections |
| `--accent` | `#B18A65` | Editorial bronze accent |
| `--accent-light` | `#D4B79B` | Highlights on dark photographs |
| `--muted` | `#747770` | Secondary text |
| `--border` | `#DEDBD3` | Quiet dividers |

Tokens live at the top of `src/app/globals.css` and are aligned with `tailwind.config.js`.

### Typography

- **Display:** Iowan Old Style / Baskerville / Georgia, with intentional italic emphasis.
- **Body:** Helvetica Neue / Arial.
- **Hero H1:** fluid 66–112 px desktop, fluid 50–68 px on common mobile sizes.
- **Section headings:** fluid 49–84 px desktop, 43–59 px compact mobile.
- **Body:** 13–16 px; minimum 11–12 px for noncritical captions only.
- **Labels:** uppercase, 9–10 px, tracked, paired with a thin bronze line.

**Implementation note:** No third-party font request is introduced in Phase 1. Later, an approved commercial font can be self-hosted and tested for visual stability.

### Layout system

- Content width: max 1360 px.
- Desktop gutters: 56 px; tablet: 32 px; mobile: 20–23 px.
- Section vertical spacing: `clamp(86px, 9vw, 146px)` for desktop; reduced on mobile.
- Two-column sections for editorial contrast, single-column layouts at 768 px or less.
- Borders: subtle and square-cornered to match the architecture theme.
- Primary button: forest or ivory fill, strong contrast, arrow icon.
- Motion: hover image scale up to 1.06, 250–900 ms with ease-out. No scroll-jacking.

## 2. Phase 1 page and component decisions

| Experience | Interaction | Component | Intent |
| --- | --- | --- | --- |
| Scroll-aware navbar | Transparent on hero; cream on scroll; mobile menu, Escape close | `Navigation.jsx` | Branding + navigation + enquiry |
| Cinematic hero | Optimized priority image, editorial H1, two distinct CTAs | `Hero.jsx` | First impression + lead action |
| Philosophy statement | Restrained 2-column editorial text | `page.js` | Explain design direction |
| Construction and Interiors | Clickable two-pillar selector with images | `ServiceExplorer.jsx` | Categorize the offer |
| Specialty list | Selection changes list, focus and CTA visible | `ServiceExplorer.jsx` | Discover kitchens, bathrooms, painting, woodwork etc. |
| Selected inspiration | Photography-led demo gallery | `page.js` | Future project proof |
| Process, areas, form | Existing functional placeholders restyled | `page.js`, `EnquiryForm.jsx` | Complete demo journey |

## 3. Media art direction

Use the client's real project photographs once supplied. Use the following framing and orientations:

| Website element | Preferred media | Composition / treatment | Notes |
| --- | --- | --- | --- |
| Hero | Wide completed building / premium interior, 2400 px+ | Subject towards right; dark left overlay for type | Optional short silent video later, keep image fallback |
| Construction pillar | Strong finished building or large-scale renovation | Vertical / 4:5 crop for responsive art direction | Genuine execution photos required in final |
| Interiors pillar | Beautiful wide kitchen or living space | Visible depth and distinctive materials | Maintain uncluttered copy area |
| Kitchen feature (Phase 2) | 5–8 kitchen angles and detail images | Horizontal gallery; cabinetry/finish close-ups | Optional 360° tour as later enhancement |
| Bathroom feature (Phase 2) | Matching before/after pair, 3–5 detail photos | Same angle and approximate crop | Drag to compare; touch accessible |
| Painting feature (Phase 2) | Finished-room photos and material samples | Even lighting and correct color references | Color previews must be labelled simulation |
| Woodwork feature (Phase 2) | Wardrobes, built-ins, furniture, joinery | Full room plus details | Staggered galleries, no heavy 3D required |
| Project portfolio | 8–15 strong assets per featured case study | Hero, completed area, before/after, details | Do not present reference images as real work |
| Testimonials (later) | Client-approved text, audio or video | Natural lighting, authentic setting | No fake customer endorsements |

**Demo-specific limitation:** All current stock photos are illustrative placeholders. They must never be represented as verified completed client work. Remote image delivery and client asset rights require review before public launch.

### Recommended video rules

1. Hero video is optional: short, muted, looping, poster image fallback, disabled or postponed where it harms LCP or data usage.
2. Project walkthrough videos should load on click, not automatically alongside all page sections.
3. Prefer one high-quality video per featured project over many heavy embeds.
4. Supply 16:9 desktop poster, 4:5 mobile crop, visible controls, captions when dialogue is present.

## 4. Accessibility and motion

- Reduce transitions automatically for `prefers-reduced-motion`.
- Keyboard accessible buttons and menu controls, real semantic headings, descriptive alt text for meaningful images.
- Decorative card photographs in the category selector use empty alt text because accessible labels already identify the selectable categories.
- Mobile first: important controls at least 40–44 px in practice where possible, adequate spacing, no autoplay audio.
- Keep navigational anchors and WhatsApp fallback usable even before a business number is configured.

## 5. Conversion design

**Immediate CTA:** Start your project / Let's talk → `#contact`.  
**Service-level CTA:** Discuss construction / interiors → `#contact`.  
**Current demo form:** Prepares a WhatsApp message. It does not send, store, or confirm a lead.  
**Future production form:** server-side validation + storage + notification, plus optional WhatsApp handoff.  
**Tracking in Phase 5:** WhatsApp click, click-to-call, successful form submission, qualified enquiry and project source category.

No business number, working lead backend or testimonials are fabricated in Phase 1.

## 6. Phase acceptance criteria

- Navbar usable with keyboard and on mobile.
- Hero and primary services appear in intentional hierarchy at mobile, tablet and desktop widths.
- Construction/Interiors selection operates without navigation or page reload.
- Enquiry anchors work and demo mode never pretends to have submitted a lead.
- CSS honors reduced motion preference.
- Copy, images, service lists and locations are configurable in `src/data/site.js`.
- `noindex` remains enabled until actual company copy and media are approved.

## 7. Next milestone: Phase 2

Build the individual service story sections within the established design system:

1. Construction: project timeline and construction progress images.
2. Kitchen: gallery with style filter and material details.
3. Bathroom: before-and-after image comparison.
4. Painting / whitewashing: simple finish and color preview.
5. Woodwork: furniture and cabinetry showcase.
6. Renovation: complete transformations and walkthrough previews.

Treat each as data-driven and reusable. Avoid one heavyweight animation library or 3D engine per section.
