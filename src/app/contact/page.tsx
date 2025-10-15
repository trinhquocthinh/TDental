import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactElement } from 'react';

import { BookAppointmentButton } from '@/components/common/BookAppointmentButton';
import { ContactChannels } from '@/components/contact/ContactChannels';
import { FaqList } from '@/components/contact/FaqList';
import { ContactForm } from '@/components/forms/ContactForm';
import { clinicAddress } from '@/data/contact';

const heroBackground: CSSProperties = {
  backgroundImage: "url('/assets/images/hero-banner.png')",
};

const heroSubtitle = "Let's connect";
const heroTitle = "We're here for every smile question";
const heroDescription =
  'Call, message, or request a visit. Our care coordinators respond within one business hour during operating times.';

const contactFormIntro =
  'Use the form below to ask a question, request records, or follow up on a recent visit.';

const consultationCtaDescription =
  "Share your previous records and we'll prepare a tailored treatment roadmap.";

export const metadata: Metadata = {
  title: 'Contact Dentelo - Schedule a Visit or Ask a Question',
  description:
    'Reach the Dentelo care team by phone, email, or message. Request appointments, ask clinical questions, or get insurance support.',
};

export default function ContactPage(): ReactElement {
  return (
    <main>
      <article>
        <section
          className="section hero"
          style={heroBackground}
          aria-label="Contact hero"
        >
          <div className="container">
            <div className="hero-content">
              <p className="section-subtitle">{heroSubtitle}</p>
              <h1 className="h1 hero-title">{heroTitle}</h1>
              <p className="hero-text">{heroDescription}</p>
              <Link href="#appointment" className="btn">
                Request appointment
              </Link>
            </div>
          </div>
        </section>

        <section className="section contact" aria-label="Contact details">
          <div className="container">
            <div className="contact-grid">
              <div className="contact-card">
                <h2 className="h2 section-title">Clinic information</h2>
                <p className="card-text">
                  {clinicAddress.split('\n').map(line => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                <ContactChannels className="contact-info" />
                <div className="map-embed" aria-label="Clinic location map">
                  <iframe
                    title="Dentelo clinic location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.4634733669594!2d80.35278071508768!3d26.89257398314217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399959d0fd78373f%3A0xa7fac1397d5d4f6d!2sLDA%20Colony%2C%20Kanpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1672833835714!5m2!1sen!2sin"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="contact-card" id="appointment">
                <h2 className="h2 section-title">Send us a message</h2>
                <p className="card-text">{contactFormIntro}</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section
          className="section faq"
          aria-label="Frequently asked questions"
        >
          <div className="container">
            <p className="section-subtitle text-center">Quick answers</p>
            <h2 className="h2 section-title text-center">Patient FAQs</h2>
            <FaqList />
          </div>
        </section>

        <section className="section cta" aria-label="Consultation CTA">
          <div className="container">
            <figure className="cta-banner">
              <Image
                src="/assets/images/cta-banner.png"
                width={1056}
                height={1076}
                alt="Dentist writing notes"
                className="w-100"
              />
            </figure>
            <div className="cta-content">
              <p className="section-subtitle">Need a second opinion?</p>
              <h2 className="h2 section-title">{consultationCtaDescription}</h2>
              <BookAppointmentButton className="btn">
                Book a consultation
              </BookAppointmentButton>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
