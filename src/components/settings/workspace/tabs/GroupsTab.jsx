'use client';

import { useMessages } from 'next-intl';
import styles from './GroupsTab.module.css';

export const GroupsTab = ({ 
  groups, 
  workspaceChannels, 
  groupPermissions, 
  onToggleGroupChannel 
}) => {
  const messages = useMessages();
  const s = { ...(messages?.common ?? {}), ...messages };

  return (
    <div>
      <h2 className={styles.header}>{s.workspaceManagement.groupsTitle}</h2>
      <p className={styles.description}>
        {s.workspaceManagement.groupsDescription}
      </p>

      <button className={styles.createButton}>
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
                <button className={styles.saveButton}>
                  {s.workspaceManagement.groupsSave}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
