'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useMessages } from 'next-intl';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import styles from './MentionDropdown.module.css';

export const MentionDropdown = ({
  users = [],
  searchQuery = '',
  position,
  onSelect,
  onClose
}) => {
  const messages = useMessages();
  const t = messages?.message;
  const dropdownRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredUsers.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
          break;
        case 'Enter':
          event.preventDefault();
          if (filteredUsers[selectedIndex]) {
            onSelect?.(filteredUsers[selectedIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose?.();
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredUsers, selectedIndex, onSelect, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  if (filteredUsers.length === 0) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      className={styles.dropdown}
      style={{
        bottom: position?.bottom || '100%',
        left: position?.left || '0',
      }}
    >
      <div className={styles.header}>
        {t?.mentionUsers || 'Mention User'}
      </div>
      <ul className={styles.userList}>
        {filteredUsers.map((user, index) => {
          const avatarSrc = user.avatar || getPlaceholderImage(32, user?.name?.[0] ?? '?');
          return (
            <li
              key={user.id}
              className={`${styles.userItem} ${index === selectedIndex ? styles.selected : ''}`}
              onClick={() => onSelect?.(user)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <Image
                src={avatarSrc}
                alt={user.name}
                width={32}
                height={32}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                {user.username && (
                  <span className={styles.userUsername}>@{user.username}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
