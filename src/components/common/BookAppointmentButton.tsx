'use client';

import type {
  ButtonHTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';

import { useAppointmentModal } from '@/contexts/AppointmentModalContext';

interface BookAppointmentButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function BookAppointmentButton({
  children,
  className,
  type = 'button',
  onClick,
  ...props
}: BookAppointmentButtonProps): ReactElement {
  const { open } = useAppointmentModal();

  return (
    <button
      type={type}
      className={className}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          open();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
