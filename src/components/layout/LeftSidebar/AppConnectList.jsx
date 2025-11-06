'use client';

import { Plus } from '@/components/common/icons';
import { UnreadBadge } from '@/components/common/UnreadBadge';
import useDataStore from '@/store/dataStore';
import useStrings from '@/hooks/useStrings';
import useStore from '@/store/useStore';

export const AppConnectList = ({ onOpenModal, canManage = false }) => {
    const s = useStrings();
    const { appConnect } = useDataStore();
    const { unreadCounts } = useStore();

    return (
        <div className="nav-group">
            <div className="nav-group__header">
                <span>{s.appConnect ?? 'App Connect'}</span>
                {canManage && (
                    <button
                        className="nav-category__add-button"
                        onClick={() => onOpenModal?.('addApp')}
                    >
                        <Plus size={14} />
                    </button>
                )}
            </div>
            <ul className="nav-category__list" style={{ paddingLeft: 0 }}>
                {appConnect.map(app => {
                    const unreadCount = unreadCounts[app.id] || 0;
                    return (
                        <li key={app.id}>
                            <button className="channel-button">
                                <span className="channel-button__name">
                                    <img src={`/${app.icon}`} alt={app.name} className="dm-button__avatar" />
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
