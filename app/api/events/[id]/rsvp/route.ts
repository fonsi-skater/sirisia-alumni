import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { memberId } = await req.json();
  if (!memberId) {
    return NextResponse.json({ error: 'memberId is required' }, { status: 400 });
  }

  const [event, member] = await Promise.all([
    prisma.event.findUnique({ where: { id: params.id } }),
    prisma.member.findUnique({ where: { id: memberId } }),
  ]);
  if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  if (!member) return NextResponse.json({ error: 'Member not found' }, { status: 404 });

  const rsvp = await prisma.rsvp.upsert({
    where: { eventId_memberId: { eventId: params.id, memberId } },
    update: { attending: true },
    create: { eventId: params.id, memberId, attending: true },
  });

  return NextResponse.json({ ok: true, rsvp });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const memberId = req.nextUrl.searchParams.get('memberId');
  if (!memberId) {
    return NextResponse.json({ error: 'memberId is required' }, { status: 400 });
  }

  await prisma.rsvp.deleteMany({ where: { eventId: params.id, memberId } });
  return NextResponse.json({ ok: true });
}
