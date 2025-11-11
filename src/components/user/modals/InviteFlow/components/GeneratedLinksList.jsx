import { Link as LinkIcon } from '@/components/common/icons';
import { CopyableLink } from './CopyableLink';
import { optionLabel } from '../utils/helpers';
import styles from '../InviteFlow.module.css';

export const GeneratedLinksList = ({ links, strings, copyStrings }) => {
  if (links.length === 0) {
    return <p className={styles.emptyHistory}>{strings.history?.empty ?? '아직 생성된 링크가 없습니다.'}</p>;
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
                {strings.history?.created ?? '생성'}:{' '}
                {new Date(link.createdAt).toLocaleString()}
              </span>
              {link.expiration !== null && (
                <span className={styles.historyDetail}>
                  {strings.history?.expires ?? '만료'}:
                  {' '}
                  {optionLabel(link.expiration, strings.link?.expirationOptions, {
                    '24h': '24시간',
                    '7d': '7일',
                    '30d': '30일',
                    never: '만료 없음',
                  })}
                </span>
              )}
              <span className={styles.historyDetail}>
                {strings.history?.usage ?? '사용 제한'}:{' '}
                {optionLabel(link.usage, strings.link?.usageOptions, {
                  '1': '1회',
                  '5': '5회',
                  '10': '10회',
                  '50': '50회',
                  unlimited: '무제한',
                  single: '1회',
                })}
              </span>
            </div>
          </div>
          <CopyableLink
            label={strings.link?.copyButton ?? '링크 복사'}
            url={link.url}
            copiedLabel={copyStrings?.copied ?? '복사됨'}
            copyLabel={copyStrings?.copy ?? '복사'}
          />
        </li>
      ))}
    </ul>
  );
};
