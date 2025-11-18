'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useMessages } from 'next-intl';
import { groupService } from '@/core/api/services';
import { useUIStore } from '@/core/store/shared';
import styles from './GroupsTab.module.css';

export const GroupsTab = ({
  groups,
  workspaceChannels,
  groupPermissions,
  onToggleGroupChannel,
  onRefresh
}) => {
  const params = useParams();
  const workspaceId = params?.workspaceId;
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };
  const openModal = useUIStore((state) => state.openModal);
  const [savingGroupId, setSavingGroupId] = useState(null);

  const handleCreateGroup = async () => {
    const groupName = prompt(s.workspaceManagement.groupsCreatePrompt || 'Enter group name:');
    if (!groupName || !groupName.trim() || !workspaceId) return;

    try {
      await groupService.createGroup(workspaceId, { name: groupName.trim() });
      onRefresh?.();
    } catch (error) {
      console.error('Failed to create group:', error);
      alert(s.workspaceManagement.groupsCreateError || 'Failed to create group. Please try again.');
    }
  };

  const handleSaveGroup = async (groupId) => {
    if (!workspaceId) return;
    setSavingGroupId(groupId);
    try {
      const assignedChannels = groupPermissions[groupId] || [];
      await groupService.updateGroup(workspaceId, groupId, {
        channelIds: assignedChannels,
      });
      onRefresh?.();
    } catch (error) {
      console.error('Failed to save group permissions:', error);
    } finally {
      setSavingGroupId(null);
    }
  };

  return (
    <div>
      <h2 className={styles.header}>{s.workspaceManagement.groupsTitle}</h2>
      <p className={styles.description}>
        {s.workspaceManagement.groupsDescription}
      </p>

      <button className={styles.createButton} onClick={handleCreateGroup}>
        {s.workspaceManagement.groupsCreate}
      </button>

      <div className={styles.groupsList}>
        {groups.map((group) => {
          const assignedChannels = groupPermissions[group.id] || [];
          return (
            <div
              key={group.id}
              className={styles.groupCard}>
              <div>
                <div className={styles.groupHeader}>
                  <strong className={styles.groupName}>{group.name}</strong>
                  <span className={styles.groupMembers}>
                    {s.workspaceManagement.groupsMembersLabel}: {group.members}
                  </span>
                </div>
                <p className={styles.groupDescription}>
                  {group.description}
                </p>
              </div>

              <div>
                <h4 className={styles.channelsLabel}>
                  {s.workspaceManagement.groupsChannelsLabel}
                </h4>
                <div
                  className={styles.channelsGrid}
                >
                  {workspaceChannels.map((channel) => (
                    <label
                      key={`${group.id}-${channel}`}
                      className={styles.channelLabel}
                    >
                      <input
                        type="checkbox"
                        checked={assignedChannels.includes(channel)}
                        onChange={() => onToggleGroupChannel(group.id, channel)}
                      />
                      <span>#{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.saveButtonContainer}>
                <button
                  className={styles.saveButton}
                  onClick={() => handleSaveGroup(group.id)}
                  disabled={savingGroupId === group.id}
                >
                  {savingGroupId === group.id ? (s.workspaceManagement.groupsSaving || 'Saving...') : s.workspaceManagement.groupsSave}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
