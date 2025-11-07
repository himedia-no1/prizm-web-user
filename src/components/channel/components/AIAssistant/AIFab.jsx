import { AIIcon } from '@/components/common/icons';
import styles from './AIFab.module.css';

export const AIFab = ({ onClick }) => (
  <button onClick={onClick} className={styles.aiFab}>
    <AIIcon size={28} />
  </button>
);
