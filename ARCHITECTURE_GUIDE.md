# Prizm Web User - 아키텍처 가이드

## 🎯 개발 환경

- **Framework**: Next.js 14 (App Router)
- **State Management**: Zustand (도메인별 독립 Store)
- **Styling**: CSS Modules
- **HTTP Client**: Axios
- **i18n**: next-intl
- **Languages**: Korean (ko), English (en), Japanese (ja), French (fr)

---

## 👥 3명 분업 구조

이 프로젝트는 3명의 개발자가 **독립적으로 작업**할 수 있도록 설계되었습니다.

| 개발자 | 도메인 | 주요 기능 |
|--------|--------|----------|
| **A** | 🏢 Workspace | 워크스페이스 관리, 멤버 관리, 권한, 설정 |
| **B** | 💬 Chat | 실시간 메시징, 채널, 스레드, DM, 알림 |
| **C** | 🤖 AI | AI 검색, AI 어시스턴트, 자동 번역, AI 학습 |

---

## 📂 프로젝트 구조

```
src/
├── app/                         # Next.js App Router
│   ├── [locale]/               # 다국어 라우팅
│   │   ├── (app)/              # Route Group: 인증 필요
│   │   └── (auth)/             # Route Group: 인증 페이지
│   ├── api/                    # API Routes
│   └── mock/                   # Mock API (개발용)
│
├── components/                  # UI 컴포넌트
│   ├── auth/                   # 인증 관련
│   ├── workspace/              # 🏢 A: 워크스페이스
│   ├── user/                   # 🏢 A: 사용자/디렉토리
│   ├── channel/                # 💬 B: 채널/메시지
│   ├── notification/           # 💬 B: 알림
│   ├── search/                 # 🤖 C: AI 검색
│   ├── settings/               # 설정
│   │   ├── workspace/          # 🏢 A: 워크스페이스 설정
│   │   ├── user/               # 공통: 사용자 설정
│   │   ├── ai/                 # 🤖 C: AI 설정
│   │   └── prefs/              # 공통: 환경설정
│   ├── modals/                 # 공통 모달
│   ├── layout/                 # 레이아웃
│   ├── landing/                # 랜딩 페이지
│   ├── common/                 # 공통 컴포넌트
│   └── ui/                     # UI 기본 요소
│
├── core/                        # 핵심 로직
│   ├── store/                  # 🔥 Zustand Stores
│   │   ├── workspace/          # 🏢 A: 워크스페이스 Store
│   │   ├── chat/               # 💬 B: 채팅 Store
│   │   ├── ai/                 # 🤖 C: AI Store
│   │   ├── shared/             # 공통 Store
│   │   ├── authStore.js        # 인증 Store
│   │   └── dataStore.js        # 데이터 캐시 Store
│   │
│   └── api/                    # 🔥 API 서비스 레이어
│       ├── axiosInstance.js    # Axios 설정 (토큰, 인터셉터)
│       └── services/           # 도메인별 API 서비스
│           ├── authService.js
│           ├── workspaceService.js  # 🏢 A
│           ├── userService.js       # 🏢 A
│           ├── channelService.js    # 💬 B
│           ├── messageService.js    # 💬 B
│           ├── notificationService.js # 💬 B
│           ├── searchService.js     # 🤖 C
│           └── aiService.js         # 🤖 C
│
├── features/                    # Feature-based 코드
│   ├── workspace/              # 🏢 A: 워크스페이스 actions
│   └── channel/                # 💬 B: 채널 actions
│
├── shared/                      # 공통 유틸리티
│   ├── constants/              # 상수
│   ├── hooks/                  # 커스텀 훅
│   ├── lib/                    # 라이브러리 래퍼
│   ├── server/                 # 서버 유틸
│   └── utils/                  # 유틸 함수
│
├── i18n/                        # 🔥 국제화
│   ├── config.js               # i18n 설정
│   └── messages.js             # 메시지 로더
│
├── styles/                      # 글로벌 스타일
│   ├── globals.css
│   └── themes/
│
└── middleware.js                # Next.js 미들웨어 (locale 감지)

messages/                        # 📂 루트의 번역 파일
├── ko/
├── en/
├── ja/
└── fr/
    ├── common.json
    ├── modals.json
    ├── workspace.json
    ├── workspaceManagement.json
    ├── directory.json
    ├── message.json
    └── userSettings.json
```

