'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const STORAGE_KEY = 'sirisia_member_id';
const STORAGE_NAME_KEY = 'sirisia_member_name';

type MemberOption = { id: string; fullName: string };

type Props = {
  eventId: string;
  members: MemberOption[];
  rsvpMemberIds: string[];
};

export function RsvpButton({ eventId, members, rsvpMemberIds }: Props) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState('');
  const [picking, setPicking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setSelectedId(stored);
  }, []);

  const isGoing = selectedId && rsvpMemberIds.includes(selectedId);
  const selectedName = members.find((m) => m.id === selectedId)?.fullName;

  async function handleRsvp(memberId: string) {
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'RSVP failed');
      const name = members.find((m) => m.id === memberId)?.fullName ?? '';
      localStorage.setItem(STORAGE_KEY, memberId);
      localStorage.setItem(STORAGE_NAME_KEY, name);
      setSelectedId(memberId);
      setPicking(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    setLoading(true);
    try {
      await fetch(`/api/events/${eventId}/rsvp?memberId=${selectedId}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (picking || !selectedId) {
    return (
      <div className="flex flex-col gap-1 items-end">
        <select
          onChange={(e) => e.target.value && handleRsvp(e.target.value)}
          disabled={loading}
          defaultValue=""
          className="text-xs rounded-full border border-blue/40 bg-white/60 px-3 py-1.5 outline-none"
        >
          <option value="" disabled>
            Who are you?
          </option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.fullName}
            </option>
          ))}
        </select>
        {error && <p className="text-[10px] text-red-600">{error}</p>}
      </div>
    );
  }

  if (isGoing) {
    return (
      <div className="flex flex-col items-end gap-1">
        <span className="font-mono text-xs text-blue-dark bg-blue-light/25 rounded-full px-3 py-1.5">
          ✓ Going ({selectedName?.split(' ')[0]})
        </span>
        <div className="flex gap-2">
          <button onClick={handleCancel} disabled={loading} className="text-[10px] text-ink/50 hover:text-red-600">
            Not going anymore
          </button>
          <button onClick={() => setPicking(true)} className="text-[10px] text-ink/50 underline">
            Not you?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={() => handleRsvp(selectedId)}
        disabled={loading}
        className="font-mono text-sm text-parchment bg-blue rounded-full px-4 py-1.5 hover:bg-blue-dark transition-colors disabled:opacity-50"
      >
        {loading ? '…' : `RSVP as ${selectedName?.split(' ')[0]}`}
      </button>
      <button onClick={() => setPicking(true)} className="text-[10px] text-ink/50 underline">
        Not you?
      </button>
    </div>
  );
}
