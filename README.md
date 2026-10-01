# Freeman Home Services — website

Lead-capture website for Freeman Home Services, a handyman, home repair and maintenance company serving the Portland, Oregon metro.

**Stack:** Vite + React 18 + TypeScript + Tailwind CSS. A static single-page app with no server to run.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
```

## Before launch checklist

1. **Business details.** Edit `src/config/site.ts`: phone, email, domain, Oregon CCB license #, hours. Every value marked `PLACEHOLDER` needs replacing. (Oregon requires the CCB number on advertising.)
2. **Lead destination.** Copy `.env.example` to `.env` and choose one option:
   - `VITE_LEAD_ENDPOINT`: any endpoint that accepts a JSON POST (Formspree, a Zapier/Make webhook, or your own API). This is the fastest way to get leads into email or SMS.
   - `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`: run `supabase/migrations/001_leads.sql` first.

   With neither set, dev mode logs submissions to the console, and production shows an error asking the visitor to call.
3. **Copy.** FAQ answers (`src/data/faqs.ts`) and the About page are placeholders. Confirm pricing and policies.
4. **Analytics (optional).** Set `VITE_GA_ID`. Call, text and email clicks and quote starts and submissions are tracked as GA4 events. `/thank-you` gives you a URL to count conversions in Google Ads.
5. **Hosting.** Deep links need an SPA rewrite to `index.html`. The repo includes `public/.htaccess` (Apache/Hostinger), `public/_redirects` (Netlify) and `vercel.json` (Vercel).

## Where to make changes

| To… | Edit |
|---|---|
| Add or change a service (adds its card, form option and `/services/<slug>` page) | `src/data/services.ts` |
| Add a city to the service area | `src/data/areas.ts` |
| Turn on reviews, team, careers pages, or turn off the mobile CTA bar | `features` in `src/config/site.ts` |
| Add reviews / team members | `src/data/reviews.ts`, `src/data/team.ts` |
| Add a new page | page component in `src/pages/`, route in `staticRoutes` (`src/App.tsx`), nav link in `src/routes.ts` |
| Send leads to a CRM (Jobber, Housecall Pro…) | `submitLead()` in `src/lib/leads.ts` |
| Add ad pixels / other tracking | `src/lib/analytics.ts` |
| Colors | `brand` / `accent` in `tailwind.config.js` |

## Built for lead capture

- Quote form above the fold on the home page, on every service page and on the contact page. It has two steps: *what / where / when*, then contact details.
- Click-to-call and click-to-text in the header, hero, banners and footer. Phones get a sticky **Call / Text / Free Quote** bar.
- Trust signals (licensed, insured, CCB #, guarantee) placed beside every call to action.
- UTM and gclid parameters from ad clicks are saved with each lead. A honeypot field filters bot submissions.
- Per-page titles, descriptions and canonical URLs, plus `HomeAndConstructionBusiness` structured data for local SEO.

## Room to grow

- **Multiple employees:** `/team` and `/careers` are already built, behind feature flags. The `leads` table has `status` and `assigned_to` columns ready for a dispatch or CRM view.
- **City landing pages:** `areas.ts` has slugs ready. Route `/service-area/<slug>` the same way services work.
- **Online booking / payments:** add a page and plug in a booking widget, or swap `submitLead()` to your field-service software's API.
- **Routing:** the small built-in router (`src/lib/router.ts`) can be swapped for react-router if you need nested layouts. Pages depend only on `<Link>`, `navigate()` and `useRoute()`.
