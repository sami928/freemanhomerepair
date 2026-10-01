import { CheckCircle2 } from 'lucide-react';
import { site } from '@/config/site';
import { THANK_YOU_NAME_KEY } from '@/components/QuoteForm';
import { ButtonLink } from '@/components/Button';
import { CallButton } from '@/components/ContactLinks';

/**
 * Post-submit page. A dedicated URL makes it easy to count conversions
 * in Google Ads / GA4 ("page_view of /thank-you").
 */
export function ThankYouPage() {
  let first = '';
  try {
    first = sessionStorage.getItem(THANK_YOU_NAME_KEY) ?? '';
  } catch {
    /* ignore */
  }
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x max-w-2xl text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-700">
          <CheckCircle2 className="h-9 w-9" aria-hidden />
        </div>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900">
          Thanks{first ? `, ${first}` : ''}! We’ve got your request.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Someone from our team will reach out {site.responseTime} with next steps and a quote. Need help sooner? Give
          us a call.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <CallButton size="lg" location="thank_you" />
          <ButtonLink to="/" variant="outline" size="lg">Back to home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
