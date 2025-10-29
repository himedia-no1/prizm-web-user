import { LayoutDashboard, Search, Users } from '@/components/common/icons';

export const NavigationMenu = ({ currentView, onSelectView }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'directory', icon: Users, label: 'Directory' },
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
