import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/mpesa';

const BASE_URL =
  process.env.MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke';

/**
 * Visit this route ONCE (e.g. /api/mpesa/register) after deploying,
 * to tell Safaricom where to send C2B validation/confirmation
 * webhooks for your till (MPESA_SHORTCODE). Re-run it any time your
 * domain changes, since the URLs are tied to whatever NEXT_PUBLIC_
 * base URL you pass in.
 *
 * Not linked from anywhere in the UI on purpose — this is an admin
 * action, not something a member should be able to trigger.
 */
export async function GET() {
  const shortcode = process.env.MPESA_SHORTCODE;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!shortcode || !baseUrl) {
    return NextResponse.json(
      { error: 'MPESA_SHORTCODE and NEXT_PUBLIC_SITE_URL must be set' },
      { status: 500 }
    );
  }

  try {
    const token = await getAccessToken();
    const res = await fetch(`${BASE_URL}/mpesa/c2b/v1/registerurl`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ShortCode: shortcode,
        ResponseType: 'Completed',
        ConfirmationURL: `${baseUrl}/api/mpesa/confirmation`,
        ValidationURL: `${baseUrl}/api/mpesa/validation`,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
