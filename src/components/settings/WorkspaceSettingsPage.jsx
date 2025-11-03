'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useStrings from '@/hooks/useStrings';
import {
  ArrowLeft,
  LayoutGrid,
  Users,
  Hash,
  ShieldCheck,
  Link,
  Lock,
  FileText,
  Sparkles,
  Search,
} from '@/components/common/icons';
import { mockUsers, mockRecentActivities } from '@/__mocks__/users';
import { mockWorkspaceStats } from '@/__mocks__/workspaces';

import AiAssistantPage from '@/app/settings/workspace/[workspaceId]/ai-assistant/ai-assistant.page';
import AiSearchSettingsPage from '@/app/settings/workspace/[workspaceId]/ai-search/page';

const navItems = [
  { id: 'overview', icon: LayoutGrid, labelKey: 'navDashboard' },
  { id: 'members', icon: Users, labelKey: 'navMembers' },
  { id: 'channels', icon: Hash, labelKey: 'navChannels' },
  { id: 'integrations', icon: Link, labelKey: 'navIntegrations' },
  { id: 'security', icon: Lock, labelKey: 'navSecurity' },
  { id: 'audit', icon: FileText, labelKey: 'navAuditLog' },
  { id: 'ai-assistant', icon: Sparkles, labelKey: 'navAiAssistant' },
  { id: 'ai-search', icon: Search, labelKey: 'navAiSearch' },
];

const WorkspaceSettingsPage = ({ onBack }) => {
  const router = useRouter();
  const s = useStrings();
  const [currentTab, setCurrentTab] = useState('overview');
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

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.back();
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

  const renderMembers = () => (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.membersTitle}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        {s.workspaceAdmin.membersDescription}
      </p>
      <div className="settings-form-group">
        <button className="profile-modal__save-button" style={{ width: 'auto' }}>
          {s.workspaceAdmin.inviteMember}
        </button>
      </div>
      <div className="channel-modal__list">
        {members.map((member) => (
          <div key={member.id} className="channel-modal__list-item member">
            <img src={member.avatar} alt={member.name} />
            <span>
              {member.name} ({member.role})
            </span>
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {member.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChannels = () => (
    <div>
      <h2 className="settings-content__header">{s.workspaceAdmin.navChannels}</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        채널 네이밍 규칙과 기본 템플릿을 관리할 수 있습니다.
      </p>
      <div className="settings-form-group">
        <label htmlFor="channel-prefix">채널 네이밍 규칙</label>
        <input id="channel-prefix" type="text" defaultValue="팀명-주제 형식 (예: product-design)" />
      </div>
      <div className="settings-form-group">
        <label htmlFor="channel-review">채널 생성 승인 프로세스</label>
        <select id="channel-review" defaultValue="auto">
          <option value="auto">자동 승인</option>
          <option value="admin">관리자 승인 필요</option>
        </select>
      </div>
      <button className="profile-modal__save-button">{s.workspaceAdmin.saveChanges}</button>
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
      case 'channels':
        return renderChannels();
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
