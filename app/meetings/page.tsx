import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CreateMeetingForm } from '@/components/ui/CreateMeetingForm';
import { RemoveMeetingButton } from '@/components/ui/RemoveMeetingButton';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export const dynamic = 'force-dynamic';

export default async function MeetingsPage() {
  const meetings = await prisma.meeting.findMany({ orderBy: { dateTime: 'asc' } });
  const canManage = isAdmin();

  const now = new Date();
  const upcoming = meetings.filter((m) => m.dateTime >= now);
  const past = meetings.filter((m) => m.dateTime < now).sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime());

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-6">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Online
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Meetings</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Join a scheduled call — no account or download needed, just click the link at the meeting time.
          </p>
        </div>

        {canManage && (
          <div className="mb-6">
            <CreateMeetingForm />
          </div>
        )}

        <section className="mb-10">
          <h2 className="font-display text-xl text-blue-dark mb-4">Upcoming</h2>
          <div className="grid gap-4">
            {upcoming.map((meeting) => {
              const dt = meeting.dateTime;
              return (
                <div key={meeting.id} className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                  <div>
                    <h3 className="font-display text-lg text-blue-dark">{meeting.title}</h3>
                    <p className="text-sm text-ink/70 font-mono mt-1">
                      {dt.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                      {' · '}
                      {dt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                    </p>
                    {meeting.agenda && <p className="text-sm text-ink/80 mt-2 max-w-md">{meeting.agenda}</p>}
                    {canManage && (
                      <div className="mt-2">
                        <RemoveMeetingButton id={meeting.id} title={meeting.title} />
                      </div>
                    )}
                  </div>
                  <a
                    href={meeting.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-center font-mono text-sm text-parchment bg-blue rounded-full px-5 py-2 hover:bg-blue-dark transition-colors"
                  >
                    Join call
                  </a>
                </div>
              );
            })}
            {upcoming.length === 0 && (
              <p className="text-ink/60 text-sm">No meetings scheduled right now.</p>
            )}
          </div>
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="font-display text-xl text-blue-dark mb-4">Past meetings</h2>
            <div className="grid gap-4">
              {past.map((meeting) => (
                <div key={meeting.id} className="glass rounded-xl p-5 opacity-60">
                  <h3 className="font-display text-lg text-blue-dark">{meeting.title}</h3>
                  <p className="text-sm text-ink/70 font-mono mt-1">
                    {meeting.dateTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  {meeting.agenda && <p className="text-sm text-ink/80 mt-2">{meeting.agenda}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
