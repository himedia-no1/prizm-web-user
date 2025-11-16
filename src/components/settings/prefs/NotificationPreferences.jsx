'use client';

import { useMemo, useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './Preferences.module.css';

export const NotificationPreferences = ({ value = 'all', onChange }) => {
  const messages = useMessages();
  const notificationStrings = messages?.userSettings?.preferences?.notifications;
  const options = useMemo(
    () => [
      { id: 'all', label: notificationStrings?.options?.all },
      { id: 'mentions', label: notificationStrings?.options?.mentions },
      { id: 'none', label: notificationStrings?.options?.none },
    ],
    [notificationStrings],
  );
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (id) => {
    setLocalValue(id);
    onChange?.(id);
  };

  if (!notificationStrings) {
    return null;
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{notificationStrings?.title}</h3>
      <p className={styles.description}>{notificationStrings?.description}</p>
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
