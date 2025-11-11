'use client';

import { useMessages } from 'next-intl';
import styles from './UnreadBadge.module.css';

export const UnreadBadge = ({ count }) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  if (!count || count === 0) return null;

  const displayCount = count > 99 ? s.unreadCountMax : count.toString();

  return (
    <span className="unread-badge">
      {displayCount}
    </span>
  );
};
