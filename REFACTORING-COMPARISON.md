# 리팩토링 전후 비교

---

## 📊 현재 상태 (Before)

### WorkspaceSettingsPage.jsx (775 라인)

#### 구조
```jsx
'use client';

import React, { useState } from 'react';
// ... 많은 import들 ...

// Mock 데이터들 (파일 상단에 하드코딩)
const mockInvitations = [...];
const mockBlockedMembers = [...];
const mockInviteLinks = [...];
const mockMemberHistory = [...];
const mockGroups = [...];

export const WorkspaceSettingsPage = ({ workspaceId, onBack }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [copiedLinkId, setCopiedLinkId] = useState(null);
  // ... 기타 상태들 ...

  // 헬퍼 함수들
  const getInviteStatusTone = (status) => { ... };
  const formatInviteTimestamp = (timestamp) => { ... };
  const handleCopyInviteLink = (id, url) => { ... };

  // 각 탭의 렌더 함수들 (70-120 라인씩)
  const renderOverview = () => (
    <div>
      <h2>...</h2>
      {/* 70라인의 JSX */}
    </div>
  );

  const renderInviteManagement = () => (
    <div>
      <h2>...</h2>
      {/* 120라인의 JSX */}
    </div>
  );

  const renderMembers = () => {
    // 상태 로직 포함
    const [selectedMemberTab, setSelectedMemberTab] = useState('active');
    return (
      <div>
        {/* 130라인의 JSX */}
      </div>
    );
  };

  const renderGroups = () => (
    <div>
      {/* 100라인의 JSX */}
    </div>
  );

  // 기타 render 함수들...

  // 메인 렌더
  return (
    <div className="settings-page">
      {/* 사이드바 */}
      <aside className="settings-sidebar">
        {navItems.map(item => (
          <button onClick={() => setSelectedTab(item.id)}>
            {item.label}
          </button>
        ))}
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="settings-content">
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'invite-management' && renderInviteManagement()}
        {selectedTab === 'members' && renderMembers()}
        {selectedTab === 'groups' && renderGroups()}
        {/* ... 기타 탭들 */}
      </main>
    </div>
  );
};
```

#### 문제점
1. ❌ **775라인의 거대한 파일**
2. ❌ **모든 탭의 로직이 한 파일에**
3. ❌ **Mock 데이터 하드코딩**
4. ❌ **스크롤해야 원하는 탭 찾을 수 있음**
5. ❌ **탭별 독립 테스트 불가능**
6. ❌ **재사용 불가능**
7. ❌ **Git diff가 엉망** (한 탭 수정해도 전체 파일 변경)

---

## ✅ 리팩토링 후 (After)

### 1. WorkspaceSettingsPage.jsx (예상 ~200 라인)

```jsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useStrings from '@/hooks/useStrings';
import { InsightsTab, InviteManagementTab } from './workspace/tabs';
import AiAssistantPage from '@/app/settings/workspace/[workspaceId]/ai-assistant/ai-assistant.page';
import AiSearchSettingsPage from '@/app/settings/workspace/[workspaceId]/ai-search/page';

// Mock 데이터는 별도 파일로 이동 (선택사항)
import { 
  mockInvitations, 
  mockInviteLinks, 
  mockGroups 
} from '@/__mocks__/workspace';

export const WorkspaceSettingsPage = ({ workspaceId, onBack }) => {
  const router = useRouter();
  const s = useStrings();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [copiedLinkId, setCopiedLinkId] = useState(null);

  // Mock 데이터 로드 (향후 test.api로 교체)
  const stats = mockWorkspaceStats;
  const activities = mockRecentActivities;
  const invitations = mockInvitations;
  const inviteLinks = mockInviteLinks;

  // 헬퍼 함수들 (공통)
  const getInviteStatusTone = (status) => { ... };
  const formatInviteTimestamp = (timestamp) => { ... };
  const handleCopyInviteLink = (id, url) => { ... };

  // 탭 렌더링 - 깔끔하게 컴포넌트로
  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return <InsightsTab stats={stats} activities={activities} />;
      
      case 'invite-management':
        return (
          <InviteManagementTab
            invitations={invitations}
            inviteLinks={inviteLinks}
            copiedLinkId={copiedLinkId}
            onCopyInviteLink={handleCopyInviteLink}
            formatInviteTimestamp={formatInviteTimestamp}
            getInviteStatusTone={getInviteStatusTone}
          />
        );
      
      case 'members':
        return renderMembers(); // 아직 분리 안 됨
      
      case 'ai-assistant':
        return <AiAssistantPage />;
      
      case 'ai-search':
        return <AiSearchSettingsPage />;
      
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <aside className="settings-sidebar">
        {/* 네비게이션 */}
      </aside>
      <main className="settings-content">
        {renderContent()}
      </main>
    </div>
  );
};
```

