import { MapPin } from 'lucide-react';
import { areas, type Area } from '@/data/areas';
import { PageHero, CtaBanner } from '@/components/Sections';

const regions: { key: Area['region']; label: string }[] = [
  { key: 'Portland', label: 'Portland' },
  { key: 'West', label: 'West side' },
  { key: 'South', label: 'South metro' },
  { key: 'East', label: 'East side' },
  { key: 'North', label: 'North / SW Washington' },
];

export function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title="Serving homes across the Portland metro"
        intro="From the West Hills to Gresham and from Vancouver down to Oregon City, our team is nearby and ready to help."
      />
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => {
            const list = areas.filter((a) => a.region === r.key);
            if (!list.length) return null;
            return (
              <div key={r.key} className="rounded-xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-slate-900">{r.label}</h2>
                <ul className="mt-4 space-y-2">
                  {list.map((a) => (
                    <li key={a.slug} className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-4 w-4 text-brand-600" aria-hidden />
                      {a.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p className="container-x mt-8 text-slate-600">
          Outside these areas? Reach out anyway — we take jobs throughout the greater metro when the schedule allows.
        </p>
      </section>
      <CtaBanner title="Are you in our area?" text="Enter your ZIP in the quote form and we’ll confirm right away." />
    </>
  );
}
