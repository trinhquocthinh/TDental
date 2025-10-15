import Link from 'next/link';
import type { ReactElement } from 'react';
import {
  IoAddOutline,
  IoCallOutline,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMailOutline,
  IoTimeOutline,
} from 'react-icons/io5';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Patient Stories', href: '/services#case-studies' },
  { label: 'Our Team', href: '/about#team' },
  { label: 'Latest Blog', href: '/blog' },
] as const;

const servicesLinks = [
  { label: 'Root Canal', href: '/services#service-root-canal' },
  { label: 'Alignment Teeth', href: '/services#service-alignment' },
  { label: 'Cosmetic Teeth', href: '/services#service-cosmetic' },
  { label: 'Oral Hygiene', href: '/services#service-hygiene' },
  { label: 'Live Advisory', href: '/services#service-advisory' },
  { label: 'Cavity Inspection', href: '/services#service-cavity' },
] as const;

const socialLinks = [
  {
    href: 'https://www.facebook.com/TDental',
    label: 'Facebook',
    icon: <IoLogoFacebook />,
  },
  {
    href: 'https://www.instagram.com/TDental',
    label: 'Instagram',
    icon: <IoLogoInstagram />,
  },
  {
    href: 'https://twitter.com/TDental',
    label: 'Twitter',
    icon: <IoLogoTwitter />,
  },
] as const;

export function Footer(): ReactElement {
  return (
    <footer className="footer">
      <div className="footer-top section">
        <div className="container">
          <div className="footer-brand">
            <Link href="/" className="logo">
              TDental.
            </Link>

            <p className="footer-text">
              Mauris non nisi semper, lacinia neque in, dapibus leo. Curabitur
              sagittis libero tincidunt tempor finibus. Mauris at dignissim
              ligula, nec tristique orci. Quisque vitae metus.
            </p>

            <div className="schedule">
              <span className="schedule-icon">
                <IoTimeOutline aria-hidden="true" />
              </span>
              <span className="span">
                Monday - Saturday:
                <br />
                9:00am - 10:00pm
              </span>
            </div>
          </div>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Other Links</p>
            </li>
            {quickLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  <IoAddOutline aria-hidden="true" />
                  <span className="span">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Our Services</p>
            </li>
            {servicesLinks.map(item => (
              <li key={item.href}>
                <Link href={item.href} className="footer-link">
                  <IoAddOutline aria-hidden="true" />
                  <span className="span">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Contact Us</p>
            </li>
            <li className="footer-item">
              <span className="item-icon">
                <IoLocationOutline aria-hidden="true" />
              </span>
              <address className="item-text">
                1247/Plot No. 39, 15th Phase,
                <br />
                LHB Colony, Kanpur
              </address>
            </li>
            <li className="footer-item">
              <span className="item-icon">
                <IoCallOutline aria-hidden="true" />
              </span>
              <a href="tel:+917052101786" className="footer-link">
                +91-7052-101-786
              </a>
            </li>
            <li className="footer-item">
              <span className="item-icon">
                <IoMailOutline aria-hidden="true" />
              </span>
              <a href="mailto:help@TDental.com" className="footer-link">
                help@TDental.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; {new Date().getFullYear()} TDental. All rights reserved.
          </p>

          <ul className="social-list">
            {socialLinks.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="social-link"
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
