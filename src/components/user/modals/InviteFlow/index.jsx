import { useContext, useMemo, useState } from 'react';
import { mockUsers } from '@/__mocks__/users';
import { Hash as HashIcon } from '@/components/common/icons';
import useStore from '@/store/useStore';
import { WorkspaceContext } from '@/app/app/workspace/[workspaceId]/WorkspaceLayoutClient';
import { useInviteStrings } from './hooks/useInviteStrings';
import { useInviteTargets } from './hooks/useInviteTargets';
import { buildInviteLink, multiSelectToggle } from './utils/helpers';
import { DirectInviteTab } from './components/DirectInviteTab';
import { LinkInviteTab } from './components/LinkInviteTab';
import styles from './InviteFlow.module.css';

export const InviteFlow = ({ mode = 'member', channelId, channelName, workspaceId: workspaceIdProp }) => {
  const { invite: s, copy: copyStrings } = useInviteStrings(mode);
  const openModal = useStore((state) => state.openModal);
  const workspaceMemberships = useStore((state) => state.workspaceMemberships);
  const fallbackWorkspace = useStore((state) => state.currentWorkspace);
  
  const workspaceContext = useContext(WorkspaceContext);
  const workspace = workspaceContext?.currentWorkspace ?? fallbackWorkspace;
  const workspaceId = workspaceIdProp ?? workspace?.id;
  const currentMembershipMap =
    workspaceContext?.workspaceMembers ??
    (workspaceId ? workspaceMemberships[workspaceId] ?? {} : {});
  const currentUserId = workspaceContext?.currentUser?.id;

  const [activeTab, setActiveTab] = useState('direct');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState(() => {
    if (mode === 'guest' && channelId) {
      return [channelId];
    }
    return [];
  });
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [linkSettings, setLinkSettings] = useState({
    expiration: '7d',
    usage: 'unlimited',
  });

  const formattedDescription = useMemo(() => {
    if (!s.description) {
      return mode === 'guest'
        ? '게스트를 채널에 초대하는 방법을 선택하세요.'
        : '워크스페이스 멤버 초대 방법을 선택하세요.';
    }
    if (mode === 'guest' && channelName) {
      return s.description.replace('{{channel}}', `#${channelName}`);
    }
    return s.description;
  }, [channelName, mode, s.description]);

  const allUsers = useMemo(() => Object.values(mockUsers), []);
  const existingMemberIds = useMemo(() => Object.keys(currentMembershipMap ?? {}), [currentMembershipMap]);

  const { selectableTargets } = useInviteTargets(workspaceId, mode, channelId, channelName);

  const availableUsers = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowered = searchTerm.trim().toLowerCase();
    return allUsers
      .filter(
        (user) =>
          user.id !== currentUserId &&
          !existingMemberIds.includes(user.id) &&
          !selectedUsers.find((selected) => selected.id === user.id) &&
          (user.email?.toLowerCase().includes(lowered) || user.name?.toLowerCase().includes(lowered)),
      )
      .slice(0, 8);
  }, [allUsers, searchTerm, selectedUsers, existingMemberIds, currentUserId]);

  const inviteTargetsLabel =
    mode === 'guest'
      ? s.email?.channelLabel ?? '채널 접근 권한'
      : s.email?.groupLabel ?? '그룹 설정';

  const selectedTargets = mode === 'guest' ? selectedChannels : selectedGroups;

  const toggleTarget = (id) => {
    if (mode === 'guest') {
      setSelectedChannels(multiSelectToggle(selectedChannels, id));
    } else {
      setSelectedGroups(multiSelectToggle(selectedGroups, id));
    }
  };

  const resetSelections = () => {
    setSelectedUsers([]);
    setSelectedGroups([]);
    setSelectedChannels(channelId ? [channelId] : []);
  };

  const handleAddUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearchTerm('');
  };

  const handleRemoveUser = (id) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSendInvites = () => {
    if (selectedUsers.length === 0) return;
    const invites = selectedUsers.map((user) => {
      const link = buildInviteLink(mode, channelId);
      return {
        user,
        link,
        groups: selectedGroups.slice(),
        channels: selectedChannels.slice(),
        createdAt: new Date().toISOString(),
      };
    });
    resetSelections();
    openModal('generic', {
      type: 'inviteResult',
      mode,
      resultType: 'direct',
      entries: invites.map(({ user, link }) => ({
        email: user.email,
        name: user.name,
        url: link.url,
        code: link.id,
      })),
    });
  };

  const handleGenerateLink = () => {
    const link = buildInviteLink(mode, channelId);
    const record = {
      id: link.id,
      url: link.url,
      code: link.code,
      createdAt: new Date().toISOString(),
      expiration: linkSettings.expiration,
      usage: linkSettings.usage,
      targets: selectedTargets.slice(),
      origin: 'link',
    };
    setGeneratedLinks((prev) => [record, ...prev]);
    openModal('generic', {
      type: 'inviteResult',
      mode,
      resultType: 'link',
      link: {
        url: record.url,
        code: record.id,
        expiration: record.expiration,
        usage: record.usage,
        createdAt: record.createdAt,
      },
    });
  };

  return (
    <div className={styles.inviteFlow}>
      <p className={styles.description}>{formattedDescription}</p>
      {mode === 'guest' && channelName && (
        <div className={styles.contextBanner}>
          <HashIcon size={16} />
          <span>
            {s.context?.channelPrefix ?? '채널'} {channelName}
          </span>
        </div>
      )}

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'direct' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('direct')}
        >
          {s.tabs?.direct ?? '이메일로 초대'}
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'link' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('link')}
        >
          {s.tabs?.link ?? '초대 링크 생성'}
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
          strings={s}
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
          strings={s}
          copyStrings={copyStrings}
          mode={mode}
          inviteTargetsLabel={inviteTargetsLabel}
        />
      )}
    </div>
  );
};

export default InviteFlow;
