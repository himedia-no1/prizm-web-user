'use client';

import SocialButton from '@/components/auth/SocialButton';
import styles from '../SocialAuthPage.module.css';

export const SocialProviderList = ({ providers, disabled, onProviderClick }) => (
  <div className={styles.socialButtons}>
    {providers.map(({ name, icon }) => (
      <SocialButton
        key={name}
        icon={icon}
        provider={name}
        onClick={onProviderClick}
        disabled={disabled}
      />
    ))}
  </div>
);

export default SocialProviderList;
