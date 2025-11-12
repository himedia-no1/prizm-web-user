'use client';

import { useMessages } from 'next-intl';
import LearningControl from '@/components/settings/ai/LearningControl';
import LearningDataManagement from '@/components/settings/ai/LearningDataManagement';
import AiModelSettings from '@/components/settings/ai/AiModelSettings';
import LogsHistory from '@/components/settings/ai/LogsHistory';
import SystemManagement from '@/components/settings/ai/SystemManagement';
import styles from './AIAssistantTab.module.css';

export const AIAssistantTab = () => {
  const messages = useMessages();
  const ai = messages?.workspaceManagement?.ai ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.learningControl?.title ?? '학습 제어 영역'}</h2>
        <LearningControl />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.learningData?.title ?? '학습 데이터 관리 영역'}</h2>
        <LearningDataManagement />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.modelSettings?.title ?? 'AI 모델 / 설정 영역'}</h2>
        <AiModelSettings />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.logs?.title ?? '로그 / 이력 영역'}</h2>
        <LogsHistory />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{ai.system?.title ?? '시스템 관리 / 보안 영역'}</h2>
        <SystemManagement />
      </div>
    </div>
  );
};
