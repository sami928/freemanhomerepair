import { site } from '@/config/site';
import { findService } from '@/data/services';

/**
 * Lead submission. The quote form only knows about submitLead(); where the
 * lead actually goes is decided here:
 *
 *   VITE_LEAD_ENDPOINT          → POST JSON to any endpoint (Formspree, Zapier, your API)
 *   otherwise                   → emailed to site.leadEmail (via FormSubmit), and also
 *                                 inserted into the Supabase `leads` table when
 *                                 VITE_SUPABASE_URL + _KEY are set
 *
 * The submission counts as sent if either the email or the Supabase insert
 * succeeds, so one of them being down never loses a lead.
 *
 * Swapping to a CRM (Jobber, Housecall Pro, ServiceTitan) later means
 * adding one destination here.
 */

export type Lead = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  service: string;
  details: string;
  timing: string;
  contactPreference: 'call' | 'text' | 'email';
  source: string;
};

export type SubmitResult = { ok: true } | { ok: false; message: string };

type Payload = Lead & {
  page: string;
  referrer: string | null;
  utm: Record<string, string> | null;
  submitted_at: string;
};

const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const leadsConfigured = Boolean(endpoint || site.leadEmail || (supabaseUrl && supabaseKey));

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  const payload: Payload = {
    ...lead,
    page: window.location.pathname,
    referrer: document.referrer || null,
    utm: utmParams(),
    submitted_at: new Date().toISOString(),
  };

  if (endpoint) return send(() => postJson(endpoint, payload));

  const destinations: Promise<boolean>[] = [];
  if (site.leadEmail) destinations.push(emailLead(payload));
  if (supabaseUrl && supabaseKey) destinations.push(insertSupabase(payload));

  if (!destinations.length) {
    if (import.meta.env.DEV) {
      console.info('[lead] No lead destination configured — logging instead:', payload);
      await new Promise((r) => setTimeout(r, 600));
      return { ok: true };
    }
    return { ok: false, message: 'Online requests are temporarily unavailable.' };
  }

  const results = await Promise.allSettled(destinations);
  if (results.some((r) => r.status === 'fulfilled' && r.value)) return { ok: true };
  if (results.every((r) => r.status === 'rejected')) {
    return { ok: false, message: 'Network error — please check your connection.' };
  }
  return { ok: false, message: 'We couldn’t send your request.' };
}

async function send(request: () => Promise<boolean>): Promise<SubmitResult> {
  try {
    return (await request()) ? { ok: true } : { ok: false, message: 'Request failed.' };
  } catch {
    return { ok: false, message: 'Network error — please check your connection.' };
  }
}

async function postJson(url: string, body: unknown): Promise<boolean> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  return res.ok;
}

/**
 * Emails the lead via FormSubmit (formsubmit.co) — no account or API key.
 * The first submission sends an "Activate Form" email to site.leadEmail;
 * nothing is delivered until that link is clicked once. Reply-To is the
 * customer's email, so a lead can be answered straight from the inbox.
 */
async function emailLead(p: Payload): Promise<boolean> {
  const service = findService(p.service)?.name ?? p.service;
  const contact = { call: 'Call', text: 'Text', email: 'Email' }[p.contactPreference];
  const res = await fetch(`https://formsubmit.co/ajax/${site.leadEmail}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: `New quote request: ${service} — ${p.name} (${p.zip})`,
      _template: 'table',
      _captcha: 'false',
      ...(p.email ? { _replyto: p.email } : {}),
      Name: p.name,
      Phone: p.phone,
      Email: p.email || '—',
      Prefers: contact,
      Service: service,
      ZIP: p.zip,
      Timing: p.timing || '—',
      Details: p.details || '—',
      'Submitted from': `${site.url}${p.page}`,
      'Lead source': p.source,
      Campaign: p.utm ? Object.entries(p.utm).map(([k, v]) => `${k}=${v}`).join(', ') : '—',
    }),
  });
  if (!res.ok) return false;
  const data: { success?: boolean | string } = await res.json().catch(() => ({}));
  return data.success === true || data.success === 'true';
}

// Supabase REST API directly — no SDK needed for a single insert.
async function insertSupabase(p: Payload): Promise<boolean> {
  const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey!,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: p.name,
      phone: p.phone,
      email: p.email || null,
      zip: p.zip,
      service: p.service,
      details: p.details || null,
      timing: p.timing || null,
      contact_preference: p.contactPreference,
      source: p.source,
      page: p.page,
      referrer: p.referrer,
      utm: p.utm,
    }),
  });
  return res.ok;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
const UTM_STORAGE = 'fhs_utm';

/** Remember ad/campaign params from the landing URL so they survive navigation. */
export function captureUtm() {
  const params = new URLSearchParams(window.location.search);
  const found = Object.fromEntries(UTM_KEYS.filter((k) => params.get(k)).map((k) => [k, params.get(k)!]));
  if (Object.keys(found).length) {
    try {
      sessionStorage.setItem(UTM_STORAGE, JSON.stringify(found));
    } catch {
      /* storage unavailable — fine */
    }
  }
}

function utmParams(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
