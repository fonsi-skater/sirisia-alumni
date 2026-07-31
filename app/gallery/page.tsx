import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockPhotos } from '@/lib/mock-data';

export default function GalleryPage() {
  const byEvent = mockPhotos.reduce<Record<string, typeof mockPhotos>>((acc, photo) => {
    (acc[photo.eventTitle] ||= []).push(photo);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-10">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Memories
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Gallery</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Photos from our gatherings, organized by event.
          </p>
        </div>

        {Object.entries(byEvent).map(([eventTitle, photos]) => (
          <section key={eventTitle} className="mb-10">
            <h2 className="font-display text-xl text-blue-dark mb-4">{eventTitle}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="glass rounded-xl overflow-hidden p-1.5">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <p className="text-xs text-ink/70 px-1.5 py-2">{photo.caption}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
