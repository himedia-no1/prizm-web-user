# 시나리오 기반 완전 리팩토링 계획

생성일: 2025-11-06

---

## 🎯 리팩토링 목표

1. **시나리오 준수**: 시나리오에 있는 기능만 구현, 없는 기능 제거
2. **다국어 지원**: 모든 하드코딩 문자열을 constants/strings로
3. **컴포넌트 분리**: 큰 파일(500+ 라인) 분리
4. **Zustand 상태 관리**: 전역 상태를 Zustand로 통합
5. **Mock 데이터**: test.api로 통일, 추후 백엔드 교체 용이
6. **로딩 스피너**: icon.png 활용한 흔들림 효과

---

## 📋 Phase 1: 누락 기능 추가 (긴급)

### 1.1 UnreadBadge 추가
**파일**: `DMList.jsx`, `AppConnectList.jsx`, `FavoritesList.jsx`

```jsx
// DMList.jsx
import { UnreadBadge } from '@/components/common/UnreadBadge';
const { unreadCounts } = useStore();

// 각 DM에 추가
<div className="channel-button__trail">
  <UnreadBadge count={unreadCounts[dm.id] || 0} />
</div>
```

---

### 1.2 ThreadSidebar 완성
**파일**: `ThreadSidebar/index.jsx`

**추가 필요**:
1. 이모지 픽커 버튼 (입력창에)
2. 댓글 컨텍스트 메뉴 (번역하기, 이모지 반응)

```jsx
// 댓글 입력창
<div className="thread-reply-input__buttons">
  <button onClick={onOpenEmojiPicker}>
    <Smile size={18} />
  </button>
  <button className="thread-reply-input__send-button">
    <Send size={18} />
  </button>
</div>

// 각 댓글에 컨텍스트 메뉴
<MessageContextMenu 
  message={reply}
  isMyMessage={reply.userId === currentUserId}
  // ... props
/>
```

---

### 1.3 GenericModal - MembersModalContent 연결
**파일**: `GenericModal.jsx`

```jsx
case 'members': {
  // ... 기존 코드
  return (
    <MembersModalContent 
      onInviteGuest={() => {
        openModalFromStore('generic', {
          type: 'inviteGuest',
          workspaceId,
          channelId: modalProps.channelId,
        });
      }}
    />
  );
}
```

---

### 1.4 워크스페이스 프로필 섹션 확인
**시나리오 재확인**: 
```
3.사용자 프로필 섹션
1) 워크스페이스 내 프로필 : 모든 사용자
- 프로필 영역을 클릭하면, 현재 참여중인 워크스페이스 내의 프로필 설정 모달이 뜸
[1] 이메일로 초대 ← 이건 잘못 복사된 내용
[2] 초대 링크 생성 ← 이것도 잘못 복사
```

**실제 내용**: 워크스페이스 프로필 모달 (이미 구현됨)
- ✅ SidebarFooter.jsx의 onOpenProfileModal
- ✅ WorkspaceProfileModal.jsx

---

## 📋 Phase 2: 다국어 지원 완성

### 2.1 하드코딩 문자열 추출

#### MessageContextMenu.jsx
```javascript
// 현재
{ text: '고정하기' }
{ text: '스레드 시작' }
{ text: '답글달기' }
{ text: '전달하기' }
{ text: '수정' }
{ text: '삭제' }
{ text: '번역하기' }

// 변경 후
{ text: s.message.pin }
{ text: s.message.startThread }
{ text: s.message.reply }
{ text: s.message.forward }
{ text: s.message.edit }
{ text: s.message.delete }
{ text: s.message.translate }
```

**파일 생성**: `/src/constants/strings/domains/message.js`
```javascript
export const message = {
  ko: {
    copy: '복사하기',
    pin: '고정하기',
    startThread: '스레드 시작',
    reply: '답글달기',
    forward: '전달하기',
    edit: '수정',
    delete: '삭제',
    translate: '번역하기',
  },
  en: {
    copy: 'Copy',
    pin: 'Pin',
    startThread: 'Start thread',
    reply: 'Reply',
    forward: 'Forward',
    edit: 'Edit',
    delete: 'Delete',
    translate: 'Translate',
  }
};
```

