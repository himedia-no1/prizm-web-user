'use client';

import { ArrowLeft, User } from '@/components/common/icons';

export const SettingsSidebarNav = ({ activeTab, onBack, onTabChange, onLogoutClick, labels }) => (
  <aside className="settings-sidebar">
    <button onClick={onBack} className="settings-sidebar__back-button">
      <ArrowLeft size={16} />
      <span>{labels.backToWorkspace}</span>
    </button>
    <h3 className="settings-sidebar__title">
      <User size={16} />
      <span>{labels.title}</span>
    </h3>
    <nav className="settings-sidebar__nav">
      <button
        className={`settings-sidebar__button ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => onTabChange('profile')}
      >
        <span>{labels.navProfile}</span>
      </button>
      <button
        className={`settings-sidebar__button ${activeTab === 'prefs' ? 'active' : ''}`}
        onClick={() => onTabChange('prefs')}
      >
        <span>{labels.navPreferences}</span>
      </button>
      <button className="settings-sidebar__button" onClick={onLogoutClick}>
        <span>{labels.navLogout}</span>
      </button>
    </nav>
  </aside>
);

export default SettingsSidebarNav;
