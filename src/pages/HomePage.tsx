import { CheckCircle2, ClipboardList, CalendarCheck, Wrench, MapPin, Star, ArrowRight } from 'lucide-react';
import { site, features } from '@/config/site';
import { featuredServices } from '@/data/services';
import { areas } from '@/data/areas';
import { faqs } from '@/data/faqs';
import { reviews } from '@/data/reviews';
import { QuoteForm } from '@/components/QuoteForm';
import { CallButton, TextButton } from '@/components/ContactLinks';
import { Link } from '@/components/Link';
import { ButtonLink } from '@/components/Button';
import { SectionHeading, TrustBar, FaqList, CtaBanner } from '@/components/Sections';

const heroPoints = ['Free, upfront quotes', 'Licensed & insured in Oregon', 'No job too small'];

const steps = [
  { icon: ClipboardList, title: 'Tell us what needs fixing', text: 'Fill out the quick form, call or text. Photos help us quote faster.' },
  { icon: CalendarCheck, title: 'Get a clear quote & time', text: `We reply ${site.responseTime} with an upfront price and an arrival window.` },
  { icon: Wrench, title: 'We fix it right', text: 'A tidy, respectful pro shows up on time, does the work, and cleans up after.' },
];

export function HomePage() {
  return (
    <>
      {/* HERO — headline + quote form above the fold */}
      <section className="relative overflow-hidden bg-brand-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 22px), repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 22px)',
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-600/40 blur-3xl" aria-hidden />

        <div className="container-x relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-24">
          <div className="text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-100 ring-1 ring-white/15">
              <MapPin className="h-4 w-4 text-accent-300" aria-hidden />
              Serving Portland &amp; the surrounding metro
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Home repairs done right, <span className="text-accent-400">the first time.</span>
            </h1>
            <p className="mt-5 hidden max-w-xl text-lg leading-relaxed text-brand-100 sm:block sm:text-xl">
              From leaky faucets to sticky doors to the whole honey-do list — Freeman Home Services handles the
              repairs and maintenance your Portland home needs, on time and at a fair price.
            </p>
            <ul className="mt-6 space-y-2.5">
              {heroPoints.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-base font-medium">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-accent-400" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton size="lg" location="hero" label={`Call ${site.phone.display}`} />
              <TextButton variant="ghost-light" size="lg" location="hero" label="Text us a photo" />
            </div>
          </div>

          <div id="quote" className="scroll-mt-28">
            <QuoteForm source="home_hero" />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* SERVICES */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we do"
              title="One call for all your home repairs"
              intro="Skip juggling five different contractors. Our team handles the everyday repair and maintenance work that keeps your home in shape."
            />
            <ButtonLink to="/services" variant="outline">
              View all services <ArrowRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map(({ slug, name, summary, icon: Icon }) => (
              <Link
                key={slug}
                to={`/services/${slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg"
              >
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-700 group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Fixed in three simple steps" center />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent-50 text-accent-600 ring-1 ring-accent-100">
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <p className="mt-4 text-sm font-bold uppercase tracking-wider text-accent-600">Step {i + 1}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 text-center">
            <ButtonLink to="/#quote" size="lg">
              Start my free quote
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why Freeman"
              title="The handyman you’ll actually want to call back"
              intro="We started Freeman Home Services because getting small jobs done shouldn’t be a hassle. Show up when we say, communicate clearly, charge fairly, and do work we’re proud of."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Clear arrival windows & updates',
                'Upfront, written quotes',
                'Clean, respectful crews',
                'Work backed by our guarantee',
                'Landlord & property-manager friendly',
                'Local to Portland — not a franchise',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-slate-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/about" className="font-semibold text-brand-700 hover:text-brand-900">
                More about us →
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-brand-900 p-8 text-white shadow-xl sm:p-10">
            <p className="font-display text-2xl font-bold leading-snug">“No job too small” isn’t a slogan — it’s how we work.</p>
            <p className="mt-4 text-brand-100">
              Got a list of little things you’ve been putting off? Send it over. We’ll bundle it into one visit, give
              you a single price, and knock it out.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/#quote">Send us your list</ButtonLink>
              <CallButton variant="ghost-light" location="why_us" label="Call now" />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS (feature-flagged until real reviews exist) */}
      {features.reviews && reviews.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="container-x">
            <SectionHeading eyebrow="Reviews" title="What our neighbors say" center />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {reviews.slice(0, 3).map((r) => (
                <figure key={r.name + r.text.slice(0, 10)} className="rounded-xl border border-slate-200 bg-white p-6">
                  <div className="flex gap-0.5 text-accent-500" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-slate-700">“{r.text}”</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-slate-900">
                    {r.name} <span className="font-normal text-slate-500">· {r.location}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICE AREA */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Service area"
            title="Proudly serving the Portland metro"
            intro="Based in Portland and serving homeowners, landlords and property managers across the metro."
            center
          />
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {areas.map((a) => (
              <li key={a.slug} className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                <MapPin className="h-4 w-4 text-brand-600" aria-hidden />
                {a.name}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-sm text-slate-600">
            Don’t see your neighborhood?{' '}
            <Link to="/#quote" className="font-semibold text-brand-700 hover:text-brand-900">
              Ask us
            </Link>{' '}
            — we likely cover it.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading eyebrow="FAQ" title="Questions? We’ve got answers." intro="Still unsure about something? Give us a call — we’re happy to help." />
          <FaqList items={faqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
