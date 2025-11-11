import { useLocale, useMessages } from 'next-intl';
import { stringDomains, strings } from '@/shared/constants/strings';
import { DEFAULT_LOCALE } from '@/i18n/config';

export const useStrings = (domainKey) => {
  const locale = useLocale();
  const messages = useMessages();

  if (domainKey && stringDomains[domainKey]) {
    const domain = stringDomains[domainKey];
    return domain[locale] ?? domain[DEFAULT_LOCALE] ?? domain.en ?? {};
  }

  return messages ?? strings[locale] ?? strings[DEFAULT_LOCALE] ?? {};
};

export default useStrings;
