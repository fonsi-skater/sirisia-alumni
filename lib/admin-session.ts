import crypto from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'sirisia_admin';
const SEVEN_DAYS_SECONDS = 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET not set');
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

/** Creates a signed admin session token — just an expiry, no identity needed. */
export function createAdminToken(): string {
  const exp = Math.floor(Date.now() / 1000) + SEVEN_DAYS_SECONDS;
  const payload = `admin:${exp}`;
  return `${Buffer.from(payload).toString('base64url')}.${sign(payload)}`;
}

function verifyAdminToken(token: string): boolean {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return false;

  const payload = Buffer.from(encodedPayload, 'base64url').toString();
  const expected = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const [tag, expStr] = payload.split(':');
  const exp = parseInt(expStr, 10);
  return tag === 'admin' && !Number.isNaN(exp) && exp >= Math.floor(Date.now() / 1000);
}

/** For use in server components/route handlers to check admin status. */
export function isAdmin(): boolean {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  return token ? verifyAdminToken(token) : false;
}
