# 전체 리팩토링 계획 - 최종 승인본 (방식 1: 미리 전부 마이그레이션)

## 📋 개요

- **총 기간**: 13-15일 (약 2.5-3주)
- **참여 인원**: 3명 (Developer A, B, C)
- **브랜치 전략**: Phase 1 완료 후 feature 브랜치 분리 → 순차 머지
- **병렬 작업**: Phase 2에서 3명이 동시 작업
- **핵심**: Phase 1에서 Store 마이그레이션 21개 파일 모두 완료 (토대 구축)

---

## 🚀 Phase 1: 공통 기반 + Store 마이그레이션 전체 완료 (main 브랜치, 5-6일)

**담당**: 1명 (리드 개발자 또는 가장 숙련된 개발자)
**브랜치**: `main` 또는 `refactor/foundation`
**목적**: 모든 토대를 완성하여 Phase 2에서 바로 리팩토링 시작 가능하도록

### 작업 내용

#### 1-1. 공통 UI 컴포넌트 생성 (2-3일)

**생성 위치**: `src/components/ui/`

**필수 컴포넌트**:
```
components/ui/
├── Button/
│   ├── Button.jsx
│   ├── Button.module.css
│   └── index.js
├── Avatar/
│   ├── Avatar.jsx
│   ├── Avatar.module.css
│   └── index.js
├── EmptyState/
│   ├── EmptyState.jsx
│   ├── EmptyState.module.css
│   └── index.js
├── LoadingSpinner/
│   ├── LoadingSpinner.jsx
│   ├── LoadingSpinner.module.css
│   └── index.js
└── ListItem/
    ├── ListItem.jsx
    ├── ListItem.module.css
    └── index.js
```

**Button.jsx 요구사항**:
```javascript
// 사용 예시 (16곳에서 사용될 예정)
<Button
  variant="primary" | "secondary" | "channel" | "favorite"
  size="sm" | "md" | "lg"
  isActive={boolean}
  icon={<ReactNode>}
  onClick={function}
  disabled={boolean}
>
  {children}
</Button>
```

**Avatar.jsx 요구사항**:
```javascript
// 사용 예시 (10+곳에서 사용될 예정)
<Avatar
  src={string}
  alt={string}
  size="xs" | "sm" | "md" | "lg" | "xl"
  fallback={string}
  status="online" | "offline" | "away" | "busy"
  showStatus={boolean}
/>
```

**EmptyState.jsx 요구사항**:
```javascript
// 사용 예시 (10+곳에서 사용될 예정)
<EmptyState
  icon={<ReactNode>}
  title={string}
  description={string}
  action={<ReactNode>}
/>
```

#### 1-2. 전체 Store 마이그레이션 (3일)

**작업 대상**: 총 21개 파일

**Shared/Layout (3개)**:
```
✓ components/layout/LeftSidebar/FavoritesList.jsx (이미 완료)
□ components/layout/LeftSidebar/index.jsx
□ components/modals/ModalManager.jsx
```

**Workspace 도메인 (5개)**:
```
□ components/workspace/components/CreateWorkspacePage.jsx
□ components/workspace/modals/WorkspaceProfileModal.jsx
□ components/user/modals/InviteFlow/index.jsx
□ app/[locale]/(app)/workspace/[workspaceId]/WorkspaceLayoutClient.jsx
□ app/[locale]/(app)/workspace/[workspaceId]/directory/DirectoryClient.jsx
```

**Chat 도메인 (8개)**:
```
□ components/channel/components/ChannelHeader.jsx
□ components/channel/components/ThreadSidebar.jsx
□ components/channel/components/MessageList/Message.jsx
□ components/notification/components/InboxModal.jsx
□ components/layout/LeftSidebar/CategorySection.jsx
□ components/layout/LeftSidebar/DMList.jsx
□ components/layout/LeftSidebar/DirectoryList.jsx
□ app/[locale]/(app)/workspace/[workspaceId]/channel/[channelId]/ChannelPageClient.jsx
```

**AI 도메인 (5개 + i18n 수정)**:
```
□ components/modals/AIAssistantModal.jsx
□ components/settings/ai/AIModelSettings.jsx
□ components/settings/ai/AITranslationSettings.jsx
□ components/settings/ai/LearningSettings.jsx
□ components/settings/ai/AISearchSettings.jsx
□ components/settings/ai/TestSettings.jsx (존재 시)

# 추가: Search 컴포넌트 i18n 수정
□ components/search/components/refactored/SearchResultsHeader.jsx
□ components/search/components/refactored/SearchResultsContainer.jsx
```

