import { ArrowLeft } from '@/components/common/icons';
import styles from '../WorkspaceSettings.module.css';
import { useMessages } from 'next-intl';

export const WorkspaceHeader = ({ workspaceName, onBack, title }) => {
  const messages = useMessages();
  const t = messages?.common;

  return (
    <header className={styles.header}>
      <button onClick={onBack} className={styles.backButton} aria-label={t?.back}>
        <ArrowLeft size={20} />
      </button>
      <div className={styles.title}>
        <h1>{title}</h1>
        <p className={styles.workspaceName}>{workspaceName}</p>
      </div>
    </header>
  );
};
