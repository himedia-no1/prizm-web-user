export const directoryStrings = {
  en: {
    title: 'Directory',
    searchPlaceholder: 'Search members...',
    sortLabel: 'Sort',
    sortOptions: {
      nameAsc: 'Name A-Z',
      joinDesc: 'Newest members',
      roleAsc: 'Role',
      status: 'Status',
    },
    pageSizeLabel: 'Rows per page',
    pagination: {
      previous: 'Previous',
      next: 'Next',
      summary: 'Showing {{from}}-{{to}} of {{total}} members',
    },
    columns: {
      name: 'Member',
      email: 'Email',
      provider: 'Provider',
      joinedAt: 'Joined',
      group: 'Group',
      role: 'Role',
      status: 'Status',
    },
    empty: 'No members found.',
  },
  ko: {
    title: '디렉토리',
    searchPlaceholder: '멤버 이름 또는 이메일을 검색하세요...',
    sortLabel: '정렬',
    sortOptions: {
      nameAsc: '이름(ㄱ-ㅎ)',
      joinDesc: '가입일 최신순',
      roleAsc: '역할',
      status: '온라인 상태',
    },
    pageSizeLabel: '페이지당 인원',
    pagination: {
      previous: '이전',
      next: '다음',
      summary: '총 {{total}}명 중 {{from}}-{{to}}명 표시',
    },
    columns: {
      name: '멤버',
      email: '이메일',
      provider: '프로바이더',
      joinedAt: '가입일',
      group: '그룹',
      role: '역할',
      status: '상태',
    },
    empty: '멤버를 찾을 수 없습니다.',
  },
};

export default directoryStrings;