**마이그레이션 패턴 (통일)**:
```javascript
// Before
import useStore from '@/core/store/useStore';
const favoriteChannels = useStore((state) => state.favoriteChannels);

// After (선택자 패턴 - 모든 파일 동일하게)
import { useChatStore } from '@/core/store/chat';
const favoriteChannels = useChatStore((state) => state.favoriteChannels);
```

**Store Import 가이드**:
```javascript
// Shared 컴포넌트
import { useUIStore } from '@/core/store/shared';
import { useWorkspaceStore } from '@/core/store/workspace';
import { useChatStore } from '@/core/store/chat';

// Workspace 도메인
import { useWorkspaceStore, useWorkspaceSettingsStore } from '@/core/store/workspace';
import { useAuthStore } from '@/core/store/shared';

// Chat 도메인
import { useChatStore, useNotificationStore } from '@/core/store/chat';
import { useUIStore } from '@/core/store/shared'; // Modal용

// AI 도메인
import { useAIStore, useSearchStore } from '@/core/store/ai';
import { useUIStore } from '@/core/store/shared'; // autoTranslate, Modal용
```

### 완료 조건
- [ ] 5개 공통 UI 컴포넌트 생성 및 테스트
- [ ] 21개 파일 Store 마이그레이션 완료
- [ ] Search 컴포넌트 i18n 수정 완료 (한글 하드코딩 제거)
- [ ] `npm run build` 통과
- [ ] 모든 도메인 기본 동작 테스트 통과
- [ ] 기존 `useStore.js` 삭제
- [ ] PR 생성 및 머지 (main에 반영)

---

## 🎯 Phase 2: 도메인별 리팩토링 작업 (각자 브랜치, 병렬, 5-6일)

**중요**: Phase 1 완료 후 각 개발자가 **독립 브랜치**에서 **병렬 작업**
**전제**: Store 마이그레이션은 이미 완료되어 있음 → 리팩토링과 백엔드 연결만 진행

### 브랜치 전략
```bash
# 각 개발자가 main에서 브랜치 생성
git checkout main
git pull origin main

# Developer A
git checkout -b feature/workspace-refactor

# Developer B
git checkout -b feature/chat-refactor

# Developer C
git checkout -b feature/ai-refactor
```

---

### Developer A: feature/workspace-refactor (5일)

**담당 도메인**: Workspace, 멤버 관리, 프로필
**전제**: Workspace Store 마이그레이션은 Phase 1에서 이미 완료됨

#### 2-1. Workspace 큰 컴포넌트 리팩토링 (3일)

**작업 대상** (4개 컴포넌트):

1. **DirectoryView.jsx** (264 lines → 60 lines)
```
components/workspace/components/DirectoryView/
├── DirectoryView.jsx (60 lines)
├── DirectoryHeader.jsx (40 lines)
├── DirectoryFilters.jsx (50 lines)
├── DirectoryTabs.jsx (40 lines)
└── DirectoryList.jsx (70 lines)
```

2. **InviteFlow/index.jsx** (241 lines → 80 lines)
```
components/user/modals/InviteFlow/
├── index.jsx (80 lines)
├── InviteEmailStep.jsx (50 lines)
├── InviteRoleStep.jsx (60 lines)
└── InviteReviewStep.jsx (50 lines)
```

3. **CreateWorkspacePage.jsx** (136 lines → 40 lines)
```
components/workspace/components/CreateWorkspacePage/
├── CreateWorkspacePage.jsx (40 lines)
├── WorkspaceForm.jsx (60 lines)
└── WorkspacePreview.jsx (40 lines)
```

4. **MembersTab.jsx** (143 lines → 40 lines)
```
components/workspace/components/MembersTab/
├── MembersTab.jsx (40 lines)
├── MembersToolbar.jsx (50 lines)
└── MembersList.jsx (60 lines)
```

#### 2-2. Workspace 공통 UI 패턴 교체 (1일)

**작업 내용**:
- Button 패턴 교체 (5곳)
- Avatar 패턴 교체 (4곳)
- EmptyState 패턴 교체 (3곳)

#### 2-3. 백엔드 API 연결 (1일)

