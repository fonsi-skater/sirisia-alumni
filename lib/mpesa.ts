import { prisma } from '@/lib/db';

const BASE_URL =
  process.env.MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

/**
 * Exchanges the consumer key/secret for a short-lived OAuth access token.
 * Needed for any Daraja API call that isn't an inbound webhook —
 * e.g. registering URLs, or later, STK Push if we add "pay now" buttons.
 */
export async function getAccessToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY;
  const secret = process.env.MPESA_CONSUMER_SECRET;
  if (!key || !secret) {
    throw new Error('MPESA_CONSUMER_KEY / MPESA_CONSUMER_SECRET not set');
  }

  const credentials = Buffer.from(`${key}:${secret}`).toString('base64');
  const res = await fetch(`${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });

  if (!res.ok) {
    throw new Error(`Daraja OAuth failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

/** Normalizes any of Safaricom's phone formats to 2547XXXXXXXX / 2541XXXXXXXX. */
export function normalizePhone(msisdn: string): string {
  const digits = msisdn.replace(/\D/g, '');
  if (digits.startsWith('254')) return digits;
  if (digits.startsWith('0')) return `254${digits.slice(1)}`;
  if (digits.startsWith('7') || digits.startsWith('1')) return `254${digits}`;
  return digits;
}

export type C2BConfirmationPayload = {
  TransID: string;
  TransTime: string;
  TransAmount: string;
  BusinessShortCode: string;
  BillRefNumber?: string;
  MSISDN: string;
  FirstName?: string;
  MiddleName?: string;
  LastName?: string;
};

/**
 * Core logic for an inbound till payment:
 *  1. Normalize the payer's phone number
 *  2. Try to match it to a Member
 *  3. Try to match BillRefNumber to a Target (falls back to the
 *     most recently created open Target if no match)
 *  4. Record the Contribution, and if matched, bump the Target's
 *     running total in the same transaction
 *
 * Safaricom retries webhooks that don't respond fast/successfully,
 * so this stays defensive: duplicate TransID is treated as a no-op
 * rather than an error, since Prisma's unique constraint on
 * mpesaReceipt will reject the second insert.
 */
export async function recordC2BPayment(payload: C2BConfirmationPayload) {
  const phone = normalizePhone(payload.MSISDN);
  const amount = parseFloat(payload.TransAmount);

  const existing = await prisma.contribution.findUnique({
    where: { mpesaReceipt: payload.TransID },
  });
  if (existing) {
    return { status: 'duplicate' as const, contribution: existing };
  }

  const member = await prisma.member.findUnique({ where: { phoneNumber: phone } });

  let target = payload.BillRefNumber
    ? await prisma.target.findFirst({ where: { id: payload.BillRefNumber } })
    : null;
  if (!target) {
    target = await prisma.target.findFirst({ orderBy: { createdAt: 'desc' } });
  }
  if (!target) {
    throw new Error('No target fund exists to attribute this payment to');
  }

  const contribution = await prisma.$transaction(async (tx) => {
    const created = await tx.contribution.create({
      data: {
        memberId: member?.id,
        targetId: target!.id,
        amount,
        mpesaReceipt: payload.TransID,
        payerPhone: phone,
        status: member ? 'matched' : 'unmatched',
      },
    });

    await tx.target.update({
      where: { id: target!.id },
      data: { currentTotal: { increment: amount } },
    });

    return created;
  });

  return { status: member ? ('matched' as const) : ('unmatched' as const), contribution };
}
