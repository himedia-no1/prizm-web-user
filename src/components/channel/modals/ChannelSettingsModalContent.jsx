'use client';

import React, { useState } from 'react';
import { useMessages } from 'next-intl';
import styles from './ChannelSettingsModalContent.module.css';

export const ChannelSettingsModalContent = ({
  channelDetails = {},
  onSave,
  onClose
}) => {
  const messages = useMessages();
  const t = messages?.modals?.channelSettings ?? {};

  const [name, setName] = useState(channelDetails.name || '');
  const [topic, setTopic] = useState(channelDetails.topic || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await onSave?.({ name, topic });
      onClose?.();
    } catch (error) {
      console.error('Failed to save channel settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.channelSettings}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="channelName" className={styles.label}>
            {t.nameLabel || 'Channel Name'}
          </label>
          <input
            id="channelName"
            type="text"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder || 'Enter channel name'}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="channelTopic" className={styles.label}>
            {t.topicLabel || 'Channel Topic'}
          </label>
          <textarea
            id="channelTopic"
            className={styles.textarea}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={t.topicPlaceholder || 'Enter channel topic (optional)'}
            rows={4}
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
            disabled={isSaving}
          >
            {t.cancelButton || 'Cancel'}
          </button>
          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSaving}
          >
            {isSaving ? (t.savingButton || 'Saving...') : (t.saveButton || 'Save')}
          </button>
        </div>
      </form>
    </div>
  );
};
