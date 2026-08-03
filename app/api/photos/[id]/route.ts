import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const photo = await prisma.photo.findUnique({ where: { id: params.id } });
  if (!photo) {
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  }

  await prisma.photo.delete({ where: { id: photo.id } });
  return NextResponse.json({ ok: true });
}
