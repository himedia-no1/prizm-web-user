import { LayoutDashboard, Search, Users } from '@/components/common/icons';
import useStrings from '@/shared/hooks/useStrings';

export const NavigationMenu = ({ currentView, onSelectView }) => {
  const s = useStrings('common');

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
