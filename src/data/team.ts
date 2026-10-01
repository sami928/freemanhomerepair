/**
 * Team members. Hidden until `features.team` is on. Add a photo to
 * public/team/ and set `photo` to '/team/<file>'.
 */
export type TeamMember = { name: string; role: string; bio: string; photo?: string; specialties?: string[] };

export const team: TeamMember[] = [
  {
    name: 'Owner Name', // PLACEHOLDER
    role: 'Founder & Lead Technician',
    bio: 'Short bio — years of experience, why you started Freeman Home Services, and what customers can expect.',
    specialties: ['General repair', 'Carpentry'],
  },
];
