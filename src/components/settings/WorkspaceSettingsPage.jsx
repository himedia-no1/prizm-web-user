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
  mockGroups 
} from './workspace/constants/mockData';
import { WorkspaceHeader } from './workspace/components/WorkspaceHeader';
import { WorkspaceNav } from './workspace/components/WorkspaceNav';
import { OverviewTab } from './workspace/components/OverviewTab';
import styles from './workspace/WorkspaceSettings.module.css';

export default function WorkspaceSettingsPage({ workspaceId, workspaceName = 'My Workspace' }) {
  const router = useRouter();
  const s = useStrings();
  const [activeTab, setActiveTab] = useState('overview');
  const { setActiveWorkspaceId } = useWorkspaceSettingsStore();

  const handleBack = () => {
    router.back();
  };

  const renderTabContent = () => {
    const settingsStrings = s.settings || {};

    switch (activeTab) {
      case 'overview':
        return <OverviewTab strings={settingsStrings} />;
      
      case 'members':
        return <InsightsTab />;
      
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
        return <GroupsTab groups={mockGroups} />;
      
      case 'integrations':
        return <IntegrationsTab />;
      
      case 'security':
        return <SecurityTab />;
      
      case 'audit':
        return <AuditTab />;
      
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
          title={s.settings?.workspaceSettings ?? '워크스페이스 설정'}
        />
        <WorkspaceNav
          items={navItems}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          strings={s.settings || {}}
        />
      </div>
      <main className={styles.main}>
        {renderTabContent()}
      </main>
    </div>
  );
}
