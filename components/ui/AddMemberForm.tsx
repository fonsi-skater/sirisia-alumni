'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AddMemberForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [classYear, setClassYear] = useState('');
  const [tag, setTag] = useState('');
  const [occupation, setOccupation] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
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
        body: JSON.stringify({ fullName, phoneNumber, classYear, tag, occupation, profilePictureUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add member');
      setFullName('');
      setPhoneNumber('');
      setClassYear('');
      setTag('');
      setOccupation('');
      setProfilePictureUrl('');
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

  const inputClass =
    'w-full rounded-lg border border-line bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-blue';

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-4">
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-ink/60 block mb-1">Full name *</label>
          <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-ink/60 block mb-1">Phone number *</label>
          <input
            required
            placeholder="0722334455"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-ink/60 block mb-1">Class year</label>
          <input placeholder="2014" value={classYear} onChange={(e) => setClassYear(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-ink/60 block mb-1">Tag (optional)</label>
          <input
            placeholder="e.g. Class Rep, Founding Member"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-ink/60 block mb-1">Occupation / job title</label>
          <input
            placeholder="e.g. Accountant"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs text-ink/60 block mb-1">Profile picture URL</label>
          <input
            placeholder="https://..."
            value={profilePictureUrl}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="font-mono text-sm text-parchment bg-blue rounded-full px-4 py-1.5 hover:bg-blue-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding…' : 'Add member'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="font-mono text-sm text-ink/60 px-3 py-1.5">
          Cancel
        </button>
      </div>
    </form>
  );
}
