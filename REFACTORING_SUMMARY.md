# 프론트엔드 리팩토링 완료 보고서

## 개요
- **작업 일자**: 2025-11-18
- **목표**: Mock API 제거 및 실제 백엔드 API 연동
- **상태**: ✅ 완료

---

## 완료된 작업

### 1. Mock 데이터 제거
- ✅ `src/app/mock/**` 디렉토리 전체 삭제
- ✅ `src/shared/server/bffClient.js` 삭제
- ✅ BFF 패턴 전체 제거

### 2. API 서비스 레이어 구축

#### 구현 완료된 서비스
- ✅ **authService.js** - 인증 API
  - `POST /api/auth/refresh`
  - `POST /api/auth/logout`
  - `DELETE /api/auth/withdraw`

- ✅ **userService.js** - 사용자 API
  - `GET /api/users/profile`
  - `PATCH /api/users/profile` (multipart/form-data)
  - `PATCH /api/users/language`
  - `POST /api/users/last-path`
  - `GET /api/users/last-path`

- ✅ **workspaceService.js** - 워크스페이스 API (전체 구현)
  - 워크스페이스 CRUD
  - 멤버 관리 (목록, 프로필, 역할 변경, 추방, 차단)
  - 알림/상태 설정
  - 워크스페이스 나가기

- ✅ **channelService.js** - 카테고리 & 채널 API
  - 카테고리 CRUD, 위치 변경
  - 채널 CRUD, 위치 변경, 알림 설정
  - 채널 사용자 목록

- ✅ **inviteService.js** - 초대 시스템 (신규 생성)
  - 초대 코드 생성/조회/삭제
  - 초대 정보 조회 (공개)
  - 워크스페이스 참여

- ✅ **groupService.js** - 그룹 관리 (신규 생성)
  - 그룹 CRUD
  - 그룹 상세 조회 (사용자, 채널 권한)

- ✅ **notificationService.js** - 알림 API
  - `GET /api/notifications`

#### 빈 껍데기로 변경 (TODO 표시)
- ⏳ **messageService.js** - WebSocket 구현 대기
- ⏳ **searchService.js** - 검색 API 구현 대기
- ⏳ **aiService.js** - AI API 구현 대기

### 3. Axios 인프라 구축

#### CSR용 Axios (`axiosInstance.js`)
```javascript
- withCredentials: true (BACKEND_URL 환경변수 있을 때)
- Request Interceptor: Authorization 헤더 자동 추가
- Response Interceptor:
  - 401 발생 시 자동 refresh
  - Refresh 실패 시 /login 리다이렉트
```

#### SSR용 Axios (`axiosServer.js` - 신규 생성)
```javascript
- Cookie 헤더 자동 추가 (refresh_token)
- Authorization 헤더 자동 추가 (메모리의 accessToken)
- 401 발생 시 자동 refresh 후 재시도
```

### 4. 인증 상태 관리

#### authStore.js (간소화)
```javascript
- accessToken만 저장 (refreshToken은 HttpOnly 쿠키)
- setAccessToken(), clearAccessToken(), logout() 메서드
```

#### authClient.js
```javascript
- refreshSession(): POST /api/auth/refresh 호출
- Zustand에 accessToken 저장
```

### 5. Server Actions 리팩토링

#### features/workspace/actions.js
- ✅ `hasRefreshToken()` - 쿠키 확인
- ✅ `validateAndGetWorkspace()` - 워크스페이스 검증
- ✅ `fetchAccessibleWorkspaces()` - 워크스페이스 목록
- ✅ `fetchLastVisitedPath()` - 마지막 경로 조회
- ✅ 인터셉터 없이 직접 refresh 호출

#### features/channel/actions.js
- ✅ `validateAndGetChannel()` - 채널 검증
- ✅ 403/404 시 대시보드로 리다이렉트

#### components/auth/actions.js
- ✅ OAuth2는 클라이언트에서 처리 (서버 액션 불필요)

### 6. 페이지 수정

#### /login
```javascript
- fetchLastVisitedPath() 호출
- 성공 시 해당 경로로 리다이렉트
- 실패 시 로그인 페이지 렌더링
- 인터셉터 사용 X (무한 리다이렉트 방지)
```

#### /invite/[inviteCode]
```javascript
- GET /api/invites/{code} 호출
- 실패 시 랜딩(/) 리다이렉트
- refresh로 로그인 상태 확인
- 로그인: 참여 버튼 렌더링
- 비로그인: OAuth2 버튼 렌더링
- 인터셉터 사용 X
```

