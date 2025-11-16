'use client';

import { useUIStore } from '@/core/store/shared';

export const useAutoTranslateSetting = () => {
  const autoTranslateEnabled = useUIStore((state) => state.autoTranslateEnabled);
  const toggleAutoTranslate = useUIStore((state) => state.toggleAutoTranslate);
  const setAutoTranslate = useUIStore((state) => state.setAutoTranslate);

  return {
    autoTranslateEnabled,
    toggleAutoTranslate,
    setAutoTranslate,
  };
};

export default useAutoTranslateSetting;
