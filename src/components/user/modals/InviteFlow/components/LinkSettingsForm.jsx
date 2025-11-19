'use client';

import { EXPIRATION_OPTIONS, USAGE_OPTIONS } from '../utils/constants';
import { optionLabel } from '../utils/helpers';
import styles from '../InviteFlow.module.css';

export const LinkSettingsForm = ({ linkSettings, onSettingsChange, strings }) => {
  return (
    <div className={styles.inlineFields}>
      <div className={styles.inlineField}>
        <label htmlFor="invite-expiration">{strings.link?.expirationLabel}</label>
        <select
          id="invite-expiration"
          value={linkSettings.expiration}
          onChange={(event) =>
            onSettingsChange({ ...linkSettings, expiration: event.target.value })
          }
        >
          {EXPIRATION_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {optionLabel(option, strings.link?.expirationOptions, {})}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inlineField}>
        <label htmlFor="invite-usage">{strings.link?.usageLabel}</label>
        <select
          id="invite-usage"
          value={linkSettings.usage}
          onChange={(event) => onSettingsChange({ ...linkSettings, usage: event.target.value })}
        >
          {USAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {optionLabel(option, strings.link?.usageOptions, {})}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
