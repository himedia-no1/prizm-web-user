멘셔# UI 구조 점검 및 정리 계획

시나리오 기준 날짜: 2025-11-06

---

## 🔍 시나리오 vs 현재 UI 상세 비교

### 1. 워크스페이스 페이지 - 좌측 사이드바

#### 1.1 워크스페이스 선택 섹션

**시나리오 요구사항**:
1. ✅ 현재 워크스페이스 설정 버튼 (owner, manager만)
2. ✅ 멤버 초대하기 버튼 (owner, manager만)
3. ✅ 참여중인 워크스페이스 전체 목록
4. ✅ 새 워크스페이스 생성 버튼

**현재 구현** (`WorkspaceDropdown.jsx`):
- ✅ 설정 버튼 있음
- ✅ 초대 버튼 있음
- ✅ 워크스페이스 목록 있음
- ✅ 새 워크스페이스 생성 버튼 있음

**문제점**: 없음

---

#### 1.2 현재 워크스페이스 섹션

**시나리오 요구사항**:
1. ✅ 대시보드
2. ✅ 검색
3. ✅ 디렉토리
4. ✅ 즐겨찾기 한 채널
5. ✅ 카테고리 (owner, manager만 생성/수정/삭제)
6. ✅ 다이렉트 메세지
7. ✅ 앱 커넥트 (owner, manager만 생성/수정/삭제)

**현재 구현** (`NavigationMenu.jsx`):
```jsx
<button onClick={() => onSelectView('dashboard')}>
  <LayoutDashboard /> {s.dashboard}
</button>
<button onClick={() => onSelectView('search')}>
  <Search /> {s.search}
</button>
<button onClick={() => onSelectView('directory')}>
  <Users /> {s.directory}
</button>
```

**문제점**: 없음

---

#### 1.3 사용자 프로필 섹션

**시나리오 요구사항**:
1. ✅ 워크스페이스 내 프로필 (모든 사용자)
2. ✅ 사용자 설정 버튼 (모든 사용자)
3. ✅ 수신함 (모든 사용자)

**현재 구현** (`SidebarFooter.jsx`):
확인 필요

---

### 2. 채널 헤더 (`ChatHeader.jsx`)

**시나리오 요구사항**:
1. ✅ 푸시 알림 설정 버튼
2. ✅ 채널 내 검색 버튼
3. ✅ 채널 참여자 목록 버튼
4. ✅ 고정된 메세지 버튼
5. ✅ 스레드 목록 버튼
6. ✅ 채널 내 첨부된 파일 목록 버튼
7. ✅ 채널 정보 버튼

**현재 구현**:
```jsx
<button onClick={() => toggleChannelNotifications(channel.id)}>
  <Bell size={20} />
</button>
<button onClick={() => onOpenModal('search')}>
  <Search size={20} />
</button>
<button onClick={() => onOpenModal('members')}>
  <Users size={20} />
</button>
<button onClick={() => onOpenModal('pinned')}>
  <Bookmark size={20} />
</button>
<button onClick={() => onOpenModal('threads')}>
  <MessageSquare size={20} />
</button>
<button onClick={() => onOpenModal('channelFiles')}>
  <Folder size={20} />
</button>
<button onClick={() => onOpenModal('info')}>
  <Info size={20} />
</button>
```

**문제점**: 없음

---

### 3. 채팅 메시지 컨텍스트 메뉴 (`MessageContextMenu.jsx`)

**시나리오 요구사항**:
1. ✅ 복사하기
2. ✅ 이모지 반응 남기기
3. ✅ 답글 달기
4. ✅ 번역하기
5. ✅ 더보기
   - ✅ 고정하기
   - ✅ 스레드 시작
   - ✅ 답글 달기
   - ✅ 전달하기
   - ✅ 수정하기 (내 메시지만)
   - ✅ 삭제하기 (내 메시지만)

**현재 구현**:
- Action Bar (기본 표시):
  - ✅ 이모지 반응 (Smile)
  - ✅ 답글 (CornerDownRight)
  - ✅ 스레드 시작 (MessageSquare)
  - ✅ 번역 (Translate) - 타인 메시지만
  - ✅ 더보기 (MoreVertical)

- Full Menu (더보기 클릭 시):
  - ✅ 고정하기
  - ✅ 스레드 시작
  - ✅ 답글달기
  - ✅ 전달하기
  - ✅ 공유
  - ✅ 수정 (내 메시지)
  - ✅ 삭제 (내 메시지)
  - ✅ 번역하기 (타인 메시지)
  - ✅ AI로 분석 (타인 메시지)
  - ✅ 신고하기 (타인 메시지)

**문제점**:
- ❌ "복사하기" 기능이 없음 → **추가 필요**
- ❌ "공유" 버튼은 시나리오에 없음 → **제거 검토**
- ❌ "AI로 분석" 버튼은 시나리오에 없음 → **제거 검토**
- ❌ "신고하기" 버튼은 시나리오에 없음 → **제거 검토**

---

