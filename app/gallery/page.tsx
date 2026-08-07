import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { UploadPhotoForm } from '@/components/ui/UploadPhotoForm';
import { RemovePhotoButton } from '@/components/ui/RemovePhotoButton';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export const metadata = {
  title: 'Gallery',
  description: 'Photos from Sirisia Alumni Class gatherings, organized by event.',
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const [events, canManage] = await Promise.all([
    prisma.event.findMany({
      include: { photos: true },
      orderBy: { eventDate: 'desc' },
    }),
    Promise.resolve(isAdmin()),
  ]);

  const eventsWithPhotos = events.filter((e) => e.photos.length > 0);
  const eventOptions = events.map((e) => ({ id: e.id, title: e.title }));

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-6">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Memories
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Gallery</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Photos from our gatherings, organized by event.
          </p>
        </div>

        {canManage && (
          <div className="mb-10">
            <UploadPhotoForm events={eventOptions} />
          </div>
        )}

        {eventsWithPhotos.map((event) => (
          <section key={event.id} className="mb-10">
            <h2 className="font-display text-xl text-blue-dark mb-4">{event.title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {event.photos.map((photo) => (
                <div key={photo.id} className="glass rounded-xl overflow-hidden p-1.5 relative">
                  {canManage && <RemovePhotoButton id={photo.id} />}
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption ?? event.title}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {photo.caption && <p className="text-xs text-ink/70 px-1.5 py-2">{photo.caption}</p>}
                </div>
              ))}
            </div>
          </section>
        ))}

        {eventsWithPhotos.length === 0 && (
          <p className="text-ink/60 text-sm">No photos uploaded yet.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
