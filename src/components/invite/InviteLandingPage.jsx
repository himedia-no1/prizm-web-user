'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMessages, useLocale } from 'next-intl';
import { Users, GitHub, Google } from '@/components/common/icons';
import { inviteService } from '@/core/api/services';
import { refreshSession } from '@/shared/lib/authClient';
import UserProfileHeader from '@/components/common/UserProfileHeader';
import styles from './InviteLandingPage.module.css';

const LANGUAGES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'fr', label: 'Français' },
];

export default function InviteLandingPage({ inviteCode }) {
  const router = useRouter();
  const locale = useLocale();
  const messages = useMessages();
  const t = messages?.invite;
  const [workspace, setWorkspace] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingWorkspace, setLoadingWorkspace] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchInviteInfo = async () => {
      setLoadingWorkspace(true);
      try {
        const info = await inviteService.getInviteInfo(inviteCode);
        if (!info) {
          router.replace('/');
          return;
        }
        if (!cancelled) {
          setWorkspace(info);
        }
      } catch (err) {
        console.error('Failed to load invite info:', err);
        router.replace('/');
      } finally {
        if (!cancelled) {
          setLoadingWorkspace(false);
        }
      }
    };

    fetchInviteInfo();
    return () => {
      cancelled = true;
    };
  }, [inviteCode, router]);

  useEffect(() => {
    let cancelled = false;

    const attemptRefresh = async () => {
      try {
        await refreshSession();
        if (!cancelled) {
          setIsLoggedIn(true);
        }
      } catch {
        if (!cancelled) {
          setIsLoggedIn(false);
        }
      } finally {
        if (!cancelled) {
          setIsCheckingSession(false);
        }
      }
    };

    attemptRefresh();
    return () => {
      cancelled = true;
    };
  }, []);

  const memberCount = 0;
  const inviterName = 'Someone';

  const handleJoinWorkspace = async () => {
    setError(null);
    setIsProcessing(true);
    try {
      const data = await inviteService.joinByInvite(inviteCode);
      router.push(`/workspace/${data.workspaceId}/dashboard`);
    } catch (err) {
      console.error('Error joining workspace:', err);
      setError(t?.joinFailed || 'Failed to join workspace. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleProviderLogin = (provider) => {
    const providerLower = provider.toLowerCase();
    const redirectUrl = `/api/auth/oauth2/${providerLower}?invite=${inviteCode}`;
    window.location.href = redirectUrl;
  };

  const handleLanguageChange = async (event) => {
    const newLocale = event.target.value;
    try {
      await fetch('/api/locale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: newLocale }),
      });
      router.refresh();
    } catch (err) {
      console.error('Failed to change locale:', err);
    }
  };

  const renderActions = () => {
    if (isCheckingSession || loadingWorkspace) {
      return (
        <div className={styles.loadingState}>
          <div className="spinner" />
          <span>{t?.loading || 'Loading...'}</span>
        </div>
      );
    }

    if (isLoggedIn) {
      return (
        <button
          onClick={handleJoinWorkspace}
          className={styles.joinButton}
          disabled={isProcessing}
        >
          {isProcessing ? t?.processing || 'Processing...' : t?.joinWorkspace || 'Join Workspace'}
        </button>
      );
    }

    return (
      <>
        <button
          onClick={() => handleProviderLogin('google')}
          className={styles.socialButton}
        >
          <Google size={20} />
          {t?.continueWithGoogle || 'Continue with Google'}
        </button>
        <button
          onClick={() => handleProviderLogin('github')}
          className={styles.socialButton}
        >
          <GitHub size={20} />
          {t?.continueWithGitHub || 'Continue with GitHub'}
        </button>
      </>
    );
  };

  if (loadingWorkspace) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className="spinner" />
          <span>{t?.loading || 'Loading...'}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {isLoggedIn && (
        <div className={styles.header}>
          <UserProfileHeader />
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.workspaceAvatar}>
          {workspace?.imageUrl ? (
            <img src={workspace.imageUrl} alt={workspace.name} />
          ) : (
            <div className={styles.workspaceAvatarPlaceholder}>
              {workspace?.name?.charAt(0)?.toUpperCase() || 'W'}
            </div>
          )}
        </div>

        <h1 className={styles.workspaceName}>{workspace?.name || 'Workspace'}</h1>

        <div className={styles.inviterInfo}>
          <span className={styles.inviterText}>
            {t?.invitedBy || 'Invited by'} <strong>{inviterName}</strong>
          </span>
        </div>

        <div className={styles.memberCount}>
          <Users size={16} />
          <span>
            {memberCount || 0} {t?.members || 'members'}
          </span>
        </div>

        <p className={styles.description}>
          {isLoggedIn
            ? t?.joinDescription || 'Join this workspace to collaborate with your team'
            : (t?.loginAndJoin || 'Log in and join') +
              ' ' +
              (workspace?.name || 'this workspace')}
        </p>

        <div className={styles.actions}>{renderActions()}</div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.languageSelector}>
          <select value={locale} onChange={handleLanguageChange} className={styles.languageSelect}>
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.branding}>
        <p className={styles.brandingText}>
          {t?.poweredBy || 'Powered by'} <strong>Prizm</strong>
        </p>
      </div>
    </div>
  );
}
