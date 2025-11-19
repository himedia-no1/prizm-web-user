'use client';

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
        label={strings.email?.searchLabel ?? 'Search user email'}
      />

      {searchTerm && <SearchResults users={availableUsers} onAddUser={onAddUser} />}

      <SelectedUsersList
        users={selectedUsers}
        onRemoveUser={onRemoveUser}
        emptyMessage={strings.email?.emptySelection ?? 'No users selected'}
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
        {strings.email?.sendButton ?? 'Send Invite'}
      </button>
    </div>
  );
};
