import { useMessages } from 'next-intl';
import { Settings, Plus, Mail } from '@/components/common/icons';

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
}) => {
  const messages = useMessages();
  const s = messages?.common ?? {};
  const { canManageWorkspace = false, canInviteMembers = false } = permissions;

  if (!isOpen) return null;

  return (
    <div className="ws-dropdown">
      <div className="ws-dropdown__current-ws">
        <span className="ws-dropdown__button-icon">{currentWorkspace.icon}</span>
        <span className="ws-dropdown__button-name">{currentWorkspace.name}</span>
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
          <button
            key={ws.id}
            onClick={() => {
              onSwitchWorkspace(ws.id);
              onClose();
            }}
            className="ws-dropdown__button"
          >
            <span className="ws-dropdown__button-icon">{ws.icon}</span>
            <span className="ws-dropdown__button-name">{ws.name}</span>
          </button>
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
