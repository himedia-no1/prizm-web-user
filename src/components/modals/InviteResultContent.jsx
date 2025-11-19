'use client';

import { useMessages } from 'next-intl';
import { Users as UsersIcon, Share } from '@/components/common/icons';
import { CopyableLink } from './InviteFlowContent';
import styles from './InviteResultContent.module.css';

const formatUsage = (value, options, fallback) => options?.[value] ?? fallback[value] ?? value;

const USAGE_FALLBACK = {
  '1': '1 use',
  '5': '5 uses',
  '10': '10 uses',
  '50': '50 uses',
  unlimited: 'Unlimited',
  single: '1 use',
};

const formatTimestamp = (value) => {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleString();
};

export const InviteResultContent = ({ mode = 'member', resultType = 'direct', entries = [], link, onClose }) => {
  const messages = useMessages() ?? {};
  const inviteStrings = mode === 'guest' ? messages.modals?.inviteGuest : messages.modals?.inviteMember;
  const copyStrings = messages.copy;
  const resultStrings = messages.modals?.inviteResult;

  if (!inviteStrings || !copyStrings || !resultStrings) {
    return null;
  }

  const description =
    resultType === 'link'
      ? resultStrings.linkDescription
      : mode === 'guest'
      ? resultStrings.guestDescription
      : resultStrings.memberDescription;

  return (
    <div className={styles.resultModal}>
      <header className={styles.header}>
        <Share size={18} />
        <div>
          <h3>{inviteStrings.link?.successTitle ?? inviteStrings.email?.successTitle ?? resultStrings.title}</h3>
          <p>{description}</p>
        </div>
      </header>

      {resultType === 'direct' ? (
        <ul className={styles.inviteList}>
          {entries.map((entry) => (
            <li key={`${entry.email}-${entry.code}`}>
              <div className={styles.inviteMeta}>
                <UsersIcon size={16} />
                <div>
                  <span className={styles.primaryText}>{entry.email}</span>
                  <span className={styles.secondaryText}>{entry.code}</span>
                </div>
              </div>
              <CopyableLink
                url={entry.url}
                copyLabel={copyStrings.copy}
                copiedLabel={copyStrings.copied}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.linkSummary}>
          <CopyableLink
            url={link?.url}
            copyLabel={copyStrings.copy}
            copiedLabel={copyStrings.copied}
          />
          <dl className={styles.linkDetails}>
            {link?.code && (
              <div>
                <dt>{resultStrings.codeLabel}</dt>
                <dd>{link.code}</dd>
              </div>
            )}
            {link?.expiration && (
              <div>
                <dt>{inviteStrings.link?.expirationLabel}</dt>
                <dd>{inviteStrings.link?.expirationOptions?.[link.expiration] ?? link.expiration}</dd>
              </div>
            )}
            {link?.usage && (
              <div>
                <dt>{inviteStrings.link?.usageLabel}</dt>
                <dd>{formatUsage(link.usage, inviteStrings.link?.usageOptions, USAGE_FALLBACK)}</dd>
              </div>
            )}
            {link?.createdAt && (
              <div>
                <dt>{resultStrings.createdLabel}</dt>
                <dd>{formatTimestamp(link.createdAt)}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className="profile-modal__save-button" onClick={() => onClose?.()}>
          {resultStrings.close}
        </button>
      </div>
    </div>
  );
};

export default InviteResultContent;
