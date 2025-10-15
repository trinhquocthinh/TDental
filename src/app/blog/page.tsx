import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactElement } from 'react';
import { IoCalendarOutline } from 'react-icons/io5';

import { NewsletterSignup } from '@/components/forms/NewsletterSignup';
import { blogArticles } from '@/data/blog';

const heroBackground: CSSProperties = {
  backgroundImage: "url('/assets/images/blog-1.jpg')",
};

const heroSubtitle = 'Dental Wellness';
const heroTitle = 'Insights to Keep Your Smile Thriving';
const heroDescription =
  'Expert-written guides, clinical updates, and home-care tips to help you make informed decisions about preventive and cosmetic dentistry.';

export const metadata: Metadata = {
  title: 'Dentelo Blog - Dental Wellness Guides & News',
  description:
    'Read the latest evidence-based articles from Dentelo dentists on preventive care, aligner tips, cosmetic smile design, and more.',
};

export default function BlogPage(): ReactElement {
  return (
    <main>
      <article>
        <section
          className="section hero"
          style={heroBackground}
          aria-label="Blog hero"
        >
          <div className="container">
            <div className="hero-content">
              <p className="section-subtitle">{heroSubtitle}</p>
              <h1 className="h1 hero-title">{heroTitle}</h1>
              <p className="hero-text">{heroDescription}</p>
              <Link href="#post-1" className="btn">
                Browse latest articles
              </Link>
            </div>
          </div>
        </section>

        <section className="section blog" aria-label="Blog articles">
          <div className="container">
            <p className="section-subtitle text-center">Latest Posts</p>
            <h2 className="h2 section-title text-center">
              News &amp; Resources
            </h2>
            <ul className="blog-list">
              {blogArticles.map(article => (
                <li key={article.id} id={article.id}>
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
                        src={article.image}
                        width={1180}
                        height={800}
                        alt={article.imageAlt}
                        className="img-cover"
                      />
                      <div className="card-badge">
                        <IoCalendarOutline aria-hidden="true" />
                        <time className="time" dateTime={article.date}>
                          {article.displayDate}
                        </time>
                      </div>
                    </figure>
                    <div className="card-content">
                      <h3 className="h3">
                        <span className="card-title">{article.title}</span>
                      </h3>
                      {article.paragraphs.map(paragraph => (
                        <p
                          className="card-text"
                          key={`${article.id}-${paragraph.slice(0, 10)}`}
                        >
                          {paragraph}
                        </p>
                      ))}
                      <Link href={article.ctaHref} className="card-link">
                        {article.ctaLabel}
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section cta" aria-label="Subscribe CTA">
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
              <p className="section-subtitle">Stay in the loop</p>
              <h2 className="h2 section-title">
                Get monthly dental wellness insights straight to your inbox
              </h2>
              <NewsletterSignup />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
