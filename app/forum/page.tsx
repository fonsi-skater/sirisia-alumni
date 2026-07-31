import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockForumTopics } from '@/lib/mock-data';

export default function ForumPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-10 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
              Discussion
            </p>
            <h1 className="font-display text-3xl text-blue-dark mb-2">Forum</h1>
            <p className="text-ink/70 text-sm max-w-xl">
              Raise a topic, ask a question, or share news with the class.
            </p>
          </div>
          <button className="shrink-0 font-mono text-sm text-parchment bg-blue rounded-full px-5 py-2 hover:bg-blue-dark transition-colors">
            + New topic
          </button>
        </div>

        <div className="grid gap-4">
          {mockForumTopics.map((topic) => (
            <div key={topic.id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg text-blue-dark">{topic.title}</h3>
                <span className="shrink-0 font-mono text-xs text-pink-dark bg-pink-light/30 rounded-full px-2 py-0.5">
                  {topic.replyCount} replies
                </span>
              </div>
              <p className="text-sm text-ink/80 mt-2">{topic.body}</p>
              <p className="text-xs text-ink/60 font-mono mt-3">
                Started by {topic.author} · last activity {topic.lastActivity}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
