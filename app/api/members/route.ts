import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { normalizePhone } from '@/lib/mpesa';
import { isAdmin } from '@/lib/admin-session';

export async function POST(req: NextRequest) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const { fullName, phoneNumber, classYear, tag, occupation, profilePictureUrl } = await req.json();
  if (!fullName || !phoneNumber) {
    return NextResponse.json({ error: 'Full name and phone number required' }, { status: 400 });
  }

  const normalized = normalizePhone(phoneNumber);

  const existing = await prisma.member.findUnique({ where: { phoneNumber: normalized } });
  if (existing) {
    return NextResponse.json({ error: 'That phone number is already registered' }, { status: 409 });
  }

  const member = await prisma.member.create({
    data: {
      fullName,
      phoneNumber: normalized,
      classYear: classYear || null,
      tag: tag || null,
      occupation: occupation || null,
      profilePictureUrl: profilePictureUrl || null,
    },
  });

  return NextResponse.json({ ok: true, member });
}