---

## 🔥 1. Zustand Store 사용법

### 도메인별 Store 구조

```
core/store/
├── shared/                    # 공통 (모든 개발자)
│   ├── uiStore.js            # UI: 테마, 모달, 자동번역
│   └── index.js
│
├── workspace/                 # 🏢 A: Workspace
│   ├── workspaceStore.js
│   ├── settingsStore.js
│   └── index.js
│
├── chat/                      # 💬 B: Chat
│   ├── chatStore.js
│   ├── notificationStore.js
│   └── index.js
│
├── ai/                        # 🤖 C: AI
│   ├── aiStore.js
│   ├── searchStore.js
│   └── index.js
│
├── authStore.js              # 공통: 인증
└── dataStore.js              # 공통: 캐시
```

### Import 방법

```javascript
// 개발자 A (Workspace)
import { useWorkspaceStore, useWorkspaceSettingsStore } from '@/core/store/workspace';
import { useAuthStore } from '@/core/store/authStore';

// 개발자 B (Chat)
import { useChatStore, useNotificationStore } from '@/core/store/chat';
import { useUIStore } from '@/core/store/shared'; // Modal용

// 개발자 C (AI)
import { useAIStore, useSearchStore } from '@/core/store/ai';
import { useUIStore } from '@/core/store/shared'; // autoTranslate용
```

### 사용 예시

```javascript
function MyComponent() {
  // 값 가져오기
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const unreadCounts = useChatStore((state) => state.unreadCounts);

  // 액션 가져오기
  const setCurrentWorkspace = useWorkspaceStore((state) => state.setCurrentWorkspace);
  const openThread = useChatStore((state) => state.openThread);

  // 사용
  const handleClick = () => {
    setCurrentWorkspace({ id: '123', name: 'My Workspace' });
  };
}
```

### ⚠️ 중요 규칙

1. **각 개발자는 자신의 Store만 수정**
   - A: `workspace/` 만 수정
   - B: `chat/` 만 수정
   - C: `ai/` 만 수정

2. **공통 Store는 토론 후 수정**
   - `shared/uiStore.js` 수정 시 팀 논의 필요

3. **Store 파일명은 `~Store.js`로 통일**
   - Good: `workspaceStore.js`, `chatStore.js`
   - Bad: `workspace.js`, `chat.js`

---

## 🔥 2. Axios 사용법

### axiosInstance 설정

```javascript
// src/core/api/axiosInstance.js
// - 자동 토큰 추가
// - 401 시 자동 refresh
// - baseURL 없음 (절대 경로 사용: /mock/..., /api/...)
```

### API Service 패턴

```javascript
// src/core/api/services/workspaceService.js
import axiosInstance from '../axiosInstance';

export const workspaceService = {
  async getWorkspaces() {
    const response = await axiosInstance.get('/mock/workspaces');
    return response.data;
  },

  async createWorkspace(data) {
    const response = await axiosInstance.post('/mock/workspaces', data);
    return response.data;
  },
};
```

### 컴포넌트에서 사용

