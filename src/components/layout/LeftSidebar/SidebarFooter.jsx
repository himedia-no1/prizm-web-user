import Image from 'next/image';
import { Settings, Inbox } from '@/components/common/icons';
import useStrings from '@/shared/hooks/useStrings';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const SidebarFooter = ({
  currentUser,
  onOpenProfileModal,
  onNavigateToUserSettings,
  onOpenModal,
}) => {
  const s = useStrings('common');
  const statusLabels = s.statusLabels ?? {};
  const statusText =
    (currentUser?.status && statusLabels[currentUser.status]) ||
    (currentUser?.status === 'offline' ? s.offline : s.online);
  const avatarSrc = currentUser?.avatar || getPlaceholderImage(36, currentUser?.name?.[0] ?? '?');

  return (
    <div className="sidebar-footer">
      <button className="profile-info-button" onClick={onOpenProfileModal}>
        <Image
          src={avatarSrc}
          alt="My Avatar"
          width={36}
          height={36}
          className="profile-info__avatar"
        />
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
