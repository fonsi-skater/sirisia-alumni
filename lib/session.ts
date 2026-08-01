import crypto from 'crypto';
import { prisma } from '@/lib/db';

export const SESSION_COOKIE = 'sirisia_session';
const SEVEN_DAYS_SECONDS = 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET not set');
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getSecret()).update(payload).digest('base64url');
}

export function createSessionToken(memberId: string): string {
  const exp = Math.floor(Date.now() / 1000) + SEVEN_DAYS_SECONDS;
  const payload = `${memberId}:${exp}`;
  const signature = sign(payload);
  return `${Buffer.from(payload).toString('base64url')}.${signature}`;
}

export function verifySessionToken(token: string): string | null {
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const payload = Buffer.from(encodedPayload, 'base64url').toString();
  const expectedSignature = sign(payload);

  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  const [memberId, expStr] = payload.split(':');
  const exp = parseInt(expStr, 10);
  if (!memberId || Number.isNaN(exp) || exp < Math.floor(Date.now() / 1000)) return null;

  return memberId;
}

export async function getCurrentMember(token: string | undefined) {
  if (!token) return null;

  const memberId = verifySessionToken(token);
  if (!memberId) return null;

  return prisma.member.findUnique({ where: { id: memberId } });
}
