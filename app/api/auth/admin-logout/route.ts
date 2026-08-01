import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/admin-session';

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/', req.url));
  res.cookies.set(ADMIN_COOKIE, '', { maxAge: 0, path: '/' });
  return res;
}
