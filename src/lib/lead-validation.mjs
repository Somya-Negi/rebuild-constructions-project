/** Pure validation shared by the anonymous lead API and the Node test suite. */
const limits = { name: 80, phone: 20, service: 100, area: 120, message: 1500 };
const trimText = value => typeof value === 'string' ? value.trim() : '';

export function validateLeadPayload(value, allowedServices) {
  const errors = {};
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { valid: false, errors: { form: 'Please complete the form.' } };
  }
  const input = Object.fromEntries(Object.keys(limits).map(key => [key, trimText(value[key])]));
  const required = ['name', 'phone', 'service', 'area'];
  for (const key of required) {
    if (!input[key]) errors[key] = 'This field is required.';
  }
  for (const [key, max] of Object.entries(limits)) {
    if (input[key].length > max) errors[key] = `Maximum ${max} characters.`;
  }
  if (input.name && input.name.length < 2) errors.name = 'Enter your full name.';
  const phoneDigits = input.phone.replace(/\D/g, '');
  if (input.phone && (!/^\+?[\d ()-]+$/.test(input.phone) || phoneDigits.length < 10 || phoneDigits.length > 15)) {
    errors.phone = 'Enter a valid phone number with country code if needed.';
  }
  if (input.service && !allowedServices.includes(input.service)) errors.service = 'Choose one of the listed services.';
  if (input.area && input.area.length < 2) errors.area = 'Enter the project location.';
  if (value.consent !== true) errors.consent = 'Consent to be contacted is required.';
  if (trimText(value.website)) errors.form = 'Unable to submit this request.'; // honeypot

  // Non-identifying attribution only. Never record full URLs, query strings or referrers.
  const rawPath = trimText(value.pagePath);
  const pagePath = rawPath.startsWith('/') && !rawPath.startsWith('//') ? rawPath.split(/[?#]/)[0].slice(0, 180) : '/';
  const attribution = key => trimText(value[key]).slice(0, 100).replace(/[<>\r\n]/g, '');
  const source = attribution('source').replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 40) || 'unspecified';

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    lead: {
      name: input.name,
      phone: input.phone,
      service: input.service,
      area: input.area,
      message: input.message,
      page_path: pagePath,
      source,
      utm_source: attribution('utmSource'),
      utm_medium: attribution('utmMedium'),
      utm_campaign: attribution('utmCampaign'),
    },
  };
}
