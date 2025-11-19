'use client';

import { Share } from '@/components/common/icons';
import { TargetSelector } from './TargetSelector';
import { LinkSettingsForm } from './LinkSettingsForm';
import { GeneratedLinksList } from './GeneratedLinksList';
import styles from '../InviteFlow.module.css';

export const LinkInviteTab = ({
  linkSettings,
  onSettingsChange,
  selectableTargets,
  selectedTargets,
  onToggleTarget,
  onGenerateLink,
  generatedLinks,
  strings,
  copyStrings,
  mode,
  inviteTargetsLabel,
}) => {
  return (
    <div className={styles.tabPane}>
      <p className={styles.helperText}>{strings.link?.description ?? 'Generate an invite link and configure its settings.'}</p>

      <TargetSelector
        targets={selectableTargets}
        selectedTargets={selectedTargets}
        onToggleTarget={onToggleTarget}
        label={inviteTargetsLabel}
        mode={mode}
      />

      <LinkSettingsForm
        linkSettings={linkSettings}
        onSettingsChange={onSettingsChange}
        strings={strings}
      />

      <button type="button" className={styles.primaryAction} onClick={onGenerateLink}>
        <Share size={16} />
        <span>{strings.link?.generateButton ?? 'Generate Invite Link'}</span>
      </button>

      <div className={styles.history}>
        <h4>{strings.history?.title ?? 'Generated Invite Links'}</h4>
        <GeneratedLinksList
          links={generatedLinks}
          strings={strings}
          copyStrings={copyStrings}
        />
      </div>
    </div>
  );
};
