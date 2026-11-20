# Phase 3 — Builder Website Architecture, Content Model and Page Templates

**Status: implemented demo source, November 2026.** All company identity, images, projects, service promises and customer reviews remain placeholders. The final marketing claims and genuine media will be inserted after the demo structure is approved.

## What was wrong with Phase 2

Phase 2 rendered six elaborate service sections sequentially on the homepage. On mobile, these repeated interactive sections made the homepage unusually long, and users had to read through unrelated services before reaching their enquiry form. The homepage navigation relied mainly on `#anchor` links and there were no dedicated service or project pages. Editorial headings such as “An idea, beautifully built” looked elegant but did not clearly describe what the company provides.

## Phase 3 design decisions

1. **Plain-language heading hierarchy:** Visible service headings identify the offering (e.g., **Home Construction**, **Kitchen Design & Remodeling**, **Painting & Whitewashing**). The homepage uses straightforward labels: **Construction Services**, **Interior Work**, **Project Gallery**, **How We Work**, **Customer Reviews**, **Get a Project Estimate**.
2. **Correct categories:** Home Construction and Full-Home Renovation sit in **Construction Services**. Kitchens, Bathrooms, Painting and Woodwork sit in **Interior Work**. An interior-service specialist should not be hidden inside an undifferentiated construction list.
3. **Homepage = discovery:** Two visually separated service categories, brief cards, selected portfolio examples, process, testimonials preview and contact. **No six full service widgets stacked on the homepage**.
4. **Service page = detail:** Each specialist route has its own hero, overview, service scope, Phase 2 interactive feature, enquiry prompts, related project examples and contextual estimate CTA.
5. **Portfolio = trustworthy architecture:** `/projects` has category filters and `/projects/[slug]` has an image gallery, optional real video and service link. *The content is illustrative, and no design reference is represented as a completed customer project.*
6. **Reviews = designed empty state:** Display review and video slots with explicit placeholder labels rather than fabricated quotes, customers or 5-star ratings.
7. **All demos remain `noindex`** until signed-off business facts and approved media replace placeholders.

## Route map

```text
/
  Hero → Service Explorer
  Construction Services (2 cards)
  Interior Work (4 cards)
  Project Gallery Preview (3 cards)
  How We Work → Customer Reviews → Project Estimate Form

/services
  Construction Services + Interior Work directory
/services/home-construction
/services/full-home-renovation
/services/kitchen-design
/services/bathroom-remodeling
/services/painting-and-whitewashing
/services/woodwork-and-carpentry

/projects
  Filter: All | Construction & Renovation | Interior Work
/projects/sample-home-construction
/projects/sample-full-home-renovation
/projects/sample-kitchen-design
/projects/sample-bathroom-remodeling
/projects/sample-woodwork
/projects/sample-wall-finishes
```

The 6 `/projects/sample-*` URLs are **demo examples** and should be replaced with content-specific slugs before launch. Remove obsolete sample links and add permanent redirects if a demo has ever been indexed or shared publicly.

## File ownership

| File or directory | Responsibility |
| --- | --- |
| `src/data/site.js` | Brand placeholder, WhatsApp number, navigation, hero, Phase 2 interactive story media, process text. |
| `src/data/catalog.js` | **Single source of truth** for public service slugs, service grouping, enquiry labels, sample portfolio pages and relationships. |
| `src/app/layout.js` | Shared Navigation, Footer, MobileContactBar and global styles on every route. |
| `src/app/page.js` | Concise homepage only. |
| `src/app/services/page.js` | Service directory with both categories. |
| `src/app/services/[slug]/page.js` | Template for the 6 specialist service pages. |
| `src/app/projects/page.js` | Portfolio filters and image card directory. |
| `src/app/projects/[slug]/page.js` | Template for the 6 sample case studies, with optional video. |
| `src/components/experiences/*` | Reused Phase 2 interactive service widgets, now only on their service pages. |
| `src/app/globals.css` | Shared type and spacing, brand colors, navigation, and components used across pages. |
| `src/app/home.css`, `src/app/services/services.css`, `src/app/projects/projects.css`, `src/app/privacy/privacy.css` | Page-specific styles. The Services and Projects stylesheets also cover their detail pages. |

