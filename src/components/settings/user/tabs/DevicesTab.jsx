'use client';

import { useMessages } from 'next-intl';
import styles from './DevicesTab.module.css';

export const DevicesTab = ({ deviceSessions }) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  return (
    <div>
      <h2 className="settings-content__header">{s.userSettings?.devices?.title}</h2>
      <p className={styles.description}>
        {s.userSettings?.devices?.description}
      </p>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.device}
            </th>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.location}
            </th>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.loggedInAt}
            </th>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.lastActive}
            </th>
            <th className={styles.th}>
              {s.userSettings?.devices?.table?.action}
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
                  {s.userSettings?.devices?.revoke}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
