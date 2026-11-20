import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLeadPayload } from '../src/lib/lead-validation.mjs';
const services = ['Home construction','Kitchen design','Other'];
const good = { name:'Test Person', phone:'+91 98765 43210', service:'Home construction', area:'Delhi', message:'I need a quotation.', consent:true, website:'', pagePath:'/services/home-construction?utm_source=test', source:'hero', utmSource:'newsletter' };

test('valid lead has normalized values and safe attribution', () => {
  const result = validateLeadPayload(good, services);
  assert.equal(result.valid, true);
  assert.equal(result.lead.page_path, '/services/home-construction');
  assert.equal(result.lead.utm_source, 'newsletter');
});
test('rejects missing consent and unknown service', () => {
  const result = validateLeadPayload({ ...good, consent:false, service:'Fake service' }, services);
  assert.equal(result.valid, false);
  assert.ok(result.errors.consent);
  assert.ok(result.errors.service);
});
test('rejects malformed phone and honeypot', () => {
  const result = validateLeadPayload({ ...good, phone:'abc', website:'robot' }, services);
  assert.equal(result.valid, false);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.form);
});
test('rejects oversized message and protects URL attribution', () => {
  const result = validateLeadPayload({ ...good, message:'X'.repeat(1501), pagePath:'//outside', utmSource:'\n<script>' }, services);
  assert.equal(result.valid, false);
  assert.equal(result.lead.page_path, '/');
  assert.ok(result.errors.message);
  assert.equal(result.lead.utm_source, 'script');
});