#### 기타 하드코딩 파일들
1. `AutoTranslationPreferences.jsx` - 이미 fallback 처리됨 (보완만 필요)
2. `MembersModalContent.jsx` - 전체, 멤버, 게스트, 관리자, 검색어 등
3. `SearchView.jsx` - 결과 메시지들
4. `GenericModal.jsx` - 모달별 안내 메시지
5. `ThreadSidebar.jsx` - "Thread", "Replies to", "Reply to thread..."

---

## 📋 Phase 3: 컴포넌트 분리

### 3.1 WorkspaceSettingsPage.jsx (775라인)

**분리 계획**:
```
/src/components/settings/workspace/
  ├── WorkspaceSettingsPage.jsx (메인 컨테이너, ~150라인)
  └── tabs/
      ├── InsightsTab.jsx (~100라인)
      ├── MembersTab.jsx (~150라인)
      ├── InviteManagementTab.jsx (~100라인)
      ├── GroupsTab.jsx (~100라인)
      ├── IntegrationsTab.jsx (~50라인)
      ├── SecurityTab.jsx (~50라인)
      ├── AuditLogTab.jsx (~80라인)
      └── AIManagementTab.jsx (이미 분리됨)
```

---

### 3.2 UserSettingsPage.jsx (338라인)

**분리 계획**:
```
/src/components/settings/user/
  ├── UserSettingsPage.jsx (메인 컨테이너, ~100라인)
  └── tabs/
      ├── ProfileTab.jsx (~100라인)
      ├── DevicesTab.jsx (~80라인)
      └── PreferencesTab.jsx (이미 prefs로 분리됨)
```

---

## 📋 Phase 4: Zustand 상태 관리 통합

### 4.1 현재 Store 구조 확인
- `authStore.js` - 인증 관련
- `dataStore.js` - Mock 데이터
- `useStore.js` - 전역 상태

### 4.2 추가 필요한 상태

#### autoTranslationStore.js
```javascript
export const useAutoTranslationStore = create((set, get) => ({
  enabled: false,
  targetLanguage: 'ko',
  setEnabled: (enabled) => set({ enabled }),
  setTargetLanguage: (lang) => set({ targetLanguage: lang }),
}));
```

#### unreadCountsStore.js (이미 useStore에 있음)
```javascript
// useStore.js에 이미 존재
unreadCounts: {},
// 확인 및 보완만 필요
```

---

## 📋 Phase 5: test.api 통합

### 5.1 현재 상태
- `/src/api/test.api.js` 존재
- 일부 컴포넌트는 직접 Mock 데이터 사용

### 5.2 통합 작업
모든 Mock 데이터를 test.api로 이동

**예시**:
```javascript
// WorkspaceSettingsPage.jsx
// 현재
const mockGroups = [...];
const mockInvitations = [...];

// 변경 후
import testApi from '@/api/test.api';
const groups = await testApi.getGroups(workspaceId);
const invitations = await testApi.getInvitations(workspaceId);
```

---

## 📋 Phase 6: 로딩 스피너 개선

### 6.1 기존 스피너 변경
**파일**: `/src/components/common/Spinner/index.jsx`

**현재**: globals.css에 spinner 정의됨
```css
.spinner {
  width: 4rem;
  height: 4rem;
  background: url('/icon.png') center/contain no-repeat;
  animation: ai-shake 0.82s cubic-bezier(.36,.07,.19,.97) both infinite;
}

@keyframes ai-shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
```

**확인**: 이미 구현되어 있음!

---

## 🗂️ 작업 우선순위 및 예상 소요시간

