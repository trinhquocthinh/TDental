'use client';

import { useMemo, useState } from 'react';

type SubmissionState = 'idle' | 'success' | 'error';

type NewsletterSignupProps = {
  className?: string;
};

const successCopy = 'Thanks! Look out for your first newsletter soon.';
const errorCopy = 'Please enter a valid email address to subscribe.';

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [state, setState] = useState<SubmissionState>('idle');

  const feedback = useMemo(() => {
    if (state === 'success') {
      return successCopy;
    }

    if (state === 'error') {
      return errorCopy;
    }

    return '';
  }, [state]);

  const formClassName = className ? `${className} hero-form` : 'hero-form';

  return (
    <form
      className={formClassName}
      aria-label="Newsletter sign-up"
      noValidate
      onSubmit={event => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const email = (formData.get('newsletter_email') ?? '')
          .toString()
          .trim();

        const isValidEmail = email.length > 3 && email.includes('@');

        if (!isValidEmail) {
          setState('error');
          return;
        }

        setState('success');
        form.reset();
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="newsletter_email"
        placeholder="Your Email Address..."
        required
        className="email-field"
        aria-describedby="newsletter-feedback"
        onInput={() => {
          if (state !== 'idle') {
            setState('idle');
          }
        }}
      />
      <button type="submit" className="btn">
        Subscribe
      </button>
      <p
        id="newsletter-feedback"
        role="status"
        aria-live="polite"
        className="form-feedback"
      >
        {feedback}
      </p>
    </form>
  );
}