```javascript
import { workspaceService } from '@/core/api/services';

async function fetchData() {
  try {
    const workspaces = await workspaceService.getWorkspaces();
    console.log(workspaces);
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

### ⚠️ 중요 규칙

1. **직접 axios 사용 금지**
   ```javascript
   // ❌ Bad
   import axios from 'axios';
   axios.get('/api/workspaces');

   // ✅ Good
   import axiosInstance from '@/core/api/axiosInstance';
   axiosInstance.get('/mock/workspaces');
   ```

2. **반드시 Service 레이어 사용**
   ```javascript
   // ❌ Bad - 컴포넌트에서 직접 호출
   axiosInstance.get('/mock/workspaces');

   // ✅ Good - Service를 통해 호출
   workspaceService.getWorkspaces();
   ```

3. **각 개발자는 자신의 Service만 수정**
   - A: `workspaceService.js`, `userService.js`
   - B: `channelService.js`, `messageService.js`, `notificationService.js`
   - C: `searchService.js`, `aiService.js`

---

## 🔥 3. CSS Modules 사용법

### 규칙

- **모든 컴포넌트는 CSS Modules 사용** (`.module.css`)
- 일반 `.css` 파일은 글로벌 스타일용만 사용

### 구조

```
components/
├── MyComponent.jsx
└── MyComponent.module.css
```

### 사용 예시

```jsx
// MyComponent.jsx
import styles from './MyComponent.module.css';

export function MyComponent() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello</h1>
      <button className={styles.button}>Click</button>
    </div>
  );
}
```

```css
/* MyComponent.module.css */
.container {
  padding: 20px;
}

.title {
  font-size: 24px;
  color: var(--text-primary);
}

.button {
  background: var(--primary);
  padding: 10px 20px;
}
```

### 조건부 클래스

```jsx
<div className={`${styles.button} ${isActive ? styles.active : ''}`}>
```

또는 템플릿 리터럴:

```jsx
<div className={`${styles.button} ${isActive ? styles.active : ''}`}>
```

### ⚠️ 중요 규칙

1. **컴포넌트당 1개의 CSS Module**
2. **클래스명은 camelCase** (`.myButton` not `.my-button`)
3. **중복 방지를 위해 항상 Module 사용**

---

## 🔥 4. next-intl 사용법

### 메시지 파일 구조

```
messages/
├── ko/
├── en/
├── ja/
└── fr/
    ├── common.json              # 공통 텍스트
    ├── modals.json              # 모달 텍스트
    ├── workspace.json           # 워크스페이스 텍스트
    ├── workspaceManagement.json # 워크스페이스 관리 텍스트
    ├── directory.json           # 디렉토리 텍스트
    ├── message.json             # 메시지 텍스트
    └── userSettings.json        # 사용자 설정 텍스트
```

### 컴포넌트에서 사용

```jsx
'use client';

import { useMessages } from 'next-intl';

export function MyComponent() {
  const messages = useMessages();
  const t = messages?.modals?.profileSettings ?? {};

  return (
    <div>
      <h1>{t.title ?? '프로필 설정'}</h1>
      <button>{t.save ?? '저장'}</button>
    </div>
  );
}
```

### ⚠️ 필수 패턴

```javascript
// ✅ 올바른 패턴
const messages = useMessages();
const t = messages?.modals?.profileSettings ?? {};
<button>{t.save ?? '저장'}</button>

// ❌ 잘못된 패턴 (fallback 없음)
<button>{t.save}</button>

// ❌ 잘못된 패턴 (하드코딩)
<button>저장</button>
```

### 번역 추가하기

1. 모든 4개 언어에 **동시에** 추가
2. 영어를 먼저 작성하고, 다른 언어는 번역

```json
// ko/modals.json
{
  "profileSettings": {
    "title": "프로필 설정",
    "save": "저장"
  }
}

// en/modals.json
{
  "profileSettings": {
    "title": "Profile Settings",
    "save": "Save"
  }
}
```

### ⚠️ 중요 규칙

1. **모든 사용자 대면 텍스트는 번역 필수**
2. **Fallback은 영어로 작성** (한국어 X)
3. **console.log, 개발자용 메시지는 번역 불필요**

---

## 👤 개발자별 작업 영역

### 🏢 개발자 A: Workspace

**담당 범위**:
- 워크스페이스 CRUD
- 멤버 관리 (초대, 권한)
- 디렉토리
- 워크스페이스 설정

**작업 파일**:
```
📂 Components:
  components/workspace/
  components/user/
  components/settings/workspace/

📂 Pages:
  app/[locale]/(app)/workspace/[workspaceId]/
    ├── dashboard/
    ├── directory/
    └── setting/

