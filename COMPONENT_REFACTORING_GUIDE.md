# Component Refactoring Guide - 컴포넌트 분리 권장사항

## 📊 분석 결과

### 🔴 즉시 분리 필요 (150줄 이상)

#### 1. **DirectoryView.jsx** (264줄) 🏢 Workspace - **우선순위: 높음**

**현재 구조**:
```jsx
<DirectoryView>
  - 검색 로직 (useState, useMemo)
  - 정렬 로직 (sortComparators)
  - 페이지네이션 로직
  - 필터 UI
  - 사용자 목록 테이블
  - 페이지네이션 UI
</DirectoryView>
```

**분리 제안**:
```jsx
// components/user/components/DirectoryView/
<DirectoryView>                          # 60줄 - 메인 컨테이너
  <DirectorySearchBar />                 # 40줄 - 검색 + 필터
  <DirectoryUserTable                    # 80줄 - 테이블
    users={paginatedUsers}
    onOpenUser={handleOpenUser}
  />
  <DirectoryPagination />                # 40줄 - 페이지네이션
</DirectoryView>

// hooks/useDirectoryFilters.js          # 30줄 - 검색/정렬 로직
// utils/directorySort.js                # 20줄 - 정렬 함수들
```

**혜택**:
- ✅ 테이블과 페이지네이션을 재사용 가능
- ✅ 검색 로직 테스트 용이
- ✅ 각 부분을 독립적으로 수정 가능

---

#### 2. **InviteFlow/index.jsx** (241줄) 🏢 Workspace - **우선순위: 높음**

**현재 구조**:
```jsx
<InviteFlow>
  - 탭 전환 로직 (이메일 / 링크)
  - DirectInviteTab (이메일 초대 폼)
  - LinkInviteTab (링크 생성 폼)
  - InviteResultContent (결과 표시)
  - InviteHistory (링크 히스토리)
</InviteFlow>
```

**분리 제안**:
```jsx
// 이미 하위 컴포넌트가 존재하므로 메인 파일만 정리
<InviteFlow>                             # 80줄 - 탭 전환 로직만
  {activeTab === 'email' && (
    <DirectInviteTab />                  # 별도 파일 (이미 존재)
  )}
  {activeTab === 'link' && (
    <LinkInviteTab />                    # 별도 파일 (이미 존재)
  )}
  {showResult && (
    <InviteResultContent />              # 별도 파일 (이미 존재)
  )}
</InviteFlow>

// 추가 분리 가능:
<InviteTabs                              # 30줄 - 탭 헤더
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

**혜택**:
- ✅ 메인 파일이 단순해짐 (탭 전환 로직만)
- ✅ 각 탭을 독립적으로 개발/테스트

---

#### 3. **InboxModal.jsx** (206줄) 💬 Chat - **우선순위: 높음**

**현재 구조**:
```jsx
<InboxModal>
  - 탭 로직 (all / important / byWorkspace)
  - 필터 로직 (읽지않음만)
  - 선택 로직 (checkbox)
  - 액션 버튼들 (읽음처리, 삭제, 모두읽음)
  - 알림 목록
</InboxModal>
```

**분리 제안**:
```jsx
// components/notification/components/InboxModal/
<InboxModal>                             # 50줄 - 모달 래퍼
  <InboxHeader                           # 40줄 - 헤더 + 닫기
    onClose={onClose}
  />
  <InboxTabs                             # 30줄 - 탭 UI
    activeTab={activeTab}
    onChange={setActiveTab}
  />
  <InboxToolbar                          # 40줄 - 필터 + 액션 버튼
    showUnreadOnly={showUnreadOnly}
    selectedCount={selectedIds.length}
    onToggleUnread={setShowUnreadOnly}
    onMarkAsRead={handleMarkAsRead}
    onDelete={handleDelete}
    onMarkAllRead={handleMarkAllRead}
  />
  <InboxList                             # 60줄 - 알림 목록
    notifications={filteredNotifications}
    selectedIds={selectedIds}
    onToggleSelection={toggleSelection}
  />
</InboxModal>

// hooks/useInboxNotifications.js        # 30줄 - API 로직
```

**혜택**:
- ✅ Toolbar를 다른 곳에서 재사용 가능
- ✅ List를 독립적으로 최적화 가능
- ✅ 각 부분을 분업하기 좋음

---

#### 4. **MessageContextMenu.jsx** (189줄) 💬 Chat - **우선순위: 중간**

**현재 구조**:
```jsx
<MessageContextMenu>
  - 액션 배열 정의 (threadActions, mainActions)
  - 권한 체크 로직
  - 메뉴 아이템 렌더링
  - Quick actions (상단 아이콘들)
  - Full menu (더보기)
</MessageContextMenu>
```

**분리 제안**:
```jsx
// components/channel/components/MessageContextMenu/
<MessageContextMenu>                     # 50줄 - 메인 래퍼
  <QuickActions                          # 40줄 - 상단 아이콘
    actions={quickActions}
    onAction={handleAction}
  />
  {showFullMenu && (
    <FullActionMenu                      # 60줄 - 전체 메뉴
      actions={allActions}
      onAction={handleAction}
    />
  )}
