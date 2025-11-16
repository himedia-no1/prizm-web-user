'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useMessages } from 'next-intl';
import { UnreadBadge } from '@/components/ui/UnreadBadge';
import { useAIStore } from '@/core/store/ai';
import { useChatStore } from '@/core/store/chat';
import useDataStore from '@/core/store/dataStore';
import styles from './AppConnectList.module.css';
import { getPlaceholderImage } from '@/shared/utils/imagePlaceholder';

export const AppConnectList = () => {
    const messages = useMessages();
    const s = { ...(messages?.common ?? {}), ...messages };
    const appConnect = useAIStore((state) => state.appConnect);
    const unreadCounts = useChatStore((state) => state.unreadCounts ?? {});
    const loadInitialData = useDataStore((state) => state.loadInitialData);
    const initialized = useDataStore((state) => state.initialized);

    useEffect(() => {
        if (!initialized) {
            loadInitialData().catch((error) => {
                console.error('Failed to load initial data:', error);
            });
        }
    }, [initialized, loadInitialData]);

    return (
        <div className="nav-group">
            <div className="nav-group__header">
                <span>{s.appConnect ?? 'App Connect'}</span>
            </div>
            <ul className={`nav-category__list ${styles.list}`}>
                {(appConnect ?? []).map(app => {
                    const unreadCount = unreadCounts[app.id] || 0;
                    const iconSrc = app.icon ? `/${app.icon}` : getPlaceholderImage(24, app.name?.[0] ?? '?');
                    return (
                        <li key={app.id}>
                            <button className="channel-button">
                                <span className="channel-button__name">
                                    <Image
                                        src={iconSrc}
                                        alt={app.name}
                                        width={24}
                                        height={24}
                                        className="dm-button__avatar"
                                    />
                                    <span>{app.name}</span>
                                </span>
                                <div className="channel-button__trail">
                                    <UnreadBadge count={unreadCount} />
                                </div>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
