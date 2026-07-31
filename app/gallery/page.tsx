import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockGalleryPhotos } from '@/lib/mock-data';

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-10">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Moments together
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Photo gallery</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Photos from past events and gatherings. Full photo uploads are coming soon.
          </p>
        </div>

        <section className="grid sm:grid-cols-2 gap-6">
          {mockGalleryPhotos.map((photo) => (
            <div key={photo.id} className="glass rounded-xl overflow-hidden">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="font-mono text-xs text-pink-dark uppercase tracking-wide mb-1">
                  {photo.eventTitle}
                </p>
                <p className="text-sm text-ink/80">{photo.caption}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
