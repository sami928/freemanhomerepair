import { ButtonLink } from '@/components/Button';
import { CallButton } from '@/components/ContactLinks';

export function NotFoundPage() {
  return (
    <section className="py-24">
      <div className="container-x max-w-xl text-center">
        <p className="font-display text-6xl font-extrabold text-brand-700">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">This page needs a repair.</h1>
        <p className="mt-3 text-slate-600">We couldn’t find what you were looking for — but we can probably fix whatever brought you here.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/" size="lg">Go home</ButtonLink>
          <CallButton variant="outline" size="lg" location="404" />
        </div>
      </div>
    </section>
  );
}
