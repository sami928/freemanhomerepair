import { Star } from 'lucide-react';
import { site } from '@/config/site';
import { reviews } from '@/data/reviews';
import { team } from '@/data/team';
import { PageHero, CtaBanner } from '@/components/Sections';
import { mailHref } from '@/config/site';

/*
 * Pages for when the business grows. Each is routed only when its flag in
 * src/config/site.ts `features` is on. Split into their own files as they
 * get bigger.
 */

export function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Reviews" title="What Portland homeowners say" />
      <section className="py-16">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name + r.text.slice(0, 10)} className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="flex gap-0.5 text-accent-500" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" aria-hidden />)}
              </div>
              <blockquote className="mt-3 text-slate-700">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-slate-900">{r.name} <span className="font-normal text-slate-500">· {r.location}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export function TeamPage() {
  return (
    <>
      <PageHero eyebrow="Our team" title="The people behind the tools" intro="Every Freeman technician is licensed, insured and background-checked." />
      <section className="py-16">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.name} className="rounded-xl border border-slate-200 bg-white p-6">
              {m.photo ? (
                <img src={m.photo} alt={m.name} className="aspect-square w-full rounded-lg object-cover" />
              ) : (
                <div className="grid aspect-square w-full place-items-center rounded-lg bg-brand-50 font-display text-5xl font-bold text-brand-300">
                  {m.name.charAt(0)}
                </div>
              )}
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{m.name}</h2>
              <p className="text-sm font-medium text-accent-600">{m.role}</p>
              <p className="mt-2 text-sm text-slate-600">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Careers" title={`Join the ${site.name} team`} intro="We’re looking for skilled, reliable technicians who take pride in their work." />
      <section className="py-16">
        <div className="container-x max-w-3xl space-y-4 text-lg text-slate-700">
          <p>Steady work, fair pay, and a team that has your back. Experience in general repair, carpentry, drywall or painting preferred.</p>
          <p>
            Send your name, experience and a few photos of your work to{' '}
            <a href={mailHref} className="font-semibold text-brand-700 underline">{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
