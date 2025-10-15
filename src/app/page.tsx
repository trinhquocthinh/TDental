import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactElement } from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
} from 'react-icons/io5';

import { BookAppointmentButton } from '@/components/common/BookAppointmentButton';
import { HeroCallBackForm } from '@/components/sections/home/HeroCallBackForm';
import type { DoctorSocialNetwork } from '@/data/home';
import { blogPosts, doctors, services } from '@/data/home';

const heroBackground: CSSProperties = {
  backgroundImage: "url('/assets/images/hero-bg.png')",
};

const socialIconMap: Record<DoctorSocialNetwork, ReactElement> = {
  facebook: <IoLogoFacebook aria-hidden="true" />,
  instagram: <IoLogoInstagram aria-hidden="true" />,
  twitter: <IoLogoTwitter aria-hidden="true" />,
};

export default function HomePage(): ReactElement {
  return (
    <main>
      <article>
        <section
          className="section hero"
          id="home"
          style={heroBackground}
          aria-label="hero"
        >
          <div className="container">
            <div className="hero-content">
              <p className="section-subtitle">Welcome To TDental</p>
              <h1 className="h1 hero-title">
                Modern dentistry crafted around you
              </h1>
              <p className="hero-text">
                Experience empathetic care, advanced technology, and relaxing
                suites that make every visit feel easy. From preventive checkups
                to full-smile transformations, we tailor dentistry to your
                lifestyle.
              </p>
              <HeroCallBackForm />
            </div>

            <figure className="hero-banner">
              <Image
                src="/assets/images/hero-banner.png"
                width={587}
                height={839}
                alt="Dentist smiling with patient"
                className="w-100"
                priority
              />
            </figure>
          </div>
        </section>

        <section className="section service" id="service" aria-label="service">
          <div className="container">
            <p className="section-subtitle text-center">Our Services</p>
            <h2 className="h2 section-title text-center">
              Care that keeps your smile thriving
            </h2>
            <ul className="service-list">
              {services.slice(0, 3).map(service => (
                <li key={service.id}>
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

              <li className="service-banner" aria-hidden>
                <Image
                  src="/assets/images/service-banner.png"
                  width={409}
                  height={467}
                  alt="Dental team collaborating"
                  className="w-100"
                />
              </li>

              {services.slice(3).map(service => (
                <li key={service.id}>
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

        <section className="section about" id="about" aria-label="about">
          <div className="container">
            <figure className="about-banner">
              <Image
                src="/assets/images/about-banner.png"
                width={470}
                height={538}
                alt="Dentist explaining treatment plan"
                className="w-100"
              />
            </figure>

            <div className="about-content">
              <p className="section-subtitle">Why patients choose TDental</p>
              <h2 className="h2 section-title">
                Compassion meets clinical excellence
              </h2>
              <p className="section-text section-text-1">
                We start every appointment with a conversation so we can listen
                to your goals, calm worries, and design a personalized roadmap.
                Comfortable suites, sedation options, and Netflix keep anxiety
                away.
              </p>
              <p className="section-text">
                With digital scanners, same-day restorations, and flexible
                membership plans, we make dentistry convenient and predictable.
                It’s why 9 in 10 new visitors are referrals from delighted
                patients.
              </p>
              <Link href="/about" className="btn">
                Meet the team
              </Link>
            </div>
          </div>
        </section>

        <section className="section doctor" aria-label="doctor">
          <div className="container">
            <p className="section-subtitle text-center">Our Specialists</p>
            <h2 className="h2 section-title text-center">
              Dentists dedicated to lifelong smiles
            </h2>
            <ul className="has-scrollbar">
              {doctors.map(doctor => (
                <li className="scrollbar-item" key={doctor.id}>
                  <article className="doctor-card">
                    <div
                      className="card-banner img-holder"
                      style={
                        { '--width': '460', '--height': '500' } as CSSProperties
                      }
                    >
                      <Image
                        src={doctor.image}
                        width={460}
                        height={500}
                        alt={doctor.name}
                        className="img-cover"
                      />
                    </div>
                    <h3 className="h3">
                      <Link href={doctor.profileHref} className="card-title">
                        {doctor.name}
                      </Link>
                    </h3>
                    <p className="card-subtitle">{doctor.role}</p>
                    <ul className="card-social-list">
                      {doctor.socials.map(social => (
                        <li key={social.network}>
                          <a
                            href={social.href}
                            className="card-social-link"
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${doctor.name} on ${social.network}`}
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

        <section className="section cta" aria-label="cta">
          <div className="container">
            <figure className="cta-banner">
              <Image
                src="/assets/images/cta-banner.png"
                width={1056}
                height={1076}
                alt="Dentist high-fiving a patient"
                className="w-100"
              />
            </figure>

            <div className="cta-content">
              <p className="section-subtitle">Book your visit</p>
              <h2 className="h2 section-title">
                We’re welcoming new patients with complimentary smile consults
              </h2>
              <BookAppointmentButton className="btn">
                Book appointment
              </BookAppointmentButton>
            </div>
          </div>
        </section>

        <section className="section blog" id="blog" aria-label="blog">
          <div className="container">
            <p className="section-subtitle text-center">Our Blog</p>
            <h2 className="h2 section-title text-center">
              Latest insights & news
            </h2>
            <ul className="blog-list">
              {blogPosts.map(post => (
                <li key={post.id}>
                  <article className="blog-card">
                    <figure
                      className="card-banner img-holder"
                      style={
                        {
                          '--width': '1180',
                          '--height': '800',
                        } as CSSProperties
                      }
                    >
                      <Image
                        src={post.image}
                        width={1180}
                        height={800}
                        alt={post.title}
                        className="img-cover"
                      />
                      <div className="card-badge">
                        <time className="time" dateTime={post.date}>
                          {post.displayDate}
                        </time>
                      </div>
                    </figure>

                    <div className="card-content">
                      <h3 className="h3">
                        <Link href={post.href} className="card-title">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="card-text">{post.excerpt}</p>
                      <Link href={post.href} className="card-link">
                        Read More
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>
    </main>
  );
}
