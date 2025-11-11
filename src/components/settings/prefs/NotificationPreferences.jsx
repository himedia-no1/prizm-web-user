'use client';

import { useMemo, useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './Preferences.module.css';

export const NotificationPreferences = ({ value = 'all', onChange }) => {
  const messages = useMessages();
  const notificationStrings = messages?.userSettings?.preferences?.notifications;
  const options = useMemo(
    () => [
      { id: 'all', label: notificationStrings?.options?.all ?? '모든 활동에 대해 알림' },
      { id: 'mentions', label: notificationStrings?.options?.mentions ?? '멘션 및 DM만' },
      { id: 'none', label: notificationStrings?.options?.none ?? '알림 끄기' },
    ],
    [notificationStrings],
  );
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (id) => {
    setLocalValue(id);
    onChange?.(id);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{notificationStrings?.title ?? '알림 설정'}</h3>
      <p className={styles.description}>{notificationStrings?.description ?? '데스크톱 및 앱 알림을 관리하세요.'}</p>
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
