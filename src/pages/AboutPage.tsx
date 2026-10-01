import { site, features } from '@/config/site';
import { PageHero, TrustBar, CtaBanner, SectionHeading } from '@/components/Sections';
import { Link } from '@/components/Link';

// PLACEHOLDER copy — replace with the real Freeman story.
export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Local, reliable, and built on doing things right" intro={`${site.name} is a Portland-based home repair and maintenance company.`} />
      <TrustBar />
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <SectionHeading title="Our story" />
          <div className="space-y-5 text-lg leading-relaxed text-slate-700">
            <p>
              Freeman Home Services started with a simple idea: homeowners deserve a repair company that shows up on
              time, communicates clearly, and does honest work at a fair price.
            </p>
            <p>
              Whether it’s a single leaky faucet or a full list of maintenance before winter, we treat every home like
              our own — protecting your floors, cleaning up after ourselves, and making sure the job is done right.
            </p>
            <p>
              We’re growing, and every technician who joins the team is held to the same standard: licensed, insured,
              background-checked, and committed to great service.
            </p>
            {features.team && (
              <p>
                <Link to="/team" className="font-semibold text-brand-700 hover:text-brand-900">Meet the team →</Link>
              </p>
            )}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
