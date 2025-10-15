export type BlogArticle = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  date: string;
  displayDate: string;
  paragraphs: string[];
  ctaLabel: string;
  ctaHref: string;
};

export const blogArticles: BlogArticle[] = [
  {
    id: 'post-1',
    title: 'Root Canal Recovery Tips: Heal Faster with Less Discomfort',
    image: '/assets/images/blog-1.jpg',
    imageAlt: 'Root canal patient smiling',
    date: '2025-08-04',
    displayDate: '4 Aug 2025',
    paragraphs: [
      'A modern root canal shouldn’t sideline your week. Discover the hydration, nutrition, and oral hygiene steps we give every TDental patient so you feel normal within 48 hours.',
      'We also cover red flags to watch for, how to manage post-procedure sensitivity, and the follow-up timeline that keeps your tooth healthy long-term.',
    ],
    ctaLabel: 'Ask a specialist',
    ctaHref: '/contact#appointment',
  },
  {
    id: 'post-2',
    title: 'Aligner Lifestyle Guide: What to Expect During Treatment',
    image: '/assets/images/blog-2.jpg',
    imageAlt: 'Teen wearing aligners',
    date: '2025-07-22',
    displayDate: '22 Jul 2025',
    paragraphs: [
      'From your first 3D scan to the final refinement tray, we break down how to keep aligners clean, track wear time, and avoid mid-treatment setbacks.',
      'You’ll also uncover snack swaps, travel hacks, and retainer habits approved by TDental orthodontists.',
    ],
    ctaLabel: 'Start aligner consult',
    ctaHref: '/services#service-alignment',
  },
  {
    id: 'post-3',
    title: 'Smile Design 101: Veneers vs. Bonding vs. Whitening',
    image: '/assets/images/blog-3.jpg',
    imageAlt: 'Cosmetic dentistry shade guide',
    date: '2025-06-30',
    displayDate: '30 Jun 2025',
    paragraphs: [
      'Each option enhances your smile differently. We compare longevity, cost, and maintenance so you can match treatments to your timeline and budget.',
      'See before-and-after examples from TDental clients and learn how we preview cosmetic outcomes digitally.',
    ],
    ctaLabel: 'Plan a smile design',
    ctaHref: '/services#service-cosmetic',
  },
];
