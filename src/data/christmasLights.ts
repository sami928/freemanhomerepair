import { site } from '@/config/site';
import { areas } from '@/data/areas';
import type { Faq } from '@/data/faqs';

/**
 * Content and structured data for the seasonal /christmas-lights page.
 *
 * Product facts (three color zones per light, IP68, Matter / Alexa / Google,
 * 100–200 ft kits) come from Govee's own launch material for "Govee Permanent
 * Outdoor Lights Prism" — re-check them each season, as models change.
 * FAQ answers on estimates, setup, customer-supplied kits and booking were
 * confirmed by the business in Oct 2026.
 */

export const PATH = '/christmas-lights';

export const productName = 'Govee Permanent Outdoor Lights Prism';

export const christmasFaqs: Faq[] = [
  {
    q: 'How much does Christmas light installation cost?',
    a: 'It depends mostly on how many feet of roofline you want lit and how high it is. Govee Prism kits come in 100, 150 and 200 ft lengths. We measure your home and give you one upfront price for the lights and installation — the estimate is free.',
  },
  {
    q: 'Do I have to take them down after the holidays?',
    a: 'No — that’s the point of permanent lights. The Govee Prism lights mount discreetly along your eaves and stay up year-round. Switch to warm white for everyday accent lighting, or pick new colors for Halloween, the Fourth of July or game day.',
  },
  {
    q: 'Will they hold up to Portland rain?',
    a: 'Yes. Govee rates the Prism lights IP68 for water and dust, and they’re designed to stay outside in all seasons.',
  },
  {
    q: 'How do I control the lights?',
    a: 'From the Govee Home app on your phone, or by voice with Alexa or Google Assistant. They also support Matter. Before we leave, we connect them to your Wi-Fi, set up a schedule and show you how to change scenes.',
  },
  {
    q: 'Already bought a Govee Prism kit? Can you install it?',
    a: 'Yes. Tell us in the quote form which kit you have, and we’ll quote installation only.',
  },
  {
    q: 'How soon should I book?',
    a: 'As early as you can. Installs are first-come, first-served, and December dates fill quickly. Book in November to be lit for the whole season.',
  },
];

export const pageMeta = {
  title: 'Christmas Light Installation in Portland, OR | Freeman',
  description: 'Christmas light installation in Portland, OR. We install Govee Prism permanent outdoor lights — app-controlled, weatherproof and up year-round. Free estimates.',
};

export function christmasJsonLd(): object[] {
  const url = `${site.url}${PATH}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Christmas Light Installation — Govee Prism Permanent Lights',
      serviceType: 'Christmas light installation',
      description:
        'Installation of Govee Permanent Outdoor Lights Prism along rooflines and eaves for homes in the Portland, Oregon metro, including app setup and scheduling.',
      url,
      provider: {
        '@type': 'HomeAndConstructionBusiness',
        name: site.name,
        url: site.url,
        telephone: site.phone.tel,
      },
      areaServed: areas.map((a) => ({ '@type': 'City', name: a.name })),
      offers: {
        '@type': 'Offer',
        description: 'Free in-home estimate',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: christmasFaqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Christmas Light Installation', item: url },
      ],
    },
  ];
}
