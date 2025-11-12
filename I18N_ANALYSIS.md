# i18n Implementation Status Analysis

## Summary
All analyzed files contain **hardcoded Korean/English text** that should be internationalized using the next-intl framework. The codebase has a well-structured i18n system with namespaces: `common`, `modals`, `workspaceAdmin`, `workspace`, `directory`, `message`, `userSettings`, and `landing`.

---

## 1. AI Settings Components

### File: LearningControl.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/settings/ai/LearningControl.jsx`

**Status:** NOT INTERNATIONALIZED

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 7 | '대기중' | workspaceAdmin | learningStatus.waiting |
| 14 | '처리중' | workspaceAdmin | learningStatus.processing |
| 22 | '완료' | workspaceAdmin | learningStatus.completed |
| 29 | '취소' | workspaceAdmin | learningStatus.cancelled |
| 37 | 'AI 학습 실행' | workspaceAdmin | learningControl.runButton |
| 40 | '학습 중단' | workspaceAdmin | learningControl.cancelButton |
| 49 | '최근 학습 일시:' | workspaceAdmin | learningControl.lastTrained |
| 50 | '다음 학습 예정:' | workspaceAdmin | learningControl.nextScheduled |

---

### File: LearningDataManagement.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/settings/ai/LearningDataManagement.jsx`

**Status:** NOT INTERNATIONALIZED

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 29 | '학습 데이터를 불러오지 못했습니다.' | workspaceAdmin | learningData.loadError |
| 59 | '승인 상태가 업데이트되었습니다.' | workspaceAdmin | learningData.approvalUpdated |
| 63 | '승인 상태를 변경하지 못했습니다.' | workspaceAdmin | learningData.approvalUpdateFailed |
| 72 | '데이터가 삭제되었습니다.' | workspaceAdmin | learningData.deleted |
| 76 | '데이터 삭제에 실패했습니다.' | workspaceAdmin | learningData.deleteFailed |
| 90 | '재검토를 요청했습니다.' | workspaceAdmin | learningData.reinspectRequested |
| 93 | '재검토 요청에 실패했습니다.' | workspaceAdmin | learningData.reinspectFailed |
| 98 | '학습 데이터를 불러오는 중입니다...' | workspaceAdmin | learningData.loading |

---

### File: AiModelSettings.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/settings/ai/AiModelSettings.jsx`

**Status:** PARTIALLY INTERNATIONALIZED

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 14 | '임베딩 모델 선택' | workspaceAdmin | aiModelSettings.embeddingModelLabel |
| 21 | 'Chunk Size' | workspaceAdmin | aiModelSettings.chunkSizeLabel |
| 25 | 'Overlap' | workspaceAdmin | aiModelSettings.overlapLabel |
| 29 | 'Top K' | workspaceAdmin | aiModelSettings.topKLabel |

**Note:** Model names (text-embedding-3-small, bge-small) are technical identifiers and may not need translation.

---

### File: LogsHistory.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/settings/ai/LogsHistory.jsx`

**Status:** NOT INTERNATIONALIZED

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 29 | '로그를 불러오지 못했습니다.' | workspaceAdmin | logs.loadError |
| 57 | '로그를 불러오는 중입니다...' | workspaceAdmin | logs.loading |
| 85 | '세부 로그 보기' | workspaceAdmin | logs.detailsButton |
| 93 | '다운로드' | common | download |
| 98 | 'Log Details' | workspaceAdmin | logs.detailsModalTitle |
| 100 | 'Close' | modals | close |

---

### File: SystemManagement.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/settings/ai/SystemManagement.jsx`

**Status:** NOT INTERNATIONALIZED

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 11 | 'Are you sure you want to reset all data?' | workspaceAdmin | systemManagement.confirmReset |
| 19 | '벡터DB 상태' | workspaceAdmin | systemManagement.vectorDbStatus |
| 20 | '용량:' | workspaceAdmin | systemManagement.capacity |
| 21 | '문서 수:' | workspaceAdmin | systemManagement.documentCount |
| 22 | '모델:' | workspaceAdmin | systemManagement.model |
| 26 | '개인정보 필터' | workspaceAdmin | systemManagement.privacyFilterLabel |
| 32 | '데이터 초기화' | workspaceAdmin | systemManagement.resetButton |

---

## 2. Key Modals

### File: AIAssistantModal.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/modals/AIAssistantModal.jsx`

