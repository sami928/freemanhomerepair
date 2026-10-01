import { Phone, Mail, MessageSquare, Clock } from 'lucide-react';
import { site, telHref, smsHref, mailHref } from '@/config/site';
import { track, type ConversionEvent } from '@/lib/analytics';
import { QuoteForm } from '@/components/QuoteForm';
import { PageHero } from '@/components/Sections';

const methods: { icon: typeof Phone; label: string; value: string; href: string; event: ConversionEvent }[] = [
  { icon: Phone, label: 'Call', value: site.phone.display, href: telHref, event: 'call_click' },
  { icon: MessageSquare, label: 'Text (photos welcome)', value: site.phone.display, href: smsHref, event: 'text_click' },
  { icon: Mail, label: 'Email', value: site.email, href: mailHref, event: 'email_click' },
];

export function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s get your project on the calendar" intro={`Call, text, or send a request — we reply ${site.responseTime}.`} />
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {methods.map(({ icon: Icon, label, value, href, event }) => (
              <a
                key={label}
                href={href}
                onClick={() => track(event, { location: 'contact_page' })}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-md"
              >
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="font-semibold text-slate-900">{value}</p>
                </div>
              </a>
            ))}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="flex items-center gap-2 font-semibold text-slate-900">
                <Clock className="h-5 w-5 text-brand-700" aria-hidden /> Hours
              </p>
              <dl className="mt-3 space-y-1.5 text-slate-700">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between">
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div id="quote" className="scroll-mt-28">
            <QuoteForm source="contact_page" title="Request a free quote" />
          </div>
        </div>
      </section>
    </>
  );
}
