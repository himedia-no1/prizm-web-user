import { useMemo } from 'react';
import { mockCategories } from '@/__mocks__/categories';
import { mockWorkspaceGroups } from '@/__mocks__/workspaces';
import { FALLBACK_GROUPS } from '../utils/constants';

export const useInviteTargets = (workspaceId, mode, channelId, channelName) => {
  const workspaceGroups = useMemo(() => {
    if (workspaceId && mockWorkspaceGroups[workspaceId]) {
      return mockWorkspaceGroups[workspaceId];
    }
    return FALLBACK_GROUPS;
  }, [workspaceId]);

  const workspaceChannels = useMemo(() => {
    const baseChannels = mockCategories
      .filter((category) => category.section !== 'appConnect')
      .flatMap((category) =>
        (category.channels || []).map((channel) => ({
          id: channel.id,
          name: `#${channel.name}`,
        })),
      );
    return baseChannels;
  }, []);

  const selectableTargets = useMemo(() => {
    const base = mode === 'guest' ? workspaceChannels : workspaceGroups;
    if (mode !== 'guest' || !channelId) {
      return base;
    }
    const exists = base.some((target) => target.id === channelId);
    if (exists) return base;
    const label = channelName ? `#${channelName}` : `#${channelId}`;
    return [{ id: channelId, name: label }, ...base];
  }, [channelId, channelName, mode, workspaceChannels, workspaceGroups]);

  return { workspaceGroups, workspaceChannels, selectableTargets };
};
