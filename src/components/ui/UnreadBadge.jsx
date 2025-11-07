'use client';

import useStrings from '@/hooks/useStrings';
import styles from './UnreadBadge.module.css';

export const UnreadBadge = ({ count }) => {
  const s = useStrings();

  if (!count || count === 0) return null;

  const displayCount = count > 99 ? s.unreadCountMax : count.toString();

  return (
    <span className="unread-badge">
      {displayCount}
    </span>
  );
};