📂 Stores:
  core/store/workspace/
    ├── workspaceStore.js
    └── settingsStore.js

📂 Services:
  core/api/services/
    ├── workspaceService.js
    └── userService.js

📂 i18n:
  messages/*/
    ├── workspace.json
    ├── workspaceManagement.json
    └── directory.json
```

**충돌 가능성**: 낮음 (독립적)

---

### 💬 개발자 B: Chat

**담당 범위**:
- 실시간 메시징 (WebSocket)
- 채널/스레드/DM
- 메시지 반응, 핀
- 알림, 읽지 않음 카운트

**작업 파일**:
```
📂 Components:
  components/channel/
  components/notification/
  components/layout/LeftSidebar/ (채널 리스트)

📂 Pages:
  app/[locale]/(app)/workspace/[workspaceId]/
    └── channel/[channelId]/

📂 Stores:
  core/store/chat/
    ├── chatStore.js
    └── notificationStore.js

📂 Services:
  core/api/services/
    ├── channelService.js
    ├── messageService.js
    └── notificationService.js

📂 i18n:
  messages/*/
    ├── message.json
    └── modals.json (채널 관련)
```

**충돌 가능성**: 중간 (번역 기능 AI와 협업 필요)

---

### 🤖 개발자 C: AI

**담당 범위**:
- AI 검색 (시맨틱 검색)
- AI 어시스턴트 챗봇
- 자동 번역
- AI 학습 데이터 관리

**작업 파일**:
```
📂 Components:
  components/search/
  components/settings/ai/
  components/modals/AIAssistantModal.jsx
  components/channel/components/AIAssistant/

📂 Pages:
  app/[locale]/(app)/workspace/[workspaceId]/
    ├── search/
    └── setting/ai-assistant/

📂 Stores:
  core/store/ai/
    ├── aiStore.js
    └── searchStore.js

📂 Services:
  core/api/services/
    ├── searchService.js
    └── aiService.js

📂 i18n:
  messages/*/
    └── workspaceManagement.json (ai 섹션)
```

**충돌 가능성**: 중간 (번역 UI는 Chat 담당)

---

## ⚠️ 충돌 방지 가이드

### 1. Store 충돌 방지

```javascript
// ❌ Bad - 다른 개발자의 Store 수정
// 개발자 A가 chatStore.js 수정 (X)

// ✅ Good - 자신의 Store만 수정
// 개발자 A는 workspaceStore.js만 수정
```

### 2. 공통 컴포넌트 수정 시

`components/layout/`, `components/modals/`, `components/common/` 수정 시:
1. **팀에 먼저 알리기**
2. **변경 사항 문서화**
3. **다른 개발자 테스트 후 머지**

### 3. API Service 충돌 방지

```javascript
// ❌ Bad - 다른 도메인 Service 수정
// 개발자 B가 workspaceService.js 수정 (X)

// ✅ Good - 자신의 Service만 수정
// 개발자 B는 channelService.js, messageService.js만 수정
```

### 4. Git Workflow

```bash
# 각 개발자는 자신의 브랜치 사용
git checkout -b feature/workspace-settings  # A
git checkout -b feature/chat-threads        # B
git checkout -b feature/ai-search           # C

# 작업 후 PR
# Code Review 후 main으로 merge
```

---

## 🎓 추가 참고 문서

- [Store Migration Guide](./STORE_MIGRATION_GUIDE.md) - 기존 코드 마이그레이션
- [Component Guidelines](./COMPONENT_GUIDELINES.md) - 컴포넌트 작성 규칙 (작성 예정)
- [API Service Guidelines](./API_GUIDELINES.md) - API 서비스 작성 규칙 (작성 예정)

---

## 📞 문의 및 협업

- Store 구조 관련: [STORE_MIGRATION_GUIDE.md](./STORE_MIGRATION_GUIDE.md) 참고
- 충돌 발생 시: 팀 미팅에서 논의
- 새로운 패턴 제안: Issue/PR로 제안

---

**업데이트**: 2025-11-12
**버전**: 1.0.0
