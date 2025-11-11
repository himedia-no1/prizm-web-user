import { ArrowLeft } from '@/components/common/icons';
import styles from '../WorkspaceSettings.module.css';

export const WorkspaceHeader = ({ workspaceName, onBack, title }) => {
  return (
    <header className={styles.header}>
      <button onClick={onBack} className={styles.backButton} aria-label="뒤로 가기">
        <ArrowLeft size={20} />
      </button>
      <div className={styles.title}>
        <h1>{title}</h1>
        <p className={styles.workspaceName}>{workspaceName}</p>
      </div>
    </header>
  );
};
