import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { authorName, topic, body } = await req.json();
  if (!authorName || !topic || !body) {
    return NextResponse.json({ error: 'Name, topic, and message are required' }, { status: 400 });
  }
  if (authorName.length > 100 || topic.length > 200 || body.length > 5000) {
    return NextResponse.json({ error: 'One of the fields is too long' }, { status: 400 });
  }

  const post = await prisma.post.create({ data: { authorName, topic, body } });
  return NextResponse.json({ ok: true, post });
}
