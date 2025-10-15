import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactElement } from 'react';

import { BookAppointmentButton } from '@/components/common/BookAppointmentButton';

const heroBackground: CSSProperties = {
  backgroundImage: "url('/assets/images/service-banner.png')",
};

const heroDescription =
  'Preventive, restorative, and cosmetic treatments delivered by specialists in one convenient location. Explore how we tailor care for every age and every goal.';

const caseStudySummary =
  'From full-mouth rehabilitations to first-time cleanings, our case reviews highlight measurable improvements in function, confidence, and quality of life.';

const caseStudyPrompt =
  'Ask about our Smile Preview session where we simulate whitening, alignment, or veneer outcomes in 20 minutes so you can pick the path that excites you most.';

const serviceDetails = [
  {
    id: 'service-root-canal',
    icon: '/assets/images/service-icon-1.png',
    title: 'Root Canal Therapy',
    description:
      'Microscope-guided endodontic therapy preserves natural teeth with gentle anesthesia options and same-day crowns.',
  },
  {
    id: 'service-alignment',
    icon: '/assets/images/service-icon-2.png',
    title: 'Clear Aligner Orthodontics',
    description:
      'Custom Invisalign® and SureSmile® plans guided by 3D scans ensure faster, more predictable smile alignment.',
  },
  {
    id: 'service-cosmetic',
    icon: '/assets/images/service-icon-3.png',
    title: 'Cosmetic Smile Design',
    description:
      'Whitening, veneers, and bonding treatments are planned digitally so you preview results before we begin.',
  },
  {
    id: 'service-hygiene',
    icon: '/assets/images/service-icon-4.png',
    title: 'Preventive Hygiene',
    description:
      'Personalized recall visits include periodontal screenings, fluoride therapies, and preventive sealants for kids.',
  },
  {
    id: 'service-advisory',
    icon: '/assets/images/service-icon-5.png',
    title: 'Live Advisory',
    description:
      'Connect with our dental concierge for insurance checks, second opinions, and post-op guidance anytime.',
  },
  {
    id: 'service-cavity',
    icon: '/assets/images/service-icon-6.png',
    title: 'Cavity Detection & Repair',
    description:
      'AI-assisted diagnostics spot decay earlier and tooth-colored fillings blend seamlessly for natural results.',
  },
] as const;

const faqs = [
  {
    question: 'Do you accept my insurance?',
    answer:
      'Dentelo partners with major PPO plans and offers flexible in-house membership plans. Our concierge team verifies benefits before your visit and provides transparent copay estimates.',
  },
  {
    question: 'How soon can I get an appointment?',
    answer:
      'Emergency patients are seen same-day. Routine care is typically scheduled within seven business days, with extended evening hours available Monday through Friday.',
  },
  {
    question: 'Is sedation dentistry available?',
    answer:
      'Yeswe provide nitrous oxide, oral conscious sedation, and IV sedation administered by board-certified anesthesiologists for complex cases.',
  },
] as const;

export const metadata: Metadata = {
  title: 'Dentelo Services - Comprehensive Dental Care',
  description:
    'Explore Dentelo9s preventive, restorative, and cosmetic dental treatments tailored to every smile.',
};

export default function ServicesPage(): ReactElement {
  return (
    <main>
      <article>
        <section
          className="section hero"
          style={heroBackground}
          aria-label="Services hero"
        >
          <div className="container">
            <div className="hero-content">
              <p className="section-subtitle">Our Services</p>
              <h1 className="h1 hero-title">
                All-in-One Dental Care for Every Smile
              </h1>
              <p className="hero-text">{heroDescription}</p>
              <Link href="#service-root-canal" className="btn">
                View treatment menu
              </Link>
            </div>

            <figure className="hero-banner">
              <Image
                src="/assets/images/hero-banner.png"
                width={587}
                height={839}
                alt="Dental tools"
                className="w-100"
              />
            </figure>
          </div>
        </section>

        <section className="section service" aria-label="Dental services">
          <div className="container">
            <p className="section-subtitle text-center">Treatments</p>
            <h2 className="h2 section-title text-center">
              Comprehensive Services
            </h2>
            <ul className="service-list">
              {serviceDetails.map(service => (
                <li key={service.id} id={service.id}>
                  <article className="service-card">
                    <div className="card-icon">
                      <Image
                        src={service.icon}
                        alt=""
                        width={100}
                        height={100}
                        className="w-100"
                      />
                    </div>
                    <div>
                      <h3 className="h3 card-title">{service.title}</h3>
                      <p className="card-text">{service.description}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="section about"
          id="case-studies"
          aria-label="Patient stories"
        >
          <div className="container">
            <figure className="about-banner">
              <Image
                src="/assets/images/cta-banner.png"
                width={1056}
                height={1076}
                alt="Patient smiling"
                className="w-100"
              />
            </figure>
            <div className="about-content">
              <p className="section-subtitle">Patient Stories</p>
              <h2 className="h2 section-title">
                Results That Speak for Themselves
              </h2>
              <p className="section-text section-text-1">{caseStudySummary}</p>
              <p className="section-text">{caseStudyPrompt}</p>
              <Link href="/contact#appointment" className="btn">
                Request a smile preview
              </Link>
            </div>
          </div>
        </section>

        <section className="section blog" aria-label="Service FAQs">
          <div className="container">
            <p className="section-subtitle text-center">FAQs</p>
            <h2 className="h2 section-title text-center">
              Answers to Common Questions
            </h2>
            <ul className="blog-list">
              {faqs.map(faq => (
                <li key={faq.question}>
                  <article className="blog-card">
                    <div className="card-content">
                      <h3 className="h3">
                        <span className="card-title">{faq.question}</span>
                      </h3>
                      <p className="card-text">{faq.answer}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section cta" aria-label="Service CTA">
          <div className="container">
            <figure className="cta-banner">
              <Image
                src="/assets/images/cta-banner.png"
                width={1056}
                height={1076}
                alt="Dental chair"
                className="w-100"
              />
            </figure>
            <div className="cta-content">
              <p className="section-subtitle">Ready for Better Dental Care?</p>
              <h2 className="h2 section-title">
                Let&apos;s craft a treatment plan that fits your life
              </h2>
              <BookAppointmentButton className="btn">
                Book appointment
              </BookAppointmentButton>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
