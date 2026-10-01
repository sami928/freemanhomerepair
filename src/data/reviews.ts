/**
 * Customer reviews. Hidden until `features.reviews` is on.
 * Only publish real reviews (with permission) — invented testimonials
 * violate FTC rules and Google’s policies.
 */
export type Review = { name: string; location: string; text: string; rating: 1 | 2 | 3 | 4 | 5; service?: string };

export const reviews: Review[] = [];
