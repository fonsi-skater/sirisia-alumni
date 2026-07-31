import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockMeetings } from '@/lib/mock-data';

const modeStyles: Record<string, string> = {
  Virtual: 'text-blue-dark bg-blue-light/20',
  'In-person': 'text-pink-dark bg-pink-light/30',
};

export default function MeetingsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-10">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Stay in the loop
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Meetings</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Committee and planning meetings - open to any member who wants to sit in.
          </p>
        </div>

        <section className="flex flex-col gap-5">
          {mockMeetings.map((meeting) => (
            <div key={meeting.id} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-lg text-blue-dark">{meeting.title}</h2>
                <span className={`px-2 py-0.5 rounded-full text-xs ${modeStyles[meeting.mode]}`}>
                  {meeting.mode}
                </span>
              </div>
              <p className="font-mono text-xs text-ink/60 mb-3">{meeting.meetingDate}</p>
              <p className="text-sm text-ink/80">{meeting.agenda}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
