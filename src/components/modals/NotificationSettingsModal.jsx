'use client';

import { useState } from 'react';
import { useMessages } from 'next-intl';
import { X, Bell, BellOff } from '@/components/common/icons';
import styles from './NotificationSettingsModal.module.css';

export const NotificationSettingsModal = ({ isOpen, onClose, channelName, currentSettings = {} }) => {
  const messages = useMessages();
  const t = messages?.modals?.notificationSettings;

  const [notificationLevel, setNotificationLevel] = useState(currentSettings.level || 'all');
  const [muteUntil, setMuteUntil] = useState(currentSettings.muteUntil || 'unmuted');

  const handleSave = () => {
    // TODO: API 호출하여 알림 설정 저장
    console.log('Saving notification settings:', { notificationLevel, muteUntil });
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Bell size={20} />
            <div>
              <h3>{t?.title || 'Notification Settings'}</h3>
              <p className={styles.channelName}>#{channelName}</p>
            </div>
          </div>
          <button onClick={onClose} className={styles.closeButton}>
            <X size={18} />
          </button>
        </header>

        <div className={styles.content}>
          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {t?.notificationLevel || 'Notification Level'}
            </h4>

            <div className={styles.optionGroup}>
              <label className={`${styles.option} ${notificationLevel === 'all' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="notificationLevel"
                  value="all"
                  checked={notificationLevel === 'all'}
                  onChange={(e) => setNotificationLevel(e.target.value)}
                  className={styles.radio}
                />
                <div className={styles.optionContent}>
                  <div className={styles.optionHeader}>
                    <Bell size={18} />
                    <span className={styles.optionTitle}>
                      {t?.allMessages || 'All Messages'}
                    </span>
                  </div>
                  <p className={styles.optionDescription}>
                    {t?.allMessagesDesc || 'Get notified for every new message'}
                  </p>
                </div>
              </label>

              <label className={`${styles.option} ${notificationLevel === 'mentions' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="notificationLevel"
                  value="mentions"
                  checked={notificationLevel === 'mentions'}
                  onChange={(e) => setNotificationLevel(e.target.value)}
                  className={styles.radio}
                />
                <div className={styles.optionContent}>
                  <div className={styles.optionHeader}>
                    <span className={styles.optionTitle}>
                      {t?.mentionsOnly || '@mentions Only'}
                    </span>
                  </div>
                  <p className={styles.optionDescription}>
                    {t?.mentionsOnlyDesc || 'Only get notified when you are mentioned'}
                  </p>
                </div>
              </label>

              <label className={`${styles.option} ${notificationLevel === 'nothing' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="notificationLevel"
                  value="nothing"
                  checked={notificationLevel === 'nothing'}
                  onChange={(e) => setNotificationLevel(e.target.value)}
                  className={styles.radio}
                />
                <div className={styles.optionContent}>
                  <div className={styles.optionHeader}>
                    <BellOff size={18} />
                    <span className={styles.optionTitle}>
                      {t?.nothing || 'Nothing'}
                    </span>
                  </div>
                  <p className={styles.optionDescription}>
                    {t?.nothingDesc || 'Do not get notified for any messages'}
                  </p>
                </div>
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <h4 className={styles.sectionTitle}>
              {t?.muteChannel || 'Mute Channel'}
            </h4>

            <div className={styles.optionGroup}>
              <label className={`${styles.option} ${muteUntil === 'unmuted' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="muteUntil"
                  value="unmuted"
                  checked={muteUntil === 'unmuted'}
                  onChange={(e) => setMuteUntil(e.target.value)}
                  className={styles.radio}
                />
                <div className={styles.optionContent}>
                  <span className={styles.optionTitle}>
                    {t?.unmuted || 'Unmuted'}
                  </span>
                </div>
              </label>

              <label className={`${styles.option} ${muteUntil === '15min' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="muteUntil"
                  value="15min"
                  checked={muteUntil === '15min'}
                  onChange={(e) => setMuteUntil(e.target.value)}
                  className={styles.radio}
                />
                <div className={styles.optionContent}>
                  <span className={styles.optionTitle}>
                    {t?.for15min || 'For 15 minutes'}
                  </span>
                </div>
              </label>

              <label className={`${styles.option} ${muteUntil === '1hour' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="muteUntil"
                  value="1hour"
                  checked={muteUntil === '1hour'}
                  onChange={(e) => setMuteUntil(e.target.value)}
                  className={styles.radio}
                />
                <div className={styles.optionContent}>
                  <span className={styles.optionTitle}>
                    {t?.for1hour || 'For 1 hour'}
                  </span>
                </div>
              </label>

              <label className={`${styles.option} ${muteUntil === '24hours' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="muteUntil"
                  value="24hours"
                  checked={muteUntil === '24hours'}
                  onChange={(e) => setMuteUntil(e.target.value)}
                  className={styles.radio}
                />
                <div className={styles.optionContent}>
                  <span className={styles.optionTitle}>
                    {t?.for24hours || 'For 24 hours'}
                  </span>
                </div>
              </label>

              <label className={`${styles.option} ${muteUntil === 'forever' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="muteUntil"
                  value="forever"
                  checked={muteUntil === 'forever'}
                  onChange={(e) => setMuteUntil(e.target.value)}
                  className={styles.radio}
                />
                <div className={styles.optionContent}>
                  <span className={styles.optionTitle}>
                    {t?.untilITurnItBackOn || 'Until I turn it back on'}
                  </span>
                </div>
              </label>
            </div>
          </section>
        </div>

        <div className={styles.actions}>
          <button
            onClick={onClose}
            className={styles.cancelButton}
            type="button"
          >
            {t?.cancel || 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            className={styles.saveButton}
            type="button"
          >
            {t?.save || 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};
