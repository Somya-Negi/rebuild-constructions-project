# Builder Website — Phase 6

Mobile-first, premium construction and interior-work website built with Next.js 15, React 19, Tailwind CSS and JavaScript/JSX.

## Local development

```bash
npm ci
npm run dev
npm test
npm run build
```

Visit `http://localhost:3000`. Run on Node.js 20+ with compatible Next.js 15 native dependencies. If the build fails in a network-restricted environment, install dependencies in a network-enabled development environment and rerun tests and build there.

## Pages

- `/` — Hero, construction and interior services, process timeline, customer feedback and contact form.
- `/services` — service directory.
- `/construction` — new home construction service.
- `/interior-work` — interior service directory with detail pages for full-home interiors, kitchen design, bathroom remodeling, painting and whitewashing, and woodwork and carpentry.
- Existing `/services/[slug]` links redirect to their corresponding construction or interior work pages.
- `/privacy` — interim factual information; replace with an approved policy before activating public lead collection.

## Where to edit content

- `src/data/site.js` — business identity, hero, service imagery, process, client review records, media slots.
- `src/data/catalog.js` — service titles, descriptions, categories and media references.
- `public/images/`, `public/videos/` — client-approved media and posters.
- `.env.example` — copy to `.env.local` and configure only when authorized.

## Conversion safeguards

- Floating WhatsApp uses a verified full international number. Without one, it opens the contact dialog, never an invalid chat or a fabricated message notification.
- Enquiry form submits to `/api/leads`, validates inputs and saves only through Supabase. Real submissions require working credentials and explicit `LEAD_COLLECTION_ENABLED=true`, `PRIVACY_POLICY_APPROVED=true` flags. Configure and test `db/supabase_builder_leads.sql` before activation.
- Keep the final business-specific privacy page, legitimate consent text, legitimate contact information and appropriate production bot protections in place before going live. Never send server secrets to the browser.
- Search indexing is disabled until `SITE_URL` is a valid HTTPS URL and BOTH `CONTENT_APPROVED=true` and `SITE_INDEXING_ENABLED=true` are set.

## Important limitation

This is source-code readiness work, not a completed deployment. Original client photos/videos, verified case studies, real reviews, WhatsApp number, approved legal policy, lead database and live browser tests are outstanding. No performance benchmark or functional live database/WhatsApp test is implied.

See the accompanying `Phase_6_Performance_SEO_and_Launch_Guide.md` and `Client_Content_and_Media_Request.md` outside the ZIP for all checks and client handover requirements.
