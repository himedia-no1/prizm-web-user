import { Settings, Bell, Moon, Sun } from '@/components/common/icons';

export const SidebarFooter = ({
  currentUser,
  isDarkMode,
  onOpenProfileModal,
  onNavigateToUserSettings,
  onOpenModal,
  onToggleDarkMode
}) => {
  return (
    <div className="sidebar-footer">
      <button className="profile-info-button" onClick={onOpenProfileModal}>
        <img src={currentUser.avatar} alt="My Avatar" className="profile-info__avatar" />
        <div>
          <span className="profile-info__name">{currentUser.name}</span>
          <span className="profile-info__status">Online</span>
        </div>
      </button>

      <div className="profile-actions">
        <button onClick={onNavigateToUserSettings} className="profile-action-button">
          <Settings size={18} />
        </button>
        <button onClick={() => onOpenModal('notifications')} className="profile-action-button">
          <Bell size={18} />
        </button>
        <button onClick={onToggleDarkMode} className="theme-toggle-button">
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </div>
  );
};