### Week 1: 누락 기능 추가
- [ ] Day 1: UnreadBadge 추가 (DMList, AppConnectList, FavoritesList)
- [ ] Day 2-3: ThreadSidebar 완성 (이모지 픽커, 댓글 컨텍스트 메뉴)
- [ ] Day 4: GenericModal 연결 확인 및 수정
- [ ] Day 5: 테스트 및 버그 수정

### Week 2: 다국어 지원
- [ ] Day 1-2: constants/strings 구조 설계 및 message.js 생성
- [ ] Day 3-4: 모든 하드코딩 문자열 추출 및 상수화
- [ ] Day 5: 영어 번역 추가

### Week 3: 컴포넌트 분리
- [ ] Day 1-3: WorkspaceSettingsPage 탭 분리
- [ ] Day 2-4: UserSettingsPage 탭 분리
- [ ] Day 5: 분리된 컴포넌트 테스트

### Week 4: Zustand 통합 및 test.api
- [ ] Day 1-2: autoTranslationStore 추가 및 기존 store 정리
- [ ] Day 3-4: Mock 데이터를 test.api로 이동
- [ ] Day 5: 최종 테스트 및 문서화

**총 예상 소요**: 4주

---

## 📝 체크리스트

### 시나리오 준수
- [x] 워크스페이스 선택 섹션 ✅
- [x] 현재 워크스페이스 섹션 ✅
- [x] 사용자 프로필 섹션 ✅
- [x] 대시보드 ✅
- [x] 검색 ✅
- [x] 디렉토리 ✅
- [x] 채널 헤더 ✅
- [x] 채팅 메시지 (복사 추가 완료) ✅
- [x] 채팅 입력 (AI 어시스턴트 추가 완료) ✅
- [ ] 다이렉트 메시지 UnreadBadge
- [ ] 앱 커넥트 UnreadBadge
- [ ] 스레드 상세 (이모지 픽커, 댓글 기능)
- [x] AI 어시스턴트 기본 구조 ✅
- [x] 워크스페이스 설정 8개 탭 ✅
- [x] 사용자 설정 (자동 번역 추가 완료) ✅
- [x] 워크스페이스 생성 ✅

### 다국어 지원
- [ ] MessageContextMenu 상수화
- [ ] MembersModalContent 상수화
- [ ] ThreadSidebar 상수화
- [ ] SearchView 상수화
- [ ] 기타 모든 하드코딩 문자열
- [ ] 영어 번역 추가

### 컴포넌트 분리
- [ ] WorkspaceSettingsPage 탭 분리
- [ ] UserSettingsPage 탭 분리

### Zustand 상태 관리
- [ ] autoTranslationStore 추가
- [ ] unreadCounts 검증 및 보완
- [ ] 기타 전역 상태 통합

### test.api 통합
- [ ] 모든 Mock 데이터 test.api로 이동
- [ ] API 함수 일관성 유지

### 기타
- [x] 로딩 스피너 (이미 구현됨) ✅
- [ ] 최종 테스트
- [ ] 문서화

---

## 🚀 즉시 시작 가능한 작업

1. **DMList.jsx** - UnreadBadge 추가 (30분)
2. **AppConnectList.jsx** - UnreadBadge 추가 (30분)
3. **FavoritesList.jsx** - UnreadBadge 추가 (30분)
4. **ThreadSidebar/index.jsx** - 이모지 픽커 버튼 추가 (1시간)
5. **GenericModal.jsx** - MembersModalContent props 연결 (30분)

**첫날 예상 완료**: 3.5시간

---

## 📌 주의사항

1. **시나리오에 없는 기능은 제거하지 않음**
   - 예: @멘션 자동 감지, 공유/신고 버튼 등은 유용하므로 보류

2. **Mock 데이터는 test.api로만**
   - 컴포넌트 내 하드코딩 금지
   - 추후 백엔드 교체 용이

3. **Zustand 사용 권장 사항**
   - 전역 상태만 Zustand
   - 컴포넌트 로컬 상태는 useState

4. **CSS는 globals.css 참고**
   - 일관된 스타일 유지
   - CSS 변수 활용

