import { Link as LinkIcon } from '@/components/common/icons';
import { CopyableLink } from './CopyableLink';
import { optionLabel } from '../utils/helpers';
import styles from '../InviteFlow.module.css';

export const GeneratedLinksList = ({ links, strings, copyStrings }) => {
  if (links.length === 0) {
    return <p className={styles.emptyHistory}>{strings.history?.empty}</p>;
  }

  return (
    <ul className={styles.historyList}>
      {links.map((link) => (
        <li key={link.id}>
          <div className={styles.historyMeta}>
            <LinkIcon size={16} />
            <div>
              <span className={styles.historyCode}>{link.id}</span>
              <span className={styles.historyDetail}>
                {strings.history?.created}:{' '}
                {new Date(link.createdAt).toLocaleString()}
              </span>
              {link.expiration !== null && (
                <span className={styles.historyDetail}>
                  {strings.history?.expires}:
                  {' '}
                  {optionLabel(link.expiration, strings.link?.expirationOptions, {})}
                </span>
              )}
              <span className={styles.historyDetail}>
                {strings.history?.usage}:{' '}
                {optionLabel(link.usage, strings.link?.usageOptions, {})}
              </span>
            </div>
          </div>
          <CopyableLink
            label={strings.link?.copyButton}
            url={link.url}
            copiedLabel={copyStrings?.copied}
            copyLabel={copyStrings?.copy}
          />
        </li>
      ))}
    </ul>
  );
};
