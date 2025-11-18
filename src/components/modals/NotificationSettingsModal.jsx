'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMessages } from 'next-intl';
import { X, Bell, BellOff } from '@/components/common/icons';
import { channelService } from '@/core/api/services';
import styles from './NotificationSettingsModal.module.css';

export const NotificationSettingsModal = ({ isOpen, onClose, channelId, channelName, currentSettings = {} }) => {
  const params = useParams();
  const workspaceId = params?.workspaceId;
  const messages = useMessages();
  const t = messages?.modals?.notificationSettings;

  const [notificationLevel, setNotificationLevel] = useState(currentSettings.level || 'all');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!workspaceId || !channelId) return;

    setIsSaving(true);
    try {
      // Map UI level to API notifyType: all -> ON, mentions -> MENTION, nothing -> OFF
      const notifyTypeMap = {
        all: 'ON',
        mentions: 'MENTION',
        nothing: 'OFF'
      };
      await channelService.updateChannelNotify(workspaceId, channelId, notifyTypeMap[notificationLevel]);
      onClose?.();
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    } finally {
      setIsSaving(false);
    }
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
            disabled={isSaving}
          >
            {isSaving ? (t?.saving || 'Saving...') : (t?.save || 'Save Settings')}
          </button>
        </div>
      </div>
    </div>
  );
};
