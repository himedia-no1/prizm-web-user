import { useEffect, useMemo } from 'react';
import { useWorkspaceStore } from '@/core/store/workspace';
import useDataStore from '@/core/store/dataStore';
import { FALLBACK_GROUPS } from '../utils/constants';

export const useInviteTargets = (workspaceId, mode, channelId, channelName) => {
  const categories = useWorkspaceStore((state) => state.categories);
  const workspaceGroupMap = useWorkspaceStore((state) => state.workspaceGroups);
  const loadInitialData = useDataStore((state) => state.loadInitialData);
  const initialized = useDataStore((state) => state.initialized);

  useEffect(() => {
    if (!initialized) {
      loadInitialData().catch((error) => {
        console.error('Failed to load initial data:', error);
      });
    }
  }, [initialized, loadInitialData]);

  const workspaceGroups = useMemo(() => {
    if (workspaceId && workspaceGroupMap?.[workspaceId]) {
      return workspaceGroupMap[workspaceId];
    }
    return FALLBACK_GROUPS;
  }, [workspaceId, workspaceGroupMap]);

  const workspaceChannels = useMemo(() => {
    const baseChannels = (categories ?? [])
      .filter((category) => category.section !== 'appConnect')
      .flatMap((category) =>
        (category.channels || []).map((channel) => ({
          id: channel.id,
          name: `#${channel.name}`,
        })),
      );
    return baseChannels;
  }, [categories]);

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
