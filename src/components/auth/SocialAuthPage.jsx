'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Github } from 'lucide-react';
import { SocialProviderList } from '@/components/auth/components/SocialProviderList';
import { AuthLegalFooter } from '@/components/auth/components/AuthLegalFooter';
import { useAuthStore } from '@/core/store/authStore';
import { useUIStore } from '@/core/store/shared';
import { useLocale, useMessages } from 'next-intl';
import { setPreferredLocale } from '@/shared/lib/locale';
import { inviteService } from '@/core/api/services';
import { authenticateWithProvider } from './actions';
import styles from './SocialAuthPage.module.css';

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const providerOrder = ['Google', 'GitHub'];

export default function SocialAuthPage({ searchParams }) {
  const router = useRouter();
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();
  const oauthHandledRef = useRef(false);
  const locale = useLocale();
  const messages = useMessages();
  const localeStrings = messages?.common ?? {};
  const authStrings = messages?.common?.auth ?? {};

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/workspace');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const provider = searchParams?.provider;
    const code = searchParams?.code;
    const inviteCode = searchParams?.inviteCode;

    if (!provider || !code || oauthHandledRef.current) {
      return;
    }

    oauthHandledRef.current = true;

    startTransition(async () => {
      try {
        const session = await authenticateWithProvider(provider);
        setAuthState(session);

        // If there's an invite code, auto-join workspace
        if (inviteCode) {
          try {
            const data = await inviteService.joinByInvite(inviteCode);
            router.replace(`/workspace/${data.workspaceId}/dashboard`);
            return;
          } catch (joinErr) {
            console.error('Failed to join workspace after login:', joinErr);
          }
        }

        // Default redirect if no invite or join failed
        router.replace('/workspace');
      } catch (err) {
        setError(authStrings.loginError || 'Login failed. Please try again.');
      }
    });
  }, [searchParams, router, setAuthState, authStrings.loginError]);

  const theme = isDarkMode ? 'dark' : 'light';

  const handleLocaleChange = async (targetLocale) => {
    if (targetLocale === locale) {
      return;
    }
    try {
      await setPreferredLocale(targetLocale);
      router.refresh();
    } catch (err) {
      console.error('Failed to update locale', err);
    }
  };

  const handleProviderLogin = (provider) => {
    setError(null);
    const inviteCode = searchParams?.invite;
    const providerLower = provider.toLowerCase();
    const redirectUrl = inviteCode
      ? `/api/auth/oauth2/${providerLower}?invite=${inviteCode}`
      : `/api/auth/oauth2/${providerLower}`;
    window.location.href = redirectUrl;
  };

  return (
    <div className={`${styles.page} ${styles[theme]}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Image src="/icon.png" alt="Prizm Logo" width={48} height={48} />
          <h1>{localeStrings.welcome}</h1>
          <p>{localeStrings.startWithSocial}</p>
        </div>

        <SocialProviderList
          providers={providerOrder.map((provider) => ({
            name: provider,
            icon: provider === 'Google' ? <GoogleIcon /> : <Github size={24} />,
          }))}
          disabled={isPending}
          onProviderClick={handleProviderLogin}
        />

        {error && <p className={styles.errorMessage}>{error}</p>}

        {isPending && (
          <div className={styles.loadingState}>
            <div className="spinner" />
            <span>{authStrings.loggingIn || 'Logging in...'}</span>
          </div>
        )}

        <AuthLegalFooter
          localeStrings={localeStrings}
          locale={locale}
          onLocaleChange={handleLocaleChange}
        />
      </div>
    </div>
  );
}
