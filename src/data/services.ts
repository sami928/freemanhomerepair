import type { LucideIcon } from 'lucide-react';
import {
  Hammer,
  PaintRoller,
  Wrench,
  Plug,
  DoorOpen,
  Fence,
  Droplets,
  ShowerHead,
  Tv,
  Home,
  Layers,
  ClipboardCheck,
  Sparkles,
} from 'lucide-react';

/**
 * Service catalog. Each entry gets a card on the home page, a row on
 * /services, an option in the quote form, and its own landing page at
 * /services/<slug> — so adding a service is a single edit here.
 */
export type Service = {
  slug: string;
  name: string;
  icon: LucideIcon;
  /** One line for cards. */
  summary: string;
  /** Paragraph for the service page. */
  description: string;
  /** Typical jobs, shown as a checklist. */
  jobs: string[];
  /** Show on the home page grid. */
  featured?: boolean;
  /** Dedicated landing page that replaces the generic /services/<slug> page. */
  href?: string;
  /**
   * Search tagging. Each page targets one search term no other page uses, so
   * pages don't compete with each other. Keep titles under ~50 characters
   * (" | Freeman" is added) and descriptions under 160.
   */
  seo: { title: string; h1: string; description: string };
  /** Thin catch-all pages: keep out of search results. */
  noindex?: boolean;
};