</MessageContextMenu>

// constants/messageActions.js           # 40줄 - 액션 정의
// utils/messagePermissions.js           # 20줄 - 권한 체크
```

**혜택**:
- ✅ 액션 정의를 한 곳에서 관리
- ✅ QuickActions를 다른 곳에서도 사용 가능
- ✅ 권한 로직 재사용

---

#### 5. **Message.jsx** (186줄) 💬 Chat - **우선순위: 높음** (이미 언급됨)

**현재 구조**:
```jsx
<Message>
  - 번역 로직 (40줄)
  - 메시지 본문
  - 반응 UI
  - 스레드 정보
  - 첨부파일
</Message>
```

**분리 제안**:
```jsx
<Message>                                # 60줄 - 메인
  <MessageContent                        # 30줄 - 텍스트/링크
    text={message.text}
  />
  <MessageTranslation                    # 50줄 - 번역 UI + 로직
    message={message}
    locale={locale}
    autoTranslateEnabled={autoTranslateEnabled}
  />
  <MessageReactions                      # 30줄 - 반응 표시
    reactions={message.reactions}
  />
  <MessageThreadInfo                     # 20줄 - 스레드 정보
    replyCount={replyCount}
    onStartThread={onStartThread}
  />
  <MessageAttachments                    # 30줄 - 첨부파일
    files={message.files}
  />
</Message>
```

**혜택**:
- ✅ 번역 컴포넌트를 AI 담당자가 관리
- ✅ 각 기능을 독립적으로 테스트
- ✅ 성능 최적화 용이 (React.memo)

---

### 🟡 분리 권장 (120-149줄)

#### 6. **MembersTab.jsx** (143줄) 🏢 Workspace

**분리 제안**:
```jsx
<MembersTab>                             # 40줄
  <BlockedMembersSection                 # 50줄
    members={blockedMembers}
  />
  <ParticipantsSection                   # 50줄
    members={participants}
  />
  <MembershipHistorySection              # 40줄
    history={membershipHistory}
  />
</MembersTab>
```

---

#### 7. **SearchView.jsx** (141줄) 🤖 AI

**분리 제안**:
```jsx
<SearchView>                             # 40줄
  <SearchHeader />                       # 30줄 - 제목 + 메타
  <SearchFilters />                      # 30줄 - 필터 탭
  <SearchResults />                      # 50줄 - 결과 목록
</SearchView>
```

---

#### 8. **CreateWorkspacePage.jsx** (136줄) 🏢 Workspace

**분리 제안**:
```jsx
<CreateWorkspacePage>                    # 40줄
  <WorkspaceForm                         # 60줄
    onSubmit={handleCreate}
  />
  <WorkspacePreview                      # 40줄
    name={formData.name}
    description={formData.description}
  />
</CreateWorkspacePage>
```

---

## 🎯 반복 패턴 추출 가능

### 1. **버튼 컴포넌트** (16곳에서 사용)

**현재**:
```jsx
<button className="profile-modal__save-button">저장</button>
<button className={`profile-modal__save-button ${styles.actionButton}`}>제출</button>
```

**제안**:
```jsx
// components/ui/Button.jsx
<Button variant="primary">저장</Button>
<Button variant="secondary">취소</Button>
<Button variant="danger">삭제</Button>
```

**사용 위치**:
- 모든 모달 (ProfileSettings, WorkspaceProfile, etc.)
- 모든 설정 탭
- 폼 컴포넌트

---

### 2. **Avatar 컴포넌트** (10+곳에서 비슷한 패턴)

**현재**:
```jsx
<Image
  src={user.avatar || getPlaceholderImage(64, user.name[0])}
  alt={user.name}
  width={64}
  height={64}
  className={styles.avatar}
/>
```

**제안**:
```jsx
// components/ui/Avatar.jsx
<Avatar
  user={user}
  size={64}
  showStatus={true}
/>
```

**사용 위치**:
- DirectoryView
- MembersTab
- UserProfile
- MessageList
- LeftSidebar

---

### 3. **Table Row 패턴** (여러 곳에서 반복)

**현재**:
```jsx
<div className="channel-modal__list">
  {items.map((item) => (
    <div key={item.id} className="channel-modal__list-item">
      <Image src={item.avatar} />
      <span>{item.name}</span>
      <button>액션</button>
    </div>
  ))}
</div>
```

**제안**:
```jsx
// components/ui/ListItem.jsx
<ListItem
  avatar={item.avatar}
  title={item.name}
  subtitle={item.email}
  actions={[
    { label: '수정', onClick: handleEdit },
    { label: '삭제', onClick: handleDelete }
  ]}
/>
```

---

### 4. **Empty State 패턴**

**현재**:
```jsx
{items.length === 0 && (
  <p className={styles.empty}>목록이 비어있습니다.</p>
)}
```

**제안**:
```jsx
// components/ui/EmptyState.jsx
<EmptyState
  icon={<Icon />}
  title="목록이 비어있습니다"
  description="새 항목을 추가해보세요"
  action={<Button onClick={handleAdd}>추가하기</Button>}