**Status:** NOT INTERNATIONALIZED

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 9 | '안녕하세요! 무엇을 도와드릴까요?' | modals | aiAssistant.greeting |
| 10 | '최근 frontend 채널의 주요 논의 내용을 요약해줘.' | modals | aiAssistant.exampleQuery1 |
| 11 | '네, frontend 채널에서는 최근 디자인 시스템 업데이트와 관련하여 활발한 논의가 있었습니다...' | modals | aiAssistant.exampleResponse1 |
| 14 | 'Frontend 채널 요약' | modals | aiAssistant.sessionName1 |
| 14 | '오후 2:30' | modals | aiAssistant.sessionTime1 |
| 15 | '새 기능 아이디어' | modals | aiAssistant.sessionName2 |
| 15 | '오전 10:15' | modals | aiAssistant.sessionTime2 |
| 50 | '새 채팅 시작' | modals | aiAssistant.newChat |
| 76 | 'AI에게 질문하거나 파일을 첨부하세요...' | modals | aiAssistant.inputPlaceholder |

---

### File: AddChannelModalContent.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/channel/modals/AddChannelModalContent.jsx`

**Status:** NOT INTERNATIONALIZED

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 9 | '채널 이름' | modals | addChannel.nameLabel |
| 10 | '예: 새로운-채널' | modals | addChannel.namePlaceholder |
| 13 | '채널 만들기' | modals | addChannel.submitButton |

**Note:** These should align with existing modals.addChannel namespace structure in modals.json

---

### File: InviteFlowContent.jsx / InviteFlow/index.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/user/modals/InviteFlow/index.jsx`

**Status:** PARTIALLY INTERNATIONALIZED

Uses `useInviteStrings` hook, but contains hardcoded fallback text:

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 56 | '게스트를 채널에 초대하는 방법을 선택하세요.' | modals | invite.guestDescription |
| 57 | '워크스페이스 멤버 초대 방법을 선택하세요.' | modals | invite.memberDescription |
| 94 | '채널 접근 권한' | modals | invite.channelLabel |
| 95 | '그룹 설정' | modals | invite.groupLabel |
| 182 | '채널' | modals | invite.channelPrefix |
| 193 | '이메일로 초대' | modals | invite.tabs.direct |
| 200 | '초대 링크 생성' | modals | invite.tabs.link |

---

## 3. Dashboard and Directory

### File: DashboardView.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/workspace/components/DashboardView.jsx`

**Status:** NOT INTERNATIONALIZED

| Line | Text | Namespace | Key Suggestion |
|------|------|-----------|-----------------|
| 27 | '핵심 지표' | workspaceAdmin | dashboard.statsTitle |
| 28 | '워크스페이스의 성장과 활동량을 확인하세요.' | workspaceAdmin | dashboard.statsSubtitle |
| 45 | '기준: 최근 30일' | workspaceAdmin | dashboard.statsMeta |

**Note:** The header title uses a prop parameter, not hardcoded.

---

### File: DirectoryView.jsx
**Path:** `/Users/ren/IdeaProjects/prizm-web-user/src/components/user/components/DirectoryView.jsx`

**Status:** WELL INTERNATIONALIZED

This file properly uses `useMessages()` and next-intl, but has fallback English text:

| Line | Text | Type | Note |
|------|------|------|------|
| 159 | 'Name A-Z' | fallback | Used when sortOptions not provided |
| 160 | 'Newest members' | fallback | Used when sortOptions not provided |
| 161 | 'Role' | fallback | Used when sortOptions not provided |
| 162 | 'Status' | fallback | Used when sortOptions not provided |
| 247 | 'Showing {{from}}-{{to}} of {{total}} members' | fallback | Used when summary not provided |

**Status:** Already has proper i18n setup with `directory` namespace.

---

## Recommended Namespace Structure

Based on the analysis, here's the recommended namespace organization:

