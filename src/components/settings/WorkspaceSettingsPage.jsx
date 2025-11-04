'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useStrings from '@/hooks/useStrings';
import {
  ArrowLeft,
  LayoutGrid,
  Users,
  Hash,
  Link,
  Mail,
  Lock,
  FileText,
  AIIcon,
  Search,
} from '@/components/common/icons';
import { mockUsers, mockRecentActivities } from '@/__mocks__/users';
import { mockWorkspaceStats } from '@/__mocks__/workspaces';

import AiAssistantPage from '@/app/settings/workspace/[workspaceId]/ai-assistant/ai-assistant.page';
import AiSearchSettingsPage from '@/app/settings/workspace/[workspaceId]/ai-search/page';

const navItems = [
  { id: 'overview', icon: LayoutGrid, labelKey: 'navDashboard' },
  { id: 'members', icon: Users, labelKey: 'navMembers' },
  { id: 'invite-management', icon: Mail, labelKey: 'navInviteManagement' },
  { id: 'groups', icon: Hash, labelKey: 'navGroups' },
  { id: 'integrations', icon: Link, labelKey: 'navIntegrations' },
  { id: 'security', icon: Lock, labelKey: 'navSecurity' },
  { id: 'audit', icon: FileText, labelKey: 'navAuditLog' },
  { id: 'ai-assistant', icon: AIIcon, labelKey: 'navAiAssistant' },
  { id: 'ai-search', icon: AIIcon, labelKey: 'navAiSearch' },
];

const mockInvitations = [
  { id: 'inv1', email: 'mira@company.com', status: 'pending', invitedBy: 'Alice Kim', sentAt: '2024-03-01' },
  { id: 'inv2', email: 'sunny@client.com', status: 'accepted', invitedBy: 'Bob Lee', sentAt: '2024-02-18' },
  { id: 'inv3', email: 'justin@studio.io', status: 'expired', invitedBy: 'Eve Seo', sentAt: '2024-02-05' },
];

const mockBlockedMembers = [
  { id: 'blk1', name: 'Guest Lee', email: 'guest.lee@example.com', reason: 'Suspicious activity', blockedAt: '2024-01-28' },
  { id: 'blk2', name: 'Agency Park', email: 'agency.park@example.com', reason: 'Spam invites', blockedAt: '2023-12-17' },
];

const mockInviteLinks = [
  {
    id: 'link-1',
    type: 'member',
    url: 'https://prizm.app/invite/member/wxy891',
    usage: '5',
    expiration: '7d',
    createdAt: '2024-03-12T09:12:00Z',
    createdBy: 'Alice Kim',
  },
  {
    id: 'link-2',
    type: 'guest',
    url: 'https://prizm.app/invite/guest/design-42jl',
    usage: 'unlimited',
    expiration: '30d',
    createdAt: '2024-03-05T15:45:00Z',
    createdBy: 'Bob Lee',
  },
];

const mockMemberHistory = [
  { id: 'hist1', name: 'Alice Kim', action: 'join', timestamp: '2024-01-02 09:30' },
  { id: 'hist2', name: 'David Choi', action: 'leave', timestamp: '2024-02-15 18:42' },
  { id: 'hist3', name: 'Eve Seo', action: 'join', timestamp: '2024-02-26 11:14' },
  { id: 'hist4', name: 'Guest Lee', action: 'invited', timestamp: '2024-03-01 08:20' },
];

const mockGroups = [
  {
    id: 'grp1',
    name: 'Product Team',
    description: '제품 기획 및 디자인 담당',
    members: 12,
    channels: ['general', 'product-design', 'roadmap'],
  },
  {
    id: 'grp2',
    name: 'Customer Success',
    description: '고객 문의 및 지원 담당',
    members: 8,
    channels: ['general', 'support', 'bug-report'],
  },
  {
    id: 'grp3',
    name: 'External Contractors',
    description: '외부 파트너 협업용 그룹',
    members: 5,
    channels: ['general', 'handover', 'assets-share'],
  },
];

