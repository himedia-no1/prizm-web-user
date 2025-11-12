# Store Migration Guide - 도메인별 독립 Store 구조

## 📋 개요

기존 통합 Store (`useStore`)를 3명 개발자가 독립적으로 작업할 수 있도록 도메인별로 분리했습니다.

### 🎯 분업 구조

| 개발자 | 도메인 | Store |
|--------|--------|-------|
| **A** | Workspace | `workspace/` |
| **B** | Chat | `chat/` |
| **C** | AI | `ai/` |
| **공통** | Shared | `shared/` |

---

## 📂 새로운 Store 구조

```
src/core/store/
├── shared/                    # 공통 (모든 개발자)
│   ├── uiStore.js            # UI 상태 (테마, 모달, 번역 설정)
│   └── index.js
│
├── workspace/                 # 개발자 A
│   ├── workspaceStore.js     # 워크스페이스, 멤버, 프로필
│   ├── settingsStore.js      # 워크스페이스 설정 UI
│   └── index.js
│
├── chat/                      # 개발자 B
│   ├── chatStore.js          # 채널, 메시지, 스레드
│   ├── notificationStore.js  # 알림, 읽지않음
│   └── index.js
│
├── ai/                        # 개발자 C
│   ├── aiStore.js            # AI 어시스턴트, 학습, 번역
│   ├── searchStore.js        # AI 검색
│   └── index.js
│
├── authStore.js              # 인증 (공통)
└── dataStore.js              # 데이터 캐시 (공통)
```

---

## 🔄 마이그레이션 방법

### Before (기존):
```javascript
import useStore from '@/core/store/useStore';

function MyComponent() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const favoriteChannels = useStore((state) => state.favoriteChannels);
  const currentWorkspace = useStore((state) => state.currentWorkspace);
}
```

### After (신규):
```javascript
import { useUIStore } from '@/core/store/shared';
import { useChatStore } from '@/core/store/chat';
import { useWorkspaceStore } from '@/core/store/workspace';

function MyComponent() {
  // UI 상태
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode);

  // Chat 상태
  const favoriteChannels = useChatStore((state) => state.favoriteChannels);

  // Workspace 상태
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
}
```

---

## 📝 Store별 상태 매핑표

### 🔹 Shared (공통)

#### `useUIStore`
| 기존 | 신규 |
|------|------|
| `useStore(state => state.isDarkMode)` | `useUIStore(state => state.isDarkMode)` |
| `useStore(state => state.toggleDarkMode)` | `useUIStore(state => state.toggleDarkMode)` |
| `useStore(state => state.modalType)` | `useUIStore(state => state.modalType)` |
| `useStore(state => state.openModal)` | `useUIStore(state => state.openModal)` |
| `useStore(state => state.closeModal)` | `useUIStore(state => state.closeModal)` |
| `useStore(state => state.autoTranslateEnabled)` | `useUIStore(state => state.autoTranslateEnabled)` |

#### `useAuthStore` (변경 없음)
```javascript
import { useAuthStore } from '@/core/store/authStore';
```

#### `useDataStore` (변경 없음)
```javascript
import useDataStore from '@/core/store/dataStore';
```

---

### 🔹 Workspace (개발자 A)

#### `useWorkspaceStore`
| 기존 | 신규 |
|------|------|
| `useStore(state => state.currentWorkspace)` | `useWorkspaceStore(state => state.currentWorkspace)` |
| `useStore(state => state.setCurrentWorkspace)` | `useWorkspaceStore(state => state.setCurrentWorkspace)` |
| `useStore(state => state.currentWorkspaceRole)` | `useWorkspaceStore(state => state.currentWorkspaceRole)` |
| `useStore(state => state.workspaceMemberships)` | `useWorkspaceStore(state => state.workspaceMemberships)` |
| `useStore(state => state.workspaceProfiles)` | `useWorkspaceStore(state => state.workspaceProfiles)` |
| `useStore(state => state.createDM)` | `useWorkspaceStore(state => state.createDM)` |

#### `useWorkspaceSettingsStore` (변경 없음)
```javascript
import { useWorkspaceSettingsStore } from '@/core/store/workspace';
```

---

### 🔹 Chat (개발자 B)

#### `useChatStore`
| 기존 | 신규 |
|------|------|
| `useStore(state => state.favoriteChannels)` | `useChatStore(state => state.favoriteChannels)` |
| `useStore(state => state.toggleFavoriteChannel)` | `useChatStore(state => state.toggleFavoriteChannel)` |
| `useStore(state => state.currentThread)` | `useChatStore(state => state.currentThread)` |
| `useStore(state => state.openThread)` | `useChatStore(state => state.openThread)` |
| `useStore(state => state.closeThread)` | `useChatStore(state => state.closeThread)` |
| `useStore(state => state.unreadCounts)` | `useChatStore(state => state.unreadCounts)` |
| `useStore(state => state.channelNotificationSettings)` | `useChatStore(state => state.channelNotificationSettings)` |

#### `useNotificationStore`
| 기존 | 신규 |
|------|------|
| `useStore(state => state.notifications)` | `useNotificationStore(state => state.notifications)` |
| `useStore(state => state.addNotification)` | `useNotificationStore(state => state.addNotification)` |
| `useStore(state => state.inboxState)` | `useNotificationStore(state => state.inboxState)` |
| `useStore(state => state.setInboxTab)` | `useNotificationStore(state => state.setInboxTab)` |

