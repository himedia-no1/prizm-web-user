# 실제 누락 기능 최종 확인

## ✅ 확인 완료 - 이미 구현되어 있음

### 1. SidebarFooter.jsx
- ✅ 워크스페이스 프로필 모달 트리거 (`onOpenProfileModal`)
- ✅ 사용자 설정 버튼 (`Settings` 아이콘)
- ✅ 수신함 버튼 (`Inbox` 아이콘)

### 2. CreateWorkspacePage.jsx
- ✅ 워크스페이스 생성 기능
- ✅ 초대 링크 입력 기능 (join 탭)

### 3. UnreadBadge
- ✅ CategorySection에서 사용 중
- ✅ unreadCounts store 연동

---

## ❌ 실제로 누락된 기능

### 1. DMList.jsx - UnreadBadge 없음
**현재**: DM 리스트만 표시
**필요**: 각 DM에 UnreadBadge 추가

### 2. AppConnectList.jsx - UnreadBadge 없음
**현재**: 앱 리스트만 표시
**필요**: 각 앱에 UnreadBadge 추가

### 3. FavoritesList.jsx - UnreadBadge 확인 필요
**확인 필요**: 즐겨찾기 채널에 UnreadBadge 있는지

### 4. ThreadSidebar - 스레드 댓글 기능 부족
**현재**:
- ✅ 입력창 있음
- ✅ 전송 버튼 있음
- ❌ 이모지 픽커 없음
- ❌ 댓글에 번역하기 없음
- ❌ 댓글에 이모지 반응 없음

**시나리오 요구사항**:
```
[2] 스레드 아래의 댓글 형태 메세지들
  (1)답글달기
  (2)번역하기  ← 없음
  (3)이모지 반응 남기기  ← 없음
[3] 댓글 입력칸
  (1)입력 ✅
  (2)이모지 픽커  ← 없음
  (3)전송버튼 ✅
```

### 5. AIAssistantModal - 파일 인용 기능 확인
**현재**: Paperclip 버튼은 있음
**확인 필요**: 
- 파일 첨부 기능 구현 여부
- 워크스페이스 파일 인용 기능
- 권한 기반 필터링

### 6. GenericModal - MembersModalContent 연결
**확인 필요**:
- 새로 개선한 MembersModalContent가 GenericModal에서 제대로 props 전달받는지
- onInviteGuest prop 연결되는지

---

## 🔍 상세 확인 필요한 파일들

1. `/src/components/layout/LeftSidebar/FavoritesList.jsx`
2. `/src/components/modals/GenericModal.jsx` (members case)
3. `/src/components/modals/AIAssistantModal.jsx` (파일 첨부 구현 여부)

---

## 📝 다음 작업 우선순위

### 긴급 (시나리오 명시)
1. **DMList** - UnreadBadge 추가
2. **AppConnectList** - UnreadBadge 추가
3. **ThreadSidebar** - 이모지 픽커 + 댓글 컨텍스트 메뉴 (번역/이모지 반응)
4. **GenericModal** - MembersModalContent props 연결 확인

### 중간 (기능 완성도)
5. **FavoritesList** - UnreadBadge 확인/추가
6. **AIAssistantModal** - 파일 인용 기능 확인/추가

