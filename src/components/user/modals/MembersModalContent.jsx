'use client';

import { useMemo, useState } from 'react';
import { UserPlus } from '@/components/common/icons';
import useDataStore from '@/store/dataStore';
import styles from './MembersModalContent.module.css';

export const MembersModalContent = ({
  channelId,
  workspaceId = 'ws1',
  workspaceMembers = {},
  permissions = {},
  onInviteGuest,
}) => {
  const { users, channelDetails } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const channel = channelId ? channelDetails[channelId] : null;
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
          게스트 초대
        </button>
      )}

      <div className={`settings-form-group ${styles.formGroup}`}>
        <input
          type="text"
          placeholder="참여자 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.tabs}>
        <button
          onClick={() => setSelectedType('all')}
          className={`${styles.tabButton} ${selectedType === 'all' ? styles.activeTab : styles.inactiveTab}`}
        >
          전체
        </button>
        <button
          onClick={() => setSelectedType('member')}
          className={`${styles.tabButton} ${selectedType === 'member' ? styles.activeTab : styles.inactiveTab}`}
        >
          멤버
        </button>
        <button
          onClick={() => setSelectedType('guest')}
          className={`${styles.tabButton} ${selectedType === 'guest' ? styles.activeTab : styles.inactiveTab}`}
        >
          게스트
        </button>
        <button
          onClick={() => setSelectedType('admin')}
          className={`${styles.tabButton} ${selectedType === 'admin' ? styles.activeTab : styles.inactiveTab}`}
        >
          관리자
        </button>
      </div>

      <div className="channel-modal__list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="channel-modal__list-item member">
            <img src={user.avatar} alt={user.name} />
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
        ))}
        {filteredUsers.length === 0 && (
          <p className={styles.noResults}>
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};
