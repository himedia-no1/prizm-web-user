'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMessages } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  InsightsTab,
  InviteManagementTab,
  GroupsTab,
  IntegrationsTab,
  SecurityTab,
  AuditTab,
  AIAssistantTab,
} from '@/components/settings/workspace/tabs';
import { useWorkspaceSettingsStore, useWorkspaceStore } from '@/core/store/workspace';
import { useChatStore } from '@/core/store/chat';
import { useAIStore } from '@/core/store/ai';
import { navItems } from '@/components/settings/workspace/constants/navItems';
import { WorkspaceHeader } from '@/components/settings/workspace/components/WorkspaceHeader';
import { WorkspaceNav } from '@/components/settings/workspace/components/WorkspaceNav';
import { OverviewTab } from '@/components/settings/workspace/components/OverviewTab';
import styles from '@/components/settings/workspace/WorkspaceSettings.module.css';
import useDataStore from '@/core/store/dataStore';
import { workspaceService } from '@/core/api/services';

export default function WorkspaceSettingsClient({
  workspaceId,
  workspaceName = 'My Workspace',
  initialTab = 'overview',
  basePath,
}) {
  const router = useRouter();
  const intlMessages = useMessages();
  const workspaceStrings = intlMessages?.workspaceManagement ?? {};
  const [activeTab, setActiveTab] = useState(initialTab);
  const [groupPermissions, setGroupPermissions] = useState({});
  const [settingsData, setSettingsData] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState(null);

  // Domain Stores
  const categories = useWorkspaceStore((state) => state.categories);
  const workspaceMembers = useWorkspaceStore((state) => state.workspaceMembers);
  const storedMessages = useChatStore((state) => state.messages);
  const workspaceStats = useAIStore((state) => state.workspaceStats);
  const recentActivities = useAIStore((state) => state.recentActivities);

  // Bootstrap
  const loadInitialData = useDataStore((state) => state.loadInitialData);
  const initialized = useDataStore((state) => state.initialized);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!initialized) {
      loadInitialData().catch((error) => {
        console.error('Failed to load bootstrap data:', error);
      });
    }
  }, [initialized, loadInitialData]);

  useEffect(() => {
    if (!workspaceId) {
      return;
    }
    let cancelled = false;
    const fetchSettings = async () => {
      setSettingsLoading(true);
      try {
        const data = await workspaceService.fetchSettings(workspaceId);
        if (!cancelled) {
          setSettingsData(data);
          if (data?.groupPermissions) {
            setGroupPermissions(data.groupPermissions);
          }
          setSettingsError(null);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to load workspace settings data:', error);
          setSettingsError(workspaceStrings?.settingsError);
          setSettingsData(null);
        }
      } finally {
        if (!cancelled) {
          setSettingsLoading(false);
        }
      }
    };

    fetchSettings();
    return () => {
      cancelled = true;
    };
  }, [workspaceId, workspaceStrings?.settingsError]);

  const memberMap = workspaceId ? workspaceMembers?.[workspaceId] ?? {} : {};
  const membersCount = Object.keys(memberMap).length;
  const channelCount = useMemo(() => {
    return (categories ?? [])
      .filter((category) => category.section === 'channels')
      .reduce((total, category) => total + (category.channels?.length ?? 0), 0);
  }, [categories]);
  const messageCount = useMemo(() => {
    return (storedMessages ?? []).filter((msg) => msg.channelId && msg.channelId.startsWith('c')).length;
  }, [storedMessages]);

  const activities = settingsData?.activities ?? recentActivities ?? [];
  const statsData = settingsData?.stats ?? workspaceStats ?? [];

  const groupsData = settingsData?.groups ?? [];
  const channelsData = settingsData?.workspaceChannels ?? [];
  const invitations = settingsData?.invitations ?? [];
  const inviteLinks = settingsData?.inviteLinks ?? [];
  const blockedMembers = settingsData?.blockedMembers ?? [];
  const memberHistory = settingsData?.memberHistory ?? [];
  const auditLogs = settingsData?.auditLogs ?? [];

  const handleBack = () => {
    router.back();
  };

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    const targetBase = basePath ?? `/app/workspace/${workspaceId}/setting`;
    router.replace(`${targetBase}/${tab}`);
  }, [router, basePath, workspaceId]);

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
    if (settingsLoading) {
      return <div className={styles.loadingState}>{workspaceStrings?.settingsLoading}</div>;
    }

    if (settingsError) {
      return <div className={styles.errorState}>{settingsError}</div>;
    }

    const settingsStrings = workspaceStrings ?? {};

    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab
            strings={settingsStrings}
            membersCount={membersCount}
            channelCount={channelCount}
            messageCount={messageCount}
            activities={activities}
          />
        );
      case 'members':
        return <InsightsTab stats={statsData} activities={activities} />;
      case 'invite-management':
        return (
          <InviteManagementTab
            invitations={invitations}
            inviteLinks={inviteLinks}
            blockedMembers={blockedMembers}
            memberHistory={memberHistory}
          />
        );
      case 'groups':
        return (
          <GroupsTab
            groups={groupsData}
            workspaceChannels={channelsData}
            groupPermissions={groupPermissions}
            onToggleGroupChannel={handleToggleGroupChannel}
          />
        );
      case 'integrations':
        return <IntegrationsTab />;
      case 'security':
        return <SecurityTab />;
      case 'audit':
        return <AuditTab activities={auditLogs} />;
      case 'ai-assistant':
        return <AIAssistantTab />;
      default:
        return (
          <OverviewTab
            strings={settingsStrings}
            membersCount={membersCount}
            channelCount={channelCount}
            messageCount={messageCount}
            activities={activities}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <WorkspaceHeader
          workspaceName={workspaceName}
          onBack={handleBack}
          title={workspaceStrings?.dashboardTitle}
        />
        <WorkspaceNav items={navItems} activeTab={activeTab} onTabChange={handleTabChange} strings={workspaceStrings || {}} />
      </div>
      <main className={styles.main}>{renderTabContent()}</main>
    </div>
  );
}
