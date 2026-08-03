'use client';

import { useState } from 'react';

type Props = {
  value: string;
  onChange: (url: string) => void;
};

export function ImageUploadInput({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="flex items-center gap-3">
      {value ? (
        <img src={value} alt="Preview" className="w-11 h-11 rounded-full object-cover border border-white/60" />
      ) : (
        <div className="w-11 h-11 rounded-full bg-white/40 border border-line flex items-center justify-center text-ink/40 text-xs">
          none
        </div>
      )}
      <label className="font-mono text-xs text-blue-dark border border-blue/40 rounded-full px-3 py-1.5 hover:bg-blue hover:text-parchment transition-colors cursor-pointer">
        {uploading ? 'Uploading…' : value ? 'Change photo' : 'Upload photo'}
        <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
      </label>
      {value && (
        <button type="button" onClick={() => onChange('')} className="text-xs text-ink/50 hover:text-red-600">
          Remove
        </button>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
