import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import '../globals.css';
import AppWrapper from '../AppWrapper';
import { getMessagesForLocale } from '@/i18n/messages';
import { SUPPORTED_LOCALES } from '@/i18n/config';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'PRIZM - AI 기반 개발자 협업 메신저',
  description: 'AI-powered developer collaboration messenger',
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  const messages = await getMessagesForLocale(locale);

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppWrapper>
            <div id="root">{children}</div>
          </AppWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
