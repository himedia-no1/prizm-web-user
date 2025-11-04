import { useMemo, useState } from 'react';
import { mockUsers } from '@/__mocks__/users';
import useStrings from '@/hooks/useStrings';
import { Search, Link as LinkIcon, Users as UsersIcon, Hash as HashIcon, Share, ShieldCheck, X } from '@/components/common/icons';
import styles from './InviteFlowContent.module.css';

const MOCK_GROUPS = [
  { id: 'lead', name: 'Leadership' },
  { id: 'eng', name: 'Engineering' },
  { id: 'design', name: 'Design' },
  { id: 'product', name: 'Product' },
  { id: 'marketing', name: 'Marketing' },
];

const MOCK_CHANNELS = [
  { id: 'general', name: '#general' },
  { id: 'design', name: '#design-review' },
  { id: 'support', name: '#support' },
  { id: 'handover', name: '#handover' },
  { id: 'launch', name: '#launch-war-room' },
];

const EXPIRATION_OPTIONS = ['24h', '7d', '30d', 'never'];
const USAGE_OPTIONS = ['1', '5', '10', '50', 'unlimited'];

const generateInviteCode = () => Math.random().toString(36).slice(2, 10).toUpperCase();

const buildInviteLink = (mode, channelId) => {
  const code = generateInviteCode();
  const base = mode === 'guest' ? 'guest' : 'member';
  const channelSegment = channelId ? `${channelId}/` : '';
  return {
    id: `${base}-${code}`,
    url: `https://prizm.app/invite/${base}/${channelSegment}${code}`,
    code,
  };
};

const optionLabel = (key, map, fallback) => map?.[key] ?? fallback?.[key] ?? key;

const multiSelectToggle = (current, id) => {
  if (current.includes(id)) {
    return current.filter((value) => value !== id);
  }
  return [...current, id];
};

const useInviteStrings = (mode) => {
  const strings = useStrings();
  const inviteStrings = mode === 'guest' ? strings.modals?.inviteGuest : strings.modals?.inviteMember;
  return {
    invite: inviteStrings ?? {},
    copy: strings.copy ?? {},
  };
};

