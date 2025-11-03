'use client';

import { Plus } from '@/components/common/icons';
import useDataStore from '@/store/dataStore';

export const AppConnectList = () => {
    const { appConnect } = useDataStore();

    return (
        <div className="nav-group">
            <div className="nav-group__header">
                <span>App Connect</span>
                <button className="nav-category__add-button">
                    <Plus size={14} />
                </button>
            </div>
            <ul className="nav-category__list" style={{ paddingLeft: 0 }}>
                {appConnect.map(app => (
                    <li key={app.id}>
                        <button className="channel-button">
                            <span className="channel-button__name">
                                <img src={`/${app.icon}`} alt={app.name} className="dm-button__avatar" />
                                <span>{app.name}</span>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
