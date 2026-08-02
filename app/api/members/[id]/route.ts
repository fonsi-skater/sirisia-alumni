import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const member = await prisma.member.findUnique({ where: { id: params.id } });
  if (!member) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  // Contributions keep the historical record even after a member is removed —
  // memberId is nullable specifically so deleting someone doesn't erase the
  // ledger, it just makes their past contributions show as unmatched again.
  await prisma.contribution.updateMany({
    where: { memberId: member.id },
    data: { memberId: null },
  });
  await prisma.rsvp.deleteMany({ where: { memberId: member.id } });
  await prisma.member.delete({ where: { id: member.id } });

  return NextResponse.json({ ok: true });
}
