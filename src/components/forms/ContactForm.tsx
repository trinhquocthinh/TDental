'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const successMessage =
  'Thanks for reaching out! Our care coordinator will contact you within one business hour.';

type SubmissionState = 'idle' | 'success' | 'submitting';

type ContactFormField = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  name: keyof ContactFormData;
  required?: boolean;
  options?: ReadonlyArray<{ value: string; label: string }>;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email';
  rows?: number;
  placeholder?: string;
};

type ContactFormData = {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_subject: string;
  contact_message: string;
};

// Validation schema with Yup
const contactSchema = yup.object().shape({
  contact_name: yup
    .string()
    .required('Please enter your full name')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .matches(
      /^[a-zA-Z\s'-]+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  contact_email: yup
    .string()
    .required('Please enter your email address')
    .email('Please enter a valid email address')
    .max(255, 'Email must not exceed 255 characters'),
  contact_phone: yup
    .string()
    .required('Please enter your phone number')
    .matches(
      /^[+]?[(]?\d{1,4}[)]?[-\s.]?[(]?\d{1,4}[)]?[-\s.]?\d{1,9}$/,
      'Please enter a valid phone number'
    ),
  contact_subject: yup
    .string()
    .required('Please enter a subject')
    .min(3, 'Subject must be at least 3 characters')
    .max(200, 'Subject must not exceed 200 characters'),
  contact_message: yup
    .string()
    .required('Please tell us how we can help you')
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters'),
});

const messageFields: ContactFormField[] = [
  {
    id: 'contact-name',
    label: 'Full Name',
    name: 'contact_name',
    type: 'text',
    required: true,
    autoComplete: 'name',
    placeholder: 'John Doe',
  },
  {
    id: 'contact-email',
    label: 'Email Address',
    name: 'contact_email',
    type: 'email',
    required: true,
    autoComplete: 'email',
    placeholder: 'john.doe@example.com',
  },
  {
    id: 'contact-phone',
    label: 'Phone Number',
    name: 'contact_phone',
    type: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
    required: true,
    placeholder: '+91-7052-101-786',
  },
  {
    id: 'contact-subject',
    label: 'Subject',
    name: 'contact_subject',
    type: 'text',
    required: true,
    placeholder: 'Appointment inquiry',
  },
  {
    id: 'contact-message',
    label: 'How can we help?',
    name: 'contact_message',
    type: 'textarea',
    required: true,
    rows: 4,
    placeholder: 'Please describe your concern or inquiry...',
  },
];

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setState('submitting');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would typically send the data to your API
    // eslint-disable-next-line no-console
    console.log('Form submitted:', data);

    setState('success');
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setState('idle');
    }, 5000);
  };

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit(onSubmit)}>
      {messageFields.map(field => {
        const inputId = field.id;
        const isRequired = field.required ?? false;
        const fieldError = errors[field.name];
        const hasError = Boolean(fieldError);

        const baseProps = {
          className: `input-field ${hasError ? 'input-error' : ''}`,
          id: inputId,
          placeholder: field.placeholder,
          disabled: isSubmitting,
          'aria-invalid': hasError,
          'aria-describedby': hasError ? `${inputId}-error` : undefined,
        } as const;

        let inputElement: JSX.Element;

        if (field.type === 'textarea') {
          inputElement = (
            <textarea
              {...baseProps}
              {...register(field.name)}
              rows={field.rows ?? 4}
            />
          );
        } else if (field.type === 'select') {
          inputElement = (
            <select {...baseProps} {...register(field.name)}>
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
              autoComplete={field.autoComplete}
              inputMode={field.inputMode}
              {...register(field.name)}
            />
          );
        }

        return (
          <div className="form-row" key={field.id}>
            <label className="form-label" htmlFor={inputId}>
              {field.label}
              {isRequired ? (
                <span className="contact-require" aria-hidden="true">
                  *
                </span>
              ) : null}
            </label>
            {inputElement}
            {hasError && (
              <div className="field-error" id={`${inputId}-error`} role="alert">
                <ion-icon name="alert-circle-outline" aria-hidden="true" />
                <span>{fieldError?.message}</span>
              </div>
            )}
          </div>
        );
      })}

      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="btn-spinner" aria-hidden="true" />
            Sending...
          </>
        ) : (
          'Send message'
        )}
      </button>

      {state === 'success' && (
        <div className="form-success" role="status" aria-live="polite">
          <ion-icon name="checkmark-circle-outline" aria-hidden="true" />
          <span>{successMessage}</span>
        </div>
      )}
    </form>
  );
}
