'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RemovePostButton({ id }: { id: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    setLoading(true);
    try {
      const res = await fetch(`/api/forum/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to remove post');
      }
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-ink/60">Remove this post?</span>
        <button
          onClick={handleRemove}
          disabled={loading}
          className="text-[10px] font-mono text-parchment bg-red-600 rounded-full px-2 py-0.5"
        >
          {loading ? '…' : 'Yes'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-[10px] font-mono text-ink/60">
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-[10px] font-mono text-ink/40 hover:text-red-600 transition-colors"
    >
      Remove
    </button>
  );
}
