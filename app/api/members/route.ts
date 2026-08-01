import { NextRequest, NextResponse } from 'next/server';
import { getCurrentMember, SESSION_COOKIE } from '@/lib/session';

export async function POST(req: NextRequest) {
  // Extract token from request cookies context
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const currentMember = await getCurrentMember(token);
  
  if (!currentMember || !['admin', 'treasurer'].includes(currentMember.role)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  // Your existing authorization-checked logic continues below...
  return NextResponse.json({ success: true });
}