**작업 내용**:
- 워크스페이스 생성/수정/삭제 API
- 멤버 초대/삭제 API
- 프로필 수정 API
- 디렉토리 조회 API

**예시**:
```javascript
// components/workspace/components/CreateWorkspacePage.jsx
const handleCreateWorkspace = async (formData) => {
  try {
    const response = await axiosInstance.post('/api/workspaces', formData);
    setCurrentWorkspace(response.data);
    router.push(`/workspace/${response.data.id}`);
  } catch (error) {
    console.error('Failed to create workspace:', error);
  }
};
```

---

### Developer B: feature/chat-refactor (6일)

**담당 도메인**: Chat, 메시지, 알림, 스레드
**전제**: Chat Store 마이그레이션은 Phase 1에서 이미 완료됨

#### 2-1. Chat 큰 컴포넌트 리팩토링 (3일)

**작업 대상** (3개 컴포넌트):

1. **Message.jsx** (186 lines → 60 lines) - 최우선
```
components/channel/components/MessageList/Message/
├── Message.jsx (60 lines)
├── MessageContent.jsx (40 lines)
├── MessageTranslation.jsx (30 lines)
├── MessageReactions.jsx (30 lines)
└── MessageThreadPreview.jsx (30 lines)
```

2. **InboxModal.jsx** (206 lines → 50 lines)
```
components/notification/components/InboxModal/
├── InboxModal.jsx (50 lines)
├── InboxHeader.jsx (30 lines)
├── InboxTabs.jsx (40 lines)
├── InboxToolbar.jsx (40 lines)
└── InboxList.jsx (50 lines)
```

3. **MessageContextMenu.jsx** (189 lines → 50 lines)
```
components/channel/components/MessageContextMenu/
├── MessageContextMenu.jsx (50 lines)
├── ContextMenuGeneral.jsx (50 lines)
├── ContextMenuTranslation.jsx (40 lines)
└── ContextMenuAdmin.jsx (50 lines)
```

#### 2-2. Chat 공통 UI 패턴 교체 (2일)

**작업 내용**:
- Button 패턴 교체 (7곳)
- Avatar 패턴 교체 (4곳)
- EmptyState 패턴 교체 (5곳)

#### 2-3. 백엔드 API 연결 (1일)

**작업 내용**:
- 메시지 전송/수정/삭제 API
- 스레드 생성/조회 API
- 리액션 추가/삭제 API
- 알림 조회/읽음 처리 API
- 읽지 않음 카운트 조회 API

**예시**:
```javascript
// components/channel/components/MessageList/Message.jsx
const handleSendMessage = async (content) => {
  try {
    const response = await axiosInstance.post(
      `/api/channels/${channelId}/messages`,
      { content }
    );
    // 메시지 전송 후 UI 업데이트
    addMessage(response.data);
  } catch (error) {
    console.error('Failed to send message:', error);
  }
};
```

---

### Developer C: feature/ai-refactor (3-4일)

**담당 도메인**: AI 검색, 번역, 어시스턴트
**전제**: AI Store 마이그레이션과 Search i18n은 Phase 1에서 이미 완료됨

#### 2-1. AI 큰 컴포넌트 리팩토링 (1일)

**작업 대상** (1개 컴포넌트):

1. **SearchView.jsx** (141 lines → 40 lines)
```
components/search/components/SearchView/
├── SearchView.jsx (40 lines)
├── SearchHeader.jsx (30 lines)
├── SearchFilters.jsx (40 lines)
└── SearchResults.jsx (40 lines)
```

#### 2-2. AI 공통 UI 패턴 교체 (1일)

**작업 내용**:
- Button 패턴 교체 (4곳)
- Avatar 패턴 교체 (2곳)
- EmptyState 패턴 교체 (2곳)

#### 2-3. 백엔드 API 연결 (1-2일)

**작업 내용**:
- AI 검색 API
- 번역 API
- AI 어시스턴트 세션 API
- AI 학습 상태 API

**예시**:
```javascript
// components/search/components/SearchView.jsx
const handleSearch = async (query) => {
  setSearchState({ status: 'loading' });
  try {
    const response = await axiosInstance.post('/api/ai/search', { query });
    setSearchResults(response.data.results);
    setSearchState({ status: 'success' });
  } catch (error) {
    setSearchState({ status: 'error', error: error.message });
  }
};
```

---

## 🔀 Phase 3: 순차 머지 및 충돌 해결 (2-3일)

