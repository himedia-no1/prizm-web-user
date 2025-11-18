import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import AppWrapper from '../AppWrapper';
import { getMessagesForLocale } from '@/i18n/messages';
import { SUPPORTED_LOCALES } from '@/i18n/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessagesForLocale(locale);
  const t = messages?.common;

  return {
    title: t?.appTitle,
    description: 'AI-powered developer collaboration messenger',
  };
}

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
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppWrapper>
        <div id="root">{children}</div>
      </AppWrapper>
    </NextIntlClientProvider>
  );
}
