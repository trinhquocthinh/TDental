'use client';

import { useMemo, useState } from 'react';

import { appointmentDoctors, appointmentServices } from '@/data/contact';

const successMessage =
  'Thanks for reaching out! Our care coordinator will contact you within one business hour.';
const errorMessage =
  'Please fill in the required fields so we can respond to your message.';

type SubmissionState = 'idle' | 'success' | 'error';

type ContactFormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  name: string;
  required?: boolean;
  options?: ReadonlyArray<{ value: string; label: string }>;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email';
  rows?: number;
};

const messageFields: ContactFormField[] = [
  {
    id: 'contact-name',
    label: 'Full Name',
    name: 'contact_name',
    type: 'text',
    required: true,
    autoComplete: 'name',
  },
  {
    id: 'contact-email',
    label: 'Email Address',
    name: 'contact_email',
    type: 'email',
    required: true,
    autoComplete: 'email',
  },
  {
    id: 'contact-phone',
    label: 'Phone Number',
    name: 'contact_phone',
    type: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
  },
  {
    id: 'contact-subject',
    label: 'Subject',
    name: 'contact_subject',
    type: 'text',
    required: true,
  },
  {
    id: 'contact-service',
    label: 'Service of Interest',
    name: 'contact_service',
    type: 'select',
    options: appointmentServices.map(service => ({
      value: service,
      label: service,
    })),
  },
  {
    id: 'contact-doctor',
    label: 'Preferred Dentist',
    name: 'contact_doctor',
    type: 'select',
    options: appointmentDoctors.map(doctorId => ({
      value: doctorId,
      label: doctorId
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
    })),
  },
  {
    id: 'contact-message',
    label: 'How can we help?',
    name: 'contact_message',
    type: 'textarea',
    required: true,
    rows: 4,
  },
];

function isValid(formData: FormData): boolean {
  const requiredFields = [
    'contact_name',
    'contact_email',
    'contact_subject',
    'contact_message',
  ];

  for (const field of requiredFields) {
    const value = (formData.get(field) ?? '').toString().trim();
    if (!value) {
      return false;
    }
  }

  const email = (formData.get('contact_email') ?? '').toString().trim();

  return email.includes('@');
}

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>('idle');

  const feedback = useMemo(() => {
    if (state === 'success') {
      return successMessage;
    }

    if (state === 'error') {
      return errorMessage;
    }

    return '';
  }, [state]);

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={event => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (!isValid(formData)) {
          setState('error');
          return;
        }

        setState('success');
        event.currentTarget.reset();
      }}
    >
      {messageFields.map(field => {
        const inputId = field.id;
        const isRequired = field.required ?? false;

        const baseProps = {
          className: 'input-field',
          id: inputId,
          name: field.name,
        } as const;

        let inputElement: JSX.Element;

        if (field.type === 'textarea') {
          inputElement = (
            <textarea
              {...baseProps}
              required={isRequired}
              rows={field.rows ?? 4}
              onInput={() => {
                if (state !== 'idle') {
                  setState('idle');
                }
              }}
            />
          );
        } else if (field.type === 'select') {
          inputElement = (
            <select
              {...baseProps}
              onChange={() => {
                if (state !== 'idle') {
                  setState('idle');
                }
              }}
            >
              <option value="">No preference</option>
              {field.options?.map(option => (
                <option
                  value={option.value}
                  key={`${field.id}-${option.value}`}
                >
                  {option.label}
                </option>
              ))}
            </select>
          );
        } else {
          inputElement = (
            <input
              {...baseProps}
              type={field.type}
              required={isRequired}
              autoComplete={field.autoComplete}
              inputMode={field.inputMode}
              onInput={() => {
                if (state !== 'idle') {
                  setState('idle');
                }
              }}
            />
          );
        }

        return (
          <div className="form-row" key={field.id}>
            <label className="form-label" htmlFor={inputId}>
              {field.label}
              {isRequired ? <span aria-hidden="true">*</span> : null}
            </label>
            {inputElement}
          </div>
        );
      })}

      <button type="submit" className="btn">
        Send message
      </button>
      <p className="form-feedback" role="status" aria-live="polite">
        {feedback}
      </p>
    </form>
  );
}
