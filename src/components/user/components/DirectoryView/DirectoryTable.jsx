'use client';

import Image from 'next/image';
import { StatusIndicator } from '@/components/ui/StatusIndicator';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';
import styles from '../DirectoryView.module.css';

export const DirectoryTable = ({ users, strings, onOpenUser, getStatusLabel }) => {
  return (
    <table className={styles.directoryTable}>
      <thead>
        <tr>
          <th>{strings.columns?.name ?? 'Member'}</th>
          <th>{strings.columns?.email ?? 'Email'}</th>
          <th>{strings.columns?.provider ?? 'Provider'}</th>
          <th>{strings.columns?.joinedAt ?? 'Joined'}</th>
          <th>{strings.columns?.group ?? 'Group'}</th>
          <th>{strings.columns?.role ?? 'Role'}</th>
          <th>{strings.columns?.status ?? 'Status'}</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => {
            const avatarSrc = user.avatar || getPlaceholderImage(40, user?.name?.[0] ?? '?');
            return (
              <tr
                key={user.id}
                className={styles.directoryRow}
                onClick={() => onOpenUser(user.id)}
              >
                <td>
                  <div className={styles.directoryMemberCell}>
                    <Image src={avatarSrc} alt={user.name} width={40} height={40} />
                    <div>
                      <span className={styles.directoryMemberName}>{user.realName || user.name}</span>
                      <span className={styles.directoryMemberHandle}>{user.name}</span>
                    </div>
                  </div>
                </td>
                <td>{user.email || '-'}</td>
                <td>{user.socialProvider || '-'}</td>
                <td>{user.joinedAt || '-'}</td>
                <td>{user.group || '-'}</td>
                <td>{user.role || '-'}</td>
                <td>
                  <div className={styles.directoryStatusCell}>
                    <StatusIndicator status={user.status} className={styles.directoryStatusIndicator} />
                    <span>{getStatusLabel(user.status) || '-'}</span>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr className={styles.directoryEmptyRow}>
            <td colSpan={7}>{strings.empty ?? 'No members found.'}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DirectoryTable;
