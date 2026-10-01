import { CheckCircle2 } from 'lucide-react';
import type { Service } from '@/data/services';
import { services } from '@/data/services';
import { QuoteForm } from '@/components/QuoteForm';
import { Link } from '@/components/Link';
import { PageHero, TrustBar, CtaBanner } from '@/components/Sections';
import { CallButton } from '@/components/ContactLinks';

/** Landing page for one service — every page carries its own quote form. */
export function ServicePage({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug && s.slug !== 'other').slice(0, 6);
  return (
    <>
      <PageHero eyebrow="Portland handyman services" title={service.name} intro={service.description}>
        <div className="mt-8">
          <CallButton size="lg" location={`service_${service.slug}`} label="Call for a quick quote" />
        </div>
      </PageHero>
      <TrustBar />
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            {service.jobs.length > 0 && (
              <>
                <h2 className="font-display text-2xl font-bold text-slate-900">Common {service.name.toLowerCase()} jobs</h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.jobs.map((j) => (
                    <li key={j} className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-white p-4 text-slate-800">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                      {j}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-8 text-slate-600">
              Don’t see your exact job? Describe it in the form — if it’s home repair or maintenance, we probably do it.
            </p>

            <h2 className="mt-12 font-display text-xl font-bold text-slate-900">Other services</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {others.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-400 hover:text-brand-800">
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <div id="quote" className="scroll-mt-28 lg:sticky lg:top-32 lg:self-start">
            <QuoteForm key={service.slug} source={`service_${service.slug}`} defaultService={service.slug} title={`Get a ${service.name.toLowerCase()} quote`} />
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
