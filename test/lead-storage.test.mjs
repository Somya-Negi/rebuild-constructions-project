import test from 'node:test';
import assert from 'node:assert/strict';
import { leadStorageConfigured, persistLead, notifyNewLead } from '../src/lib/lead-storage.mjs';
const env = { SUPABASE_URL: 'https://example.supabase.co', SUPABASE_SECRET_KEY: 'sb_secret_TEST_SERVER_SECRET' };

test('storage fails closed without both server secrets', () => {
  assert.equal(leadStorageConfigured({}), false);
  assert.equal(leadStorageConfigured(env), true);
});
test('database success requires a 2xx API response', async () => {
  let called;
  await persistLead({ id: 'example', service:'Home Construction' }, env, async (url, options) => { called = {url,options}; return { ok:true, status:201 }; });
  assert.ok(called.url.endsWith('/rest/v1/builder_leads'));
  assert.equal(called.options.headers.apikey, 'sb_secret_TEST_SERVER_SECRET');
  assert.equal(called.options.headers.Authorization, undefined);
  await assert.rejects(() => persistLead({}, env, async () => ({ ok:false, status:401 })));
});
test('webhook optional and credentials only sent to configured endpoint', async () => {
  assert.deepEqual(await notifyNewLead({}, {}, async () => { throw Error('Should not run'); }), { configured:false, delivered:false });
  let called;
  const result = await notifyNewLead({ id:'123' }, { LEAD_NOTIFICATION_WEBHOOK_URL:'https://notify.example.test/hook', LEAD_NOTIFICATION_WEBHOOK_TOKEN:'secret' }, async (url, options) => {called={url,options};return {ok:true};});
  assert.equal(result.delivered, true);
  assert.equal(called.options.headers.Authorization, 'Bearer secret');
});

test('legacy service role key keeps bearer compatibility', async () => {
  let headers;
  await persistLead({}, { SUPABASE_URL:'https://example.supabase.co', SUPABASE_SERVICE_ROLE_KEY:'legacy-jwt' }, async (_, options) => { headers=options.headers; return {ok:true}; });
  assert.equal(headers.Authorization, 'Bearer legacy-jwt');
});

test('never sends secrets to non-HTTPS storage endpoints', async () => {
  let sent = false;
  await assert.rejects(() => persistLead({}, {SUPABASE_URL:'http://example.test',SUPABASE_SECRET_KEY:'sb_secret_test'}, async () => {sent = true; return {ok:true};}));
  assert.equal(sent, false);
});

test('failed notification reports error and does not affect a previously saved lead', async () => {
  await persistLead({id:'test'}, env, async () => ({ok:true, status:201}));
  await assert.rejects(() => notifyNewLead({id:'test'}, {LEAD_NOTIFICATION_WEBHOOK_URL:'https://notify.example.test/webhook'}, async () => ({ok:false,status:500})));
});

test('lead intake requires explicit launch flags and approved privacy policy', async () => {
  const { leadCollectionEnabled } = await import('../src/lib/lead-storage.mjs');
  assert.equal(leadCollectionEnabled(env), false);
  assert.equal(leadCollectionEnabled({ ...env, LEAD_COLLECTION_ENABLED: 'true' }), false);
  assert.equal(leadCollectionEnabled({ ...env, PRIVACY_POLICY_APPROVED: 'true' }), false);
  assert.equal(leadCollectionEnabled({ ...env, LEAD_COLLECTION_ENABLED: 'true', PRIVACY_POLICY_APPROVED: 'true' }), true);
});
