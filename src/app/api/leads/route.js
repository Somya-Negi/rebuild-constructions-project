import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { services } from '@/data/catalog';
import { validateLeadPayload } from '@/lib/lead-validation.mjs';
import { leadCollectionEnabled, persistLead, notifyNewLead } from '@/lib/lead-storage.mjs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const MAX_BODY = 10000;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map(); // Best-effort instance throttle; use provider-level protection in production.
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const answer = (payload, status) => NextResponse.json(payload, { status, headers });

function limited(request) {
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (!ip) return false;
  const now = Date.now();
  if (attempts.size > 1200) {
    for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
  }
  const record = attempts.get(ip);
  const updated = record && record.until > now ? { count: record.count + 1, until: record.until } : { count: 1, until: now + WINDOW_MS };
  attempts.set(ip, updated);
  return updated.count > MAX_ATTEMPTS;
}

export async function POST(request) {
  if (!leadCollectionEnabled()) return answer({ ok: false, saved: false, code: 'not_available', message: 'Online estimate requests are currently unavailable. Nothing was saved or sent.' }, 503);
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin) {
    try {
      if (!host || new URL(origin).host !== host) return answer({ ok: false, code: 'origin_rejected', message: 'Please use the form on this website.' }, 403);
    } catch { return answer({ ok: false, code: 'origin_rejected', message: 'Please use the form on this website.' }, 403); }
  }
  if (limited(request)) return answer({ ok: false, code: 'rate_limited', message: 'Too many requests. Please try again later.' }, 429);
  if (!request.headers.get('content-type')?.includes('application/json')) return answer({ ok: false, message: 'Invalid request format.' }, 415);
  if (Number(request.headers.get('content-length')) > MAX_BODY) return answer({ ok: false, message: 'Request is too large.' }, 413);
  let payload;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY) return answer({ ok: false, message: 'Request is too large.' }, 413);
    payload = JSON.parse(body);
  } catch { return answer({ ok: false, message: 'Invalid request format.' }, 400); }

  const { valid, errors, lead } = validateLeadPayload(payload, [...services.map(item => item.inquiryLabel), 'Other']);
  if (!valid) return answer({ ok: false, code: 'validation', message: 'Please review the highlighted information.', fieldErrors: errors }, 422);

  const record = { ...lead, id: randomUUID(), consent_at: new Date().toISOString(), status: 'new' };
  try {
    await persistLead(record);
  } catch (error) {
    // Never log customer payload, phone, database credentials or provider response bodies.
    console.error('[leads] Storage failure', error instanceof Error ? error.name : 'unknown');
    return answer({ ok: false, saved: false, code: 'delivery_failed', message: 'We could not save your request. Please try again or use WhatsApp.' }, 502);
  }

  // A notification failure does not change the saved state; the lead remains in the database.
  try { await notifyNewLead(record); }
  catch (error) { console.error('[leads] Notification unavailable', error instanceof Error ? error.name : 'unknown'); }

  return answer({ ok: true, saved: true, reference: record.id, message: 'Your request was saved successfully.' }, 201);
}
