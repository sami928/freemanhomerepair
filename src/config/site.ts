/**
 * Single source of truth for business details. Every phone link, the footer,
 * SEO metadata and structured data read from here — change it once.
 *
 * TODO before launch: replace every value marked PLACEHOLDER.
 */
export const site = {
  name: 'Freeman Home Services',
  shortName: 'Freeman',
  tagline: 'Portland’s go-to crew for home repair & maintenance',
  url: 'https://freemanhomeservices.com', // PLACEHOLDER — production domain

  phone: {
    display: '(503) 555-0142', // PLACEHOLDER
    tel: '+15035550142', // PLACEHOLDER — E.164 format, used for tel: and sms: links
  },
  email: 'hello@freemanhomeservices.com', // PLACEHOLDER

  /**
   * Oregon requires a Construction Contractors Board license for most paid
   * repair work. Showing it builds trust and is required on advertising.
   */
  ccbNumber: '000000', // PLACEHOLDER

  address: {
    locality: 'Portland',
    region: 'OR',
    postalCode: '97201', // PLACEHOLDER
    country: 'US',
  },

  hours: [
    { days: 'Mon – Fri', time: '7:30am – 6:00pm' },
    { days: 'Saturday', time: '9:00am – 3:00pm' },
    { days: 'Sunday', time: 'Closed' },
  ],
  /** schema.org openingHours format, kept in sync with `hours` above. */
  openingHours: ['Mo-Fr 07:30-18:00', 'Sa 09:00-15:00'],

  responseTime: 'within 1 business day',

  social: {
    google: '', // Google Business Profile URL
    facebook: '',
    instagram: '',
    nextdoor: '',
    yelp: '',
  },
} as const;

/**
 * Feature flags. Pages and sections that aren't ready yet stay in the code
 * but out of the nav and router until switched on.
 */
export const features = {
  /** Show the reviews section and /reviews. Turn on once you have real reviews. */
  reviews: false,
  /** Show /team. Turn on once there are employees to introduce. */
  team: false,
  /** Show /careers and the "We're hiring" footer link. */
  careers: false,
  /** Show the floating call / text / quote bar on mobile. */
  mobileCtaBar: true,
} as const;

export const telHref = `tel:${site.phone.tel}`;
export const smsHref = `sms:${site.phone.tel}`;
export const mailHref = `mailto:${site.email}`;
