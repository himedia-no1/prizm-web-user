'use client';

import { useState } from 'react';
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

  const avatarSrc = user.profileImage || getPlaceholderImage(72, user?.name?.[0] ?? '?');
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);

  const handlePhotoUpload = async (file) => {
    try {
      const updateData = { profileImage: file };
      if (username !== user.name) {
        updateData.name = username;
      }
      await userService.updateProfile(updateData);
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
        <img
          src={avatarSrc}
          alt={user?.name || user?.email || 'Profile'}
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
        <label htmlFor="name">{s.userSettings?.profile?.nameLabel}</label>
        <input
          id="name"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="settings-form-group">
        <label htmlFor="email">{s.userSettings?.profile?.emailLabel}</label>
        <div className={styles.emailInputWrapper}>
          <input id="email" type="email" value={email} readOnly disabled />
          {user.authProvider === 'GOOGLE' && <Google size={20} className={styles.providerIcon} />}
          {user.authProvider === 'GITHUB' && <GitHub size={20} className={styles.providerIcon} />}
          {user.authProvider === 'MICROSOFT' && <Microsoft size={20} className={styles.providerIcon} />}
        </div>
      </div>
      <button
        className="profile-modal__save-button"
        onClick={async () => {
          try {
            await userService.updateProfile({ name: username });
            // TODO: Show success message and update user state
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
