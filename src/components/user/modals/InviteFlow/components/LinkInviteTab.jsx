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
      <p className={styles.helperText}>{strings.link?.description ?? '초대 링크를 생성하고 조건을 설정하세요.'}</p>

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
        <span>{strings.link?.generateButton ?? '초대 링크 생성'}</span>
      </button>

      <div className={styles.history}>
        <h4>{strings.history?.title ?? '생성된 초대 링크'}</h4>
        <GeneratedLinksList
          links={generatedLinks}
          strings={strings}
          copyStrings={copyStrings}
        />
      </div>
    </div>
  );
};
