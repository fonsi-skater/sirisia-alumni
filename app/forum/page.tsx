import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { NewTopicForm } from '@/components/ui/NewTopicForm';
import { RemovePostButton } from '@/components/ui/RemovePostButton';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/admin-session';

export const dynamic = 'force-dynamic';

export default async function ForumPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  const canModerate = isAdmin();

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
              Discussion
            </p>
            <h1 className="font-display text-3xl text-blue-dark mb-2">Forum</h1>
            <p className="text-ink/70 text-sm max-w-xl">
              Raise a topic, ask a question, or share news with the class.
            </p>
          </div>
          <NewTopicForm />
        </div>

        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg text-blue-dark">{post.topic}</h3>
                {canModerate && <RemovePostButton id={post.id} />}
              </div>
              <p className="text-sm text-ink/80 mt-2 whitespace-pre-wrap">{post.body}</p>
              <p className="text-xs text-ink/60 font-mono mt-3">
                {post.authorName} · {post.createdAt.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-ink/60 text-sm">No topics yet — be the first to post.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
