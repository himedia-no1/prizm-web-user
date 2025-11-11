'use client';

import Image from 'next/image';
import { Google, GitHub, Microsoft } from '@/components/common/icons';
import useStrings from '@/shared/hooks/useStrings';
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
  const s = useStrings();

  const avatarSrc = user.avatar || getPlaceholderImage(72, user?.realName?.[0] ?? '?');

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.profile?.title ?? '내 프로필'}</h2>
      <p className={styles.description}>
        {s.userSettings?.profile?.description ?? '아바타와 기본 정보를 수정합니다.'}
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
          {s.userSettings?.profile?.avatarChange ?? '변경'}
        </button>
      </div>
      <div className="settings-form-group">
        <label htmlFor="realName">{s.userSettings?.profile?.nameLabel ?? '실제 이름'}</label>
        <input
          id="realName"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="settings-form-group">
        <label htmlFor="email">{s.userSettings?.profile?.emailLabel ?? '이메일'}</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="settings-form-group">
        <label>{s.userSettings?.profile?.socialLoginLabel ?? '소셜 로그인'}</label>
        <div className="social-login-info">
          {user.socialProvider === 'Google' && <Google size={20} />}
          {user.socialProvider === 'GitHub' && <GitHub size={20} />}
          {user.socialProvider === 'Microsoft' && <Microsoft size={20} />}
          <span>
            {user.socialProvider} {s.userSettings?.profile?.socialLoginSuffix ?? '(으)로 가입함'}
          </span>
        </div>
      </div>
      <button className="profile-modal__save-button">
        {s.userSettings?.profile?.saveButton ?? '변경사항 저장'}
      </button>

      <div className={styles.actions}>
        <div
          className={styles.actionCard}
        >
          <h3 className={styles.actionTitle}>
            {s.userSettings?.profile?.deactivateTitle ?? '계정 비활성화'}
          </h3>
          <p className={styles.actionDescription}>
            {s.userSettings?.profile?.deactivateDescription ??
              '데이터를 유지한 채 일시적으로 계정을 잠급니다.'}
          </p>
          <button
            type="button"
            className={`profile-modal__save-button ${styles.deactivateButton}`}
            onClick={onDeactivate}
          >
            {s.userSettings?.profile?.deactivateButton ?? '계정 비활성화'}
          </button>
        </div>
        <div
          className={styles.deleteCard}
        >
          <h3 className={styles.deleteTitle}>
            {s.userSettings?.profile?.deleteTitle ?? '계정 삭제'}
          </h3>
          <p className={styles.deleteDescription}>
            {s.userSettings?.profile?.deleteDescription ??
              '계정과 관련 데이터를 영구적으로 삭제합니다.'}
          </p>
          <button
            type="button"
            className={`profile-modal__save-button ${styles.deleteButton}`}
            onClick={onDelete}
          >
            {s.userSettings?.profile?.deleteButton ?? '계정 삭제'}
          </button>
        </div>
      </div>
    </div>
  );
};
