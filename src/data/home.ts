export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export type DoctorSocialNetwork = 'facebook' | 'instagram' | 'twitter';

export type Doctor = {
  id: string;
  name: string;
  role: string;
  image: string;
  profileHref: string;
  socials: {
    network: DoctorSocialNetwork;
    href: string;
  }[];
};

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  displayDate: string;
  href: string;
};

export const services: Service[] = [
  {
    id: 'root-canal',
    title: 'Root Canal Therapy',
    description:
      'Gentle, precision treatments that save natural teeth and stop chronic pain fast.',
    icon: '/assets/images/service-icon-1.png',
    href: '/services#service-root-canal',
  },
  {
    id: 'alignment',
    title: 'Personalized Alignment',
    description:
      'Modern aligners and braces that straighten smiles with fewer visits and faster results.',
    icon: '/assets/images/service-icon-2.png',
    href: '/services#service-alignment',
  },
  {
    id: 'cosmetic',
    title: 'Cosmetic Enhancements',
    description:
      'Whitening, veneers, and contouring designed to match your facial features and goals.',
    icon: '/assets/images/service-icon-3.png',
    href: '/services#service-cosmetic',
  },
  {
    id: 'oral-hygiene',
    title: 'Preventive Hygiene',
    description:
      'Comfort-first cleanings, fluoride, and sealants to keep your family smiling year-round.',
    icon: '/assets/images/service-icon-4.png',
    href: '/services#service-hygiene',
  },
  {
    id: 'advisory',
    title: 'Live Dental Advisory',
    description:
      'Chat with clinicians for real-time care plans, insurance guidance, and emergency triage.',
    icon: '/assets/images/service-icon-5.png',
    href: '/services#service-advisory',
  },
  {
    id: 'cavity',
    title: 'Cavity Detection',
    description:
      'Digital diagnostics that pinpoint concerns early so treatments stay minimally invasive.',
    icon: '/assets/images/service-icon-6.png',
    href: '/services#service-cavity',
  },
];

export const doctors: Doctor[] = [
  {
    id: 'howard-holmes',
    name: 'Dr. Howard Holmes',
    role: 'Prosthodontist',
    image: '/assets/images/doctor-1.png',
    profileHref: '/about#team-howard',
    socials: [
      { network: 'facebook', href: 'https://www.facebook.com/dentelo' },
      { network: 'twitter', href: 'https://twitter.com/dentelo' },
      { network: 'instagram', href: 'https://www.instagram.com/dentelo' },
    ],
  },
  {
    id: 'ella-thompson',
    name: 'Dr. Ella Thompson',
    role: 'Orthodontist',
    image: '/assets/images/doctor-2.png',
    profileHref: '/about#team-ella',
    socials: [
      { network: 'facebook', href: 'https://www.facebook.com/dentelo' },
      { network: 'twitter', href: 'https://twitter.com/dentelo' },
      { network: 'instagram', href: 'https://www.instagram.com/dentelo' },
    ],
  },
  {
    id: 'vincent-cooper',
    name: 'Dr. Vincent Cooper',
    role: 'Cosmetic Dentist',
    image: '/assets/images/doctor-3.png',
    profileHref: '/about#team-vincent',
    socials: [
      { network: 'facebook', href: 'https://www.facebook.com/dentelo' },
      { network: 'twitter', href: 'https://twitter.com/dentelo' },
      { network: 'instagram', href: 'https://www.instagram.com/dentelo' },
    ],
  },
  {
    id: 'danielle-bryant',
    name: 'Dr. Danielle Bryant',
    role: 'Pediatric Specialist',
    image: '/assets/images/doctor-4.png',
    profileHref: '/about#team-danielle',
    socials: [
      { network: 'facebook', href: 'https://www.facebook.com/dentelo' },
      { network: 'twitter', href: 'https://twitter.com/dentelo' },
      { network: 'instagram', href: 'https://www.instagram.com/dentelo' },
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: '5 early signs your smile needs a checkup',
    excerpt:
      'Watch for subtle changes in enamel, gum color, or tooth sensitivity to stay ahead of issues.',
    image: '/assets/images/blog-1.jpg',
    date: '2024-09-12',
    displayDate: '12 Sep 2024',
    href: '/blog#post-1',
  },
  {
    id: 'post-2',
    title: 'How digital dentistry shortens treatment times',
    excerpt:
      'From 3D imaging to AI-driven aligners, technology keeps care precise and efficient.',
    image: '/assets/images/blog-2.jpg',
    date: '2024-08-28',
    displayDate: '28 Aug 2024',
    href: '/blog#post-2',
  },
  {
    id: 'post-3',
    title: 'Secrets to helping kids enjoy the dentist',
    excerpt:
      'Transform visits with sensory-friendly suites, storytelling, and rewards that motivate.',
    image: '/assets/images/blog-3.jpg',
    date: '2024-07-15',
    displayDate: '15 Jul 2024',
    href: '/blog#post-3',
  },
];
