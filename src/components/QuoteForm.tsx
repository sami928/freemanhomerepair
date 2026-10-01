import { useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Loader2, Lock, AlertCircle } from 'lucide-react';
import { services } from '@/data/services';
import { site } from '@/config/site';
import { submitLead, type Lead } from '@/lib/leads';
import { track } from '@/lib/analytics';
import { navigate } from '@/lib/router';
import { CallButton } from './ContactLinks';

/**
 * Two-step quote form. Step 1 asks the easy questions (what, where, when)
 * so visitors commit before being asked for contact details — short
 * multi-step forms convert noticeably better than one long form.
 */

const timings = ['As soon as possible', 'Within a week', 'Within a month', 'Just planning'];
const contactPrefs: { value: Lead['contactPreference']; label: string }[] = [
  { value: 'call', label: 'Call' },
  { value: 'text', label: 'Text' },
  { value: 'email', label: 'Email' },
];

type Props = {
  /** Where the form lives, stored with the lead. */
  source: string;
  /** Pre-select a service (e.g. on a service page). */
  defaultService?: string;
  title?: string;
  subtitle?: string;
};

type Errors = Partial<Record<keyof Lead, string>>;

export const THANK_YOU_NAME_KEY = 'fhs_lead_name';

export function QuoteForm({
  source,
  defaultService = '',
  title = 'Get your free quote',
  subtitle = `We reply ${site.responseTime}.`,
}: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<Lead>({
    name: '',
    phone: '',
    email: '',
    zip: '',
    service: defaultService,
    details: '',
    timing: '',
    contactPreference: 'call',
    source,
  });
  const started = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);

  const update = <K extends keyof Lead>(key: K, value: Lead[K]) => {
    if (!started.current) {
      started.current = true;
      track('quote_start', { source });
    }
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep1 = (): Errors => {
    const e: Errors = {};
    if (!form.service) e.service = 'Pick the closest match.';
    if (!/^\d{5}$/.test(form.zip.trim())) e.zip = 'Enter a 5-digit ZIP code.';
    return e;
  };

  const validateStep2 = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a 10-digit phone number.';
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'That email doesn’t look right.';
    if (form.contactPreference === 'email' && !form.email.trim()) e.email = 'Add an email so we can reply.';
    return e;
  };

  const next = () => {
    const e = validateStep1();
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(2);
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (step === 1) return next();

    const e = validateStep2();
    setErrors(e);
    if (Object.keys(e).length) return;

    // Bots fill hidden fields; humans can't see this one. Pretend success.
    if (honeypot.current?.value) return navigate('/thank-you');

    setSubmitting(true);
    setFormError('');
    const result = await submitLead({
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      zip: form.zip.trim(),
      details: form.details.trim(),
    });
    setSubmitting(false);

    if (!result.ok) {
      track('quote_error', { source });
      setFormError(result.message);
      return;
    }

    track('quote_submit', { source, service: form.service });
    try {
      sessionStorage.setItem(THANK_YOU_NAME_KEY, form.name.trim().split(' ')[0]);
    } catch {
      /* ignore */
    }
    navigate('/thank-you');
  };

  const input =
    'w-full rounded-lg border bg-white px-3.5 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 sm:text-sm';
  const inputState = (key: keyof Lead) =>
    errors[key] ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100';
  const label = 'mb-1.5 block text-sm font-semibold text-slate-800';

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
        <span className="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
          Step {step} of 2
        </span>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100" aria-hidden>
        <div className={`h-full rounded-full bg-accent-500 transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
      </div>

      {/* Honeypot */}
      <input ref={honeypot} type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {step === 1 ? (
        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="qf-service" className={label}>
              What do you need help with?
            </label>
            <select
              id="qf-service"
              value={form.service}
              onChange={(e) => update('service', e.target.value)}
              className={`${input} ${inputState('service')}`}
              aria-invalid={!!errors.service}
            >
              <option value="">Choose a service…</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
            <FieldError msg={errors.service} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="qf-zip" className={label}>
                ZIP code
              </label>
              <input
                id="qf-zip"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="97214"
                value={form.zip}
                onChange={(e) => update('zip', e.target.value.replace(/\D/g, ''))}
                className={`${input} ${inputState('zip')}`}
                aria-invalid={!!errors.zip}
              />
              <FieldError msg={errors.zip} />
            </div>
            <div>
              <label htmlFor="qf-timing" className={label}>
                When?
              </label>
              <select
                id="qf-timing"
                value={form.timing}
                onChange={(e) => update('timing', e.target.value)}
                className={`${input} ${inputState('timing')}`}
              >
                <option value="">Flexible</option>
                {timings.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600">
            Next: your details <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="qf-name" className={label}>
                Name
              </label>
              <input
                id="qf-name"
                autoComplete="name"
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className={`${input} ${inputState('name')}`}
                aria-invalid={!!errors.name}
                autoFocus
              />
              <FieldError msg={errors.name} />
            </div>
            <div>
              <label htmlFor="qf-phone" className={label}>
                Phone
              </label>
              <input
                id="qf-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(503) 555-0100"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                className={`${input} ${inputState('phone')}`}
                aria-invalid={!!errors.phone}
              />
              <FieldError msg={errors.phone} />
            </div>
          </div>

          <div>
            <label htmlFor="qf-email" className={label}>
              Email <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <input
              id="qf-email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={`${input} ${inputState('email')}`}
              aria-invalid={!!errors.email}
            />
            <FieldError msg={errors.email} />
          </div>

          <div>
            <label htmlFor="qf-details" className={label}>
              Tell us about the job <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <textarea
              id="qf-details"
              rows={3}
              placeholder="e.g. Bathroom fan is noisy, two doors sticking, patch a hole in the hallway."
              value={form.details}
              onChange={(e) => update('details', e.target.value)}
              className={`${input} ${inputState('details')} resize-none`}
            />
          </div>

          <fieldset>
            <legend className={label}>Best way to reach you</legend>
            <div className="grid grid-cols-3 gap-2">
              {contactPrefs.map((p) => (
                <label
                  key={p.value}
                  className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors ${
                    form.contactPreference === p.value
                      ? 'border-brand-600 bg-brand-50 text-brand-800'
                      : 'border-slate-300 text-slate-700 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="contactPreference"
                    value={p.value}
                    checked={form.contactPreference === p.value}
                    onChange={() => update('contactPreference', p.value)}
                    className="sr-only"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </fieldset>

          {formError && (
            <div role="alert" className="flex gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-800">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <div>
                {formError} Please call us at{' '}
                <a href={`tel:${site.phone.tel}`} className="font-semibold underline">
                  {site.phone.display}
                </a>{' '}
                instead.
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center justify-center rounded-lg border border-slate-300 px-4 text-slate-700 hover:bg-slate-50"
              aria-label="Back to step 1"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…
                </>
              ) : (
                'Get my free quote'
              )}
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-500">
        <Lock className="h-3.5 w-3.5" aria-hidden /> No spam, no obligation. We never share your info.
      </p>
      <div className="mt-4 border-t border-slate-100 pt-4 text-center text-sm text-slate-600">
        Prefer to talk?{' '}
        <CallButton variant="outline" size="md" location={`form_${source}`} className="ml-1 !px-3 !py-1.5" />
      </div>
    </form>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-sm text-red-600">{msg}</p>;
}