**중요**: 순차적으로 머지하여 충돌 최소화

### 3-1. Developer A 브랜치 머지 (0.5일)

**가장 먼저 머지하는 이유**: Workspace는 다른 도메인과 독립적

```bash
# Developer A
git checkout feature/workspace-refactor
git pull origin main
git push origin feature/workspace-refactor

# PR 생성 및 리뷰
# 승인 후 main에 머지
```

**체크리스트**:
- [ ] `npm run build` 통과
- [ ] 워크스페이스 생성/수정 기능 테스트
- [ ] 멤버 초대 기능 테스트
- [ ] 다국어 정상 작동 확인

---

### 3-2. Developer B 브랜치 머지 (1일)

**두 번째로 머지하는 이유**: Chat은 Workspace 정보를 사용하므로 A 머지 후 진행

```bash
# Developer B
git checkout feature/chat-refactor
git pull origin main  # Developer A의 변경사항 가져오기
# 충돌 해결 (예상 충돌: LeftSidebar, ModalManager)
git push origin feature/chat-refactor

# PR 생성 및 리뷰
# 승인 후 main에 머지
```

**예상 충돌 지점**:
- `components/layout/LeftSidebar/index.jsx` (Phase 1에서 수정됨)
- `components/modals/ModalManager.jsx` (Phase 1에서 수정됨)

**충돌 해결 방법**:
```javascript
// 충돌 예시: LeftSidebar/index.jsx
// Developer A가 수정: useWorkspaceStore 사용
// Developer B가 수정: useChatStore 사용
// 해결: 둘 다 import하여 사용

import { useWorkspaceStore } from '@/core/store/workspace';
import { useChatStore } from '@/core/store/chat';
```

**체크리스트**:
- [ ] 충돌 해결 완료
- [ ] `npm run build` 통과
- [ ] 메시지 전송/수정/삭제 기능 테스트
- [ ] 스레드 기능 테스트
- [ ] 알림 기능 테스트

---

### 3-3. Developer C 브랜치 머지 (1일)

**마지막으로 머지하는 이유**: AI는 모든 도메인의 데이터를 사용하므로 A, B 머지 후 진행

```bash
# Developer C
git checkout feature/ai-refactor
git pull origin main  # Developer A, B의 변경사항 가져오기
# 충돌 해결 (예상 충돌: Search 관련 i18n, Modal)
git push origin feature/ai-refactor

# PR 생성 및 리뷰
# 승인 후 main에 머지
```

**예상 충돌 지점**:
- `messages/*/search.json` (i18n 번역 파일)
- `components/modals/ModalManager.jsx` (AIAssistantModal 추가)

**체크리스트**:
- [ ] 충돌 해결 완료
- [ ] `npm run build` 통과
- [ ] AI 검색 기능 테스트
- [ ] 번역 기능 테스트
- [ ] AI 어시스턴트 기능 테스트
- [ ] 한글 하드코딩 완전히 제거 확인

---

## 🎨 Phase 4: 최종 통합 리팩토링 (main 브랜치, 2-3일)

**담당**: 전체 팀 (리드 개발자 주도)
**브랜치**: `main`

### 4-1. UI 통일성 검증 (0.5일)

**작업 내용**:
- [ ] 모든 Button 컴포넌트가 `components/ui/Button` 사용하는지 확인
- [ ] 모든 Avatar 컴포넌트가 `components/ui/Avatar` 사용하는지 확인
- [ ] 일관된 spacing, color, typography 확인
- [ ] 다크모드 정상 작동 확인

**도구**:
```bash
# Button 중복 패턴 검색
grep -r "className.*button" src/components --exclude-dir=ui

# Avatar 중복 패턴 검색
grep -r "rounded-full.*w-\[0-9\]" src/components --exclude-dir=ui
```

---

### 4-2. 다국어 지원 누락 확인 (0.5일)

**작업 내용**:
- [ ] 모든 한글/일본어/영어 하드코딩 제거 확인
- [ ] 4개 언어(ko, en, ja, fr) 모두 정상 작동 확인
- [ ] 번역 누락 키 확인

**도구**:
```bash
# 한글 하드코딩 검색 (quotes 안의 한글)
grep -r "[\"\'][가-힣]" src/components --include="*.jsx"

# 일본어 하드코딩 검색
grep -r "[\"\'][ぁ-ん]" src/components --include="*.jsx"
```

