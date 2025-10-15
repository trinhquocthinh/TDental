import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactElement } from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from 'react-icons/io5';

import { BookAppointmentButton } from '@/components/common/BookAppointmentButton';
import type { Doctor, DoctorSocialNetwork } from '@/data/home';
import { doctors } from '@/data/home';

const heroBackground: CSSProperties = {
  backgroundImage: "url('/assets/images/hero-bg.png')",
};

const heroDescription =
  'For more than 15 years, TDental has delivered compassionate, tech-enabled dentistry that keeps families smiling. We blend clinical excellence with comforting spaces so every visit feels effortless.';

const missionIntro =
  'We believe great dentistry starts with listening. Every smile has a story, so our clinicians build tailored treatment plans anchored in your goals, lifestyle, and comfort level.';

const missionSupport =
  "From digital x-rays and 3D scanners to flexible payment plans, we invest in the tools and support that make prevention and restorative care more accessible. It's why 9 in 10 patients refer their friends and family to TDental.";

const carePrinciples = [
  {
    id: 'comfort',
    icon: '/assets/images/service-icon-4.png',
    title: 'Comfort-first Dentistry',
    description:
      'Relaxing suites, noise-cancelling headphones, and sedation options keep anxiety at bay.',
  },
  {
    id: 'technology',
    icon: '/assets/images/service-icon-2.png',
    title: 'Technology You Can Trust',
    description:
      'Digital diagnostics catch issues sooner while reducing radiation exposure by up to 80%.',
  },
  {
    id: 'education',
    icon: '/assets/images/service-icon-6.png',
    title: 'Education at Every Visit',
    description:
      'We translate complex treatment plans into clear steps so you can make confident choices.',
  },
  {
    id: 'support',
    icon: '/assets/images/service-icon-5.png',
    title: 'Real-time Support',
    description:
      'Chat with our care concierge for insurance questions, emergency triage, and follow-up care.',
  },
] as const;

const socialIconMap: Record<DoctorSocialNetwork, ReactElement> = {
  facebook: <IoLogoFacebook aria-hidden="true" />,
  instagram: <IoLogoInstagram aria-hidden="true" />,
  twitter: <IoLogoTwitter aria-hidden="true" />,
};

const teamMembers: Array<Doctor & { anchor: string }> = doctors.map(doctor => ({
  ...doctor,
  anchor: doctor.profileHref.split('#')[1] ?? `team-${doctor.id}`,
}));

export const metadata: Metadata = {
  title: 'About TDental - Dental Care Crafted Around You',
  description:
    'Learn how TDental blends advanced technology with human warmth to deliver dentistry that feels effortless.',
};

export default function AboutPage(): ReactElement {
  return (
    <main>
      <article>
        <section
          className="section hero"
          style={heroBackground}
          aria-label="About hero"
        >
          <div className="container">
            <div className="hero-content">
              <p className="section-subtitle">About TDental</p>
              <h1 className="h1 hero-title">Care Designed Around Your Smile</h1>
              <p className="hero-text">{heroDescription}</p>
              <Link href="#mission" className="btn">
                Explore our story
              </Link>
            </div>

            <figure className="hero-banner">
              <Image
                src="/assets/images/about-banner.png"
                width={470}
                height={538}
                alt="Dentist with patient"
                className="w-100"
              />
            </figure>
          </div>
        </section>

        <section
          className="section about"
          id="mission"
          aria-label="Our mission"
        >
          <div className="container">
            <div className="about-content">
              <p className="section-subtitle">Our Promise</p>
              <h2 className="h2 section-title">
                Clinical Precision, Human Warmth
              </h2>
              <p className="section-text section-text-1">{missionIntro}</p>
              <p className="section-text">{missionSupport}</p>
            </div>

            <figure className="about-banner">
              <Image
                src="/assets/images/service-banner.png"
                width={409}
                height={467}
                alt="Dental equipment"
                className="w-100"
              />
            </figure>
          </div>
        </section>

        <section className="section service" aria-label="Values">
          <div className="container">
            <p className="section-subtitle text-center">What Guides Us</p>
            <h2 className="h2 section-title text-center">
              Our Care Principles
            </h2>
            <ul className="service-list">
              {carePrinciples.map(principle => (
                <li key={principle.id}>
                  <article className="service-card">
                    <div className="card-icon">
                      <Image
                        src={principle.icon}
                        alt=""
                        width={100}
                        height={100}
                        className="w-100"
                      />
                    </div>
                    <div>
                      <h3 className="h3 card-title">{principle.title}</h3>
                      <p className="card-text">{principle.description}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="section doctor"
          id="team"
          aria-label="Meet our team"
        >
          <div className="container">
            <p className="section-subtitle text-center">Our Team</p>
            <h2 className="h2 section-title text-center">
              Experts Dedicated to Your Oral Health
            </h2>
            <ul className="has-scrollbar">
              {teamMembers.map(member => (
                <li
                  className="scrollbar-item"
                  id={member.anchor}
                  key={member.id}
                >
                  <article className="doctor-card">
                    <div
                      className="card-banner img-holder"
                      style={
                        { '--width': '460', '--height': '500' } as CSSProperties
                      }
                    >
                      <Image
                        src={member.image}
                        width={460}
                        height={500}
                        alt={member.name}
                        className="img-cover"
                      />
                    </div>
                    <h3 className="h3">
                      <Link href="/contact#appointment" className="card-title">
                        {member.name}
                      </Link>
                    </h3>
                    <p className="card-subtitle">{member.role}</p>
                    <ul className="card-social-list">
                      {member.socials.map(social => (
                        <li key={`${member.id}-${social.network}`}>
                          <a
                            href={social.href}
                            className="card-social-link"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} on ${social.network}`}
                          >
                            {socialIconMap[social.network]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section cta" aria-label="Join TDental team">
          <div className="container">
            <figure className="cta-banner">
              <Image
                src="/assets/images/cta-banner.png"
                width={1056}
                height={1076}
                alt="Patients smiling"
                className="w-100"
              />
            </figure>
            <div className="cta-content">
              <p className="section-subtitle">Join the TDental Family</p>
              <h2 className="h2 section-title">
                Schedule a complimentary smile consultation
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
