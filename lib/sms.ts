/**
 * Sends an SMS via Africa's Talking. Used for OTP login codes.
 * Requires AT_USERNAME and AT_API_KEY to be set — until they are,
 * this throws, and the request-otp route falls back to logging
 * the code to the server console instead (useful for local testing
 * without burning real SMS credits).
 */
export async function sendSms(to: string, message: string) {
  const username = process.env.AT_USERNAME;
  const apiKey = process.env.AT_API_KEY;
  if (!username || !apiKey) {
    throw new Error('AT_USERNAME / AT_API_KEY not set');
  }

  const res = await fetch('https://api.africastalking.com/version1/messaging', {
    method: 'POST',
    headers: {
      apiKey,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({
      username,
      to: to.startsWith('+') ? to : `+${to}`,
      message,
    }),
  });

  if (!res.ok) {
    throw new Error(`Africa's Talking SMS failed: ${res.status} ${await res.text()}`);
  }

  return res.json();
}
