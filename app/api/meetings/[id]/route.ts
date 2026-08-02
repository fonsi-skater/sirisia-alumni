import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const meeting = await prisma.meeting.findUnique({ where: { id: params.id } });
  if (!meeting) {
    return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
  }

  await prisma.meeting.delete({ where: { id: meeting.id } });
  return NextResponse.json({ ok: true });
}
