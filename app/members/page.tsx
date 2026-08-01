import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AddMemberForm } from '@/components/ui/AddMemberForm';
import { prisma } from '@/lib/db';
import { getCurrentMember, SESSION_COOKIE } from '@/lib/session';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const roleStyles: Record<string, string> = {
  admin: 'text-pink-dark bg-pink-light/30',
  treasurer: 'text-blue-dark bg-blue-light/25',
  organizer: 'text-blue-dark bg-blue-light/25',
  member: 'text-ink/60 bg-white/40',
};

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default async function MembersPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  
  const [members, currentMember] = await Promise.all([
    prisma.member.findMany({ orderBy: { fullName: 'asc' } }),
    getCurrentMember(token),
  ]);
  const canManage = currentMember && ['admin', 'treasurer'].includes(currentMember.role);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="glass rounded-xl p-6 mb-6 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-pink-dark mb-2">
              Directory
            </p>
            <h1 className="font-display text-3xl text-blue-dark mb-2">Members</h1>
            <p className="text-ink/70 text-sm max-w-xl">
              Every registered member of the Sirisia Alumni Class ({members.length} total).
            </p>
          </div>
        </div>

        {canManage && (
          <div className="mb-6">
            <AddMemberForm />
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, i) => (
            <div key={member.id} className="glass rounded-xl p-4 flex gap-3 items-start">
              <div
                className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center font-display text-sm text-parchment ${
                  i % 2 === 0 ? 'bg-blue' : 'bg-pink'
                }`}
              >
                {initials(member.fullName)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-base text-blue-dark truncate">{member.fullName}</h3>
                  <span className={`font-mono text-[10px] uppercase rounded-full px-2 py-0.5 ${roleStyles[member.role]}`}>
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-ink/70 mt-0.5">
                  {member.classYear ? `Class of ${member.classYear}` : 'Class year not set'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
