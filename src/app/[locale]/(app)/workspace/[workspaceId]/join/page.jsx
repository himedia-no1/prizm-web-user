import Link from 'next/link';
import axios from 'axios';
import { cookies } from 'next/headers';
import styles from './join.module.css';
import { getMessagesForLocale } from '@/i18n/messages';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const { data } = await axios.post(`${BACKEND_URL}/api/auth/refresh`, null, {
      headers: { Cookie: `refresh_token=${refreshToken}` },
    });
    return data?.accessToken ?? null;
  } catch (error) {
    return null;
  }
}

export default async function WorkspaceJoinPage({ params }) {
  const { workspaceId } = (await params) ?? {};
  const messages = await getMessagesForLocale(params.locale);
  const t = messages?.workspace?.joinPage;

  if (!workspaceId) {
    return (
      <div className={styles.container}>
        <p>{t?.invalidWorkspace}</p>
      </div>
    );
  }

  const accessToken = await refreshAccessToken();
  let workspace = null;

  if (accessToken) {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/workspaces/${workspaceId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      workspace = data;
    } catch (error) {
      if (error.response?.status === 404) {
        return (
          <div className={styles.container}>
            <p>{t?.workspaceNotFound}</p>
            <Link href="/workspace/new" className={styles.link}>{t?.createWorkspaceLink}</Link>
          </div>
        );
      }
    }
  }

  if (!workspace) {
    return (
      <div className={styles.container}>
        <p>{t?.workspaceNotFound}</p>
        <Link href="/workspace/new" className={styles.link}>{t?.createWorkspaceLink}</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{t?.inviteTitle?.replace('{workspaceName}', workspace.name)}</h1>
        <p>{t?.inviteDescription}</p>
        <div className={styles.actions}>
          <Link href={`/workspace/new?mode=join&workspaceId=${workspace.id}`} className={styles.primary}>
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