**수정 예시**:
```javascript
// Before
<button>로그인</button>

// After
const messages = useMessages();
const t = messages?.common;
<button>{t?.login ?? '로그인'}</button>
```

---

### 4-3. 컴포넌트 로직 최종 점검 (0.5일)

**작업 내용**:
- [ ] 중복 로직 제거 (custom hooks로 추출)
- [ ] 불필요한 re-render 최적화 (React.memo, useMemo)
- [ ] 에러 핸들링 개선

**예시**:
```javascript
// 중복 로직 → custom hook으로 추출
// Before (3곳에서 중복)
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const fetchData = async () => {
  setLoading(true);
  try {
    const response = await axiosInstance.get('/api/data');
    setLoading(false);
    return response.data;
  } catch (err) {
    setError(err);
    setLoading(false);
  }
};

// After (custom hook)
const { data, loading, error } = useFetch('/api/data');
```

---

### 4-4. 기존 useStore.js 삭제 (0.5일)

**중요**: 모든 컴포넌트가 새 Store를 사용하는지 확인 후 삭제

**체크리스트**:
```bash
# useStore 사용처 검색
grep -r "from '@/core/store/useStore'" src/

# 검색 결과가 0개면 삭제 가능
rm src/core/store/useStore.js
rm src/core/store/slices/*.js  # 기존 slice 파일들도 삭제
```

**삭제 대상**:
```
□ src/core/store/useStore.js
□ src/core/store/slices/modalSlice.js
□ src/core/store/slices/chatSlice.js
□ src/core/store/slices/workspaceSlice.js
□ src/core/store/slices/settingsSlice.js
□ src/core/store/slices/inboxSlice.js
□ src/core/store/slices/profileSlice.js
□ src/core/store/slices/searchSlice.js
□ src/core/store/slices/uiSlice.js
□ src/core/store/slices/notificationSlice.js
```

---

### 4-5. 통합 테스트 (0.5일)

**테스트 시나리오**:

1. **워크스페이스 생성 플로우**:
   - [ ] 새 워크스페이스 생성
   - [ ] 멤버 초대
   - [ ] 채널 생성
   - [ ] 메시지 전송

2. **채팅 기능**:
   - [ ] 메시지 전송/수정/삭제
   - [ ] 스레드 생성/답글
   - [ ] 리액션 추가/삭제
   - [ ] 읽지 않음 카운트 업데이트

3. **AI 기능**:
   - [ ] AI 검색
   - [ ] 메시지 번역
   - [ ] AI 어시스턴트 대화

4. **다국어**:
   - [ ] 한국어 → 영어 → 일본어 → 프랑스어 전환
   - [ ] 모든 언어에서 UI 정상 표시

5. **빌드 테스트**:
```bash
npm run build
# 에러 없이 통과해야 함
```

---

### 4-6. 문서 최종 업데이트 (0.5일)

**업데이트 대상**:
```
□ ARCHITECTURE_GUIDE.md
  - 최종 Store 구조 반영
  - 공통 UI 컴포넌트 사용법 추가
  - 백엔드 API 연동 예시 추가

□ STORE_MIGRATION_GUIDE.md
  - 마이그레이션 완료 표시
  - 체크리스트 모두 체크

□ COMPONENT_REFACTORING_GUIDE.md
  - 리팩토링 완료 표시
  - Before/After 스크린샷 추가 (선택)

□ README.md
  - 프로젝트 구조 업데이트
  - 개발 가이드 추가
```

**새로 추가할 문서**:
```
□ DEVELOPMENT_GUIDE.md (신규 생성)
  - 3명 개발자 협업 가이드
  - 브랜치 전략
  - PR 규칙
  - 코드 리뷰 체크리스트

□ API_INTEGRATION_GUIDE.md (신규 생성)
  - 백엔드 API 엔드포인트 목록
  - 각 도메인별 API 사용법
  - 에러 핸들링 패턴
```

---

## 📊 전체 타임라인

| Phase | 작업 내용 | 담당 | 병렬 | 기간 |
|-------|----------|------|------|------|
| **Phase 1** | 공통 기반 작업 | 1명 | ❌ | 3-4일 |
| **Phase 2** | 도메인별 독립 작업 | 3명 | ✅ | 7-8일 |
| **Phase 3** | 순차 머지 및 충돌 해결 | 3명 | 부분 | 2-3일 |
| **Phase 4** | 최종 통합 리팩토링 | 전체 | ❌ | 2-3일 |
| **합계** | | | | **14-18일** |

