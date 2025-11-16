import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './src/i18n/config.js';

const withPrefixHidden = {
  locales: SUPPORTED_LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'never',
};

export default withPrefixHidden;
