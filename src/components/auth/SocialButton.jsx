'use client';

import React from 'react';
import { useMessages } from 'next-intl';
import styles from './SocialButton.module.css';

const defaultOauthUrls = {
  GitHub:
    'https://github.com/app/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user:email',
  Google:
    'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email%20profile',
};

export default function SocialButton({ icon, provider, onClick, disabled = false }) {
  const messages = useMessages();
  const t = messages?.common;

  const handleClick = () => {
    if (disabled) {
      return;
    }

    if (onClick) {
      onClick(provider);
      return;
    }

    const url = defaultOauthUrls[provider];
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <button className={styles.button} onClick={handleClick} disabled={disabled}>
      {icon}
      <span>{t?.continueWith?.replace('{provider}', provider) ?? `Continue with ${provider}`}</span>
    </button>
  );
}
