// src/app/layout.tsx
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl'; // Correct import
import { getLocale } from 'next-intl/server'; // Server-side utility
import { locales, Messages } from './i18n';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Special Needs Parent Chatbot',
  description: 'Support for parents of special needs children',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale(); // Resolve locale server-side

  // Load messages server-side based on resolved locale
  const messages: Messages = locales.includes(locale as any)
    ? (await import(`./messages/${locale}.json`)).default
    : (await import('./messages/en.json')).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}