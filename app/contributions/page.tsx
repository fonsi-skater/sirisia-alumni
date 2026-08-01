import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContributionThermometer } from '@/components/ui/ContributionThermometer';
import { prisma } from '@/lib/db';

const statusStyles: Record<string, string> = {
  matched: 'text-blue-dark bg-blue-light/20',
  unmatched: 'text-pink-dark bg-pink-light/30',
  pending: 'text-ink/60 bg-white/40',
};

// Re-fetch on every request rather than caching a static build —
// contribution totals change whenever a payment lands, so this
// page should never serve stale numbers.
export const dynamic = 'force-dynamic';

export default async function ContributionsPage() {
  const [targets, recentContributions] = await Promise.all([
    prisma.target.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.contribution.findMany({
      take: 10,
      orderBy: { paidAt: 'desc' },
      include: { member: true, target: true },
    }),
  ]);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-10">
          <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
            Live totals
          </p>
          <h1 className="font-display text-3xl text-blue-dark mb-2">Contributions</h1>
          <p className="text-ink/70 text-sm max-w-xl">
            Every fund below updates automatically as members pay via our
            till. Amounts that can't be auto-matched to a name are shown as
            unmatched until a treasurer confirms them.
          </p>
        </div>

        <section className="grid sm:grid-cols-2 gap-6 mb-12">
          {targets.map((target) => (
            <ContributionThermometer
              key={target.id}
              title={target.title}
              currentTotal={Number(target.currentTotal)}
              goalAmount={Number(target.goalAmount)}
            />
          ))}
          {targets.length === 0 && (
            <p className="text-ink/60 text-sm">No funds set up yet.</p>
          )}
        </section>

        <section className="glass rounded-xl p-6">
          <h2 className="font-display text-xl text-blue-dark mb-4">Recent activity</h2>
          {recentContributions.length === 0 ? (
            <p className="text-ink/60 text-sm">No contributions recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-ink/60 border-b border-white/50">
                    <th className="pb-2 font-normal">Member</th>
                    <th className="pb-2 font-normal">Fund</th>
                    <th className="pb-2 font-normal">Amount</th>
                    <th className="pb-2 font-normal">Status</th>
                    <th className="pb-2 font-normal">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentContributions.map((c) => (
                    <tr key={c.id} className="border-b border-white/30 last:border-0">
                      <td className="py-3">
                        {c.member?.fullName ?? `Unmatched — ${c.payerPhone.slice(0, 6)}***${c.payerPhone.slice(-2)}`}
                      </td>
                      <td className="py-3 text-ink/70">{c.target.title}</td>
                      <td className="py-3 font-mono">KES {Number(c.amount).toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs ${statusStyles[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 text-ink/60 font-mono text-xs">
                        {c.paidAt.toISOString().slice(0, 10)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
