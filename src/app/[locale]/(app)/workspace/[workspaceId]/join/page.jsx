import Link from 'next/link';
import { callBff } from '@/shared/server/bffClient';
import styles from './join.module.css';
import { getMessagesForLocale } from '@/i18n/messages';

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

  const response = await callBff({ method: 'GET', url: `/mock/workspaces/${workspaceId}/summary` });
  if (response.status === 404) {
    return (
      <div className={styles.container}>
        <p>{t?.workspaceNotFound}</p>
        <Link href="/workspace/new" className={styles.link}>{t?.createWorkspaceLink}</Link>
      </div>
    );
  }

  const workspace = response.data;

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
