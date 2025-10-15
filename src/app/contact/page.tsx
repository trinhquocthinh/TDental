import type { Metadata } from 'next';
import Image from 'next/image';
import type { CSSProperties, ReactElement } from 'react';

import { BookAppointmentButton } from '@/components/common/BookAppointmentButton';
import { ContactChannels } from '@/components/contact/ContactChannels';
import { FaqList } from '@/components/contact/FaqList';
import { ContactForm } from '@/components/forms/ContactForm';
import { clinicAddress } from '@/data/contact';

const heroBackground: CSSProperties = {
  backgroundImage: "url('/assets/images/hero-bg.png')",
};

const contactFormIntro =
  'Use the form below to ask a question, request records, or follow up on a recent visit.';

const consultationCtaDescription =
  "Share your previous records and we'll prepare a tailored treatment roadmap.";

export const metadata: Metadata = {
  title: 'Contact TDental - Schedule a Visit or Ask a Question',
  description:
    'Reach the TDental care team by phone, email, or message. Request appointments, ask clinical questions, or get insurance support.',
};

export default function ContactPage(): ReactElement {
  return (
    <main>
      <article>
        <section
          className="section contact"
          aria-label="Contact details"
          style={heroBackground}
        >
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
                    title="TDental clinic location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.468031403281!2d77.5715132871582!3d12.91626810000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae150954465937%3A0x84cc684257a3d44d!2sSamarthanam%20Trust%20For%20The%20Disabled!5e0!3m2!1svi!2s!4v1760511456296!5m2!1svi!2s"
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
