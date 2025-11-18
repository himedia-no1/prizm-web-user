'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { WorkspaceContext } from '@/app/[locale]/(app)/workspace/[workspaceId]/WorkspaceLayoutClient';
import { useInviteStrings } from './hooks/useInviteStrings';
import { useInviteTargets } from './hooks/useInviteTargets';
import { useUIStore } from '@/core/store/shared';
import { useWorkspaceStore } from '@/core/store/workspace';
import useDataStore from '@/core/store/dataStore';
import { buildInviteLink, multiSelectToggle } from './utils/helpers';

export const useInviteFlowState = ({ mode = 'member', channelId, channelName, workspaceId: workspaceIdProp }) => {
  const { invite: strings, copy: copyStrings } = useInviteStrings(mode);
  const openModal = useUIStore((state) => state.openModal);
  const workspaceMemberships = useWorkspaceStore((state) => state.workspaceMemberships);
  const fallbackWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const users = useWorkspaceStore((state) => state.users);

  const workspaceContext = useContext(WorkspaceContext);
  const loadInitialData = useDataStore((state) => state.loadInitialData);
  const initialized = useDataStore((state) => state.initialized);

  const workspace = workspaceContext?.currentWorkspace ?? fallbackWorkspace;
  const workspaceId = workspaceIdProp ?? workspace?.id;
  const contextWorkspaceMembers = workspaceContext?.workspaceMembers;
  const currentMembershipMap = useMemo(() => {
    if (contextWorkspaceMembers) {
      return contextWorkspaceMembers;
    }
    if (workspaceId) {
      return workspaceMemberships[workspaceId] ?? {};
    }
    return {};
  }, [contextWorkspaceMembers, workspaceId, workspaceMemberships]);
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
    const defaultDescription = mode === 'guest'
      ? 'Select how to invite guests to the channel.'
      : 'Select how to invite workspace members.';

    if (!strings.description) {
      return defaultDescription;
    }
    if (mode === 'guest' && channelName) {
      return strings.description.replace('{{channel}}', `#${channelName}`);
    }
    return strings.description;
  }, [channelName, mode, strings.description]);

  useEffect(() => {
    if (!initialized) {
      loadInitialData().catch((error) => {
        console.error('Failed to load users:', error);
      });
    }
  }, [initialized, loadInitialData]);

  const allUsers = useMemo(() => Object.values(users ?? {}), [users]);
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
      ? strings.email?.channelLabel ?? 'Channel Access'
      : strings.email?.groupLabel ?? 'Group Settings';

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

  const handleSendInvites = async () => {
    if (selectedUsers.length === 0 || !workspaceId) return;

    try {
      const { inviteService } = await import('@/core/api/services');

      // Send invites via API
      const invitePromises = selectedUsers.map((user) =>
        inviteService.createInvite(workspaceId, {
          email: user.email,
          channelId: mode === 'guest' ? channelId : null,
          groupIds: mode === 'member' ? selectedGroups : [],
        })
      );

      const results = await Promise.all(invitePromises);

      resetSelections();
      openModal('generic', {
        type: 'inviteResult',
        mode,
        resultType: 'direct',
        entries: results.map((result, idx) => ({
          email: selectedUsers[idx].email,
          name: selectedUsers[idx].name,
          url: result.inviteUrl || `${window.location.origin}/invite/${result.code}`,
          code: result.code,
        })),
      });
    } catch (error) {
      console.error('Failed to send invites:', error);
    }
  };

  const handleGenerateLink = async () => {
    if (!workspaceId) return;

    try {
      const { inviteService } = await import('@/core/api/services');

      // Create invite link via API
      const result = await inviteService.createInvite(workspaceId, {
        expiresAt: linkSettings.expiration === '7d' ? null : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        maxUses: linkSettings.usage === 'unlimited' ? null : parseInt(linkSettings.usage),
        channelId: mode === 'guest' ? channelId : null,
        groupIds: mode === 'member' ? selectedTargets : [],
      });

      const record = {
        id: result.code,
        url: result.inviteUrl || `${window.location.origin}/invite/${result.code}`,
        code: result.code,
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
    } catch (error) {
      console.error('Failed to generate invite link:', error);
    }
  };

  return {
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
  };
};

export default useInviteFlowState;