## Client content replacement workflow (later)

1. **Brand and contact:** update `site.brand`, `site.descriptor`, hero messaging, approved contact numbers and email in `src/data/site.js`.
2. **Service scope:** update the `services` entries in `src/data/catalog.js` with verified offerings, descriptions and image alt text. Add/remove an entry to update the service directory, specialist page list and form selector in one place.
3. **Service galleries:** update `site.serviceStories` in `src/data/site.js` with owned photographs and approved product ranges. For bathroom comparisons, provide two matching-angle photographs and set `simulated: false`.
4. **Project portfolios:** replace the example project entries in `catalog.js` with genuinely completed jobs, photo series, scope descriptions, service relation and approved video paths. Use local optimized images where possible.
5. **Testimonials:** when the client's written or video testimonials arrive, replace `ReviewsPreview.jsx` with an approved review list. Do not invent names, ratings, project photos or endorsements.
6. **Process and trust:** replace `site.process` only after confirming company processes; add genuine warranty information, reviews and credentials when validated.
7. **Launch:** remove demo labels and `noindex` only after content, phone/WhatsApp, policies and route redirects are approved.

### Adding a project walkthrough video

Put an approved, optimized video into `public/videos/your-project.mp4` and a poster image in `public/images/your-project-poster.webp` (the directories can be created as needed). Set the correct `projects[].videoSrc` and `projects[].videoPoster`. Project pages render controls only if a video exists, with `preload="none"`; no fake play controls or autoplay are included.

## Enquiry behavior and future backend

- The **homepage form** is reached from every route via `/#contact-form`. A service CTA without a configured WhatsApp number goes to `/?service=<service-value>#contact-form`; the form reads the query and preselects the correct service.
- With a configured number, service-specific CTAs open WhatsApp with a prefilled message. Clicking does **not** imply the message was sent.
- The current form is explicitly a **demo**. It does not store submissions or track confirmed leads. A verified business WhatsApp number, consent/privacy handling, secure form persistence, spam protection and analytics remain future integration work.

## Mobile design rules

- **16px body text** and **16px form inputs** on all devices.
- Shared `--type-h1`, `--type-h2`, `--type-h3`, `--text-body` and spacing tokens. Headings use the same *hierarchy* throughout, not literally one size for all text.
- Mobile-first single-column service cards; grids expand to two or four columns when the viewport permits it.
- Touch-target size ≥ 44px for core navigation, filters and arrows; bottom enquiry bar remains visible below 800px.
- Real media is lazy-loaded below the fold, important hero image uses priority, and optional videos are non-autoplay.
- Avoid adding blanket parallax/3D libraries before verifying real-device performance.

## Verification in this environment

- **35** JS/JSX source files parsed with the TypeScript parser — no syntax errors.
- All local imports checked against the source tree — no missing imports.
- Both CSS files parsed successfully.
- A React server-rendered smoke-test harness (mocked Next image/link/navigation and SVG sample images) rendered **15 routes**.
- Link checks found **zero missing local paths or anchor destinations** across those pages, and every page has one H1.
- Headless Chromium checked **42 route × viewport combinations**, including 320, 360, 390, 768, 1024 and 1280px; **no horizontal page overflow, broken SVG test images or body-text scaling** was found.

**Important limitation:** These are a mock-media SSR and layout checks, not a production Next.js build or fully hydrated click-through test. npm registry access is unavailable here, and the original ZIP's Next SWC compiler is Windows-only. Run `npm install`, `npm run build` and verify service gallery and portfolio-filter interactions in the real Next.js runtime before deployment.