/>
```

---

### 5. **Loading State 패턴**

**현재**:
```jsx
{loading && <div className="spinner" />}
```

**제안**:
```jsx
// components/ui/LoadingSpinner.jsx
<LoadingSpinner size="medium" />
<LoadingOverlay message="로딩 중..." />
```

---

## 📋 우선순위별 작업 계획

### Phase 1: 공통 UI 컴포넌트 생성 (모든 개발자 협업)
```
✅ components/ui/
  ├── Button.jsx               # 우선순위 1
  ├── Avatar.jsx               # 우선순위 1
  ├── EmptyState.jsx           # 우선순위 2
  ├── LoadingSpinner.jsx       # 우선순위 2
  └── ListItem.jsx             # 우선순위 3
```

**예상 시간**: 2-3일
**담당**: 공통 (리뷰 필수)

---

### Phase 2: 큰 컴포넌트 분리 (각 개발자 독립 작업)

#### 🏢 개발자 A (Workspace)
1. **DirectoryView.jsx** (264줄 → 60줄) - 2일
2. **InviteFlow/index.jsx** (241줄 → 80줄) - 2일
3. **MembersTab.jsx** (143줄 → 40줄) - 1일
4. **CreateWorkspacePage.jsx** (136줄 → 40줄) - 1일

**예상 시간**: 6일

#### 💬 개발자 B (Chat)
1. **Message.jsx** (186줄 → 60줄) - 3일 ⭐ 최우선
2. **InboxModal.jsx** (206줄 → 50줄) - 2일
3. **MessageContextMenu.jsx** (189줄 → 50줄) - 2일

**예상 시간**: 7일

#### 🤖 개발자 C (AI)
1. **SearchView.jsx** (141줄 → 40줄) - 1일
2. **Message 번역 컴포넌트 연동** - 1일 (B와 협업)

**예상 시간**: 2일

---

## 🎓 컴포넌트 분리 가이드라인

### 언제 분리해야 하나?

✅ **분리해야 할 때**:
1. 파일이 150줄 이상
2. 하나의 컴포넌트에 2개 이상의 책임
3. 같은 UI 패턴이 3곳 이상에서 반복
4. 독립적으로 테스트하고 싶을 때
5. 다른 팀원과 협업이 필요할 때

❌ **분리하지 말아야 할 때**:
1. 한 곳에서만 사용
2. 강하게 결합된 로직
3. Props가 5개 이상 필요
4. 분리해도 각 부분이 30줄 미만

### 분리 패턴

#### 1. **Container/Presentational 패턴**
```jsx
// Container (로직)
function DirectoryViewContainer() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');
  const filtered = useFilteredUsers(users, search, sort);

  return (
    <DirectoryView
      users={filtered}
      onSearch={setSearch}
      onSort={setSort}
    />
  );
}

// Presentational (UI)
function DirectoryView({ users, onSearch, onSort }) {
  return (
    <div>
      <SearchBar onChange={onSearch} />
      <SortDropdown onChange={onSort} />
      <UserList users={users} />
    </div>
  );
}
```

#### 2. **Composition 패턴**
```jsx
// 나쁜 예
<Modal title="제목" content={content} footer={footer} />

// 좋은 예
<Modal>
  <Modal.Header>제목</Modal.Header>
  <Modal.Body>{content}</Modal.Body>
  <Modal.Footer>{footer}</Modal.Footer>
</Modal>
```

#### 3. **Custom Hook 추출**
```jsx
// 로직이 복잡하면 Hook으로 추출
function useDirectoryFilters(users) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');

  const filtered = useMemo(() => {
    // 복잡한 필터링 로직
  }, [users, search, sort]);

  return { filtered, search, setSearch, sort, setSort };
}

// 컴포넌트에서 사용
function DirectoryView({ users }) {
  const { filtered, ...filters } = useDirectoryFilters(users);
  return <UserList users={filtered} {...filters} />;
}
```

---

## 📌 체크리스트

### 분리 전 확인사항
- [ ] 이 컴포넌트가 150줄 이상인가?
- [ ] 2개 이상의 독립적인 기능이 있는가?
- [ ] 팀원과 동시에 작업할 가능성이 있는가?
- [ ] 일부 UI를 다른 곳에서 재사용할 수 있는가?

### 분리 후 확인사항
- [ ] 각 컴포넌트가 명확한 단일 책임을 가지는가?
- [ ] Props가 5개 이하인가?
- [ ] 각 컴포넌트를 독립적으로 테스트할 수 있는가?
- [ ] 네이밍이 명확한가? (Button, not Button2)
- [ ] 파일 구조가 논리적인가?

---

## 💡 추가 권장사항

### 1. **Storybook 도입 고려**
- UI 컴포넌트를 독립적으로 개발
- 디자인 시스템 구축
- 컴포넌트 문서화

### 2. **TypeScript 도입 고려**
- Props 타입 명확화
- 리팩토링 시 안전성 증가

### 3. **ESLint 규칙 추가**
```json
{
  "rules": {
    "max-lines": ["warn", 150],
    "max-lines-per-function": ["warn", 50]
  }
}
```

---

**업데이트**: 2025-11-12
**버전**: 1.0.0
