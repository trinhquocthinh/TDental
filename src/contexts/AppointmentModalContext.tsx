'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactElement, ReactNode } from 'react';

type AppointmentModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const AppointmentModalContext =
  createContext<AppointmentModalContextValue | null>(null);

export function AppointmentModalProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev: boolean) => !prev), []);

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      toggle,
    }),
    [close, isOpen, open, toggle]
  );

  return (
    <AppointmentModalContext.Provider value={value}>
      {children}
    </AppointmentModalContext.Provider>
  );
}

export function useAppointmentModal(): AppointmentModalContextValue {
  const context = useContext(AppointmentModalContext);

  if (!context) {
    throw new Error(
      'useAppointmentModal must be used within an AppointmentModalProvider'
    );
  }

  return context;
}
