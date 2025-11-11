import { strings } from '@/shared/constants/strings';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config';

const messagesByLocale = SUPPORTED_LOCALES.reduce((acc, locale) => {
  if (strings[locale]) {
    acc[locale] = strings[locale];
  }
  return acc;
}, {});

export const getMessagesForLocale = (locale) => {
  return messagesByLocale[locale] ?? strings[DEFAULT_LOCALE] ?? {};
};
