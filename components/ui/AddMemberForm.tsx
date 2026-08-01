'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AddMemberForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [classYear, setClassYear] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phoneNumber, classYear }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add member');
      setFullName('');
      setPhoneNumber('');
      setClassYear('');
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-sm text-parchment bg-blue rounded-full px-5 py-2 hover:bg-blue-dark transition-colors"
      >
        + Add member
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-4 flex flex-col sm:flex-row gap-2 items-start sm:items-end">
      <div className="flex-1 min-w-[140px]">
        <label className="text-xs text-ink/60 block mb-1">Full name</label>
        <input
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full rounded-lg border border-line bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-blue"
        />
      </div>
      <div className="flex-1 min-w-[140px]">
        <label className="text-xs text-ink/60 block mb-1">Phone number</label>
        <input
          required
          placeholder="0722334455"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full rounded-lg border border-line bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-blue"
        />
      </div>
      <div className="w-24">
        <label className="text-xs text-ink/60 block mb-1">Class year</label>
        <input
          placeholder="2014"
          value={classYear}
          onChange={(e) => setClassYear(e.target.value)}
          className="w-full rounded-lg border border-line bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-blue"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="font-mono text-sm text-parchment bg-blue rounded-full px-4 py-1.5 hover:bg-blue-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding…' : 'Add'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="font-mono text-sm text-ink/60 px-3 py-1.5"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-sm text-red-600 basis-full">{error}</p>}
    </form>
  );
}