---

## 🎯 각 개발자별 총 작업량

### Developer A (Workspace)
- Phase 2-A: 7일 (독립 브랜치)
- Phase 3-1: 0.5일 (머지)
- Phase 4: 0.5일 (최종 검증 참여)
- **총 8일**

### Developer B (Chat)
- Phase 2-B: 8일 (독립 브랜치)
- Phase 3-2: 1일 (머지 + 충돌 해결)
- Phase 4: 0.5일 (최종 검증 참여)
- **총 9.5일**

### Developer C (AI)
- Phase 2-C: 5일 (독립 브랜치)
- Phase 3-3: 1일 (머지 + 충돌 해결)
- Phase 4: 0.5일 (최종 검증 참여)
- **총 6.5일**

---

## ✅ 브랜치 전략 요약

```
main (기본 브랜치)
    │
    ├── Phase 1: 공통 기반 작업 (main 또는 refactor/foundation)
    │   └── 머지 → main
    │
    ├── feature/workspace-refactor (Developer A)
    │   ├── Phase 2-A: 독립 작업 (7일)
    │   └── Phase 3-1: PR → main 머지
    │
    ├── feature/chat-refactor (Developer B)
    │   ├── Phase 2-B: 독립 작업 (8일)
    │   ├── Phase 3-2: main 최신화 (충돌 해결)
    │   └── Phase 3-2: PR → main 머지
    │
    ├── feature/ai-refactor (Developer C)
    │   ├── Phase 2-C: 독립 작업 (5일)
    │   ├── Phase 3-3: main 최신화 (충돌 해결)
    │   └── Phase 3-3: PR → main 머지
    │
    └── Phase 4: 최종 통합 리팩토링 (main)
```

---

## 🔥 핵심 장점

1. **병렬 작업 극대화**: Phase 2에서 3명이 동시 작업 (7-8일)
2. **충돌 최소화**: 순차 머지 전략 (A → B → C)
3. **백엔드 연결 동시 진행**: 프론트 리팩토링과 API 연결을 함께 작업
4. **점진적 통합**: 각 도메인을 완전히 완성한 후 머지
5. **최종 품질 보장**: Phase 4에서 통합 검증 및 최종 리팩토링

---

## ⚠️ 주의사항

1. **Phase 1 완료 필수**: Phase 2 시작 전에 반드시 Phase 1이 main에 머지되어 있어야 함
2. **브랜치 최신화**: 각 개발자는 매일 `git pull origin main`으로 최신 상태 유지
3. **커밋 메시지 규칙**:
   ```
   feat: 기능 추가
   refactor: 리팩토링
   fix: 버그 수정
   docs: 문서 수정
   style: 코드 포맷팅
   ```
4. **PR 규칙**:
   - 제목: `[도메인] 작업 내용` (예: `[Workspace] Store 마이그레이션 및 컴포넌트 리팩토링`)
   - 설명: 변경 내용, 테스트 결과, 스크린샷 포함
   - 리뷰어: 최소 1명 승인 필요

---

## 🚀 시작 전 체크리스트

- [ ] 모든 개발자가 ARCHITECTURE_GUIDE.md 숙지
- [ ] 모든 개발자가 STORE_MIGRATION_GUIDE.md 숙지
- [ ] 모든 개발자가 COMPONENT_REFACTORING_GUIDE.md 숙지
- [ ] Git 브랜치 전략 합의
- [ ] PR 규칙 합의
- [ ] Phase 1 담당자 결정
- [ ] 각 개발자의 도메인 할당 확정 (A: Workspace, B: Chat, C: AI)

---

## 📞 문제 발생 시 대응

1. **충돌이 너무 많을 경우**:
   - 각 개발자가 매일 `git pull origin main` 습관화
   - 큰 충돌 예상 시 미리 소통

2. **백엔드 API가 준비 안 된 경우**:
   - Mock 데이터로 먼저 구현
   - API 준비 후 연결

3. **일정 지연 시**:
   - Phase 2의 "백엔드 연결"을 Phase 4로 이동
   - 프론트엔드 리팩토링만 먼저 완료

---

**승인 대기 중**: 이 계획이 괜찮으시면 바로 Phase 1부터 시작하겠습니다! 🚀
