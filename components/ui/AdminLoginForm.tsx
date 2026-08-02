'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      router.push('/members');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="password"
        required
        placeholder="Admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-line bg-white/60 px-4 py-2 text-sm outline-none focus:border-blue"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full font-mono text-sm text-parchment bg-blue rounded-full px-5 py-2 hover:bg-blue-dark transition-colors disabled:opacity-50"
      >
        {loading ? 'Checking…' : 'Log in'}
      </button>
    </form>
  );
}
