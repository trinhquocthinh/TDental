import type { Doctor } from '@/data/home';

export type ContactChannel = {
  id: string;
  icon: string;
  label: string;
  href?: string;
  text: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export const clinicAddress =
  '1247/Plot No. 39, 15th Phase,\nLHB Colony, Kanpur, Uttar Pradesh 208024';

export const clinicSchedule = 'Mon - Sat: 9:00am - 10:00pm';

export const contactChannels: ContactChannel[] = [
  {
    id: 'phone',
    icon: 'call-outline',
    label: 'Phone',
    href: 'tel:+917052101786',
    text: '+91-7052-101-786',
  },
  {
    id: 'email',
    icon: 'mail-outline',
    label: 'Email',
    href: 'mailto:help@example.com',
    text: 'help@example.com',
  },
  {
    id: 'hours',
    icon: 'time-outline',
    label: 'Hours',
    text: clinicSchedule,
  },
];

export const appointmentServices = [
  'Root Canal Therapy',
  'Alignment Teeth',
  'Cosmetic Dentistry',
  'Oral Hygiene',
  'Live Advisory',
  'Cavity Inspection',
] as const;

export const appointmentDoctors: Doctor['id'][] = [
  'howard-holmes',
  'ella-thompson',
  'vincent-cooper',
  'danielle-bryant',
];

export const contactFaqs: Faq[] = [
  {
    question: 'Do you accept walk-in patients?',
    answer:
      'We prioritize scheduled visits but keep a few emergency slots daily. Call before coming in so we can prepare the right clinician.',
  },
  {
    question: 'Which insurance providers do you work with?',
    answer:
      'TDental partners with 20+ Indian and international insurers. Share your policy while booking and we’ll confirm coverage before your visit.',
  },
  {
    question: 'How do I reschedule or cancel?',
    answer:
      'Use the confirmation link in your appointment email or call us directly at least 24 hours in advance to avoid cancellation fees.',
  },
];
