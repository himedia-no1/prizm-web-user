import { stringDomains } from '@/shared/constants/strings';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config';

// next-intl 네임스페이스 구조로 변환
const messagesByLocale = SUPPORTED_LOCALES.reduce((acc, locale) => {
  acc[locale] = {};

  // 각 도메인을 네임스페이스로 추가
  Object.entries(stringDomains).forEach(([domainKey, domainStrings]) => {
    if (domainStrings[locale]) {
      acc[locale][domainKey] = domainStrings[locale];
    }
  });

  return acc;
}, {});

export const getMessagesForLocale = (locale) => {
  return messagesByLocale[locale] ?? messagesByLocale[DEFAULT_LOCALE] ?? {};
};
