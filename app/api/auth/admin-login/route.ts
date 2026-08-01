import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken, ADMIN_COOKIE } from '@/lib/admin-session';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!correctPassword) {
    return NextResponse.json({ error: 'Admin login not configured' }, { status: 500 });
  }
  if (!password || password !== correctPassword) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const token = createAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
