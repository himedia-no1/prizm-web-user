'use client';

import { useState } from 'react';
import { UserPlus } from '@/components/common/icons';
import useDataStore from '@/store/dataStore';

export const MembersModalContent = ({ onInviteGuest }) => {
  const { users } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const filteredUsers = Object.values(users).filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (selectedType === 'all') return true;
    if (selectedType === 'member') return user.role !== 'Guest';
    if (selectedType === 'guest') return user.role === 'Guest';
    if (selectedType === 'admin') return user.role === 'Owner' || user.role === 'Manager';
    
    return true;
  });

  return (
    <div>
      {onInviteGuest && (
        <button
          className="profile-modal__save-button"
          onClick={onInviteGuest}
          style={{ marginBottom: '1rem', width: '100%' }}
        >
          <UserPlus size={16} style={{ marginRight: '0.5rem' }} />
          게스트 초대
        </button>
      )}

      <div className="settings-form-group" style={{ marginBottom: '0.75rem' }}>
        <input
          type="text"
          placeholder="참여자 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
        <button
          onClick={() => setSelectedType('all')}
          style={{
            padding: '0.5rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: selectedType === 'all' ? '2px solid var(--primary)' : 'none',
            color: selectedType === 'all' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: selectedType === 'all' ? 600 : 400,
            cursor: 'pointer'
          }}
        >
          전체
        </button>
        <button
          onClick={() => setSelectedType('member')}
          style={{
            padding: '0.5rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: selectedType === 'member' ? '2px solid var(--primary)' : 'none',
            color: selectedType === 'member' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: selectedType === 'member' ? 600 : 400,
            cursor: 'pointer'
          }}
        >
          멤버
        </button>
        <button
          onClick={() => setSelectedType('guest')}
          style={{
            padding: '0.5rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: selectedType === 'guest' ? '2px solid var(--primary)' : 'none',
            color: selectedType === 'guest' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: selectedType === 'guest' ? 600 : 400,
            cursor: 'pointer'
          }}
        >
          게스트
        </button>
        <button
          onClick={() => setSelectedType('admin')}
          style={{
            padding: '0.5rem 1rem',
            background: 'none',
            border: 'none',
            borderBottom: selectedType === 'admin' ? '2px solid var(--primary)' : 'none',
            color: selectedType === 'admin' ? 'var(--primary)' : 'var(--text-secondary)',
            fontWeight: selectedType === 'admin' ? 600 : 400,
            cursor: 'pointer'
          }}
        >
          관리자
        </button>
      </div>

      <div className="channel-modal__list">
        {filteredUsers.map((user) => (
          <div key={user.id} className="channel-modal__list-item member">
            <img src={user.avatar} alt={user.name} />
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 500 }}>{user.name}</span>
              {user.role && (
                <span style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-secondary)',
                  marginLeft: '0.5rem',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '9999px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)'
                }}>
                  {user.role}
                </span>
              )}
            </div>
            <span
              className={`dm-button__status ${user.status === 'online' ? 'online' : 'offline'}`}
              style={{ position: 'static', border: 'none', marginLeft: 'auto' }}
            ></span>
          </div>
        ))}
        {filteredUsers.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};
