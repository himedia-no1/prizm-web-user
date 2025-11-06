import { useMemo } from 'react';
import useStore from '@/store/useStore';
import { strings, stringDomains } from '@/constants/strings';

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
