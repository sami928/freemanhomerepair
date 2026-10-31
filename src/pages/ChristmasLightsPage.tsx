import {
  CheckCircle2,
  ShieldCheck,
  CalendarHeart,
  Smartphone,
  CloudRain,
  Ruler,
  Wrench,
  Sparkles,
  MapPin,
  Palette,
  Mic,
  Sun,
} from 'lucide-react';
import { site } from '@/config/site';
import { areas } from '@/data/areas';
import { christmasFaqs, productName } from '@/data/christmasLights';
import { QuoteForm } from '@/components/QuoteForm';
import { CallButton, TextButton } from '@/components/ContactLinks';
import { ButtonLink } from '@/components/Button';
import { SectionHeading, FaqList } from '@/components/Sections';

const heroPoints = ['Free in-home estimate', 'Professional install — no ladders for you', 'App setup & schedules included'];

const reasons = [
  { icon: ShieldCheck, title: 'No more ladders', text: 'Skip the annual climb, the tangled strands and the January take-down.' },
  { icon: CalendarHeart, title: 'Every holiday, one app', text: 'Christmas, Halloween, the Fourth of July or game day — change colors in seconds.' },
  { icon: Sun, title: 'Up year-round', text: 'Mounted neatly along your eaves. Warm white makes great everyday accent lighting.' },
  { icon: CloudRain, title: 'Built for Portland weather', text: 'IP68-rated lights designed to stay outside through rain, wind and cold.' },
];

const prismFeatures = [
  { icon: Palette, title: 'Three colors in every light', text: 'Each Prism light has three separately controlled color zones for richer patterns and smooth color blends.' },
  { icon: Smartphone, title: 'App & schedule control', text: 'Scenes, timers and sunset schedules from the Govee Home app.' },
  { icon: Mic, title: 'Voice & smart home', text: 'Works with Alexa, Google Assistant and Matter.' },
  { icon: Sparkles, title: 'Holiday scenes built in', text: 'Ready-made Christmas effects, plus true warm white for the rest of the year.' },
];

const steps = [
  { icon: Ruler, title: 'Free estimate', text: 'We measure your rooflines, talk through the look you want and give you one upfront price.' },
  { icon: Wrench, title: 'Professional install', text: 'We mount the lights cleanly along your eaves and route the wiring and power supply out of sight.' },
  { icon: Smartphone, title: 'Set up together', text: 'We connect the lights to your Wi-Fi, set a schedule and show you how to change scenes.' },
];

/** Five-color palette for the illustration's bulbs, repeated along the roofline. */
const bulbColors = ['#ef4444', '#22c55e', '#e2b544', '#3b82f6', '#f8fafc'];

export function ChristmasLightsPage() {
  const year = new Date().getFullYear();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-950 via-brand-900 to-brand-800">
        <Stars />
        <div className="container-x relative grid items-center gap-10 pb-6 pt-12 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pt-20">
          <div className="text-white">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-100 ring-1 ring-white/15">
              <Sparkles className="h-4 w-4 text-accent-300" aria-hidden />
              Now booking for the {year} holiday season
            </p>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Christmas Light Installation in <span className="text-accent-400">Portland, OR</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100 sm:text-xl">
              We install <strong className="font-semibold text-white">Govee Prism permanent outdoor lights</strong> along
              your roofline — so your home glows all season, and you never climb a ladder for Christmas lights again.
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
              <CallButton size="lg" location="christmas_hero" label={`Call ${site.phone.display}`} />
              <TextButton variant="ghost-light" size="lg" location="christmas_hero" label="Text us a photo of your home" />
            </div>
          </div>

          <div id="quote" className="scroll-mt-28">
            <QuoteForm
              source="christmas_lights"
              defaultService="holiday-lighting"
              title="Get your free lighting estimate"
              subtitle={`Tell us about your home — we reply ${site.responseTime}.`}
            />
          </div>
        </div>
        <RooflineIllustration />
      </section>

      {/* WHY PERMANENT */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why permanent lights"
            title="Hang them once. Enjoy them every year."
            intro="Traditional Christmas lights mean ladders in the rain, burnt-out bulbs and a second trip up to take them down. Permanent lights stay up, out of sight, ready whenever you are."
            center
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-6">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent-50 text-accent-700 ring-1 ring-accent-100">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOVEE PRISM */}
      <section className="bg-brand-50 py-16 sm:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The lights we install"
              title="Govee Prism permanent outdoor lights"
              intro={`We install the ${productName} — Govee’s premium permanent lighting line, with smart controls and effects that go far beyond a string of bulbs.`}
            />
            <p className="mt-6 text-slate-600">
              Kits come in 100, 150 and 200 ft lengths. We’ll measure your home and recommend the right size, so you
              don’t pay for more than you need.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/christmas-lights#quote" size="lg">
                Get my free estimate
              </ButtonLink>
              <CallButton variant="outline" size="lg" location="christmas_prism" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {prismFeatures.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                <Icon className="h-6 w-6 text-brand-700" aria-hidden />
                <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="From estimate to lights-on" center />
          <ol className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-accent-50 text-accent-700 ring-1 ring-accent-100">
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <p className="mt-4 text-sm font-bold uppercase tracking-wider text-accent-700">Step {i + 1}</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BOOK EARLY */}
      <section className="bg-brand-900">
        <div className="container-x flex flex-col items-start gap-6 py-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl text-white">
            <h2 className="font-display text-3xl font-bold tracking-tight">Book early for the holidays</h2>
            <p className="mt-3 text-lg text-brand-100">
              Install dates are first-come, first-served, and December fills fast. Get your estimate now to be lit for the
              whole season.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink to="/christmas-lights#quote" size="lg">
              Reserve my install
            </ButtonLink>
            <CallButton variant="ghost-light" size="lg" location="christmas_book_early" />
          </div>
        </div>
      </section>

      {/* SERVICE AREA */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading
            eyebrow="Service area"
            title="Christmas light installation across the Portland metro"
            intro="We install permanent holiday lighting for homes throughout Portland and nearby cities."
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
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <SectionHeading eyebrow="FAQ" title="Christmas light questions" intro="Have a question that isn’t here? Call or text us." />
          <FaqList items={christmasFaqs} />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative overflow-hidden bg-brand-950">
        <Stars />
        <div className="container-x relative py-16 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Make this the year you never hang lights again
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-100">
            Free estimates across the Portland metro. One upfront price for lights and installation.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/christmas-lights#quote" size="lg">
              Get my free estimate
            </ButtonLink>
            <CallButton variant="ghost-light" size="lg" location="christmas_closing" />
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-xs text-brand-300">
            Govee is a trademark of its owner. {site.name} is an independent installer and is not affiliated with or
            endorsed by Govee. Product features are as described by the manufacturer.
          </p>
        </div>
      </section>
    </>
  );
}

