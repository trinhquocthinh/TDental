'use client';

import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { IoCaretUp } from 'react-icons/io5';

export function BackToTopButton(): ReactElement {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`back-top-btn${isVisible ? ' active' : ''}`}
      aria-label="Back to top"
      onClick={handleClick}
    >
      <IoCaretUp aria-hidden="true" />
    </button>
  );
}
