'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMessages } from 'next-intl';
import { workspaceService } from '@/core/api/services';
import { refreshSession } from '@/shared/lib/authClient';
import styles from './join.module.css';

export default function WorkspaceJoinClient({ workspaceId }) {
  const messages = useMessages();
  const t = messages?.workspace?.joinPage;
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchWorkspace = async () => {
      setLoading(true);
      try {
        await refreshSession();
        if (cancelled) {
          return;
        }
        setIsLoggedIn(true);
        try {
          const data = await workspaceService.getWorkspace(workspaceId);
          if (!cancelled) {
            setWorkspace(data ?? null);
          }
        } catch (fetchError) {
          if (!cancelled) {
            setWorkspace(null);
          }
        }
      } catch (error) {
        if (!cancelled) {
          setIsLoggedIn(false);
          setWorkspace(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (workspaceId) {
      fetchWorkspace();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [workspaceId]);

  if (!workspaceId) {
    return (
      <div className={styles.container}>
        <p>{t?.invalidWorkspace || 'Invalid workspace link.'}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <p>{t?.loading || 'Loading workspace...'}</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <p>{t?.loginRequired || 'Please log in to view this workspace.'}</p>
          <div className={styles.actions}>
            <Link href="/login" className={styles.primary}>
              {t?.loginWithAnotherAccount || 'Log in'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className={styles.container}>
        <p>{t?.workspaceNotFound || 'Workspace not found.'}</p>
        <Link href="/workspace/new" className={styles.link}>
          {t?.createWorkspaceLink || 'Create a workspace'}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{t?.inviteTitle?.replace('{workspaceName}', workspace.name)}</h1>
        <p>{t?.inviteDescription}</p>
        <div className={styles.actions}>
          <Link
            href={`/workspace/new?mode=join&workspaceId=${workspace.id}`}
            className={styles.primary}
          >
            {t?.enterInviteCodeButton}
          </Link>
          <Link href="/login" className={styles.secondary}>
            {t?.loginWithAnotherAccount}
          </Link>
        </div>
      </div>
    </div>
  );
}
