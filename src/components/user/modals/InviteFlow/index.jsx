import { Hash as HashIcon } from '@/components/common/icons';
import { DirectInviteTab } from './components/DirectInviteTab';
import { LinkInviteTab } from './components/LinkInviteTab';
import styles from './InviteFlow.module.css';
import useInviteFlowState from './useInviteFlowState';

export const InviteFlow = (props) => {
  const {
    strings,
    copyStrings,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    availableUsers,
    selectedUsers,
    selectedGroups,
    selectedChannels,
    generatedLinks,
    linkSettings,
    setLinkSettings,
    formattedDescription,
    inviteTargetsLabel,
    selectableTargets,
    selectedTargets,
    toggleTarget,
    handleAddUser,
    handleRemoveUser,
    handleSendInvites,
    handleGenerateLink,
  } = useInviteFlowState(props);
  const { mode = 'member', channelName } = props;

  return (
    <div className={styles.inviteFlow}>
      <p className={styles.description}>{formattedDescription}</p>
      {mode === 'guest' && channelName && (
        <div className={styles.contextBanner}>
          <HashIcon size={16} />
          <span>
            {strings.context?.channelPrefix ?? 'Channel'} {channelName}
          </span>
        </div>
      )}

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'direct' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('direct')}
        >
          {strings.tabs?.direct ?? 'Invite by Email'}
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'link' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('link')}
        >
          {strings.tabs?.link ?? 'Generate Invite Link'}
        </button>
      </div>

      {activeTab === 'direct' ? (
        <DirectInviteTab
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          availableUsers={availableUsers}
          selectedUsers={selectedUsers}
          onAddUser={handleAddUser}
          onRemoveUser={handleRemoveUser}
          selectableTargets={selectableTargets}
          selectedTargets={selectedTargets}
          onToggleTarget={toggleTarget}
          onSendInvites={handleSendInvites}
          strings={strings}
          mode={mode}
          inviteTargetsLabel={inviteTargetsLabel}
        />
      ) : (
        <LinkInviteTab
          linkSettings={linkSettings}
          onSettingsChange={setLinkSettings}
          selectableTargets={selectableTargets}
          selectedTargets={selectedTargets}
          onToggleTarget={toggleTarget}
          onGenerateLink={handleGenerateLink}
          generatedLinks={generatedLinks}
          strings={strings}
          copyStrings={copyStrings}
          mode={mode}
          inviteTargetsLabel={inviteTargetsLabel}
        />
      )}
    </div>
  );
};

export default InviteFlow;
