'use client';

import { useState } from 'react';
import type { FormEvent, ReactElement } from 'react';

export function HeroCallBackForm(): ReactElement {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>(
    'idle'
  );
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') {
      return;
    }

    setStatus('submitting');
    setFeedback('');

    const formData = new FormData(event.currentTarget);
    const email = (formData.get('email_address') ?? '').toString().trim();

    window.setTimeout(() => {
      setStatus('success');
      setFeedback(
        email
          ? `Thanks! We'll call you at the details linked to ${email} within a day.`
          : `Thanks! We'll call you soon.`
      );
      event.currentTarget.reset();
    }, 500);
  };

  return (
    <form className="hero-form" onSubmit={handleSubmit}>
      <label htmlFor="hero-email" className="visually-hidden">
        Email Address
      </label>
      <input
        id="hero-email"
        type="email"
        name="email_address"
        aria-label="Email address"
        placeholder="Your Email Address..."
        required
        className="email-field"
      />
      <button type="submit" className="btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Get Call Back'}
      </button>
      <span
        className="form-feedback"
        role="status"
        aria-live="polite"
        data-visible={status === 'success'}
      >
        {feedback}
      </span>
    </form>
  );
}
