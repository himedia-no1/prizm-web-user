import { NextResponse } from 'next/server';
import { markLearningDataForReview } from '../data';

export async function POST(request) {
  try {
    const body = await request.json();
    const { id } = body ?? {};
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const updated = markLearningDataForReview(id);
    if (!updated) {
      return NextResponse.json({ error: 'Learning data not found' }, { status: 404 });
    }
    return NextResponse.json(
      {
        success: true,
        item: updated,
        message: '재검토 요청이 접수되었습니다.',
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: 'Failed to request reinspection' }, { status: 500 });
  }
}