---

### 🔹 AI (개발자 C)

#### `useSearchStore`
| 기존 | 신규 |
|------|------|
| `useStore(state => state.searchState)` | `useSearchStore(state => state.searchState)` |
| `useStore(state => state.setSearchQuery)` | `useSearchStore(state => state.setSearchQuery)` |
| `useStore(state => state.setSearchResults)` | `useSearchStore(state => state.setSearchResults)` |

#### `useAIStore` (신규 생성)
```javascript
import { useAIStore } from '@/core/store/ai';

// AI 어시스턴트
const aiAssistantOpen = useAIStore((state) => state.aiAssistantOpen);
const openAIAssistant = useAIStore((state) => state.openAIAssistant);

// AI 학습
const learningStatus = useAIStore((state) => state.learningStatus);
const setLearningStatus = useAIStore((state) => state.setLearningStatus);

// 번역 설정
const translationSettings = useAIStore((state) => state.translationSettings);
```

---

## 🚀 마이그레이션 순서

### 1단계: 공통 컴포넌트 (우선)
- `components/layout/` → `useUIStore`, `useWorkspaceStore`, `useChatStore`
- `components/modals/` → `useUIStore`

### 2단계: 도메인별로 각 개발자가 진행

**개발자 A (Workspace):**
```
components/workspace/
components/user/
components/settings/workspace/
app/[locale]/(app)/workspace/[workspaceId]/setting/
```

**개발자 B (Chat):**
```
components/channel/
components/notification/
components/layout/LeftSidebar/ (일부)
app/[locale]/(app)/workspace/[workspaceId]/channel/
```

**개발자 C (AI):**
```
components/search/
components/settings/ai/
components/modals/AIAssistantModal.jsx
app/[locale]/(app)/workspace/[workspaceId]/search/
```

---

## ⚠️ 주의사항

1. **autoTranslateEnabled는 어디에?**
   - 현재: `useUIStore`에 위치
   - 이유: UI 설정이므로 공통
   - AI 담당자는 `useUIStore`에서 가져다 사용

2. **Modal 상태는 어디에?**
   - 현재: `useUIStore`에 위치
   - 모든 개발자가 공유

3. **번역 관련 로직**
   - 설정: `useUIStore.autoTranslateEnabled`
   - API/로직: AI 담당 (`components/channel/components/MessageList/Message.jsx` 참고)

4. **기존 useStore.js는 삭제하지 말것**
   - 마이그레이션이 완료될 때까지 유지
   - 모든 컴포넌트 마이그레이션 후 삭제

---

## 📚 Import 예시

### 컴포넌트별 권장 Import

```javascript
// Layout components (모든 Store 사용 가능)
import { useUIStore } from '@/core/store/shared';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useChatStore } from '@/core/store/chat';

// Workspace 관련 컴포넌트
import { useWorkspaceStore, useWorkspaceSettingsStore } from '@/core/store/workspace';
import { useAuthStore } from '@/core/store/shared';

// Chat 관련 컴포넌트
import { useChatStore, useNotificationStore } from '@/core/store/chat';
import { useUIStore } from '@/core/store/shared'; // Modal용

// AI 관련 컴포넌트
import { useAIStore, useSearchStore } from '@/core/store/ai';
import { useUIStore } from '@/core/store/shared'; // autoTranslate용
```

---

## ✅ 마이그레이션 체크리스트

### Shared (공통 - 우선 처리)
- [ ] `components/layout/LeftSidebar/index.jsx`
- [ ] `components/modals/ModalManager.jsx`
- [ ] `components/auth/AuthHeader.jsx`

### Workspace (개발자 A)
- [ ] `components/workspace/components/CreateWorkspacePage.jsx`
- [ ] `components/workspace/modals/WorkspaceProfileModal.jsx`
- [ ] `components/user/modals/InviteFlow/index.jsx`
- [ ] `app/[locale]/(app)/workspace/[workspaceId]/WorkspaceLayoutClient.jsx`
- [ ] `app/[locale]/(app)/workspace/[workspaceId]/directory/DirectoryClient.jsx`

### Chat (개발자 B)
- [ ] `components/channel/components/ChannelHeader.jsx`
- [ ] `components/channel/components/ThreadSidebar.jsx`
- [ ] `components/channel/components/MessageList/Message.jsx`
- [ ] `components/notification/components/InboxModal.jsx`
- [ ] `components/layout/LeftSidebar/CategorySection.jsx`
- [ ] `components/layout/LeftSidebar/DMList.jsx`
- [ ] `components/layout/LeftSidebar/FavoritesList.jsx`
- [ ] `app/[locale]/(app)/workspace/[workspaceId]/channel/[channelId]/ChannelPageClient.jsx`

### AI (개발자 C)
- [ ] `components/search/components/SearchView.jsx` (신규 생성 필요)
- [ ] `components/settings/ai/*` (5개 컴포넌트)
- [ ] `components/modals/AIAssistantModal.jsx`

---

## 🎓 학습 자료

각 도메인 Store의 자세한 API는 해당 파일의 JSDoc 주석을 참고하세요:
- `src/core/store/workspace/workspaceStore.js`
- `src/core/store/chat/chatStore.js`
- `src/core/store/ai/aiStore.js`
- `src/core/store/shared/uiStore.js`