### 4. 채팅 입력 (`MessageInput.jsx`)

**시나리오 요구사항**:
1. ✅ 파일 첨부 버튼
2. ✅ 채팅 입력칸
3. ❌ 메세지 어시스턴트 버튼 (AI 검수)
4. ✅ 이모지 픽커 버튼
5. ✅ 전송 버튼

**현재 구현**:
```jsx
<FileUploadButton />
<textarea />
<button onClick={() => onOpenModal('mention')}>
  <AtSign size={20} />
</button>
<button onClick={onOpenEmojiPicker}>
  <Smile size={20} />
</button>
<button className="message-input__send-button">
  <Send size={20} />
</button>
```

**문제점**:
- ✅ 파일 첨부 있음
- ✅ 이모지 픽커 있음
- ❌ **메세지 어시스턴트 버튼 (AI 아이콘) 없음 → 추가 필요**
- ❌ @멘션 버튼은 시나리오에 없음 → **제거 검토**

---

### 5. 채널 참여자 목록 모달 (`MembersModalContent.jsx` / `GenericModal.jsx`)

**시나리오 요구사항**:
1. ❌ 게스트 초대 버튼
2. ❌ 채널 참여자 검색
3. ❌ 참여자 유형별 분류 선택
4. ✅ 채널 참여자 조회 목록

**현재 구현** (`MembersModalContent.jsx`):
```jsx
<div className="channel-modal__list">
  {Object.values(users).map((user) => (
    <div key={user.id} className="channel-modal__list-item member">
      <img src={user.avatar} />
      <span>{user.name}</span>
      <span className="dm-button__status"></span>
    </div>
  ))}
</div>
```

**현재 구현** (`GenericModal.jsx` - members case):
```jsx
{canInviteGuests && channelDetails?.type !== 'dm' && (
  <button onClick={() => openModalFromStore('generic', { type: 'inviteGuest' })}>
    게스트 초대
  </button>
)}
```

**문제점**:
- ✅ 게스트 초대 버튼 있음 (GenericModal에만)
- ❌ MembersModalContent.jsx는 너무 단순 → **개선 필요**
- ❌ 참여자 검색창 없음 → **추가 필요**
- ❌ 유형별 분류 없음 → **추가 필요**

---

### 6. 사용자 설정 페이지 (`UserSettingsPage.jsx`)

**시나리오 요구사항**:

**좌측 사이드바**:
1. ✅ 전역 프로필 설정 탭
2. ✅ 로그인된 기기 탭
3. ✅ 환경설정 탭
4. ✅ 로그아웃 버튼

**환경설정 탭**:
1. ✅ 알림 설정
2. ✅ 테마 설정 (라이트/다크)
3. ✅ 언어 설정 (한국어/영어)
4. ❌ 자동 번역 설정

**현재 구현**:
```jsx
{selectedSetting === 'preferences' && (
  <>
    <NotificationPreferences />
    <ThemePreferences />
    <LanguagePreferences />
  </>
)}
```

**문제점**:
- ❌ **자동 번역 설정 컴포넌트 없음 → 추가 필요**

---

### 7. 워크스페이스 프로필 모달 (`WorkspaceProfileModal.jsx`)

**시나리오 요구사항**:
"프로필 영역을 클릭하면, 현재 참여중인 워크스페이스 내의 프로필 설정 모달이 뜸"

**시나리오 내용 (복사 오류)**:
```
[1] 이메일로 초대 (1) 초대할 멤버 이메일 검색창 (2) 선택된 멤버 조회 창 (3) 그룹 설정 (4) 초대 보내기 버튼 
[2] 초대 링크 생성 (1) 그룹 설정 (2) 만료 시간 (3) 사용 제한 (4) 초대 링크 생성 버튼
```

**이 부분은 "멤버 초대하기" 모달 내용이 잘못 복사된 것으로 보임**

**실제 워크스페이스 프로필 모달 내용**:
- ✅ 프로필 사진
- ✅ 표시 이름
- ✅ 상태 메시지

**현재 구현**:
```jsx
<img src={profile.avatar} />
<button>아바타 업로드</button>
<input value={profile.displayName} />
<input value={profile.statusMessage} />
```

**문제점**: 없음 (정상)

---

## 📝 수정 작업 목록

### 🔴 추가해야 할 기능

#### 1. MessageContextMenu - "복사하기" 추가
```jsx
// Action Bar에 추가
const commonActions = [
  {
    key: 'copy',
    icon: <Copy size={18} />,
    handler: () => {
      navigator.clipboard.writeText(message.text);
      onClose();
    }
  },
  // ... 기존 항목들
];
```

#### 2. MessageInput - "메시지 어시스턴트 버튼" 추가
```jsx
<button onClick={onOpenMessageAssistant} className="message-input__ai-button">
  <AIIcon size={20} />
</button>
```

