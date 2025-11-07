import { UserSearchField } from './UserSearchField';
import { SearchResults } from './SearchResults';
import { SelectedUsersList } from './SelectedUsersList';
import { TargetSelector } from './TargetSelector';
import styles from '../InviteFlow.module.css';

export const DirectInviteTab = ({
  searchTerm,
  onSearchChange,
  availableUsers,
  selectedUsers,
  onAddUser,
  onRemoveUser,
  selectableTargets,
  selectedTargets,
  onToggleTarget,
  onSendInvites,
  strings,
  mode,
  inviteTargetsLabel,
}) => {
  return (
    <div className={styles.tabPane}>
      <UserSearchField
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        placeholder={strings.email?.searchPlaceholder ?? 'name@example.com'}
        label={strings.email?.searchLabel ?? '사용자 이메일 검색'}
      />

      {searchTerm && <SearchResults users={availableUsers} onAddUser={onAddUser} />}

      <SelectedUsersList
        users={selectedUsers}
        onRemoveUser={onRemoveUser}
        emptyMessage={strings.email?.emptySelection ?? '선택된 사용자가 없습니다.'}
      />

      <TargetSelector
        targets={selectableTargets}
        selectedTargets={selectedTargets}
        onToggleTarget={onToggleTarget}
        label={inviteTargetsLabel}
        mode={mode}
      />

      <button
        type="button"
        className={styles.primaryAction}
        disabled={selectedUsers.length === 0}
        onClick={onSendInvites}
      >
        {strings.email?.sendButton ?? '초대 보내기'}
      </button>
    </div>
  );
};
