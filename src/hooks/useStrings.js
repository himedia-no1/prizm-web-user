import { useMemo } from 'react';
import useStore from '@/store/useStore';
import { strings } from '@/constants/strings';

export const useStrings = () => {
  const language = useStore((state) => state.language);

  return useMemo(() => strings[language] ?? strings.en, [language]);
};

export default useStrings;
