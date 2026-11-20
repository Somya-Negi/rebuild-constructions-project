/** No credentials ever reach client components or browser responses. */
export function leadStorageConfigured(env = process.env) {
  return Boolean(env.SUPABASE_URL && (env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY));
}

/** Explicit launch switch: credentials alone must never activate collection. */
export function leadCollectionEnabled(env = process.env) {
  return env.LEAD_COLLECTION_ENABLED === 'true' && env.PRIVACY_POLICY_APPROVED === 'true' && leadStorageConfigured(env);
}

function ensureHttpsUrl(value) {
  const target = new URL(value);
  if (target.protocol !== 'https:' || target.username || target.password) {
    throw new Error('Integration URL must be HTTPS without embedded credentials');
  }
  return target;
}

/** Store the lead BEFORE any optional notification. A 2xx database response is required for success. */
export async function persistLead(lead, env = process.env, fetcher = fetch) {
  if (!leadStorageConfigured(env)) throw new Error('Lead storage is not configured');
  const base = ensureHttpsUrl(env.SUPABASE_URL);
  const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;
  const path = `${base.toString().replace(/\/$/, '')}/rest/v1/builder_leads`;
  const authHeaders = { apikey: key };
  // New sb_secret_* keys are opaque; they belong in apikey, not Authorization.
  // Legacy service_role JWTs still use the Bearer header for backward compatibility.
  if (!key.startsWith('sb_secret_')) authHeaders.Authorization = `Bearer ${key}`;
  const response = await fetcher(path, {
    method: 'POST',
    headers: {
      ...authHeaders,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(8000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Database rejected lead with status ${response.status}`);
}

/** Notification is best effort: failure never undoes a successfully saved lead. */
export async function notifyNewLead(lead, env = process.env, fetcher = fetch) {
  if (!env.LEAD_NOTIFICATION_WEBHOOK_URL) return { configured: false, delivered: false };
  const url = ensureHttpsUrl(env.LEAD_NOTIFICATION_WEBHOOK_URL);
  const headers = { 'Content-Type': 'application/json' };
  if (env.LEAD_NOTIFICATION_WEBHOOK_TOKEN) headers.Authorization = `Bearer ${env.LEAD_NOTIFICATION_WEBHOOK_TOKEN}`;
  const response = await fetcher(url.toString(), {
    method: 'POST', headers,
    body: JSON.stringify({ event: 'builder.lead.created', lead }),
    signal: AbortSignal.timeout(6000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Lead notification failed with status ${response.status}`);
  return { configured: true, delivered: true };
}
