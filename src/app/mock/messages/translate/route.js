import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();
  const { messageId, targetLanguage } = body ?? {};
  if (!messageId || !targetLanguage) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const translatedText =
    targetLanguage === 'ko' ? '번역된 메시지입니다' : 'This is a translated message';

  return NextResponse.json({ id: messageId, translatedText, targetLanguage });
}
