'use client';

import styles from './ai.module.css';
import LearningControl from '@/components/settings/ai/LearningControl';
import LearningDataManagement from '@/components/settings/ai/LearningDataManagement';
import AiModelSettings from '@/components/settings/ai/AiModelSettings';
import LogsHistory from '@/components/settings/ai/LogsHistory';
import SystemManagement from '@/components/settings/ai/SystemManagement';

export default function AIAssistantClient() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>⚙️ 학습 제어 영역</h2>
        <LearningControl />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>📚 학습 데이터 관리 영역</h2>
        <LearningDataManagement />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>🧠 AI 모델 / 설정 영역</h2>
        <AiModelSettings />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>🧾 로그 / 이력 영역</h2>
        <LogsHistory />
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>🔐 시스템 관리 / 보안 영역</h2>
        <SystemManagement />
      </div>
    </div>
  );
}