/** Faint star field for the night-sky sections. Positions are fixed so it renders the same every time. */
function Stars() {
  const stars = [
    [6, 12], [14, 30], [22, 8], [31, 22], [40, 6], [48, 28], [57, 14], [66, 4], [73, 24], [82, 10], [90, 30], [96, 16],
    [10, 48], [27, 40], [44, 52], [61, 42], [78, 50], [93, 44],
  ];
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
      {stars.map(([x, y], i) => (
        <circle key={i} cx={`${x}%`} cy={`${y}%`} r={i % 3 === 0 ? 1.4 : 0.9} fill="#fff" opacity={i % 2 ? 0.35 : 0.6} />
      ))}
    </svg>
  );
}

/** Decorative house silhouette with twinkling lights along the roofline. */
function RooflineIllustration() {
  // Roofline: eave → gable peak → eave → lower roof over the garage.
  const roof: [number, number][] = [
    [140, 150], [330, 52], [520, 150], [520, 150], [880, 150],
  ];
  const bulbs: { x: number; y: number }[] = [];
  for (let s = 0; s < roof.length - 1; s++) {
    const [x1, y1] = roof[s];
    const [x2, y2] = roof[s + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    const n = Math.floor(len / 22);
    for (let i = 0; i < n; i++) bulbs.push({ x: x1 + ((x2 - x1) * i) / n, y: y1 + ((y2 - y1) * i) / n });
  }
  bulbs.push({ x: 880, y: 150 });

  return (
    <svg viewBox="0 0 1000 260" className="relative mx-auto -mb-px block w-full max-w-5xl" aria-hidden>
      <defs>
        <filter id="glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      {/* house + garage */}
      <path d="M140 150 330 52 520 150V260H160V150Z" fill="#0b1626" />
      <rect x="520" y="150" width="360" height="110" fill="#0d1a2c" />
      <rect x="600" y="185" width="200" height="75" rx="3" fill="#13243b" />
      {/* warm windows */}
      <rect x="215" y="180" width="54" height="44" rx="3" fill="#e2b544" opacity="0.55" />
      <rect x="391" y="180" width="54" height="44" rx="3" fill="#e2b544" opacity="0.55" />
      <rect x="306" y="105" width="48" height="34" rx="3" fill="#e2b544" opacity="0.4" />
      <rect x="303" y="196" width="54" height="64" rx="3" fill="#1a2f4c" />
      {/* light wire */}
      <polyline points={roof.map((p) => p.join(',')).join(' ')} fill="none" stroke="#1f3a5f" strokeWidth="2" />
      {bulbs.map((b, i) => {
        const color = bulbColors[i % bulbColors.length];
        const delay = `${(i % 7) * 0.33}s`;
        return (
          <g key={i} className="twinkle" style={{ animationDelay: delay }}>
            <circle cx={b.x} cy={b.y} r="9" fill={color} opacity="0.55" filter="url(#glow)" />
            <circle cx={b.x} cy={b.y} r="3.6" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}
