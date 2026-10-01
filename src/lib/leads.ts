/**
 * Lead submission. The quote form only knows about submitLead(); where the
 * lead actually goes is decided here by environment variables:
 *
 *   VITE_LEAD_ENDPOINT          → POST JSON to any endpoint (Formspree, Zapier, your API)
 *   VITE_SUPABASE_URL + _KEY    → insert into the `leads` table (supabase/migrations)
 *   neither (development)       → logged to the console
 *
 * Swapping to a CRM (Jobber, Housecall Pro, ServiceTitan) later means
 * adding one branch here.
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

const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const leadsConfigured = Boolean(endpoint || (supabaseUrl && supabaseKey));

export async function submitLead(lead: Lead): Promise<SubmitResult> {
  const payload = {
    ...lead,
    page: window.location.pathname,
    referrer: document.referrer || null,
    utm: utmParams(),
    submitted_at: new Date().toISOString(),
  };

  try {
    if (endpoint) {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return { ok: false, message: `Request failed (${res.status}).` };
      return { ok: true };
    }

    if (supabaseUrl && supabaseKey) {
      // Supabase REST API directly — no SDK needed for a single insert.
      const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          email: payload.email || null,
          zip: payload.zip,
          service: payload.service,
          details: payload.details || null,
          timing: payload.timing || null,
          contact_preference: payload.contactPreference,
          source: payload.source,
          page: payload.page,
          referrer: payload.referrer,
          utm: payload.utm,
        }),
      });
      if (!res.ok) return { ok: false, message: `Request failed (${res.status}).` };
      return { ok: true };
    }

    if (import.meta.env.DEV) {
      console.info('[lead] No lead destination configured — logging instead:', payload);
      await new Promise((r) => setTimeout(r, 600));
      return { ok: true };
    }

    return { ok: false, message: 'Online requests are temporarily unavailable.' };
  } catch {
    return { ok: false, message: 'Network error — please check your connection.' };
  }
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
