'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type SubmissionState = 'idle' | 'success' | 'submitting';

type NewsletterSignupProps = {
  className?: string;
};

type NewsletterFormData = {
  newsletter_email: string;
};

const successCopy = 'Thanks! Look out for your first newsletter soon.';

const newsletterSchema = yup.object().shape({
  newsletter_email: yup
    .string()
    .required('Email address is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
});

export function NewsletterSignup({ className }: NewsletterSignupProps) {
  const [state, setState] = useState<SubmissionState>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: yupResolver(newsletterSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setState('submitting');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // eslint-disable-next-line no-console
    console.log('Newsletter subscription:', data);

    setState('success');
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setState('idle');
    }, 5000);
  };

  const formClassName = className ? `${className} hero-form` : 'hero-form';
  const hasError = Boolean(errors.newsletter_email);

  return (
    <form
      className={formClassName}
      aria-label="Newsletter sign-up"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="newsletter-input-wrapper">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Your Email Address..."
          className={`email-field ${hasError ? 'input-error' : ''}`}
          aria-describedby={
            hasError ? 'newsletter-error' : 'newsletter-feedback'
          }
          aria-invalid={hasError}
          disabled={state === 'submitting'}
          {...register('newsletter_email')}
        />
        {hasError && (
          <div className="newsletter-error" id="newsletter-error" role="alert">
            <ion-icon name="alert-circle-outline" aria-hidden="true" />
            <span>{errors.newsletter_email?.message}</span>
          </div>
        )}
      </div>

      <button type="submit" className="btn" disabled={state === 'submitting'}>
        {state === 'submitting' ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Subscribing...
          </>
        ) : (
          'Subscribe'
        )}
      </button>

      {state === 'success' && (
        <div
          id="newsletter-feedback"
          role="status"
          aria-live="polite"
          className="newsletter-success"
        >
          <ion-icon name="checkmark-circle-outline" aria-hidden="true" />
          <span>{successCopy}</span>
        </div>
      )}
    </form>
  );
}
