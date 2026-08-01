import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { normalizePhone } from '@/lib/mpesa';
import { sendSms } from '@/lib/sms';

const CODE_TTL_MINUTES = 5;

export async function POST(req: NextRequest) {
  const { phone } = await req.json();
  if (!phone) {
    return NextResponse.json({ error: 'Phone number required' }, { status: 400 });
  }

  const normalized = normalizePhone(phone);
  const member = await prisma.member.findUnique({ where: { phoneNumber: normalized } });

  if (!member) {
    // Friendly rather than silent here on purpose — this is a small,
    // trusted class directory, not a public signup flow, so telling
    // someone their number isn't registered helps them fix a typo or
    // know to contact an admin, rather than being left guessing.
    return NextResponse.json(
      { error: "That number isn't registered. Contact an admin to be added." },
      { status: 404 }
    );
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

  await prisma.otpCode.create({ data: { phoneNumber: normalized, code, expiresAt } });

  const message = `Your Sirisia Alumni login code is ${code}. It expires in ${CODE_TTL_MINUTES} minutes.`;

  try {
    await sendSms(normalized, message);
  } catch (err) {
    // No SMS credentials configured yet (or the provider call failed) —
    // log the code so local/dev testing still works without real SMS.
    console.warn('[auth] SMS send failed, logging code instead:', err);
    console.log(`[auth] OTP for ${normalized}: ${code}`);
  }

  return NextResponse.json({ ok: true });
}
