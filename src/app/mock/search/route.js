import { NextResponse } from 'next/server';

const baseResults = [
  { id: 'res-msg-1', type: 'message', source: '#general', timestamp: '2024-03-20 09:30', title: '팀 공지', content: '이번 주 스프린트 계획을 확인하세요.' },
  { id: 'res-file-1', type: 'file', source: 'strategy.pdf', timestamp: '2024-03-18 12:15', title: '전략 문서', content: '전략 문서에 새 버전이 업로드되었습니다.' },
  { id: 'res-user-1', type: 'user', source: 'Alice Kim', timestamp: '2024-03-10 15:00', title: 'Alice Kim', content: 'Workspace Owner' },
];

export async function POST(request) {
  const body = await request.json();
  const { query, filter } = body ?? {};
  const trimmed = (query ?? '').trim().toLowerCase();
  if (!trimmed) {
    return NextResponse.json([]);
  }
  const filtered = baseResults.filter((item) => {
    const normalizedFilter = (filter ?? 'all').toLowerCase();
    const matchesFilter = normalizedFilter === 'all' ? true : item.type.toLowerCase() === normalizedFilter;
    const matchesQuery =
      item.title.toLowerCase().includes(trimmed) ||
      item.content.toLowerCase().includes(trimmed) ||
      item.source.toLowerCase().includes(trimmed);
    return matchesFilter && matchesQuery;
  });
  return NextResponse.json(filtered);
}
