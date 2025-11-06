'use client';

import useStrings from '@/hooks/useStrings';
import styles from './GroupsTab.module.css';

export const GroupsTab = ({ 
  groups, 
  workspaceChannels, 
  groupPermissions, 
  onToggleGroupChannel 
}) => {
  const s = useStrings();

  return (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.groupsTitle}</h2>
      <p className={styles.description}>
        {s.workspaceAdmin.groupsDescription}
      </p>

      <button className={`profile-modal__save-button ${styles.createButton}`}>
        {s.workspaceAdmin.groupsCreate}
      </button>

      <div className={`channel-modal__list ${styles.groupsList}`}>
        {groups.map((group) => {
          const assignedChannels = groupPermissions[group.id] || [];
          return (
            <div
              key={group.id}
              className={`channel-modal__list-item ${styles.groupCard}`}>
              <div>
                <div className={styles.groupHeader}>
                  <strong className={styles.groupName}>{group.name}</strong>
                  <span className={styles.groupMembers}>
                    {s.workspaceAdmin.groupsMembersLabel}: {group.members}
                  </span>
                </div>
                <p className={styles.groupDescription}>
                  {group.description}
                </p>
              </div>

              <div>
                <h4 className={styles.channelsLabel}>
                  {s.workspaceAdmin.groupsChannelsLabel}
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
                <button className={`profile-modal__save-button ${styles.saveButton}`}>
                  {s.workspaceAdmin.groupsSave}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
