'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useMessages, useLocale } from 'next-intl';
import { Users, GitHub, Google } from '@/components/common/icons';
import { authenticateWithProvider } from '@/components/auth/actions';
import { useAuthStore } from '@/core/store/authStore';
import UserProfileHeader from '@/components/common/UserProfileHeader';
import styles from './InviteLandingPage.module.css';

const LANGUAGES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'fr', label: 'Français' }
];

export default function InviteLandingPage({
  inviteCode,
  workspace,
  inviter,
  memberCount,
  isLoggedIn
}) {
  const router = useRouter();
  const locale = useLocale();
  const messages = useMessages();
  const t = messages?.invite;
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const handleJoinWorkspace = async () => {
    // User is logged in - join workspace directly
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/workspaces/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteCode })
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/workspace/${data.workspaceId}/dashboard`);
      } else {
        console.error('Failed to join workspace');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error joining workspace:', error);
      setIsProcessing(false);
    }
  };

  const handleProviderLogin = (provider) => {
    setError(null);
    startTransition(async () => {
      try {
        // Authenticate with provider
        const session = await authenticateWithProvider(provider);
        setAuthState(session);

        // After login, join workspace
        try {
          const joinResponse = await fetch('/api/workspaces/join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inviteCode })
          });

          if (joinResponse.ok) {
            const data = await joinResponse.json();
            router.push(`/workspace/${data.workspaceId}/dashboard`);
            return;
          }
        } catch (joinErr) {
          console.error('Failed to join workspace after login:', joinErr);
        }

        // If join failed, redirect to workspace list
        router.push('/workspace');
      } catch (err) {
        console.error('Login error:', err);
        setError('Login failed. Please try again.');
      }
    });
  };

  const handleGoogleLogin = () => {
    handleProviderLogin('google');
  };

  const handleGitHubLogin = () => {
    handleProviderLogin('github');
  };

  const handleLanguageChange = async (e) => {
    const newLocale = e.target.value;

    try {
      // Update locale cookie via API
      await fetch('/api/locale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: newLocale })
      });

      // Refresh page to apply new locale
      router.refresh();
    } catch (error) {
      console.error('Failed to change locale:', error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header with user profile (only shown when logged in) */}
      {isLoggedIn && (
        <div className={styles.header}>
          <UserProfileHeader />
        </div>
      )}

      <div className={styles.card}>
        {/* Workspace Avatar */}
        <div className={styles.workspaceAvatar}>
          {workspace?.avatar ? (
            <img src={workspace.avatar} alt={workspace.name} />
          ) : (
            <div className={styles.workspaceAvatarPlaceholder}>
              {workspace?.name?.charAt(0)?.toUpperCase() || 'W'}
            </div>
          )}
        </div>

        {/* Workspace Info */}
        <h1 className={styles.workspaceName}>{workspace?.name || 'Workspace'}</h1>

        <div className={styles.inviterInfo}>
          <span className={styles.inviterText}>
            {t?.invitedBy || 'Invited by'} <strong>{inviter?.name || 'Someone'}</strong>
          </span>
        </div>

        <div className={styles.memberCount}>
          <Users size={16} />
          <span>
            {memberCount || 0} {t?.members || 'members'}
          </span>
        </div>

        {/* Description */}
        {isLoggedIn ? (
          <p className={styles.description}>
            {t?.joinDescription || 'Join this workspace to collaborate with your team'}
          </p>
        ) : (
          <p className={styles.description}>
            {t?.loginAndJoin || 'Log in and join'} <strong>{workspace?.name || 'this workspace'}</strong>
          </p>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          {isLoggedIn ? (
            <button
              onClick={handleJoinWorkspace}
              className={styles.joinButton}
              disabled={isProcessing}
            >
              {isProcessing ? (t?.processing || 'Processing...') : (t?.joinWorkspace || 'Join Workspace')}
            </button>
          ) : (
            <>
              <button
                onClick={handleGoogleLogin}
                className={styles.socialButton}
                disabled={isPending}
              >
                <Google size={20} />
                {t?.continueWithGoogle || 'Continue with Google'}
              </button>
              <button
                onClick={handleGitHubLogin}
                className={styles.socialButton}
                disabled={isPending}
              >
                <GitHub size={20} />
                {t?.continueWithGitHub || 'Continue with GitHub'}
              </button>
            </>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        {/* Language Selector */}
        <div className={styles.languageSelector}>
          <select
            value={locale}
            onChange={handleLanguageChange}
            className={styles.languageSelect}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Branding */}
      <div className={styles.branding}>
        <p className={styles.brandingText}>
          {t?.poweredBy || 'Powered by'} <strong>Prizm</strong>
        </p>
      </div>
    </div>
  );
}
