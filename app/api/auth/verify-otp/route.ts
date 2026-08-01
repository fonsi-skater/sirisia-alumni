import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { normalizePhone } from '@/lib/mpesa';
import { createSessionToken, SESSION_COOKIE } from '@/lib/session';

export async function POST(req: NextRequest) {
  const { phone, code } = await req.json();
  if (!phone || !code) {
    return NextResponse.json({ error: 'Phone and code required' }, { status: 400 });
  }

  const normalized = normalizePhone(phone);

  const otp = await prisma.otpCode.findFirst({
    where: { phoneNumber: normalized, code, usedAt: null },
    orderBy: { createdAt: 'desc' },
  });

  if (!otp || otp.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired code' }, { status: 401 });
  }

  const member = await prisma.member.findUnique({ where: { phoneNumber: normalized } });
  if (!member) {
    return NextResponse.json({ error: 'Member not found' }, { status: 404 });
  }

  await prisma.otpCode.update({ where: { id: otp.id }, data: { usedAt: new Date() } });

  const token = createSessionToken(member.id);
  const res = NextResponse.json({ ok: true, member: { fullName: member.fullName, role: member.role } });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
