/**
 * Service area. Each entry is listed on the home page and /service-area.
 * To add per-city landing pages later, add a `description` and route
 * /service-area/<slug> the same way /services/<slug> works.
 */
export type Area = { name: string; slug: string; region: 'Portland' | 'West' | 'East' | 'South' | 'North' };

export const areas: Area[] = [
  { name: 'Portland', slug: 'portland', region: 'Portland' },
  { name: 'Beaverton', slug: 'beaverton', region: 'West' },
  { name: 'Hillsboro', slug: 'hillsboro', region: 'West' },
  { name: 'Tigard', slug: 'tigard', region: 'West' },
  { name: 'Tualatin', slug: 'tualatin', region: 'South' },
  { name: 'Lake Oswego', slug: 'lake-oswego', region: 'South' },
  { name: 'West Linn', slug: 'west-linn', region: 'South' },
  { name: 'Milwaukie', slug: 'milwaukie', region: 'South' },
  { name: 'Oregon City', slug: 'oregon-city', region: 'South' },
  { name: 'Happy Valley', slug: 'happy-valley', region: 'East' },
  { name: 'Clackamas', slug: 'clackamas', region: 'East' },
  { name: 'Gresham', slug: 'gresham', region: 'East' },
  { name: 'Troutdale', slug: 'troutdale', region: 'East' },
  { name: 'Vancouver, WA', slug: 'vancouver', region: 'North' },
];