export const InviteFlowContent = ({ mode = 'member', channelId, channelName }) => {
  const { invite: s, copy: copyStrings } = useInviteStrings(mode);
  const [activeTab, setActiveTab] = useState('direct');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState(() => {
    if (mode === 'guest' && channelId) {
      return [channelId];
    }
    return [];
  });
  const [lastResult, setLastResult] = useState(null);
  const [generatedLinks, setGeneratedLinks] = useState([]);
  const [linkSettings, setLinkSettings] = useState({
    expiration: '7d',
    usage: 'unlimited',
    joinRule: 'auto',
  });
  const formattedDescription = useMemo(() => {
    if (!s.description) {
      return mode === 'guest'
        ? '게스트를 채널에 초대하는 방법을 선택하세요.'
        : '워크스페이스 멤버 초대 방법을 선택하세요.';
    }
    if (mode === 'guest' && channelName) {
      return s.description.replace('{{channel}}', `#${channelName}`);
    }
    return s.description;
  }, [channelName, mode, s.description]);

  const allUsers = useMemo(() => Object.values(mockUsers), []);

  const availableUsers = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowered = searchTerm.trim().toLowerCase();
    return allUsers
      .filter(
        (user) =>
          !selectedUsers.find((selected) => selected.id === user.id) &&
          (user.email?.toLowerCase().includes(lowered) || user.name?.toLowerCase().includes(lowered)),
      )
      .slice(0, 8);
  }, [allUsers, searchTerm, selectedUsers]);

  const inviteTargetsLabel =
    mode === 'guest'
      ? s.email?.channelLabel ?? '채널 접근 권한'
      : s.email?.groupLabel ?? '그룹 설정';

  const selectableTargets = useMemo(() => {
    const base = mode === 'guest' ? MOCK_CHANNELS : MOCK_GROUPS;
    if (mode !== 'guest' || !channelId) {
      return base;
    }
    const exists = base.some((target) => target.id === channelId);
    if (exists) return base;
    const label = channelName ? `#${channelName}` : `#${channelId}`;
    return [{ id: channelId, name: label }, ...base];
  }, [channelId, channelName, mode]);
  const selectedTargets = mode === 'guest' ? selectedChannels : selectedGroups;

  const toggleTarget = (id) => {
    if (mode === 'guest') {
      setSelectedChannels(multiSelectToggle(selectedChannels, id));
    } else {
      setSelectedGroups(multiSelectToggle(selectedGroups, id));
    }
  };

  const resetSelections = () => {
    setSelectedUsers([]);
    setSelectedGroups([]);
    setSelectedChannels(channelId ? [channelId] : []);
  };

  const handleAddUser = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSearchTerm('');
  };

  const handleRemoveUser = (id) => {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleSendInvites = () => {
    if (selectedUsers.length === 0) return;
    const invites = selectedUsers.map((user) => {
      const link = buildInviteLink(mode, channelId);
      return {
        user,
        link,
        groups: selectedGroups.slice(),
        channels: selectedChannels.slice(),
        createdAt: new Date().toISOString(),
      };
    });
    setLastResult({ type: 'direct', invites });
    setGeneratedLinks((prev) => [...prev, ...invites.map(({ link, createdAt }) => ({
      id: link.id,
      url: link.url,
      code: link.code,
      createdAt,
      expiration: null,
      usage: 'single',
      joinRule: 'auto',
      targets: selectedTargets.slice(),
      origin: 'direct',
    }))]);
    resetSelections();
  };

  const handleGenerateLink = () => {
    const link = buildInviteLink(mode, channelId);
    const record = {
      id: link.id,
      url: link.url,
      code: link.code,
      createdAt: new Date().toISOString(),
      expiration: linkSettings.expiration,
      usage: linkSettings.usage,
      joinRule: linkSettings.joinRule,
      targets: selectedTargets.slice(),
      origin: 'link',
    };
    setGeneratedLinks((prev) => [record, ...prev]);
    setLastResult({ type: 'link', link: record });
  };

  const handleCopy = async (text, callback) => {
    try {
      await navigator.clipboard?.writeText(text);
      if (callback) callback(true);
    } catch (error) {
      if (callback) callback(false);
    }
  };

  const renderSelectedUsers = () => (
    <div className={styles.selectedList}>
      {selectedUsers.length === 0 && (
        <p className={styles.emptySelected}>{s.email?.emptySelection ?? '선택된 사용자가 없습니다.'}</p>
      )}
      {selectedUsers.map((user) => (
        <span key={user.id} className={styles.selectedChip}>
          <UsersIcon size={14} />
          <span>{user.email}</span>
          <button type="button" onClick={() => handleRemoveUser(user.id)}>
            <X size={12} />
          </button>
        </span>
      ))}
    </div>
  );

  const renderTargets = () => (
    <div className={styles.targets}>
      <span className={styles.targetsLabel}>{inviteTargetsLabel}</span>
      <div className={styles.targetGrid}>
        {selectableTargets.map((target) => {
          const isSelected = selectedTargets.includes(target.id);
          return (
            <button
              key={target.id}
              type="button"
              className={`${styles.targetOption} ${isSelected ? styles.targetOptionActive : ''}`}
              onClick={() => toggleTarget(target.id)}
            >
              {mode === 'guest' ? <HashIcon size={14} /> : <UsersIcon size={14} />}
              <span>{target.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderDirectTab = () => (
    <div className={styles.tabPane}>
      <label className={styles.fieldLabel} htmlFor="invite-search">
        {s.email?.searchLabel ?? '사용자 이메일 검색'}
      </label>
      <div className={styles.searchField}>
        <Search size={16} />
        <input
          id="invite-search"
          type="text"
          value={searchTerm}
          placeholder={s.email?.searchPlaceholder ?? 'name@example.com'}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      {searchTerm && availableUsers.length > 0 && (
        <div className={styles.searchResults}>
          {availableUsers.map((user) => (
            <button key={user.id} type="button" onClick={() => handleAddUser(user)}>
              <span>{user.name}</span>
              <span className={styles.resultEmail}>{user.email}</span>
            </button>
          ))}
        </div>
      )}

      {renderSelectedUsers()}
      {renderTargets()}

      <button
        type="button"
        className={styles.primaryAction}
        disabled={selectedUsers.length === 0}
        onClick={handleSendInvites}
      >
        {s.email?.sendButton ?? '초대 보내기'}
      </button>

      {lastResult?.type === 'direct' && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <ShieldCheck size={16} />
            <div>
              <strong>{s.email?.successTitle ?? '초대가 전송되었습니다.'}</strong>
              <p>{s.email?.successSubtitle ?? '아래 링크를 확인하여 전송 내역을 추적할 수 있습니다.'}</p>
            </div>
          </div>
          <ul className={styles.resultList}>
            {lastResult.invites.map(({ user, link }) => (
              <li key={link.id}>
                <div>
                  <span className={styles.resultName}>{user.email}</span>
                  <span className={styles.resultCode}>{link.id}</span>
                </div>
                  <CopyableLink
                    label={s.email?.copyLink ?? '링크 복사'}
                    url={link.url}
                    copiedLabel={copyStrings?.copied ?? '복사됨'}
                    copyLabel={copyStrings?.copy ?? '복사'}
                  />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderLinkTab = () => (
    <div className={styles.tabPane}>
      <p className={styles.helperText}>{s.link?.description ?? '초대 링크를 생성하고 조건을 설정하세요.'}</p>

      {renderTargets()}

      <div className={styles.inlineFields}>
        <div className={styles.inlineField}>
          <label htmlFor="invite-expiration">{s.link?.expirationLabel ?? '만료 시간'}</label>
          <select
            id="invite-expiration"
            value={linkSettings.expiration}
            onChange={(event) =>
              setLinkSettings((prev) => ({ ...prev, expiration: event.target.value }))
            }
          >
            {EXPIRATION_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {optionLabel(option, s.link?.expirationOptions, {
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
          <label htmlFor="invite-usage">{s.link?.usageLabel ?? '최대 사용 횟수'}</label>
          <select
            id="invite-usage"
            value={linkSettings.usage}
            onChange={(event) => setLinkSettings((prev) => ({ ...prev, usage: event.target.value }))}
          >
            {USAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {optionLabel(option, s.link?.usageOptions, {
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

      <div className={styles.inlineField}>
        <label htmlFor="invite-join-rule">{s.link?.approvalLabel ?? '가입 방식'}</label>
        <select
          id="invite-join-rule"
          value={linkSettings.joinRule}
          onChange={(event) =>
            setLinkSettings((prev) => ({ ...prev, joinRule: event.target.value }))
          }
        >
          <option value="auto">
            {optionLabel('auto', s.link?.approvalOptions, { auto: '바로 가입' })}
          </option>
          <option value="approval">
            {optionLabel('approval', s.link?.approvalOptions, { approval: '가입 승인 필요' })}
          </option>
        </select>
      </div>

      <button type="button" className={styles.primaryAction} onClick={handleGenerateLink}>
        <Share size={16} />
        <span>{s.link?.generateButton ?? '초대 링크 생성'}</span>
      </button>

      {lastResult?.type === 'link' && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <ShieldCheck size={16} />
            <div>
              <strong>{s.link?.successTitle ?? '초대 링크가 생성되었습니다.'}</strong>
              <p>{s.link?.successSubtitle ?? '필요한 사용자에게 링크를 공유하세요.'}</p>
            </div>
          </div>
          <CopyableLink
            label={s.link?.copyButton ?? '링크 복사'}
            url={lastResult.link.url}
            copiedLabel={copyStrings?.copied ?? '복사됨'}
            copyLabel={copyStrings?.copy ?? '복사'}
          />
        </div>
      )}

      <div className={styles.history}>
        <h4>{s.history?.title ?? '생성된 초대 링크'}</h4>
        {generatedLinks.length === 0 ? (
          <p className={styles.emptyHistory}>{s.history?.empty ?? '아직 생성된 링크가 없습니다.'}</p>
        ) : (
          <ul className={styles.historyList}>
            {generatedLinks.map((link) => (
              <li key={link.id}>
                <div className={styles.historyMeta}>
                  <LinkIcon size={16} />
                  <div>
                    <span className={styles.historyCode}>{link.id}</span>
                    <span className={styles.historyDetail}>
                      {s.history?.created ?? '생성'}:{' '}
                      {new Date(link.createdAt).toLocaleString()}
                    </span>
                    {link.expiration !== null && (
                      <span className={styles.historyDetail}>
                        {s.history?.expires ?? '만료'}:
                        {' '}
                        {optionLabel(link.expiration, s.link?.expirationOptions, {
                          '24h': '24시간',
                          '7d': '7일',
                          '30d': '30일',
                          never: '만료 없음',
                        })}
                      </span>
                    )}
                    <span className={styles.historyDetail}>
                      {s.history?.usage ?? '사용 제한'}:{' '}
                      {optionLabel(link.usage, s.link?.usageOptions, {
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
                  label={s.link?.copyButton ?? '링크 복사'}
                  url={link.url}
                  copiedLabel={copyStrings?.copied ?? '복사됨'}
                  copyLabel={copyStrings?.copy ?? '복사'}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.inviteFlow}>
      <p className={styles.description}>{formattedDescription}</p>
      {mode === 'guest' && channelName && (
        <div className={styles.contextBanner}>
          <HashIcon size={16} />
          <span>
            {s.context?.channelPrefix ?? '채널'} {channelName}
          </span>
        </div>
      )}

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'direct' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('direct')}
        >
          {s.tabs?.direct ?? '이메일로 초대'}
        </button>
        <button
          type="button"
          className={`${styles.tabButton} ${activeTab === 'link' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('link')}
        >
          {s.tabs?.link ?? '초대 링크 생성'}
        </button>
      </div>

      {activeTab === 'direct' ? renderDirectTab() : renderLinkTab()}
    </div>
  );
};

const CopyableLink = ({ url, label, copyLabel, copiedLabel }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <div className={styles.copyRow}>
      <code>{url}</code>
      <button type="button" onClick={handleCopy}>
        {copied ? copiedLabel ?? '복사됨' : copyLabel ?? label ?? '복사'}
      </button>
    </div>
  );
};

export default InviteFlowContent;
