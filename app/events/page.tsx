import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EventCard } from '@/components/ui/EventCard';
import { mockEvents } from '@/lib/mock-data';

export default function EventsPage() {
  const today = new Date();
  const upcoming = mockEvents
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = mockEvents
    .filter((e) => new Date(e.date) < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-10">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            What's on
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Events</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Gatherings, walks, and virtual meetings — RSVP so we know how many
            to plan for.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="font-display text-xl text-blue-dark mb-4">Upcoming</h2>
          <div className="grid gap-4">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
            {upcoming.length === 0 && (
              <p className="text-ink/60 text-sm">No upcoming events yet — check back soon.</p>
            )}
          </div>
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="font-display text-xl text-blue-dark mb-4">Past events</h2>
            <div className="grid gap-4">
              {past.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
          </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
