import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EventCard } from '@/components/ui/EventCard';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const [events, members] = await Promise.all([
    prisma.event.findMany({
      include: { rsvps: { select: { memberId: true } } },
      orderBy: { eventDate: 'asc' },
    }),
    prisma.member.findMany({ select: { id: true, fullName: true }, orderBy: { fullName: 'asc' } }),
  ]);

  const now = new Date();
  const upcoming = events.filter((e) => e.eventDate >= now);
  const past = events.filter((e) => e.eventDate < now).sort((a, b) => b.eventDate.getTime() - a.eventDate.getTime());

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
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                eventDate={event.eventDate}
                location={event.location}
                description={event.description}
                attendeeCount={event.rsvps.length}
                members={members}
                rsvpMemberIds={event.rsvps.map((r) => r.memberId)}
              />
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
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  eventDate={event.eventDate}
                  location={event.location}
                  description={event.description}
                  attendeeCount={event.rsvps.length}
                  isPast
                />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
