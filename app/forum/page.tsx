import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockForumPosts } from '@/lib/mock-data';

export default function ForumPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-10">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Talk it through
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Discussion</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Raise a topic, ask a question, or weigh in on something the class should discuss.
          </p>
        </div>

        <section className="flex flex-col gap-5">
          {mockForumPosts.map((post) => (
            <div key={post.id} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-display text-lg text-blue-dark">{post.topic}</h2>
                <span className="font-mono text-xs text-ink/60">{post.createdAt}</span>
              </div>
              <p className="text-sm text-ink/80 mb-3">{post.body}</p>
              <div className="flex items-center justify-between text-xs text-ink/60">
                <span>Posted by {post.authorName}</span>
                <span>{post.replyCount} replies</span>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
