# Phase 1 Implementation Notes — November 2026

## Summary

This project includes a complete, styled demonstration of the **Phase 1 design foundation** and keeps the previous lower-page structure intact for a usable, end-to-end homepage preview.

### New reusable components

- `src/components/Navigation.jsx`: scroll-responsive header and mobile navigation.
- `src/components/Hero.jsx`: photo-first hero with accessible actions.
- `src/components/ServiceExplorer.jsx`: interactive Construction/Interiors category cards and specialty list.
- `src/components/MediaImage.jsx`: responsive Next.js image wrapper.
- `src/components/SectionLabel.jsx`: consistent design-system eyebrow labels.

### Updated existing files

- `src/app/page.js`: composes the page and retains gallery, process, service areas, enquiry and footer for context.
- `src/app/globals.css`: full tokenized premium architectural layout and mobile rules.
- `src/data/site.js`: editable demo identity, copy, hero, categories, specialties, projects, process and locations.
- `src/app/layout.js`: demo-specific metadata; keeps the site non-indexable.
- `tailwind.config.js`: matching theme variables.
- `next.config.mjs`: allows the existing Unsplash demo photography to work through Next Image.

### How to run

```bash
npm install
npm run dev
```

Test at http://localhost:3000. From an environment with an installed Linux-compatible Next.js SWC binary, run `npm run build` before deployment.

### How to replace content later

1. Edit `src/data/site.js` for brand name, descriptor, headlines, service descriptions and projects.
2. Replace remote image URLs with locally hosted approved photographs in `public/images/`.
3. Update hero and service image alt descriptions.
4. Provide an official WhatsApp number in `site.whatsappNumber` using full country code and digits only.
5. Keep actual services, experience claims and business locations unverified until the client approves them.
6. The existing `EnquiryForm.jsx` is **not** a lead database or CRM; build a backed form in the lead-generation phase.
7. Remove the demo disclaimers only after verified content replaces all placeholders.
8. The `robots` value in `src/app/layout.js` must remain `noindex` until business content, media rights, contact routes and lead capture have been reviewed.

### Notes on previews and validation

- Syntax parsed successfully for all `.js` and `.jsx` source files using a JSX-aware parser.
- The development container cannot access npm registry endpoints and does not have the Linux native Next.js SWC binary. Full `next build` and a browser screenshot were therefore not completed in this environment.
- The uploaded ZIP originally contained Windows-specific `@next/swc-win32-x64-msvc`; do not ship that binary with a Linux build. Run `npm install` on the destination platform.
- The downloadable project intentionally **excludes** `node_modules` and `.next` to keep it portable and avoid shipping outdated caches.
