import { NextResponse } from 'next/server';
import { mockMessageFiles } from '@/app/mock/_lib/messages';

/**
 * POST /mock/messages/files
 * 파일 업로드 (ERD: message_files)
 */
export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const messageId = formData.get('messageId');
  const userId = formData.get('userId');

  if (!file || !messageId || !userId) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Generate file metadata
  const fileId = `file-${Date.now()}`;
  const timestamp = new Date().toISOString();
  const fileExtension = file.name.split('.').pop().toLowerCase();

  // Determine file type based on extension
  const fileTypeMap = {
    jpg: 'IMAGE', jpeg: 'IMAGE', png: 'IMAGE', gif: 'IMAGE', webp: 'IMAGE',
    pdf: 'PDF',
    doc: 'DOC', docx: 'DOC', txt: 'DOC', md: 'DOC',
    xls: 'SHEET', xlsx: 'SHEET', csv: 'SHEET',
    mp4: 'VIDEO', mov: 'VIDEO', avi: 'VIDEO', mkv: 'VIDEO',
    mp3: 'AUDIO', wav: 'AUDIO', m4a: 'AUDIO',
    js: 'CODE', jsx: 'CODE', ts: 'CODE', tsx: 'CODE', py: 'CODE', java: 'CODE',
  };

  const fileType = fileTypeMap[fileExtension] || 'OTHER';
  const storedFileName = `${timestamp.split('T')[0]}-${fileId}-${file.name}`;

  const fileMetadata = {
    id: fileId,
    message_id: messageId,
    original_file_name: file.name,
    stored_file_name: storedFileName,
    file_type: fileType,
    file_size: file.size,
    upload_user_id: userId,
    uploaded_at: timestamp,
    cloud_storage_url: `https://storage.example.com/files/${storedFileName}`,
  };

  // Store in mock data
  if (!mockMessageFiles[messageId]) {
    mockMessageFiles[messageId] = [];
  }
  mockMessageFiles[messageId].push(fileMetadata);

  return NextResponse.json(fileMetadata);
}

/**
 * GET /mock/messages/files?messageId=m1
 * 메시지의 파일 목록 조회
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const messageId = searchParams.get('messageId');

  if (!messageId) {
    return NextResponse.json({ error: 'messageId required' }, { status: 400 });
  }

  const files = mockMessageFiles[messageId] || [];
  return NextResponse.json(files);
}