export const services: Service[] = [
  {
    slug: 'general-repairs',
    seo: {
      title: 'Small Home Repairs & Honey-Do Lists in Portland',
      h1: 'Small home repairs & honey-do lists in Portland',
      description:
        'Got a list of small fixes? We handle the whole honey-do list in one visit — cabinets, railings, squeaky floors, caulking and more. Free Portland quotes.',
    },
    name: 'General Repairs',
    icon: Hammer,
    summary: 'The honey-do list, handled — all those small fixes in one visit.',
    description:
      'Sticky doors, loose railings, broken cabinet hinges, squeaky floors. We bundle the small jobs that pile up into one efficient visit so you get your weekend back.',
    jobs: ['Cabinet & drawer repair', 'Loose railings & handrails', 'Squeaky floors & stairs', 'Caulking & weatherstripping', 'Furniture assembly', 'Picture & mirror hanging'],
    featured: true,
  },
  {
    slug: 'drywall-repair',
    seo: {
      title: 'Drywall Repair & Patching in Portland, OR',
      h1: 'Drywall repair & patching in Portland',
      description:
        'Drywall repair in Portland: holes, cracks, nail pops and water-damaged ceilings patched, textured and painted to match. Free quotes, no job too small.',
    },
    name: 'Drywall & Patching',
    icon: Layers,
    summary: 'Holes, cracks and water damage patched, textured and painted to match.',
    description:
      'From doorknob dents to water-damaged ceilings, we patch, tape, texture and blend drywall so the repair disappears.',
    jobs: ['Hole & crack repair', 'Water-damage patching', 'Texture matching', 'Nail pops', 'Corner bead repair'],
    featured: true,
  },
  {
    slug: 'painting',
    seo: {
      title: 'Interior Painting in Portland, OR',
      h1: 'Interior painting in Portland',
      description:
        'Interior painting for single rooms, accent walls, trim, doors and pre-sale touch-ups in Portland. Clean lines, protected floors and an upfront price.',
    },
    name: 'Interior Painting',
    icon: PaintRoller,
    summary: 'Rooms, trim, doors and touch-ups with clean lines and no mess.',
    description:
      'Single rooms, accent walls, trim and doors, or pre-sale touch-ups. We protect floors and furniture and leave the space cleaner than we found it.',
    jobs: ['Room & accent walls', 'Trim, baseboard & doors', 'Cabinet refresh', 'Touch-ups before listing', 'Ceiling repaint'],
    featured: true,
  },
  {
    slug: 'plumbing-fixes',
    seo: {
      title: 'Faucet, Toilet & Disposal Repair in Portland',
      h1: 'Faucet, toilet & garbage disposal repair in Portland',
      description:
        'Leaky faucet or running toilet? We repair and replace faucets, toilets, garbage disposals and supply lines across Portland. Free quotes, fast scheduling.',
    },
    name: 'Minor Plumbing',
    icon: Droplets,
    summary: 'Leaky faucets, running toilets, garbage disposals and fixture swaps.',
    description:
      'Drips and running toilets waste water and money. We repair and replace faucets, toilets, disposals and supply lines. Bigger jobs get referred to a licensed plumber.',
    jobs: ['Faucet repair & replacement', 'Running toilet fixes', 'Garbage disposal install', 'Supply line replacement', 'Caulk & re-grout tubs'],
    featured: true,
  },
  {
    slug: 'electrical-fixtures',
    seo: {
      title: 'Ceiling Fan & Light Fixture Install in Portland',
      h1: 'Light fixture & ceiling fan installation in Portland',
      description:
        'Light fixture swaps, ceiling fan installation, smart thermostats, doorbells and smoke detectors installed across the Portland metro. Free quotes.',
    },
    name: 'Fixtures & Lighting',
    icon: Plug,
    summary: 'Light fixtures, ceiling fans, switches and smart-home devices.',
    description:
      'Like-for-like swaps of light fixtures, ceiling fans, switches, outlets, doorbells and smart thermostats. New circuits and panel work go to a licensed electrician.',
    jobs: ['Light fixture swaps', 'Ceiling fan install', 'Smart thermostats & doorbells', 'Switch & outlet replacement', 'Smoke & CO detectors'],
    featured: true,
  },
  {
    slug: 'doors-windows',
    seo: {
      title: 'Door Repair & Weatherstripping in Portland, OR',
      h1: 'Door repair & window weatherstripping in Portland',
      description:
        'Sticking or drafty doors and windows? We adjust, plane, rehang and weatherstrip, install locks and storm doors, and repair screens in Portland.',
    },
    name: 'Doors & Windows',
    icon: DoorOpen,
    summary: 'Doors that stick, drafty windows, new hardware and screens.',
    description:
      'Portland’s damp winters make doors swell and windows leak. We adjust, plane, rehang and seal so everything opens easily and keeps the weather out.',
    jobs: ['Door adjustment & planing', 'Door & lock installation', 'Weatherstripping', 'Window screen repair', 'Storm door install'],
    featured: true,
  },
  {
    slug: 'decks-fences',
    seo: {
      title: 'Deck & Fence Repair in Portland, OR',
      h1: 'Deck & fence repair in Portland',
      description:
        'Deck and fence repair in Portland: rotted board and post replacement, sagging gates, railings, plus cleaning, staining and sealing. Free quotes.',
    },
    name: 'Decks & Fences',
    icon: Fence,
    summary: 'Board replacement, gate repair, staining and sealing.',
    description:
      'Rain is hard on wood. We replace rotted boards, rebuild sagging gates, and clean, stain and seal decks and fences to make them last.',
    jobs: ['Rotted board replacement', 'Gate repair', 'Fence post replacement', 'Deck staining & sealing', 'Railing repair'],
    featured: true,
  },
  {
    slug: 'bathroom-kitchen',
    seo: {
      title: 'Bathroom & Kitchen Updates in Portland, OR',
      h1: 'Bathroom & kitchen updates in Portland',
      description:
        'Re-caulking, re-grouting, tile repair, vanity and mirror installs, backsplashes and new cabinet hardware for Portland kitchens and bathrooms.',
    },
    name: 'Kitchen & Bath Updates',
    icon: ShowerHead,
    summary: 'Re-caulking, tile repair, hardware, vanities and backsplashes.',
    description:
      'Small upgrades that make a big difference: new hardware, vanities, backsplashes, re-grouting and re-caulking to stop moisture damage.',
    jobs: ['Re-caulk & re-grout', 'Tile repair', 'Vanity & mirror install', 'Backsplash install', 'Cabinet hardware'],
    featured: true,
  },
  {
    slug: 'mounting-installation',
    seo: {
      title: 'TV Mounting & Shelf Installation in Portland',
      h1: 'TV mounting & shelf installation in Portland',
      description:
        'TV mounting, floating shelves, closet systems, blinds, curtain rods, grab bars and childproofing — mounted level and secure. Portland metro, free quotes.',
    },
    name: 'Mounting & Installation',
    icon: Tv,
    summary: 'TVs, shelving, curtain rods, closet systems and more.',
    description:
      'Mounted securely and level the first time: TVs, shelves, curtain rods, blinds, closet systems and childproofing.',
    jobs: ['TV mounting', 'Shelving & closet systems', 'Blinds & curtain rods', 'Childproofing', 'Grab bars'],
  },
  {
    slug: 'exterior-maintenance',
    seo: {
      title: 'Gutter Cleaning & Moss Removal in Portland, OR',
      h1: 'Gutter cleaning, moss removal & exterior repair in Portland',
      description:
        'Gutter cleaning and repair, roof and walkway moss removal, pressure washing, siding, trim and dry rot repair for Portland homes. Free quotes.',
    },
    name: 'Exterior Maintenance',
    icon: Home,
    summary: 'Gutters, siding repair, pressure washing and moss removal.',
    description:
      'Keep the Pacific Northwest weather outside where it belongs: gutter cleaning and repair, siding and trim fixes, moss treatment and pressure washing.',
    jobs: ['Gutter cleaning & repair', 'Siding & trim repair', 'Moss removal', 'Pressure washing', 'Dry rot repair'],
  },
  {
    slug: 'home-maintenance',
    seo: {
      title: 'Seasonal Home Maintenance in Portland, OR',
      h1: 'Seasonal home maintenance in Portland',
      description:
        'Fall winterizing and spring tune-ups for Portland homes: filters, detectors, caulking and seals checked and handled before small problems get expensive.',
    },
    name: 'Seasonal Maintenance',
    icon: ClipboardCheck,
    summary: 'Fall and spring tune-ups that catch small problems early.',
    description:
      'A seasonal walk-through of your home: we check and handle the things that turn into expensive repairs if they’re ignored.',
    jobs: ['Fall winterizing', 'Spring tune-ups', 'Filter & detector changes', 'Caulk & seal inspection', 'Rental turnover repairs'],
  },
  {
    slug: 'holiday-lighting',
    seo: {
      title: 'Christmas Light Installation in Portland, OR',
      h1: 'Christmas light installation in Portland',
      description:
        'Govee Prism permanent Christmas lights installed along your roofline in Portland.',
    },
    name: 'Christmas & Permanent Lighting',
    icon: Sparkles,
    summary: 'Govee Prism permanent lights installed along your roofline — holidays and year-round.',
    description:
      'Professional installation of Govee Permanent Outdoor Lights Prism along your roofline and eaves. Install once, control from your phone, and never climb a ladder for Christmas lights again.',
    jobs: ['Roofline & eave lighting', 'Govee Prism installation', 'App setup & schedules', 'Holiday & everyday scenes'],
    href: '/christmas-lights',
  },
  {
    slug: 'other',
    seo: {
      title: 'Other Home Repairs in Portland',
      h1: 'Other home repairs',
      description:
        'Not on our list? Ask — if we can’t do it, we’ll point you to someone who can.',
    },
    noindex: true,
    name: 'Something Else',
    icon: Wrench,
    summary: 'Not on the list? Ask — if we can’t do it, we’ll point you to who can.',
    description:
      'Most home repair and maintenance jobs are something we handle. Tell us what you need and we’ll let you know straight away whether it’s a fit.',
    jobs: [],
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function serviceHref(service: Service): string {
  return service.href ?? `/services/${service.slug}`;
}

export function findService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
