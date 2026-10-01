/**
 * Conversion tracking. Calls go to GA4 when VITE_GA_ID is set and are
 * ignored otherwise, so components can track freely. Add Meta Pixel,
 * Google Ads conversions, etc. here without touching the components.
 */

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export type ConversionEvent =
  | 'call_click'
  | 'text_click'
  | 'email_click'
  | 'quote_start'
  | 'quote_submit'
  | 'quote_error';

export function initAnalytics() {
  const id = import.meta.env.VITE_GA_ID;
  if (!id || window.gtag) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
}

export function track(event: ConversionEvent, params: Record<string, unknown> = {}) {
  window.gtag?.('event', event, params);
  if (import.meta.env.DEV) console.debug('[track]', event, params);
}

export function trackPageView(path: string) {
  window.gtag?.('event', 'page_view', { page_path: path, page_title: document.title });
}
