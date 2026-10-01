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
};

export const services: Service[] = [
  {
    slug: 'general-repairs',
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
    name: 'Mounting & Installation',
    icon: Tv,
    summary: 'TVs, shelving, curtain rods, closet systems and more.',
    description:
      'Mounted securely and level the first time: TVs, shelves, curtain rods, blinds, closet systems and childproofing.',
    jobs: ['TV mounting', 'Shelving & closet systems', 'Blinds & curtain rods', 'Childproofing', 'Grab bars'],
  },
  {
    slug: 'exterior-maintenance',
    name: 'Exterior Maintenance',
    icon: Home,
    summary: 'Gutters, siding repair, pressure washing and moss removal.',
    description:
      'Keep the Pacific Northwest weather outside where it belongs: gutter cleaning and repair, siding and trim fixes, moss treatment and pressure washing.',
    jobs: ['Gutter cleaning & repair', 'Siding & trim repair', 'Moss removal', 'Pressure washing', 'Dry rot repair'],
  },
  {
    slug: 'home-maintenance',
    name: 'Seasonal Maintenance',
    icon: ClipboardCheck,
    summary: 'Fall and spring tune-ups that catch small problems early.',
    description:
      'A seasonal walk-through of your home: we check and handle the things that turn into expensive repairs if they’re ignored.',
    jobs: ['Fall winterizing', 'Spring tune-ups', 'Filter & detector changes', 'Caulk & seal inspection', 'Rental turnover repairs'],
  },
  {
    slug: 'other',
    name: 'Something Else',
    icon: Wrench,
    summary: 'Not on the list? Ask — if we can’t do it, we’ll point you to who can.',
    description:
      'Most home repair and maintenance jobs are something we handle. Tell us what you need and we’ll let you know straight away whether it’s a fit.',
    jobs: [],
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function findService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
