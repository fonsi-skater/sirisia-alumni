import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockMeetings } from '@/lib/mock-data';

export default function MeetingsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-10">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Online
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Meetings</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Join a scheduled call — no account or download needed, just click the link at the meeting time.
          </p>
        </div>

        <div className="grid gap-4">
          {mockMeetings.map((meeting) => {
            const dt = new Date(meeting.dateTime);
            return (
              <div key={meeting.id} className="glass rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div>
                  <h3 className="font-display text-lg text-blue-dark">{meeting.title}</h3>
                  <p className="text-sm text-ink/70 font-mono mt-1">
                    {dt.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                    {' · '}
                    {dt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                  </p>
                  <p className="text-sm text-ink/80 mt-2 max-w-md">{meeting.agenda}</p>
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
          {mockMeetings.length === 0 && (
            <p className="text-ink/60 text-sm">No meetings scheduled right now.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
