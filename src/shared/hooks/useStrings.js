import { useMemo } from 'react';
import useStore from '@/core/store/useStore';
import { strings, stringDomains } from '@/shared/constants/strings';

export const useStrings = (domainKey) => {
  const language = useStore((state) => state.language);

  return useMemo(() => {
    if (domainKey && stringDomains[domainKey]) {
      return stringDomains[domainKey][language] ?? stringDomains[domainKey].en ?? {};
    }
    return strings[language] ?? strings.en;
  }, [language, domainKey]);
};

export default useStrings;
