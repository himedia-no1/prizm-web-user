
import React, { useState, useEffect } from 'react';



// --- Icon SVGs ---

// (기존 아이콘 + 워크스페이스 관리자용 아이콘 추가)

const LayoutGrid = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg> );

const Users = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> );

const Hash = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg> );

const ShieldCheck = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> ); // 권한 설정 아이콘 (ShieldCheck 사용)

const Settings = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 .54 1.73v.5a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-.54-1.73v-.5a2 2 0 0 1 1-1.74l-.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg> );

const Lock = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> ); // 보안 아이콘

const FileText = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg> ); // 감사 로그 아이콘

const BarChart = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg> ); // 통계 분석 아이콘

const ArrowLeft = ({ size = 16, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> );

const MessageSquare = ({ size = 20, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> );

const Activity = ({ size = 20, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> );

const ArrowUpRight = ({ size = 12, className = "" }) => ( <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 17l9.2-9.2M17 17V7H7"/></svg> );

// --- END Icon SVGs ---



// --- Mock 데이터 ---

const mockWorkspaceStats = [

    { id: 'members', icon: <Users size={20} />, value: '248', label: '전체 멤버', trend: '+12%', trendColor: 'green' },

    { id: 'channels', icon: <Hash size={20} />, value: '42', label: '활성 채널', trend: '+3', trendColor: 'blue' }, // Trend type changed

    { id: 'messages', icon: <MessageSquare size={20} />, value: '1,847', label: '오늘 메시지', trend: '+24%', trendColor: 'green' },

    { id: 'activeUsers', icon: <Activity size={20} />, value: '186', label: '활성 사용자', trend: '+8%', trendColor: 'green' },

];



const mockRecentActivities = [

    { id: 'act1', user: { name: '김', avatar: 'https://placehold.co/32x32/FFC107/FFFFFF?text=김' }, action: '김철수 새 채널 생성', details: '#마케팅-전략', time: '5분 전' },

    { id: 'act2', user: { name: '이', avatar: 'https://placehold.co/32x32/9C27B0/FFFFFF?text=이' }, action: '이영희 멤버 초대', details: 'park@company.com', time: '12분 전' },

    { id: 'act3', user: { name: '박', avatar: 'https://placehold.co/32x32/4CAF50/FFFFFF?text=박' }, action: '박민수 권한 변경', details: '최지훈 → Manager', time: '1시간 전' },

    { id: 'act4', user: { name: '정', avatar: 'https://placehold.co/32x32/03A9F4/FFFFFF?text=정' }, action: '정수진 채널 아카이브', details: '#old-project', time: '2시간 전' },

];





// --- 컴포넌트 ---



// 1. 워크스페이스 관리자 사이드바

const WorkspaceAdminSidebar = ({ currentView, onSelectView, onBackToWorkspace }) => {

    const menuItems = [

        { id: 'dashboard', label: '대시보드', icon: <LayoutGrid size={18} /> },

        { id: 'members', label: '멤버 관리', icon: <Users size={18} /> },

        { id: 'channels', label: '채널 관리', icon: <Hash size={18} /> },

        { id: 'permissions', label: '권한 설정', icon: <ShieldCheck size={18} /> },

        { id: 'settings', label: '워크스페이스 설정', icon: <Settings size={18} /> },

        { id: 'security', label: '보안', icon: <Lock size={18} /> },

        { id: 'audit', label: '감사 로그', icon: <FileText size={18} /> },

        { id: 'analytics', label: '통계 분석', icon: <BarChart size={18} /> },

    ];



    return (

        <aside className="admin-sidebar ws-admin-sidebar"> {/* Use admin-sidebar styles, add specific class */}

            <div className="admin-sidebar__header">

                <h2>관리자 페이지</h2>

                <p>워크스페이스 관리</p> {/* Subtitle */}

            </div>

            <nav className="admin-sidebar__nav">

                {menuItems.map(item => (

                    <button

                        key={item.id}

                        className={`admin-sidebar__button ${currentView === item.id ? 'active' : ''}`}

                        onClick={() => onSelectView(item.id)}

                    >

                        {item.icon}

                        <span>{item.label}</span>

                    </button>

                ))}

            </nav>

            <div className="admin-sidebar__footer">

                <button className="admin-sidebar__button back-button" onClick={onBackToWorkspace}>

                    <ArrowLeft size={18} />

                    <span>워크스페이스로 돌아가기</span>

                </button>

                {/* Dark mode toggle removed as per thought process */}

            </div>

        </aside>

    );

};



// 2. 워크스페이스 관리자 대시보드 뷰

const WorkspaceAdminDashboardView = () => (

    <main className="admin-main-content">

        <header className="admin-content-header">

            <h1>대시보드</h1>

            <p>워크스페이스 활동 개요</p>

        </header>

        <div className="admin-dashboard-grid ws-admin-dashboard">

            {/* 통계 카드 */}

            <div className="stats-cards">

                {mockWorkspaceStats.map(stat => (

                    <div key={stat.id} className="stat-card">

                        <div className="stat-card__icon">{stat.icon}</div>

                        <div className="stat-card__value">{stat.value}</div>

                        <div className="stat-card__label">{stat.label}</div>

                        <div className={`stat-card__trend ${stat.trendColor}`}>

                            {(stat.trendColor === 'green' || stat.trendColor === 'red') && <ArrowUpRight size={12} style={stat.trendColor === 'red' ? { transform: 'rotate(90deg)' } : {}}/>}

                            {stat.trend}

                        </div>

                    </div>

                ))}

            </div>



            {/* 최근 활동 */}

            <div className="dashboard-section recent-activities">

                <h2>최근 활동</h2>

                <div className="activity-list">

                    {mockRecentActivities.map(act => (

                        <div key={act.id} className="activity-item">

                            <img src={act.user.avatar} alt={act.user.name} className="activity-item__avatar" />

                            <div className="activity-item__info">

                                <p>{act.action}</p>

                                <span>{act.details}</span>

                            </div>

                            <span className="activity-item__time">{act.time}</span>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    </main>

);



// 3. 워크스페이스 관리자 메인 컨텐츠 영역

const WorkspaceAdminMainContent = ({ currentView }) => {

    switch (currentView) {

        case 'dashboard':

            return <WorkspaceAdminDashboardView />;

        case 'members':

            return <main className="admin-main-content"><header className="admin-content-header"><h1>멤버 관리</h1></header><div>워크스페이스 멤버 목록 및 초대/관리 기능</div></main>;

        case 'channels':

            return <main className="admin-main-content"><header className="admin-content-header"><h1>채널 관리</h1></header><div>워크스페이스 채널 목록 및 설정 기능</div></main>;

// TODO: 나머지 뷰 컴포넌트 추가

        default:

            return <WorkspaceAdminDashboardView />;

    }

};



// 4. WorkspaceAdminPage (최상위 컴포넌트)

const WorkspaceAdminPage = () => {

    const [currentView, setCurrentView] = useState('dashboard');

    const handleBack = () => { console.log("Back to workspace view"); /* TODO: Implement navigation */ };



    return (

        <div className="admin-page"> {/* Reuse admin-page class for layout */}

            <WorkspaceAdminSidebar

                currentView={currentView}

                onSelectView={setCurrentView}

                onBackToWorkspace={handleBack}

            />

            <WorkspaceAdminMainContent currentView={currentView} />

        </div>

    );

};



// 5. App Wrapper (스타일 주입 및 렌더링)

const globalWorkspaceAdminCss = `

/* --- CSS 변수 --- */

/* Use the same variables as prizm_admin.jsx for consistency */

:root {

--bg: #f4f2f2;

--card-bg: #ffffff;

--text: #333333;

--text-secondary: #666666;

--primary: #8c65d1;

--primary-light: rgba(140, 101, 209, 0.08);

--border: #e5e1e1;

--shadow: rgba(0, 0, 0, 0.08);

}

/* Enforce dark theme based on image */

:root, [data-theme='dark'] {

--bg: #1c1c21;

--card-bg: #28282e;

--text: #e0e0e0;

--text-secondary: #a0a0a0;

--primary: #8c65d1; /* Use light mode primary for better visibility on dark */

--primary-light: rgba(140, 101, 209, 0.15); /* Adjusted alpha */

--border: #3A3E47;

--shadow: rgba(0, 0, 0, 0.4);

}



/* --- 기본 스타일 (Reusing from admin) --- */

html, body { margin: 0; padding: 0; background-color: var(--bg); color: var(--text); transition: background-color 0.3s ease, color 0.3s ease; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif; overflow: hidden; height: 100vh; width: 100vw; }

#root, .admin-page { height: 100%; width: 100%; display: flex; }

* { box-sizing: border-box; }

button { font-family: inherit; cursor: pointer; }

h1, h2, h3, h4, p { margin: 0; }

::-webkit-scrollbar { width: 6px; height: 6px; } ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; } ::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); } ::-webkit-scrollbar-track { background: transparent; }



/* --- 관리자 페이지 레이아웃 (Reusing from admin) --- */

.admin-page { display: flex; height: 100vh; }



/* 관리자 사이드바 (Reusing from admin, slightly adjusted) */

.admin-sidebar { width: 260px; height: 100%; background-color: var(--card-bg); border-right: 1px solid var(--border); display: flex; flex-direction: column; flex-shrink: 0; padding: 1.5rem 1rem; }

.admin-sidebar__header { padding: 0 0.5rem 1.5rem 0.5rem; border-bottom: 1px solid var(--border); margin-bottom: 1rem; }

.admin-sidebar__header h2 { font-size: 1.25rem; font-weight: 600; color: var(--text); margin-bottom: 0.25rem; }

.admin-sidebar__header p { font-size: 0.875rem; color: var(--text-secondary); }

.admin-sidebar__nav { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 0.25rem; }

.admin-sidebar__button { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 0.5rem; background: none; border: none; text-align: left; font-size: 0.9rem; font-weight: 500; color: var(--text-secondary); transition: background-color 0.2s ease, color 0.2s ease; }

.admin-sidebar__button svg { flex-shrink: 0; color: var(--text-secondary); transition: color 0.2s ease; }

.admin-sidebar__button:hover { background-color: var(--primary-light); color: var(--primary); }

.admin-sidebar__button:hover svg { color: var(--primary); }

.admin-sidebar__button.active { background-color: var(--primary); color: white; font-weight: 600; }

.admin-sidebar__button.active svg { color: white; }

.admin-sidebar__footer { margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.5rem; }

/* Specific style for back button */

.admin-sidebar__button.back-button:hover { background-color: var(--primary-light); color: var(--primary); }

.admin-sidebar__button.back-button:hover svg { color: var(--primary); }





/* 관리자 메인 컨텐츠 (Reusing from admin) */

.admin-main-content { flex: 1; overflow-y: auto; padding: 2rem; background-color: var(--bg); }

.admin-content-header { margin-bottom: 1.5rem; }

.admin-content-header h1 { font-size: 1.75rem; font-weight: 600; color: var(--text); margin-bottom: 0.5rem; }

.admin-content-header p { font-size: 1rem; color: var(--text-secondary); }



/* 대시보드 그리드 (Reusing from admin) */

.admin-dashboard-grid { display: grid; grid-template-columns: 1fr; /* Default to single column */ gap: 1.5rem; }

/* Adjust grid for Workspace Admin */

.ws-admin-dashboard { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); } /* Allow multiple columns */

.stats-cards { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }

.stat-card { background-color: var(--card-bg); border-radius: 0.75rem; padding: 1.25rem; border: 1px solid var(--border); box-shadow: 0 1px 3px var(--shadow); position: relative; }

.stat-card__icon { color: var(--text-secondary); margin-bottom: 0.75rem; background-color: var(--primary-light); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

.stat-card__icon svg { color: var(--primary); width: 20px; height: 20px; }

.stat-card__value { font-size: 1.75rem; font-weight: 600; color: var(--text); margin-bottom: 0.25rem; }

.stat-card__label { font-size: 0.875rem; color: var(--text-secondary); }

.stat-card__trend { /* Reusing from admin */ position: absolute; top: 1rem; right: 1rem; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; gap: 0.2rem; }

.stat-card__trend.green { color: #10b981; } .stat-card__trend.red { color: #ef4444; } .stat-card__trend.blue { color: #3b82f6; /* Adjusted blue */ }



.dashboard-section { background-color: var(--card-bg); border-radius: 0.75rem; padding: 1.5rem; border: 1px solid var(--border); box-shadow: 0 1px 3px var(--shadow); }

.dashboard-section h2 { font-size: 1.125rem; font-weight: 600; color: var(--text); margin-bottom: 1rem; }



/* 최근 활동 목록 (New styles based on image) */

.recent-activities { grid-column: 1 / -1; /* Span full width if needed */ }

.activity-list { display: flex; flex-direction: column; gap: 1rem; }

.activity-item { display: flex; align-items: center; gap: 0.75rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border); }

.activity-item:last-child { border-bottom: none; padding-bottom: 0; }

.activity-item__avatar { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; }

.activity-item__info { flex: 1; }

.activity-item__info p { font-size: 0.9rem; color: var(--text); margin-bottom: 2px; }

.activity-item__info span { font-size: 0.8rem; color: var(--text-secondary); }

.activity-item__time { font-size: 0.8rem; color: var(--text-secondary); flex-shrink: 0; margin-left: auto; }



`;



const App = () => {

// Enforce dark mode based on the image provided

    const [isDarkMode, setIsDarkMode] = useState(true);



    useEffect(() => {

        const styleId = 'global-workspace-admin-styles';

        let styleEl = document.getElementById(styleId);

        if (!styleEl) {

            styleEl = document.createElement('style');

            styleEl.id = styleId;

            document.head.appendChild(styleEl);

        }

        styleEl.innerHTML = globalWorkspaceAdminCss;

// Always set dark theme for this specific admin page

        document.documentElement.dataset.theme = 'dark';

// Optionally remove theme from localStorage if it conflicts

// localStorage.removeItem('theme');

    }, []); // Run only once



    return <WorkspaceAdminPage />;

};



export default App;