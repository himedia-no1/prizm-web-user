'use client';

import { useMessages } from 'next-intl';
import LearningControl from '@/components/settings/ai/LearningControl';
import LearningDataManagement from '@/components/settings/ai/LearningDataManagement';
import LogsHistory from '@/components/settings/ai/LogsHistory';
import SystemManagement from '@/components/settings/ai/SystemManagement';
import styles from './AIAssistantTab.module.css';

export const AIAssistantTab = () => {
  const messages = useMessages();
  const ai = messages?.workspaceManagement?.ai;

  if (!ai) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.system?.title}</h2>
        <SystemManagement />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.learningControl?.title}</h2>
        <LearningControl />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.learningData?.title}</h2>
        <LearningDataManagement />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.logs?.title}</h2>
        <LogsHistory />
      </div>
    </div>
  );
};
