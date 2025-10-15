'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  ReactElement,
} from 'react';
import { createPortal } from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';

import { useAppointmentModal } from '@/contexts/AppointmentModalContext';

type FormState = 'idle' | 'submitting' | 'success';

type AppointmentFormFields = {
  full_name: string;
  phone: string;
  email: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  notes: string;
  consent: 'on' | undefined;
};

const focusableSelectors =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function AppointmentModal(): ReactElement | null {
  const { isOpen, close } = useAppointmentModal();
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [feedback, setFeedback] = useState<string>('');
  const modalRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove('modal-open');
      return;
    }

    document.body.classList.add('modal-open');
    const modalElement = modalRef.current;

    if (modalElement) {
      const toFocus =
        (modalElement.querySelector(
          '[data-focus-default]'
        ) as HTMLElement | null) ??
        (modalElement.querySelector(focusableSelectors) as HTMLElement | null);

      if (toFocus) {
        toFocus.focus({ preventScroll: true });
      }
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement || !isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements =
        modalElement.querySelectorAll(focusableSelectors);
      if (focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0] as HTMLElement;
      const last = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const focusBack = lastFocusedElement.current;
      if (focusBack) {
        focusBack.focus({ preventScroll: true });
      }
      lastFocusedElement.current = null;
      return;
    }

    lastFocusedElement.current = document.activeElement as HTMLElement | null;

    const dateInput =
      modalRef.current?.querySelector<HTMLInputElement>('#input-date');
    if (dateInput) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dateInput.min = today.toISOString().split('T')[0];
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFormState('idle');
      setFeedback('');
    }
  }, [isOpen]);

  const handleOverlayClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (event.target === overlayRef.current) {
        close();
      }
    },
    [close]
  );

  const handleOverlayKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.target !== overlayRef.current) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        close();
      }
    },
    [close]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (formState === 'submitting') {
        return;
      }

      setFormState('submitting');
      setFeedback('');

      const formData = new FormData(event.currentTarget);
      const values: Partial<AppointmentFormFields> = {};
      formData.forEach((value, key) => {
        values[key as keyof AppointmentFormFields] = value as never;
      });
      const displayName = (values.full_name ?? '').toString().trim() || 'there';

      await new Promise(resolve => {
        window.setTimeout(resolve, 600);
      });

      event.currentTarget.reset();

      const dateInput =
        event.currentTarget.querySelector<HTMLInputElement>('#input-date');
      if (dateInput) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dateInput.min = today.toISOString().split('T')[0];
      }
      setFormState('success');
      setFeedback(
        `Thanks ${displayName}, our care team will reach out within 24 hours.`
      );

      const focusTarget = modalRef.current?.querySelector<HTMLElement>(
        '[data-focus-default]'
      );
      focusTarget?.focus({ preventScroll: true });
    },
    [formState]
  );

  const containerClassName = useMemo(
    () => `modal-container${isOpen ? ' active' : ''}`,
    [isOpen]
  );

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={containerClassName}
      role="presentation"
      hidden={!isOpen}
      aria-hidden={!isOpen}
    >
      <div
        className="modal-overlay"
        ref={overlayRef}
        role="button"
        tabIndex={0}
        aria-label="Close appointment modal"
        data-modal-overlay
        onClick={handleOverlayClick}
        onKeyDown={handleOverlayKeyDown}
      />
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="appointment-title"
        aria-describedby="appointment-description"
        ref={modalRef}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close appointment form"
          onClick={close}
        >
          <IoCloseOutline aria-hidden="true" />
        </button>

        <p className="section-subtitle modal-subtitle">Schedule Your Visit</p>
        <h2 className="h2 modal-title" id="appointment-title">
          Book a Dental Appointment
        </h2>
        <p className="modal-text" id="appointment-description">
          Share a few details and our care team will reach out to confirm the
          best time for your visit.
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="input-name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="input-name"
                name="full_name"
                placeholder="e.g. Jane Doe"
                required
                autoComplete="name"
                data-focus-default
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label htmlFor="input-phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="input-phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                required
                autoComplete="tel"
                inputMode="tel"
                pattern="\\+?[0-9()\\s-]{7,}"
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label htmlFor="input-email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="input-email"
                name="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label htmlFor="select-service" className="form-label">
                Service Needed
              </label>
              <select
                id="select-service"
                name="service"
                required
                className="input-field"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="root-canal">Root Canal Therapy</option>
                <option value="alignment">Alignment Teeth</option>
                <option value="cosmetic">Cosmetic Dentistry</option>
                <option value="oral-hygiene">Oral Hygiene</option>
                <option value="advisory">Live Advisory</option>
                <option value="cavity">Cavity Inspection</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="select-doctor" className="form-label">
                Preferred Dentist
              </label>
              <select
                id="select-doctor"
                name="doctor"
                className="input-field"
                defaultValue=""
              >
                <option value="">No preference</option>
                <option value="howard-holmes">Howard Holmes</option>
                <option value="ella-thompson">Ella Thompson</option>
                <option value="vincent-cooper">Vincent Cooper</option>
                <option value="danielle-bryant">Danielle Bryant</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="input-date" className="form-label">
                Preferred Date
              </label>
              <input
                type="date"
                id="input-date"
                name="date"
                required
                autoComplete="off"
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label htmlFor="input-time" className="form-label">
                Preferred Time
              </label>
              <input
                type="time"
                id="input-time"
                name="time"
                required
                autoComplete="off"
                min="09:00"
                max="22:00"
                step={900}
                className="input-field"
              />
            </div>

            <div className="form-field form-field--full">
              <label htmlFor="input-notes" className="form-label">
                Notes &amp; Concerns
              </label>
              <textarea
                id="input-notes"
                name="notes"
                placeholder="Tell us about symptoms, insurance, or any other preferences..."
                rows={3}
                className="input-field"
              />
            </div>
          </div>

          <label className="form-consent">
            <input type="checkbox" name="consent" required />
            <span>
              I consent to TDental storing my information for appointment
              scheduling.
            </span>
          </label>

          <button
            type="submit"
            className="btn modal-submit"
            data-state={formState}
            disabled={formState === 'submitting'}
          >
            {formState === 'submitting' ? 'Sending...' : 'Submit Request'}
          </button>

          <p
            className="form-feedback"
            role="status"
            aria-live="polite"
            data-visible={formState === 'success'}
          >
            {feedback}
          </p>

          <p className="form-disclaimer">
            For urgent dental needs, please call us directly at{' '}
            <a href="tel:+917052101786">+91-7052-101-786</a>.
          </p>
        </form>
      </section>
    </div>,
    document.body
  );
}
