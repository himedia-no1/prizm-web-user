import { NextResponse } from 'next/server';

/**
 * 서버 사이드 로깅 API
 * 클라이언트에서 보낸 로그를 IDE 터미널에 출력
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { type, message, data } = body;

    // IDE 터미널에 출력
    switch (type) {
      case 'request':
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`🚀 [REQUEST #${data.id}] ${data.method} ${data.url}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📍 출발지:', data.origin);
        console.log('🎯 목적지:', data.url);
        if (data.headers) {
          console.log('📦 요청 헤더:', JSON.stringify(data.headers, null, 2));
        }
        if (data.params) {
          console.log('🔍 Query Params:', JSON.stringify(data.params, null, 2));
        }
        if (data.body) {
          console.log('📤 요청 Body:', JSON.stringify(data.body, null, 2));
        }
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        break;

      case 'response':
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`✅ [RESPONSE #${data.id}] ${data.status} ${data.statusText}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎯 URL:', data.url);
        if (data.headers) {
          console.log('📥 응답 헤더:', JSON.stringify(data.headers, null, 2));
        }
        if (data.body) {
          console.log('📦 응답 Body:', JSON.stringify(data.body, null, 2));
        }
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        break;

      case 'error':
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`❌ [ERROR #${data.id}] ${data.status || 'NETWORK_ERROR'}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎯 URL:', data.url);
        console.log('⚠️  에러 메시지:', data.message);
        if (data.status) {
          console.log('📥 응답 상태:', data.status, data.statusText);
        }
        if (data.body) {
          console.log('📦 응답 Body:', JSON.stringify(data.body, null, 2));
        } else if (data.noResponse) {
          console.log('📡 요청은 보내졌으나 응답 없음');
        }
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        break;

      default:
        console.log(message, data);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process log:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