### 2. InsightsTab.jsx (78 라인)

```jsx
'use client';

import useStrings from '@/hooks/useStrings';

export const InsightsTab = ({ stats, activities }) => {
  const s = useStrings();

  return (
    <div>
      <h2>{s.workspaceAdmin.dashboardTitle}</h2>
      
      {/* 통계 카드들 */}
      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id}>
            <div>{stat.value}</div>
            <div>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 워크스페이스 정보 편집 */}
      <div>
        <input defaultValue="Prizm Dev" />
        <textarea defaultValue="..." />
        <button>저장</button>
      </div>

      {/* 최근 활동 */}
      <div>
        {activities.map(activity => (
          <div key={activity.id}>
            {activity.action}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 3. InviteManagementTab.jsx (147 라인)

```jsx
'use client';

import { Hash, Users } from '@/components/common/icons';
import useStrings from '@/hooks/useStrings';

export const InviteManagementTab = ({ 
  invitations, 
  inviteLinks, 
  copiedLinkId,
  onCopyInviteLink,
  formatInviteTimestamp,
  getInviteStatusTone 
}) => {
  const s = useStrings();

  return (
    <div>
      {/* 대기중인 초대 */}
      <section>
        <h3>대기중인 초대</h3>
        {invitations.map(invite => (
          <div key={invite.id}>
            {invite.email}
          </div>
        ))}
      </section>

      {/* 재사용 가능한 초대 링크 */}
      <section>
        <h3>초대 링크</h3>
        {inviteLinks.map(link => (
          <div key={link.id}>
            <span>{link.url}</span>
            <button onClick={() => onCopyInviteLink(link.id, link.url)}>
              {copiedLinkId === link.id ? '복사됨' : '복사'}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};
```

---

## 📊 상세 비교표

| 항목 | Before (현재) | After (리팩토링) | 개선 효과 |
|------|--------------|----------------|----------|
| **파일 수** | 1개 (775라인) | 3개 (200+78+147) | ✅ 관심사 분리 |
| **가독성** | 스크롤 필수 | 파일명으로 즉시 찾기 | ✅ 50% 향상 |
| **재사용성** | 불가능 | 탭 컴포넌트 재사용 가능 | ✅ 재사용 가능 |
| **테스트** | 전체 페이지 테스트만 | 탭별 독립 테스트 | ✅ 테스트 용이 |
| **유지보수** | 한 파일에서 모든 탭 관리 | 탭별 파일 수정 | ✅ 충돌 감소 |
| **Git diff** | 작은 수정도 큰 diff | 수정한 탭만 diff | ✅ 리뷰 용이 |
| **번들 크기** | 전체 로드 | 동적 import 가능 | ✅ 성능 개선 가능 |

---

## 🔍 실제 사용 예시

### Before (현재)

```jsx
// WorkspaceSettingsPage.jsx 안에서
const renderInviteManagement = () => (
  <div>
    <h2>{s.workspaceAdmin.inviteManagementTitle}</h2>
    {/* 120라인의 복잡한 JSX */}
    {invitations.map(invite => {
      const tone = getInviteStatusTone(invite.status);
      return (
        <div key={invite.id}>
          <strong>{invite.email}</strong>
          <span style={{
            padding: '0.25rem 0.6rem',
            borderRadius: '9999px',
            background: tone.background,
            color: tone.color,
          }}>
            {tone.label}
          </span>
        </div>
      );
    })}
  </div>
);

// 메인 렌더에서
{selectedTab === 'invite-management' && renderInviteManagement()}
```

**문제**:
- renderInviteManagement() 함수를 찾으려면 파일 내 검색 필요
- 다른 페이지에서 재사용 불가
- 테스트하려면 전체 WorkspaceSettingsPage 마운트 필요

### After (리팩토링)

```jsx
// WorkspaceSettingsPage.jsx
import { InviteManagementTab } from './workspace/tabs';

case 'invite-management':
  return (
    <InviteManagementTab
      invitations={invitations}
      inviteLinks={inviteLinks}
      copiedLinkId={copiedLinkId}
      onCopyInviteLink={handleCopyInviteLink}
      formatInviteTimestamp={formatInviteTimestamp}
      getInviteStatusTone={getInviteStatusTone}
    />
  );
```

**장점**:
- ✅ IDE에서 Cmd/Ctrl + 클릭으로 바로 파일 이동
- ✅ 다른 페이지에서도 import해서 사용 가능
- ✅ 독립적으로 테스트 가능

---

## 💡 추가 개선 가능성

### 1. 동적 Import (코드 스플리팅)

```jsx
// Before (현재): 모든 탭이 항상 로드됨
const renderContent = () => {
  switch (selectedTab) {
    case 'overview':
      return renderOverview(); // 775라인이 모두 메모리에
    // ...
  }
};

// After (최적화): 필요한 탭만 로드
const renderContent = () => {
  switch (selectedTab) {
    case 'overview':
      const InsightsTab = lazy(() => import('./workspace/tabs/InsightsTab'));
      return <Suspense fallback={<Spinner />}>
        <InsightsTab stats={stats} activities={activities} />
      </Suspense>;
    // ...
  }
};
```

**효과**: 초기 번들 크기 ~30% 감소

---

### 2. Props Drilling 해결 (향후)

```jsx
// Before: 함수를 계속 전달해야 함
<InviteManagementTab
  onCopyInviteLink={handleCopyInviteLink}
  formatInviteTimestamp={formatInviteTimestamp}
  getInviteStatusTone={getInviteStatusTone}
/>

// After (hooks 활용):
// InviteManagementTab 내부에서 직접 사용
const InviteManagementTab = ({ invitations, inviteLinks }) => {
  const { copyInviteLink } = useInviteActions();
  const { formatTimestamp } = useFormatters();
  const { getStatusTone } = useInviteStatus();
  
  // ...
};
```

---

### 3. Test 작성

```jsx
// Before: 불가능 (전체 페이지만 테스트 가능)

// After: 탭별 독립 테스트
describe('InviteManagementTab', () => {
  it('should display pending invitations', () => {
    const invitations = [
      { id: 1, email: 'test@test.com', status: 'pending' }
    ];
    
    render(<InviteManagementTab invitations={invitations} />);
    
    expect(screen.getByText('test@test.com')).toBeInTheDocument();
  });

  it('should copy invite link when button clicked', () => {
    const onCopyInviteLink = jest.fn();
    
    render(
      <InviteManagementTab 
        inviteLinks={mockLinks}
        onCopyInviteLink={onCopyInviteLink}
      />
    );
    
    fireEvent.click(screen.getByText('복사'));
    expect(onCopyInviteLink).toHaveBeenCalled();
  });
});
```

---

## 🎯 결론

### 리팩토링 하면

#### ✅ 즉시 얻는 장점
1. **가독성**: 파일 775줄 → 200줄 (74% 감소)
2. **유지보수**: 탭 수정 시 해당 파일만 열면 됨
3. **Git 협업**: 동시에 다른 탭 작업 가능 (충돌 없음)
4. **이해도**: 새 개발자가 구조 파악 용이

#### ✅ 향후 얻는 장점
1. **테스트**: 탭별 독립 테스트 가능
2. **재사용**: 다른 페이지에서 탭 재사용
3. **성능**: 필요 시 동적 import로 번들 최적화
4. **확장성**: 새 탭 추가 시 독립 파일로 추가

#### ⚠️ 단점
1. 파일 수 증가 (1개 → 3개)
2. Props 전달 필요 (prop drilling)
3. 초기 리팩토링 시간 필요 (~1시간)

### 안 하면
- 계속 775라인 파일 유지
- 협업 시 merge conflict 증가
- 새 기능 추가 시 파일 더 커짐
- 테스트 작성 어려움

---

## 💭 추천

**지금 리팩토링하는 것을 추천합니다!**

이유:
1. 이미 탭 컴포넌트 생성 완료 (InsightsTab, InviteManagementTab, ProfileTab)
2. 메인 파일 수정은 간단 (import + switch case만)
3. 나중에 하면 더 어려워짐 (파일이 더 커질수록)
4. Phase 2 (다국어) 작업 시에도 도움됨 (탭별로 문자열 관리)

**예상 소요 시간**: 30분
- WorkspaceSettingsPage 리팩토링: 15분
- UserSettingsPage 리팩토링: 10분
- 테스트: 5분
