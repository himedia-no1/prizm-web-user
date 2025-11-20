'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/core/store/authStore';
import { useMessages } from 'next-intl';
import { ChevronDown, Settings, User, ArrowLeft } from '@/components/common/icons';
import styles from './UserProfileHeader.module.css';

export default function UserProfileHeader() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const messages = useMessages();
  const t = messages?.common;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const handleSettings = () => {
    setIsDropdownOpen(false);
    router.push('/me/setting/profile');
  };

  if (!user) {
    return null;
  }

  const userInitial = user.name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className={styles.container}>
      <button
        className={styles.profileButton}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className={styles.avatar}>
          {user.avatar ? (
            <Image 
              src={user.avatar} 
              alt={user.name}
              width={40}
              height={40}
              className={styles.avatarImage}
            />
          ) : (
            <span>{userInitial}</span>
          )}
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{user.name || user.email}</div>
          {user.email && user.name && (
            <div className={styles.userEmail}>{user.email}</div>
          )}
        </div>
        <ChevronDown size={16} className={isDropdownOpen ? styles.chevronUp : ''} />
      </button>

      {isDropdownOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <button className={styles.dropdownItem} onClick={handleSettings}>
            <Settings size={18} />
            <span>{t?.mySettings || 'Settings'}</span>
          </button>
          <div className={styles.divider} />
          <button className={styles.dropdownItem} onClick={handleLogout}>
            <ArrowLeft size={18} />
            <span>{t?.logout || 'Log out'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
