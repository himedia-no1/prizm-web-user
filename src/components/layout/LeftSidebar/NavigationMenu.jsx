import { useMessages } from 'next-intl';
import { LayoutDashboard, Search, Users } from '@/components/common/icons';

export const NavigationMenu = ({ currentView, onSelectView }) => {
  const messages = useMessages();
  const s = messages?.common ?? {};

  const directoryLabel = typeof s.directory === 'object' ? s.directory.title : s.directory;

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: s.dashboard },
    { id: 'search', icon: Search, label: s.search },
    { id: 'directory', icon: Users, label: directoryLabel || 'Directory' },
  ];

  return (
    <nav className="sidebar-top-nav">
      {menuItems.map(item => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`sidebar-menu-button ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onSelectView(item.id)}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
