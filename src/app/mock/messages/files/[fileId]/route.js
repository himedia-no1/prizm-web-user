import { NextResponse } from 'next/server';
import { mockMessageFiles } from '@/app/mock/_lib/messages';

/**
 * DELETE /mock/messages/files/{fileId}
 * 파일 삭제
 */
export async function DELETE(request, { params }) {
  const { fileId } = params;

  // Find and remove file from mock data
  for (const messageId in mockMessageFiles) {
    const files = mockMessageFiles[messageId];
    const fileIndex = files.findIndex(f => f.id === fileId);

    if (fileIndex !== -1) {
      const [deletedFile] = files.splice(fileIndex, 1);
      return NextResponse.json({
        success: true,
        deletedFile,
      });
    }
  }

  return NextResponse.json(
    { error: 'File not found' },
    { status: 404 }
  );
}

/**
 * GET /mock/messages/files/{fileId}
 * 특정 파일 정보 조회
 */
export async function GET(request, { params }) {
  const { fileId } = params;

  for (const messageId in mockMessageFiles) {
    const file = mockMessageFiles[messageId].find(f => f.id === fileId);
    if (file) {
      return NextResponse.json(file);
    }
  }

  return NextResponse.json(
    { error: 'File not found' },
    { status: 404 }
  );
}
