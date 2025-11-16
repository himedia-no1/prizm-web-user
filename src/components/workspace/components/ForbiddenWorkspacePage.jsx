import Link from 'next/link';
import { Lock } from '@/components/common/icons';
import styles from './ForbiddenWorkspacePage.module.css';
import { useMessages } from 'next-intl';

export function ForbiddenWorkspacePage() {
  const messages = useMessages();
  const t = messages?.workspace?.forbidden;

  if (!t) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <Lock size={28} />
        </div>
        <h1 className={styles.title}>{t.title}</h1>
        <p className={styles.description}>
          {t.description1}
          {t.description2}
        </p>

        <div className={styles.actions}>
          <Link href="/src/app/(app)/workspace/new" className={`${styles.button} ${styles.primary}`}>
            {t.createWorkspaceButton}
          </Link>
          <Link href="/src/app/(app)/workspace/new?mode=join" className={`${styles.button} ${styles.secondary}`}>
            {t.enterInviteCodeButton}
          </Link>
        </div>

        <div className={styles.meta}>
          <p>{t.metaDescription}</p>
          <Link href="/src/app/(app)/login" className={styles.link}>
            {t.loginWithAnotherAccount}
          </Link>
        </div>
      </div>
    </div>
  );
}
