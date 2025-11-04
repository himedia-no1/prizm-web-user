'use client';

import { useState } from 'react';
import styles from './Preferences.module.css';

const options = [
  { id: 'all', label: '모든 활동에 대해 알림' },
  { id: 'mentions', label: '멘션 및 DM만' },
  { id: 'none', label: '알림 끄기' },
];

export const NotificationPreferences = ({ value = 'all', onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (id) => {
    setLocalValue(id);
    onChange?.(id);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>알림 설정</h3>
      <p className={styles.description}>데스크톱 및 앱 알림을 관리하세요.</p>
      <div className={styles.optionList}>
        {options.map((option) => (
          <label key={option.id} className={styles.option}>
            <input
              type="radio"
              name="notification-preference"
              value={option.id}
              checked={localValue === option.id}
              onChange={() => handleChange(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
