import { NextRequest, NextResponse } from 'next/server';
import { recordC2BPayment, type C2BConfirmationPayload } from '@/lib/mpesa';

// Safaricom expects a fast 200 response with this exact shape,
// regardless of what we do internally — so we always return this,
// and log/handle failures without blocking the acknowledgment.
const ACK = { ResultCode: 0, ResultDesc: 'Accepted' };

export async function POST(req: NextRequest) {
  let payload: C2BConfirmationPayload;

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(ACK); // malformed body — ack anyway, nothing to retry
  }

  try {
    const result = await recordC2BPayment(payload);
    console.log(`[mpesa] ${result.status}: ${payload.TransID} KES ${payload.TransAmount} from ${payload.MSISDN}`);
  } catch (err) {
    // Don't let a DB hiccup cause Safaricom to spam-retry — log it,
    // and rely on the "unmatched" admin queue / manual reconciliation
    // for anything that genuinely needs a human to look at.
    console.error('[mpesa] Failed to record payment:', err);
  }

  return NextResponse.json(ACK);
}
