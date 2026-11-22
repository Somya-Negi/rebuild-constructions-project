'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Send } from 'lucide-react'
import { services } from '@/data/catalog'
import { getWhatsAppHref } from '@/lib/contact'
import { trackConversion } from '@/lib/conversions'
import { getCampaignAttribution } from '@/lib/attribution'
import TrackedWhatsAppLink from '@/components/TrackedWhatsAppLink'

const allowedServices = [...services.map(item => item.inquiryLabel), 'Other']

/** Phase 5: saved enquiries and direct WhatsApp are distinct, honest conversion paths. */
export default function EnquiryForm ({
  initialService = '',
  variant = 'page',
  source = 'contact'
}) {
  const isModal = variant === 'modal'
  const [selectedService, setSelectedService] = useState(
    allowedServices.includes(initialService) ? initialService : ''
  )
  const [availability, setAvailability] = useState('checking')
  const [state, setState] = useState('idle')
  const [notice, setNotice] = useState('')
  const [reference, setReference] = useState('')
  const waHref = getWhatsAppHref({ service: selectedService, reference })

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('service')
    if (allowedServices.includes(initialService))
      setSelectedService(initialService)
    else if (allowedServices.includes(fromUrl)) setSelectedService(fromUrl)
  }, [initialService])

  useEffect(() => {
    getCampaignAttribution()
  }, [])

  useEffect(() => {
    let active = true
    fetch('/api/leads/status', { cache: 'no-store' })
      .then(response =>
        response.ok ? response.json() : { acceptingLeads: false }
      )
      .then(data => {
        if (active)
          setAvailability(data.acceptingLeads ? 'connected' : 'unavailable')
      })
      .catch(() => {
        if (active) setAvailability('unavailable')
      })
    return () => {
      active = false
    }
  }, [])

  async function handleSubmit (event) {
    event.preventDefault()
    if (state === 'submitting') return
    if (availability !== 'connected') {
      setNotice(
        'Online estimate requests are currently unavailable. Nothing has been submitted or saved.'
      )
      return
    }
    setState('submitting')
    setNotice('')
    const data = new FormData(event.currentTarget)
    const campaign = getCampaignAttribution()
    const payload = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      service: String(data.get('service') || '').trim(),
      area: String(data.get('area') || '').trim(),
      message: String(data.get('message') || '').trim(),
      consent: data.get('consent') === 'on',
      website: String(data.get('website') || ''),
      pagePath: window.location.pathname,
      source,
      ...campaign
    }
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-store'
      })
      const result = await response.json()
      if (!response.ok || !result.saved) {
        setNotice(
          result.message || 'We could not save the request. Please try again.'
        )
        setState('error')
        return
      }
      setReference(result.reference || '')
      setState('success')
      trackConversion('generate_lead', { source, service: selectedService })
    } catch {
      setNotice(
        'Connection problem. Your request was not confirmed as saved. Please retry or use WhatsApp.'
      )
      setState('error')
    }
  }

  if (state === 'success')
    return (
      <div
        className={`enquiry-form enquiry-confirmation ${
          isModal ? 'enquiry-form-modal' : ''
        }`}
        role='status'
      >
        <span className='overline'>REQUEST RECEIVED</span>
        <h3>Thank you. We received your enquiry.</h3>
        <p>
          Your details have been saved for follow-up. Please keep the reference
          number for your records.
        </p>
        {reference && (
          <p className='enquiry-reference'>
            Reference: <strong>{reference.slice(0, 8).toUpperCase()}</strong>
          </p>
        )}
        {waHref && (
          <TrackedWhatsAppLink
            href={waHref}
            source='form_success'
            service={selectedService}
            className='enquiry-whatsapp-followup'
          >
            Continue on WhatsApp <ArrowUpRight size={17} aria-hidden='true' />
          </TrackedWhatsAppLink>
        )}
        <button
          type='button'
          className='enquiry-reset'
          onClick={() => {
            setState('idle')
            setReference('')
            setNotice('')
          }}
        >
          Send another enquiry
        </button>
      </div>
    )

  return (
    <form
      className={`enquiry-form ${
        isModal ? 'enquiry-form-modal' : ''
      }`}
      onSubmit={handleSubmit}
    >
      <div className='form-heading'>
        <h3>Tell Us About Your Project</h3>
        <p>
          Share a few details so the team can discuss your requirements and next
          steps.
        </p>
      </div>
      {availability === 'unavailable' && (
        <p className='enquiry-unavailable-banner' role='status'>
          Online estimate requests are currently unavailable. Please use an
          available contact option.
        </p>
      )}
      <div className='form-fields'>
        <label>
          <span className='field-title'>
            Full name <span className='field-required'>*</span>
          </span>
          <input
            name='name'
            type='text'
            autoComplete='name'
            required
            placeholder='Your name'
            maxLength={80}
            disabled={state === 'submitting'}
          />
        </label>
        <label>
          <span className='field-title'>
            Phone number <span className='field-required'>*</span>
          </span>
          <input
            name='phone'
            type='tel'
            inputMode='tel'
            autoComplete='tel'
            required
            pattern='[+0-9 ()-]{10,20}'
            maxLength={20}
            title='Enter a valid phone number'
            placeholder='Phone number'
            disabled={state === 'submitting'}
          />
        </label>
        {isModal ? (
          <>
            <input type='hidden' name='service' value={selectedService || 'Other'} />
            <input type='hidden' name='area' value='Not specified' />
            <input type='hidden' name='message' value='' />
          </>
        ) : (
          <>
            <label>
              <span className='field-title'>
                Service <span className='field-required'>*</span>
              </span>
              <select
                name='service'
                required
                value={selectedService}
                onChange={event => setSelectedService(event.target.value)}
                disabled={state === 'submitting'}
              >
                <option value='' disabled>
                  Select a service
                </option>
                {services.map(item => (
                  <option value={item.inquiryLabel} key={item.slug}>
                    {item.title}
                  </option>
                ))}
                <option value='Other'>Other work</option>
              </select>
            </label>
            <label>
              <span className='field-title'>
                Project location <span className='field-required'>*</span>
              </span>
              <input
                name='area'
                type='text'
                required
                maxLength={120}
                placeholder='City / area of the project'
                disabled={state === 'submitting'}
              />
            </label>
            <label className='field-wide'>
              <span className='field-title'>Project details (optional)</span>
              <textarea
                name='message'
                rows={3}
                maxLength={1500}
                placeholder='What would you like to build or renovate?'
                disabled={state === 'submitting'}
              />
            </label>
          </>
        )}
        <div className='enquiry-honeypot' aria-hidden='true'>
          <label>
            Leave this blank
            <input
              type='text'
              name='website'
              tabIndex={-1}
              autoComplete='off'
            />
          </label>
        </div>
        <label className='field-wide enquiry-consent'>
          <input
            type='checkbox'
            name='consent'
            required
            disabled={state === 'submitting'}
          />
          <span>
            I agree to be contacted about this project enquiry. Read our{' '}
            <Link href='/privacy' target='_blank' rel='noopener noreferrer'>
              privacy information
            </Link>
            . <span className='field-required'>*</span>
          </span>
        </label>
      </div>
      <button
        type='submit'
        className='btn btn-dark btn-wide'
        disabled={state === 'submitting' || availability !== 'connected'}
        aria-disabled={availability !== 'connected'}
      >
        <Send size={17} aria-hidden='true' />{' '}
        {state === 'submitting'
          ? 'Sending your request…'
          : availability === 'connected'
          ? isModal
            ? 'Request a Callback'
            : 'Send Estimate Request'
          : availability === 'checking'
          ? 'Checking availability…'
          : 'Online Requests Unavailable'}
      </button>
      <p className='form-disclaimer'>
        We will confirm your request once it has been received successfully.
      </p>
      {waHref && (
        <TrackedWhatsAppLink
          href={waHref}
          source='form_alternative'
          service={selectedService}
          className='enquiry-whatsapp-alternative'
        >
          Prefer WhatsApp? Start a chat{' '}
          <ArrowUpRight size={15} aria-hidden='true' />
        </TrackedWhatsAppLink>
      )}
      {notice && (
        <p className='form-notice' role='alert'>
          {notice}
        </p>
      )}
    </form>
  )
}
