'use client';

import Image from 'next/image';
import { useMessages } from 'next-intl';
import { Google, GitHub, Microsoft } from '@/components/common/icons';
import styles from './ProfileTab.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const ProfileTab = ({ 
  user, 
  username, 
  setUsername, 
  email, 
  setEmail,
  onDeactivate,
  onDelete 
}) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  const avatarSrc = user.avatar || getPlaceholderImage(72, user?.realName?.[0] ?? '?');

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
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="settings-form-group">
        <label>{s.userSettings?.profile?.socialLoginLabel}</label>
        <div className="social-login-info">
          {user.socialProvider === 'Google' && <Google size={20} />}
          {user.socialProvider === 'GitHub' && <GitHub size={20} />}
          {user.socialProvider === 'Microsoft' && <Microsoft size={20} />}
          <span>
            {user.socialProvider} {s.userSettings?.profile?.socialLoginSuffix}
          </span>
        </div>
      </div>
      <button className="profile-modal__save-button">
        {s.userSettings?.profile?.saveButton}
      </button>

      <div className={styles.actions}>
        <div
          className={styles.actionCard}
        >
          <h3 className={styles.actionTitle}>
            {s.userSettings?.profile?.deactivateTitle}
          </h3>
          <p className={styles.actionDescription}>
            {s.userSettings?.profile?.deactivateDescription}
          </p>
          <button
            type="button"
            className={`profile-modal__save-button ${styles.deactivateButton}`}
            onClick={onDeactivate}
          >
            {s.userSettings?.profile?.deactivateButton}
          </button>
        </div>
        <div
          className={styles.deleteCard}
        >
          <h3 className={styles.deleteTitle}>
            {s.userSettings?.profile?.deleteTitle}
          </h3>
          <p className={styles.deleteDescription}>
            {s.userSettings?.profile?.deleteDescription}
          </p>
          <button
            type="button"
            className={`profile-modal__save-button ${styles.deleteButton}`}
            onClick={onDelete}
          >
            {s.userSettings?.profile?.deleteButton}
          </button>
        </div>
      </div>
    </div>
  );
};
