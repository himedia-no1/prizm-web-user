'use client';

import { StatusIndicator } from '@/components/common/StatusIndicator';
import './DirectoryView.css';

export const DirectoryView = ({ users, onOpenUserProfile }) => {
  const handleOpenUser = (id) => {
    if (onOpenUserProfile) {
      onOpenUserProfile(id);
    }
  };

  return (
    <main className="main-view directory-view">
      <header className="view-header">
        <h2>Directory</h2>
      </header>
      <div className="view-content">
        <div className="settings-form-group" style={{ marginBottom: '1.5rem' }}>
          <input type="text" placeholder="멤버 이름 검색..." />
        </div>
        <div className="directory-list">
          {Object.values(users).map((user) => (
            <button
              type="button"
              key={user.id}
              className="directory-item"
              onClick={() => handleOpenUser(user.id)}
            >
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
              <StatusIndicator status={user.status} className="directory-item__status" />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};
