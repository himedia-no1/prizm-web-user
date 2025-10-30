import { Plus } from '@/components/common/icons';
import { StatusIndicator } from '@/components/common/StatusIndicator';
import useStore from '@/store/useStore';
import { strings } from '@/constants/strings';

export const DMList = ({ dms, users, currentChannelId, currentView, onSelectChannel }) => {
  const { language } = useStore();
  const s = strings[language];
  return (
    <div className="nav-group">
      <div className="nav-group__header">
        <span>{s.directMessages}</span>
        <button className="nav-category__add-button">
          <Plus size={14} />
        </button>
      </div>
      <ul className="nav-category__list" style={{ paddingLeft: 0 }}>
        {dms.map(dm => {
          const user = users[dm.userId];
          const isActive = currentView === 'channel' && currentChannelId === dm.id;

          return (
            <li key={dm.id}>
              <button
                onClick={() => onSelectChannel(dm.id)}
                className={`channel-button ${isActive ? 'active' : ''}`}
              >
                <span className="channel-button__name">
                  <div className="dm-button__avatar-container">
                    <img src={user.avatar} alt={user.name} className="dm-button__avatar" />
                    <StatusIndicator
                      status={user.status}
                      className="dm-button__status"
                    />
                  </div>
                  <span>{user.name}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
