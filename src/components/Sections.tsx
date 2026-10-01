import { useState, type ReactNode } from 'react';
import { ChevronDown, ShieldCheck, Clock, BadgeCheck, ThumbsUp } from 'lucide-react';
import type { Faq } from '@/data/faqs';
import { site } from '@/config/site';
import { ButtonLink } from './Button';
import { CallButton } from './ContactLinks';

export function SectionHeading({ eyebrow, title, intro, center = false }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean }) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-wider text-accent-600">{eyebrow}</p>}
      <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>}
    </div>
  );
}

const trustPoints = [
  { icon: ShieldCheck, title: 'Licensed & insured', text: `Oregon CCB #${site.ccbNumber}` },
  { icon: Clock, title: 'On time, every time', text: 'Arrival windows we actually keep' },
  { icon: BadgeCheck, title: 'Upfront pricing', text: 'Know the price before we start' },
  { icon: ThumbsUp, title: 'Satisfaction guaranteed', text: 'Not right? We come back and fix it' },
];

export function TrustBar() {
  return (
    <div className="border-y border-slate-200 bg-white">
      <div className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
        {trustPoints.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-700">
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <p className="font-semibold text-slate-900">{title}</p>
              <p className="text-sm text-slate-600">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
      {items.map((f, i) => (
        <div key={f.q}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-slate-900 sm:px-6"
            aria-expanded={open === i}
          >
            {f.q}
            <ChevronDown className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${open === i ? 'rotate-180' : ''}`} aria-hidden />
          </button>
          {open === i && <p className="px-5 pb-5 leading-relaxed text-slate-600 sm:px-6">{f.a}</p>}
        </div>
      ))}
    </div>
  );
}

/** Closing call to action used at the bottom of most pages. */
export function CtaBanner({ title = 'Ready to cross it off your list?', text = `Tell us what needs fixing — we’ll get back to you ${site.responseTime} with a free, no-pressure quote.` }: { title?: string; text?: string }) {
  return (
    <section className="bg-brand-800">
      <div className="container-x flex flex-col items-start gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">{title}</h2>
          <p className="mt-3 text-lg text-brand-100">{text}</p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <ButtonLink to="/#quote" size="lg">
            Get a free quote
          </ButtonLink>
          <CallButton variant="ghost-light" size="lg" location="cta_banner" />
        </div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-brand-900 text-white">
      <div className="container-x py-14 sm:py-20">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-wider text-accent-300">{eyebrow}</p>}
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-100">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
