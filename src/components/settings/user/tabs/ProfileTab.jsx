'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useMessages } from 'next-intl';
import { Google, GitHub, Microsoft } from '@/components/common/icons';
import { ProfilePhotoUploadModal } from '@/components/modals/ProfilePhotoUploadModal';
import { userService } from '@/core/api/services';
import styles from './ProfileTab.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const ProfileTab = ({
  user,
  username,
  setUsername,
  email,
  setEmail,
  onDelete
}) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  const avatarSrc = user.avatar || getPlaceholderImage(72, user?.realName?.[0] ?? '?');
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);

  const handlePhotoUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      if (username !== user.realName) {
        formData.append('realName', username);
      }
      await userService.updateProfile(formData);
      // TODO: Update user state after successful upload
    } catch (error) {
      console.error('Failed to upload profile photo:', error);
    }
  };

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.profile?.title}</h2>
      <p className={styles.description}>
        {s.userSettings?.profile?.description}
      </p>
      <div
        className={`profile-modal__avatar-section ${styles.avatarSection}`}
      >
        <Image
          src={avatarSrc}
          alt={user.realName}
          width={72}
          height={72}
          className={`profile-modal__avatar ${styles.avatar}`}
        />
        <button
          className={`profile-modal__avatar-edit ${styles.avatarEdit}`}
          onClick={() => setShowPhotoUploadModal(true)}
        >
          {s.userSettings?.profile?.avatarChange}
        </button>
      </div>
      <div className="settings-form-group">
        <label htmlFor="realName">{s.userSettings?.profile?.nameLabel}</label>
        <input
          id="realName"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="settings-form-group">
        <label htmlFor="email">{s.userSettings?.profile?.emailLabel}</label>
        <div className={styles.emailInputWrapper}>
          <input id="email" type="email" value={email} readOnly disabled />
          {user.socialProvider === 'Google' && <Google size={20} className={styles.providerIcon} />}
          {user.socialProvider === 'GitHub' && <GitHub size={20} className={styles.providerIcon} />}
          {user.socialProvider === 'Microsoft' && <Microsoft size={20} className={styles.providerIcon} />}
        </div>
      </div>
      <button
        className="profile-modal__save-button"
        onClick={async () => {
          try {
            const formData = new FormData();
            formData.append('realName', username);
            await userService.updateProfile(formData);
            // TODO: Show success message
          } catch (error) {
            console.error('Failed to update profile:', error);
          }
        }}
      >
        {s.userSettings?.profile?.saveButton}
      </button>

      <div className={styles.deleteSection}>
        <button
          type="button"
          className={styles.deleteLink}
          onClick={onDelete}
        >
          {s.userSettings?.profile?.deleteButton}
        </button>
      </div>

      <ProfilePhotoUploadModal
        isOpen={showPhotoUploadModal}
        onClose={() => setShowPhotoUploadModal(false)}
        onUpload={handlePhotoUpload}
        currentAvatar={avatarSrc}
      />
    </div>
  );
};
