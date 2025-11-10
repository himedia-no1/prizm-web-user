import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { strings } from '@/shared/constants/strings';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: strings.en,
      },
      ko: {
        translation: strings.ko,
      },
    },
    lng: 'ko',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
