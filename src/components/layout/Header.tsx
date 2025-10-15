'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import {
  IoCallOutline,
  IoCloseSharp,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoMailOutline,
  IoMenuSharp,
} from 'react-icons/io5';

import { useAppointmentModal } from '@/contexts/AppointmentModalContext';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#service' },
  { label: 'About Us', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '/contact' },
] as const;

const SOCIAL_LINKS = [
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
  {
    href: 'https://www.youtube.com/@TDental',
    label: 'YouTube',
    icon: <IoLogoYoutube />,
  },
] as const;

export function Header(): ReactElement {
  const pathname = usePathname();
  const { open } = useAppointmentModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const headerBottomClassName = useMemo(() => {
    const classNames = ['header-bottom'];
    if (isSticky) {
      classNames.push('active');
    }
    return classNames.join(' ');
  }, [isSticky]);

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <ul className="contact-list">
            <li className="contact-item">
              <IoMailOutline aria-hidden="true" color="hsl(225, 68%, 53%)" />
              <a href="mailto:info@TDental.com" className="contact-link">
                info@TDental.com
              </a>
            </li>
            <li className="contact-item">
              <IoCallOutline aria-hidden="true" color="hsl(225, 68%, 53%)" />
              <a href="tel:+917052101786" className="contact-link">
                +91-7052-101-786
              </a>
            </li>
          </ul>

          <ul className="social-list" aria-label="Follow TDental">
            {SOCIAL_LINKS.map(social => (
              <li key={social.href}>
                <a
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={headerBottomClassName} data-header>
        <div className="container">
          <Link href="/" className="logo" aria-label="TDental Home">
            TDental.
          </Link>

          <nav
            className={`navbar container${isMenuOpen ? ' active' : ''}`}
            data-navbar
          >
            <ul className="navbar-list">
              {NAV_LINKS.map(nav => {
                const isActive =
                  nav.href === '/'
                    ? pathname === nav.href
                    : pathname.startsWith(nav.href);

                return (
                  <li key={nav.href}>
                    <Link
                      href={nav.href}
                      className={`navbar-link${isActive ? ' active' : ''}`}
                      data-nav-link
                    >
                      {nav.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button type="button" className="btn" onClick={open}>
            Book appointment
          </button>

          <button
            className={`nav-toggle-btn${isMenuOpen ? ' active' : ''}`}
            aria-label="Toggle menu"
            data-nav-toggler
            onClick={() => setIsMenuOpen(prev => !prev)}
            type="button"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <IoCloseSharp aria-hidden="true" className="close-icon" />
            ) : (
              <IoMenuSharp aria-hidden="true" className="menu-icon" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
