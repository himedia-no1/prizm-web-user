import { NextResponse } from 'next/server';
import {
  listLearningData,
  updateLearningDataApproval,
  removeLearningData,
} from './data';

export async function GET() {
  return NextResponse.json(listLearningData());
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, approved } = body ?? {};
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const updated = updateLearningDataApproval(id, approved);
    if (!updated) {
      return NextResponse.json({ error: 'Learning data not found' }, { status: 404 });
    }
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update learning data' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body ?? {};
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const removed = removeLearningData(id);
    if (!removed) {
      return NextResponse.json({ error: 'Learning data not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete learning data' }, { status: 500 });
  }
}
