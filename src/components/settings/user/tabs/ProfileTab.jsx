'use client';

import { Google, GitHub, Microsoft } from '@/components/common/icons';
import useStrings from '@/hooks/useStrings';

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

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.profile?.title ?? '내 프로필'}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {s.userSettings?.profile?.description ?? '아바타와 기본 정보를 수정합니다.'}
      </p>
      <div
        className="profile-modal__avatar-section"
        style={{ marginTop: 0, marginBottom: '2rem', justifyContent: 'flex-start' }}
      >
        <img
          src={user.avatar}
          alt={user.realName}
          className="profile-modal__avatar"
          style={{ width: '100px', height: '100px', margin: 0 }}
        />
        <button
          className="profile-modal__avatar-edit"
          style={{ left: '75px', bottom: '5px', position: 'absolute' }}
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

      <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem' }}>
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: '0.85rem',
            padding: '1.25rem',
            background: 'var(--card-bg)',
            boxShadow: '0 1px 3px var(--shadow)',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>
            {s.userSettings?.profile?.deactivateTitle ?? '계정 비활성화'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
            {s.userSettings?.profile?.deactivateDescription ??
              '데이터를 유지한 채 일시적으로 계정을 잠급니다.'}
          </p>
          <button
            type="button"
            className="profile-modal__save-button"
            style={{ width: 'auto', backgroundColor: '#f59e0b' }}
            onClick={onDeactivate}
          >
            {s.userSettings?.profile?.deactivateButton ?? '계정 비활성화'}
          </button>
        </div>
        <div
          style={{
            border: '1px solid rgba(239, 68, 68, 0.35)',
            borderRadius: '0.85rem',
            padding: '1.25rem',
            background: 'rgba(239, 68, 68, 0.05)',
            boxShadow: '0 1px 3px rgba(239, 68, 68, 0.15)',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#b91c1c' }}>
            {s.userSettings?.profile?.deleteTitle ?? '계정 삭제'}
          </h3>
          <p style={{ color: '#b91c1c', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>
            {s.userSettings?.profile?.deleteDescription ??
              '계정과 관련 데이터를 영구적으로 삭제합니다.'}
          </p>
          <button
            type="button"
            className="profile-modal__save-button"
            style={{ width: 'auto', backgroundColor: '#ef4444' }}
            onClick={onDelete}
          >
            {s.userSettings?.profile?.deleteButton ?? '계정 삭제'}
          </button>
        </div>
      </div>
    </div>
  );
};
