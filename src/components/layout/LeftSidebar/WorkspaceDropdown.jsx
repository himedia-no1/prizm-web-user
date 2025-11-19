import { useState } from 'react';
import { useMessages } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Settings, Plus, Mail, AlertTriangle, Bell } from '@/components/common/icons';
import { workspaceService } from '@/core/api/services';

export const WorkspaceDropdown = ({
  currentWorkspace,
  workspaces,
  isOpen,
  onClose,
  onNavigateToSettings,
  onSwitchWorkspace,
  onNavigateToCreateWorkspace,
  onOpenModal,
  permissions = {},
  currentMembership = {},
}) => {
  const messages = useMessages();
  const s = messages?.common ?? {};
  const { canManageWorkspace = false, canInviteMembers = false } = permissions;
  const [hoveredWorkspace, setHoveredWorkspace] = useState(null);
  const [isCurrentWsHovered, setIsCurrentWsHovered] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  // OWNER는 탈퇴 불가능
  const canLeaveWorkspace = currentMembership?.role && currentMembership.role !== 'OWNER';

  const handleLeaveWorkspace = async () => {
    try {
      await workspaceService.leaveWorkspace(currentWorkspace.id);
      
      // 탈퇴 후 서버에서 새로운 워크스페이스 목록 조회
      const remainingWorkspaces = await workspaceService.getWorkspaces();
      
      if (remainingWorkspaces.length > 0) {
        // 첫 번째 워크스페이스의 대시보드로 이동
        router.push(`/workspace/${remainingWorkspaces[0].id}/dashboard`);
      } else {
        // 워크스페이스가 없으면 새 워크스페이스 생성 페이지로 이동
        router.push('/workspace/new');
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to leave workspace:', error);
      throw error;
    }
  };

  return (
    <div className="ws-dropdown">
      <div
        className="ws-dropdown__current-ws"
        onMouseEnter={() => setIsCurrentWsHovered(true)}
        onMouseLeave={() => setIsCurrentWsHovered(false)}
      >
        <span className="ws-dropdown__button-icon">{currentWorkspace.icon}</span>
        <span className="ws-dropdown__button-name">{currentWorkspace.name}</span>
        {isCurrentWsHovered && (
          <button
            className="ws-dropdown__notification-button ws-dropdown__notification-button--current"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal('workspaceNotificationSettings', {
                workspaceId: currentWorkspace.id,
                workspaceName: currentWorkspace.name,
              });
            }}
            aria-label="Notification Settings"
          >
            <Bell size={16} />
          </button>
        )}
        {canManageWorkspace && (
          <button
            className="ws-dropdown__settings-button"
            onClick={() => {
              onNavigateToSettings();
              onClose();
            }}
          >
            <Settings size={16} />
          </button>
        )}
      </div>

      {canLeaveWorkspace && (
        <>
          <button
            className="ws-dropdown__button ws-dropdown__leave-button"
            onClick={() => {
              onOpenModal('leaveWorkspace', {
                workspaceName: currentWorkspace.name,
                onConfirm: handleLeaveWorkspace
              });
              onClose();
            }}
          >
            <AlertTriangle size={16} />
            <span>{s.leaveWorkspace || '워크스페이스 탈퇴'}</span>
          </button>

          <div className="ws-dropdown__divider"></div>
        </>
      )}

      {canInviteMembers && (
        <button
          className="ws-dropdown__button ws-dropdown__action-button"
          onClick={() => {
            onOpenModal('inviteMember', { workspaceId: currentWorkspace.id });
            onClose();
          }}
        >
          <Mail size={16} />
          <span>{s.inviteMembers}</span>
        </button>
      )}

      <div className="ws-dropdown__divider"></div>

      {workspaces
        .filter(ws => ws.id !== currentWorkspace.id)
        .map(ws => (
          <div
            key={ws.id}
            className="ws-dropdown__item-wrapper"
            onMouseEnter={() => setHoveredWorkspace(ws.id)}
            onMouseLeave={() => setHoveredWorkspace(null)}
          >
            <button
              onClick={() => {
                onSwitchWorkspace(ws.id);
                onClose();
              }}
              className="ws-dropdown__button"
            >
              <span className="ws-dropdown__button-icon">{ws.icon}</span>
              <span className="ws-dropdown__button-name">{ws.name}</span>
            </button>
            {hoveredWorkspace === ws.id && (
              <button
                className="ws-dropdown__notification-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal('workspaceNotificationSettings', {
                    workspaceId: ws.id,
                    workspaceName: ws.name,
                  });
                }}
                aria-label="Notification Settings"
              >
                <Bell size={16} />
              </button>
            )}
          </div>
        ))}

      <div className="ws-dropdown__divider"></div>

      <button
        className="ws-dropdown__button ws-dropdown__new-ws"
        onClick={() => {
          onNavigateToCreateWorkspace();
          onClose();
        }}
      >
        <Plus size={16} />
        <span>{s.createNewWorkspace}</span>
      </button>
    </div>
  );
};