### `workspaceAdmin.json` - AI Settings Section
```json
{
  "ai": {
    "learning": {
      "status": {
        "waiting": "대기중",
        "processing": "처리중",
        "completed": "완료",
        "cancelled": "취소"
      },
      "control": {
        "runButton": "AI 학습 실행",
        "cancelButton": "학습 중단",
        "lastTrained": "최근 학습 일시",
        "nextScheduled": "다음 학습 예정"
      },
      "data": {
        "loading": "학습 데이터를 불러오는 중입니다...",
        "loadError": "학습 데이터를 불러오지 못했습니다.",
        "approvalUpdated": "승인 상태가 업데이트되었습니다.",
        "approvalUpdateFailed": "승인 상태를 변경하지 못했습니다.",
        "deleted": "데이터가 삭제되었습니다.",
        "deleteFailed": "데이터 삭제에 실패했습니다.",
        "reinspectRequested": "재검토를 요청했습니다.",
        "reinspectFailed": "재검토 요청에 실패했습니다."
      }
    },
    "modelSettings": {
      "embeddingModelLabel": "임베딩 모델 선택",
      "chunkSizeLabel": "Chunk Size",
      "overlapLabel": "Overlap",
      "topKLabel": "Top K"
    },
    "logs": {
      "loading": "로그를 불러오는 중입니다...",
      "loadError": "로그를 불러오지 못했습니다.",
      "detailsButton": "세부 로그 보기",
      "detailsModalTitle": "Log Details"
    },
    "system": {
      "vectorDbStatus": "벡터DB 상태",
      "capacity": "용량",
      "documentCount": "문서 수",
      "model": "모델",
      "privacyFilterLabel": "개인정보 필터",
      "resetButton": "데이터 초기화",
      "confirmReset": "Are you sure you want to reset all data?"
    }
  },
  "dashboard": {
    "statsTitle": "핵심 지표",
    "statsSubtitle": "워크스페이스의 성장과 활동량을 확인하세요.",
    "statsMeta": "기준: 최근 30일"
  }
}
```

### `modals.json` - Modals Section (Additions)
```json
{
  "aiAssistant": {
    "greeting": "안녕하세요! 무엇을 도와드릴까요?",
    "exampleQuery1": "최근 frontend 채널의 주요 논의 내용을 요약해줘.",
    "exampleResponse1": "네, frontend 채널에서는...",
    "sessionName1": "Frontend 채널 요약",
    "sessionTime1": "오후 2:30",
    "sessionName2": "새 기능 아이디어",
    "sessionTime2": "오전 10:15",
    "newChat": "새 채팅 시작",
    "inputPlaceholder": "AI에게 질문하거나 파일을 첨부하세요..."
  },
  "addChannel": {
    "nameLabel": "채널 이름",
    "namePlaceholder": "예: 새로운-채널",
    "submitButton": "채널 만들기"
  },
  "invite": {
    "guestDescription": "게스트를 채널에 초대하는 방법을 선택하세요.",
    "memberDescription": "워크스페이스 멤버 초대 방법을 선택하세요.",
    "channelLabel": "채널 접근 권한",
    "groupLabel": "그룹 설정",
    "channelPrefix": "채널",
    "tabs": {
      "direct": "이메일로 초대",
      "link": "초대 링크 생성"
    }
  }
}
```

---

## Priority for Internationalization

### High Priority (Critical)
- **LearningControl.jsx** - Core status messages
- **SystemManagement.jsx** - Destructive action confirmation
- **AIAssistantModal.jsx** - User-facing content

### Medium Priority
- **LearningDataManagement.jsx** - Error and feedback messages
- **LogsHistory.jsx** - Error messages and labels
- **AiModelSettings.jsx** - Form labels

### Low Priority (Already internationalized)
- **DirectoryView.jsx** - Has i18n setup, only needs fallback review
- **InviteFlow/index.jsx** - Uses `useInviteStrings` hook, only needs hardcoded fallbacks replaced

---

## Implementation Notes

1. **Current i18n Setup:** The project uses `next-intl` with message files in `/messages/[locale]/[namespace].json`
2. **Available Locales:** ko, en, ja, fr
3. **Namespace Pattern:** Files should use `useMessages()` hook and access nested structures
4. **Fallback Strategy:** Provide sensible English fallbacks for development
5. **Time Formatting:** Consider using `useFormatter()` from next-intl for time/date display instead of hardcoded strings

---

## Code Example for Migration

### Before:
```jsx
const [learningStatus, setLearningStatus] = useState('대기중');
```

### After:
```jsx
import { useMessages } from 'next-intl';

export default function LearningControl() {
  const messages = useMessages();
  const s = messages?.workspaceAdmin?.ai?.learning?.status ?? {};
  const [learningStatus, setLearningStatus] = useState(s.waiting ?? '대기중');
```
