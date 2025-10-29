import './DashboardView.css';

export const DashboardView = () => (
  <main className="main-view dashboard-view">
    <header className="view-header">
      <h2>Dashboard</h2>
    </header>
    <div className="view-content">
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <strong>2</strong>
          <p>읽지 않은 채널</p>
        </div>
        <div className="dashboard-card">
          <strong>5</strong>
          <p>활성 스레드</p>
        </div>
        <div className="dashboard-card">
          <strong>12</strong>
          <p>온라인 멤버</p>
        </div>
        <div className="dashboard-card">
          <strong>3</strong>
          <p>고정 메시지</p>
        </div>
      </div>
    </div>
  </main>
);
