'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function RemovePhotoButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    if (!confirm('Remove this photo?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/photos/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to remove photo');
      }
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleRemove}
      disabled={loading}
      className="absolute top-2 right-2 text-[10px] font-mono text-parchment bg-red-600/90 rounded-full px-2 py-0.5"
    >
      {loading ? '…' : 'Remove'}
    </button>
  );
}
