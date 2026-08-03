import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { isAdmin } from '@/lib/admin-session';

export async function POST(req: NextRequest) {
  if (!isAdmin()) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: 'Image uploads are not configured yet. Set CLOUDINARY_* env vars.' },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const dataUri = `data:${file.type};base64,${base64}`;

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = 'sirisia-alumni';
  // Cloudinary signs whatever params you send (except file/api_key/signature itself),
  // sorted alphabetically — folder before timestamp.
  const signature = crypto
    .createHash('sha1')
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest('hex');

  const uploadForm = new FormData();
  uploadForm.append('file', dataUri);
  uploadForm.append('api_key', apiKey);
  uploadForm.append('timestamp', String(timestamp));
  uploadForm.append('folder', folder);
  uploadForm.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: uploadForm,
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: `Upload failed: ${text}` }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json({ ok: true, url: data.secure_url });
}
