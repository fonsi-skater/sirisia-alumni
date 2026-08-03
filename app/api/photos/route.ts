import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export async function POST(req: NextRequest) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const { eventId, imageUrl, caption } = await req.json();
  if (!eventId || !imageUrl) {
    return NextResponse.json({ error: 'Event and image are required' }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { id: eventId } });
  if (!event) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }

  const photo = await prisma.photo.create({
    data: { eventId, imageUrl, caption: caption || null },
  });

  return NextResponse.json({ ok: true, photo });
}
