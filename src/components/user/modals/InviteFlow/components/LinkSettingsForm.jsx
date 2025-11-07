import { EXPIRATION_OPTIONS, USAGE_OPTIONS } from '../utils/constants';
import { optionLabel } from '../utils/helpers';
import styles from '../InviteFlow.module.css';

export const LinkSettingsForm = ({ linkSettings, onSettingsChange, strings }) => {
  return (
    <div className={styles.inlineFields}>
      <div className={styles.inlineField}>
        <label htmlFor="invite-expiration">{strings.link?.expirationLabel ?? '만료 시간'}</label>
        <select
          id="invite-expiration"
          value={linkSettings.expiration}
          onChange={(event) =>
            onSettingsChange({ ...linkSettings, expiration: event.target.value })
          }
        >
          {EXPIRATION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {optionLabel(option, strings.link?.expirationOptions, {
                '24h': '24시간',
                '7d': '7일',
                '30d': '30일',
                never: '만료 없음',
              })}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inlineField}>
        <label htmlFor="invite-usage">{strings.link?.usageLabel ?? '최대 사용 횟수'}</label>
        <select
          id="invite-usage"
          value={linkSettings.usage}
          onChange={(event) => onSettingsChange({ ...linkSettings, usage: event.target.value })}
        >
          {USAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {optionLabel(option, strings.link?.usageOptions, {
                '1': '1회',
                '5': '5회',
                '10': '10회',
                '50': '50회',
                unlimited: '무제한',
              })}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
