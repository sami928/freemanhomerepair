import { ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { Link } from '@/components/Link';
import { PageHero, CtaBanner } from '@/components/Sections';
import { ButtonLink } from '@/components/Button';
import { CallButton } from '@/components/ContactLinks';

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Home repair & maintenance, all under one roof"
        intro="If it’s broken, worn out, or on your to-do list, there’s a good chance we can handle it. Here’s what we do most."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="/#quote" size="lg">Get a free quote</ButtonLink>
          <CallButton variant="ghost-light" size="lg" location="services_hero" />
        </div>
      </PageHero>
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, name, summary, jobs, icon: Icon }) => (
            <Link
              key={slug}
              to={`/services/${slug}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="text-lg font-semibold text-slate-900">{name}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{summary}</p>
              {jobs.length > 0 && (
                <ul className="mt-4 space-y-1 text-sm text-slate-700">
                  {jobs.slice(0, 3).map((j) => (
                    <li key={j}>• {j}</li>
                  ))}
                </ul>
              )}
              <span className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-brand-700 group-hover:text-brand-900">
                Learn more <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
