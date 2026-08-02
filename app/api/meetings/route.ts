import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export async function POST(req: NextRequest) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const { title, dateTime, joinUrl, agenda } = await req.json();
  if (!title || !dateTime || !joinUrl) {
    return NextResponse.json({ error: 'Title, date/time, and join URL are required' }, { status: 400 });
  }

  const meeting = await prisma.meeting.create({
    data: {
      title,
      dateTime: new Date(dateTime),
      joinUrl,
      agenda: agenda || null,
    },
  });

  return NextResponse.json({ ok: true, meeting });
}
