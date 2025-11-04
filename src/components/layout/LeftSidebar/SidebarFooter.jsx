import { Settings, Inbox } from '@/components/common/icons';
import useStore from '@/store/useStore';
import { strings } from '@/constants/strings';

export const SidebarFooter = ({
  currentUser,
  onOpenProfileModal,
  onNavigateToUserSettings,
  onOpenModal,
}) => {
  const { language } = useStore();
  const s = strings[language];
  const statusLabels = s.statusLabels ?? {};
  const statusText =
    (currentUser?.status && statusLabels[currentUser.status]) ||
    (currentUser?.status === 'offline' ? s.offline : s.online);
  return (
    <div className="sidebar-footer">
      <button className="profile-info-button" onClick={onOpenProfileModal}>
        <img src={currentUser.avatar} alt="My Avatar" className="profile-info__avatar" />
        <div>
          <span className="profile-info__name">{currentUser.name}</span>
          <span className="profile-info__status">{statusText}</span>
        </div>
      </button>

      <div className="profile-actions">
        <button onClick={onNavigateToUserSettings} className="profile-action-button">
          <Settings size={18} />
        </button>
        <button onClick={() => onOpenModal('notifications')} className="profile-action-button" aria-label="수신함 열기">
          <Inbox size={18} />
        </button>
      </div>
    </div>
  );
};
