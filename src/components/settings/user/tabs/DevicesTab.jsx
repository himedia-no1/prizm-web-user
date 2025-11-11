'use client';

import { useMessages } from 'next-intl';
import styles from './DevicesTab.module.css';

export const DevicesTab = ({ deviceSessions }) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.devices?.title ?? '로그인된 기기'}</h2>
      <p className={styles.description}>
        {s.userSettings?.devices?.description ?? '현재 로그인 중인 기기를 확인하고 원격으로 로그아웃할 수 있습니다.'}
      </p>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.device ?? '기기'}
            </th>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.location ?? '위치'}
            </th>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.loggedInAt ?? '로그인 시각'}
            </th>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.lastActive ?? '마지막 활동'}
            </th>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.action ?? '조치'}
            </th>
          </tr>
        </thead>
        <tbody>
          {deviceSessions.map((session) => (
            <tr key={session.id} className={styles.trBody}>
              <td className={`${styles.td} ${styles.tdDevice}`}>{session.device}</td>
              <td className={`${styles.td} ${styles.tdLocation}`}>{session.location}</td>
              <td className={`${styles.td} ${styles.tdLoggedInAt}`}>{session.loggedInAt}</td>
              <td className={`${styles.td} ${styles.tdLastActive}`}>{session.lastActive}</td>
              <td className={styles.td}>
                <button className={`profile-action-button ${styles.revokeButton}`}>
                  {s.userSettings?.devices?.revoke ?? '이 기기에서 로그아웃'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
