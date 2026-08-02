'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CreateMeetingForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [joinUrl, setJoinUrl] = useState('');
  const [agenda, setAgenda] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, dateTime, joinUrl, agenda }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to schedule meeting');
      setTitle('');
      setDateTime('');
      setJoinUrl('');
      setAgenda('');
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
        + Schedule meeting
      </button>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-line bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-blue';

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-4">
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-ink/60 block mb-1">Title *</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-ink/60 block mb-1">Date & time *</label>
          <input
            required
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-ink/60 block mb-1">Join URL (Jitsi, Zoom, etc.) *</label>
          <input
            required
            placeholder="https://meet.jit.si/YourRoomName"
            value={joinUrl}
            onChange={(e) => setJoinUrl(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-ink/60 block mb-1">Agenda (optional)</label>
          <input
            placeholder="What will be discussed"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
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
          {loading ? 'Scheduling…' : 'Schedule'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="font-mono text-sm text-ink/60 px-3 py-1.5">
          Cancel
        </button>
      </div>
    </form>
  );
}
