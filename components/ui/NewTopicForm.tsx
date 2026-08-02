'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function NewTopicForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [topic, setTopic] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authorName, topic, body }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post');
      setAuthorName('');
      setTopic('');
      setBody('');
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
        className="shrink-0 font-mono text-sm text-parchment bg-blue rounded-full px-5 py-2 hover:bg-blue-dark transition-colors"
      >
        + New topic
      </button>
    );
  }

  const inputClass =
    'w-full rounded-lg border border-line bg-white/60 px-3 py-1.5 text-sm outline-none focus:border-blue';

  return (
    <form onSubmit={handleSubmit} className="glass rounded-xl p-4">
      <div className="grid sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-ink/60 block mb-1">Your name *</label>
          <input required value={authorName} onChange={(e) => setAuthorName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-ink/60 block mb-1">Topic *</label>
          <input required value={topic} onChange={(e) => setTopic(e.target.value)} className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs text-ink/60 block mb-1">Message *</label>
          <textarea
            required
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
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
          {loading ? 'Posting…' : 'Post topic'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="font-mono text-sm text-ink/60 px-3 py-1.5">
          Cancel
        </button>
      </div>
    </form>
  );
}
