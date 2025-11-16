'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useMessages } from 'next-intl';
import { X, Users, Search } from '@/components/common/icons';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useChatStore } from '@/core/store/chat';
import useDataStore from '@/core/store/dataStore';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import styles from './MembersSidebar.module.css';

export const MembersSidebar = ({ channelId, workspaceId = 'ws1', workspaceMembers = {}, onClose }) => {
  const messages = useMessages();
  const t = messages?.modals?.members;
  const tRoles = messages?.workspaceManagement;
  const users = useWorkspaceStore((state) => state.users);
  const getChannelDetails = useChatStore((state) => state.getChannelDetails);
  const loadInitialData = useDataStore((state) => state.loadInitialData);
  const initialized = useDataStore((state) => state.initialized);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    if (!initialized) {
      loadInitialData().catch((error) => {
        console.error('Failed to load initial data:', error);
      });
    }
  }, [initialized, loadInitialData]);

  const channel = channelId ? getChannelDetails(channelId) : null;
  const memberIds = useMemo(() => {
    if (channel?.members?.length) return channel.members;
    const ids = Object.keys(workspaceMembers);
    return ids.length ? ids : Object.keys(users);
  }, [channel?.members, workspaceMembers, users]);

  const memberList = useMemo(() => {
    return memberIds
      .map((id) => ({
        ...users[id],
        role: workspaceMembers[id]?.role ?? users[id]?.role,
      }))
      .filter(Boolean);
  }, [memberIds, users, workspaceMembers]);

  const getTranslatedRole = (role) => {
    const roleKey = `role${role.charAt(0).toUpperCase() + role.slice(1)}`;
    return tRoles[roleKey] || role;
  };

  const filteredUsers = memberList.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedType === 'all') return true;
    if (selectedType === 'member') return user.role !== 'guest' && user.role !== 'Guest';
    if (selectedType === 'guest') return user.role === 'guest' || user.role === 'Guest';
    if (selectedType === 'admin') return ['owner', 'manager', 'admin'].includes(
      (user.role || '').toLowerCase(),
    );

    return true;
  });

  if (!t || !tRoles) {
    return null;
  }

  return (
    <aside className={`thread-sidebar ${styles.membersSidebar}`}>
      <header className="thread-header">
        <div>
          <h3 className="thread-header__title">
            <Users size={18} />
            <span>{t?.title || 'Members'}</span>
          </h3>
          <p className="thread-header__subtitle">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'member' : 'members'}
          </p>
        </div>
        <button onClick={onClose} className="thread-header__close-button">
          <X size={18} />
        </button>
      </header>

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setSelectedType('all')}
          className={`${styles.tab} ${selectedType === 'all' ? styles.activeTab : ''}`}
        >
          {t.tabAll}
        </button>
        <button
          onClick={() => setSelectedType('member')}
          className={`${styles.tab} ${selectedType === 'member' ? styles.activeTab : ''}`}
        >
          {t.tabMember}
        </button>
        <button
          onClick={() => setSelectedType('guest')}
          className={`${styles.tab} ${selectedType === 'guest' ? styles.activeTab : ''}`}
        >
          {t.tabGuest}
        </button>
        <button
          onClick={() => setSelectedType('admin')}
          className={`${styles.tab} ${selectedType === 'admin' ? styles.activeTab : ''}`}
        >
          {t.tabAdmin}
        </button>
      </div>

      <div className={styles.memberList}>
        {filteredUsers.map((user) => {
          const avatarSrc = user.avatar || getPlaceholderImage(36, user?.name?.[0] ?? '?');
          return (
            <div key={user.id} className={styles.memberItem}>
              <Image
                src={avatarSrc}
                alt={user.name}
                width={36}
                height={36}
                className={styles.avatar}
              />
              <div className={styles.memberInfo}>
                <span className={styles.memberName}>{user.name}</span>
                {user.role && (
                  <span className={styles.memberRole}>
                    {getTranslatedRole(user.role)}
                  </span>
                )}
              </div>
              <span
                className={`${styles.status} ${user.status === 'online' ? styles.online : styles.offline}`}
              />
            </div>
          );
        })}
        {filteredUsers.length === 0 && (
          <div className={styles.emptyState}>
            <Users size={48} className={styles.emptyIcon} />
            <p className={styles.emptyText}>{t.noResults}</p>
          </div>
        )}
      </div>
    </aside>
  );
};