#### 3. MembersModalContent - 개선
```jsx
// 검색창 추가
<input type="text" placeholder="참여자 검색..." />

// 유형별 분류 탭 추가
<div className="member-type-tabs">
  <button>전체</button>
  <button>멤버</button>
  <button>게스트</button>
  <button>관리자</button>
</div>

// 게스트 초대 버튼 추가 (상단에)
<button>게스트 초대</button>
```

#### 4. AutoTranslationPreferences.jsx 생성
```jsx
// /src/components/settings/prefs/AutoTranslationPreferences.jsx
export const AutoTranslationPreferences = () => {
  return (
    <div className="preference-section">
      <h3>자동 번역</h3>
      <label>
        <input type="checkbox" />
        자동 번역 활성화
      </label>
      <select>
        <option>한국어</option>
        <option>영어</option>
        <option>일본어</option>
      </select>
    </div>
  );
};
```

---

### 🟡 제거해야 할 기능 (시나리오에 없음)

#### 1. MessageContextMenu - 제거 대상
- ❌ "공유" 버튼
- ❌ "AI로 분석" 버튼
- ❌ "신고하기" 버튼

**판단**: 
- "공유" → 시나리오에 명시 안 됨, 하지만 유용할 수 있으므로 **보류**
- "AI로 분석" → AI 어시스턴트와 중복, **제거**
- "신고하기" → 시나리오에 없음, 하지만 필수 기능, **보류**

#### 2. MessageInput - 제거 대상
- ❌ @멘션 버튼 (AtSign)

**판단**: 
- 시나리오에 명시 안 됨
- 하지만 채팅 기본 기능이므로 **보류**

---

### 🔵 수정/보완 필요

#### 1. ChatHeader - 접근성 개선
현재 버튼에 aria-label 없음
```jsx
<button aria-label="알림 설정">
  <Bell />
</button>
```

#### 2. SidebarFooter 확인
- 워크스페이스 프로필 모달 트리거 확인
- 사용자 설정 버튼 확인
- 수신함 버튼 확인

---

## 🎯 우선순위별 작업 계획

### Phase 1: 긴급 추가 (1일)

**파일**: `MessageContextMenu.jsx`
- [ ] "복사하기" 기능 추가

**파일**: `MessageInput.jsx`
- [ ] AI 어시스턴트 버튼 추가

**파일**: `AutoTranslationPreferences.jsx`
- [ ] 컴포넌트 생성

**파일**: `UserSettingsPage.jsx`
- [ ] AutoTranslationPreferences 임포트 및 렌더링

---

### Phase 2: 모달 개선 (2일)

**파일**: `MembersModalContent.jsx`
- [ ] 검색창 추가
- [ ] 유형별 분류 탭 추가
- [ ] 게스트 초대 버튼 추가

---

### Phase 3: 불필요 기능 제거 검토 (반나절)

**파일**: `MessageContextMenu.jsx`
- [ ] "AI로 분석" 버튼 제거
- [ ] "공유", "신고하기" 보류 (논의 필요)

**파일**: `MessageInput.jsx`
- [ ] @멘션 버튼 보류 (논의 필요)

---

## 📋 체크리스트

### 워크스페이스 페이지 - 좌측 사이드바
- [x] 워크스페이스 설정 버튼
- [x] 멤버 초대 버튼
- [x] 워크스페이스 목록
- [x] 새 워크스페이스 생성
- [x] 대시보드 버튼
- [x] 검색 버튼
- [x] 디렉토리 버튼
- [x] 즐겨찾기 섹션
- [x] 카테고리 섹션
- [x] DM 섹션
- [x] 앱 커넥트 섹션
- [ ] 사용자 프로필 섹션 확인 필요

### 채널 헤더
- [x] 알림 설정 버튼
- [x] 검색 버튼
- [x] 참여자 목록 버튼
- [x] 고정 메시지 버튼
- [x] 스레드 목록 버튼
- [x] 파일 목록 버튼
- [x] 채널 정보 버튼

### 메시지 기능
- [ ] 복사하기 (추가 필요)
- [x] 이모지 반응
- [x] 답글 달기
- [x] 번역하기
- [x] 고정하기
- [x] 스레드 시작
- [x] 전달하기
- [x] 수정하기
- [x] 삭제하기

### 메시지 입력
- [x] 파일 첨부
- [x] 입력칸
- [ ] AI 어시스턴트 (추가 필요)
- [x] 이모지 픽커
- [x] 전송 버튼

### 사용자 설정
- [x] 전역 프로필 탭
- [x] 로그인된 기기 탭
- [x] 환경설정 탭
- [x] 알림 설정
- [x] 테마 설정
- [x] 언어 설정
- [ ] 자동 번역 설정 (추가 필요)

---

## 🚀 즉시 시작 가능한 작업

1. **MessageContextMenu.jsx** - 복사하기 추가
2. **MessageInput.jsx** - AI 어시스턴트 버튼 추가
3. **AutoTranslationPreferences.jsx** - 컴포넌트 생성
4. **MembersModalContent.jsx** - 검색/분류 추가
5. **SidebarFooter.jsx** - 확인 및 개선

예상 소요: 2-3일
