import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';
import Script from 'next/script';
import type { ReactElement, ReactNode } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { AppointmentModal } from '@/components/modals/AppointmentModal';
import { BackToTopButton } from '@/components/ui/BackToTopButton';
import { AppointmentModalProvider } from '@/contexts/AppointmentModalContext';
import '@/styles/globals.scss';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TDental | Compassionate Dental Care',
  description:
    'TDental delivers advanced, patient-first dental care with a focus on comfort, technology, and lasting smiles.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  return (
    <html lang="en" className={`${roboto.variable} ${poppins.variable}`}>
      <body suppressHydrationWarning>
        <AppointmentModalProvider>
          <Header />
          {children}
          <Footer />
          <BackToTopButton />
          <AppointmentModal />
        </AppointmentModalProvider>

        {/* Ion Icons */}
        <Script
          type="module"
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"
          strategy="afterInteractive"
        />
        <Script
          noModule
          src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
