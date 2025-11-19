'use client';

import { AIIcon } from '@/components/common/icons';
import styles from './AIFab.module.css';

export const AIFab = ({ onClick }) => (
  <button type="button" onClick={onClick} className={styles.aiFab} aria-label="Open AI Assistant">
    <AIIcon size={24} />
  </button>
);
