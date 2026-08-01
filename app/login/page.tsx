'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Footer } from '@/components/layout/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setStep('code');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid code');
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      
      <main className="max-w-md mx-auto px-4 sm:px-6 py-16">
        <div className="glass rounded-xl p-6">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            {step === 'phone' ? 'Sign in' : 'Enter code'}
          </p>
          <h1 className="font-display text-2xl text-blue-dark mb-4">
            {step === 'phone' ? 'Log in with your phone' : 'Check your SMS'}
          </h1>

          {step === 'phone' ? (
            <form onSubmit={requestOtp} className="space-y-3">
              <input
                type="tel"
                required
                placeholder="e.g. 0722334455"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-line bg-white/60 px-4 py-2 text-sm outline-none focus:border-blue"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full font-mono text-sm text-parchment bg-blue rounded-full px-5 py-2 hover:bg-blue-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Sendingâ€¦' : 'Send code'}
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-3">
              <p className="text-sm text-ink/70 mb-2">
                We sent a 6-digit code to {phone}.
              </p>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                placeholder="123456"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-lg border border-line bg-white/60 px-4 py-2 text-sm tracking-widest outline-none focus:border-blue"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full font-mono text-sm text-parchment bg-blue rounded-full px-5 py-2 hover:bg-blue-dark transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifyingâ€¦' : 'Verify & log in'}
              </button>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-xs text-ink/60 underline"
              >
                Use a different number
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

