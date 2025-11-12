'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useMessages } from 'next-intl';
import { UserPlus } from '@/components/common/icons';
import useDataStore from '@/core/store/dataStore';
import styles from './MembersModalContent.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const MembersModalContent = ({
  channelId,
  workspaceId = 'ws1',
  workspaceMembers = {},
  permissions = {},
  onInviteGuest,
}) => {
  const messages = useMessages();
  const t = messages?.modals?.members ?? {};
  const users = useDataStore((state) => state.users);
  const loadInitialData = useDataStore((state) => state.loadInitialData);
  const initialized = useDataStore((state) => state.initialized);
  const getChannelDetails = useDataStore((state) => state.getChannelDetails);
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

  const canInviteGuest =
    permissions?.canInviteMembers && channel?.type !== 'dm' && typeof onInviteGuest === 'function';

  return (
    <div>
      {canInviteGuest && (
        <button
          className={`profile-modal__save-button ${styles.inviteButton}`}
          onClick={onInviteGuest}
        >
          <UserPlus size={16} className={styles.userPlusIcon} />
          {t.inviteGuest ?? '게스트 초대'}
        </button>
      )}

      <div className={`settings-form-group ${styles.formGroup}`}>
        <input
          type="text"
          placeholder={t.searchPlaceholder ?? '참여자 검색...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setSelectedType('all')}
          className={`${styles.tabButton} ${selectedType === 'all' ? styles.activeTab : styles.inactiveTab}`}
        >
          {t.tabAll ?? '전체'}
        </button>
        <button
          onClick={() => setSelectedType('member')}
          className={`${styles.tabButton} ${selectedType === 'member' ? styles.activeTab : styles.inactiveTab}`}
        >
          {t.tabMember ?? '멤버'}
        </button>
        <button
          onClick={() => setSelectedType('guest')}
          className={`${styles.tabButton} ${selectedType === 'guest' ? styles.activeTab : styles.inactiveTab}`}
        >
          {t.tabGuest ?? '게스트'}
        </button>
        <button
          onClick={() => setSelectedType('admin')}
          className={`${styles.tabButton} ${selectedType === 'admin' ? styles.activeTab : styles.inactiveTab}`}
        >
          {t.tabAdmin ?? '관리자'}
        </button>
      </div>

      <div className="channel-modal__list">
        {filteredUsers.map((user) => {
          const avatarSrc = user.avatar || getPlaceholderImage(32, user?.name?.[0] ?? '?');
          return (
            <div key={user.id} className="channel-modal__list-item member">
              <Image src={avatarSrc} alt={user.name} width={32} height={32} />
              <div className={styles.userInfo}>
                <span className={styles.userName}>{user.name}</span>
                {user.role && (
                  <span className={styles.userRole}>
                    {user.role}
                  </span>
                )}
              </div>
              <span
                className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'} ${styles.status}`}
              ></span>
            </div>
          );
        })}
        {filteredUsers.length === 0 && (
          <p className={styles.noResults}>
            {t.noResults ?? '검색 결과가 없습니다.'}
          </p>
        )}
      </div>
    </div>
  );
};
