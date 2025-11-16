import { NextResponse } from 'next/server';
import {
  mockWorkspaces,
  mockWorkspaceMembers,
  mockWorkspaceGroups,
  mockWorkspaceStats,
} from '@/app/mock/_lib/workspaceStore';
import { mockCategories } from '@/app/mock/_lib/categories';
import { mockUsers, mockRecentActivities } from '@/app/mock/_lib/users';
import { mockMessages, mockThreadMessages } from '@/app/mock/_lib/messages';
import { mockDMs } from '@/app/mock/_lib/dms';
import { mockAppConnect } from '@/app/mock/_lib/appConnect';
import { mockNotifications } from '@/app/mock/_lib/notifications';
import { mockIntegrations } from '@/app/mock/_lib/integrations';
import { mockChannelDetails } from '@/app/mock/_lib/channelDetails';

export async function GET() {
  return NextResponse.json({
    workspaces: mockWorkspaces,
    workspaceMembers: mockWorkspaceMembers,
    workspaceGroups: mockWorkspaceGroups,
    workspaceStats: mockWorkspaceStats,
    categories: mockCategories,
    users: mockUsers,
    recentActivities: mockRecentActivities,
    messages: mockMessages,
    threadMessages: mockThreadMessages,
    dms: mockDMs,
    appConnect: mockAppConnect,
    notifications: mockNotifications,
    integrations: mockIntegrations,
    channelDetails: mockChannelDetails,
  });
}