#### 기타 페이지 (5개)
- ✅ `/workspace/new` - fetchAccessibleWorkspaces() 사용
- ✅ `/workspace/[workspaceId]/dashboard` - 통계 API 대기
- ✅ `/workspace/[workspaceId]/channel/[channelId]` - 메시지 API 대기
- ✅ `/workspace/[workspaceId]/directory` - 워크스페이스 사용자 목록
- ✅ `/workspace/[workspaceId]/join` - 워크스페이스 정보 조회

### 7. 유틸리티 추가

#### imageUtils.js (신규 생성)
```javascript
- urlToFile(): 이미지 URL을 File 객체로 변환
- appendImageToFormData(): FormData에 이미지 추가
  (이미지 미변경 시 기존 URL을 File로 변환하여 전송)
```

### 8. 환경 변수 설정

#### .env
```bash
# SSR용 (서버 측에서만 접근 가능)
BACKEND_URL=http://localhost:8080

# CSR용 (클라이언트 측에서 접근 가능, withCredentials 활성화)
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

### 9. 상수 정리

#### cookies.js
```javascript
- mockUserId, mockUserRole 제거
- refreshToken만 유지
```

---

## 제외된 기능 (향후 구현)

### 메시지 관련
- ❌ WebSocket (`/chat.send`)
- ❌ 메시지 CRUD
- ❌ 메시지 번역 (`/api/translate`)
- ❌ 메시지 파일 업로드/다운로드

### 검색
- ❌ `/workspace/[workspaceId]/search` (메시지/파일 검색)

### AI
- ❌ AI 학습 데이터 관리
- ❌ AI 로그 조회

---

## API 명세서 매핑 현황

### 구현 완료 (✅)
1. **인증 API** - 3/3 (100%)
2. **사용자 API** - 5/5 (100%)
3. **알림 API** - 1/1 (100%)
4. **워크스페이스 API** - 13/13 (100%)
5. **초대 API** - 5/5 (100%)
6. **카테고리 API** - 4/4 (100%)
7. **채널 API** - 9/9 (100%)
8. **그룹 API** - 5/5 (100%)

### 구현 대기 (⏳)
- 메시지 & 번역 API
- 검색 API
- AI API
- 파일 업로드/다운로드 API

---

## 기술 스택

### 프론트엔드
- **Framework**: Next.js 16.0.1 (App Router)
- **React**: 19.2.0
- **상태 관리**: Zustand 5.0.8
- **HTTP 클라이언트**: Axios 1.13.1
- **다국어**: next-intl 4.5.0

### 인증
- **방식**: OAuth2 (Google, GitHub)
- **Access Token**: Zustand (CSR), 메모리 (SSR)
- **Refresh Token**: HttpOnly 쿠키
- **자동 갱신**: Axios 인터셉터 (401 발생 시)

---

## 빌드 상태

```bash
✓ Compiled successfully in 2.4s
✓ Generating static pages (38/38)
✓ Build completed successfully
```

---

## 다음 단계

### 1. 백엔드 연동 테스트
- 백엔드 서버 실행: `http://localhost:8080`
- 환경 변수 확인: `.env` 파일
- OAuth2 로그인 테스트
- Refresh Token 자동 갱신 테스트

### 2. 이미지 업로드 테스트
- 사용자 프로필 이미지
- 워크스페이스 이미지
- 워크스페이스 사용자 프로필 이미지

### 3. 403/404 에러 핸들링 테스트
- 워크스페이스 접근 권한 없음
- 채널 접근 권한 없음
- 자동 리다이렉트 동작

### 4. 향후 구현
- WebSocket 연결 (메시지)
- 메시지 CRUD
- 검색 기능
- AI 기능

---

## 주요 변경 사항 요약

1. **Mock API 완전 제거** - 실제 백엔드 API 호출
2. **BFF 패턴 제거** - 직접 백엔드 통신
3. **인증 간소화** - AccessToken(Zustand), RefreshToken(쿠키)
4. **자동 갱신** - 401 발생 시 자동 refresh 후 재시도
5. **SSR/CSR 분리** - 각각 적절한 axios 인스턴스 사용
6. **이미지 처리** - URL → File 변환 유틸리티 제공
7. **환경 변수** - SSR/CSR 구분하여 설정

---

**리팩토링 완료**: 모든 워크스페이스 관련 API가 실제 백엔드와 연동되었습니다. 메시지 기능은 향후 WebSocket 구현 후 추가 예정입니다.
