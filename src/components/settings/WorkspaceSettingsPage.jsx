'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStrings from '@/hooks/useStrings';
import { 
  InsightsTab, 
  InviteManagementTab, 
  MembersTab,
  GroupsTab, 
  IntegrationsTab, 
  SecurityTab, 
  AuditTab 
} from './workspace/tabs';
import { useWorkspaceSettingsStore } from '@/store/workspace/useWorkspaceSettingsStore';
import AiAssistantPage from '@/app/settings/workspace/[workspaceId]/ai-assistant/ai-assistant.page';
import AiSearchSettingsPage from '@/app/settings/workspace/[workspaceId]/ai-search/page';
import { navItems } from './workspace/constants/navItems';
import {
  mockInvitations,
  mockBlockedMembers,
  mockInviteLinks,
  mockMemberHistory,
  mockGroups,
  mockWorkspaceChannels,
  mockGroupPermissions,
  mockStats,
  mockActivities,
  mockAuditLogs
} from './workspace/constants/mockData';
import { WorkspaceHeader } from './workspace/components/WorkspaceHeader';
import { WorkspaceNav } from './workspace/components/WorkspaceNav';
import { OverviewTab } from './workspace/components/OverviewTab';
import styles from './workspace/WorkspaceSettings.module.css';

export default function WorkspaceSettingsPage({ workspaceId, workspaceName = 'My Workspace' }) {
  const router = useRouter();
  const workspaceStrings = useStrings('workspaceAdmin');
  const [activeTab, setActiveTab] = useState('overview');
  const { setActiveWorkspaceId } = useWorkspaceSettingsStore();
  const [groupPermissions, setGroupPermissions] = useState(mockGroupPermissions);

  const handleBack = () => {
    router.back();
  };

  const handleToggleGroupChannel = (groupId, channel) => {
    setGroupPermissions((prev) => {
      const currentChannels = prev[groupId] || [];
      const isAssigned = currentChannels.includes(channel);

      return {
        ...prev,
        [groupId]: isAssigned
          ? currentChannels.filter((ch) => ch !== channel)
          : [...currentChannels, channel],
      };
    });
  };

  const renderTabContent = () => {
    const settingsStrings = workspaceStrings ?? {};

    switch (activeTab) {
      case 'overview':
        return <OverviewTab strings={settingsStrings} />;

      case 'members':
        return <InsightsTab stats={mockStats} activities={mockActivities} />;

      case 'invite-management':
        return (
          <InviteManagementTab
            invitations={mockInvitations}
            inviteLinks={mockInviteLinks}
            blockedMembers={mockBlockedMembers}
            memberHistory={mockMemberHistory}
          />
        );

      case 'groups':
        return (
          <GroupsTab
            groups={mockGroups}
            workspaceChannels={mockWorkspaceChannels}
            groupPermissions={groupPermissions}
            onToggleGroupChannel={handleToggleGroupChannel}
          />
        );

      case 'integrations':
        return <IntegrationsTab />;

      case 'security':
        return <SecurityTab />;

      case 'audit':
        return <AuditTab activities={mockAuditLogs} />;

      case 'ai-assistant':
        return <AiAssistantPage />;

      case 'ai-search':
        return <AiSearchSettingsPage />;

      default:
        return <OverviewTab strings={settingsStrings} />;
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <WorkspaceHeader
          workspaceName={workspaceName}
          onBack={handleBack}
          title={workspaceStrings?.dashboardTitle ?? '워크스페이스 설정'}
        />
        <WorkspaceNav
          items={navItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          strings={workspaceStrings || {}}
        />
      </div>
      <main className={styles.main}>
        {renderTabContent()}
      </main>
    </div>
  );
}
