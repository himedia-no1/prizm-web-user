import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { inviteCode } = await request.json();

    // TODO: Replace with actual API call to backend
    // const response = await fetch(`${process.env.API_URL}/workspaces/join`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${request.cookies.get('auth_token')?.value}`
    //   },
    //   body: JSON.stringify({ inviteCode })
    // });

    // Mock success response - map inviteCode to workspaceId
    console.log(`User joining workspace with invite code: ${inviteCode}`);

    const mockWorkspaceMapping = {
      'abc123xyz': 'ws1',
      'test-invite': 'ws2',
    };

    const workspaceId = mockWorkspaceMapping[inviteCode] || 'ws1';

    return NextResponse.json({
      success: true,
      workspaceId,
      message: 'Successfully joined workspace'
    });
  } catch (error) {
    console.error('Error joining workspace:', error);
    return NextResponse.json(
      { error: 'Failed to join workspace' },
      { status: 500 }
    );
  }
}