const workspaceChannels = ['general', 'product-design', 'roadmap', 'support', 'bug-report', 'handover', 'assets-share', 'random'];

const WorkspaceSettingsPage = ({ onBack }) => {
  const router = useRouter();
  const s = useStrings();
  const [currentTab, setCurrentTab] = useState('overview');
  const [copiedLinkId, setCopiedLinkId] = useState(null);
  const invitations = useMemo(() => mockInvitations, []);
  const blockedMembers = useMemo(() => mockBlockedMembers, []);
  const membershipHistory = useMemo(() => mockMemberHistory, []);
  const groups = useMemo(() => mockGroups, []);
  const inviteLinks = useMemo(() => mockInviteLinks, []);
  const stats = useMemo(
    () =>
      mockWorkspaceStats.map((stat) => ({
        ...stat,
        label:
          stat.id === 'members'
            ? s.workspaceAdmin.statMembers
            : stat.id === 'channels'
            ? s.workspaceAdmin.statChannels
            : stat.id === 'messages'
            ? s.workspaceAdmin.statMessages
            : s.workspaceAdmin.statActiveUsers,
      })),
    [s],
  );
  const members = useMemo(() => Object.values(mockUsers), []);
  const participants = useMemo(
    () =>
      members.map((member) => ({
        id: member.id,
        name: member.realName || member.name,
        displayName: member.name,
        email: member.email,
        role: member.role,
        status: member.status,
        type: member.role === 'Guest' ? 'Guest' : 'Member',
        group: member.role === 'Guest' ? 'External Contractors' : 'Core Team',
        avatar: member.avatar,
      })),
    [members],
  );
  const [groupPermissions, setGroupPermissions] = useState(() =>
    mockGroups.reduce((acc, group) => {
      acc[group.id] = group.channels;
      return acc;
    }, {}),
  );

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.back();
  };

  const handleToggleGroupChannel = (groupId, channelId) => {
    setGroupPermissions((prev) => {
      const current = prev[groupId] || [];
      const exists = current.includes(channelId);
      const nextChannels = exists
        ? current.filter((id) => id !== channelId)
        : [...current, channelId];
      return {
        ...prev,
        [groupId]: nextChannels,
      };
    });
  };

  const handleCopyInviteLink = async (linkId, url) => {
    try {
      await navigator.clipboard?.writeText(url);
      setCopiedLinkId(linkId);
      setTimeout(() => setCopiedLinkId(null), 2000);
    } catch (error) {
      setCopiedLinkId(null);
    }
  };

  const getInviteStatusTone = (status) => {
    switch (status) {
      case 'accepted':
        return {
          background: 'rgba(34, 197, 94, 0.12)',
          color: '#15803d',
          label: s.workspaceAdmin.membersInviteStatusAccepted,
        };
      case 'expired':
        return {
          background: 'rgba(248, 113, 113, 0.18)',
          color: '#b91c1c',
          label: s.workspaceAdmin.membersInviteStatusExpired,
        };
      default:
        return {
          background: 'rgba(234, 179, 8, 0.18)',
          color: '#92400e',
          label: s.workspaceAdmin.membersInviteStatusPending,
        };
    }
  };

  const formatInviteTimestamp = (value) => {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return date.toLocaleString();
  };

  const renderOverview = () => (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.dashboardTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.dashboardSubtitle}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '0.75rem',
              padding: '1.25rem',
              background: 'var(--card-bg)',
              boxShadow: '0 1px 3px var(--shadow)',
            }}
          >
            <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '0.5rem' }}>{stat.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', display: 'grid', gap: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>
            {s.workspaceAdmin.workspaceOverviewTitle}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            {s.workspaceAdmin.workspaceOverviewDescription}
          </p>
          <div className="settings-form-group">
            <label htmlFor="ws-name">{s.workspaceAdmin.workspaceNameLabel}</label>
            <input id="ws-name" type="text" defaultValue="Prizm Dev" />
          </div>
          <div className="settings-form-group">
            <label htmlFor="ws-desc">{s.workspaceAdmin.workspaceDescriptionLabel}</label>
            <textarea
              id="ws-desc"
              rows={3}
              defaultValue="프리즘 팀이 협업하고 작업물을 공유하는 공식 워크스페이스입니다."
            />
          </div>
          <button className="profile-modal__save-button">{s.workspaceAdmin.saveChanges}</button>
        </div>

        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>
            {s.workspaceAdmin.recentActivity}
          </h3>
          <div className="channel-modal__list">
            {mockRecentActivities.map((activity) => (
              <div key={activity.id} className="channel-modal__list-item member" style={{ padding: '0.75rem 0' }}>
                <img src={activity.user.avatar} alt={activity.user.name} style={{ width: 32, height: 32 }} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span>{activity.action}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{activity.details}</span>
                </span>
                <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderInviteManagement = () => (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.inviteManagementTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.inviteManagementDescription}
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.inviteManagementPendingTitle}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
          {s.workspaceAdmin.membersInviteStatusDescription}
        </p>
        {invitations.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            {s.workspaceAdmin.membersInviteStatusEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {invitations.map((invite) => {
              const tone = getInviteStatusTone(invite.status);
              return (
                <div
                  key={invite.id}
                  className="channel-modal__list-item member"
                  style={{ alignItems: 'center', gap: '1rem', padding: '0.75rem 0' }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                    <strong>{invite.email}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {invite.invitedBy} · {invite.sentAt}
                    </span>
                  </span>
                  <span
                    style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: '9999px',
                      background: tone.background,
                      color: tone.color,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {tone.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.inviteManagementLinksTitle}</h3>
        <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
          {s.workspaceAdmin.inviteManagementLinksDescription}
        </p>
        {inviteLinks.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            {s.workspaceAdmin.inviteManagementLinksEmpty}
          </p>
        ) : (
          <div className="channel-modal__list">
            {inviteLinks.map((link) => {
              const baseStrings =
                link.type === 'guest' ? s.modals?.inviteGuest?.link : s.modals?.inviteMember?.link;
              const typeLabel =
                link.type === 'guest'
                  ? s.workspaceAdmin.inviteManagementLinkGuest
                  : s.workspaceAdmin.inviteManagementLinkMember;
              const expirationLabel = baseStrings?.expirationOptions?.[link.expiration] ?? link.expiration;
              const usageLabel = baseStrings?.usageOptions?.[link.usage] ?? link.usage;
              const Icon = link.type === 'guest' ? Hash : Users;

              return (
                <div
                  key={link.id}
                  className="channel-modal__list-item"
                  style={{ gap: '1rem', padding: '0.85rem 0', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flex: 1 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <strong>{typeLabel}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{link.id}</span>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{link.url}</span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem' }}>
                        <span>{expirationLabel}</span>
                        <span>•</span>
                        <span>{usageLabel}</span>
                        <span>•</span>
                        <span>{formatInviteTimestamp(link.createdAt)}</span>
                        <span>•</span>
                        <span>{link.createdBy}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="profile-action-button"
                    style={{ padding: '0.45rem 0.85rem' }}
                    onClick={() => handleCopyInviteLink(link.id, link.url)}
                  >
                    {copiedLinkId === link.id
                      ? s.workspaceAdmin.inviteManagementCopied
                      : s.workspaceAdmin.inviteManagementCopy}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );

  const renderMembers = () => {

    const getHistoryMessage = (action) => {
      switch (action) {
        case 'join':
          return s.workspaceAdmin.membersHistoryActionJoin;
        case 'leave':
          return s.workspaceAdmin.membersHistoryActionLeave;
        default:
          return s.workspaceAdmin.membersHistoryActionInvited;
      }
    };

    return (
      <div>
        <h2 className="settings-content__header">{s.workspaceAdmin.membersTitle}</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          {s.workspaceAdmin.membersDescription}
        </p>

        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.membersBlockedTitle}</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
            {s.workspaceAdmin.membersBlockedDescription}
          </p>
          {blockedMembers.length === 0 ? (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              {s.workspaceAdmin.membersBlockedEmpty}
            </p>
          ) : (
            <div className="channel-modal__list">
              {blockedMembers.map((blocked) => (
                <div
                  key={blocked.id}
                  className="channel-modal__list-item member"
                  style={{ alignItems: 'center', gap: '1rem', padding: '0.75rem 0' }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', flex: 1 }}>
                    <strong>{blocked.name}</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{blocked.email}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      {blocked.reason} · {blocked.blockedAt}
                    </span>
                  </span>
                  <button className="profile-action-button" style={{ padding: '0.4rem 0.75rem' }}>
                    {s.workspaceAdmin.membersBlockedUnblock}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.membersParticipantsTitle}</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
            {s.workspaceAdmin.membersParticipantsDescription}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button className="profile-modal__save-button" style={{ width: 'auto' }}>
              {s.workspaceAdmin.membersExport}
            </button>
            <button className="profile-modal__save-button" style={{ width: 'auto', background: 'var(--primary-light)' }}>
              {s.workspaceAdmin.membersMoveToGroup}
            </button>
            <button className="profile-modal__save-button" style={{ width: 'auto' }}>
              {s.workspaceAdmin.inviteMember}
            </button>
          </div>
          <div className="channel-modal__list">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="channel-modal__list-item member"
                style={{ alignItems: 'center', gap: '1rem', padding: '0.75rem 0' }}
              >
                <input type="checkbox" style={{ margin: 0 }} />
                <img src={participant.avatar} alt={participant.displayName} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                  <strong>{participant.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {participant.displayName} · {participant.email}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {participant.type} · {participant.group}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: participant.status === 'online' ? '#16a34a' : 'var(--text-secondary)',
                    textTransform: 'capitalize',
                  }}
                >
                  {participant.status}
                </span>
                <button className="profile-action-button" style={{ padding: '0.4rem 0.75rem' }}>
                  {s.workspaceAdmin.membersMoveToGroup}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{s.workspaceAdmin.membersHistoryTitle}</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0.35rem 0 1rem' }}>
            {s.workspaceAdmin.membersHistoryDescription}
          </p>
          {membershipHistory.length === 0 ? (
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              {s.workspaceAdmin.membersHistoryEmpty}
            </p>
          ) : (
            <div className="channel-modal__list">
              {membershipHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="channel-modal__list-item"
                  style={{ padding: '0.75rem 0', gap: '1rem' }}
                >
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                    <strong>{entry.name}</strong>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {getHistoryMessage(entry.action)}
                    </span>
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{entry.timestamp}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  };

  const renderGroups = () => (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.groupsTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.groupsDescription}
      </p>

      <button className="profile-modal__save-button" style={{ width: 'auto', marginBottom: '1.5rem' }}>
        {s.workspaceAdmin.groupsCreate}
      </button>

      <div className="channel-modal__list" style={{ gap: '1.25rem' }}>
        {groups.map((group) => {
          const assignedChannels = groupPermissions[group.id] || [];
          return (
            <div
              key={group.id}
              className="channel-modal__list-item"
              style={{
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '1rem',
                border: '1px solid var(--border)',
                borderRadius: '0.85rem',
                padding: '1.25rem',
                background: 'var(--card-bg)',
                boxShadow: '0 1px 3px var(--shadow)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '1rem' }}>{group.name}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {s.workspaceAdmin.groupsMembersLabel}: {group.members}
                  </span>
                </div>
                <p style={{ margin: '0.4rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {group.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {s.workspaceAdmin.groupsChannelsLabel}
                </h4>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '0.5rem 1rem',
                  }}
                >
                  {workspaceChannels.map((channel) => (
                    <label
                      key={`${group.id}-${channel}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}
                    >
                      <input
                        type="checkbox"
                        checked={assignedChannels.includes(channel)}
                        onChange={() => handleToggleGroupChannel(group.id, channel)}
                      />
                      <span>#{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="profile-modal__save-button" style={{ width: 'auto' }}>
                  {s.workspaceAdmin.groupsSave}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );


  const renderIntegrations = () => (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.integrationsTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {s.workspaceAdmin.integrationsDescription}
      </p>
      <div className="channel-modal__list">
        <div className="channel-modal__list-item" style={{ gap: '1rem' }}>
          <div>
            <strong>Slack Sync</strong>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              채널 메시지 양방향 동기화
            </div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#22c55e', fontSize: '0.85rem' }}>
            {s.workspaceAdmin.integrationsStatusActive}
          </span>
        </div>
        <div className="channel-modal__list-item" style={{ gap: '1rem' }}>
          <div>
            <strong>Jira</strong>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              이슈 상태와 알림 연동
            </div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#eab308', fontSize: '0.85rem' }}>
            {s.workspaceAdmin.integrationsStatusPaused}
          </span>
        </div>
        <div className="channel-modal__list-item" style={{ gap: '1rem' }}>
          <div>
            <strong>Notion</strong>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              페이지 댓글을 채널로 공유
            </div>
          </div>
          <span style={{ marginLeft: 'auto', color: '#3b82f6', fontSize: '0.85rem' }}>
            {s.workspaceAdmin.integrationsStatusRequest}
          </span>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.securityTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {s.workspaceAdmin.securityDescription}
      </p>
      <div className="settings-form-group">
        <label htmlFor="retention">{s.workspaceAdmin.retentionLabel}</label>
        <input id="retention" type="number" defaultValue={180} />
      </div>
      <div className="settings-form-group">
        <label>
          <input type="checkbox" /> {s.workspaceAdmin.twoFactorLabel}
        </label>
      </div>
      <button className="profile-modal__save-button">{s.workspaceAdmin.saveChanges}</button>
    </div>
  );

  const renderAudit = () => (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.auditLogTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {s.workspaceAdmin.auditLogDescription}
      </p>
      <div className="channel-modal__list">
        {mockRecentActivities.map((log) => (
          <div key={log.id} className="channel-modal__list-item" style={{ padding: '0.75rem 0' }}>
            <span>
              <strong>{log.action}</strong>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{log.details}</div>
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {log.time}
            </span>
          </div>
        ))}
      </div>
      <button className="profile-modal__save-button" style={{ width: 'auto' }}>
        {s.workspaceAdmin.auditViewMore}
      </button>
    </div>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return renderOverview();
      case 'members':
        return renderMembers();
      case 'invite-management':
        return renderInviteManagement();
      case 'groups':
        return renderGroups();
      case 'integrations':
        return renderIntegrations();
      case 'security':
        return renderSecurity();
      case 'audit':
        return renderAudit();
      case 'ai-assistant':
        return <AiAssistantPage />;
      case 'ai-search':
        return <AiSearchSettingsPage />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="settings-page">
      <aside className="settings-sidebar">
        <button onClick={handleBack} className="settings-sidebar__back-button">
          <ArrowLeft size={16} />
          <span>{s.workspaceAdmin.backToWorkspace}</span>
        </button>
        <h3 className="settings-sidebar__title">
          <LayoutGrid size={16} />
          <span>Prizm Dev</span>
        </h3>
        <nav className="settings-sidebar__nav">
          {navItems.map(({ id, icon: Icon, labelKey }) => (
            <button
              key={id}
              className={`settings-sidebar__button ${currentTab === id ? 'active' : ''}`}
              onClick={() => setCurrentTab(id)}
            >
              <Icon size={16} />
              <span>{s.workspaceAdmin[labelKey]}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="settings-content">{renderContent()}</main>
    </div>
  );
};

export default WorkspaceSettingsPage;
