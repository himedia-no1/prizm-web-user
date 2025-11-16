'use client';

import LanguageSelector from '@/components/common/LanguageSelector';
import styles from '../SocialAuthPage.module.css';

export const AuthLegalFooter = ({ localeStrings, locale, onLocaleChange }) => (
  <div className={styles.footer}>
    <p>
      {localeStrings.terms.split(localeStrings.termsOfService)[0]}
      <a href="#" className={styles.link}>
        {localeStrings.termsOfService}
      </a>{' '}
      {localeStrings.terms.includes(localeStrings.privacyPolicy) && localeStrings.privacyPolicy && (
        <>
          {localeStrings.terms.split(localeStrings.termsOfService)[1]?.split(localeStrings.privacyPolicy)[0]}
          <a href="#" className={styles.link}>
            {localeStrings.privacyPolicy}
          </a>
          {localeStrings.terms.split(localeStrings.privacyPolicy)[1]}
        </>
      )}
    </p>
    <div className={styles.languageSelectorWrapper}>
      <LanguageSelector locale={locale} onLocaleChange={onLocaleChange} variant="footer" />
    </div>
  </div>
);

export default AuthLegalFooter;
