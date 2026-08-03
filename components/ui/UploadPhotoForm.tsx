'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUploadInput } from './ImageUploadInput';

type EventOption = { id: string; title: string };

export function UploadPhotoForm({ events }: { events: EventOption[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [eventId, setEventId] = useState(events[0]?.id ?? '');
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!imageUrl) {
      setError('Please upload a photo first');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, imageUrl, caption }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add photo');
      setImageUrl('');
      setCaption('');
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (events.length === 0) {
    return (
      <p className="text-sm text-ink/60 glass rounded-xl p-4">
        Create an event first (on the Events page) before adding photos — every photo needs to belong to one.
      </p>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="font-mono text-sm text-parchment bg-blue rounded-full px-5 py-2 hover:bg-blue-dark transition-colors"
      >
        + Add photo
      </button>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-line bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-blue';

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-4">
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-ink/60 block mb-1">Event *</label>
          <select value={eventId} onChange={(e) => setEventId(e.target.value)} className={inputClass}>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-ink/60 block mb-1">Caption (optional)</label>
          <input value={caption} onChange={(e) => setCaption(e.target.value)} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-ink/60 block mb-1">Photo *</label>
          <ImageUploadInput value={imageUrl} onChange={setImageUrl} />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-2">{error}</p>}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="font-mono text-sm text-parchment bg-blue rounded-full px-4 py-1.5 hover:bg-blue-dark transition-colors disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Add photo'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="font-mono text-sm text-ink/60 px-3 py-1.5">
          Cancel
        </button>
      </div>
    </form>
  );
}
