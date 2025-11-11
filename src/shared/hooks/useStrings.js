import { useLocale, useMessages } from 'next-intl';
import { stringDomains } from '@/shared/constants/strings';
import { DEFAULT_LOCALE } from '@/i18n/config';

export const useStrings = (domainKey) => {
  const locale = useLocale();
  const messages = useMessages();

  // 도메인 키가 제공된 경우, 해당 도메인의 문자열만 반환
  if (domainKey && stringDomains[domainKey]) {
    const domain = stringDomains[domainKey];
    return domain[locale] ?? domain[DEFAULT_LOCALE] ?? domain.en ?? {};
  }

  // 도메인 키가 없으면 next-intl messages 반환 (네임스페이스 구조)
  // messages는 { common: {...}, modals: {...}, ... } 형태
  return messages ?? {};
};

export default useStrings;
