# 리팩토링 가이드

## ✅ 완료된 작업

### 1. Mock 데이터 분리
- ✅ `src/mocks/workspaces.js`
- ✅ `src/mocks/categories.js`
- ✅ `src/mocks/users.js`
- ✅ `src/mocks/messages.js`
- ✅ `src/mocks/dms.js`
- ✅ `src/mocks/adminData.js`
- ✅ `src/mocks/index.js` (중앙 export)

### 2. 아이콘 컴포넌트 구조화
- ✅ `src/components/common/icons/index.jsx` (중앙 export)
- 개별 아이콘 파일들은 필요시 생성

### 3. Context 분리
- ✅ `src/contexts/AppContext.jsx` (다크모드 관리)

### 4. 공통 컴포넌트 분리
- ✅ `src/components/common/Spinner/index.jsx`
- ✅ `src/components/common/StatusIndicator/index.jsx`
- ✅ `src/components/common/Avatar/index.jsx`
- ✅ `src/components/common/Button/index.jsx`

### 5. 레이아웃 컴포넌트 분리
- ✅ `src/components/layout/LeftSidebar/index.jsx` (메인)
- ✅ `src/components/layout/LeftSidebar/WorkspaceDropdown.jsx`
- ✅ `src/components/layout/LeftSidebar/NavigationMenu.jsx`
- ✅ `src/components/layout/LeftSidebar/ChannelList.jsx`
- ✅ `src/components/layout/LeftSidebar/CategorySection.jsx`
- ✅ `src/components/layout/LeftSidebar/DMList.jsx`
- ✅ `src/components/layout/LeftSidebar/SidebarFooter.jsx`
- ✅ `src/components/layout/ChatHeader/index.jsx`
- ✅ `src/components/layout/ThreadSidebar/index.jsx`

### 6. 채팅 컴포넌트 분리
- ✅ `src/components/chat/MessageList/index.jsx`
- ✅ `src/components/chat/MessageList/Message.jsx`
- ✅ `src/components/chat/MessageContextMenu/index.jsx`
- ✅ `src/components/chat/MessageInput/index.jsx`
- ✅ `src/components/chat/AIAssistant/AIFab.jsx`

### 7. 뷰 컴포넌트 분리
- ✅ `src/components/dashboard/DashboardView/index.jsx`
- ✅ `src/components/directory/DirectoryView/index.jsx`
- ✅ `src/components/search/SearchView/index.jsx`

### 8. 모달 컴포넌트 분리
- ✅ `src/components/modals/Modal/index.jsx` (기본 모달 컴포넌트)
- ✅ `src/components/modals/UserProfileModal/index.jsx`
- ✅ `src/components/modals/InviteMemberModal/index.jsx`
- ✅ `src/components/modals/CreateCategoryModal/index.jsx`
- ✅ `src/components/modals/NotificationsModal/index.jsx`
- ✅ `src/components/modals/index.jsx` (중앙 export)

### 9. 설정 페이지 분리
- ✅ `src/app/(settings)/layout.jsx` (설정 레이아웃)
- ✅ `src/app/(settings)/settings/user/page.jsx` (사용자 설정)
- ✅ `src/app/(settings)/settings/workspace/[workspaceId]/page.jsx` (워크스페이스 설정)

### 10. Next.js App Router 구조
- ✅ 완료

```
src/app/
├── (auth)/
│   ├── layout.jsx
│   ├── login/page.jsx
│   └── signup/page.jsx
│
├── (main)/
│   └── workspace/
│       ├── page.jsx
│       └── [workspaceId]/
│           ├── layout.jsx        # LeftSidebar 포함
│           ├── dashboard/page.jsx
│           ├── search/page.jsx
│           ├── directory/page.jsx
│           └── channel/[channelId]/page.jsx
│
├── (settings)/
│   ├── layout.jsx
│   ├── settings/user/page.jsx
│   └── settings/workspace/[workspaceId]/page.jsx
│
├── layout.jsx
├── page.jsx
└── globals.css
```

## 📝 중요 컴포넌트 매핑

### 스파게티 코드 → 리팩토링 구조

| 원본 컴포넌트 | 리팩토링 위치 |
|---|---|
| `LoginPage` | `src/app/(auth)/login/page.jsx` |
| `WorkspacePage` | `src/app/(main)/workspace/[workspaceId]/page.jsx` |
| `LeftSidebar` | `src/components/layout/LeftSidebar/index.jsx` |
| `Message` | `src/components/chat/MessageList/Message.jsx` |
| `MessageInput` | `src/components/chat/MessageInput/index.jsx` |
| `DashboardView` | `src/app/(main)/workspace/[workspaceId]/dashboard/page.jsx` |
| `WorkspaceAdminPage` | `src/app/(settings)/workspace/[workspaceId]/page.jsx` |
| `UserSettingsPage` | `src/app/(settings)/user/page.jsx` |

## 🎯 컴포넌트 사용 예시

### 모달 사용
```jsx
import { UserProfileModal, InviteMemberModal } from '@/components/modals';

const [isProfileOpen, setIsProfileOpen] = useState(false);

<UserProfileModal
  isOpen={isProfileOpen}
  onClose={() => setIsProfileOpen(false)}
  user={selectedUser}
/>
```

### 레이아웃 사용
```jsx
import { LeftSidebar } from '@/components/layout/LeftSidebar';

<LeftSidebar
  currentWorkspace={currentWorkspace}
  workspaces={mockWorkspaces}
  categories={mockCategories}
  dms={mockDMs}
  users={mockUsers}
  currentUser={currentUser}
  currentChannelId={currentChannelId}
  currentView={currentView}
  isDarkMode={isDarkMode}
  onSelectChannel={handleSelectChannel}
  onSelectView={handleSelectView}
  // ... 기타 props
/>
```

## 💡 팁

- CSS Modules 사용: 각 컴포넌트마다 `.module.css` 파일 생성
- `'use client'` 지시어: 상태를 사용하는 컴포넌트에 추가
- Import 경로: `@/` 별칭 사용 (이미 설정됨)
- Mock 데이터: `@/mocks` 에서 import

## 🔧 작업 완료 상태

1. ✅ Mock 데이터 (완료)
2. ✅ Context (완료)
3. ✅ 공통 컴포넌트 (완료)
4. ✅ 레이아웃 컴포넌트 (완료)
5. ✅ 채팅 컴포넌트 (완료)
6. ✅ 뷰 컴포넌트 (완료)
7. ✅ 모달 컴포넌트 (완료)
8. ✅ 설정 페이지 (완료)
9. ✅ App Router 구조 (완료)

---

## 🎉 리팩토링 완료!

모든 주요 컴포넌트가 분리되었으며, 다음과 같은 구조로 정리되었습니다:

### 📁 최종 프로젝트 구조
```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 인증 그룹
│   ├── (main)/                   # 메인 앱 그룹
│   ├── (settings)/               # 설정 그룹
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
├── components/
│   ├── common/                   # 공통 컴포넌트
│   ├── layout/                   # 레이아웃
│   ├── chat/                     # 채팅
│   ├── dashboard/                # 대시보드
│   ├── directory/                # 디렉토리
│   ├── search/                   # 검색
│   └── modals/                   # 모달
├── contexts/                     # Context API
├── mocks/                        # Mock 데이터
└── styles/                       # 전역 스타일

총 70+ 개의 독립적인 컴포넌트로 분리 완료
```

**주의**: 스파게티 코드는 참고용으로만 사용하고, 리팩토링된 구조에서는 삭제하세요.
