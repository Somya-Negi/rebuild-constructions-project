# Phase 5 — Lead Capture, WhatsApp and Conversion Tracking

**Scope:** This implementation extends the Phase 4 mobile-first Next.js site. It adds a functional Next.js lead API, client forms with status/success/error handling, a Supabase persistence adapter, an optional post-save notification webhook, source attribution, analytics hooks and demo-safe contact buttons.

The business name, real service evidence, company WhatsApp number, privacy policy and platform credentials still need client approval. **The delivered ZIP contains NO live credentials or connected third-party accounts.** No leads are stored in demo mode.

## 1. What's implemented

- A unified enquiry form on the homepage and inside the native estimate dialog. A service is preselected when the user comes from a service page.
- `/api/leads/status` returns `{ acceptingLeads: false }` until both Supabase environment variables are set. A demo page may preview the form but cannot submit personal data.
- `/api/leads` accepts only JSON POST and validates names, phone numbers, permitted service categories, project location, consent, and field lengths. An empty honeypot, approximate per-instance throttling, same-origin checks and request-size limits reduce trivial abuse.
- Successful submissions are confirmed **only after** Supabase returns a successful insert response. The API responds with a reference ID. It never pretends a lead was saved without storage confirmation.
- Optional notification webhooks run after the record is saved. They can be used to send an alert through an approved automation/CRM. A notification failure does not undo the database record; check the table if webhook delivery fails.
- The floating WhatsApp button, contact section and service-specific chat links use the public `NEXT_PUBLIC_WHATSAPP_NUMBER`. A blank number never leads to an invalid wa.me address.
- Only `generate_lead` (confirmed database save), `estimate_open`, and `whatsapp_click` are emitted to an existing `window.dataLayer` or `window.gtag`. **No analytics service is automatically connected**. Event details contain a service name and CTA placement only, no customer PII.
- `utm_source`, `utm_medium` and `utm_campaign` are captured and preserved within the browser session; no full URLs, query strings or customer identifiers are stored as attribution.
- `/privacy` is an **explicitly unfinished demo privacy information page**, not a final legal/privacy policy. The entire site remains `noindex`.

## 2. Setup for real lead storage

1. Create a Supabase project for this business, with account ownership and access approved by the client.
2. In the Supabase SQL editor, run `db/supabase_builder_leads.sql`. It creates `public.builder_leads` and enables RLS. Browser roles cannot access the table; server-side secret access is used by the API.
3. Copy `.env.example` to `.env.local` and set the server-only variables:

```dotenv
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SECRET_KEY=sb_secret_YOUR_SERVER_KEY
```

Use the new Supabase secret key (`sb_secret_...`), **not a browser publishable key**. Never commit real secrets or prefix them with `NEXT_PUBLIC_`. Legacy `SUPABASE_SERVICE_ROLE_KEY` JWTs remain supported for compatibility.

4. Restart the Next.js application. Visit `/api/leads/status`; it should return `{ "acceptingLeads": true }` when configuration is detected. This does **not** prove the database is working: submit a controlled test lead, confirm the result is saved, and verify the row in Supabase.
5. Assign staff responsibility for checking and responding to new leads. The Supabase table is the initial lead dashboard; there is no admin CRM interface inside the website.
6. If approved, set `LEAD_NOTIFICATION_WEBHOOK_URL` and optionally `LEAD_NOTIFICATION_WEBHOOK_TOKEN` to notify a trusted automation service. The webhook receives the lead's contact details, so only use a data processor authorized by the client. Without the webhook, records are still stored.

### SQL columns

`id`, `created_at`, `status`, `name`, `phone`, `service`, `area`, `message`, `source`, `page_path`, `utm_source`, `utm_medium`, `utm_campaign`, `consent_at`.

## 3. WhatsApp configuration

Put the business's **verified** full international phone number (digits only, no leading `+`) into:

```dotenv
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

Restart/rebuild the app. The floating button, contact option and service-specific direct chat links then open `wa.me` with the selected work category already mentioned. **WhatsApp will not send the message automatically**; the visitor must send it in WhatsApp. A chat click is tracked separately from a saved form lead.

## 4. Analytics integration

The client code emits these event names to whichever analytics runtime is already present:

| Event | When emitted | Parameters |
|---|---|---|
| `estimate_open` | Visitor opens an estimate dialog | `placement`, `service_type` |
| `generate_lead` | API confirms database insert | `placement`, `service_type` |
| `whatsapp_click` | Visitor chooses a direct WhatsApp link | `placement`, `service_type` |

To record events, configure a consent-appropriate Google Tag Manager or GA4 installation separately. Do not mark `whatsapp_click` as a confirmed submitted lead. Because these events are hooks, they do not load trackers or set cookies on their own. Add consent management as required by the business's launch jurisdiction.

## 5. Security, limitations and launch prerequisites

- Basic honeypot and in-memory rate limiting are **not sufficient bot protection on distributed/serverless production deployments**. Configure edge/WAF rate limiting and a verified CAPTCHA (for example, Cloudflare Turnstile) before running paid campaigns or high-volume public traffic.
- The backend is suitable for a Node.js Next.js server runtime; a static export (`output: 'export'`) will not support POST handlers.
- The estimate API is non-transactional with respect to the optional notification webhook: database storage is authoritative; failed notifications require external alerting/retry/monitoring.
- The frontend disables submission when database credentials are missing. It also handles server validation errors, delivery failures, pending submissions and confirmed success.
- Secrets must remain server-only. Restrict database access and set retention/deletion policies, staff authorization, incident response, and approved privacy notices before live collection.
- Connect the actual business number, approve and replace the privacy policy, and replace all demo identity/media/testimonial content before launch. Keep `robots: noindex` until final approval.
- Test keyboard interaction, mobile browser navigation, consent labeling, network errors, failed Supabase inserts, duplicate submissions, and event tracking on staging. This environment did not permit a complete Next.js build with a Linux SWC package or a live Supabase integration test.

## 6. Local checks

```bash
npm install
npm test
npm run build
npm run dev
```

Run a test POST once server storage is configured:

```bash
curl -X POST http://localhost:3000/api/leads \
  -H 'Content-Type: application/json' \
  -d '{"name":"Demo Test","phone":"+91 98765 43210","service":"Home construction","area":"Delhi","message":"Staging test enquiry","consent":true,"website":"","pagePath":"/","source":"test"}'
```

Expected: HTTP 201 and JSON including `"saved":true` with a reference, **only if** storage and schema work. Delete test records per the client's approved retention policy.

## 7. Next phase

After the actual client details and permissions are available: connect live numbers, approve the privacy notice, add WAF/CAPTCHA and an analytics consent setup, verify database and notifications, then run Phase 6 production-performance, SEO and launch QA.
