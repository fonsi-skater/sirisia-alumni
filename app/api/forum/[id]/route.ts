import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }

  await prisma.post.delete({ where: { id: post.id } });
  return NextResponse.json({ ok: true });
}
